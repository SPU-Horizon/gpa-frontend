import * as React from "react";
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
    { title: "Class History", path: "/transcript", cover: "build/assets/laptop-y9jG4vOU.jpg" },
    { title: "Profile", path: "src/pages/ProfilePage.tsx", cover: "build/assets/Feature1-m2UYgZsQ.jpg" },
    { title: "Settings", path: "src/pages/SettingsPage.tsx", cover: "build/assets/Feature3-urkufWuM.jpg" },
  ];

  return (
    <Carousel className="w-full max-w-3xl"> 
      <CarouselContent>
        {carouselPages.map((page, index) => (
          <CarouselItem key={index} className="h-64"> {/* Adjust the height as needed */}
            <Link to={page.path} className="block h-full"> {/* Use Link to navigate to the page */}
              <Card className="h-full">
                <CardContent className="h-full flex items-center justify-center p-6 bg-cover bg-center" style={{ backgroundImage: `url(${page.cover})` }}>
                  <span className="text-2xl font-semibold text-white">{page.title}</span> {/* Adjust text size as needed */}
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}