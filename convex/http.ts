import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import Stripe from "stripe";

const http = httpRouter();

http.route({
  path: "/stripe",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeSecretKey || !webhookSecret) {
      console.error("Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
      return new Response("Server configuration error", { status: 500 });
    }

    const stripe = new Stripe(stripeSecretKey, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Stripe API version
    apiVersion: "2023-10-16" as any,
    });

    const payload = await request.text();
    const signature = request.headers.get("Stripe-Signature");
    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing Stripe-Signature header" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Use trimmed secret (env vars sometimes get trailing newlines when pasted)
    const signingSecret = webhookSecret.trim();

    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(payload, signature, signingSecret);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid signature";
      console.error("Stripe webhook signature verification failed:", message);
      return new Response(
        JSON.stringify({ error: "Webhook signature verification failed", detail: message }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const orderId = session.metadata?.orderId;
      const sessionId = session.metadata?.sessionId;

      if (!orderId) {
        console.error("Stripe session missing metadata.orderId");
        return new Response(null, { status: 200 });
      }

      const shipping = (session as Stripe.Checkout.Session & { shipping_details?: { address?: { line1?: string; city?: string; state?: string; postal_code?: string; country?: string }; name?: string } }).shipping_details;
      const addr = shipping?.address;
      const hasShippingFromStripe = addr?.line1 != null && addr?.country != null;

      if (hasShippingFromStripe) {
        const shippingAddress = {
          street: addr?.line1 ?? "",
          city: addr?.city ?? "",
          state: addr?.state ?? "",
          zipCode: addr?.postal_code ?? "",
          country: addr?.country ?? "",
        };
        const customerName =
          (session.customer_details as { name?: string } | null)?.name ??
          shipping?.name ??
          "Customer";
        const customerEmail =
          session.customer_details?.email ?? session.customer_email ?? "";
        await ctx.runMutation(api.orders.completeFromStripe, {
          orderId: orderId as Id<"orders">,
          stripeSessionId: session.id,
          customerName,
          customerEmail,
          shippingAddress,
        });
      } else {
        await ctx.runMutation(api.orders.completeFromStripeCheckoutOnly, {
          orderId: orderId as Id<"orders">,
          stripeSessionId: session.id,
        });
      }

      if (sessionId) {
        await ctx.runMutation(api.cart.clearCart, { sessionId });
      }
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      let orderId = paymentIntent.metadata?.orderId as Id<"orders"> | undefined;
      const sessionId = paymentIntent.metadata?.sessionId as string | undefined;

      // Fallback: find order by paymentIntentId if metadata.orderId is missing
      if (!orderId) {
        const order = await ctx.runQuery(api.orders.getByPaymentIntentId, {
          paymentIntentId: paymentIntent.id,
        });
        if (order) orderId = order._id;
      }

      if (orderId) {
        await ctx.runMutation(api.orders.completeOrderFromPaymentIntent, {
          orderId,
        });
        if (sessionId) {
          await ctx.runMutation(api.cart.clearCart, { sessionId });
        }
      }
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;
