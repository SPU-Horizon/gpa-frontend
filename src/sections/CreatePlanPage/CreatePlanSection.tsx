import { ScrollArea } from "@/components/ui/scroll-area";
import  BuildSchedule  from "@/components/CreatePlan/BuildSchedule";
import  Header from "@/components/CreatePlan/Header";
import  Footer from "@/components/CreatePlan/Footer";


export default function CreatePlanSection() {
  
    return (
      <div className="flex flex-col h-screen">
        <Header />
        <ScrollArea>
            <BuildSchedule />
        </ScrollArea>
      </div>
    );
  }