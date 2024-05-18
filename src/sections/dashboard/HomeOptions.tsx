import Header from "@/components/dashboard/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { DashboardFooter, MajorProgressGraph } from "@/components/dashboard";

import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { Separator } from "@/components/ui/separator";
import ContactAdvisors from "../../components/dashboard/ContactAdvisor";
import { SimpleGrid } from "@mantine/core";
import RegisteredCourseList from "../../components/dashboard/RegisteredCourses";

export default function HomeOptions() {
  const navigate = useNavigate(); // React Router's useNavigate hook

  const handleCreatePlan = (planDetails: object) => {
    console.log("Creating a plan with the following details:", planDetails);
    // Navigate to a different page upon plan creation (replace '/new-page' with your actual route)
    navigate("/new-page");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Dashboard" />
      <Separator />
      <ScrollArea>
        <div className="px-10 mx-auto pt-4">
          <StatsGrid />
          <SimpleGrid className="my-8" cols={{ base: 1, xs: 1, sm: 2, md: 4 }}>
            <RegisteredCourseList />
            <MajorProgressGraph />
            <ContactAdvisors />
            <div>PlaceHolder</div>
          </SimpleGrid>
        </div>
        <DashboardFooter />
      </ScrollArea>
    </div>
  );
}
