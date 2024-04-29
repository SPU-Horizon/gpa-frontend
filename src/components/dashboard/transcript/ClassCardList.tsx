import { ScrollArea } from "../../ui/scroll-area";
import ClassCard, { ClassCardProps } from "./ClassCard";

interface MailListProps {
  items: ClassCardProps[];
  completion: string; //Optional
}

export function ClassCardList({ items, completion }: MailListProps) {
  return (

    <div className="md:flex flex-col gap-2 px-1 pt-3 grid grid-cols-2 gap-x-5 mb-8 ">
      {items.map((item, i) => (
        <ClassCard key={i * 46} item={item} completion={completion} />
      ))}
    </div>

  );
}
