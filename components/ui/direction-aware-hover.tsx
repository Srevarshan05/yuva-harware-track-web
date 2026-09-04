"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const DirectionAwareHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left");

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!ref.current) return;

    const dir = getDirection(event, ref.current);
    switch (dir) {
      case 0:
        setDirection("top");
        break;
      case 1:
        setDirection("right");
        break;
      case 2:
        setDirection("bottom");
        break;
      case 3:
        setDirection("left");
        break;
      default:
        setDirection("left");
        break;
    }
  };

  const getDirection = (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    obj: HTMLElement
  ) => {
    const { width: w, height: h, left, top } = obj.getBoundingClientRect();
    const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
    const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    return d;
  };

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      ref={ref}
      className={cn(
        "relative rounded-2xl sm:rounded-3xl overflow-hidden group/card bg-neutral-950 border border-white/10 select-none",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          {/* Subtle permanent dark vignette gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 pointer-events-none" />

          {/* Direction-aware hover dark reveal overlay */}
          <motion.div
            variants={overlayVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full bg-black/40 z-20 pointer-events-none"
          />

          {/* Background image with direction-aware subtle shift */}
          <motion.div
            variants={variants}
            className="h-full w-full relative bg-neutral-900"
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <Image
              alt="prize image"
              className={cn(
                "h-full w-full object-cover scale-[1.08] transition-transform duration-500 group-hover/card:scale-[1.14]",
                imageClassName
              )}
              width={1000}
              height={1000}
              src={imageUrl}
              priority
            />
          </motion.div>

          {/* Children text content with direction-aware entrance */}
          <motion.div
            variants={textVariants}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className={cn(
              "text-white absolute bottom-6 inset-x-6 z-40 flex flex-col justify-end pointer-events-none",
              childrenClassName
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const variants = {
  initial: {
    x: 0,
    y: 0,
  },
  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: 15,
  },
  bottom: {
    y: -15,
  },
  left: {
    x: 15,
  },
  right: {
    x: -15,
  },
};

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
  top: {
    opacity: 1,
  },
  bottom: {
    opacity: 1,
  },
  left: {
    opacity: 1,
  },
  right: {
    opacity: 1,
  },
};

const textVariants = {
  initial: {
    y: 0,
    x: 0,
    opacity: 0.9,
  },
  exit: {
    y: 0,
    x: 0,
    opacity: 0.9,
  },
  top: {
    y: -8,
    opacity: 1,
  },
  bottom: {
    y: 4,
    opacity: 1,
  },
  left: {
    x: 6,
    opacity: 1,
  },
  right: {
    x: -6,
    opacity: 1,
  },
};
