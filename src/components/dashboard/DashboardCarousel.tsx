import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { useCourseStore, useUserStore } from "@/stores";
import {
  Activity,
  BadgeCheck,
  CalendarClock,
  GraduationCap,
  Timer,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

type CarouselCardProps = {
  title: string;
  subtitle?: string;
  description?: string;
  value?: string;
  icon?: React.ReactNode;
  date?: string;
};

const CarouselCard = ({
  title,
  subtitle,
  description,
  value,
  icon,
}: CarouselCardProps) => {
  const { theme } = useTheme();

  if (theme === "light") {
    return (
      <Card className="w-[300px] h-[200px] bg-white shadow-xl hover:scale-105 transition-all ease-in-out duration-150 border-none ">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="h-[94px] flex justify-between">
          {value && (
            <div className="mt-auto text-4xl font-semibold">{value}</div>
          )}

          {icon && (
            <div className="mt-auto w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              {icon}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[300px] h-[200px] dark:bg-gradient-to-bl from-rose-800 to-gray-900 shadow-xl dark:shadow-slate-900 dark:shadow-lg inset-1 hover:scale-105 transition-all ease-in-out duration-150 border-none ">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="h-[94px] flex justify-between">
        {value && <div className="mt-auto text-4xl font-semibold">{value}</div>}

        {icon && (
          <div className="mt-auto w-12 h-12 rounded-full bg-primary dark:bg-[#11111198]  flex items-center justify-center">
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

type CarouselProps = {
  activeFieldIndex: number;
};

function DashboardCarousel({ activeFieldIndex }: CarouselProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const { completedClassList, inProgressClassList, registeredClassList } =
    useCourseStore();
  const {
    fields,
    graduationQuarter,
    graduationYear,
    enrollmentQuarter,
    enrollmentYear,
  } = useUserStore();

  if (fields && fields.length > 0) {
    console.log(fields, "fields");
    let activeField = fields[activeFieldIndex];

    let inProgressIDs = inProgressClassList.map((class_) => class_.course_id);
    let completedIDs = completedClassList.map((class_) => class_.course_id);

    let completedCredits = 0;
    let completedCourses = 0;
    let inProgressCredits = 0;
    let totalCreditsRequired = 80;

    activeField.requirements.forEach((req) => {
      req.forEach((section, j) => {
        section.courses?.forEach((class_) => {
          if (inProgressIDs.includes(class_.course_id)) {
            inProgressCredits += Number(class_.credits);
          } else if (completedIDs.includes(class_.course_id)) {
            completedCredits += Number(class_.credits);
            completedCourses += 1;
          }
        });
      });
    });

    console.log(completedCredits, inProgressCredits, "credits");

    let gpa = 3.45;

    let gpaMessage = "";
    if (gpa === 4.0) {
      gpaMessage = "Perfect GPA";
    } else if (gpa >= 3.5) {
      gpaMessage = "Great GPA";
    } else if (gpa >= 3.0) {
      gpaMessage = "Good GPA";
    } else if (gpa >= 2.5) {
      gpaMessage = "Average GPA";
    } else if (gpa >= 2.0) {
      gpaMessage = "We have work to do!";
    } else {
      gpaMessage = "Poor GPA";
    }

    const cardInfoArray: CarouselCardProps[] = [
      {
        title: "My GPA",
        subtitle: "All Fields Included",
        description: gpaMessage,
        value: gpa.toString(),
      },
      {
        title: "Completed Courses",
        subtitle: `${activeField.name}`,
        value: completedCourses === 0 ? "0" : completedCourses.toString(),
        icon: <BadgeCheck />,
      },
      {
        title: "Completed Credits",
        subtitle: `${activeField.name}`,
        icon: <BadgeCheck />,
        value: completedCredits === 0 ? "0" : completedCredits.toString(),
      },
      {
        title: "Credits In Progress",
        subtitle: `${activeField.name}`,
        icon: <Activity />,
        value: inProgressCredits === 0 ? "0" : inProgressCredits.toString(),
      },
      {
        title: "Credits Remaining",
        subtitle: `${activeField.name}`,
        icon: <Timer />,
        value: (totalCreditsRequired - completedCredits).toString(),
      },
      {
        title: "Academic Standing",
        subtitle: "Based on Total Credits Earned",
        value: "Junior",
        icon: <GraduationCap />,
      },
      {
        title: "Enrollment Date",
        subtitle: "Quarter and Year",
        value: `${
          enrollmentQuarter[0].toLocaleUpperCase() + enrollmentQuarter.slice(1)
        } ${enrollmentYear}`,
        icon: <CalendarClock />,
      },
      {
        title: "Graduation Date",
        subtitle: "Expected Graduation Quarter and Year",
        value: `${
          graduationQuarter[0].toLocaleUpperCase() + graduationQuarter.slice(1)
        } ${graduationYear}`,
        icon: <CalendarClock />,
      },
    ];

    return (
      <div className="h-[278px] w-[350px] overflow-visible flex gap-5 ">
        <Carousel
          className="w-full"
          opts={{
            watchDrag: false,
          }}
        >
          <CarouselContent className="overflow-visible">
            {cardInfoArray.map((card, index) => (
              <CarouselItem key={index} className="basis-[90.5%]">
                <div
                  className={
                    index === activeSlideIndex
                      ? `w-[300px] scale-110 ease-in-out duration-150 mr-10`
                      : `w-[300px] scale-95 ease-in-out duration-150`
                  }
                >
                  <CarouselCard
                    title={card.title}
                    subtitle={card.subtitle}
                    value={card.value}
                    icon={card.icon}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="top-[15.5rem] left-[.5rem]"
            onClick={() => {
              setActiveSlideIndex((prev) => prev - 1);
            }}
          />
          <CarouselNext
            className="top-[15.5rem] left-[3rem]"
            onClick={() => {
              setActiveSlideIndex((prev) => prev + 1);
            }}
          />
        </Carousel>
      </div>
    );
  } else {
    const cardInfoArray: CarouselCardProps[] = [
      {
        title: "My GPA",
        subtitle: "All Fields Included",
      },
      {
        title: "Completed Courses",
        subtitle: `No Course Information`,
        icon: <BadgeCheck />,
      },
      {
        title: "Completed Credits",
        subtitle: `No Credit Information`,
        icon: <BadgeCheck />,
      },
      {
        title: "Credits In Progress",
        subtitle: `No Credit Information`,
        icon: <Activity />,
      },
      {
        title: "Credits Remaining",
        subtitle: `No Credit Information`,
        icon: <Timer />,
      },
      {
        title: "Academic Standing",
        subtitle: "Based on Total Credits Earned",
        icon: <GraduationCap />,
      },
      {
        title: "Enrollment Date",
        subtitle: "Quarter and Year",
        icon: <CalendarClock />,
      },
      {
        title: "Graduation Date",
        subtitle: "Expected Graduation Quarter and Year",
        icon: <CalendarClock />,
      },
    ];

    return (
      <div className="h-[278px] w-[350px] overflow-visible flex gap-5 ">
        <Carousel
          className="w-full"
          opts={{
            watchDrag: false,
          }}
        >
          <CarouselContent className="overflow-visible">
            {cardInfoArray.map((card, index) => (
              <CarouselItem key={index} className="basis-[90.5%]">
                <div
                  className={
                    index === activeSlideIndex
                      ? `w-[300px] scale-110 ease-in-out duration-150 mr-10`
                      : `w-[300px] scale-95 ease-in-out duration-150`
                  }
                >
                  <CarouselCard
                    title={card.title}
                    subtitle={card.subtitle}
                    value={card.value ? card.value : "N/A"}
                    icon={card.icon}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="top-[15.5rem] left-[.5rem]"
            onClick={() => {
              setActiveSlideIndex((prev) => prev - 1);
            }}
          />
          <CarouselNext
            className="top-[15.5rem] left-[3rem]"
            onClick={() => {
              setActiveSlideIndex((prev) => prev + 1);
            }}
          />
        </Carousel>
      </div>
    );
  }
}

export default DashboardCarousel;
