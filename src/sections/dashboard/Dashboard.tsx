import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import {
  DashboardFooter,
  MajorProgressGraph,
  DashboardCarousel,
  StandardHeader,
  ContactAdvisors,
  RegisteredCourseList,
} from "@/components/dashboard";
import { Separator } from "@/components/ui/separator";
import { SimpleGrid } from "@mantine/core";
import { useUserStore } from "@/stores";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, Split } from "lucide-react";
import ViewScheduleCard from "@/components/CreatePlan/ViewScheduleCard";
import { mockSchedules } from "@/constants/MockScheduleData";
import SpuLinksCard from "@/components/dashboard/SpuLinksCard";

const DashboardHeader = () => {
  const { firstName } = useUserStore();

  return (
    <div>
      <h1 className="font-semibold text-4xl mb-2">Hi {firstName}, </h1>
      <h1 className="font-normal text-lg ">
        Welcome to GPA! Here's a quick overview of your progress.
      </h1>
    </div>
  );
};

type CarouselFilterProps = {
  activeIndex: number;
  setActiveFieldIndex: (index: number) => void;
};

const CarouselFilter = ({
  activeIndex,
  setActiveFieldIndex,
}: CarouselFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fields } = useUserStore();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] flex justify-between md:gap-2"
          role="combobox"
        >
          Major Statistics
          <Split className="w-3 h-3 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {fields &&
              fields.map((field, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setIsOpen(false);
                    setActiveFieldIndex(index);
                    console.log(activeIndex);
                  }}
                  className="flex justify-between w-full font-avenir font-normal pr-0.5"
                >
                  {field.name}
                  <CheckIcon
                    className={`${
                      index === activeIndex
                        ? "text-primary"
                        : "text-transparent"
                    }`}
                  />
                </CommandItem>
              ))}
            {!fields ||
              (fields.length === 0 && (
                <CommandItem className="flex justify-between w-full font-avenir font-normal pr-0.5">
                  No Fields
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default function Dashboard() {
  const navigate = useNavigate(); // React Router's useNavigate hook
  const [activeFieldIndex, setActiveField] = useState(0);

  return (
    <div className="flex flex-col h-screen overflow-x-visible">
      <StandardHeader title="Dashboard" Logo />
      <Separator />
      <ScrollArea>
        <div className="px-10 mx-auto pt-8">
          <header className="flex w-full justify-between mb-8">
            <DashboardHeader />
            <CarouselFilter
              activeIndex={activeFieldIndex}
              setActiveFieldIndex={setActiveField}
            />
          </header>

          <DashboardCarousel activeFieldIndex={activeFieldIndex} />

          <SimpleGrid className="my-8 w-full " cols={{ lg: 6 }}>
            <div className="col-span-3 midxl:col-span-2 ">
              <RegisteredCourseList />
            </div>

            <div className="col-span-3 midxl:col-span-2 ">
              <MajorProgressGraph />
            </div>

            <div className="col-span-2 midxl:col-span-1 mantineMid:col-span-2 ">
              <SpuLinksCard />
            </div>
            <div className="col-span-2 midxl:col-span-1 mantineMid:col-span-2 ">
              <ViewScheduleCard
                isDashboard
                schedule={mockSchedules[mockSchedules.length - 1]}
              />
            </div>

            <div className="col-span-2 ">
              <ContactAdvisors />
            </div>
          </SimpleGrid>
        </div>
        <DashboardFooter />
      </ScrollArea>
    </div>
  );
}
