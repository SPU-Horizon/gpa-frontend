import React, { useEffect, useState } from 'react';
import { useUserStore, useCourseStore } from "@/stores"; 
import { Card, NumberInput, Select, Button,Stepper, Group, Checkbox, Text} from "@mantine/core";
import { TextCursorInput, ScanEye, Pocket} from "lucide-react"; 
  
interface Course {
    course_id: string;
    name: string;
    credits: string; // or number, depending on your actual data structure
}
interface CreatePlanProps {
    onCompleted: () => void; 
}

const CreatePlan: React.FC<CreatePlanProps> = ({ onCompleted }) => {
    const { fieldRequirements } = useUserStore(); // Provide a default empty array
    const { completedClassList, inProgressClassList } = useCourseStore();
    const [fieldOfStudy, setFieldOfStudy] = useState('');
    const [planName, setPlanName] = useState('');
    const [maxCredit, setMaxCredit] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [selectedCoursesToRepeat, setSelectedCoursesToRepeat] = useState<string[]>([]);
    const [reviewPlan, setReviewPlan] = useState(false); 
    const [active, setActive] = useState(1);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    

    useEffect(() => {
        console.log('fieldRequirements:', fieldRequirements);
    }, [fieldRequirements]); 

    // Dummy data for fields and in-progress classes
    const fieldsOptions = [
        { value: 'science', label: 'Computer Science' },
        { value: 'engineering', label: 'Computer Engineering' },
        { value: 'biology', label: 'Biology' },
    ];

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

    const handleFirstStepSubmit = () => {
        nextStep();
    };

    const handleSecondStepSubmit = () => {
        // Logic for second step submission
        setActive(2); // Go to third step
    };

    const handleSavePlan = () => {
    // Logic for saving the plan
    onCompleted(); // Plan is saved, perform completion actions
    };

    // Function for discarding the plan
    const handleDiscardPlan = () => {
    // Logic for discarding the plan
    setActive(0); // Return to the first step
    };
    
    const handleReviewPlan = () => {
    // Logic to handle review and save the plan
    console.log('Plan reviewed and saved');
    setReviewPlan(true);
    onCompleted(); // This can be called after the plan is successfully saved
    };      

    const fieldOptions = fieldRequirements?.map((field) => ({
        value: field,
        label: field
    })) || [];

    return (
        <div className = 'font-avenir'>
                <Stepper color="gray" active={active}>
                    {/* Form to input preferences */}
                    <Stepper.Step label="Input Preferences">
                    <form onSubmit={handleSavePlan} className="flex flex-col gap-4 mt-4">
                            <Select
                                required
                                label="Selected field"
                                placeholder="Select a field"
                                data={fieldsOptions}
                                value={selectedField}
                                onChange={(value) => setSelectedField(value || '')}
                            />
                            <NumberInput
                                required
                                label="Max credits per quarter"
                                placeholder="Enter max credits"
                                value={maxCredit}
                                onChange={(val) => setMaxCredit(val.toString())}
                            />
                            <div>
                                <label className="block text-sm font-medium">
                                    Select from the list below courses you'd like to retake:
                                </label>
                                <div className="border max-h-[100px] overflow-y-auto">
                                    {inProgressClassList.map((course: Course) => (
                                    <div key={course.course_id} className="px-4 py-2">
                                    <Checkbox
                                        
                                        label={`${course.course_id} ${course.name} - ${course.credits} credits`}
                                        checked={selectedCoursesToRepeat.includes(course.course_id)}
                                        onChange={() => handleCourseSelect(course.course_id)}
                                        color="gray"
                                    />
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-center">
                            <Button
                                className="bg-gold-base hover:bg-gold-light text-white font-bold px-4 py-2 rounded-full mt-4"
                                onClick={handleFirstStepSubmit}
                            >
                                Submit Preferences
                            </Button>
                        </div>
                    </Stepper.Step>
                    {/* Dynamic User Preference */}
                    <Stepper.Step label="Customize Preferences">
                    <div className="flex justify-center">
                            <Button
                                className="bg-gold-base hover:bg-gold-light text-white font-bold px-4 py-2 rounded-full mt-4"
                                onClick={handleSecondStepSubmit}
                            >
                                Submit Preferences
                            </Button>
                    </div>
                    
                    </Stepper.Step>
                    {/* Render review plan */}
                    <Stepper.Step label="Review Plan">
                        {reviewPlan && (
                            <>
                            <Card shadow="sm" p="lg" className="mb-4">
                                {/* Display the plan summary for review */}
                            </Card>
                            <Button onClick={handleReviewPlan}>Save Plan</Button>
                            <Button onClick={handleDiscardPlan} color="red">Discard Plan</Button>
                            </>
                        )}
                        <div className="flex justify-center space-x-8">
                            <Button 
                            className="bg-gold-base hover:bg-gold-light text-white font-bold px-4 py-2 rounded-full mt-4"
                            onClick={handleSavePlan}>Save Plan</Button>
                            <Button
                            className="bg-gold-base hover:bg-gold-light text-white font-bold px-4 py-2 rounded-full mt-4"  
                            onClick={handleDiscardPlan}>Discard Plan</Button>
                        </div>
                
                    </Stepper.Step>
                <Stepper.Completed>
                    <div>Completed
                    <Button
                    className="bg-gold-base hover:bg-gold-light text-white font-bold px-4 py-2 rounded-full mt-4"  
                    onClick={handleDiscardPlan}>Create Another Plan</Button>
                    </div>
                </Stepper.Completed>
            </Stepper>            
        </div>
    );
};

export default CreatePlan;