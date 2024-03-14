import * as React from "react";
import { useEffect, useState } from "react";
import { useUserStore, useCourseStore } from "@/stores"; 
import { Paper, Portal, Text, Badge, Group, Select, Button, List, Container, Grid, Card, rem} from "@mantine/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthPickerInput } from '@mantine/dates';

interface Course {
    id: string;
    name: string;
    credits: string; // or number, depending on your actual data structure
  }

const CreatePlan: React.FC = () => {
    const { firstName, lastName, studentId, fieldRequirements, initializeUserInfo } = useUserStore(); // Provide a default empty array
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

    const handleSavePlan = () => {
        // Implement save plan logic here
    };

    return (
        <div className="flex h-screen">
            {/* Main content area */}
            <Container size="lg" className="flex-grow">
                <Text size="xl" mb="md" className="mt-4">Build Schedule</Text>
                <Grid columns={24} gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }} justify="flex-start" align="stretch">
                    <Grid.Col span={15} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* Left column for building schedule */}
                        <Card withBorder p="lg" className="flex flex-col ">
                            <Text size="xl"  mb="md">Create a Plan</Text>
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
                                <button type="submit" className="btn btn-primary bg-gray-200 text-white capitalize rounded-lg hover:bg-gold-base " style={{ padding: '10px 20px' }}>Submit</button>
                            </div>
                                

                            </form>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={9}>
                    {/* Right column for registered courses */}
                        <Card withBorder p="lg" className="flex flex-col items-center">
                            <Text size="xl" mb="md">Registered Courses</Text>
                            {/* List of registered courses */}
                            <List spacing="sm" size="sm" center>
                                {/* Use a .map to render this list based on your inProgressClassList */}
                                {inProgressClassList.map((course: Course) => (
                                    <Card key={course.id} className="my-2 p-4 bg-gray-100">
                                        {course.name} -  <Badge color="gray" className="ml-2">{course.credits} credits</Badge> 
                                    </Card>
                                ))}
                            </List>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>

            {/* Manual Entry Modal */}
            <Portal>
                <div className={`fixed inset-0 bg-white ${!showManualModal && 'hidden'}`}>
                    {/* Modal content */}
                    <Button onClick={() => setShowManualModal(false)}>Close</Button>
                </div>
            </Portal>

            {/* Automated Entry Modal */}
            <Portal>
                <div className={`fixed inset-0 bg-white ${!showAutomatedModal && 'hidden'}`}>
                    {/* Modal content */}
                    <Button onClick={() => setShowAutomatedModal(false)}>Close</Button>
                </div>
            </Portal>
        </div>
    );
};

export default CreatePlan;
