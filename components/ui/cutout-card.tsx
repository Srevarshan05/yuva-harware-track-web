"use client";

import React from "react";
import Image from "next/image";
import { type Variants } from "framer-motion";

export const cutoutCardSurfaceClassName =
  "rounded-3xl border border-neutral-800/80 bg-neutral-950/90 backdrop-blur-xl text-white shadow-2xl transition-all duration-300 hover:border-neutral-700 hover:shadow-indigo-500/10 group overflow-hidden";

export function CutoutCorner({
  className = "",
  size = 32,
  style,
}: {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path d="M0 0C0 17.6731 14.3269 32 32 32H0V0Z" fill="currentColor" />
    </svg>
  );
}

export function CutoutCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CutoutCardMedia({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-neutral-900 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CutoutCardImage({
  src,
  alt = "",
  sizes = "(max-width: 768px) 100vw, 448px",
  className = "",
}: {
  src: string;
  alt?: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${className}`}
    />
  );
}

export function CutoutCardOverlay({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none ${className}`}
    />
  );
}

export function CutoutCardInsetLabel({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute z-10 flex items-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CutoutCardPin({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute z-10 flex items-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CutoutCardContent({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`p-6 flex flex-col ${className}`} style={style}>
      {children}
    </div>
  );
}

export function CutoutCardFooter({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex items-center justify-between w-full ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CutoutCardAction({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute z-10 transition-all duration-300 ease-out ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function useCutoutContentStaggerVariants(): {
  container: Variants;
  item: Variants;
} {
  return {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 14 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
      },
    },
  };
}
