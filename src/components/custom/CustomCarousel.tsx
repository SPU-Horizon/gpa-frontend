import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CustomCarouselProps = {
  className?: string;
  content: { photo: string }[];
};

export function CustomCarousel({ className, content }: CustomCarouselProps) {
  return (
    <Carousel className="w-full max-w-full">
      <CarouselContent>
        {content.map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2] sm:h-full"
                src={_.photo}
                alt="Image Description"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-[90%] left-[2rem] w-[2.5rem] h-[2.5rem] bg-white dark:bg-black" />
      <CarouselNext className="top-[90%] right-[2rem] w-[2.5rem] h-[2.5rem] bg-white dark:bg-black" />
    </Carousel>
  );
}

export default CustomCarousel;
