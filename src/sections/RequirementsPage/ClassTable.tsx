import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Split } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCourseStore, useUserStore } from "@/stores";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData extends { section: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  order: number;
  setActiveField: (field: number) => void;
  activeField: number;
  currentField: string;
  completedCourseIDs: string[];
}

export function ClassTable<TData extends { section: string }, TValue>({
  data,
  columns,
  order,
  setActiveField,
  activeField,
  completedCourseIDs,
}: DataTableProps<TData, TValue>) {
  const { fields } = useUserStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [checked, setChecked] = useState<string>(fields[activeField].name);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({
    title: true,
    credits: true,
    grade: true,
    term: true,
    year: true,
    field: false,
  });

  const { completedClassList } = useCourseStore();
  const activeFieldData = fields[activeField].requirements;

  // We have each title of the section requirements for the field
  const title: Set<string> = new Set();
  activeFieldData.forEach((req) => {
    title.add(req[0].section_title);
  });

  // For each title, we will find the number of credits needed to fill that specific requirement
  const title_credits = new Map<string, number>();

  activeFieldData.map((req, i) => {
    let credits = title_credits.get(req[0].section_title)
      ? title_credits.get(req[0].section_title)
      : 0;

    title_credits.set(req[0].section_title, credits! + req[0].credits_required);
  });

  // We have each section title, and the credits required for the sections
  const creditTitleArray = Array.from(title_credits).map(
    ([title, credits]) => ({
      title,
      credits,
    })
  );

  const requiredCredits = creditTitleArray.reduce((acc, curr) => {
    return acc + curr.credits;
  }, 0 as number);

  // Now, we find how many credits are left for each section, to display in the table
  let sectionCreditsRemaining = new Map<string, number>();

  Array.from(title).map((title) => {
    sectionCreditsRemaining.set(title, 0);
  });

  activeFieldData.map((req, i) => {
    req.map((section) => {
      section.courses.map((course) => {
        if (completedCourseIDs.includes(course.course_id)) {
          let credits = sectionCreditsRemaining.get(section.section_title);
          let findIndex = completedCourseIDs.indexOf(course.course_id);
          let creditsToAdd = Number(completedClassList[findIndex].credits);
          sectionCreditsRemaining.set(
            section.section_title,
            credits! + creditsToAdd
          );
        }
      });
    });
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    enableGlobalFilter: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 1000,
      },
    },
  });

  return (
    <div className="h-max pb-4">
      <div className="flex flex-col gap-4 items-center justify-between py-4 md:flex-col md:gap-2">
        <div className="flex">
          <h2 className="text-3xl font-semibold ml-3 mt-4 ">
            Current Field: {fields[activeField].name} - Required Credits:{" "}
            {requiredCredits}
          </h2>
        </div>

        {order === 0 && (
          <>
            <div className="flex justify-end gap-3 items-end md:mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="flex gap-3 text-gray-500 font-light"
                    variant="outline"
                    size="default"
                  >
                    Major
                    <Split className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white-light font-avenir">
                  <DropdownMenuLabel className="font-medium text-sm pt-1 pl-2">
                    Majors
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={checked}
                    onValueChange={setChecked}
                  >
                    {fields.map((f, i) => {
                      return (
                        <DropdownMenuRadioItem
                          key={i}
                          value={f.name}
                          onClick={() => {
                            setActiveField(i);
                          }}
                        >
                          {f.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Input
                placeholder="Filter Classes..."
                value={
                  (table.getColumn("title")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="min-w-[375px] md:min-w-[275px] focus-visible:ring-1 focus-visible:ring-black-light "
              />
            </div>
          </>
        )}
      </div>

      {creditTitleArray.map((title, i) => {
        return (
          <div className="flex flex-col gap-1">
            <div className="ml-3 font-semibold text-xl mt-4 mb-2">
              {title.title}
            </div>
            <Table className="max-h-[500px] overflow-clip" key={i}>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}

                    <TableHead className="">Required Credits</TableHead>
                    <TableHead className="">Credits Remaining</TableHead>
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody className="">
                {table.getRowModel().rows?.length ? (
                  table
                    .getRowModel()
                    .rows.filter(
                      (item) => item.original!.section == title.title
                    )
                    .map((row, j) => (
                      <>
                        {row.original!.section === title.title ? (
                          <>
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                              className="ease-in-out transition-all cursor-pointer duration-200 w-min border-b-0 hover:bg-transparent"
                            >
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}

                              {
                                // If the row is the first row of the section, display the credits required and credits remaining
                                j === 0 ? (
                                  <>
                                    <TableCell
                                      rowSpan={table.getRowModel().rows.length}
                                      className="text-center"
                                    >
                                      <b>{title.credits}</b>
                                    </TableCell>
                                    <TableCell
                                      rowSpan={table.getRowModel().rows.length}
                                      className="text-center hover:bg-transparent"
                                    >
                                      <b>
                                        {title.credits -
                                          sectionCreditsRemaining.get(
                                            title.title
                                          )!}
                                      </b>
                                    </TableCell>
                                  </>
                                ) : null
                              }
                            </TableRow>
                          </>
                        ) : null}
                      </>
                    ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        );
      })}

      {table.getPageCount() === 1 ? (
        <>
          <div className="flex justify-end items-center gap-2 mt-2 mb-4 text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center md:flex-col md:mt-4">
            <>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold">Classes per page</p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(table.getRowCount());
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top" className="bg-white-light">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>

            <div className="flex items-center justify-end space-x-2 py-4">
              <div
                className={`${
                  table.getPageCount() === 1 ? `self-end text-sm` : `text-sm`
                }`}
              >
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>

              <>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
