import { Link } from "react-router-dom";
import { ClassHistory, IntegrationPage } from "@/sections";
import { classes } from "@/constants";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HomeCarousel() {
  // Define an array of objects that includes the title, path, and image for each page
  const carouselPages = [
    {
      title: "Class History",
      path: "/transcript",
      cover: "build/assets/laptop-y9jG4vOU.jpg",
    },
    {
      title: "Profile",
      path: "src/pages/ProfilePage.tsx",
      cover: "build/assets/Feature1-m2UYgZsQ.jpg",
    },
    {
      title: "Settings",
      path: "src/pages/SettingsPage.tsx",
      cover: "build/assets/Feature3-urkufWuM.jpg",
    },
  ];

  return (
    <Carousel className="w-full h-full ">
      <CarouselContent>
        {carouselPages.map((page, index) => (
          <CarouselItem key={index} className="">
            {" "}
            {/* Adjust the height as needed */}
            <Link to={page.path} className="block h-full">
              {" "}
              {/* Use Link to navigate to the page */}
              <Card className="h-full">
                <CardContent
                  className="flex items-center justify-center bg-cover bg-center h-[15rem]"
                  style={{ backgroundImage: `url(${page.cover})` }}
                >
                  <span className="text-2xl font-semibold text-white">
                    {page.title}
                  </span>{" "}
                  {/* Adjust text size as needed */}
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-[2rem]" />
      <CarouselNext className="right-[2rem]" />
    </Carousel>
  );
}
