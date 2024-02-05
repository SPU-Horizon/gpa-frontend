import React from "react";
import {DashboardMenuOptions } from "@/constants";
import DashboardStats from "@/constants/DashboardStats";
import StatDisplay from "@/components/dashboard/home/StatDisplay";
import MenuOption from "@/components/dashboard/home/MenuOption";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function HomeOptions() {
  return (
    <div className="ml-5 mt-5 flex flex-col items-center">
      <h1 className="mb-3 text-4xl font-semibold">Dashboard</h1>
      
      {/* Stat Displays */}     
      <div className="stat-container">
        {DashboardStats.map((stat) => (
          <StatDisplay key={stat.name} label={stat.name} value={stat.value} />
        ))}
      </div>

      {/* ScrollArea for Menu Options */}
      <ScrollArea className="mb-8"> {/* Added bottom margin */}
        <div className="flex space-x-4 pb-4">
          {DashboardMenuOptions.map((option) => (
            <MenuOption
              key={option.name}
              option={option}
              className="w-[250px]"
              aspectRatio="portrait"
              width={250}
              height={330}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      
    </div>
  );
}
