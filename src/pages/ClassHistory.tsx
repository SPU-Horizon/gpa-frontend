import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ClassCardList } from "@/components/transcript/ClassCardList";
import { useCourseStore } from "@/stores"; //Absolute imports
import { StandardHeader } from "@/components/dashboard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "@/stores/NavigationStore";

type ClassHistoryProps = {
  test?: any;
};

export default function ClassHistory({ test = [] }: ClassHistoryProps) {
  const { completedClassList, inProgressClassList, registeredClassList } =
    useCourseStore(); //Destructuring

  const { setCurrentTab } = useNavigationStore();
  const navigate = useNavigate();

  if (
    completedClassList.length === 0 &&
    inProgressClassList.length === 0 &&
    registeredClassList.length === 0
  ) {
    return (
      <div className="h-screen flex flex-col">
        <StandardHeader title="Your Transcript" Gpa />
        <Separator />
        <div className="h-full p-[150px] flex flex-col">
          <h1 className="text-3xl font-avenir font-semibold text-center">
            No Courses to Display
          </h1>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className="max-w-[500px] m-auto my-8"
          >
            You'll need to visit the BannerSync page and follow the instructions
            there to add a field to your account. Then previous and current
            enrollments will be displayed here.
          </Text>

          <Button
            variant="subtle"
            size="md"
            className="text-primary bg-muted hover:bg-transparent ease-in-out duration-150 self-center"
            onClick={() => {
              navigate("/dashboard/integrate-banner");
              setCurrentTab("BannerSync");
            }}
          >
            Go to BannerSync
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <TooltipProvider delayDuration={0}>
        <StandardHeader title="Your Transcript" Gpa />
        <Separator />

        <ScrollArea>
          <Tabs
            defaultValue="In Progress"
            className=" px-10 sm:px-2 lg:px-12 xl:px-12 mt-4 overflow-y-hidden overflow-x-visible "
          >
            <TabsList className="grid w-full grid-cols-3 gap-2 bg-white-light dark:bg-black-light">
              <TabsTrigger
                value="Registered"
                className="data-[state=active]:bg-primary dark:data-[state=active]:bg-white-light data-[state=active]:text-white dark:data-[state=active]:text-black-base transition-all ease-in-out duration-200 shadow-md"
              >
                Registered
              </TabsTrigger>
              <TabsTrigger
                value="In Progress"
                className="data-[state=active]:bg-primary dark:data-[state=active]:bg-white-light data-[state=active]:text-white dark:data-[state=active]:text-black-base transition-all ease-in-out duration-200 shadow-md"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="Completed"
                className="data-[state=active]:bg-primary dark:data-[state=active]:bg-white-light data-[state=active]:text-white dark:data-[state=active]:text-black-base transition-all ease-in-out duration-200 shadow-md"
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
              <ClassCardList
                items={completedClassList}
                completion="Completed"
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </TooltipProvider>
    </div>
  );
}
