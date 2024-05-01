import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useUserStore } from "@/stores";

export default function ContactAdvisor() {
  let {
    counselorEmail,
    counselorLastnamesServed,
    counselorMeetingLink,
    counselorName,
    counselorPhone,
    counselorTitle,
  } = useUserStore();

  return (
    <Card className="md:col-span-2 flex flex-col justify-between ">
      <CardHeader className="pb-3 text-center ">
        <CardTitle>Academic Counseling</CardTitle>
        <CardDescription className=" leading-relaxed text-xl font-medium text-gray-400">
          Contact Your Undergraduate Academic Counselor for advice and guidance
          on your academic journey.
        </CardDescription>
      </CardHeader>

      <CardContent className="hover:animate-pulse mt-4 mb-8 text-center">
        {counselorName ? (
          <>
            <CardTitle>{counselorName}</CardTitle>
            <CardDescription className="text-lg font-medium text-gray-400 mt-1">
              {counselorTitle}
            </CardDescription>
            <CardDescription className="text-lg font-medium text-gray-400">
              Lastnames Served - {counselorLastnamesServed}
            </CardDescription>
            <CardDescription className="text-lg font-medium text-gray-400">
              Email: {counselorEmail}
            </CardDescription>
            <CardDescription className="text-lg font-medium text-gray-400">
              Phone: {counselorPhone}
            </CardDescription>{" "}
            <CardFooter className="flex items-center p-0 mt-3 justify-center">
              <a
                href={counselorMeetingLink || "#"}
                target="_blank"
                className="p-3 bg-black-light text-white-light rounded-md text-base dark:text-black-base dark:bg-white-light font-medium font-avenir hover:cursor-pointer ease-in-out hover:shadow-sm"
              >
                Schedule an Appointment
              </a>
            </CardFooter>
          </>
        ) : (
          <>
            <CardDescription className="text-base text-gray-400 font-medium ">
              You'll need to sync your account with Banner before we can display
              any details.
            </CardDescription>
          </>
        )}
      </CardContent>
    </Card>
  );
}
