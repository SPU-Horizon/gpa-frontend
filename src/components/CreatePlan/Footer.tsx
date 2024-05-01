import { useThemeStore } from "@/stores";
import { SunMoon } from "lucide-react";
import {ActionIcon} from "@mantine/core";

export default function Footer() {
  const { setTheme, theme } = useThemeStore();

  return (
    <div className="col-span-3 row-start-6 ">
      <footer className="flex justify-between p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-black-base">
        <div>
          <p>&copy; GPA 2024</p>
          <p>Privacy Policy</p>
        </div>

        <div className="flex flex-col text-center justify-center items-center">
          <ActionIcon
            className="dark:bg-black-light dark:text-white-base bg-white text-black-base shadow-md transition-all ease-in-out duration-200"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <SunMoon />
          </ActionIcon>
        </div>
      </footer>
    </div>
  );
}