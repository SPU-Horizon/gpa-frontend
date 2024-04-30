import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ClassCardList } from "@/components/dashboard/transcript/ClassCardList";
import { useCourseStore } from "@/stores";

type ClassHistoryProps = {
  test?: any;
};

export default function ClassHistory({ test = [] }: ClassHistoryProps) {
  const { completedClassList, inProgressClassList, registeredClassList, gpa } =
    useCourseStore(); //Destructuring

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center px-3 py-[.88rem]">
        <h1 className="text-xl font-bold ml-2">Your Transcript</h1>
        <h2 className="text-base ml-auto">
          Current GPA: <span className="font-bold mr-4">{gpa.toFixed(2)}</span>
        </h2>
      </div>
      <Separator />

      <Tabs
        defaultValue="In Progress"
        className=" mx-12 sm:mx-2 lg:mx-12 xl:mx-12 mt-4 overflow-y-scroll overflow-x-visible "
      >
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-white-light dark:bg-black-light">
          <TabsTrigger
            value="Registered"
            className="data-[state=active]:bg-gold-light dark:data-[state=active]:bg-white-light data-[state=active]:text-white-light dark:data-[state=active]:text-black-base transition-all ease-in-out duration-200 shadow-md"
          >
            Registered
          </TabsTrigger>
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

        <TabsContent value="Registered">
          <ClassCardList
            items={test.length > 0 ? test : registeredClassList}
            completion="Registered"
          />
        </TabsContent>

        <TabsContent value="In Progress">
          <ClassCardList
            items={test.length > 0 ? test : inProgressClassList}
            completion="In Progress"
          />
        </TabsContent>

        <TabsContent value="Completed" className="h-full">
          <ClassCardList items={completedClassList} completion="Completed" />
        </TabsContent>
      </Tabs>
    </TooltipProvider>
  );
}
