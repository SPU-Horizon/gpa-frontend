import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";

import { Class } from "../../constants/CardData";

import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

interface MailListProps {
  items: Class[];
}

export function ClassCard({ items }: MailListProps) {
  return (
    <ScrollArea className="h-[88vh]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item, i) => (
          <button
            key={i * 42}
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
        ))}
      </div>
    </ScrollArea>
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
