import { useState } from "react";
import { ProductQuickView } from "./ProductQuickView";
import { useCart } from "../hooks/useCart";
import product1 from "../assets/images/IMG_20260209_133744.jpg";
import product2 from "../assets/images/IMG_20260209_133826.jpg";
import product3 from "../assets/images/IMG_20260209_133904.jpg";
import product4 from "../assets/images/IMG_20260209_133933.jpg";
import product5 from "../assets/images/IMG_20260209_133952.jpg";
import product6 from "../assets/images/IMG_20260209_134017.jpg";
import product7 from "../assets/images/IMG_20260209_134036.jpg";
import product8 from "../assets/images/IMG_20260209_134055.jpg";
import product9 from "../assets/images/IMG_20260209_134116.jpg";
import product10 from "../assets/images/IMG_20260209_134136.jpg";
import product11 from "../assets/images/IMG_20260209_134156.jpg";
import product12 from "../assets/images/IMG_20260209_134234.jpg";

export function Products() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const { addToCart } = useCart();

  const filters = [
    { id: "all", label: "All" },
    { id: "dresses", label: "Dresses" },
    { id: "tops", label: "Tops" },
    { id: "sets", label: "Sets" },
    { id: "accessories", label: "Accessories" },
  ];

  const products = [
    {
      id: 1,
      name: "Ankara Elegance Dress",
      price: 189,
      category: "dresses",
      image: product1,
      isNew: true,
      isBestseller: false,
    },
    {
      id: 2,
      name: "Kente Wrap Blouse",
      price: 129,
      category: "tops",
      image: product2,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 3,
      name: "Adire Print Maxi",
      price: 225,
      category: "dresses",
      image: product3,
      isNew: true,
      isBestseller: false,
    },
    {
      id: 4,
      name: "Tribal Fusion Set",
      price: 275,
      category: "sets",
      image: product4,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 5,
      name: "Mud Cloth Tunic",
      price: 145,
      category: "tops",
      image: product5,
      isNew: false,
      isBestseller: false,
    },
    {
      id: 6,
      name: "Heritage Wrap Dress",
      price: 198,
      category: "dresses",
      image: product6,
      isNew: true,
      isBestseller: false,
    },
    {
      id: 7,
      name: "Kitenge Co-ord Set",
      price: 245,
      category: "sets",
      image: product7,
      isNew: false,
      isBestseller: true,
    },
    {
      id: 8,
      name: "Dashiki Crop Top",
      price: 95,
      category: "tops",
      image: product8,
      isNew: false,
      isBestseller: false,
    },
    {
      id: 9,
      name: "Batik Flow Dress",
      price: 210,
      category: "dresses",
      image: product9,
      isNew: true,
      isBestseller: false,
    },
    {
      id: 10,
      name: "Woven Heritage Top",
      price: 115,
      category: "tops",
      image: product10,
      isNew: false,
      isBestseller: false,
    },
    {
      id: 11,
      name: "Safari Luxe Set",
      price: 295,
      category: "sets",
      image: product11,
      isNew: true,
      isBestseller: true,
    },
    {
      id: 12,
      name: "Afro Chic Gown",
      price: 320,
      category: "dresses",
      image: product12,
      isNew: false,
      isBestseller: true,
    },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section id="collection" className="bg-[#faf9f7] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Decorative element */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-px bg-linear-to-r from-transparent to-amber-600"></span>
            <span className="text-amber-700 text-xs tracking-[0.4em] uppercase font-light">
              Our Collection
            </span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-600"></span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight text-stone-800 tracking-wide mb-6">
            Curated <span className="text-amber-700 font-light">Pieces</span>
          </h2>

          <p className="text-stone-600 font-light tracking-wide max-w-2xl mx-auto">
            Each garment tells a story of African heritage, handcrafted with
            authentic prints and contemporary silhouettes
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeFilter === filter.id
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-900 hover:text-stone-900"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image Container */}
              <div className="relative aspect-3/4 overflow-hidden bg-stone-100 mb-3 sm:mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay on hover - desktop only */}
                <div
                  className={`absolute inset-0 bg-black/20 transition-opacity duration-300 hidden lg:block ${
                    hoveredProduct === product.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                {/* Badges */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
                  {product.isNew && (
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-600 text-white text-[8px] sm:text-[10px] tracking-[0.15em] uppercase">
                      New
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-stone-900 text-white text-[8px] sm:text-[10px] tracking-[0.15em] uppercase">
                      Bestseller
                    </span>
                  )}
                </div>

                <div
                  className={`absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex gap-1 sm:gap-2 transition-all duration-300 ${
                    hoveredProduct === product.id
                      ? "opacity-100 translate-y-0"
                      : "lg:opacity-0 lg:translate-y-4"
                  }`}
                >
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 py-2 sm:py-3 bg-white text-stone-900 text-[9px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] uppercase hover:bg-stone-900 hover:text-white transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                  <button className="w-8 h-8 sm:w-12 sm:h-12 bg-white text-stone-900 hover:bg-stone-900 hover:text-white transition-colors duration-300 flex items-center justify-center shrink-0">
                    <svg
                      className="w-3.5 h-3.5 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-7 h-7 sm:w-10 sm:h-10 bg-white/90 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300 flex items-center justify-center ${
                    hoveredProduct === product.id
                      ? "opacity-100 scale-100"
                      : "lg:opacity-0 lg:scale-90"
                  }`}
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-stone-800 font-light tracking-wide mb-1 sm:mb-2 text-xs sm:text-base group-hover:text-amber-800 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-amber-700 font-light tracking-widest text-xs sm:text-base">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center mt-12 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-stone-300"></span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-light">
              Scroll to explore
            </span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-stone-300"></span>
          </div>
          <div className="animate-bounce">
            <svg
              className="w-5 h-5 text-amber-600/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <a
            href="/shop"
            className="group inline-flex items-center gap-4 px-10 py-4 border border-stone-900 text-stone-900 text-sm tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            View All Collection
            <svg
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
