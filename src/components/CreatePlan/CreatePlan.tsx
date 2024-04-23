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
import { TextCursorInput, ScanEye, Pocket } from "lucide-react"; //<Check />

interface Course {
  course_id: string;
  name: string;
  credits: string; // or number, depending on your actual data structure
}
interface CreatePlanProps {
  onCompleted: () => void;
}

const CreatePlan: React.FC<CreatePlanProps> = ({ onCompleted }) => {
  const { fields } = useUserStore(); // Provide a default empty array
  const { completedClassList } = useCourseStore();
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [planName, setPlanName] = useState("");
  const [maxCredit, setMaxCredit] = useState(0);
  const [selectedField, setSelectedField] = useState("");
  const [selectedCoursesToRepeat, setSelectedCoursesToRepeat] = useState<
    Course[]
  >([]);
  const [reviewPlan, setReviewPlan] = useState(false);
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  useEffect(() => {
    console.log("fieldRequirements:", fields);
  }, [fields]);

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

  // Logic for first step submission of student input
  const handleFirstStepSubmit = () => {
    console.log(numRef.current?.value); // Get the value from the NumberInput component
    console.log(selectedCoursesToRepeat); // Get the selected courses to repeat
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

  const fieldOptions =
    fields?.map((field) => ({
      value: field,
      label: field,
    })) || [];

  const resetFormAndCreateAnotherPlan = () => {
    setActive(0);
    setFieldOfStudy("");
    setPlanName("");
    setMaxCredit(0);
    setSelectedField("");
    setSelectedCoursesToRepeat([]);
    setReviewPlan(false);
  };

  const numRef = useRef<HTMLInputElement>(null);

  return (
    <div className="font-avenir w-full">
      <Stepper color="gray" active={active}>
        {/* Form to input preferences */}
        <Stepper.Step
          label="Input Preferences"
          icon={<TextCursorInput style={{ width: rem(18), height: rem(18) }} />}
        >
          <form onSubmit={handleFirstStepSubmit} className="flex flex-col gap-4 mt-4">
            <Select
              required
              label="Selected field"
              placeholder="Select a field"
              data={fieldsOptions}
              value={selectedField}
              onChange={(value) => setSelectedField(value || "")}
            />
            <NumberInput
              ref={numRef}
              required
              label="Max credits per quarter"
              placeholder="Enter max credits"
              min={0}
              max={18}
            />
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
                      {course.course_id} - {course.name}{" "}
                    </label>
                    <Checkbox
                      onCheckedChange={() => handleCourseSelect(course)}
                      id={course.course_id}
                      className="border-[.5px] mr-6 mt-1"
                    />
                  </div>
                ))}
              </div>
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
          label="Customize Preferences"
          icon={<Pocket style={{ width: rem(18), height: rem(18) }} />}
        >
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
          label="Review Plan"
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
