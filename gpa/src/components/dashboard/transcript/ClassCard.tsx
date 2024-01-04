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
    date: string;
    completed: boolean;
    isRemaining: boolean;
    labels: string[];
  };
};

export default function ClassCard({ item }: ClassCardProps) {
  return (
    <button
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-lg">{item.name}</div>
            {!item.completed && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
            {item.isRemaining && (
              <span className="flex h-2 w-2 rounded-full bg-red-600" />
            )}
          </div>
          <div className={cn("ml-auto text-xs")}>
            {formatDistanceToNow(new Date(item.date), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="text-md font-medium">{item.subject}</div>
      </div>
      <div className=" text-md text-muted-foreground">{item.text}</div>
      {item.labels.length ? (
        <div className="flex items-center gap-2">
          {item.labels.map((label) => (
            <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
              {label}
            </Badge>
          ))}
        </div>
      ) : null}
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
