import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ClassCardList } from "@/components/dashboard/transcript/ClassCardList";
import { useCourseStore } from "@/stores"; //Absolute imports


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
              Current GPA: <span className="font-bold mr-4">{gpa.toFixed(2)}</span>
            </h2>


          </div>
          <Separator />

          <Tabs defaultValue="In Progress" className=" ml-2 mr-2">
            <TabsList className="grid w-full grid-cols-2 gap-2 bg-white-light dark:bg-stone-700">
              <TabsTrigger value="In Progress" className="border border-solid border-grey-dark ml-2">In Progress</TabsTrigger>
              <TabsTrigger value="Completed" className="border border-solid border-grey-dark mr-2">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="In Progress">
              <ClassCardList items={inProgressClassList} completion="In Progress"/>
            </TabsContent>

            <TabsContent value="Completed">
              <ClassCardList items={completedClassList} completion="Completed"/>
            </TabsContent>
          </Tabs>

        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
