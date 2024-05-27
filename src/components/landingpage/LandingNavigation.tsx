import { GpaGold } from "@/icons";
import { MobileDrawer } from "../custom/MobileDrawer";
import { Links } from "@/constants";
import { useMediaQuery } from "usehooks-ts";

type Navbar = {
  sticky?: boolean;
};

export default function LandingNavbar({ sticky }: Navbar) {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <div
      className={
        sticky
          ? "fixed top-0 left-0 w-screen z-50 flex justify-between py-7 px-8 bg-white dark:bg-black  shadow-md opacity-95"
          : "flex justify-between w-full text-white-base ml-7"
      }
    >
      <GpaGold />

      {isMobile ? (
        <div
          className={
            sticky ? "hover:bg-transparent" : "hover:bg-transparent pr-6"
          }
        >
          <MobileDrawer color={sticky ? "black" : "white"} />
        </div>
      ) : (
        <div className="flex space-x-6 items-center text-lg font-medium pr-6">
          {Links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={
                sticky
                  ? "text-[#927c4e] hover:text-black font-bold dark:text-white hover:dark:text-muted-foreground "
                  : "text-white-dark hover:text-white ease-in-out duration-150 font-bold"
              }
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
