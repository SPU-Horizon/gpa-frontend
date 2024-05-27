import { ScrollArea } from "@/components/ui/scroll-area";
import BuildSchedule from "@/components/CreatePlan/BuildSchedule";
import SaveSchedule from "@/components/CreatePlan/SaveSchedule";
import { StandardHeader } from "@/components/dashboard";
import { Separator } from "@/components/ui/separator";

export default function CreatePlanSection() {
  return (
    <div className="flex flex-col h-screen">
      <StandardHeader title="Create a Plan" />
      <Separator />
      <ScrollArea>
        <div className="mx-auto px-10">
          <BuildSchedule />
          <SaveSchedule />
        </div>
      </ScrollArea>
    </div>
  );
}
