import React from "react";

import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";

export type ClassCardProps = {
  student_id: number;
  course_id: string;
  name: string;
  description: string;
  credits: string;
  attributes: string;
  year: number;
  quarter: string;
  grade: string;
};

export default function ClassCard({
  item,
  completion,
}: {
  item: ClassCardProps;
  completion: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "flex flex-col items-start gap-2 mb-4 rounded-md border p-3 text-left text-md ease-in-out transition-all hover:bg-accent hover:-translate-x-1 hover:scale-[1.01] dark:bg-black-light duration-200 dark:text-white-light dark:outline-none dark:border-transparent"
          )}
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-lg">{item.course_id}</div>

                {completion == "Completed" && (
                  <span>
                    <Badge>Completed</Badge>
                  </span>
                )}
                {completion == "In Progress" && (
                  <span>
                    <Badge>In Progress</Badge>
                  </span>
                )}
                {completion == "Registered" && (
                  <span>
                    <Badge>Registered</Badge>
                  </span>
                )}
              </div>
            </div>
            <div className="text-md font-medium">{item.name}</div>
            {item.credits === "0" ? (
              <>Credits unavailable</>
            ) : (
              <>{item.credits} Credits</>
            )}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="dark:bg-black-light dark:text-white-base bg-white-light text-black-base font-avenir font-normal border-none border-transparent rounded-md sm:max-w-72 md:max-w-96">
        <DialogHeader className="text-left">
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>{item.course_id}</DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-3 text-lg">
          {completion == "Completed" ? (
            <>
              <DialogDescription>
                <b>Your Grade:</b> {item.grade || "N/A"}
              </DialogDescription>
              <DialogDescription>
                <b>Quarter Taken:</b> {item.quarter?.toUpperCase() || "N/A"}{" "}
                {item.year || "N/A"}
              </DialogDescription>
            </>
          ) : null}

          <div className="flex w-full gap-2">
            <DialogDescription>
              <b>Course Attributes:</b>
            </DialogDescription>
            <Badge>{item.attributes || "None"}</Badge>
          </div>
          <DialogDescription>
            <b>Total Credits:</b> {item.credits || "N/A"}
          </DialogDescription>
          <DialogDescription>
            <b>Course Description:</b> {item.description}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/*
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
*/
