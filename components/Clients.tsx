"use client";

import React from "react";
import { Skills } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  // Split skills into two rows for dynamic effect
  const midPoint = Math.ceil(Skills.length / 2);
  const firstRow = Skills.slice(0, midPoint);
  const secondRow = Skills.slice(midPoint);

  return (
    <section id="Skills" className="py-20 w-full">
      <h1 className="heading">
        Explore My
        <span className="text-purple"> Skill-Set</span>
      </h1>

      <div className="flex flex-col mt-16 gap-8 w-screen relative left-[50%] right-[50%] -mx-[50vw]">
        {/* First Row - Moving Left to Right */}
        <InfiniteMovingCards
          items={firstRow}
          direction="left"
          speed="normal"
        />

        {/* Second Row - Moving Right to Left */}
        <InfiniteMovingCards
          items={secondRow}
          direction="right"
          speed="normal"
        />
      </div>
    </section>
  );
};

export default Clients;
