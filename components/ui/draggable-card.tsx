"use client";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DraggableCardContextType {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const DraggableCardContext = createContext<DraggableCardContextType | null>(null);

export const DraggableCardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <DraggableCardContext.Provider value={{ containerRef }}>
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden", className)}
        style={{ perspective: "3000px" }}
      >
        {children}
      </div>
    </DraggableCardContext.Provider>
  );
};

export const DraggableCardBody = ({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const context = useContext(DraggableCardContext);
  const [isDragging, setIsDragging] = useState(false);

  // Extract rotation if present in className (e.g., rotate-[-5deg], rotate-[8deg], rotate-6)
  const initialRotate = useMemo(() => {
    const matchDeg = className.match(/rotate-\[(-?\d+(?:\.\d+)?deg)\]/);
    if (matchDeg) return matchDeg[1];

    const matchSimple = className.match(/rotate-(-?\d+)/);
    if (matchSimple) return `${matchSimple[1]}deg`;

    return 0;
  }, [className]);

  // Clean className so Tailwind's CSS transform doesn't fight Framer Motion's transform
  const cleanedClassName = useMemo(() => {
    return className
      .replace(/rotate-\[(-?\d+(?:\.\d+)?deg)\]/g, "")
      .replace(/rotate-(-?\d+)/g, "")
      .trim();
  }, [className]);

  return (
    <motion.div
      drag
      dragConstraints={context?.containerRef || undefined}
      dragElastic={0.2}
      dragMomentum={true}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{ rotate: initialRotate }}
      whileHover={{ scale: 1.04, cursor: "grab" }}
      whileTap={{ scale: 0.98, cursor: "grabbing" }}
      whileDrag={{
        scale: 1.08,
        zIndex: 50,
        cursor: "grabbing",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
      }}
      className={cn(
        "rounded-2xl sm:rounded-3xl p-3 sm:p-4 select-none cursor-grab active:cursor-grabbing",
        "bg-[#111116]/95 border border-white/15 backdrop-blur-xl shadow-2xl",
        "transition-shadow duration-200",
        cleanedClassName
      )}
      style={{
        ...style,
        touchAction: "none",
      }}
    >
      {children}
    </motion.div>
  );
};
