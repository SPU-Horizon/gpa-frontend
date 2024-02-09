import React from "react";
import { DashboardMenuOptions } from "@/constants";
import MenuOption from "@/components/dashboard/home/MenuOption";
import StatDisplayContainer from "@/components/dashboard/home/StatDisplayContainer";
import Header from "@/components/dashboard/home/Header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { HomeCarousel } from "@/components/dashboard/home/HomeCarousel";
import RegisteredCoursesList from "@/components/dashboard/home/RegisteredCoursesList"; 
import Footer from "@/components/dashboard/home/Footer";

export default function HomeOptions() {
  const navigate = useNavigate(); // React Router's useNavigate hook

  const handleCreatePlan = (planDetails: object) => {
    console.log("Creating a plan with the following details:", planDetails);
    // Navigate to a different page upon plan creation (replace '/new-page' with your actual route)
    navigate("/new-page");
  };

  return (
    <div className="flex flex-col h-screen"> {/* Full screen height */}
      <Header />
      <div className="flex-grow overflow-auto p-4"> 
        <div className="grid grid-rows-3 grid-cols-6 gap-2">
              {/* Stat Displays */}
          <div className="col-start-2 col-span-4">
            <StatDisplayContainer />
          </div>
            {/* Disday options*/}
            <div className="col-start-2 col-span-4 row-start-2 row-span-3 mt-4">
              <HomeCarousel />
            </div>
            <div className="row-start-2 col-end-6 col-span-1 row-span-3"> 
              <RegisteredCoursesList />
            </div>
            <ScrollArea className="mb-9 col-start-2 col-span-4 row-start-3 row-span-3">
            <div className="flex space-x-4 overflow-x-auto mx-auto max-w-6xl my-4 ">
                {DashboardMenuOptions.map((option) => (
                  <MenuOption
                    key={option.name}
                    option={option}
                    className="w-[250px]"
                    aspectRatio="portrait"
                    width={250}
                    height={330}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {/* Right Content: Registered Courses List */}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
