import { GpaGold } from "@/icons";
import { MobileDrawer } from "../custom/MobileDrawer";
import { links } from "@/constants/navlinks";

import { useMediaQuery } from "usehooks-ts";

export default function LandingNavbar() {
  const isMobile = useMediaQuery("(max-width: 750px)");

  return (
    <div className="flex justify-between w-full text-white-base ml-7 ">
      <GpaGold />

      {isMobile ? (
        <div className="hover:bg-transparent">
          <MobileDrawer />
        </div>
      ) : (
        <div className="flex space-x-4 items-center text-2xl font-medium pr-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white-base hover:text-gold-light font-bold"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
