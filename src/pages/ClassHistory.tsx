import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ClassCardList } from "@/components/dashboard/transcript/ClassCardList";
import { useCourseStore } from "@/stores"; //Absolute imports

interface Course {
  id: string;
  name: string;
  credits: string; // or number, depending on your actual data structure
}

type ClassHistoryProps = {
  test?: any;
};

export default function ClassHistory({ test = [] }: ClassHistoryProps) {
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
          <div className="flex items-center px-3 py-[.88rem]">
            <h1 className="text-xl font-bold ml-2">Your Transcript</h1>
            <h2 className="text-base ml-auto">
              Current GPA:{" "}
              <span className="font-bold mr-4">{gpa.toFixed(2)}</span>
            </h2>
          </div>
          <Separator />

          <Tabs
            defaultValue="In Progress"
            className=" mx-20 sm:mx-2 lg:mx-12 xl:mx-16 mt-4"
          >
            <TabsList className="grid w-full grid-cols-2 gap-2 bg-white-light dark:bg-black-light">
              <TabsTrigger
                value="In Progress"
                className="data-[state=active]:bg-gold-light dark:data-[state=active]:bg-white-light data-[state=active]:text-white-light dark:data-[state=active]:text-black-base transition-all ease-in-out duration-200 shadow-md"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="Completed"
                className="data-[state=active]:bg-gold-light dark:data-[state=active]:bg-white-light data-[state=active]:text-white-light dark:data-[state=active]:text-black-base transition-all ease-in-out duration-200 shadow-md"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="In Progress">
              <ClassCardList
                items={test.length > 0 ? test : inProgressClassList}
                completion="In Progress"
              />
            </TabsContent>

            <TabsContent value="Completed">
              <ClassCardList
                items={completedClassList}
                completion="Completed"
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
