import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import React, { useState, useMemo } from "react";
import { Class } from "@/constants/CardData";
import { ClassCardList } from "@/components/dashboard/transcript/ClassCardList";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/custom/SearchBar";
import { useCourseStore } from "@/stores"; //Absolute imports
import { get } from "http";
import { useEffect } from "react";

interface DashboardProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  Class: Class[];
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
}

export default function ClassHistory({ Class }: DashboardProps) {

  const {classList} = useCourseStore(); //Destructuring


  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="vertical"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-full items-stretch"
      >
        <ResizablePanel defaultSize={50} minSize={0} maxSize={100}>
        <div className="flex items-center px-3 py-2">
          <h1 className="text-xl font-bold ml-2">Your Classes</h1>
          <h2 className = "text-base ml-auto">Current GPA: <span className="font-bold">{3.42}</span></h2>
            {/*<Select onValueChange={(value) => handleFilterChange(value)} defaultValue="All Classes">*/}
            <Select defaultValue="All Classes">

              <SelectTrigger className="ml-auto mr-2 w-auto text-base">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent className="bg-white-light border-none">
                <SelectGroup>
                  <SelectItem
                    value="Completed"
                  >
                    Completed
                  </SelectItem>
                  <SelectItem
                    value="In Progress"
                  >
                    In Progress
                  </SelectItem>
                  <SelectItem
                    value="Remaining"
                  >
                    Remaining
                  </SelectItem>
                  <SelectItem
                    value="All Classes"
                  >
                    All Classes
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
        <Separator />

        <ClassCardList items={classList}/>
        // Still need to update the GPA displayed on this page*******
        
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}