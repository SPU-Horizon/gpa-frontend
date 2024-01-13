import { GpaGold } from "@/icons";
import { MobileDrawer } from "../custom/MobileDrawer";
import { Links } from "@/constants";

import { useMediaQuery } from "usehooks-ts";

export default function LandingNavbar() {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div className="flex justify-between w-full text-white-base ml-7 ">
      <GpaGold />

      {isMobile ? (
        <div className="hover:bg-transparent pr-6">
          <MobileDrawer />
        </div>
      ) : (
        <div className="flex space-x-4 items-center text-3xl font-medium pr-4">
          {Links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white-dark hover:text-white-light ease-in-out duration-150 font-bold"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
