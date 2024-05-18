import { useCourseStore, useUserStore } from "@/stores";

type HeaderProps = {
  title: string;
  name?: boolean;
  Gpa?: boolean;
};

export default function Header({ title, name, Gpa }: HeaderProps) {
  const { firstName, lastName } = useUserStore();
  const { gpa } = useCourseStore();

  return (
    <header className="bg-white dark:bg-black-base p-[.88rem] flex justify-between items-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      {name && (
        <div className="text-xl font-semibold">
          {firstName || "User"} {lastName || ""}
        </div>
      )}
      {Gpa && <div className="text-xl font-semibold">GPA: {gpa}</div>}
    </header>
  );
}
