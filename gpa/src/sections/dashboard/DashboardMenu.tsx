import {
  File,
  MessagesSquare,
  Search,
  Send,
  User,
  Users2,
  Castle,
  School,
} from "lucide-react";

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
import { TooltipProvider } from "../../components/ui/tooltip";
import { Separator } from "../../components/ui/separator";
import React from "react";
import { Mail } from "../../components/dashboard/ClassCards";
import { cn } from "@/lib/utils";

import { Nav } from "../../components/dashboard/nav";

import { ClassList } from "../../components/dashboard/ClassList";
import StatsGroup from "../../components/dashboard/StatsGroup";
import { UserNavIcon } from "../../components/dashboard/UserNavIcon";

interface DashboardProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function DashboardMenu({
  accounts,
  mails,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: DashboardProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  console.log(isCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => setIsCollapsed(true)}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
          onResize={(size) => {
            size > navCollapsedSize && setIsCollapsed(false);
          }}
        >
          <div
            className={cn(
              "flex h-[72.5px] items-center justify-center ",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {/* <UserNavIcon /> */}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Home",
                icon: User,
                variant: "default",
              },
              {
                title: "Requirements",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Majors",
                icon: Search,
                variant: "ghost",
              },
              {
                title: "Build Schedule",
                icon: Castle,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "SPU",
                label: "342",
                icon: School,
                variant: "ghost",
              },
              {
                title: "Meet An Advisor",
                icon: MessagesSquare,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="tab1">
            <div className="flex items-center px-3 py-2">
              <h1 className="text-xl font-bold">Class List</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="tab1"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="tab2"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger
                  value="tab3"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Remaining
                </TabsTrigger>
              </TabsList>
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
              <ClassList items={mails} />
            </TabsContent>
            <TabsContent value="tab2" className="m-0">
              <ClassList items={mails.filter((item) => !item.read)} />
            </TabsContent>
            <TabsContent value="tab3" className="m-0">
              <ClassList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={35}>
          <div className="w-full h-full">
            <StatsGroup />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
