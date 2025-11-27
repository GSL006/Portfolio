"use client";
import React, { useState, useEffect } from "react";
import { workExperience } from "@/data";
import { motion, AnimatePresence } from "framer-motion";

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedExperience !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedExperience]);

  return (
    <div id="experience" className="py-20 pb-10 w-full">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      <div className="w-full mt-12 relative">
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-purple to-transparent hidden md:block" />

        {/* Timeline Items */}
        <div className="relative z-10">
          {workExperience.map((card, index) => (
            <div
              key={card.id}
              className={`mb-16 md:mb-24 flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content Card */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div
                  onClick={() => setSelectedExperience(card.id)}
                  className="group relative p-6 rounded-2xl border border-white/[0.1] bg-black-100 hover:border-purple/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(203,172,249,0.3)] cursor-pointer"
                  style={{
                    background: "rgb(4,7,29)",
                    backgroundColor:
                      "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                  }}
                >
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                    {card.title}
                  </h2>
                  <p className="text-white-100 font-medium mb-4">{card.desc}</p>
                  
                  {/* Click for details text */}
                  <div className="flex items-center gap-2 text-purple/70 text-sm mt-4">
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                      />
                    </svg>
                    <span className="group-hover:text-purple transition-colors">
                      Click for more details
                    </span>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Center Logo/Icon */}
              <div className="relative my-6 md:my-0">
                {/* Connecting Line to Card (hidden on mobile) */}
                <div
                  className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 ${
                    index % 2 === 0 ? "right-full" : "left-full"
                  } w-12 h-0.5 bg-purple/50`}
                />
                
                {/* Logo Circle with Moving Border */}
                <div className="relative z-20 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full p-[2px]">
                  {/* Animated border - same as Show my work button */}
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

                  {/* Inner Circle Container */}
                  <div className="relative w-full h-full rounded-full bg-black flex items-center justify-center p-2">
                    <img
                      src={card.thumbnail}
                      alt={card.title}
                      className="w-14 h-14 md:w-20 md:h-20 object-contain rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Empty Space for Alternate Side (Desktop only) */}
              <div className="hidden md:block w-5/12" />
            </div>
          ))}
        </div>

        {/* Bottom Timeline Fade */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-purple to-transparent hidden md:block" />
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedExperience !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-purple/30 bg-black-100 p-8 shadow-[0_0_50px_rgba(203,172,249,0.3)]"
                style={{
                  background: "rgb(4,7,29)",
                  backgroundColor:
                    "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-purple/10 hover:bg-purple/20 border border-purple/30 flex items-center justify-center transition-colors group"
                >
                  <svg
                    className="w-5 h-5 text-purple group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Modal Content */}
                {workExperience
                  .filter((exp) => exp.id === selectedExperience)
                  .map((exp) => (
                    <div key={exp.id}>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {exp.title}
                      </h2>
                      <p className="text-purple text-lg font-semibold mb-8">
                        {exp.desc}
                      </p>

                      <div className="space-y-4">
                        {exp.details?.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-3"
                          >
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-purple mt-2" />
                            <p className="text-white-100 leading-relaxed">
                              {detail}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
