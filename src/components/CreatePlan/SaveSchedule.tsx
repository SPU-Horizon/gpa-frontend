import React, { useState } from "react";
import { Card, Text, Select, Paper } from "@mantine/core";
 
// Assuming a schedule looks like this:
interface Schedule {
  id: string;
  name: string;
  courses: { code: string; title: string; credits: number }[];
  totalCredits: number;
}
const schedules: Schedule[] = [
  {
    id: "1",
    name: "Schedule 1",
    courses: [
      { code: "CSE101", title: "Introduction to Computer Science", credits: 3 },
      { code: "MAT201", title: "Linear Algebra", credits: 4 },
      { code: "ENG101", title: "English Composition", credits: 3 },
    ],
    totalCredits: 10,
  },
  {
    id: "2",
    name: "Schedule 2",
    courses: [
      { code: "CSE201", title: "Data Structures and Algorithms", credits: 4 },
      { code: "MAT301", title: "Discrete Mathematics", credits: 3 },
      { code: "PHY101", title: "Physics", credits: 4 },
    ],
    totalCredits: 11,
  },
  // Add more schedules as needed
];
 
const SaveSchedule: React.FC = () => {
  // Initialize with empty array or fetch from local storage/api
  const [savedSchedules, setSavedSchedules] = useState<Schedule[]>([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null
  );
 
  const selectedSchedule = schedules.find(
    (schedule) => schedule.id === selectedScheduleId
  );
 
  return (
    <div className="flex flex-grow  min-h-[500px] m-12 pb-4 ">
      <Paper className="flex flex-col w-full rounded overflow-hidden bg-white-light dark:border-gray-700 dark:shadow-gray-700/50 dark:bg-black-light">
        <Text size="xl" mb="md" className="font-bold ml-4 mt-4">
          Saved Schedules
        </Text>
        {/* Dropdown to select the schedule */}
        <Select
          placeholder="Select a schedule"
          data={schedules.map((schedule) => ({
            value: schedule.id,
            label: schedule.name,
          }))}
          value={selectedScheduleId}
          onChange={(value: string | null) => setSelectedScheduleId(value)}
          className="w-1/2 ml-4"
        />
 
        {/* Display the selected schedule */}
        {selectedSchedule && (
          <div className="mt-4">
            <Card
              withBorder
              p="lg"
              className="flex flex-col w-full bg-gray-100 dark:border-none dark:shadow-gray-700/50 dark:bg-black-light dark:text-white-base"
            >
              <div className="font-bold mb-2">{selectedSchedule.name}</div>
              <div className="grid grid-cols-3 gap-4">
                {selectedSchedule.courses.map((course) => (
                  <Card key={course.code} className="bg-white-300 dark:bg-grey-dark p-2 dark:text-white-base">
                    <div className="font-medium">{course.code}</div>
                    <div>{course.title}</div>
                    <div>{course.credits} Credits</div>
                  </Card>
                ))}
              </div>
              <div className="mt-4">
                Total Planned Credits: {selectedSchedule.totalCredits}
              </div>
            </Card>
          </div>
        )}
      </Paper>
    </div>
  );
};
 
export default SaveSchedule;

