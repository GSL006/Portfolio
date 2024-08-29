"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
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
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Clone the items to create an infinite scroll effect
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
        speed === "fast" ? "25s" : speed === "normal" ? "25s" : "25s"
      );
    }
  };

  return (
    <ul
      ref={scrollerRef}
      className={cn(
        "flex min-w-full shrink-0 gap-10 py-4 w-max flex-nowrap overflow-hidden relative",
        start && "animate-scroll",
        pauseOnHover && "hover:[animation-play-state:paused]",
        className
      )}
      style={{
        display: "flex",
        animation: `scroll var(--animation-duration, 40s) linear infinite`,
        animationDirection: "var(--animation-direction, normal)",
        whiteSpace: "nowrap",
      }}
    >
      {items.map((item, idx) => (
        <li
          className="w-[120px] h-[120px] flex justify-center items-center flex-shrink-0"
          key={idx}
          style={{ background: "transparent" }}
        >
          <img
            src={item.img}
            alt="profile-img"
            className="w-full h-full object-contain pl-300 pr-300"
          />
        </li>
      ))}
    </ul>
  );
};
