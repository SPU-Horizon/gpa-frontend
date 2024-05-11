import { ClassTable } from "@/sections/RequirementsPage/ClassTable";
import {
  ClassColumns,
  MockClassData,
  reqs,
} from "@/sections/RequirementsPage/Columns";
import { FieldsDisplay } from "@/sections/RequirementsPage/FieldsDisplay";
import { ColumnDef } from "@tanstack/react-table";
import { useCourseStore, useUserStore } from "@/stores";
import { useState } from "react";

const RequirementsPage = () => {
  // For each section title, we need a table
  const [activeField, setActiveField] = useState(0);

  let { fields } = useUserStore();
  const { inProgressClassList, completedClassList } = useCourseStore();

  let inProgressIDs = inProgressClassList.map((class_) => class_.course_id);
  let completedIDs = completedClassList.map((class_) => class_.course_id);

  let field = fields[activeField].requirements;

  // Get all the unique titles of each section of the requirements
  const title: Set<string> = new Set();
  field.forEach((req) => {
    title.add(req[0].section_title);
  });

  const title_classes: {
    section: string;
    code: string;
    credits: number | string;
    grade: string;
    status: string;
    title: string;
  }[] = [];

  // change classes to courses
  // From those requirements,

  console.log(field);

  field.forEach((req, i) => {
    req.forEach((set, i) => {
      set.courses?.forEach((class_) => {
        title_classes.push({
          section: set.section_title,
          code: class_.course_id,
          credits: class_.credits ? class_.credits : "N/A",
          grade: completedIDs.includes(class_.course_id)
            ? completedClassList[completedIDs.indexOf(class_.course_id)].grade
            : "N/A",
          status: inProgressIDs.includes(class_.course_id)
            ? "In Progress"
            : completedIDs.includes(class_.course_id)
            ? "Complete"
            : "Remaining",
          title: class_.name,
        });
      });
    });
  });

  // field.forEach((req, i) => {
  //   req[0].courses?.forEach((class_) => {
  //     title_classes.push({
  //       section: req[0].section_title,
  //       code: class_.course_id,
  //       credits: class_.credits ? class_.credits : "N/A",
  //       grade: completedIDs.includes(class_.course_id)
  //         ? completedClassList[completedIDs.indexOf(class_.course_id)].grade
  //         : "N/A",
  //       status: inProgressIDs.includes(class_.course_id)
  //         ? "In Progress"
  //         : completedIDs.includes(class_.course_id)
  //         ? "Complete"
  //         : "Remaining",
  //       title: class_.name,
  //     });
  //   });
  // });

  return (
    <div className="px-10 h-full  mx-auto pt-4">
      <header className="flex gap-2 items-end">
        <h1 className="text-2xl font-bold mb-4 ">Major Fields</h1>
      </header>
      <FieldsDisplay />

      <div key={1}>
        <ClassTable
          order={0}
          columns={ClassColumns as ColumnDef<{ section: string }, unknown>[]}
          data={title_classes}
          setActiveField={setActiveField}
          activeField={activeField}
          currentField=""
          completedCourseIDs={completedIDs}
        />
      </div>
    </div>
  );
};

export default RequirementsPage;
