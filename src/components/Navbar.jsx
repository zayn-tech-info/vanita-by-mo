import { useState } from "react";
import { useCart } from "../hooks/useCart";

export function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();

  const shopCategories = [
    { name: "Dresses", href: "/shop" },
    { name: "Tops & Blouses", href: "/shop" },
    { name: "Pants & Trousers", href: "/shop" },
    { name: "Skirts", href: "/shop" },
    { name: "Loungewear", href: "/shop" },
    { name: "Accessories", href: "/shop" },
  ];

  return (
    <header className="relative">
      {/* Top announcement bar */}
      <div className="bg-stone-900 text-white text-center py-2 text-xs tracking-widest uppercase">
        Free Shipping on Orders Over $150 | Handcrafted with Love
      </div>

      {/* Main navbar */}
      <nav className="bg-[#faf9f7] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-amber-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Logo */}
            <a href="/" className="flex flex-col items-center group relative">
              {/* Decorative line above */}
              <span className="w-12 h-px bg-linear-to-r from-transparent via-amber-600 to-transparent mb-2 group-hover:w-16 transition-all duration-500"></span>

              {/* Main brand name with gradient */}
              <span className="text-2xl sm:text-3xl font-extralight tracking-[0.4em] bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 bg-clip-text text-transparent group-hover:from-amber-800 group-hover:via-amber-600 group-hover:to-amber-800 transition-all duration-500">
                VANTIA
              </span>

              {/* Subtitle with elegant styling */}
              <div className="flex items-center gap-2 mt-1">
                <span className="w-4 h-[0.5px] bg-amber-600/60"></span>
                <span className="text-[9px] tracking-[0.5em] text-amber-700/80 font-light uppercase">
                  by M.O
                </span>
                <span className="w-4 h-[0.5px] bg-amber-600/60"></span>
              </div>

              {/* Decorative line below */}
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent via-stone-400 to-transparent mt-2 group-hover:w-12 transition-all duration-500"></span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#"
                className="text-sm tracking-widest text-stone-700 hover:text-amber-800 transition-colors duration-300 uppercase font-light relative group"
              >
                New Arrivals
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-800 group-hover:w-full transition-all duration-300"></span>
              </a>

              {/* Shop All Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <button className="flex items-center text-sm tracking-widest text-stone-700 hover:text-amber-800 transition-colors duration-300 uppercase font-light group">
                  Shop All
                  <svg
                    className={`ml-1 w-3 h-3 transition-transform duration-300 ${isShopOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-800 group-hover:w-full transition-all duration-300"></span>
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-56 bg-white shadow-xl border border-stone-100 transition-all duration-300 ${
                    isShopOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="py-3">
                    {shopCategories.map((category) => (
                      <a
                        key={category.name}
                        href={category.href}
                        className="block px-6 py-2.5 text-sm text-stone-600 hover:text-amber-800 hover:bg-stone-50 transition-colors tracking-wide"
                      >
                        {category.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="text-sm tracking-widest text-stone-700 hover:text-amber-800 transition-colors duration-300 uppercase font-light relative group"
              >
                Why Linen
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-800 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a
                href="#"
                className="text-sm tracking-widest text-stone-700 hover:text-amber-800 transition-colors duration-300 uppercase font-light relative group"
              >
                Our Story
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-800 group-hover:w-full transition-all duration-300"></span>
              </a>

              <a
                href="#"
                className="text-sm tracking-widest text-stone-700 hover:text-amber-800 transition-colors duration-300 uppercase font-light relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-800 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-stone-700 hover:text-amber-800 transition-colors duration-300"
                aria-label="Search"
              >
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Account - hidden on mobile */}
              <a
                href="#"
                className="hidden sm:block p-2 text-stone-700 hover:text-amber-800 transition-colors duration-300"
                aria-label="Account"
              >
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>

              {/* Cart */}
              <a
                href="/cart"
                className="relative p-2 text-stone-700 hover:text-amber-800 transition-colors duration-300"
                aria-label="Cart"
              >
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-amber-700 text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        <div
          className={`absolute top-full left-0 right-0 bg-white shadow-lg border-t border-stone-100 transition-all duration-300 z-50 ${
            isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our collection..."
                className="w-full px-4 py-3 border border-stone-200 focus:border-amber-700 focus:outline-none text-sm tracking-wide bg-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-amber-800">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-stone-100 transition-all duration-300 z-40 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            <a
              href="#"
              className="block text-sm tracking-widest text-stone-700 hover:text-amber-800 uppercase font-light py-2"
            >
              New Arrivals
            </a>
            <div className="space-y-2">
              <button
                onClick={() => setIsShopOpen(!isShopOpen)}
                className="flex items-center justify-between w-full text-sm tracking-widest text-stone-700 hover:text-amber-800 uppercase font-light py-2"
              >
                Shop All
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${isShopOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isShopOpen && (
                <div className="pl-4 space-y-2 border-l-2 border-amber-200">
                  {shopCategories.map((category) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className="block text-sm text-stone-600 hover:text-amber-800 py-1.5 tracking-wide"
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a
              href="#"
              className="block text-sm tracking-widest text-stone-700 hover:text-amber-800 uppercase font-light py-2"
            >
              Why Linen
            </a>
            <a
              href="#"
              className="block text-sm tracking-widest text-stone-700 hover:text-amber-800 uppercase font-light py-2"
            >
              Our Story
            </a>
            <a
              href="#"
              className="block text-sm tracking-widest text-stone-700 hover:text-amber-800 uppercase font-light py-2"
            >
              Blog
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
