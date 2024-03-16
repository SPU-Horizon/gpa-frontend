import * as React from "react";
import { useEffect, useState } from "react";
import { useUserStore, useCourseStore } from "@/stores"; 
import { Paper, Portal, Text, Badge, Group, Select, Button, List, Container, SimpleGrid, Grid, Card,Skeleton, rem} from "@mantine/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthPickerInput } from '@mantine/dates';

interface Course {
    course_id: string;
    name: string;
    credits: string; // or number, depending on your actual data structure
}

const PRIMARY_COL_HEIGHT = rem(400);

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

    return (
        <div className="flex h-screen">
            <Container size="lg" className="flex-grow">                
                    <Grid gutter="lg" className="flex w-full">
                        <Grid.Col span={8} className="flex">
                            {/* "Create a Plan" section, now larger */}
                            <Card withBorder p="lg" className="flex flex-col w-full">
                            <h1 className="text-xl font-bold ml-2 mt-4 ">Create a Plan</h1>
                            <Tabs defaultValue="automated">
                            <TabsList className="bg-transparent">
                                <TabsTrigger value="automated" className="text-lg  mr-4 bg-gray-100 hover:bg-gray-200 w-full">Automated Plan</TabsTrigger>
                                <TabsTrigger value="manual" className="text-lg bg-gray-100 hover:bg-gray-200 w-full">All Other Majors </TabsTrigger>
                            </TabsList>
                                <TabsContent value="automated">
                                    <form onSubmit={handleSavePlan} className="flex flex-col gap-4 mt-4">
                                        <MonthPickerInput
                                            label="Admitted Quarter (e.g., June 2024)"
                                            placeholder="Pick date"
                                            value={value}
                                            onChange={setValue}
                                            required
                                        />
                                        <Select
                                            label="Select your field of study"
                                            placeholder="Field of study"
                                            data={fieldOptions}
                                            value={selectedField}
                                            onChange={(value) => setSelectedField(value || '')}
                                            required
                                        />
                                        <div className="my-4 text-center"> 
                                            <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Submit</button>
                                        </div>
                                    </form>
                                </TabsContent>
                                <TabsContent value="manual">
                                    <form onSubmit={handleSavePlan} className="flex flex-col gap-4 mt-4">
                                        <Select
                                            label="Select your field of study"
                                            placeholder="Field of study"
                                            data={fieldOptions}
                                            value={selectedField}
                                            onChange={(value) => setSelectedField(value || '')}
                                            required
                                        />
                                        <div className="my-4 text-center"> 
                                            <button type="submit" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Submit</button>
                                        </div>
                                    </form>
                                </TabsContent>
                            </Tabs>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={4} className="flex">
                            {/* "Registered Courses" section, now smaller */}
                            <Card withBorder p="lg" className="flex flex-col w-full">
                                <Text size="xl" mb="md">Registered Courses</Text>
                                <List spacing="sm" size="sm" center>
                                    {inProgressClassList.map((course: Course) => (
                                        <Card key={course.course_id} className="my-2 p-4 bg-gray-100">
                                            {course.course_id} - {course.name}
                                            <Badge color="gray" className="ml-2">{course.credits} credits</Badge>
                                        </Card>
                                    ))}
                                </List>
                            </Card>
                        </Grid.Col>
                    </Grid>
            </Container>
        </div>
    );    
    
};

export default BuildSchedule;
