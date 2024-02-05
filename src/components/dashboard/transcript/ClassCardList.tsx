import { Class } from "../../../constants/CardData";

import { ScrollArea } from "../../ui/scroll-area";
import ClassCard from "./ClassCard";

interface MailListProps {
  items: Class[];
  displayStyle?: string; //Optional
}

export function ClassCardList({ items, displayStyle }: MailListProps) {
  return (
<<<<<<< HEAD
    <ScrollArea className="h-[88vh] mb-1">
      <div className="md:flex flex-col gap-2 p-4 pt-0 grid grid-cols-2">
=======
    <ScrollArea className="h-[88vh] mb-1 ">
      <div className="flex flex-col gap-2 p-4 pt-0 ">
>>>>>>> 6cd8677 (Integration Steps.)
        {items.map((item, i) => (
          <ClassCard key={i * 46} item={item} />
        ))}
      </div>
    </ScrollArea>
  );
}
