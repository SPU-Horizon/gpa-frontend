import React from "react";
import MenuOption from "@/components/dashboard/home/MenuOption";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DashboardMenuOptions } from "@/constants/DashboardMenuOptions";

export default function HomeOptions() {
  return (
    <div className="ml-5 mt-5">
      <h1 className=" mb-3 text-4xl font-semibold">Dashboard</h1>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {DashboardMenuOptions.map((Classes) => (
              <MenuOption
                key={Classes.name}
                option={Classes}
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
    </div>
  );
}
