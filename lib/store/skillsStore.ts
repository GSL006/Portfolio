import { Skills } from "@/data";

// Cache object - computed once when module loads
let skillsCache: {
  leftRepeated: typeof Skills;
  rightRepeated: typeof Skills;
  firstRow: typeof Skills;
  secondRow: typeof Skills;
} | null = null;

/**
 * Get processed skills arrays - computed once, cached forever
 * This ensures we never recompute the same data
 * 
 * @returns Cached processed skills arrays
 */
export const getProcessedSkills = () => {
  // If cache exists, return it immediately
  if (skillsCache) {
    return skillsCache;
  }

  // Compute once and cache
  const midPoint = Math.ceil(Skills.length / 2);
  const leftLists = Skills.slice(0, midPoint);
  const rightLists = Skills.slice(midPoint);
  
  skillsCache = {
    leftRepeated: [...leftLists, ...leftLists, ...leftLists],
    rightRepeated: [...rightLists, ...rightLists, ...rightLists],
    firstRow: leftLists,
    secondRow: rightLists,
  };

  return skillsCache;
};

/**
 * Clear cache (useful for testing or if Skills array changes)
 * Note: In production, this should rarely be needed since Skills is a constant
 */
export const clearSkillsCache = () => {
  skillsCache = null;
};

