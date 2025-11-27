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
                  style={{ minWidth: '800px' }}
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
                      
                      return (
                        <rect
                          key={day.date}
                          x={weekIndex * WEEK_WIDTH + LEFT_PADDING}
                          y={gridRow * DAY_HEIGHT + TOP_PADDING}
                          width={CELL}
                          height={CELL}
                          rx={3}
                          ry={3}
                          fill={getColor(day.intensity)}
                          data-count={day.count}
                          data-date={day.date}
                          className="transition-all duration-200 cursor-pointer hover:opacity-80 hover:outline hover:outline-2 hover:outline-purple/90"
                          onMouseOver={(e) => handleMouseOver(e, day)}
                          onMouseMove={handleMouseMove}
                          onMouseOut={handleMouseOut}
                        />
                      );
                    })
                  )}
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
