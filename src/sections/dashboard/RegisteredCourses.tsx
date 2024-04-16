import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCourseStore } from "@/stores";
import Link from "next/link";

export default function MyRegisteredList() {
  let { registeredClassList } = useCourseStore();

  return (
    <Card className="col-span-2 md:col-span-2 xl:col-span-full">
      <CardHeader className="px-7 mb-2 flex flex-row justify-between items-center">
        <div>
          <CardTitle>My Courses</CardTitle>
          <CardDescription> Current enrollments this quarter</CardDescription>
        </div>
        <div>
          <Button variant="default">
            <Link href="/dashboard/transcript">View All</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead className=" table-cell">Type</TableHead>
              <TableHead className=" table-cell">Status</TableHead>
              <TableHead className=" text-right">Credits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registeredClassList.map((course: any, i) => (
              <TableRow key={i} className="bg-accent">
                <TableCell>
                  <div className="font-medium">{course.course_id}</div>
                  <div className="text-sm text-muted-foreground md:inline">
                    {course.name}
                  </div>
                </TableCell>
                <TableCell className=" table-cell">
                  {course.attributes}
                </TableCell>
                <TableCell className=" table-cell">
                  <Badge className="text-xs" variant="secondary">
                    In Progress
                  </Badge>
                </TableCell>

                <TableCell className="text-right">{course.credits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
