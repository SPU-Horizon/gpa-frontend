import { Timeline } from "@mantine/core";
import { CheckCircle2, BookCheck } from "lucide-react";
import { useState } from "react";
import Step from "@/components/dashboard/integration/step";
import { IntegrationStepData } from "@/constants/IntegrationStepData";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { FileDropzone } from "@/components/custom";
import { useCourseStore } from "@/stores";
import { toast } from "@/components/ui/use-toast";

export default function IntegrationPage() {
  const [value, setValue] = useState<File | null>(null);
  const [acceptedFile, setAcceptedFile] = useState(false);
  const { postCourses } = useCourseStore();

  const onSubmission = async () => {
    if (value) {
      const formData = new FormData();
      formData.append("file", value);
      const res = await postCourses(formData);
    }
  };

  function readFileToArrayBuffer(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // Register callback function when file reading is complete
      reader.onload = function (event) {
        const arrayBuffer = event?.target?.result;
        resolve(arrayBuffer);
      };

      // Read file content to ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  }

  return (
    <ScrollArea className="mt-6 h-full w-full">
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-3xl font-bold">Banner Integration</h1>
        <Separator className="mt-4 mb-8" />
        <Timeline bulletSize={40} className="mr-8 ">
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

        <FileDropzone
          onDrop={(files) => {
            console.log(files);
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
          className="mt-16 mb-7"
          icon={
            acceptedFile ? <CheckCircle2 size={52} /> : <BookCheck size={52} />
          }
        />
        <Button
          onClick={onSubmission}
          type="submit"
          className="dark:bg-white-base dark:text-black-base rounded-md px-5 py-2 mt-8 dark:hover:bg-gold-base mb-16"
        >
          Submit
        </Button>
      </div>
    </ScrollArea>
  );
}
