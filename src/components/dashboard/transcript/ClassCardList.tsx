import { Class } from "../../../constants/CardData";

import { ScrollArea } from "../../ui/scroll-area";
import ClassCard from "./ClassCard";
import { ClassCardProps } from "./ClassCard";

interface MailListProps {
  items: ClassCardProps["item"][];
  displayStyle?: string; //Optional
}

export function ClassCardList({ items }: MailListProps) {
  return (
    <ScrollArea className="h-[88vh] mb-1">
      <div className="md:flex flex-col gap-2 p-4 pt-0 grid grid-cols-2">
        {items.map((item, i) => (
          <ClassCard key={i * 46} item={item} />
        ))}
      </div>
    </ScrollArea>
  );
}
