import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ComponentProps } from "react";
import { Badge } from "../../ui/badge";

import { cn } from "@/lib/utils";

export type ClassCardProps = {
  item: {
    name: string;
    subject: string;
    text: string;
    quarter: string;
    completed: boolean;
    isRemaining: boolean;
  };
};

export default function ClassCard({ item }: ClassCardProps) {
  return (
    <button
      className={cn(
        "flex flex-col items-start gap-2 mb-4 rounded-md border p-3 text-left text-sm ease-in-out transition-all hover:bg-accent hover:-translate-x-1 hover:scale-[1.01] dark:bg-white-light duration-200 dark:text-black-base"
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-lg">{item.name}</div>

            {(!item.completed && !item.isRemaining) && (
              <span><Badge>In Progress</Badge></span>
            )}
            {item.isRemaining && (
              <span><Badge>Remaining</Badge></span>
            )}
            {item.completed && (
              <span><Badge>Completed</Badge></span>
            )}
          </div>
        </div>
        <div className="text-md font-medium">{item.subject}</div>
      </div>
      <div className=" text-md text-muted-foreground">{item.text}</div>
      <div className="ml-auto text-xs mt-auto">{item.quarter}</div>
    </button>
  );
} 

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
