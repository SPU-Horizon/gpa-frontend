import React from "react";
import { StatsCard } from "./StatsCard";
import { TempCardStats } from "@/constants/StatsContent";

export default function StatsGroup() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-3 gap-2 md:grid-cols-2 sm:gap-3 sm:flex sm:flex-col">
        {TempCardStats.map((stats, i) => (
          <StatsCard key={i} title={stats.title} value={stats.value} />
        ))}
      </div>
    </div>
  );
}
