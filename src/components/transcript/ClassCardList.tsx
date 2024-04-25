import { ScrollArea } from "../ui/scroll-area";
import ClassCard, { ClassCardProps } from "./ClassCard";

interface MailListProps {
  items: ClassCardProps[];
  completion: string; //Optional
}

export function ClassCardList({ items, completion }: MailListProps) {
  return (
    <ScrollArea className="h-[88vh] mb-1">
      <div className="md:flex flex-col gap-2 p-4 pt-3 grid grid-cols-2 gap-x-5">
        {items.map((item, i) => (
          <ClassCard key={i * 46} item={item} completion={completion} />
        ))}
      </div>
    </ScrollArea>
  );
}
