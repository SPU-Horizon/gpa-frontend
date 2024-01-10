import { Button } from "@mantine/core";

import { GPAHero } from "@/images";
import LandingNavbar from "@/components/landingpage/LandingNavigation";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-full gap-20 overflow-hidden bg-cover items-start pl-12 pt-16 pr-12 pb-16 sm:p-3 sm:pt-16 text-white-base"
      style={{
        backgroundImage: `url(${GPAHero})`,

        fontFamily: "Avenir Next",
      }}
    >
      {/* --------------- Navigation Bar -------------------  */}
      <LandingNavbar />
      {/* --------------- Background & Content -------------------  */}

      <div className="h-[700px] flex flex-col items-start z-1 content-center ml-8 gap-6 md:ml-0 md:content-center md:gap-8">
        <div className="max-w-lg text-6xl font-bold text-gray-100 md:text-center sm:font-bold sm:text-4xl md:w-full md:max-w-none md:font-semibold">
          The Graduation Planning App
        </div>
        <div className=" content-center w-full text-white text-2xl font-semibold md:text-center sm:text-xl ">
          Designed by Students. For Students.
        </div>
        <div className="max-w-xl text-white text-2xl font-semibold md:text-center sm:text-lg md:max-w-none">
          Efficiently schedule classes, meticulously plan your future, and
          receive personalized course recommendations tailored to your
          aspirations.
        </div>

        <div className="w-full flex gap-4 sm:flex-col sm:w-full md:justify-center transition-all ease-in-out">
          <Button
            size="xl"
            color="#927d4e8b"
            className="text-gray-200 hover:bg-gold-light hover:text-white-base"
            onClick={() => navigate("/register")}
          >
            Get started
          </Button>
          <Button
            size="xl"
            color="#e9e9e9"
            className="text-black-light"
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
