import { ClassTable } from "@/sections/RequirementsPage/ClassTable";
import {
  ClassColumns,
  MockClassData,
} from "@/sections/RequirementsPage/Columns";
import { FieldsDisplay } from "@/sections/RequirementsPage/FieldsDisplay";

const RequirementsPage = () => {
  return (
    <div className="px-10 h-full  mx-auto pt-4">
      <header className="flex gap-2 items-end">
        <h1 className="text-2xl font-bold mb-4 ">Major Fields</h1>
      </header>
      <FieldsDisplay />
      <ClassTable columns={ClassColumns} data={MockClassData} />
    </div>
  );
};

export default RequirementsPage;
