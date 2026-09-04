"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  // Deterministic rotation based on index prevents SSR hydration mismatches between server and client
  const getCardRotation = (index: number) => {
    const angles = [-6, 5, -8, 7, -4, 8, -5, 6, -7, 4];
    return angles[index % angles.length];
  };

  return (
    <div className="max-w-sm md:max-w-5xl lg:max-w-6xl mx-auto antialiased font-sans px-4 sm:px-6 md:px-8 py-8 sm:py-12">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center">
        <div>
          <div className="relative h-80 sm:h-[380px] md:h-[440px] w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getCardRotation(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getCardRotation(index),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getCardRotation(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={600}
                    height={600}
                    priority={index === 0}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/15"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-2 min-h-[340px]">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-base sm:text-lg text-indigo-300 font-mono mt-1.5">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg sm:text-xl md:text-2xl text-white/80 mt-6 sm:mt-8 leading-relaxed font-light">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-8">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center group/button transition-all duration-200 border border-white/15 hover:scale-105 active:scale-95 shadow-lg shadow-black/40"
              aria-label="Previous testimonial"
            >
              <svg
                className="h-6 w-6 text-white/80 group-hover/button:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center group/button transition-all duration-200 border border-white/15 hover:scale-105 active:scale-95 shadow-lg shadow-black/40"
              aria-label="Next testimonial"
            >
              <svg
                className="h-6 w-6 text-white/80 group-hover/button:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
