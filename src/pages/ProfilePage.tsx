import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@mantine/core";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUserStore, useAuthStore } from "@/stores";

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
  const { email } = useAuthStore();

  let {
    firstName,
    lastName,
    graduationQuarter,
    graduationYear,
    enrollmentQuarter,
    enrollmentYear,
  } = useUserStore();

  if (!graduationQuarter || !graduationYear) {
    graduationQuarter = "N/A";
    graduationYear = 0;
  }

  // This creates a component named form, following the schema declared above
  // There are some default values set below.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      graduationDate: new Date(),
    },
  });

  return (
    <ScrollArea className="mt-6 h-full w-full">
      <div className="max-w-[90%] mx-auto mb-24">
        <h1 className="text-3xl font-bold">Profile</h1>

        <Separator className="my-4" />
        <div className="w-full flex justify-center items-center my-14 ">
          <Avatar size={150}>
            {firstName[0].toLocaleUpperCase() + lastName[0].toLocaleUpperCase()}
          </Avatar>
        </div>

        <Form {...form}>
          <form encType="multipart/form-data" className="space-y-8">
            <div className="grid w-full  items-center gap-1.5 ">
              <Label htmlFor="name">Your Name</Label>
              <Input
                disabled
                id="name"
                placeholder={firstName + " " + lastName}
                className="text-lg w-full"
              />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                disabled
                id="email"
                placeholder={email}
                className="text-lg w-full"
              />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="enrollment-date">Enrollment Quarter</Label>
              <Input
                disabled
                id="enrollment-date"
                placeholder={
                  enrollmentQuarter[0].toLocaleUpperCase() +
                  enrollmentQuarter.substring(1) +
                  " " +
                  enrollmentYear
                }
                className="text-lg w-full"
              />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="grad-date">Graduation Date</Label>
              <Input
                disabled
                id="grad-date"
                placeholder={
                  graduationQuarter[0].toLocaleUpperCase() +
                  graduationQuarter.substring(1) +
                  " " +
                  graduationYear
                }
                className="text-lg"
              />
            </div>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="majors">Majors</Label>
              <Input
                disabled
                id="majors"
                placeholder="Computer Science, Mathematics"
                className="text-lg"
              />
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
}
