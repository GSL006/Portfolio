import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const username = "gagan-sl6";
    const url = `https://github-contributions-api.deno.dev/${username}.json`;
    
    const response = await fetch(url, { cache: "no-store" });
    
    if (!response.ok) {
      throw new Error("Failed to fetch JSON");
    }
    
    const data = await response.json();
    
    // The Deno API returns: { contributions: [[day, day, ...], [day, day, ...], ...] }
    // Each inner array is a week, containing 7 days
    const weeks = Array.isArray(data.contributions) ? data.contributions : [];
    
    // Flatten and transform the data
    const contributions: any[] = [];
    let totalCount = 0;
    
    weeks.forEach((week: any[], weekIndex: number) => {
      if (Array.isArray(week)) {
        week.forEach((day: any, dayIndex: number) => {
          const count = day.contributionCount || 0;
          totalCount += count;
          
          // Map contribution level to intensity (0-4)
          const intensityMap: { [key: string]: number } = {
            'NONE': 0,
            'FIRST_QUARTILE': 1,
            'SECOND_QUARTILE': 2,
            'THIRD_QUARTILE': 3,
            'FOURTH_QUARTILE': 4,
          };
          
          contributions.push({
            date: day.date,
            count,
            intensity: intensityMap[day.contributionLevel] || 0,
            week: weekIndex,
            weekday: dayIndex,
          });
        });
      }
    });
    
    return NextResponse.json({
      username,
      totalContributions: totalCount,
      contributions,
    });
  } catch (err) {
    console.error("Error fetching GitHub contributions:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to fetch",
        totalContributions: 0,
        contributions: [],
        username: "gagan-sl6",
      },
      { status: 200 }
    );
  }
}
