import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { de } from "date-fns/locale";

type linkDataProps = {
  title: string;
  link: string;
  description: string;
};

const linkData = [
  {
    title: "SPU Homepage",
    link: "https://spu.edu",
    description: "Seattle Pacific University Homepage",
  },
  {
    title: "Academic Calendar",
    link: "https://spu.edu/calendar-and-events/academic",
    description: "SPU Academic Calendar for the year",
  },
  {
    title: "Time Schedule",
    link: "https://spu.edu/undergraduate-time-schedule",
    description:
      "SPU Time Schedule - with information on classes and when they are offered throughout the year",
  },
  {
    title: "Course Catalog",
    link: "https://spu.edu/catalog",
    description: "SPU Course Catalog - with information on courses",
  },
  {
    title: "Financial Services",
    link: "https://spu.edu/student-financial-services",
    description: "SPU Financial Services",
  },
];

function SpuLinksCard() {
  return (
    <div className="h-full w-full shadow-lg">
      <Card>
        <CardHeader className="">
          <CardTitle>SPU Links</CardTitle>
          <CardDescription>Links to important SPU resources</CardDescription>
        </CardHeader>
        <CardContent className="">
          <ul>
            {linkData.map((link: linkDataProps, index: number) => (
              <li key={index} className="p-1 flex flex-col text-wrap">
                <a
                  href={link.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold hover:underline"
                >
                  {link.title}
                </a>
                <CardDescription className="text-wrap">
                  {link.description}
                </CardDescription>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default SpuLinksCard;
