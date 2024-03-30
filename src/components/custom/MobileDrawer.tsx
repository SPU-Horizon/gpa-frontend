import { Button } from "@mantine/core";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuMenu } from "react-icons/lu";
import { Links } from "@/constants";

type DrawerProps = {
  color?: string;
};

export function MobileDrawer({ color }: DrawerProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="hover:bg-transparent bg-transparent">
          <LuMenu size={"2.5em"} color={color} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black-base border-0 font-avenir text-white-light">
        <SheetHeader>
          <SheetTitle className="text-3xl dark:text-white-light text-white-light">
            Menu
          </SheetTitle>
          <SheetDescription className="mt-5 text-white-light">
            - Let's Navigate -
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-10 items-center mt-8">
          {Links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white-dark hover:text-white-light ease-in-out duration-150 font-bold text-3xl"
            >
              {link.name}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
