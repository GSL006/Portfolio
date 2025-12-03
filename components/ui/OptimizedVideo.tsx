"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  animate?: { scale?: number };
  transition?: { duration?: number };
  asMotion?: boolean;
}

/**
 * Optimized video component that pauses when leaving viewport
 * Improves performance by reducing CPU/GPU usage for off-screen videos
 */
export const OptimizedVideo = ({
  src,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  animate,
  transition,
  asMotion = false,
}: OptimizedVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Apply pause-on-leave optimization
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoPlay]);

  const videoProps = {
    ref: videoRef,
    autoPlay,
    loop,
    muted,
    playsInline,
    className: cn(className),
    ...(animate && { animate }),
    ...(transition && { transition }),
  };

  if (asMotion) {
    return (
      <motion.video {...videoProps}>
        <source src={src} type="video/mp4" />
      </motion.video>
    );
  }

  return (
    <video {...videoProps}>
      <source src={src} type="video/mp4" />
    </video>
  );
};

