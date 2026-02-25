import { Link, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CheckCircle, Package, ArrowRight, Mail } from "lucide-react";

export function OrderConfirmation() {
  const location = useLocation();
  const orderData = location.state;

  // If no order data, redirect to home
  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-stone-900 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          {/* Animated Checkmark */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute w-24 h-24 rounded-full bg-green-500/10 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <CheckCircle size={36} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-wide mb-4">
            Thank <span className="text-amber-400 font-light">You!</span>
          </h1>
          <p className="text-white/70 font-light tracking-wide text-sm sm:text-base max-w-lg mx-auto">
            Your order has been placed successfully. We're preparing your
            handcrafted pieces with love.
          </p>
        </div>
      </section>

      {/* Order Details */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Order Card */}
        <div className="bg-white border border-stone-200 p-6 sm:p-10 mb-8">
          {/* Order Info Header */}
          <div className="text-center mb-8 pb-8 border-b border-stone-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-amber-600" />
              <span className="text-amber-700 text-xs tracking-[0.3em] uppercase font-light">
                Order Confirmed
              </span>
              <span className="w-8 h-px bg-amber-600" />
            </div>

            <div className="text-stone-500 text-sm font-light tracking-wide space-y-1">
              <p>
                Order placed for{" "}
                <span className="text-stone-800 font-normal">
                  {orderData.customerName}
                </span>
              </p>
              <p>
                {orderData.itemCount}{" "}
                {orderData.itemCount === 1 ? "item" : "items"} —{" "}
                <span className="text-amber-700 font-normal">
                  ${orderData.total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="mb-8">
            <h3 className="text-xs tracking-[0.2em] uppercase text-stone-700 font-medium mb-5">
              What Happens Next
            </h3>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Order Processing",
                  description:
                    "Our team will review and confirm your order within 24 hours.",
                  icon: Package,
                  color: "text-amber-600 bg-amber-50",
                },
                {
                  step: "2",
                  title: "Confirmation Email",
                  description: `A confirmation will be sent to ${orderData.customerEmail}.`,
                  icon: Mail,
                  color: "text-blue-600 bg-blue-50",
                },
                {
                  step: "3",
                  title: "Shipping & Delivery",
                  description:
                    "Your handcrafted pieces will be carefully packaged and shipped within 2–3 business days.",
                  icon: Package,
                  color: "text-green-600 bg-green-50",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center shrink-0`}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm text-stone-800 font-normal tracking-wide mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-500 font-light tracking-wide leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Estimate */}
          <div className="bg-stone-50 border border-stone-100 p-5 rounded-sm mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-stone-700 font-normal tracking-wide">
                  Estimated Delivery
                </p>
                <p className="text-xs text-stone-500 font-light tracking-wide">
                  5–7 business days from today
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <Link
            to="/shop"
            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-stone-900 text-white text-xs tracking-[0.2em] uppercase hover:bg-amber-700 transition-colors duration-300"
          >
            Continue Shopping
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
          <Link
            to="/my-orders"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-amber-600 text-amber-700 text-xs tracking-[0.15em] uppercase hover:bg-amber-600 hover:text-white transition-all duration-300"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-stone-300 text-stone-700 text-xs tracking-[0.15em] uppercase hover:border-stone-900 hover:text-stone-900 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Need Help */}
        <div className="text-center mt-12 pt-8 border-t border-stone-200">
          <p className="text-xs text-stone-400 font-light tracking-wide">
            Need help? Contact us at{" "}
            <a
              href="https://wa.link/8xiw63"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
            >
              WhatsApp
            </a>{" "}
            or email{" "}
            <a
              href="mailto:support@vanitabymo.com"
              className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
            >
              support@vanitabymo.com
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
