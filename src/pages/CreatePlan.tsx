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

const CreatePlan: React.FC = () => {
    const { firstName, lastName, studentId, graduationQuarter, graduationYear, fieldRequirements, initializeUserInfo } = useUserStore(); // Provide a default empty array
    const { completedClassList, inProgressClassList } = useCourseStore();
    const [selectedField, setSelectedField] = useState('');
    const [remainingCourses, setRemainingCourses] = useState<string[]>([]);
    const [value, setValue] = useState<Date | null>(null);
    const [showManualModal, setShowManualModal] = useState(false);
    const [showAutomatedModal, setShowAutomatedModal] = useState(false);
    const [opened, setOpened] = useState(false);

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

    const getInitialGraduationDate = () => {
        if (!graduationQuarter || !graduationYear) return null;

        let month;
        switch (graduationQuarter) {
            case 'Q1':
                month = 0; // January
                break;
            case 'Q2':
                month = 2; // April
                break;
            case 'Q3':
                month = 5; // June
                break;
            case 'Q4':
                month = 8; // September
                break;
            default:
                return null;
        }
        return new Date(graduationYear, month);
    };


    const handleSavePlan = () => {
        // Implement save plan logic here
    };

    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`; // 50% of the primary column height

    return (
        <div className="flex h-screen">
            <Container size="lg" className="flex-grow">
                <Text size="xl" mb="lg" className="mt-4 font-bold text-gray-800">Build Schedule</Text>
                    <Grid gutter="lg" className="flex w-full">
                        <Grid.Col span={8} className="flex">
                            {/* "Create a Plan" section, now larger */}
                            <Card withBorder p="lg" className="flex flex-col w-full">
                            <Tabs defaultValue="automated">
                                <TabsList>
                                    <TabsTrigger value="automated">Automated Plan Creation</TabsTrigger>
                                    <TabsTrigger value="manual">All Majors</TabsTrigger>
                                </TabsList>
                                <TabsContent value="automated">
                                    <form onSubmit={handleSavePlan} className="flex flex-col gap-4 mt-4">
                                        <MonthPickerInput
                                            label="Expected Graduation (e.g., June 2024)"
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
                                            <button type="submit" className="btn btn-primary bg-gray-200 text-white capitalize rounded-lg hover:bg-gold-base" style={{ padding: '10px 20px' }}>Submit</button>
                                        </div>
                                    </form>
                                </TabsContent>
                                <TabsContent value="manual">
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
                                            <button type="submit" className="btn btn-primary bg-gray-200 text-white capitalize rounded-lg hover:bg-gold-base" style={{ padding: '10px 20px' }}>Submit</button>
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

export default CreatePlan;
