import { UserAvatar } from "@/components/custom/UserAvator";
import { Nav } from "@/components/custom/NavBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/AuthStore";
import { Separator } from "@/components/ui/separator";
import {
  Castle,
  Search,
  User,
  Speech,
  BookMarked,
  Unplug,
  ListTodo,
} from "lucide-react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { useNavigationStore } from "@/stores/NavigationStore";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const { currentTab, setCurrentTab } = useNavigationStore();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { width } = useWindowSize();

  return isAuthenticated ? (
    <div className="h-screen dark:bg-black-base dark:text-white-light">
      <TooltipProvider>
        <ResizablePanelGroup
          direction="horizontal"
          className="h-screen w-full  "
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
                "min-w-[50px] transition-all duration-300 ease-in-out h-full "
            )}
            onResize={(size) => {
              size > 0 && setIsCollapsed(false);
            }}
          >
            <div
              className={cn(
                "flex h-[56px] items-center justify-evenly ",
                isCollapsed ? "h-[56px]" : "px-2"
              )}
            >
              <div className="flex justify-evenly w-[85%] items-center">
                <UserAvatar />
                {!isCollapsed && <div> Matthew Negasi</div>}
              </div>
            </div>
            <Separator />
            <div className=" h-screen items-stretch">
              <Nav
                currentLink={currentTab}
                setCurrentLink={setCurrentTab}
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Home",
                    icon: User,
                    variant: "ghost",
                    route: "/",
                  },
                  {
                    title: "View Transcript",
                    icon: ListTodo,
                    variant: "ghost",
                    route: "/transcript",
                  },
                  {
                    title: "Majors & Reqs",
                    icon: Search,
                    variant: "ghost",
                    route: "/majors",
                  },
                  {
                    title: "Build Schedule",
                    icon: Castle,
                    variant: "ghost",
                    route: "/build-schedule",
                  },
                ]}
              />
              <Separator />
              <Nav
                currentLink={currentTab}
                setCurrentLink={setCurrentTab}
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Saved Schedules",
                    icon: BookMarked,
                    variant: "ghost",
                    route: "/saved-schedules",
                  },

                  {
                    title: "Meet an Advisor",
                    icon: Speech,
                    variant: "ghost",
                    route: "/meet-advisor",
                  },
                  {
                    title: "Integrate with Banner",
                    icon: Unplug,
                    variant: "ghost",
                    route: "/integrate-banner",
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
