import { Timeline } from "@mantine/core";
import { CheckCircle2, BookCheck } from "lucide-react";
import { useState } from "react";
import Step from "@/components/dashboard/integration/step";
import { IntegrationStepData } from "@/constants/IntegrationStepData";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileDropzone } from "@/components/custom";
import { useCourseStore, useThemeStore, useUserStore } from "@/stores";
import { toast } from "sonner";
import { BannerGIF } from "@/images";

export default function IntegrationPage() {
  const [value, setValue] = useState<File | null>(null);
  const [acceptedFile, setAcceptedFile] = useState(false);
  const { postCourses, initializeCourseInfo } = useCourseStore();
  const { studentId, initializeUserInfo } = useUserStore();
  const { theme } = useThemeStore();

  const onSubmission = async () => {
    console.log(value);
    if (value) {
      const formData = new FormData();
      formData.append("file", value);
      formData.append("student_id", studentId.toString());

      const res = await postCourses(formData);

      if (res) {
        toast.success("File Uploaded Successfully");
        setValue(null);
        setAcceptedFile(false);
        initializeCourseInfo();
        initializeUserInfo();
      } else {
        toast.error("An Error Occured While Uploading File");
        setValue(null);
        setAcceptedFile(false);
      }
    }
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
        <div className="h-[400px] flex items-center self-center">
          <img src={BannerGIF} width={600} />
        </div>

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
            acceptedFile ? "Youre Good To Go!" : " ONLY .html & .htm accepted "
          }
          className="mt-16 mb-7 dark:bg-black-light dark:border-none dark:text-white-dark"
          icon={
            acceptedFile ? <CheckCircle2 size={52} /> : <BookCheck size={52} />
          }
        />
        <Button
          onClick={onSubmission}
          type="submit"
          className="dark:bg-black-light dark:text-white-light rounded-md px-5 py-2 mt-8 dark:hover:bg-gold-base mb-16 w-24"
        >
          Submit
        </Button>
      </div>
    </ScrollArea>
  );
}
