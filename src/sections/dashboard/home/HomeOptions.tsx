import React from "react";
import { DashboardMenuOptions } from "@/constants";
import DashboardStats from "@/constants/DashboardStats";
import StatDisplay from "@/components/dashboard/home/StatDisplay";
import MenuOption from "@/components/dashboard/home/MenuOption";
import CreatePlan from "@/components/dashboard/home/CreateAPlan";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

export default function HomeOptions() {
  const navigate = useNavigate(); // React Router's useNavigate hook

  const handleCreatePlan = (planDetails: object) => {
    console.log("Creating a plan with the following details:", planDetails);
    // Navigate to a different page upon plan creation (replace '/new-page' with your actual route)
    navigate("/new-page");
  };

  return (
    <div className="ml-5 mt-5 flex flex-col items-center">
      <h1 className="mb-3 text-4xl font-semibold">Dashboard</h1>
      {/* Stat Displays */}
      <div className="stat-container">
        {DashboardStats.map((stat) => (
          <StatDisplay key={stat.name} label={stat.name} value={stat.value} />
        ))}
      </div>
      {/* Create Plan Card */}

      <ScrollArea className="mb-9">
        <div className="flex flex-row space-x-4">
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
