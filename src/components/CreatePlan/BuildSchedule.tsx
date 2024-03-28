import * as React from "react";
import { useEffect, useState } from "react";
import { useUserStore, useCourseStore } from "@/stores"; 
import { UnstyledButton, Text, Badge, Group, Select, Button, List, Container, SimpleGrid, Grid, Card,Skeleton, rem} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthPickerInput } from '@mantine/dates';
import {Blocks ,Orbit,} from "lucide-react";
import classes from "@/lib/modules/MenuOptions.module.css";

interface Course {
    course_id: string;
    name: string;
    credits: string; // or number, depending on your actual data structure
}

const PRIMARY_COL_HEIGHT = rem(400);

const mockdata = [
    { title: 'Automated Schedule Builder', icon: Blocks, color: 'green' },
    { title: 'All Other Majors', icon: Orbit, color: 'yellow' },
];

const BuildSchedule: React.FC = () => {
    const { firstName, lastName, studentId, graduationQuarter, graduationYear, fieldRequirements, initializeUserInfo } = useUserStore(); // Provide a default empty array
    const { completedClassList, inProgressClassList } = useCourseStore();
    const [selectedField, setSelectedField] = useState('');
    const [remainingCourses, setRemainingCourses] = useState<string[]>([]);
    const [value, setValue] = useState<Date | null>(null);
    

    useEffect(() => {
        initializeUserInfo();
    }, [initializeUserInfo]);

    useEffect(() => {
        console.log('Field Requirements:', fieldRequirements); // Debugging statement
    }, [fieldRequirements]);
    
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
            "Computer Science": ["CSC 1130", "CSC 1230", "CSC 2430", "CSC 3150", "..."],
            // Populate according to actual program requirements
        };

        const requiredCourses = requiredCoursesForMajor[selectedField] || [];
        const completedCourseIds = new Set(completedClassList.map((course: { course_id: string }) => course.course_id));
        const inProgressCourseIds = new Set(inProgressClassList.map((course: { course_id: string }) => course.course_id));

        // Filter out courses that are completed or in progress.
        const remainingCourses = requiredCourses.filter(courseId => 
            !completedCourseIds.has(courseId) && !inProgressCourseIds.has(courseId)
        );

        setRemainingCourses(remainingCourses);
    }, [selectedField, completedClassList, inProgressClassList]);


    const fieldOptions = fieldRequirements?.map((field) => ({
        value: field,
        label: field
    })) || [];

    const getInitialGraduationDate = (year: number, quarter: string) => {
        let month;
        switch (quarter) {
            case 'Winter':
                month = 0; // January
                break;
            case 'Spring':
                month = 5; // June
                break;
            case 'Summer':
                month = 6; // July
                break;
            case 'Fall':
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
        <UnstyledButton key={item.title} className="bg-gray-100 dark:bg-black-light dark:border-none flex flex-col items-center justify-center text-center rounded-md h-[180px] hover:scale-[1.03] hover:shadow-md transition-all duration-200 ease-in-out">
          <item.icon color={"gray"} size="2rem" />
            <Text className="dark:text-white-light" size="md" mt={8}>
                {item.title}
            </Text>
        </UnstyledButton>
      ));

    return (
        <div className="flex flex-grow ml-12 mr-12 mt-4">   
                    <Grid gutter="lg" className="flex w-full">
                        <Grid.Col span={8} className="flex ">
                            {/* "Create a Plan" section, now larger */}
                            <Card className="flex flex-col w-full overflow-hidden border-t border-gray-100 shadow-lg dark:border-gray-700 dark:shadow-gray-700/50 dark:bg-black-light">
                                <Group justify="space-between">
                                    <h1 className="text-xl font-bold ml-2 mt-4 dark:text-white-base">Plan Options</h1>
                                </Group>
                                <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }} spacing="lg" mt="md">
                                    {items}
                                </SimpleGrid>
                                    
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={4} className="flex">
                            {/* "Registered Courses" section, now smaller */}
                            <Card className="flex flex-col w-full overflow-hidden border-t border-gray-100 shadow-lg dark:border-gray-700 dark:shadow-gray-700/50 dark:bg-black-light">
                                <Text size="xl" mb="md" className="dark:text-white-base">Registered Courses</Text>
                                <List spacing="sm" size="sm" center>
                                    {inProgressClassList.map((course: Course) => (
                                        <Card key={course.course_id} className="my-2 p-4 shadow-inner bg-gray-100 dark:bg-gold-base dark:text-white-base">
                                            {course.course_id} - {course.name}
                                            <Badge className="ml-2 bg-gold-base">{course.credits} credits</Badge>
                                        </Card>
                                    ))}
                                </List>
                            </Card>
                        </Grid.Col>
                    </Grid>
        </div>
    );    
    
};

export default BuildSchedule;
