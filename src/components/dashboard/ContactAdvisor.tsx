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

  const counselorInfo = [{}];

  return (
    <Card
      className={
        counselorName
          ? " h-full flex flex-col  shadow-lg "
          : " h-full flex flex-col  shadow-lg bg-primary"
      }
    >
      <CardHeader className="pb-3">
        <CardTitle>Academic Counseling</CardTitle>
        <CardDescription className="">
          Contact Your Undergraduate Academic Counselor for advice and guidance
          on your academic journey.
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4 dark:text-white pb-0 flex  flex-grow">
        {counselorName ? (
          <div className="flex flex-col">
            <CardTitle className="mb-3">{counselorName}</CardTitle>
            <CardDescription className="text-base font-semibold dark:text-white mb-3 ">
              {counselorTitle}
            </CardDescription>
            <CardDescription className="text-base font-semibold dark:text-white mb-3 ">
              Lastnames Served: {counselorLastnamesServed}
            </CardDescription>
            <CardDescription className="text-base font-semibold  dark:text-white mb-3">
              Email: {counselorEmail}
            </CardDescription>
            <CardDescription className="text-base font-semibold dark:text-white mb-3">
              Phone: {counselorPhone}
            </CardDescription>{" "}
            <CardFooter className="flex items-center mt-auto pl-0 pb-4 w-full ">
              <a
                href={counselorMeetingLink || "#"}
                target="_blank"
                className="px-4 py-2 bg-primary dark:text-white rounded-md text-sm font-medium font-avenir hover:cursor-pointer ease-in-out hover:bg-transparent duration-150"
              >
                Schedule an Appointment
              </a>
            </CardFooter>
          </div>
        ) : (
          <div className="">
            <CardDescription className="font-semibold text-white text-base text-center">
              You'll need to sync your account with Banner before we can display
              any details.
            </CardDescription>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
