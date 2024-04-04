import { ScrollArea } from "@/components/ui/scroll-area";
import  BuildSchedule  from "@/components/CreatePlan/BuildSchedule";
import  SaveSchedule  from "@/components/CreatePlan/SaveSchedule";
import  Header from "@/components/CreatePlan/Header";

export default function CreatePlanSection() {
  
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <ScrollArea>
            <BuildSchedule />
            <SaveSchedule />
        </ScrollArea>
      </div>
    );
  }