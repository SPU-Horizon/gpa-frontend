import { Class } from "../../../constants/CardData";

import { ScrollArea } from "../../ui/scroll-area";
import ClassCard from "./ClassCard";

interface MailListProps {
  items: Class[];
}

export function ClassCardList({ items }: MailListProps) {
  return (
    <ScrollArea className="h-[88vh]">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item, i) => (
          <ClassCard key={i * 46} item={item} />
        ))}
      </div>
    </ScrollArea>
  );
}
