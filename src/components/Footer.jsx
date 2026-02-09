import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  const shopLinks = [
    { name: "New Arrivals", href: "#" },
    { name: "Dresses", href: "#" },
    { name: "Tops & Blouses", href: "#" },
    { name: "Sets", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Sale", href: "#" },
  ];

  const customerLinks = [
    { name: "Contact Us", href: "#" },
    { name: "Shipping & Returns", href: "#" },
    { name: "Size Guide", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Track Order", href: "#" },
  ];

  const companyLinks = [
    { name: "Our Story", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Craftsmanship", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ];

  return (
    <footer className="bg-stone-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-amber-500"></span>
                <span className="text-amber-400 text-xs tracking-[0.3em] uppercase font-light">
                  Stay Connected
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extralight tracking-wide mb-3">
                Join Our <span className="text-amber-400">Community</span>
              </h3>
              <p className="text-white/60 font-light tracking-wide">
                Subscribe for exclusive offers, new arrivals, and stories from
                our artisans.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-transparent border border-white/30 text-white placeholder:text-white/40 text-sm tracking-wide focus:outline-none focus:border-amber-500 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-amber-600 text-white text-sm tracking-[0.2em] uppercase hover:bg-amber-700 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="mb-6">
              <span className="w-12 h-px bg-linear-to-r from-transparent via-amber-600 to-transparent block mb-2"></span>
              <span className="text-2xl font-extralight tracking-[0.4em] text-white">
                VANTIA
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-4 h-[0.5px] bg-amber-600/60"></span>
                <span className="text-[9px] tracking-[0.5em] text-amber-500/80 font-light uppercase">
                  by M.O
                </span>
                <span className="w-4 h-[0.5px] bg-amber-600/60"></span>
              </div>
            </div>

            <p className="text-white/60 font-light tracking-wide leading-relaxed mb-8 max-w-sm">
              Celebrating African heritage through contemporary fashion.
              Handcrafted pieces that tell stories of tradition, culture, and
              timeless elegance.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.link/8xiw63"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/70 hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/vanitabymo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/70 hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://web.facebook.com/people/Vanit%C3%A0-by-MO/100063574351459/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/30 flex items-center justify-center text-white/70 hover:border-amber-500 hover:text-amber-500 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-white mb-6 font-light">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 font-light tracking-wide hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-white mb-6 font-light">
              Help
            </h4>
            <ul className="space-y-3">
              {customerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 font-light tracking-wide hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm tracking-[0.2em] uppercase text-white mb-6 font-light">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 font-light tracking-wide hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm font-light tracking-wide">
              © 2026 Vantia by M.O. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-white/40 text-sm font-light tracking-wide hover:text-white/70 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-white/40 text-sm font-light tracking-wide hover:text-white/70 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-white/40 text-sm font-light tracking-wide hover:text-white/70 transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>

            {/* Payment Icons */}
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-xs tracking-wide">
                We accept:
              </span>
              <div className="flex items-center gap-2">
                <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-white/60 text-[10px] font-medium">
                    VISA
                  </span>
                </div>
                <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-white/60 text-[10px] font-medium">
                    MC
                  </span>
                </div>
                <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-white/60 text-[10px] font-medium">
                    AMEX
                  </span>
                </div>
                <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                  <span className="text-white/60 text-[10px] font-medium">
                    PP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
