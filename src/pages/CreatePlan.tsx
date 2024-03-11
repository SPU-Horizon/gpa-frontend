import * as React from "react";
import { useEffect, useState } from "react";
import { useUserStore, useCourseStore } from "@/stores"; 
import { Paper, Portal, Text, Badge, Group, Select, Button, List, Container} from "@mantine/core";
import { MonthPickerInput } from '@mantine/dates';


const CreatePlan: React.FC = () => {
    const { firstName, lastName, studentId, fieldRequirements, initializeUserInfo } = useUserStore(); // Provide a default empty array
    const { completedClassList, inProgressClassList } = useCourseStore();
    const [selectedField, setSelectedField] = useState('');
    const [remainingCourses, setRemainingCourses] = useState([]);
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
    const allCoursesForMajor = {
        "Computer Science": ["CS101", "CS102", "CS201", "CS202"],
        // Add other majors and their courses as necessary
    };

    // Update the remaining courses whenever the selected field or class lists change
    useEffect(() => {
        if (!selectedField) return;

        const allCoursesForMajor: { [key: string]: string[] } = {
            "Computer Science": ["CS101", "CS102", "CS201", "CS202"],
            // Implement majors and their courses required for graduation
        };

        const allCourses = allCoursesForMajor[selectedField] || [];
        const completedCourses = new Set((completedClassList as { name: string }[]).map(course => course.name));
        const inProgressCourses = new Set((inProgressClassList as { name: string }[]).map(course => course.name));

        const remaining = allCourses.filter(course => 
            !completedCourses.has(course) && !inProgressCourses.has(course)
        );

        setRemainingCourses(remaining as never[]);
    }, [selectedField, completedClassList, inProgressClassList, allCoursesForMajor]);

    const fieldOptions = fieldRequirements?.map((field) => ({
        value: field,
        label: field
    })) || [];

    const handleSavePlan = () => {
        // Implement save plan logic here
    };

    return (
        <>
        <Container size="sm" style={{ marginTop: 20, marginBottom: 20 }}>
            <Paper 
                className="dark:bg-black-light dark:border-none hover:scale-[1.01] transition-all duration-200 ease-in-out flex justify-center flex-col items-center"
                withBorder
                p="lg"
                radius="md">

                <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300"  size="xl" radius="md">Plan your schedule</Badge>

                <form onSubmit={handleSavePlan} className="flex flex-col gap-4 mt-4">
                    <MonthPickerInput
                        label="Admitted Quarter (e.g., Spring 2024)"
                        placeholder="Pick date"
                        value={value}
                        onChange={setValue}
                    />
                    <Select
                        label="Select your field of study"
                        placeholder="Field of study"
                        data={fieldOptions}
                        value={selectedField}
                        onChange={(value) => setSelectedField(value || '')}
                        required
                    />

                    <Text>Remaining Courses:</Text>
                    <List>
                        {remainingCourses.map((course, index) => (
                            <List.Item key={index}>{course}</List.Item>
                        ))}
                    </List>

                    <Group mt="md">
                        <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300"  type="submit">Save Schedule</Button>
                    </Group>
                </form>

                <Group mt="md">
                        <Button 
                            className="bg-gray-200 text-gray-800 hover:bg-gray-300" 
                            onClick={() => setShowManualModal(true)} 
                            variant="outline">Manual Entry
                        </Button>
                </Group>
                
            </Paper>
        </Container>
        {showManualModal && (
                <Portal>
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'white' }}>
                        {/* Place your Manual Entry content here */}
                        <Text>Manual Entry Content</Text>
                        <Button onClick={() => setShowManualModal(false)}>Close</Button>
                    </div>
                </Portal>
                )}

            {showAutomatedModal && (
                    <Portal>
                        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'white' }}>
                            {/* Place your Automated Entry content here */}
                            <Text>Automated Entry Content</Text>
                            <Button onClick={() => setShowAutomatedModal(false)}>Close</Button>
                        </div>
                    </Portal>
            )}
        </>
    );
};

export default CreatePlan;
