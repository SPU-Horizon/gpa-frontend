import Header from "@/components/dashboard/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/dashboard/Footer";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { ActionsGrid } from "@/components/dashboard/MenuOptionsNew";
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
      <Header />
      <Separator />
      <ScrollArea>
        <StatsGrid />
        <SimpleGrid className="my-8 mx-4" cols={{ base: 1, xs: 2, md: 3 }}>
          <RegisteredCourseList />
          <ContactAdvisors />
          {/* <div className="md:row-start-3">PlaceHolder</div> */}
        </SimpleGrid>
      </ScrollArea>
      <Footer />
    </div>
  );
}
