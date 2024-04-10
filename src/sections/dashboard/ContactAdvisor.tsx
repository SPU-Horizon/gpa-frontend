import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useUserStore } from "@/stores";
import { VogelMS, HowardSZ, RendahlAB, MorrisCG, KrienenHM } from "@/images";

export default function ContactAdvisor() {
  let { lastName } = useUserStore();

  lastName = "Aziz";
  let advisorName = "";

  if (lastName >= "A" && lastName <= "B") {
    advisorName = "Annette Rendahl";
  } else if (lastName >= "C" && lastName <= "G") {
    advisorName = "Emily Morris";
  } else if (lastName >= "H" && lastName <= "Mi") {
    advisorName = "Jazmyne Krienen";
  } else if (lastName >= "Mo" && lastName <= "Sm") {
    advisorName = "Marisa Vogal";
  } else if (lastName >= "Sn" && lastName <= "Z") {
    advisorName = "Alison Howard";
  }

  const advisors = [
    {
      title: "Annette Rendahl",
      Link: "https://calendly.com/annetterendahl",
      Lastnames: "(A-B)",
      image: RendahlAB,
    },
    {
      title: "Emily Morris",
      Link: "https://calendly.com/morrise3",
      Lastnames: "(C-G)",
      image: MorrisCG,
    },
    {
      title: "Jazmyne Krienen",
      Link: "https://calendly.com/krienenj",
      Lastnames: "(H-Mi)",
      image: KrienenHM,
    },
    {
      title: "Marisa Vogal",
      Link: "https://calendly.com/mvogel1",
      Lastnames: "(Mo-Sm)",
      image: VogelMS,
    },
    {
      title: "Alison Howard",
      Link: "https://calendly.com/howara",
      Lastnames: "(Sn-Z)",
      image: HowardSZ,
    },
  ];

  const advisorData = advisors.find((advisor) => {
    return advisor.title === advisorName;
  });

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-3 ">
        <CardTitle>Academic Counseling</CardTitle>
        <CardDescription className="  leading-relaxed text-lg">
          Contact Your Undergraduate Academic Counselor for advice and guidance
          on your academic journey.
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4 ease-in-out animate-in animate-out ">
        <div className="flex flex-col gap-6 w-max">
          <div className="hover:animate-pulse ">
            <h4 className="font-avenir font-semibold text-3xl">
              {advisorData?.title || "Placeholder"}{" "}
            </h4>
            <p className="font-avenir font-semibold text-base">
              Lastnames: {advisorData?.Lastnames || "(A-Z)"}
            </p>
            <p>Undergraduate Academic Counselor</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="">
        <a
          href={advisorData?.Link || "#"}
          target="_blank"
          className="p-3 bg-black-light text-white-light rounded-md text-base dark:text-black-base dark:bg-white-light font-medium font-avenir hover:cursor-pointer ease-in-out hover:shadow-sm"
        >
          Schedule an Appointment
        </a>
      </CardFooter>
    </Card>
  );
}
