import * as React from "react";
import { useEffect, useState } from "react";
import { useUserStore, useCourseStore, useThemeStore } from "@/stores";
import {
  UnstyledButton,
  Text,
  Badge,
  Group,
  List,
  SimpleGrid,
  Grid,
  Card,
  rem,
} from "@mantine/core";
import { Footprints, Network } from "lucide-react";
import CreatePlan from "@/components/CreatePlan/CreatePlan";
import { Button } from "../ui/button";

interface Course {
  course_id: string;
  name: string;
  credits: string; // or number, depending on your actual data structure
}
// Function to handle the completion of creating a plan
const handleCreatePlanCompleted = () => {};

const PRIMARY_COL_HEIGHT = rem(400);

const mockdata = [
  {
    title: "Automated Schedule Builder",
    icon: Network,
    color: "black",
    darkColor: "white",
  },
  {
    title: "All Other Majors",
    icon: Footprints,
    color: "black",
    darkColor: "white",
  },
];

const BuildSchedule: React.FC = () => {
  const {
    firstName,
    lastName,
    studentId,
    graduationQuarter,
    graduationYear,
    fields,
    initializeUserInfo,
  } = useUserStore(); // Provide a default empty array
  const { completedClassList, inProgressClassList } = useCourseStore();
  const [selectedField, setSelectedField] = useState("");
  const [remainingCourses, setRemainingCourses] = useState<string[]>([]);
  const [value, setValue] = useState<Date | null>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    initializeUserInfo();
  }, [initializeUserInfo]);

  useEffect(() => {
    console.log("Field Requirements:", fields); // Debugging statement
  }, [fields]);

  // This example assumes you have a function to get all courses for a major
  // For demonstration, using a static mapping
  const requiredCoursesForMajor = {
    // Example structure
    "Computer Science": ["CSC 1130", "CSC 1230", "CSC 2430", "CSC 3150", "..."],
    // Populate according to actual program requirements
  };

  useEffect(() => {
    if (!selectedField) return;

    // Retrieve the list of required courses for the selected major/minor.
    const requiredCoursesForMajor: { [key: string]: string[] } = {
      "Computer Science": [
        "CSC 1130",
        "CSC 1230",
        "CSC 2430",
        "CSC 3150",
        "...",
      ],
      // Populate according to actual program requirements
    };

    const requiredCourses = requiredCoursesForMajor[selectedField] || [];
    const completedCourseIds = new Set(
      completedClassList.map(
        (course: { course_id: string }) => course.course_id
      )
    );
    const inProgressCourseIds = new Set(
      inProgressClassList.map(
        (course: { course_id: string }) => course.course_id
      )
    );

    // Filter out courses that are completed or in progress.
    const remainingCourses = requiredCourses.filter(
      (courseId) =>
        !completedCourseIds.has(courseId) && !inProgressCourseIds.has(courseId)
    );

    setRemainingCourses(remainingCourses);
  }, [selectedField, completedClassList, inProgressClassList]);

  const fieldOptions =
    fields?.map((field) => ({
      value: field,
      label: field,
    })) || [];

  const getInitialGraduationDate = (year: number, quarter: string) => {
    let month;
    switch (quarter) {
      case "Winter":
        month = 0; // January
        break;
      case "Spring":
        month = 5; // June
        break;
      case "Summer":
        month = 6; // July
        break;
      case "Fall":
        month = 8; // September
        break;
      default:
        return null;
    }
    return new Date(year, month);
  };

  const handleSavePlan = () => {
    // Implement save plan logic here
  };

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`; // 50% of the primary column height

  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className="bg-gray-100 dark:bg-grey-dark flex flex-col items-center justify-center text-center rounded-md h-full hover:scale-[1.03] hover:shadow-md transition-all duration-200 ease-in-out"
    >
      <item.icon
        color={theme === "dark" ? item.darkColor : item.color}
        size="2rem"
      />
      <Text className="dark:text-white-light font-semibold px-4" mt={8}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <div className="flex  ml-12 mr-12 mt-4  md:mx-8">
      <div className="flex gap-4 w-full h-max md:flex-col md:gap-16 md:h-auto ">
        <div className="flex flex-grow md:h-[400px] overflow-scroll border rounded-md p-4 ">
          {/* "Create a Plan" section */}

          <CreatePlan onCompleted={handleCreatePlanCompleted} />
        </div>
        <div className="flex flex-grow">
          {/* "Registered Courses" section */}
          <Card className="flex flex-col w-full overflow-hidden  border border-gray-100 dark:border-gray-700 dark:bg-black-light">
            <h1 className="text-xl font-bold ml-2 mt-4 dark:text-white-base">
              Registered Courses
            </h1>
            <List spacing="md" size="sm" center>
              {inProgressClassList.map((course: Course) => (
                <Card
                  key={course.course_id}
                  className="my-2 p-4 shadow-inner bg-gray-100 dark:bg-grey-dark dark:text-white-base"
                >
                  {course.course_id} - {course.name}
                  <Badge className="ml-2 bg-gold-base font-semibold">
                    {course.credits} credits
                  </Badge>
                </Card>
              ))}
            </List>
            <div className="h-full w-full flex justify-center items-center">
              <Button className="bg-gold-base hover:bg-gold-light text-white-base font-bold px-4 py-2 rounded-full mt-4">
                View All
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuildSchedule;
