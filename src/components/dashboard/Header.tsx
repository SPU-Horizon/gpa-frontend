import {
  BannerIntegration,
  GoogleIcon,
  GpaGold,
  ModernUX,
  VisualizeIcon,
} from "@/icons";
import { useCourseStore, useUserStore } from "@/stores";

type HeaderProps = {
  title: string;
  name?: boolean;
  Gpa?: boolean;
  Logo?: boolean;
};

export default function Header({ title, name, Gpa, Logo }: HeaderProps) {
  const { firstName, lastName } = useUserStore();
  const { gpa } = useCourseStore();

  return (
    <header className="p-[.88rem] flex justify-between items-center">
      <h1 className="text-xl font-semibold">{title}</h1>
      {name && (
        <div className="text-xl font-semibold">
          {firstName || "User"} {lastName || ""}
        </div>
      )}
      {Gpa && <div className="text-xl font-semibold">GPA: {gpa}</div>}
      {Logo && <></>}
    </header>
  );
}
