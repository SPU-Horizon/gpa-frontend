// Footer.tsx
import { useThemeStore } from "@/stores";

import { Button } from "@/components/ui/button";

function Footer() {
  const { setTheme, theme } = useThemeStore();
  return (
    <div className="col-span-3 row-start-6 ">
      <footer className="flex justify-between p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-black-base">
        <div>
          <p>&copy; GPA 2024</p>
          <p>Privacy Policy</p>
        </div>

        <div className=" flex flex-col text-center justify-center items-center">
          <h3 className="font-bold">Theme</h3>
          <Button
            className=""
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {" "}
            Change Theme
          </Button>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
