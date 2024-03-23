import React, { useState } from 'react';
import { useUserStore, useCourseStore } from "@/stores"; 
import { Paper, Modal, Text, Badge, Group, Select, Button, List, Container, SimpleGrid, Grid, Card,Skeleton, rem} from "@mantine/core";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthPickerInput } from '@mantine/dates';
  

const CreatePlan = () => {

    const { firstName, lastName, studentId, graduationQuarter, graduationYear, fieldRequirements, initializeUserInfo } = useUserStore(); // Provide a default empty array
    const { completedClassList, inProgressClassList } = useCourseStore();
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [planName, setPlanName] = useState('');
    const [maxCredit, setMaxCredit] = useState('');
    const [idealCredits, setIdealCredits] = useState('');
    const [classesToRepeat, setClassesToRepeat] = useState([]);
    const [selectedField, setSelectedField] = useState('');
    const [value, setValue] = useState<Date | null>(null);

    const handleCreatePlanSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newPlan = {
          fieldOfStudy,
          planName,
          maxCredit,
          idealCredits,
          classesToRepeat,
          // ... any other necessary data
        };
      
        // Pass newPlan to the SaveSchedule component's save function
        // This could be done via context, props, or global state management
        // savePlan(newPlan);
      };
      

    const fieldOptions = fieldRequirements?.map((field) => ({
        value: field,
        label: field
    })) || [];

    const handleSavePlan = () => {
        // Implement save plan logic here
    };

    return (
        <div>
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
        </div>
    );
};

export default CreatePlan;