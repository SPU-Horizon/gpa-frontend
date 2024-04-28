import { ClassTable } from "@/sections/RequirementsPage/ClassTable";
import {
  ClassColumns,
  MockClassData,
  reqs,
} from "@/sections/RequirementsPage/Columns";
import { FieldsDisplay } from "@/sections/RequirementsPage/FieldsDisplay";
import { ColumnDef } from "@tanstack/react-table";

const RequirementsPage = () => {
  // For each section title, we need a table

  // Get all the unique titles of each section of the requirements
  const title: Set<string> = new Set();
  reqs.forEach((req) => {
    title.add(req[0].section_title);
  });

  const title_classes: {
    section: string;
    code: string;
    credits: number;
    grade: string;
    status: string;
    title: string;
  }[] = [];

  // For each title, we will find the number of credits needed to fill that specific requirement
  const title_credits = new Map<string, number>();

  reqs.map((req, i) => {
    let credits = title_credits.get(req[0].section_title)
      ? title_credits.get(req[0].section_title)
      : 0;

    title_credits.set(req[0].section_title, credits! + req[0].credits_required);
  });

  const CreditTitleArray = Array.from(title_credits).map(
    ([title, credits]) => ({
      title,
      credits,
    })
  );

  // From those requirements,
  reqs.forEach((req) => {
    req[0].classes.forEach((class_, i) => {
      title_classes.push({
        section: req[0].section_title,
        code: class_,
        credits: req[0].credits_required,
        grade: "B-",
        status: "Complete",
        title: MockClassData[i].title,
      });
    });
  });

  return (
    <div className="px-10 h-full  mx-auto pt-4">
      <header className="flex gap-2 items-end">
        <h1 className="text-2xl font-bold mb-4 ">Major Fields</h1>
      </header>
      <FieldsDisplay />

      {Array.from(CreditTitleArray).map((ct, i) => (
        <div key={ct.title}>
          <ClassTable
            order={i}
            columns={ClassColumns as ColumnDef<{}, unknown>[]}
            data={title_classes.filter((c) => {
              return c.section === ct.title;
            })}
            heading={ct.title}
            requiredCredits={ct.credits}
            creditsRemaining={0}
          />
        </div>
      ))}
    </div>
  );
};

export default RequirementsPage;
