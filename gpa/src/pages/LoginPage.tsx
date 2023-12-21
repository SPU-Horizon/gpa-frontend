import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/custom/AuthenticationForm";
import { SeattleLanding } from "@/images";

export default function AuthenticationPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {!isMobile ? (
        <div className="grid grid-cols-2 my-12 mx-auto h-[750px] max-w-screen-xl pl-7">
          <div className="relative flex flex-col overflow-hidden ">
            <img
              className="absolute h-full w-full object-cover object-center "
              loading="lazy"
              srcSet={SeattleLanding}
            />
          </div>
          <div className="flex justify-center items-center grow flex-col gap-6 relative">
            <a
              href="/signin"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "absolute right-16 top-8 md:right-8 md:top-8 hover:bg-gold-light"
              )}
            >
              Login
            </a>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground ">
                Enter your email below to sign in - Or Create an Account
              </p>
            </div>
            <UserAuthForm className=" w-4/5" isMobile={isMobile} />
          </div>
        </div>
      ) : (
        <div className="max-w-screen-xl relative">
          <a
            href="/signin"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "absolute right-16 top-8 md:right-8 md:top-8 z-10 text-gray-100 bg-white-base hover:bg-gold-light hover:text-white-base border-0"
            )}
          >
            Login
          </a>
          <div className="relative flex flex-col overflow-hidden h-screen justify-center ">
            <img
              className="absolute h-full w-full object-cover object-center "
              loading="lazy"
              srcSet={SeattleLanding}
            />
            <div className="flex justify-center items-center flex-col gap-6 relative">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Sign In to GPA
                </h1>
                <p className="text-sm text-muted-foreground ">
                  Enter your email below to sign in - Or Create an Account
                </p>
              </div>
              <UserAuthForm className=" w-4/5" isMobile={isMobile} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
