import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import {
  Loader2,
  ChevronRight,
  ShieldCheck,
  Truck,
  ArrowLeft,
} from "lucide-react";

// Floating label input — defined outside Checkout to avoid remounting on every render
function FloatingInput({
  name,
  label,
  type = "text",
  required = true,
  value,
  isActive,
  onChange,
  onFocus,
  onBlur,
}) {
  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isActive
            ? "top-1.5 text-[10px] text-amber-600 tracking-[0.1em] uppercase"
            : "top-1/2 -translate-y-1/2 text-sm text-stone-400 font-light"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full px-4 pt-5 pb-2 border border-stone-200 text-sm text-stone-800 tracking-wide bg-transparent focus:border-amber-600 focus:outline-none transition-colors duration-200"
      />
    </div>
  );
}

export function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartCount, subtotal, clearCart } = useCart();
  const placeOrder = useMutation(api.orders.place);

  const [step, setStep] = useState(1); // 1 = shipping, 2 = review
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const shippingCost = subtotal > 200 ? 0 : 15;
  const total = subtotal + shippingCost;

  // Redirect to cart if empty
  if (cartItems.length === 0 && !loading) {
    return (
      <div className="bg-[#faf9f7] min-h-screen">
        <Navbar />
        <section className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-extralight text-stone-800 tracking-wide mb-3">
            Your cart is empty
          </h2>
          <p className="text-stone-500 font-light tracking-wide text-sm mb-8">
            Add some items before proceeding to checkout
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-8 py-3 bg-stone-900 text-white text-xs tracking-[0.2em] uppercase hover:bg-amber-700 transition-colors duration-300"
          >
            Browse Collection
            <ChevronRight size={14} />
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateShipping = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "zipCode",
      "country",
    ];
    for (const field of required) {
      if (!formData[field].trim()) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
        );
        return false;
      }
    }
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleContinueToReview = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    const toastId = toast.loading("Placing your order...");

    try {
      const userId = localStorage.getItem("userId") || undefined;

      const orderId = await placeOrder({
        userId: userId || undefined,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size || undefined,
          color: item.color || undefined,
          image: item.image,
        })),
        subtotal,
        shippingCost,
        total,
      });

      // Clear the cart after successful order
      await clearCart();

      toast.update(toastId, {
        render: "Order placed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Navigate to confirmation page with order details
      navigate("/order-confirmation", {
        state: {
          orderId,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          total,
          itemCount: cartCount,
        },
      });
    } catch (err) {
      setLoading(false);
      toast.update(toastId, {
        render: err.message || "Failed to place order. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  // Helper to render a FloatingInput with current state
  const renderInput = (name, label, type = "text") => (
    <FloatingInput
      name={name}
      label={label}
      type={type}
      value={formData[name]}
      isActive={focusedField === name || !!formData[name]}
      onChange={handleChange}
      onFocus={() => setFocusedField(name)}
      onBlur={() => setFocusedField(null)}
    />
  );

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      <Navbar />

      {/* Page Header */}
      <section className="bg-stone-900 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <Link
              to="/"
              className="text-white/60 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-white/40 text-xs">/</span>
            <Link
              to="/cart"
              className="text-white/60 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
            >
              Cart
            </Link>
            <span className="text-white/40 text-xs">/</span>
            <span className="text-amber-400 text-xs tracking-[0.2em] uppercase">
              Checkout
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-wide">
            Secure <span className="text-amber-400 font-light">Checkout</span>
          </h1>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-4">
        <div className="flex items-center justify-center gap-0">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                step >= 1
                  ? "bg-stone-900 text-white"
                  : "bg-stone-200 text-stone-500"
              }`}
            >
              1
            </div>
            <span
              className={`text-xs tracking-[0.15em] uppercase font-light transition-colors ${
                step >= 1 ? "text-stone-800" : "text-stone-400"
              }`}
            >
              Shipping
            </span>
          </div>

          <div
            className={`w-16 sm:w-24 h-px mx-3 transition-colors duration-300 ${step >= 2 ? "bg-stone-900" : "bg-stone-200"}`}
          />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                step >= 2
                  ? "bg-stone-900 text-white"
                  : "bg-stone-200 text-stone-500"
              }`}
            >
              2
            </div>
            <span
              className={`text-xs tracking-[0.15em] uppercase font-light transition-colors ${
                step >= 2 ? "text-stone-800" : "text-stone-400"
              }`}
            >
              Review & Pay
            </span>
          </div>

          <div className={`w-16 sm:w-24 h-px mx-3 bg-stone-200`} />

          {/* Step 3 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-stone-200 text-stone-500">
              3
            </div>
            <span className="text-xs tracking-[0.15em] uppercase font-light text-stone-400">
              Confirmation
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="lg:flex lg:gap-12">
          {/* Left Side — Form / Review */}
          <div className="flex-1">
            {step === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-amber-600" />
                  <h2 className="text-xs tracking-[0.3em] uppercase text-amber-700 font-light">
                    Shipping Information
                  </h2>
                </div>

                <form onSubmit={handleContinueToReview} className="space-y-4">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput("firstName", "First Name")}
                    {renderInput("lastName", "Last Name")}
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput("email", "Email Address", "email")}
                    {renderInput("phone", "Phone Number", "tel")}
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-3 pt-4">
                    <span className="w-8 h-[1px] bg-stone-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-light">
                      Delivery Address
                    </span>
                    <span className="flex-1 h-[1px] bg-stone-200" />
                  </div>

                  {/* Street */}
                  {renderInput("street", "Street Address")}

                  {/* City / State Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput("city", "City")}
                    {renderInput("state", "State / Province")}
                  </div>

                  {/* Zip / Country Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInput("zipCode", "Zip / Postal Code")}
                    {renderInput("country", "Country")}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6">
                    <Link
                      to="/cart"
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 text-xs tracking-[0.15em] uppercase hover:border-stone-900 hover:text-stone-900 transition-all duration-300"
                    >
                      <ArrowLeft
                        size={14}
                        className="group-hover:-translate-x-1 transition-transform duration-300"
                      />
                      Back to Cart
                    </Link>
                    <button
                      type="submit"
                      className="px-10 py-3.5 bg-stone-900 text-white text-xs tracking-[0.2em] uppercase hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      Continue to Review
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-amber-600" />
                  <h2 className="text-xs tracking-[0.3em] uppercase text-amber-700 font-light">
                    Review Your Order
                  </h2>
                </div>

                {/* Shipping Summary */}
                <div className="bg-white border border-stone-200 p-5 sm:p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs tracking-[0.2em] uppercase text-stone-700 font-medium">
                      Shipping To
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-amber-700 tracking-wide underline underline-offset-2 hover:text-amber-800 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-sm text-stone-600 font-light tracking-wide space-y-1">
                    <p className="text-stone-800 font-normal">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.street}</p>
                    <p>
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <p>{formData.country}</p>
                    <div className="pt-2 flex flex-col sm:flex-row sm:gap-6">
                      <p className="text-stone-500">{formData.email}</p>
                      <p className="text-stone-500">{formData.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white border border-stone-200 p-5 sm:p-6 mb-6">
                  <h3 className="text-xs tracking-[0.2em] uppercase text-stone-700 font-medium mb-4">
                    Items ({cartCount})
                  </h3>
                  <div className="divide-y divide-stone-100">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <h4 className="text-sm text-stone-800 font-light tracking-wide">
                            {item.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-1.5 text-xs text-stone-500 font-light tracking-wide">
                            {item.size && (
                              <span className="px-2 py-0.5 bg-stone-50 border border-stone-100 rounded">
                                Size: {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span className="px-2 py-0.5 bg-stone-50 border border-stone-100 rounded">
                                Color: {item.color}
                              </span>
                            )}
                            <span className="px-2 py-0.5 bg-stone-50 border border-stone-100 rounded">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-stone-800 font-medium tracking-wide shrink-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                  <button
                    onClick={() => {
                      setStep(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 text-xs tracking-[0.15em] uppercase hover:border-stone-900 hover:text-stone-900 transition-all duration-300"
                  >
                    <ArrowLeft
                      size={14}
                      className="group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    Edit Shipping
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="px-10 py-3.5 bg-stone-900 text-white text-xs tracking-[0.2em] uppercase hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading && <Loader2 size={14} className="animate-spin" />}
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side — Order Summary (sticky) */}
          <div className="lg:w-[380px] mt-10 lg:mt-0">
            <div className="bg-white border border-stone-200 p-6 sm:p-8 sticky top-8">
              <h2 className="text-sm tracking-[0.2em] uppercase text-stone-800 font-medium mb-6 pb-4 border-b border-stone-200">
                Order Summary
              </h2>

              {/* Items Preview */}
              <div className="space-y-3 mb-6 pb-6 border-b border-stone-100">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3">
                    <div className="relative w-16 h-20 bg-stone-100 shrink-0 overflow-hidden rounded">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-stone-800 text-white text-[9px] rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-stone-700 font-light truncate">
                        {item.name}
                      </p>
                      {(item.size || item.color) && (
                        <p className="text-[10px] text-stone-400 font-light mt-0.5">
                          {[item.size, item.color].filter(Boolean).join(" / ")}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-stone-700 font-light shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600 font-light tracking-wide">
                    Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
                  </span>
                  <span className="text-stone-800 font-light">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600 font-light tracking-wide">
                    Shipping
                  </span>
                  <span className="text-stone-800 font-light">
                    {shippingCost === 0 ? (
                      <span className="text-green-700">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <p className="text-xs text-amber-700 font-light tracking-wide">
                    Free shipping on orders over $200
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-stone-200">
                <span className="text-stone-800 tracking-[0.15em] uppercase text-sm font-medium">
                  Total
                </span>
                <span className="text-xl text-stone-900 font-light tracking-wide">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-stone-100 space-y-3">
                <div className="flex items-center gap-3 text-stone-500">
                  <ShieldCheck size={16} className="text-green-600 shrink-0" />
                  <span className="text-xs font-light tracking-wide">
                    Secure checkout — your data is protected
                  </span>
                </div>
                <div className="flex items-center gap-3 text-stone-500">
                  <Truck size={16} className="text-amber-600 shrink-0" />
                  <span className="text-xs font-light tracking-wide">
                    Estimated delivery: 5–7 business days
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-4 border-t border-stone-100">
                <span className="text-stone-400 text-xs tracking-wide font-light">
                  We accept:
                </span>
                <div className="flex items-center gap-2 mt-2">
                  {["VISA", "MC", "AMEX", "PP"].map((method) => (
                    <div
                      key={method}
                      className="w-10 h-6 bg-stone-100 rounded flex items-center justify-center"
                    >
                      <span className="text-stone-500 text-[10px] font-medium">
                        {method}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
