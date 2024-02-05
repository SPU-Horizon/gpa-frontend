import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { useNavigate } from "react-router-dom";

interface NavProps {
  className?: string;
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost" | "outline";
    route: string;
  }[];
  currentLink: string;
  setCurrentLink: (val: string) => void;
  withLogout?: boolean;
}
//
export function Nav({
  links,
  isCollapsed,
  setCurrentLink,
  currentLink,
  withLogout,
}: NavProps) {
  const navigate = useNavigate();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({
                      variant: currentLink === link.title ? "default" : "ghost",
                      size: "icon",
                    }),
                    "h-9 w-9",
                    link.variant === "default" &&
                      "dark:bg-gold-light dark:text-muted-foreground dark:hover:bg-gold-light dark:hover:text-white"
                  )}
                  onClick={() => {
                    setCurrentLink(link.title);
                    navigate(`dashboard${link.route}`);
                  }}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="flex items-center gap-4 bg-black-light text-white-light"
              >
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground ">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({
                  variant: currentLink === link.title ? "default" : "ghost",
                  size: "sm",
                }),
                link.variant === "default" &&
                  "dark:bg-gold-light dark:text-white dark:hover:bg-gold-light dark:hover:text-white",
                "justify-start"
              )}
              onClick={() => {
                setCurrentLink(link.title);
                navigate(`dashboard${link.route}`);
              }}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
