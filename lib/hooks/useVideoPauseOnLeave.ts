import { useEffect, useRef } from "react";

/**
 * Hook that pauses video when it leaves the viewport and plays when it enters
 * This improves performance by reducing CPU/GPU usage for off-screen videos
 */
export const useVideoPauseOnLeave = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Only set up observer if video is set to autoplay
    if (!video.autoplay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible - play it
            video.play().catch(() => {
              // Ignore autoplay errors (browser restrictions)
            });
          } else {
            // Video is not visible - pause it to save resources
            video.pause();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of video is visible
        rootMargin: "50px", // Start playing 50px before entering viewport
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return videoRef;
};

