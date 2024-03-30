import { Button } from "@/components/ui/button";
import { GPAHero } from "@/images";
import LandingNavbar from "@/components/landingpage/LandingNavigation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isSticky, setSticky] = useState(false);

  /* useEffect hook that watches the Hero Section, if we scroll past it we will make the navigation stick to the top of the page */
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      const heroSectionHeight = heroSection ? heroSection.offsetHeight : 0;
      setSticky(window.pageYOffset > heroSectionHeight - 5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="hero-section"
      className={
        isSticky
          ? " pt-[185px] overflow-hidden bg-cover items-start pl-12  pr-12 pb-16 sm:p-3 text-white-base"
          : "  overflow-hidden bg-cover items-start pl-12 pt-16 pr-12 pb-16 sm:p-3 sm:pt-16 text-white-base"
      }
      style={{
        backgroundImage: ` 
        linear-gradient(180deg, rgba(68,70,74,1) 0%, rgba(0,0,0,0.4458158263305322) 100%),
        url(${GPAHero})`,
        zIndex: `-1`,
        width: "100vw",
      }}
    >
      <div className="flex flex-col w-full gap-20 max-w-[120rem] my-0 mx-auto ">
        {/* --------------- Navigation Bar -------------------  */}

        <LandingNavbar sticky={isSticky} />

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
              className=" dark:bg-gold-light dark:text-white-light dark:hover:bg-black-light bg-gold-light text-gray-200 hover:bg-black-base hover:text-white-base duration-200 ease-in-out w-40 h-20"
              onClick={() => navigate("/register")}
            >
              <p className="text-xl font-semibold"> Get Started </p>
            </Button>
            <Button
              className="dark:hover:bg-black-base dark:hover:text-white-base bg-white-light text-black-base hover:bg-gray-950 hover:text-white-base ease-in-out duration-200 w-48 h-20"
              onClick={() => navigate("/sign-in")}
            >
              <p className="text-xl font-semibold"> Sign In</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
