import { ClassTable } from "@/sections/RequirementsPage/ClassTable";
import { ClassColumns } from "@/sections/RequirementsPage/Columns";
import { FieldsDisplay } from "@/sections/RequirementsPage/FieldsDisplay";
import { ColumnDef } from "@tanstack/react-table";
import { useCourseStore, useUserStore } from "@/stores";
import { useState } from "react";
import { Loader } from "@mantine/core";
import { StandardHeader } from "@/components/dashboard";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const RequirementsPage = () => {
  // For each section title, we need a table

  let { fields, activeField, setActiveField } = useUserStore();
  const { inProgressClassList, completedClassList } = useCourseStore();

  const [isLoading, setLoading] = useState(false);

  let inProgressIDs = inProgressClassList.map((class_) => class_.course_id);
  let completedIDs = completedClassList.map((class_) => class_.course_id);

  if (fields.length > 0) {
    let field = fields[activeField].requirements;

    // Get all the unique titles of each section of the requirements
    const title: Set<string> = new Set();
    field.forEach((req) => {
      if (req.length > 1) {
        req.forEach((section, i) => {
          if (!section.section_title.includes("Option")) {
            section.section_title =
              section.section_title + " (Option " + (i + 1) + ")";
            title.add(section.section_title);
          }
        });
      } else if (req[0].courses.length === 0) {
      } else {
        if (req[0].section_title.includes("*")) {
          req[0].section_title = req[0].section_title.replace(/\*+/g, " ");
        }
        title.add(req[0].section_title);
      }
    });

    console.log(title, "title");

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

    return (
      <div className="h-screen flex flex-col">
        <StandardHeader title="Major Fields" />
        <Separator />

        <ScrollArea>
          <div className="mx-auto px-10 py-4">
            <FieldsDisplay setIsLoading={setLoading} />

            {isLoading ? (
              <ClassTable
                order={0}
                columns={
                  ClassColumns as ColumnDef<{ section: string }, unknown>[]
                }
                data={title_classes}
                setActiveField={setActiveField}
                activeField={activeField}
                currentField=""
                completedCourseIDs={completedIDs}
              />
            ) : (
              <div key={1}>
                <ClassTable
                  order={0}
                  columns={
                    ClassColumns as ColumnDef<{ section: string }, unknown>[]
                  }
                  data={title_classes}
                  setActiveField={setActiveField}
                  activeField={activeField}
                  currentField=""
                  completedCourseIDs={completedIDs}
                />
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  } else {
    return (
      <div className="px-10 h-full  mx-auto pt-4">
        <header className="flex gap-2 items-end">
          <h1 className="text-2xl font-bold mb-4 ">Major Fields</h1>
        </header>
        <FieldsDisplay />
      </div>
    );
  }
};

export default RequirementsPage;
