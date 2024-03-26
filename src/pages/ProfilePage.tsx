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
import UserStore from "@/stores/UserStore";
import { useThemeStore, useUserStore } from "@/stores";

// This creates a Schema for the Form Component
// Including features that are needed on the front end, according to the database schema
const formSchema = z.object({
  graduationDate: z.date({ required_error: "Please enter a valid date." }),
  enrollmentDate: z.string({ required_error: "Please enter a valid date." }),
  declaredMajor: z.string().min(5, { message: "Major selection is Required." }),
  declaredMinor: z
    .string()
    .min(5, { message: "Minor selection is Required." })
    .optional(),
  email: z.string().email().optional(),
});

// For now, some areas in the form field are set with a placeholder, but when we are able to pull the data from the user's profile
// we will replace these with the user's data. If they have no data, we will keep the placeholders there for first time use.

export default function Profile() {
  const { theme } = useThemeStore();
  const { firstName, lastName, avatar } = useUserStore();

  const [acceptedImage, setAcceptedImage] = useState(false);
  // When the Image is accepted, we need some type of 'state' to reflect that the image has been accepted
  const [filePath, setFile] = useState("");
  // When the File is Accepted, we need to keep the URLString that is converted from the file
  const [opened, { open, close }] = useDisclosure(false);
  // This is a hook that is used to open and close the modal for the avatar editor
  const cropRef = useRef<AvatarEditor | null>(null);
  // This is a ref element that is used to reference the AvatarEditor component

  const [value, setValue] = useState<File | null>(null);
  // This is a state that is used to keep the file that is uploaded - we will send this to the backend.

  // This creates a component named form, following the schema declared above
  // There are some default values set below.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      graduationDate: new Date(),
    },
  });

  const { uploadProfilePicture } = UserStore();

  // This will be the function that is called when the form is submitted
  const handleSubmit = async (
    e: FormEvent,
    data: z.infer<typeof formSchema>
  ) => {
    // e.preventDefault();

    if (value) {
      const formData = new FormData();
      formData.append("file", value as Blob);
      await uploadPhoto(formData);
    }

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

  const uploadPhoto = async (file: FormData) => {
    await uploadProfilePicture(file);
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
          <Avatar src={filePath} size={150}>
            {firstName[0].toLocaleUpperCase() + lastName[0].toLocaleUpperCase()}
          </Avatar>
        </div>

        {filePath ? (
          <Modal opened={opened} onClose={close} centered size={"xl"}>
            <div className="flex flex-col w-full justify-center items-center gap-8">
              <Label className="text-2xl">Edit Avatar</Label>
              <AvatarEditor
                ref={cropRef}
                image={filePath}
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
              placeholder={`${firstName} ${lastName}`}
              disabled
              classNames={{ wrapper: "mt-0" }}
              styles={{
                input: {
                  color: "black",
                  border: "1px solid #d9d9d9",
                  backgroundColor: `${theme === "dark" ? "#222" : "#eee"}`,
                },
              }}
            />
            <TextInput
              classNames={{ wrapper: "mt-0" }}
              label="Email"
              disabled
              placeholder="negasim@spu.edu"
              styles={{
                input: {
                  border: "1px solid #d9d9d9",
                  backgroundColor: `${theme === "dark" ? "#222" : "#eee"}`,
                },
              }}
            />

            <FormField
              control={form.control}
              name="graduationDate"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-3 ">
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
                name="Avatar"
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
                className="mt-2 mb-7 dark:bg-black-light dark:border-none dark:text-white-dark"
                onDrop={(files) => {
                  setValue(files[0]);
                  setFile(URL.createObjectURL(files[0]));
                  setAcceptedImage(true);
                }}
                icon={<Upload size={52} />}
              />
              <Button
                className="mb-14 dark:bg-black-light dark:text-white-light"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
