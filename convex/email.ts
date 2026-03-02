"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import nodemailer from "nodemailer";

export const sendOrderConfirmation = action({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.runQuery(api.orders.getById, { id: args.orderId });
    if (!order) {
      console.warn("sendOrderConfirmation: order not found", args.orderId);
      return;
    }
    if (order.confirmationEmailSentAt) {
      return; 
    }

    const host = process.env.MAILTRAP_HOST;
    const port = process.env.MAILTRAP_PORT;
    const user = process.env.MAILTRAP_USER;
    const pass = process.env.MAILTRAP_PASS;

    if (!host || !port || !user || !pass) {
      console.error(
        "Missing Mailtrap env: MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS"
      );
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: false,
      auth: { user, pass },
    });

    const itemLines = order.items
      .map(
        (i) =>
          `<tr><td>${i.name}</td><td>${i.quantity}</td><td>$${i.price.toFixed(2)}</td><td>$${(i.price * i.quantity).toFixed(2)}</td></tr>`
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Order confirmed</title></head>
<body style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #1c1917;">Thank you for your order</h1>
  <p>Hi ${order.customerName},</p>
  <p>Your payment was successful and your order is confirmed.</p>
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <thead>
      <tr style="border-bottom: 2px solid #e7e5e4;">
        <th style="text-align: left; padding: 8px;">Item</th>
        <th style="text-align: right; padding: 8px;">Qty</th>
        <th style="text-align: right; padding: 8px;">Price</th>
        <th style="text-align: right; padding: 8px;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${itemLines}
    </tbody>
  </table>
  <p style="margin-top: 16px;">
    <strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}<br/>
    <strong>Shipping:</strong> ${order.shippingCost === 0 ? "Free" : `$${order.shippingCost.toFixed(2)}`}<br/>
    <strong>Total paid:</strong> $${order.total.toFixed(2)}
  </p>
  <p style="margin-top: 24px;">
    <strong>Shipping to:</strong><br/>
    ${order.shippingAddress.street}<br/>
    ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br/>
    ${order.shippingAddress.country}
  </p>
  <p style="margin-top: 24px; color: #78716c; font-size: 14px;">
    Questions? Reply to this email or contact us at support@vanitabymo.com
  </p>
  <p style="margin-top: 24px; font-size: 12px; color: #a8a29e;">
    — Vanita by M.O
  </p>
</body>
</html>
`.trim();

    await transporter.sendMail({
      from: process.env.MAILTRAP_FROM ?? "Vanita by M.O <orders@vanitabymo.com>",
      to: order.customerEmail,
      subject: `Order confirmed — $${order.total.toFixed(2)}`,
      html,
    });

    await ctx.runMutation(api.orders.setConfirmationEmailSent, {
      orderId: args.orderId,
    });
  },
});
