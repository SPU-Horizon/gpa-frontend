import Header from "@/components/dashboard/home/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/dashboard/home/Footer";
import { StatsGrid } from "@/components/dashboard/home/StatsGrid";
import { ActionsGrid } from "@/components/dashboard/home/MenuOptionsNew";
import { Separator } from "@/components/ui/separator";
import ContactAdvisors from "./ContactAdvisor";
import { SimpleGrid } from "@mantine/core";
import RegisteredCourseList from "./RegisteredCourses";

export default function HomeOptions() {
  const navigate = useNavigate(); // React Router's useNavigate hook

  const handleCreatePlan = (planDetails: object) => {
    console.log("Creating a plan with the following details:", planDetails);
    // Navigate to a different page upon plan creation (replace '/new-page' with your actual route)
    navigate("/new-page");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Separator />
      <ScrollArea>
        <StatsGrid />
        <SimpleGrid className="my-8 mx-4" cols={{ base: 1, xs: 2, md: 3 }}>
          <RegisteredCourseList />
          <div className="md:row-start-3">PlaceHolder</div>
          <ContactAdvisors />
          <div>PlaceHolder</div>
          <div>PlaceHolder</div>
        </SimpleGrid>
      </ScrollArea>
      <Footer />
    </div>
  );
}
