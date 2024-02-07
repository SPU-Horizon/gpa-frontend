import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from "@mantine/core";
import { cn } from "@/lib/utils";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { DashboardOption } from "@/constants/DashboardMenuOptions";
import { PlusCircleIcon } from "lucide-react";

interface MenuOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  option: DashboardOption;
}

export default function MenuOption({
  option,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: MenuOptionProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <button onClick={() => console.log("Heading Over.")}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={cn(
                "relative rounded-lg overflow-hidden shadow-lg p-8 bg-gold-base text-white",
                aspectRatio === "portrait" ? "aspect-w-3 aspect-h-4" : "aspect-w-1 aspect-h-1",
              )}
            >
              <div className="flex items-center justify-center mb-6">
                {isFontAwesomeIcon(option.icon) ? (
                  <FontAwesomeIcon
                    icon={option.icon as any}
                    className={cn(
                      "h-16 w-16 text-white",
                    )}
                  />
                ) : (
                  <Image
                    loading="lazy"
                    src={option.icon}
                    alt={option.name}
                    width={width}
                    height={height}
                    className={cn(
                      "h-16 w-16 object-cover",
                    )}
                  />
                )}
              </div>
              <div className="text-center">
                <h3 className="font-medium text-xl leading-tight mb-2">{option.name}</h3>
                <p className="text-sm">{option.description}</p>
              </div>
            </div>
          </ContextMenuTrigger>
        </ContextMenu>
      </button>
    </div>
  );
}

// Helper function to check if the icon is a FontAwesomeIcon
function isFontAwesomeIcon(icon: any): icon is React.ComponentType {
  return icon && typeof icon === 'object' && 'prefix' in icon && 'iconName' in icon;
}
