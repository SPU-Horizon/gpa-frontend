import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LuMenu } from "react-icons/lu";

export function MobileDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <LuMenu size={"2.5em"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-black-light border-0 font-avenir text-white-light">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="mt-5">
            - Let's Navigate -
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-10 items-center mt-8">
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
      </SheetContent>
    </Sheet>
  );
}
