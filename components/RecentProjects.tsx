"use client";

import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { motion, AnimatePresence } from "framer-motion";

const RecentProjects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-10 px-4 max-w-7xl mx-auto">
        {projects.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredProject(item.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => setSelectedProject(item.id)}
            className="group relative rounded-3xl border border-white/[0.1] bg-black-100 overflow-hidden cursor-pointer hover:border-purple/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(203,172,249,0.3)]"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            {/* Project Image */}
            <div className="relative w-full h-64 overflow-hidden bg-[#13162D]">
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
                animate={{
                  scale: hoveredProject === item.id ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black-100 via-transparent to-transparent opacity-60" />
              
              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredProject === item.id ? 1 : 0 }}
                className="absolute inset-0 bg-purple/10 backdrop-blur-[2px] flex items-center justify-center"
              >
                <span className="text-white text-lg font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Click for details
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple transition-colors">
                {item.title}
              </h2>
              
              <p className="text-white-100 text-sm leading-relaxed line-clamp-3 mb-4">
                {item.des}
              </p>

              {/* Tech Stack Icons */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  {item.iconLists.slice(0, 5).map((icon, idx) => (
                    <div
                      key={idx}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center hover:scale-110 transition-transform"
                      style={{
                        transform: `translateX(-${5 * idx}px)`,
                      }}
                    >
                      <img src={icon} alt={`tech-${idx}`} className="p-2" />
                    </div>
                  ))}
                </div>

                {/* GitHub Link */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-purple hover:text-purple/80 transition-colors text-sm font-medium"
                >
                  <span>GitHub</span>
                  <FaLocationArrow className="text-xs" />
                </a>
              </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

              {/* Detailed Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9998] flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-purple/30 bg-black-100 shadow-[0_0_50px_rgba(203,172,249,0.3)] scrollbar-thin scrollbar-thumb-purple/50 scrollbar-track-transparent"
                style={{
                  background: "rgb(4,7,29)",
                  backgroundColor:
                    "linear-gradient(135deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="sticky top-4 right-4 ml-auto w-10 h-10 rounded-full bg-purple/10 hover:bg-purple/20 border border-purple/30 flex items-center justify-center transition-colors group z-50 mb-4 mr-4"
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
                {projects
                  .filter((proj) => proj.id === selectedProject)
                  .map((proj) => (
                    <div key={proj.id}>
                      {/* Project Image */}
                      <div className="relative w-full h-64 overflow-hidden rounded-t-2xl bg-[#13162D]">
                        <img
                          src={proj.img}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black-100 via-transparent to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                          {proj.title}
                        </h2>

                        {/* Tech Stack */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-purple mb-4">
                            Tech Stack
                          </h3>
                          <div className="flex flex-wrap gap-4">
                            {proj.iconLists.map((icon, idx) => (
                              <div
                                key={idx}
                                className="group relative"
                              >
                                <div className="border border-white/[.2] rounded-xl bg-black-200 p-3 flex items-center justify-center hover:border-purple/50 hover:scale-110 transition-all duration-200 cursor-pointer">
                                  <img src={icon} alt={`tech-${idx}`} className="w-10 h-10" />
                                </div>
                                {/* Tooltip */}
                                {proj.iconNames && proj.iconNames[idx] && (
                                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    <div className="relative inline-flex overflow-hidden rounded-lg p-[1px]">
                                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                      <span className="relative inline-flex items-center justify-center rounded-lg bg-slate-950 px-3 py-1.5 text-sm font-medium text-white whitespace-nowrap">
                                        {proj.iconNames[idx]}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Detailed Description */}
                        {proj.details && (
                          <div className="mb-8">
                            <h3 className="text-xl font-semibold text-purple mb-4">
                              Project Details
                            </h3>
                            <div className="space-y-4">
                              {proj.details.map((detail, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex gap-3"
                                >
                                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-purple mt-2" />
                                  <p className="text-white-100 leading-relaxed text-base">
                                    {detail}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-4">
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative w-full inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none"
                          >
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              View on GitHub
                            </span>
                          </a>
                        </div>
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

export default RecentProjects;
