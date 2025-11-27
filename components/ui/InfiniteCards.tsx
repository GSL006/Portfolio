"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    img: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      addAnimation();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  function addAnimation() {
    if (scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Clone the items multiple times for seamless loop
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (scrollerRef.current) {
      scrollerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "normal" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (scrollerRef.current) {
      scrollerRef.current.style.setProperty(
        "--animation-duration",
        speed === "fast" ? "10s" : speed === "normal" ? "10s" : "25s"
      );
    }
  };

  const SkillCard = ({ item }: { item: { name: string; img: string; quote: string } }) => (
    <li className="group relative w-32 h-32 flex-shrink-0">
      {/* Card Container */}
      <div
        className="relative w-full h-full rounded-2xl border border-white/[0.1] bg-black-100 hover:border-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(203,172,249,0.3)] flex items-center justify-center p-4 overflow-hidden hover:scale-110"
        style={{
          background: "rgb(4,7,29)",
          backgroundColor:
            "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
        }}
      >
        {/* Skill Icon */}
        <img
          src={item.img}
          alt={item.name}
          className="w-20 h-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
        />

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-purple/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Skill Name Tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <div className="relative inline-flex overflow-hidden rounded-lg p-[1px]">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="relative inline-flex items-center justify-center rounded-lg bg-slate-950 px-3 py-1.5 text-sm font-medium text-white whitespace-nowrap">
            {item.name}
          </span>
        </div>
      </div>
    </li>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden pb-16"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
          className
        )}
        style={{
          display: "flex",
          animation: start
            ? `scroll ${speed === "fast" ? "10s" : speed === "normal" ? "10s" : "25s"} linear infinite`
            : "none",
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {items.map((item, idx) => (
          <SkillCard key={`original-${idx}`} item={item} />
        ))}
      </ul>
    </div>
  );
};
