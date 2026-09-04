"use client";

import React, { useState, useEffect } from "react";

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color.slice(0, 6), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return (
    "#" +
    ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  );
};

const Folder: React.FC<FolderProps> = ({
  color = "#2e323b",
  size = 2,
  items = [],
  className = "",
}) => {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(size);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  // Dynamic responsive scale calculation for mobile, tablet, and desktop
  useEffect(() => {
    const updateScale = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w < 420) {
        // Small mobile (320px - 420px): keeps fanning span within mobile viewport
        setScale(Math.min(size, 1.15));
      } else if (w < 640) {
        // Large mobile (420px - 640px)
        setScale(Math.min(size, 1.35));
      } else if (w < 768) {
        // Small tablet (640px - 768px)
        setScale(Math.min(size, 1.6));
      } else if (w < 1024) {
        // Tablet (768px - 1024px)
        setScale(Math.min(size, 1.85));
      } else {
        // Desktop (>= 1024px)
        setScale(size);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [size]);

  const folderBackColor = darkenColor(color, 0.25);
  const paperBg = "#111317";

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.12;
    const offsetY = (e.clientY - centerY) * 0.12;
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const scaleStyle: React.CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: "center center",
  };

  // Open transforms for each paper positioned comfortably above the folder pocket
  // Paper 0: Left (2nd Place)
  // Paper 1: Right (3rd Place)
  // Paper 2: Center Top elevated (1st Place)
  const getOpenTransform = (index: number) => {
    if (index === 0) return "translate(-120%, -46%) rotate(-12deg)";
    if (index === 1) return "translate(20%, -46%) rotate(12deg)";
    if (index === 2) return "translate(-50%, -66%) rotate(0deg)";
    return "";
  };

  return (
    <div style={scaleStyle} className={`select-none ${className}`}>
      <div
        className={`group relative transition-all duration-300 ease-out cursor-pointer focus:outline-none ${
          !open ? "hover:-translate-y-2" : ""
        }`}
        style={{
          transform: open ? "translateY(-4px)" : undefined,
        }}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? "Close folder" : "Open prize folder"}
      >
        {/* Back folder body */}
        <div
          className="relative w-[136px] h-[98px] rounded-tr-[12px] rounded-br-[12px] rounded-bl-[12px] shadow-2xl transition-colors duration-300 border-t border-r border-white/10"
          style={{
            backgroundColor: folderBackColor,
            boxShadow: `0 20px 40px -10px rgba(0,0,0,0.8), 0 2px 15px rgba(255,255,255,0.03)`,
          }}
        >
          {/* Top folder tab */}
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[44px] h-[13px] rounded-tl-[6px] rounded-tr-[6px] border-t border-l border-white/15"
            style={{ backgroundColor: folderBackColor }}
          />

          {/* Papers / Cards fanning out */}
          {papers.map((item, i) => {
            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${
                  paperOffsets[i].y
                }px)`
              : undefined;

            return (
              <div
                key={i}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                onClick={(e) => {
                  if (open) {
                    e.stopPropagation();
                  }
                }}
                className={`absolute bottom-[6%] left-1/2 w-[92%] h-[112%] transition-all duration-500 ease-out overflow-hidden shadow-2xl border border-white/15 hover:border-white/35 ${
                  !open
                    ? "z-20 transform -translate-x-1/2 translate-y-[4%] group-hover:-translate-y-[2%] cursor-pointer"
                    : i === 2
                    ? "z-30 hover:z-50 hover:scale-105 cursor-default"
                    : "z-20 hover:z-50 hover:scale-105 cursor-default"
                }`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: paperBg,
                  borderRadius: "9px",
                }}
              >
                {item}
              </div>
            );
          })}

          {/* Front folder flaps with 3D perspective skew */}
          <div
            className={`absolute z-30 inset-0 w-full h-full origin-bottom transition-all duration-400 ease-in-out opacity-95 ${
              !open ? "group-hover:[transform:skew(12deg)_scaleY(0.78)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "6px 12px 12px 12px",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 -2px 10px rgba(0,0,0,0.4)",
              ...(open && { transform: "skew(14deg) scaleY(0.52)" }),
            }}
          />
          <div
            className={`absolute z-30 inset-0 w-full h-full origin-bottom transition-all duration-400 ease-in-out opacity-95 ${
              !open ? "group-hover:[transform:skew(-12deg)_scaleY(0.78)]" : ""
            }`}
            style={{
              backgroundColor: color,
              borderRadius: "6px 12px 12px 12px",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.2), 0 -2px 10px rgba(0,0,0,0.4)",
              ...(open && { transform: "skew(-14deg) scaleY(0.52)" }),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Folder;
