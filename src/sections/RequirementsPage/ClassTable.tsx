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
import { useUserStore } from "@/stores";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  heading: string;
  order: number;
  requiredCredits?: number;
  creditsRemaining?: number;
}

export function ClassTable<TData, TValue>({
  columns,
  data,
  heading,
  order,
  requiredCredits,
  creditsRemaining,
}: DataTableProps<TData, TValue>) {
  const { fields } = useUserStore();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [checked, setChecked] = useState<string>("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({
    title: true,
    credits: true,
    grade: true,
    term: true,
    year: true,
    field: false,
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
  });

  return (
    <div className="h-max pb-4">
      <div className="flex items-center justify-between py-4 md:flex-col md:gap-2">
        <div className="flex">
          <h2 className="text-2xl font-semibold">
            {heading} - Required Credits: {requiredCredits}
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
                            table.setGlobalFilter(f.name);
                          }}
                        >
                          {f.name}
                        </DropdownMenuRadioItem>
                      );
                    })}
                    <DropdownMenuRadioItem
                      value="Reset"
                      onClick={() => {
                        table.setGlobalFilter("");
                        setChecked("");
                      }}
                    >
                      All Fields
                    </DropdownMenuRadioItem>
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
      <Table className="max-h-[500px] overflow-clip">
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
              <TableHead className=""> Credits Remaining</TableHead>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="ease-in-out transition-all cursor-pointer duration-200 w-min border-b-0 hover:bg-transparent"
                onClick={() => {
                  console.log(row.original);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* {console.log(cell.column.columnDef.header, cell.getValue())} */}
                  </TableCell>
                ))}

                {i === 0 ? (
                  <>
                    <TableCell
                      rowSpan={table.getRowModel().rows.length}
                      className="text-center"
                    >
                      <b>{requiredCredits}</b>
                    </TableCell>
                    <TableCell
                      rowSpan={table.getRowModel().rows.length}
                      className="text-center hover:bg-transparent"
                    >
                      <b>{creditsRemaining}</b>
                    </TableCell>
                  </>
                ) : null}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
                    table.setPageSize(Number(value));
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
