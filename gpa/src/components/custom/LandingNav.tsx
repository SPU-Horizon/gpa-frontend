import { useState, useEffect } from "react";
import { GpaGold } from "@/icons";
import { MobileDrawer } from "./MobileDrawer";

export default function LandingNavbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 750);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex justify-between w-full text-white-base ml-7 md:ml-1">
      <GpaGold />

      {isMobile ? (
        <div onAnimationEnd={() => null}>
          <MobileDrawer />
        </div>
      ) : (
        <div className="flex space-x-4 items-center text-2xl font-medium pr-4">
          <a className="text-white cursor-pointer hover:text-gold-light ">
            Vision
          </a>
          <a className="text-white cursor-pointer hover:text-gold-light">
            Key Features
          </a>
          <a className="text-white cursor-pointer  hover:text-gold-light">
            Contact Us
          </a>
          <a
            className="text-white cursor-pointer  hover:text-gold-light"
            href="/login"
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
}
