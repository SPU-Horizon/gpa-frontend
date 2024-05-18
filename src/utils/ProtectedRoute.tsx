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
  Unplug,
  ListTodo,
  Home,
  User,
  SunMoon,
} from "lucide-react";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useNavigationStore } from "@/stores/NavigationStore";
import { ActionIcon } from "@mantine/core";
import { useThemeStore } from "@/stores";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const { currentTab, setCurrentTab } = useNavigationStore();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { setTheme, theme } = useThemeStore();

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
            <div className="h-screen items-stretch flex flex-col justify-between">
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
                    route: "/requirements",
                  },
                  {
                    title: "Transcript",
                    icon: ListTodo,
                    variant: "ghost",
                    route: "/transcript",
                  },
                  {
                    title: "BannerSync",
                    icon: Unplug,
                    variant: "ghost",
                    route: "/integrate-banner",
                  },
                ]}
              />

              <div className="mb-[100px] self-center">
                <div className="lex flex-col text-center justify-center items-center">
                  <ActionIcon
                    className="dark:bg-black-light dark:text-white-base bg-white text-black-base shadow-md transition-all ease-in-out duration-200 border-[.5px]"
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    variant="default"
                    size="xl"
                    aria-label="Toggle color scheme"
                  >
                    <SunMoon />
                  </ActionIcon>
                </div>
              </div>
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
