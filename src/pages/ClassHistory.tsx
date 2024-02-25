import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ClassCardList } from "@/components/dashboard/transcript/ClassCardList";
import { useCourseStore } from "@/stores"; //Absolute imports

interface DashboardProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
}

export default function ClassHistory() {
  const { completedClassList, inProgressClassList, gpa } = useCourseStore(); //Destructuring

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="vertical"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-full items-stretch"
      >
        <ResizablePanel defaultSize={50} minSize={0} maxSize={100}>
          <div className="flex items-center px-3 py-2">
            <h1 className="text-xl font-bold ml-2">Your Classes</h1>
            <h2 className="text-base ml-auto">
              Current GPA: <span className="font-bold mr-4">{gpa}</span>
            </h2>
            {/*<Select onValueChange={(value) => handleFilterChange(value)} defaultValue="All Classes"> 
            <Select defaultValue="All Classes">
              <SelectTrigger className="ml-auto mr-2 w-auto text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white-light border-none">
                <SelectGroup>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Remaining">Remaining</SelectItem>
                  <SelectItem value="All Classes">All Classes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </div>
          <Separator />
          <div className="flex flex-col bg-red-700">
            <h1 className="text-xl font-bold ml-2">In Progress Classes</h1>
            <ClassCardList items={inProgressClassList} completion="In Progress"/>
          </div>
          <div className="flex flex-col bg-blue-700">
            <h1 className="text-xl font-bold ml-2">Completed Classes</h1>
            <ClassCardList items={completedClassList} completion="Completed"/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
