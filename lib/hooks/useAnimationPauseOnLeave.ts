import { useEffect, useRef, useState } from "react";

/**
 * Hook that pauses CSS animations when element leaves the viewport
 * Improves performance by reducing CPU/GPU usage for off-screen animations
 */
export const useAnimationPauseOnLeave = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible - resume animations
            setIsPaused(false);
            // Pause animations on all child elements with animation classes
            const animatedElements = element.querySelectorAll('.animate-scroll-down, .animate-scroll-up');
            animatedElements.forEach((el) => {
              (el as HTMLElement).style.animationPlayState = "running";
            });
          } else {
            // Element is not visible - pause animations
            setIsPaused(true);
            // Pause animations on all child elements with animation classes
            const animatedElements = element.querySelectorAll('.animate-scroll-down, .animate-scroll-up');
            animatedElements.forEach((el) => {
              (el as HTMLElement).style.animationPlayState = "paused";
            });
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "50px", // Start animating 50px before entering viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { elementRef, isPaused };
};

/**
 * Hook that pauses JavaScript-based animations (intervals/timeouts) when element leaves viewport
 */
export const useJSAnimationPauseOnLeave = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { elementRef, isVisible };
};

