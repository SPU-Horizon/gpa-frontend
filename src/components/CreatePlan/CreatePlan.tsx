import React, { useState } from 'react';
import { useUserStore, useCourseStore } from "@/stores"; 
import { Checkbox, TextInput, Select, Button, List, Container, SimpleGrid, Grid, Card,Skeleton, rem} from "@mantine/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthPickerInput } from '@mantine/dates';
  
interface Course {
    course_id: string;
    name: string;
    credits: string; // or number, depending on your actual data structure
}
interface CreatePlanProps {
    onCompleted: () => void; 
}

const CreatePlan: React.FC<CreatePlanProps> = ({ onCompleted }) => {
    const { firstName, lastName, studentId, graduationQuarter, graduationYear, fieldRequirements, initializeUserInfo } = useUserStore(); // Provide a default empty array
    const { completedClassList, inProgressClassList } = useCourseStore();
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [planName, setPlanName] = useState('');
    const [maxCredit, setMaxCredit] = useState('');
    const [idealCredits, setIdealCredits] = useState('');
    const [classesToRepeat, setClassesToRepeat] = useState([]);
    const [selectedField, setSelectedField] = useState('');
    const [value, setValue] = useState<Date | null>(null);
    const [selectedCoursesToRepeat, setSelectedCoursesToRepeat] = useState<string[]>([]);

    // Function to handle checkbox changes
    const handleCourseSelect = (courseId: string) => {
        setSelectedCoursesToRepeat(prev => {
            if (prev.includes(courseId)) {
                return prev.filter(id => id !== courseId);
            } else {
                return [...prev, courseId];
            }
        });
    };

    // Function to render the list of checkboxes for classes
    const renderClassCheckboxes = () => {
        return inProgressClassList.map((course: Course) => (
            <Checkbox
                key={course.course_id}
                label={`${course.name} (${course.credits} credits)`}
                value={course.course_id}
                checked={selectedCoursesToRepeat.includes(course.course_id)}
                onChange={() => handleCourseSelect(course.course_id)}
            />
        ));
    };

    const handleCreatePlanSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const newPlan = {
          fieldOfStudy,
          planName,
          maxCredit,
          idealCredits,
          classesToRepeat: selectedCoursesToRepeat, 
          // ... any other necessary data
        };
    
        // Logic to save the new plan
        // After saving the plan successfully, call the onCompleted callback
        onCompleted();
    };
      
      

    const fieldOptions = fieldRequirements?.map((field) => ({
        value: field,
        label: field
    })) || [];

    const handleSavePlan = () => {
        // Implement save plan logic here
    };

    return (
        <div className = 'font-avenir'>
           <Card withBorder p="lg" className="flex flex-col w-full">
                <h1 className="text-xl font-bold ml-2 mt-4 ">Create a Plan</h1>

                <Tabs defaultValue="automated">
                <TabsList className="bg-transparent">
                    <TabsTrigger value="automated" className="text-lg mr-4 bg-gray-100 hover:bg-gray-200 w-full">Automated Plan</TabsTrigger>
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
                            <TextInput 
                                label="Max Credit" 
                                placeholder="Enter maximum credit"
                                value={maxCredit}
                                onChange={(event) => setMaxCredit(event.currentTarget.value)}
                                required
                            />
                            <TextInput 
                                label="Ideal credits per quarter" 
                                placeholder="Enter ideal credits"
                                value={idealCredits}
                                onChange={(event) => setIdealCredits(event.currentTarget.value)}
                                required
                            />
                            {/* Render checkboxes for selecting classes to repeat */}
  
                            <div className="my-4 text-center"> 
                                <Button type="submit" variant="outline" className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Submit</Button>
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
        </div>
    );
};

export default CreatePlan;