import { FormEvent, useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker, FileDropzone } from "@/components/custom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, TextInput, Modal } from "@mantine/core";

import AvatarEditor from "react-avatar-editor";
import { useDisclosure } from "@mantine/hooks";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

// This creates a Schema for the Form Component
// Including features that are needed on the front end, according to the database schema
const formSchema = z.object({
  graduationDate: z.date({ required_error: "Please enter a valid date." }),
});

export default function Profile() {
  const [acceptedImage, setAcceptedImage] = useState(false);
  // When the Image is accepted, we need some type of 'state' to reflect that the image has been accepted
  const [file, setFile] = useState("");
  // When the File is Accepted, we need to keep the URLString that is converted from the file
  const [opened, { open, close }] = useDisclosure(false);
  // This is a hook that is used to open and close the modal for the avatar editor

  // This is a ref element that is used to reference the AvatarEditor component
  const cropRef = useRef<AvatarEditor | null>(null);

  // This creates a component named form, following the schema declared above
  // There are some default values set below.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      graduationDate: new Date(),
    },
  });

  // This will be the function that is called when the form is submitted
  const handleSubmit = (e: FormEvent, data: z.infer<typeof formSchema>) => {
    // e.preventDefault();
    form.reset();
    setAcceptedImage(false);
  };

  const handleImageCrop = async () => {
    if (cropRef.current) {
      const canvas = cropRef.current.getImage();
      const dataUrl = canvas.toDataURL();
      setFile(dataUrl);
    }
  };

  return (
    <ScrollArea className="mt-6 h-full w-full">
      <div className="max-w-[90%] mx-auto">
        <h1 className="text-3xl font-bold">Profile</h1>

        <Separator className="my-4" />
        <div
          className="w-full flex justify-center items-center my-14 "
          onClick={open}
        >
          <Avatar src={file} size={150}>
            MN
          </Avatar>
        </div>

        {file ? (
          <Modal opened={opened} onClose={close} centered size={"xl"}>
            <div className="flex flex-col w-full justify-center items-center gap-8">
              <Label className="text-2xl">Edit Avatar</Label>
              <AvatarEditor
                ref={cropRef}
                image={file}
                width={300}
                height={300}
                borderRadius={999}
              />
              <Button
                onClick={() => {
                  handleImageCrop();
                  close();
                }}
              >
                Save
              </Button>
            </div>
          </Modal>
        ) : null}

        <Form {...form}>
          <form
            onSubmit={(e) => {
              handleSubmit(e, form.getValues());
            }}
            className="space-y-8"
          >
            <TextInput
              label="Your Name"
              placeholder="Matthew Negasi"
              disabled
              classNames={{ wrapper: "mt-0" }}
            />
            <TextInput
              classNames={{ wrapper: "mt-0" }}
              label="Email"
              disabled
              placeholder="negasim@spu.edu"
            />

            <FormField
              control={form.control}
              name="graduationDate"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-3">
                    <FormLabel>Expected Graduation Date</FormLabel>
                    <FormControl>
                      <DatePicker />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Avatar Upload</FormLabel>
              <FileDropzone
                maxFiles={1}
                header={
                  acceptedImage
                    ? "Image Accepted"
                    : "Drag images here or click to select files"
                }
                subheader={
                  acceptedImage
                    ? "Youre Good To Go!"
                    : ".jpg and .webp accepted - Max size: 5mb"
                }
                className="mt-2 mb-7"
                onDrop={(files) => {
                  console.log(files);
                  setFile(URL.createObjectURL(files[0]));
                  setAcceptedImage(true);
                }}
                icon={<Upload size={52} />}
              />
              <Button className="mb-14" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
