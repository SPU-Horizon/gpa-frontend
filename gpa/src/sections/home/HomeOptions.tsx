import React from "react";
import MenuOption from "@/components/dashboard/home/MenuOption";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { listenNowAlbums } from "@/constants/MenuOptions";

export default function HomeOptions() {
  return (
    <div className="">
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {listenNowAlbums.map((Classes) => (
              <MenuOption
                key={Classes.name}
                option={Classes}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
