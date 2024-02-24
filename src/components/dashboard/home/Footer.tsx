// Footer.tsx
import { useThemeStore } from "@/stores";
import { SunMoon } from  "lucide-react";
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

function Footer() {
  const { setTheme, theme } = useThemeStore();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  return (
    <div className="col-span-3 row-start-6 ">
      <footer className="flex justify-between p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-black-base">
        <div>
          <p>&copy; GPA 2024</p>
          <p>Privacy Policy</p>
        </div>

        <div className=" flex flex-col text-center justify-center items-center">
          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <SunMoon  />
          </ActionIcon>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
