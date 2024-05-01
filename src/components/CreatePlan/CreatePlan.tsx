import React, { useEffect, useRef, useState } from "react";
import { useUserStore, useCourseStore } from "@/stores";
import {
  TextInput,
  Card,
  NumberInput,
  Select,
  Button,
  Stepper,
  Text,
  rem,
} from "@mantine/core";
import { Checkbox } from "@/components/ui/checkbox";
import { TextCursorInput, ScanEye, Pocket } from "lucide-react"; 
import { set } from "date-fns";
import usePlanStore from "@/stores/PlanStore";

interface Course {
  course_id: string;
  name: string;
  credits: string; 
}

interface Field {
  name: string;
  quarter: string;
  type: string;
  year: number;
  id: number;
}

interface PlanOption {
  course_id: string;
  name: string;
  credits: string;
}

interface CreatePlanProps {
  onCompleted: () => void;
}

const CreatePlan: React.FC<CreatePlanProps> = ({ onCompleted }) => {
  const { fields } = useUserStore(); 
  const { completedClassList, inProgressClassList } = useCourseStore();
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [planName, setPlanName] = useState("");
  const [maxCredit, setMaxCredit] = useState(0);
  const [selectedField, setSelectedField] = useState <Field []> ([]);
  const [planOptions, setPlanOptions] = useState([]);
  const [mandatoryCourses, setMandatoryCourses] = useState(new Set());
  const [reviewPlan, setReviewPlan] = useState(false);
  const [active, setActive] = useState(0);
  const {getOptions, getSchedule, savePlan, getPlans}  = usePlanStore();

  // State to store the selected courses to repeat
  const [selectedCoursesToRepeat, setSelectedCoursesToRepeat] = useState<
  Course[]
  >([]);

  

  // Function to move to the next step
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  // Dummy data for fields and in-progress classes
  const fieldsOptions = [
    { value: "science", label: "Computer Science" },
    { value: "engineering", label: "Computer Engineering" },
    { value: "biology", label: "Biology" },
  ];

  // Function to handle checkbox changes
  const handleCourseSelect = (course: Course) => {
    setSelectedCoursesToRepeat((prev) => {
      if (prev.includes(course)) {
        return prev.filter((id) => id !== course);
      } else {
        return [...prev, course];
      }
    });
  };

  // Function to handle checkbox changes
  const handleFieldSelect = (field : Field) => {
    setSelectedField((prev) => {
      if (prev.includes(field)) {
        return prev.filter((f) => f.name !== field.name)
        
      }
      else {
        return [...prev, field]
      }

    });
    
    console.log(selectedField);
    
  };
    

  // Logic for first step submission of student input
  const handleFirstStepSubmit = () => {
    
    // const selectedFieldsIds = fields.filter(field => field.name === selectedField).map(field => field.id);

    // Extract course IDs from selected courses to repeat
    const repeatedCoursesIds = selectedCoursesToRepeat.map(course => course.course_id);
  
    // Call generatePlanOptions function with the selected field names and repeated course IDs
    const returnedPlanOptions = getOptions(selectedField, repeatedCoursesIds, maxCredit);
  
    // Update state with the results from generatePlanOptions
    setPlanOptions(planOptions); 
    setMandatoryCourses(new Set([...mandatoryCourses])); // Assuming these are course IDs
    

    // Move to the next step where the user can review or customize the generated plans
    nextStep();
  };


  // Logic for second step submission
  const handleSecondStepSubmit = () => {
    setActive(2); // Go to third step
  };

  // Logic for saving the plan
  const handleSavePlan = () => {
    setActive(3);
    onCompleted();
  };

  // Logic for discarding the plan
  const handleDiscardPlan = () => {
    setActive(0); // Return to the first step
  };

  // Logic to handle review and save the plan
  const handleReviewPlan = () => {
    console.log("Plan reviewed and saved");
    setReviewPlan(true);
    onCompleted(); // This can be called after the plan is successfully saved
  };

  const resetFormAndCreateAnotherPlan = () => {
    setActive(0);
    setFieldOfStudy("");
    setPlanName("");
    setMaxCredit(0);
    setSelectedField([]);
    setSelectedCoursesToRepeat([]);
    setReviewPlan(false);
  };

  const numRef = useRef<HTMLInputElement>(null);
  console.log(selectedField);
  return (
    <div className="font-avenir w-full">
      <Stepper color="gray" active={active}>
        {/* Form to input preferences */}
        <Stepper.Step
          label="Design"
          icon={<TextCursorInput style={{ width: rem(18), height: rem(18) }} />}
        >
          <form onSubmit={handleFirstStepSubmit} className="flex flex-col gap-4 mt-4">
            <NumberInput
              ref={numRef}
              required
              label="Max credits per quarter"
              placeholder="Enter max credits"
              min={0}
              max={18}
            />
            <div>
              <label className="block text-sm font-medium">Select your field of study:</label>
              <div className="border rounded-md max-h-[125px] overflow-y-auto p-2">
                {fields.map((field: Field,i:number) => (
                <div key={field.name}>
                  <label
                    className="ml-2 block text-sm font-medium"
                    htmlFor={field.name}
                  >
                    <Checkbox
                      onCheckedChange={() => handleFieldSelect(field)}
                      id={field.name}
                      className="border-[.5px] mr-6 mt-1"
                    />
                    {field.name} ({field.type}, {field.quarter} {field.year})
                  </label>
                </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Select from the list below courses you'd like to retake:
              </label>
              <div className="border rounded-md max-h-[125px] overflow-y-auto p-2">
                {completedClassList.map((course: Course) => (
                  <div className="flex justify-between " key={course.course_id}>
                    <label
                      className="ml-2"
                      htmlFor={course.course_id}
                      key={course.course_id}
                    >
                      <Checkbox
                      onCheckedChange={() => handleCourseSelect(course)}
                      id={course.course_id}
                      className="border-[.5px] mr-6 mt-1"
                    />
                      {course.course_id} - {course.name}{" "}
                    </label>
                    
                  </div>
                ))}
              </div>
            </div>

            {/*map through planOptions display in a Card checkbox */}
            
              <div>
                {/* {planOptions.map((planpreference:PlanOption) => (
                  <div key={planpreference.course_id}>
                    <label
                      className="ml-2"
                      htmlFor={planpreference.course_id}
                      key={planpreference.course_id}
                    >
                      <Checkbox
                      onCheckedChange={() => handleCourseSelect(planpreference)}
                      id={planpreference.course_id}
                      className="border-[.5px] mr-6 mt-1"
                    />
                      {planpreference.course_id} - {planpreference.name}{" "}
                    </label>
                  </div>
                ))} */}
              </div>

            <div className="flex justify-center">
              <Button
                className="bg-gold-base hover:bg-gold-light text-white font-bold px-4 py-2 rounded-full my-6 ease-in-out transition-all duration-200"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Stepper.Step>
        {/* Dynamic User Preference */}
        <Stepper.Step
          label="Customize"
          icon={<Pocket style={{ width: rem(18), height: rem(18) }} />}
        >
          {/* <div>
          {planOptions.map((optionGroup, index) => (
            <div key={index}>
              {optionGroup.map((option) => (
                <Checkbox
                  key={option.course_id}
                  label={`${option.course_id} - ${option.name}`}
                  
                />
              ))}
            </div>
          ))}
          </div> */}
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
        <Stepper.Step
          label="Review"
          icon={<ScanEye style={{ width: rem(18), height: rem(18) }} />}
        >
          {reviewPlan && (
            <>
              <Card shadow="sm" p="lg" className="mb-4">
                {/* Display the plan summary for review */}
              </Card>
              <Button onClick={handleReviewPlan}>Save Plan</Button>
              <Button onClick={handleDiscardPlan} color="red">
                Discard Plan
              </Button>
            </>
          )}
          <div className="flex flex-col items-center mb-4">
            <div className="w-full max-w-md p-4 border rounded-lg shadow-sm">
              <TextInput
                label="Plan Name"
                placeholder="Enter your plan name"
                value={planName}
                onChange={(event) => setPlanName(event.currentTarget.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              className="bg-gold-base hover:bg-gold-light text-white font-bold px-4 py-2 rounded-full"
              onClick={handleSavePlan}
            >
              Save Plan
            </Button>
            <Button
              className="bg-gold-base text-white font-bold px-4 py-2 rounded-full"
              onClick={handleDiscardPlan}
            >
              Discard Plan
            </Button>
          </div>
        </Stepper.Step>
        <Stepper.Completed>
          <div className="flex flex-col items-center justify-center pt-20">
            <div>
              <Text size="xl" className="font-bold">
                Plan saved successfully!
              </Text>
            </div>
            <div>
              <Button
                className="bg-gold-base hover:bg-gold-light text-white font-bold px-4 py-2 rounded-full mt-4"
                onClick={resetFormAndCreateAnotherPlan}
              >
                Create Another Plan
              </Button>
            </div>
          </div>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default CreatePlan;
