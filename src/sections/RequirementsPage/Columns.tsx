import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export type Classes = {
  code: string;
  title: string;
  status: "Complete" | "In Progress" | "Remaining";
  grade: string;
  credits: number;
  field: string;
};

export const ClassColumns: ColumnDef<Classes>[] = [
  {
    accessorKey: "title",
    header: "Course Name",
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="  h-max py-0 px-0  focus-visible:ring-0 focus-visible:ring-transparent bg-transparent hover:bg-transparent flex justify-between gap-3"
            >
              <>Course Code</>
              <ChevronsUpDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="bg-white-light mt-2">
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(true);
              }}
            >
              Desc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                column.clearSorting();
              }}
            >
              Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-max py-0 px-0  focus-visible:ring-0 focus-visible:ring-transparent bg-transparent hover:bg-transparent flex justify-between gap-3"
              >
                <>Status</>
                <ChevronsUpDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="bg-white-light mt-2">
              <DropdownMenuLabel>Sort</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  column.setFilterValue("Complete");
                }}
                className="focus:bg-transparent justify-center"
              >
                <Badge className="bg-green-600 hover:bg-green-400">
                  Complete
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-transparent justify-center"
                onClick={() => {
                  column.setFilterValue("In Progress");
                }}
              >
                <Badge className="bg-yellow-600 hover:bg-yellow-400">
                  In Progress
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-transparent justify-center"
                onClick={() => {
                  column.setFilterValue("Remaining");
                }}
              >
                <Badge className="bg-red-500 hover:bg-red-400">Remaining</Badge>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  column.setFilterValue(undefined);
                }}
                className="focus:bg-transparent justify-center"
              >
                <Badge className="bg-gray-800 hover:bg-gray-400 ">Reset</Badge>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
    cell: ({ row }) => {
      return (
        // This is where we use the Badge component
        <div className="text-sm text-center flex justify-start items-center">
          {row.original.status === "Complete" ? (
            <Badge className="bg-green-600">Complete</Badge>
          ) : row.original.status === "In Progress" ? (
            <Badge className="bg-yellow-600">In Progress</Badge>
          ) : (
            <Badge className="bg-red-500">Remaining</Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "grade",
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="  h-max py-0 px-0  focus-visible:ring-0 focus-visible:ring-transparent bg-transparent hover:bg-transparent flex justify-between gap-3"
            >
              Grade
              <ChevronsUpDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" className="bg-white-light mt-2">
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            >
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                column.toggleSorting(true);
              }}
            >
              Desc
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                column.clearSorting();
              }}
            >
              Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    sortingFn: (rowA, rowB, column) => {
      const order = [
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "F",
        "N/A",
        "E",
      ];

      return (
        order.indexOf(rowA.original.grade) - order.indexOf(rowB.original.grade)
      );
    },
  },
  {
    accessorKey: "credits",
    header: "Credits",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white-light">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger>
                <DropdownMenuItem>View Details</DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem>Update Course Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="bg-white-light h-[400px] w-[400px] rounded-md">
            <div className="flex flex-col gap-4 p-4">
              <h1 className="text-xl font-semibold">{row.original.title}</h1>
              <p className="text-sm font-normal">
                Course Code: {row.original.code}
              </p>
              <p className="text-sm font-normal">
                Status: {row.original.status}
              </p>
              <p className="text-sm font-normal">Grade: {row.original.grade}</p>
              <p className="text-sm font-normal">
                Credits: {row.original.credits}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "field",
    header: "Field",
  },
];

export const MockClassData: Classes[] = [
  {
    code: "CSC 101",
    status: "Complete",
    title: "Intro to Computer Science",
    grade: "A",
    credits: 3,
    field: "Computer Science (BA)",
  },
  {
    code: "UCOR 3100",
    status: "In Progress",
    title: "Ethics",
    grade: "B",
    credits: 4,
    field: "Computer Science (BA)",
  },
  {
    code: "CSC 201",
    status: "Remaining",
    title: "Data Structures",
    grade: "N/A",
    credits: 4,
    field: "Computer Science (BA)",
  },
  {
    code: "MATH 101",
    status: "Complete",
    title: "Calculus",
    grade: "A-",
    credits: 4,
    field: "Computer Science (BA)",
  },
  {
    code: "ENG 200",
    status: "In Progress",
    title: "English Literature",
    grade: "C+",
    credits: 3,
    field: "Computer Science (BA)",
  },
  {
    code: "PHYS 202",
    status: "Remaining",
    title: "Physics II",
    grade: "N/A",
    credits: 4,
    field: "Computer Science (BA)",
  },
  {
    code: "CHEM 101",
    status: "Complete",
    title: "Chemistry",
    grade: "A",
    credits: 3,
    field: "Biology",
  },
  {
    code: "BIO 200",
    status: "In Progress",
    title: "Biology",
    grade: "B-",
    credits: 4,
    field: "Biology",
  },
  {
    code: "HIST 101",
    status: "Remaining",
    title: "World History",
    grade: "N/A",
    credits: 3,
    field: "Biology",
  },
  {
    code: "ART 201",
    status: "Complete",
    title: "Art History",
    grade: "A+",
    credits: 3,
    field: "Biology",
  },
  {
    code: "PSYCH 101",
    status: "In Progress",
    title: "Psychology",
    grade: "B+",
    credits: 3,
    field: "Biology",
  },
  {
    code: "SOC 200",
    status: "Remaining",
    title: "Sociology",
    grade: "N/A",
    credits: 3,
    field: "Biology",
  },
  {
    code: "PHIL 101",
    status: "Complete",
    title: "Philosophy",
    grade: "A-",
    credits: 3,
    field: "Biology",
  },
  {
    code: "MUS 200",
    status: "In Progress",
    title: "Music",
    grade: "B",
    credits: 3,
    field: "Biology",
  },
  {
    code: "SPAN 101",
    status: "Remaining",
    title: "Spanish",
    grade: "N/A",
    credits: 4,
    field: "Biology",
  },
  {
    code: "GEOG 201",
    status: "Complete",
    title: "Geography",
    grade: "A",
    credits: 3,
    field: "Biology",
  },
  {
    code: "ECON 101",
    status: "In Progress",
    title: "Economics",
    grade: "B-",
    credits: 3,
    field: "Biology",
  },
  {
    code: "POLI 200",
    status: "Remaining",
    title: "Political Science",
    grade: "N/A",
    credits: 3,
    field: "Biology",
  },
  {
    code: "ANTH 101",
    status: "Complete",
    title: "Anthropology",
    grade: "A-",
    credits: 3,
    field: "Biology",
  },
  {
    code: "PHIL 200",
    status: "In Progress",
    title: "Ethics",
    grade: "B+",
    credits: 3,
    field: "Biology",
  },
  {
    code: "MATH 201",
    status: "Complete",
    title: "Linear Algebra",
    grade: "C",
    credits: 4,
    field: "Computer Science",
  },
  {
    code: "CHEM 201",
    status: "Complete",
    title: "Organic Chemistry",
    grade: "A+",
    credits: 4,
    field: "Biology",
  },
];

export const reqs = [
  [
    {
      classes: ["CSC 1230"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [
    {
      classes: ["CSC 2430"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [
    {
      classes: ["CSC 2431"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [
    {
      classes: ["CSC 3011"],
      section_title: "General Core",
      credits_required: 3,
    },
  ],
  [
    {
      classes: ["CSC 3150"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [
    {
      classes: ["CSC 3220"],
      section_title: "General Core",
      credits_required: 4,
    },
  ],
  [
    {
      classes: ["CSC 3221"],
      section_title: "General Core",
      credits_required: 4,
    },
  ],
  [
    {
      classes: ["CSC 3310"],
      section_title: "General Core",
      credits_required: 4,
    },
  ],
  [
    {
      classes: ["CSC 3350"],
      section_title: "General Core",
      credits_required: 3,
    },
  ],
  [
    {
      classes: ["CSC 3430"],
      section_title: "General Core",
      credits_required: 4,
    },
  ],
  [
    {
      classes: ["CSC 3750"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [
    {
      classes: ["CSC 4410"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [
    {
      classes: ["CSC 4898"],
      section_title: "General Core",
      credits_required: 2,
    },
  ],
  [
    {
      classes: ["MAT 1221"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [
    {
      classes: ["MAT 1720"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [
    {
      classes: ["MAT 2360"],
      section_title: "General Core",
      credits_required: 5,
    },
  ],
  [{ classes: [], section_title: "General Core", credits_required: 0 }],
  [
    {
      classes: [
        "CSC 4210",
        "CSC 4220",
        "CSC 4250",
        "CSC 4310",
        "CSC 4350",
        "CSC 4430",
        "CSC 4750",
        "CSC 4760",
        "CSC 4800",
        "CSC UDEL",
      ],
      section_title: "Technical Electives (Select one of the following)",
      credits_required: 3,
    },
  ],
  [
    {
      classes: [],
      section_title: "Technical Electives (Select one of the following)",
      credits_required: 0,
    },
  ],
  [
    {
      classes: ["CSC 3000", "CSC 4151", "CSC 4152", "CSC 4941"],
      section_title: "Project & Internship",
      credits_required: 8,
    },
  ],
  [{ classes: [], section_title: "Project & Internship", credits_required: 0 }],
];
