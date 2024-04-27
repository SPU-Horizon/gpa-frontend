import { ClassTable } from "@/sections/RequirementsPage/ClassTable";
import {
  ClassColumns,
  MockClassData,
  reqs,
} from "@/sections/RequirementsPage/Columns";
import { FieldsDisplay } from "@/sections/RequirementsPage/FieldsDisplay";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<{}>[] = [
  {
    header: "Class",
    accessorKey: "class",
  },
  {
    header: "Credits",
    accessorKey: "credits",
  },
];

const RequirementsPage = () => {
  // For each section title, we need a table

  const title: Set<string> = new Set();
  reqs.forEach((req) => {
    title.add(req[0].section_title);
  });

  const title_classes: {}[] = [];

  reqs.forEach((req) => {
    req[0].classes.forEach((class_) => {
      title_classes.push({
        section: req[0].section_title,
        class: class_,
        credits: req[0].credits_required,
      });
    });
  });

  // console.log(title_classes);

  return (
    <div className="px-10 h-full  mx-auto pt-4">
      <header className="flex gap-2 items-end">
        <h1 className="text-2xl font-bold mb-4 ">Major Fields</h1>
      </header>
      <FieldsDisplay />

      {Array.from(title).map((title, i) => (
        <div key={title}>
          <ClassTable
            order={i}
            columns={columns}
            data={title_classes.filter((c) => {
              return c.section === title;
            })}
            heading={title}
          />
        </div>
      ))}
    </div>
  );
};

export default RequirementsPage;
