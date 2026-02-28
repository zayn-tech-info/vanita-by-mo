import { Link, Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ShoppingBag,
  Loader2,
} from "lucide-react";

const statusConfig = {
  awaiting_payment: {
    label: "Awaiting payment",
    icon: Clock,
    iconColor: "text-amber-500",
    textColor: "text-amber-600",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    iconColor: "text-amber-500",
    textColor: "text-amber-600",
  },
  processing: {
    label: "Processing",
    icon: Package,
    iconColor: "text-blue-500",
    textColor: "text-blue-600",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    iconColor: "text-violet-500",
    textColor: "text-violet-600",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
    textColor: "text-emerald-600",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    iconColor: "text-red-400",
    textColor: "text-red-500",
  },
};

export function MyOrders() {
  const userId = localStorage.getItem("userId");

  // Redirect to login if not authenticated
  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  const orders = useQuery(api.orders.listByUser, { userId }) ?? undefined;

  // Loading
  if (orders === undefined) {
    return (
      <div className="bg-[#faf9f7] min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center py-40">
          <Loader2 size={32} className="animate-spin text-amber-600" />
        </div>
        <Footer />
      </div>
    );
  }

  // Sort by most recent
  const sortedOrders = [...orders].sort(
    (a, b) => b._creationTime - a._creationTime,
  );

  return (
    <div className="bg-[#faf9f7] min-h-screen">
      <Navbar />

      {/* Header */}
      <section className="bg-stone-900 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <Link
              to="/"
              className="text-white/60 text-xs tracking-[0.2em] uppercase hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-white/40 text-xs">/</span>
            <span className="text-amber-400 text-xs tracking-[0.2em] uppercase">
              My Orders
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extralight text-white tracking-wide">
            My <span className="text-amber-400 font-light">Orders</span>
          </h1>
        </div>
      </section>

      {/* Orders List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {sortedOrders.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
              <ShoppingBag size={28} className="text-stone-400" />
            </div>
            <h2 className="text-2xl font-extralight text-stone-800 tracking-wide mb-3">
              No orders yet
            </h2>
            <p className="text-stone-500 font-light tracking-wide text-sm mb-8">
              Start shopping to see your orders here
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-8 py-3 bg-stone-900 text-white text-xs tracking-[0.2em] uppercase hover:bg-amber-700 transition-colors duration-300"
            >
              Browse Collection
              <ChevronRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {sortedOrders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;
              const orderDate = new Date(
                order._creationTime,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              // Generate a clean order number from the ID
              const orderNumber = order._id.slice(-8).toUpperCase();

              return (
                <div
                  key={order._id}
                  className="bg-white p-5 sm:p-7 border border-stone-200 shadow-xs"
                >
                  {/* Order Meta Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 pb-8 border-b border-stone-100">
                    <div>
                      <h3 className="text-sm font-medium text-stone-900 tracking-widest uppercase mb-1">
                        Order #{orderNumber}
                      </h3>
                      <p className="text-sm text-stone-500 font-light tracking-wide">
                        Placed on {orderDate}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2">
                      <p className="text-xl text-stone-900 font-light tracking-wide">
                        ${order.total.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <StatusIcon size={14} className={status.iconColor} />
                        <span
                          className={`text-xs uppercase tracking-widest font-medium ${status.textColor}`}
                        >
                          {status.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div className="w-24 h-32 bg-stone-100 shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <Link
                            to={`/product/${item.productId}`}
                            className="text-sm text-stone-800 font-light tracking-wide mb-1 hover:text-amber-700 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400 font-light tracking-wide mb-2">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                          <div className="mt-auto text-sm text-stone-800 font-light tracking-wide">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer details */}
                  <div className="bg-stone-50 p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-stone-100">
                    <div className="flex-1">
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1.5">
                        Shipping To
                      </span>
                      <span className="text-sm text-stone-800 font-light tracking-wide">
                        {order.shippingAddress.street},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode},{" "}
                        {order.shippingAddress.country}
                      </span>
                    </div>

                    <div className="shrink-0 flex items-center gap-4">
                      {order.status === "shipped" && (
                        <span
                          className={`text-xs font-light tracking-wide flex items-center gap-2 ${status.textColor}`}
                        >
                          <Truck size={14} className={status.iconColor} />
                          On its way to you
                        </span>
                      )}
                      {order.status === "delivered" && (
                        <span
                          className={`text-xs font-light tracking-wide flex items-center gap-2 ${status.textColor}`}
                        >
                          <CheckCircle2
                            size={14}
                            className={status.iconColor}
                          />
                          Delivered successfully
                        </span>
                      )}
                      {order.status === "cancelled" && (
                        <span
                          className={`text-xs font-light tracking-wide flex items-center gap-2 ${status.textColor}`}
                        >
                          <XCircle size={14} className={status.iconColor} />
                          Order cancelled
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
