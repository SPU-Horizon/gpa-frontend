import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Class } from "@/constants/CardData";
import { ClassCard } from "@/components/dashboard/ClassCard";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/custom/SearchBar";

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

export function ClassHistory({ Class }: DashboardProps) {
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
          <Tabs defaultValue="tab1">
            <div className="flex items-center px-3 py-2">
              <h1 className="text-xl font-bold">Your Class Transcript</h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="ml-auto mr-4">
                  <Button variant="outline">Filter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black-light border-none">
                  <TabsList className="bg-black-light font-avenir text-white-light active:text-white-base  ">
                    <TabsTrigger
                      value="tab1"
                      className="data-[state=active]:text-amber-200"
                    >
                      Completed
                    </TabsTrigger>
                    <TabsTrigger
                      value="tab2"
                      className="data-[state=active]:text-amber-200"
                    >
                      In Progress
                    </TabsTrigger>
                    <TabsTrigger
                      value="tab3"
                      className="data-[state=active]:text-amber-200"
                    >
                      Remaining
                    </TabsTrigger>
                  </TabsList>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator />
            <SearchBar />
            <TabsContent value="tab1" className="m-0">
              <ClassCard items={Class.filter((item) => item.completed)} />
            </TabsContent>
            <TabsContent value="tab2" className="m-0">
              <ClassCard
                items={Class.filter(
                  (item) => !item.completed && !item.isRemaining
                )}
              />
            </TabsContent>
            <TabsContent value="tab3" className="m-0">
              <ClassCard items={Class.filter((item) => item.isRemaining)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
