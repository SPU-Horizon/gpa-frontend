import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DeleteScheduleButton,
  ViewScheduleButton,
} from "@/components/CreatePlan/SaveSchedulePagination";
import { Badge } from "@/components/ui/badge";
import useVisualizeStore, { Schedule } from "@/stores/VisualizeStore";

type ViewScheduleCardProps = {
  schedule?: Schedule;
  isDashboard?: boolean;
};

function ViewScheduleCard({ schedule, isDashboard }: ViewScheduleCardProps) {
  if (isDashboard && !schedule) {
    return (
      <Card className="w-full h-full shadow-lg col-span-2 midxl:col-span-1 lg:col-span-full">
        <CardHeader>
          <CardTitle>My Recent Plan</CardTitle>
          <CardDescription>View your recent plan</CardDescription>
        </CardHeader>
        <CardContent className=" w-full flex">
          <p className="text-base font-semibold text-center self-center">
            No recent plan found, Banner Sync is required before plans can be
            made and displayed.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (schedule && isDashboard) {
    const { modifyAndVisualize } = useVisualizeStore();
    const [nodes, setNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);
    useEffect(() => {
      const { nodes, edges } = modifyAndVisualize(schedule!);
      setNodes(nodes);
      setEdges(edges);
    }, []);
    return (
      <Card
        key={schedule.id}
        className="h-full w-full flex flex-col justify-between dark:bg-black-light shadow-lg  "
      >
        <CardHeader>
          <CardTitle>My Recent Plan</CardTitle>
          <CardDescription>
            View your most recent plan created through the Sequence Generator
          </CardDescription>
        </CardHeader>

        <CardContent className=" h-full">
          <CardTitle className="text-base font-semibold mb-4">
            Title: {schedule.name}
          </CardTitle>

          <p className="text-base font-semibold mb-4">
            Date Created: {schedule.dateCreated.toDateString()}
          </p>
          <p className="text-base font-semibold mb-4">
            Max Credits: {schedule.totalCredits}
          </p>
          <div className="font-semibold">
            Fields:{" "}
            {schedule.fields.map((field, i: number) => {
              return (
                <div key={i} className="inline-block ml-2">
                  <Badge className="text-[10px] ease-in-out transition-all duration-200 shadow-md hover:scale-[1.01]">
                    {field}{" "}
                  </Badge>{" "}
                  {"  "}
                </div>
              );
            })}
          </div>
        </CardContent>
        <div className="flex items-center gap-2 p-4">
          <ViewScheduleButton schedule={schedule} nodes={nodes} edges={edges} />
          <DeleteScheduleButton />
        </div>
      </Card>
    );
  }

  if (schedule) {
    const { modifyAndVisualize } = useVisualizeStore();
    const [nodes, setNodes] = useState<any[]>([]);
    const [edges, setEdges] = useState<any[]>([]);
    useEffect(() => {
      const { nodes, edges } = modifyAndVisualize(schedule!);
      setNodes(nodes);
      setEdges(edges);
    }, []);
    return (
      <Card
        key={schedule.id}
        className="w-full flex flex-col justify-between h-[350px] dark:bg-black-light  "
      >
        <CardContent className="p-4 h-full">
          <CardTitle className="text-lg font-semibold mb-4">
            {schedule.name}
          </CardTitle>

          <p className="text-xs mb-4">
            Date Created: {schedule.dateCreated.toDateString()}
          </p>
          <p className="font-semibold mb-4">
            Max Credits: {schedule.totalCredits}
          </p>
          <div className="font-semibold">
            Fields:{" "}
            {schedule.fields.map((field, i: number) => {
              return (
                <div key={i} className="inline-block ml-2">
                  <Badge className="text-[10px] ease-in-out transition-all duration-200 shadow-md hover:scale-[1.01]">
                    {field}{" "}
                  </Badge>{" "}
                  {"  "}
                </div>
              );
            })}
          </div>
        </CardContent>
        <div className="flex items-center gap-2 p-4">
          <ViewScheduleButton schedule={schedule} nodes={nodes} edges={edges} />
          <DeleteScheduleButton />
        </div>
      </Card>
    );
  }
}

export default ViewScheduleCard;
