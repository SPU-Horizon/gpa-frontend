import { Search } from "lucide-react";

import { Input } from "../../components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TooltipProvider } from "../../components/ui/tooltip";
import { Separator } from "../../components/ui/separator";
import React from "react";
import { Mail } from "../../components/dashboard/CardData";
import { ClassCard } from "../../components/dashboard/ClassCard";
import StatsGroup from "../../components/dashboard/StatsGroup";
import { Button } from "@/components/ui/button";

interface DashboardProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
}

export function DashboardMenu({
  mails,
  defaultLayout = [265, 440, 655],
}: DashboardProps) {
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
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={0}
          maxSize={100}
        >
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
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="tab1" className="m-0">
              <ClassCard items={mails.filter((item) => item.read)} />
            </TabsContent>
            <TabsContent value="tab2" className="m-0">
              <ClassCard items={mails.filter((item) => !item.read)} />
            </TabsContent>
            <TabsContent value="tab3" className="m-0">
              <ClassCard items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[2]}
          minSize={0}
          maxSize={100}
        >
          <div className="w-full h-full">
            <StatsGroup />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
