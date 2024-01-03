import { UserNavIcon } from "@/components/dashboard/UserNavIcon";
import { Nav } from "@/components/dashboard/NavBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/AuthStore";
import { Separator } from "@/components/ui/separator";
import { Castle, Search, User } from "lucide-react";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const { width } = useWindowSize();

  return isAuthenticated ? (
    <div className="h-screen">
      <TooltipProvider>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-screen w-full rounded-lg border"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
        >
          <ResizablePanel
            defaultSize={width < 768 ? 10 : 25}
            collapsedSize={5}
            collapsible={true}
            minSize={width < 768 ? 20 : 20}
            maxSize={25}
            onCollapse={() => setIsCollapsed(true)}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
            onResize={(size) => {
              size > 0 && setIsCollapsed(false);
            }}
          >
            <div
              className={cn(
                "flex h-[56px] items-center justify-center ",
                isCollapsed ? "h-[56px]" : "px-2"
              )}
            >
              <UserNavIcon />
            </div>
            <Separator />
            <div className=" h-screen items-stretch">
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
                    icon: Search,
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
                    title: "Random",
                    icon: User,
                    variant: "default",
                  },
                  {
                    title: "Requirements",
                    label: "9",
                    icon: Search,
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
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={width < 768 ? 90 : 75}>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
