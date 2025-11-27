"use client";

import { education } from "@/data";
import { motion } from "framer-motion";

const Education = () => {
  return (
    <div className="py-20 w-full" id="education">
      <h1 className="heading">
        My <span className="text-purple">Education</span>
      </h1>

      <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="relative group overflow-hidden rounded-3xl p-[1px]"
          >
            {/* Animated border */}
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            
            <div className="relative h-full rounded-3xl bg-black-100 p-6 overflow-hidden">
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-3 border-2 border-white transition-all duration-300">
                    {edu.icon && (
                      <img
                        src={edu.icon}
                        alt={edu.institution}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div className="text-center mb-3">
                  <span className="text-purple text-sm font-semibold">
                    {edu.duration}
                  </span>
                </div>

                {/* Degree & Field */}
                <h3 className="text-white text-xl font-bold text-center mb-2">
                  {edu.degree}
                </h3>
                {edu.field && (
                  <p className="text-white-100 text-sm text-center mb-4">
                    {edu.field}
                  </p>
                )}

                {/* Institution & Location */}
                <div className="mt-auto">
                  <p className="text-white-100 text-base font-semibold text-center">
                    {edu.institution}
                  </p>
                  <p className="text-white-100/70 text-sm text-center mt-1">
                    {edu.location}
                  </p>
                </div>
              </div>

              {/* Glowing blur effect on hover */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
                <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-purple/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-purple/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;

