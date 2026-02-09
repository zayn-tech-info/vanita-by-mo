import { useState, useEffect } from "react";
import heroImage1 from "../assets/images/hero_section.jpg";
import heroImage2 from "../assets/images/hero_section2.jpg";
import heroImage3 from "../assets/images/hero_section3.jpg";

export function Herosection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      image: heroImage1,
      subtitle: "New Collection 2026",
      title: "Embrace Your Roots",
      description: "Where African heritage meets contemporary elegance",
      cta: "Shop Collection",
    },
    {
      image: heroImage2,
      subtitle: "Handcrafted Excellence",
      title: "Wear Your Culture",
      description: "Authentic prints, timeless designs, bold statements",
      cta: "Explore Now",
    },
    {
      image: heroImage3,
      subtitle: "Artisan Textiles",
      title: "Stories in Every Thread",
      description: "Traditional craftsmanship for the modern woman",
      cta: "Discover More",
    },
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, nextSlide]);

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 700);
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-stone-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl">
              {/* Decorative element */}
              <div
                className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-100 ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <span className="w-12 h-[2px] bg-amber-500"></span>
                <span className="text-amber-400 text-sm tracking-[0.3em] uppercase font-light">
                  {slide.subtitle}
                </span>
              </div>

              {/* Title */}
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl font-extralight text-white tracking-wide leading-tight mb-6 transition-all duration-700 delay-200 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {slide.title.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span className="text-amber-400 font-light">{word}</span>
                    ) : (
                      word
                    )}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p
                className={`text-lg sm:text-xl text-white/80 font-light tracking-wide mb-8 transition-all duration-700 delay-300 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {slide.description}
              </p>

              {/* CTA Button */}
              <div
                className={`transition-all duration-700 delay-400 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <a
                  href="#"
                  className="group inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all duration-300"
                >
                  {slide.cta}
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
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-stone-900 transition-all duration-300 flex items-center justify-center group z-10"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 text-white hover:bg-white hover:text-stone-900 transition-all duration-300 flex items-center justify-center group z-10"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`group flex items-center gap-2 transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`h-[2px] transition-all duration-500 ${
                index === currentSlide
                  ? "w-12 bg-amber-400"
                  : "w-6 bg-white/40 group-hover:bg-white/70"
              }`}
            ></span>
          </button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 text-white/60 text-sm tracking-widest z-10">
        <span className="text-white text-lg">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span className="mx-2">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* Decorative Side Text */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <span className="text-white/30 text-xs tracking-[0.4em] uppercase rotate-[-90deg] origin-center whitespace-nowrap">
          African Heritage Fashion
        </span>
      </div>
    </section>
  );
}
