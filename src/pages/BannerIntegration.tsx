import { Timeline } from "@mantine/core";
import { CheckCircle2, BookCheck } from "lucide-react";
import { useState } from "react";
import Step from "@/components/integration/step";
import { IntegrationStepData } from "@/constants/IntegrationStepData";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileDropzone } from "@/components/custom";
import { useCourseStore, useThemeStore, useUserStore } from "@/stores";
import { Toaster, toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import {Text} from "@mantine/core";

import { BannerGIF } from "@/images";
import { set } from "date-fns";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FailedEnrollment = {
  course_id: string;
  course_title: string;
  credits: string;
  year: string;
  quarter: string;
  grade: Number | null;
};

type Enrollment = {
  attributes: string | null;
  course_id: string;
  credits: string;
  description: string;
  grade?: string;
  name: string;
  quarter: string;
};

export default function IntegrationPage() {
  const [value, setValue] = useState<File | null>(null);
  const [acceptedFile, setAcceptedFile] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const {
    postBanner,
    initializeCourseInfo,
    completedClassList,
    inProgressClassList,
    registeredClassList,
  } = useCourseStore();
  const { studentId, initializeUserInfo } = useUserStore();
  const { theme } = useThemeStore();

  const duplicateCheck = (courseId: string) => {
    const allClasses = [
      ...completedClassList,
      ...inProgressClassList,
      ...registeredClassList,
    ];

    let val = allClasses.some(
      (course: Enrollment) => course.course_id === courseId
    );

    return val;
  };

  const onSubmission = async (option: string) => {
    setLoading(true);
    if (value) {
      const formData = new FormData();
      formData.append("file", value);
      formData.append("student_id", studentId.toString());

      const res = await postBanner(formData, option);
      //Res can be an object with 3 properties: parsedCourses, majorRequirements, failedEnrollments (if field option is chosen)
      //Otherwise res only contains parserCourses, failedEnrollments

      if (res.status === 200 && res.failedEnrollments.length === 0) {
        toast.success("File Uploaded Successfully, All Classes Added");
        initializeCourseInfo();
        initializeUserInfo();
      } else if (res.status === 200) {
        toast.warning(
          <div className="font-avenir flex flex-col gap-4">
            <div className="font-bold text-lg text-center justify-center gap-2 flex">
              <AlertTriangle /> A few classes couldn't be added.
            </div>
            <p className="font-bold text-base text-center">
              We don't have these classes in our database.
            </p>
            <div className="max-h-[250px] overflow-scroll w-full flex justify-center items-center">
              <div className="flex flex-wrap gap-4 justify-center">
                {res.failedEnrollments.map(
                  (enrollment: FailedEnrollment, index: number) =>
                    duplicateCheck(enrollment["course_id"]) ? null : (
                      <div key={index} className="flex flex-col items-center p-2 border rounded shadow-md w-full md:w-1/2">
                        <p className="font-bold text-base">
                          {enrollment["course_id"]}
                        </p>
                        <p className="font-bold text-base">
                          {enrollment["course_title"]}
                        </p>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        );
        initializeCourseInfo();
        initializeUserInfo();
      } else {
        toast.error("An Error Occured While Uploading File");
      }

      if (res.missingFields.length > 0){
        toast.warning(
          <div className="font-avenir flex flex-col gap-2">
            <div>
              <Text className="font-bold text-base text-center">
                We've noticed there are some missing fields: {res.missingFields.join(", ")}. 
                Would you like to upload additional files to complete these entries?
              </Text>
            </div>
          </div>
        );
    }
    }
    setValue(null);
    setAcceptedFile(false);
    setLoading(false);
  };
 
  return (
    <ScrollArea className="mt-6 h-full w-full">
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-3xl font-bold">Sync with Banner</h1>
        <Separator className="mt-4 mb-8" />

        <div className="flex  gap-2">
          <Timeline
            bulletSize={40}
            color={theme === "dark" ? "#222" : "#bbb"}
            className="mr-8 mb-8"
          >
            {IntegrationStepData.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
                link={step.link}
              />
            ))}
          </Timeline>
        </div>
        <div className="h-[400px] flex flex-col justify-center mt-4 ">
          <h1 className="text-2xl font-bold mb-4">Tutorial GIF</h1>
          <img src={BannerGIF} width={600} />
        </div>

        <Tabs
          defaultValue="New Field"
          className="mt-4 overflow-y-hidden overflow-x-visible"
        >
          <TabsList className="mt-12 grid w-full grid-cols-2 gap-2 bg-white-light dark:bg-black-light">
            <TabsTrigger
              value="Update Courses"
              className="text-md data-[state=active]:bg-gold-light dark:data-[state=active]:bg-white-light data-[state=active]:text-white-light dark:data-[state=active]:text-black-base transition-all ease-in-out duration-200 shadow-md"
            >
              Update Courses
            </TabsTrigger>
            <TabsTrigger
              value="New Field"
              className="text-md data-[state=active]:bg-gold-light dark:data-[state=active]:bg-white-light data-[state=active]:text-white-light dark:data-[state=active]:text-black-base transition-all ease-in-out duration-200 shadow-md"
            >
              New Field
            </TabsTrigger>
          </TabsList>
          {isLoading ? (
            <>
              <FileDropzone
                loading={true}
                loaderProps={{ type: "dots", color: "#927c4e" }}
                accept={{ "text/html": [".html"] }}
                maxFiles={1}
                header={
                  acceptedFile
                    ? "File Accepted"
                    : "Drag or click to select files"
                }
                subheader={
                  acceptedFile
                    ? "Youre Good To Go!"
                    : " ONLY .html & .htm accepted "
                }
                className="mt-16 mb-7 dark:bg-black-light dark:border-none dark:text-white-dark"
                icon={
                  acceptedFile ? (
                    <CheckCircle2 size={52} />
                  ) : (
                    <BookCheck size={52} />
                  )
                }
              />
            </>
          ) : (
            <FileDropzone
              onDrop={(files) => {
                setValue(files[0]);
                setAcceptedFile(true);
              }}
              accept={{ "text/html": [".html"] }}
              maxFiles={1}
              header={
                acceptedFile ? "File Accepted" : "Drag or click to select files"
              }
              subheader={
                acceptedFile
                  ? "Youre Good To Go!"
                  : " ONLY .html & .htm accepted "
              }
              className="mt-16 mb-7 dark:bg-black-light dark:border-none dark:text-white-dark"
              icon={
                acceptedFile ? (
                  <CheckCircle2 size={52} />
                ) : (
                  <BookCheck size={52} />
                )
              }
            />
          )}
          <TabsContent value="Update Courses">
            <Button
              onClick={() => onSubmission("courses")}
              type="submit"
              className="dark:bg-black-light dark:text-white-light rounded-md px-5 py-2 mt-2 dark:hover:bg-gold-base mb-16 w-24"
            >
              Submit
            </Button>
          </TabsContent>

          <TabsContent value="New Field">
            <Button
              onClick={() => onSubmission("field")}
              type="submit"
              className="dark:bg-black-light dark:text-white-light rounded-md px-5 py-2 mt-2 dark:hover:bg-gold-base mb-16 w-24"
            >
              Submit
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}
