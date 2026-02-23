import { useState } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  if (!userId || userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f5f3f0] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-stone-900 text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-lg font-light tracking-[0.15em]">
              VANITA <span className="text-amber-400 font-normal">Admin</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 group ${
                  active
                    ? "bg-amber-600/20 text-amber-400"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span className="font-light">{item.label}</span>
                {active && (
                  <ChevronRight size={14} className="ml-auto opacity-60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-6 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide text-white/40 hover:bg-white/5 hover:text-white transition-all duration-200"
          >
            <ChevronRight size={18} className="rotate-180" />
            <span className="font-light">Back to Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm tracking-wide text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <LogOut size={18} />
            <span className="font-light">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-stone-600 hover:text-stone-900"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:flex items-center gap-2 text-sm text-stone-500">
            <span className="font-light">Admin Panel</span>
            <ChevronRight size={14} className="text-stone-300" />
            <span className="text-stone-800 capitalize font-medium">
              {location.pathname === "/admin"
                ? "Dashboard"
                : location.pathname.split("/admin/")[1] || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
