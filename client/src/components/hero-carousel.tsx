import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter"; // ✅ Use Wouter navigation instead

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  backgroundColor: string;
  highlights?: string[];
}

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, navigate] = useLocation(); // ✅ Wouter navigation hook

  const { data: slides = [] } = useQuery<Slide[]>({
    queryKey: ["/api/home-slides"],
  });

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual navigation
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Default UI while loading
  if (slides.length === 0) {
    return (
      <section className="flex items-center justify-center h-[80vh] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white text-center">
        <div>
          <motion.h1 className="text-5xl font-bold mb-4">
            Welcome to DigitalHub
          </motion.h1>
          <motion.p className="text-xl mb-8 text-gray-200">
            Your Premium Digital Products Marketplace
          </motion.p>
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-200 transition"
            onClick={() => navigate("/products")} // ✅ Wouter navigation
          >
            Explore Products
          </Button>
        </div>
      </section>
    );
  }

  // ✅ Main Hero Section
  return (
    <section className="relative overflow-hidden h-[90vh] bg-[#0e0e12] text-white">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 gap-10"
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0 z-0"
                  style={{
                    background: `linear-gradient(135deg, ${slide.backgroundColor}88, #000)`,
                  }}
                ></div>

                {/* Soft glow */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  transition={{ duration: 2 }}
                  className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px]"
                  style={{ backgroundColor: slide.backgroundColor }}
                ></motion.div>

                {/* Left Text Section */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 w-full md:w-1/2 flex flex-col justify-center text-center md:text-left"
                >
                  <p className="text-sm md:text-base font-semibold text-gray-300 uppercase tracking-widest mb-3">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
                    {slide.title}
                  </h1>
                  <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-md mx-auto md:mx-0">
                    {slide.description}
                  </p>

                  {/* ✅ Highlights List */}
                  <ul className="space-y-2 mb-8">
                    {slide.highlights?.map((text, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 * i }}
                        className="flex items-center justify-center md:justify-start gap-2 text-gray-200"
                      >
                        <CheckCircle2 className="text-green-400 w-5 h-5" />
                        <span>{text}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <Button
                      size="md"
                      onClick={() => navigate(slide.ctaLink)} // ✅ Wouter navigation
                      className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:opacity-90 rounded-full text-white font-semibold px-8 py-5 shadow-lg transition-all duration-300"
                    >
                      {slide.ctaText}
                    </Button>
                    <Button
                      size="md"
                      onClick={() => navigate("/contact")} // ✅ Contact navigation
                      className="bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold px-8 py-5 border border-white/20 backdrop-blur-md transition-all"
                    >
                      Contact
                    </Button>
                  </div>
                </motion.div>

                {/* Right Image Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end"
                >
                  <div className="relative group">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-[85%] max-w-[480px] object-contain rounded-3xl transition-transform duration-700 group-hover:scale-105"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-40 blur-3xl -z-10"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      style={{ backgroundColor: slide.backgroundColor }}
                    ></motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="bg-white/10 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-md transition"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="bg-white/10 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-md transition"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all h-2 rounded-full ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/40 w-3 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
