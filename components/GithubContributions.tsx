"use client";

import React, { useEffect, useState } from "react";
import { githubContributions } from "@/data";

interface Contribution {
  date: string;
  count: number;
  intensity: number;
  week: number;
  weekday: number;
}

interface ContributionData {
  contributions: Contribution[];
  totalContributions: number;
  username: string;
  error?: string;
}

const GithubContributions: React.FC = () => {
  const [contributionData, setContributionData] = useState<ContributionData>({
    contributions: [],
    totalContributions: 0,
    username: githubContributions.username,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const [animatedPath, setAnimatedPath] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchContributions = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/github-contributions");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ContributionData = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setContributionData(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching contributions:", err);
        setError("Failed to load contributions");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  // Animated path effect - truly continuous snake movement with no jumps
  useEffect(() => {
    if (!contributionData.contributions.length) return;
    
    const contributions = contributionData.contributions;
    const trailLength = 7; // Number of squares visible in trail
    const animationSpeed = 80; 
    const pathQueue: Contribution[] = [];
    let animationIndex = 0;
    let isBuilding = false;
    
    // Create a map for fast lookups
    const contributionMap = new Map<string, Contribution>();
    contributions.forEach(c => {
      contributionMap.set(`${c.week}-${c.weekday}`, c);
    });
    
    // Get contribution at specific position
    const getContribution = (week: number, weekday: number): Contribution | null => {
      const key = `${week}-${weekday}`;
      return contributionMap.get(key) || null;
    };
    
    // 5 different smooth movement patterns
    const patterns = [
      // Pattern 1: Horizontal wave (snake through rows left-to-right, then right-to-left)
      (current: Contribution, direction: { horizontal: number; vertical: number }) => {
        let next = getContribution(current.week + direction.horizontal, current.weekday);
        if (!next) {
          // Change row and reverse direction
          direction.horizontal *= -1;
          direction.vertical = direction.vertical === 1 ? -1 : 1;
          next = getContribution(current.week, current.weekday + direction.vertical);
          if (!next) {
            // Wrap to opposite side
            const oppositeWeek = direction.horizontal > 0 ? Math.min(...contributions.map(c => c.week)) : Math.max(...contributions.map(c => c.week));
            next = getContribution(oppositeWeek, current.weekday);
          }
        }
        return { next: next || current, direction };
      },
      
      // Pattern 2: Vertical wave (snake through columns up-down, then down-up)
      (current: Contribution, direction: { horizontal: number; vertical: number }) => {
        let next = getContribution(current.week, current.weekday + direction.vertical);
        if (!next || current.weekday + direction.vertical < 0 || current.weekday + direction.vertical > 6) {
          // Change column and reverse direction
          direction.vertical *= -1;
          next = getContribution(current.week + direction.horizontal, current.weekday);
          if (!next) {
            direction.horizontal *= -1;
            next = getContribution(current.week + direction.horizontal, current.weekday);
          }
        }
        return { next: next || current, direction };
      },
      
      // Pattern 3: Diagonal sweep (zigzag diagonally)
      (current: Contribution, direction: { horizontal: number; vertical: number }) => {
        let next = getContribution(current.week + direction.horizontal, current.weekday + direction.vertical);
        if (!next) {
          // Bounce off edges
          if (current.weekday + direction.vertical < 0 || current.weekday + direction.vertical > 6) {
            direction.vertical *= -1;
          }
          if (!getContribution(current.week + direction.horizontal, current.weekday)) {
            direction.horizontal *= -1;
          }
          next = getContribution(current.week + direction.horizontal, current.weekday + direction.vertical);
          if (!next) {
            next = getContribution(current.week + direction.horizontal, current.weekday);
          }
        }
        return { next: next || current, direction };
      },
      
      // Pattern 4: Spiral-like (curved path)
      (current: Contribution, direction: { horizontal: number; vertical: number; counter: number }) => {
        direction.counter = (direction.counter || 0) + 1;
        
        // Change direction every 5-8 steps to create curves
        if (direction.counter > 5 + Math.floor(Math.random() * 3)) {
          direction.counter = 0;
          const choices = [
            { horizontal: 1, vertical: 0 },
            { horizontal: -1, vertical: 0 },
            { horizontal: 0, vertical: 1 },
            { horizontal: 0, vertical: -1 },
            { horizontal: 1, vertical: 1 },
            { horizontal: 1, vertical: -1 },
          ];
          const newDir = choices[Math.floor(Math.random() * choices.length)];
          direction.horizontal = newDir.horizontal;
          direction.vertical = newDir.vertical;
        }
        
        let next = getContribution(current.week + direction.horizontal, current.weekday + direction.vertical);
        if (!next) {
          direction.counter = 0;
          const allDirections = [
            { h: 1, v: 0 }, { h: -1, v: 0 }, { h: 0, v: 1 }, { h: 0, v: -1 },
            { h: 1, v: 1 }, { h: 1, v: -1 }, { h: -1, v: 1 }, { h: -1, v: -1 }
          ];
          for (const d of allDirections) {
            next = getContribution(current.week + d.h, current.weekday + d.v);
            if (next) {
              direction.horizontal = d.h;
              direction.vertical = d.v;
              break;
            }
          }
        }
        return { next: next || current, direction };
      },
      
      // Pattern 5: Figure-8 / infinity pattern
      (current: Contribution, direction: { horizontal: number; vertical: number; phase: number }) => {
        direction.phase = ((direction.phase || 0) + 1) % 40; // 40-step cycle
        
        // Calculate smooth figure-8 movement
        const t = direction.phase / 40;
        const angle = t * Math.PI * 2;
        
        // Determine next direction based on sine wave
        if (direction.phase < 20) {
          // Upper loop
          direction.horizontal = Math.cos(angle) > 0 ? 1 : -1;
          direction.vertical = direction.phase < 10 ? 1 : -1;
        } else {
          // Lower loop
          direction.horizontal = Math.cos(angle) > 0 ? 1 : -1;
          direction.vertical = direction.phase < 30 ? -1 : 1;
        }
        
        let next = getContribution(current.week + direction.horizontal, current.weekday + direction.vertical);
        if (!next) {
          next = getContribution(current.week + direction.horizontal, current.weekday) ||
                 getContribution(current.week, current.weekday + direction.vertical);
        }
        return { next: next || current, direction };
      }
    ];
    
    let currentPattern = Math.floor(Math.random() * patterns.length);
    let patternDirection: { horizontal: number; vertical: number; counter: number; phase: number } = { 
      horizontal: 1, 
      vertical: 1, 
      counter: 0, 
      phase: 0 
    };

    // Build a continuous path using smooth patterns
    const buildPath = () => {
      if (isBuilding) return;
      isBuilding = true;
      
      // Start from last position or random
      let current: Contribution;
      if (pathQueue.length > 0) {
        current = pathQueue[pathQueue.length - 1];
      } else {
        // Start from a good position
        current = contributions[Math.floor(Math.random() * contributions.length)];
        pathQueue.push(current);
      }
      
      // Build path using current pattern
      let stepsBuilt = 0;
      const maxSteps = 200;
      let patternSteps = 0;
      const patternSwitchInterval = 40 + Math.floor(Math.random() * 30); // Switch pattern every 40-70 steps
      
      while (stepsBuilt < maxSteps) {
        // Switch to a new pattern periodically
        if (patternSteps >= patternSwitchInterval) {
          const newPattern = (currentPattern + 1 + Math.floor(Math.random() * 4)) % patterns.length;
          currentPattern = newPattern;
          patternDirection = { horizontal: Math.random() > 0.5 ? 1 : -1, vertical: 1, counter: 0, phase: 0 };
          patternSteps = 0;
        }
        
        // Get next position from current pattern
        const result = patterns[currentPattern](current, patternDirection);
        const next = result.next;
        // Merge direction, preserving all properties
        patternDirection = { 
          ...patternDirection, 
          ...result.direction 
        };
        
        // Only add if it's different from current
        if (next.date !== current.date) {
          pathQueue.push(next);
          current = next;
          stepsBuilt++;
          patternSteps++;
        } else {
          // Pattern got stuck, switch to new pattern
          currentPattern = (currentPattern + 1) % patterns.length;
          patternDirection = { horizontal: 1, vertical: 1, counter: 0, phase: 0 };
          patternSteps = 0;
        }
      }
      
      isBuilding = false;
    };

    // Build massive initial buffer - build 3 times
    buildPath();
    buildPath();
    buildPath();

    // Start smooth continuous animation
    const intervalId = setInterval(() => {
      // Very aggressive buffering - build more path way ahead of time
      if (pathQueue.length < animationIndex + 150 && !isBuilding) {
        buildPath();
      }
      
      // Absolute safety check - never let animation catch up
      if (animationIndex >= pathQueue.length - 1) {
        console.warn('Animation too close to end - pausing this frame');
        // Force immediate path building
        if (contributions.length > 0) {
          const start = contributions[Math.floor(Math.random() * contributions.length)];
          pathQueue.push(start);
        }
        return; // Skip this frame to let path build
      }
      
      // Show the trailing segment
      const start = Math.max(0, animationIndex - trailLength);
      const end = Math.min(animationIndex + 1, pathQueue.length);
      const trailContributions = pathQueue.slice(start, end);
      
      // Extra safety - only show if we have valid trail
      if (trailContributions.length > 0) {
        const trailDates = new Set(trailContributions.map(c => c.date));
        setAnimatedPath(trailDates);
      }
      
      animationIndex++;
      
      // Clean up old entries less aggressively
      if (animationIndex > 300 && pathQueue.length > 400) {
        const removeCount = 100;
        pathQueue.splice(0, removeCount);
        animationIndex -= removeCount;
      }
    }, animationSpeed);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [contributionData.contributions]);

  // Constants for grid layout
  const CELL = 14;
  const GAP = 4;
  const WEEK_WIDTH = CELL + GAP;
  const DAY_HEIGHT = CELL + GAP;
  const LEFT_PADDING = -140;
  const TOP_PADDING = 30;
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Process contributions data
  const contributions = contributionData.contributions;
  
  // Group by week
  const weeks = new Map<number, { x: number; days: Contribution[] }>();
  contributions.forEach(c => {
    if (!weeks.has(c.week)) {
      weeks.set(c.week, { x: c.week, days: [] });
    }
    weeks.get(c.week)!.days.push(c);
  });
  
  const sortedWeeks = Array.from(weeks.values()).sort((a, b) => a.x - b.x);
  
  // Find first week to normalize indices
  const firstWeek = sortedWeeks.length > 0 ? sortedWeeks[0].x : 0;
  
  // Calculate month label positions
  const monthPositions: { month: string; x: number }[] = [];
  const seenMonths = new Set<string>();
  
  contributions.forEach(c => {
    const d = new Date(c.date);
    if (d.getDate() === 1) {
      const monthName = MONTH_NAMES[d.getMonth()];
      const weekIndex = c.week - firstWeek;
      const x = weekIndex * WEEK_WIDTH;
      
      if (!seenMonths.has(monthName)) {
        monthPositions.push({ month: monthName, x });
        seenMonths.add(monthName);
      }
    }
  });

  // Color mapping based on intensity
  const getColor = (intensity: number): string => {
    const colors = [
      "rgba(203, 172, 249, 0.1)",
      "rgba(203, 172, 249, 0.3)",
      "rgba(203, 172, 249, 0.5)",
      "rgba(203, 172, 249, 0.7)",
      "rgba(203, 172, 249, 0.9)",
    ];
    return colors[Math.min(intensity, 4)];
  };

  const handleMouseOver = (e: React.MouseEvent<SVGRectElement>, c: Contribution) => {
    const dateObj = new Date(c.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const contributionText = c.count === 1 ? 'contribution' : 'contributions';
    
    setTooltip({
      text: `${c.count} ${contributionText} on ${formattedDate}`,
      x: e.clientX,
      y: e.clientY - 50,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip) {
      setTooltip(prev => prev ? {
        ...prev,
        x: e.clientX,
        y: e.clientY - 50,
      } : null);
    }
  };

  const handleMouseOut = () => {
    setTooltip(null);
  };

  return (
    <div className="py-20 w-full" id="github">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="heading text-left">
              GitHub <span className="text-purple">Contributions</span>
            </h1>
            <p className="text-white-100 mt-2">My coding activity</p>
          </div>
          <div className="mt-4 md:mt-0">
            {loading ? (
              <span className="text-3xl md:text-4xl font-bold text-purple/50">
                Loading...
              </span>
            ) : (
              <span className="text-3xl md:text-4xl font-bold text-purple">
                {contributionData.totalContributions} contributions
              </span>
            )}
          </div>
        </div>

        {/* Contributions Graph Container */}
        <div className="w-full rounded-2xl border border-purple/20 bg-black-100 p-6 hover:border-purple hover:shadow-[0_0_20px_rgba(203,172,249,0.3)] transition-all duration-300">
          {loading ? (
            <div className="w-full min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple mb-4"></div>
                <p className="text-white-100">Loading contribution graph...</p>
              </div>
            </div>
          ) : error ? (
            <div className="w-full min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-white-100 mb-4 text-red-400">{error}</p>
                <a
                  href={githubContributions.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple hover:text-purple/80 transition-colors font-semibold"
                >
                  View on GitHub
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ) : contributions.length > 0 ? (
            <>
              <div className="w-full overflow-x-auto">
                <svg
                  width="100%"
                  height={7 * DAY_HEIGHT + TOP_PADDING + 20}
                  viewBox={`0 0 ${sortedWeeks.length * WEEK_WIDTH + LEFT_PADDING + 20} ${7 * DAY_HEIGHT + TOP_PADDING + 20}`}
                  className="overflow-visible"
                  style={{ minWidth: '800px', willChange: 'auto' }}
                >
                  {/* Month labels */}
                  {monthPositions.map((m, idx) => (
                    <text
                      key={`${m.month}-${idx}`}
                      x={(m.x - (firstWeek * WEEK_WIDTH)) + LEFT_PADDING}
                      y={TOP_PADDING - 10}
                      fill="rgba(255, 255, 255, 0.95)"
                      fontSize="12"
                      fontWeight="600"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      {m.month}
                    </text>
                  ))}

                  {/* Weekday labels */}
                  {["Mon", "Wed", "Fri"].map((day, i) => (
                    <text
                      key={day}
                      x={LEFT_PADDING - 20}
                      y={TOP_PADDING + (i * 2 + 1) * DAY_HEIGHT + 9}
                      textAnchor="end"
                      fill="rgba(255, 255, 255, 0.95)"
                      fontSize="11"
                      fontWeight="600"
                      fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                    >
                      {day}
                    </text>
                  ))}

                  {/* Contribution squares */}
                  {sortedWeeks.map((week) =>
                    week.days.map((day: Contribution) => {
                      // Use weekday from API (0=Sun, 1=Mon, ..., 6=Sat)
                      const gridRow = day.weekday;
                      const weekIndex = week.x - firstWeek;
                      const isAnimated = animatedPath.has(day.date);
                      
                      // Calculate position in snake trail (0 = tail, higher = head)
                      const pathArray = Array.from(animatedPath);
                      const positionInSnake = pathArray.indexOf(day.date);
                      const isHead = positionInSnake === pathArray.length - 1;
                      
                      return (
                        <g key={day.date}>
                          <rect
                            x={weekIndex * WEEK_WIDTH + LEFT_PADDING}
                            y={gridRow * DAY_HEIGHT + TOP_PADDING}
                            width={CELL}
                            height={CELL}
                            rx={3}
                            ry={3}
                            fill={getColor(day.intensity)}
                            data-count={day.count}
                            data-date={day.date}
                            className="cursor-pointer hover:opacity-80"
                            style={{ transition: 'opacity 0.2s ease' }}
                            onMouseOver={(e) => handleMouseOver(e, day)}
                            onMouseMove={handleMouseMove}
                            onMouseOut={handleMouseOut}
                          />
                          {isAnimated && (
                            <>
                              {/* Snake body with gradient opacity */}
                              <rect
                                x={weekIndex * WEEK_WIDTH + LEFT_PADDING}
                                y={gridRow * DAY_HEIGHT + TOP_PADDING}
                                width={CELL}
                                height={CELL}
                                rx={3}
                                ry={3}
                                fill="none"
                                stroke="url(#purpleGradient)"
                                strokeWidth={isHead ? "3" : "2.5"}
                                className="pointer-events-none"
                                style={{
                                  filter: isHead 
                                    ? 'drop-shadow(0 0 12px rgba(139, 92, 246, 1))' 
                                    : 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.7))',
                                  opacity: isHead ? 1 : 0.6 + (positionInSnake / pathArray.length) * 0.4,
                                  willChange: 'opacity',
                                }}
                              />
                              {/* Brighter fill for head */}
                              {isHead && (
                                <rect
                                  x={weekIndex * WEEK_WIDTH + LEFT_PADDING}
                                  y={gridRow * DAY_HEIGHT + TOP_PADDING}
                                  width={CELL}
                                  height={CELL}
                                  rx={3}
                                  ry={3}
                                  fill="rgba(139, 92, 246, 0.3)"
                                  className="pointer-events-none"
                                />
                              )}
                            </>
                          )}
                        </g>
                      );
                    })
                  )}
                  
                  {/* Gradient definition for animated border */}
                  <defs>
                    <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#CBACF9" stopOpacity="1" />
                      <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#CBACF9" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Color Legend */}
              <div className="mt-6 flex items-center justify-end gap-2">
                <span className="text-white-100 text-sm">Less</span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="w-3 h-3 rounded"
                      style={{
                        backgroundColor: getColor(level),
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-white-100 text-sm">More</span>
              </div>
            </>
          ) : (
            <div className="w-full min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-white-100 mb-4">
                  GitHub contributions graph will be displayed here
                </p>
                <a
                  href={githubContributions.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple hover:text-purple/80 transition-colors font-semibold"
                >
                  View on GitHub
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Custom Tooltip */}
        {tooltip && (
          <div
            className="fixed z-[9999] px-3 py-2 bg-black-100 border border-purple/50 rounded-md shadow-lg pointer-events-none"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <p className="text-white text-xs md:text-sm font-medium whitespace-nowrap">
              {tooltip.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubContributions;
