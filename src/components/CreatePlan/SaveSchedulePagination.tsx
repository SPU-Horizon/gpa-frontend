import { useEffect, useState } from "react";

import {
  PaginationPrevious,
  PaginationItem,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "../ui/pagination";
import { CardContent, Card } from "../ui/card";
import { Button } from "../ui/button";
import useVisualizeStore, { Schedule } from "@/stores/VisualizeStore";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ReactFlowProvider } from "reactflow";
import { VisualizeSequence } from "./SaveSchedule";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import ViewScheduleCard from "./ViewScheduleCard";

type ViewScheduleButtonProps = {
  schedule: Schedule;
  nodes: {}[];
  edges: {}[];
  setSelectedScheduleId?: (id: string) => void;
};

export const ViewScheduleButton = ({
  schedule,
  nodes,
  edges,
  setSelectedScheduleId,
}: ViewScheduleButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            // setSelectedScheduleId(schedule.id);
            setSelectedScheduleId && setSelectedScheduleId(schedule.id);
          }}
          className="w-full bg-primary hover:bg-primary/70 border-none"
        >
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[475px] h-[550px] bg-muted rounded-md max-w-[auto] font-avenir flex flex-col">
        <h2 className="font-semibold text-xl mb-4">Path to Graduation</h2>
        <div className="overflow-y-scroll max-h-[420px]">
          <div className="flex flex-col justify-between h-full mr-5 ml-2">
            {schedule.quarters.map((q, i) => {
              return (
                <div className="flex flex-col mb-3" key={q.id}>
                  <h3 className="text-base font-semibold mb-2">{q.name}</h3>
                  {q.courses.map((c, i) => {
                    return (
                      <div key={c.code} className="flex justify-between">
                        <p>{c.code}</p>
                        <p>{c.title}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild className="w-full mt-auto">
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-black border-none"
              variant="outline"
            >
              Visualize
            </Button>
          </DialogTrigger>

          <DialogContent className=" w-[800px] h-[700px] bg-muted rounded-md max-w-[auto]">
            <ReactFlowProvider>
              <VisualizeSequence nodes={nodes} edges={edges} />
            </ReactFlowProvider>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteScheduleButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full">
        <Button
          size="sm"
          className="bg-muted border-none w-full  hover:bg-muted/50"
          variant="outline"
          onClick={() => {}}
        >
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-[#111] rounded-md">
        <AlertDialogTitle>
          {" "}
          Are You Sure you want to Delete this Schedule?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter className="flex flex-row gap-2 ml-auto">
          <AlertDialogCancel className="mt-0 w-32">No</AlertDialogCancel>
          <AlertDialogAction className="w-32">Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type SaveSchedulePaginationProps = {
  schedules: Schedule[];
};

const SaveSchedulePagination = ({ schedules }: SaveSchedulePaginationProps) => {
  const cardsPerPage = 12;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(cardsPerPage);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>();

  const { modifyAndVisualize } = useVisualizeStore();
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);
  const selectedSchedule = schedules.find(
    (schedule) => schedule.id === selectedScheduleId
  );

  useEffect(() => {
    if (selectedSchedule) {
      const { nodes, edges } = modifyAndVisualize(selectedSchedule!);
      setNodes(nodes);
      setEdges(edges);
    }
  }, [selectedSchedule]);

  return (
    <div>
      <div className=" mx-auto  h-full md:px-0">
        <div className="flex flex-col items-center justify-between ">
          <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-8 h-max w-full py-1 ">
            {schedules.slice(startIndex, endIndex).map((schedule, i) => (
              <ViewScheduleCard key={i} schedule={schedule} />
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => {
                    if (startIndex === 0) return;
                    setStartIndex(startIndex - cardsPerPage);
                    setEndIndex(endIndex - cardsPerPage);
                  }}
                  className={startIndex === 0 ? "cursor-not-allowed " : ""}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => {
                    if (startIndex + cardsPerPage >= schedules.length) return;
                    setStartIndex(startIndex + cardsPerPage);
                    setEndIndex(endIndex + cardsPerPage);
                  }}
                  className={
                    endIndex >= schedules.length ? "cursor-not-allowed" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default SaveSchedulePagination;
