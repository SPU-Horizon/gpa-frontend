import { Nav } from "@/components/custom/NavBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/AuthStore";
import { Separator } from "@/components/ui/separator";
import {
  Castle,
  Search,
  Speech,
  BookMarked,
  Unplug,
  ListTodo,
  Home,
  User,
} from "lucide-react";
import { UserAvatar } from "@/components/custom/UserAvatar";
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
            defaultSize={5}
            collapsedSize={5}
            collapsible={true}
            minSize={5}
            maxSize={5}
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
                    title: "Dashboard",
                    icon: Home,
                    variant: "ghost",
                    route: "/",
                  },
                  {
                    title: "Plans",
                    icon: Castle,
                    variant: "ghost",
                    route: "/plans",
                  },
                  {
                    title: "Graduation Requirements",
                    icon: Search,
                    variant: "ghost",
                    route: "/majors",
                  },
                  {
                    title: "Transcript",
                    icon: ListTodo,
                    variant: "ghost",
                    route: "/transcript",
                  },
                ]}
              />

              <Nav
                currentLink={currentTab}
                setCurrentLink={setCurrentTab}
                isCollapsed={isCollapsed}
                links={[
                  // {
                  //   title: "Meet an Advisor",
                  //   icon: Speech,
                  //   variant: "ghost",
                  //   route: "/meet-advisor",
                  // },
                  {
                    title: "BannerSync",
                    icon: Unplug,
                    variant: "ghost",
                    route: "/integrate-banner",
                  },
                  {
                    title: "Profile",
                    icon: User,
                    variant: "ghost",
                    route: "/profile",
                  },
                ]}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={95}>
            <Outlet />
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  ) : (
    <Navigate to="/sign-in" />
  );
};
