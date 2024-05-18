import {
  Line,
  LineChart,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Label,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCourseStore, useUserStore } from "@/stores";

function MajorProgressGraph() {
  const { completedClassList } = useCourseStore();
  const { fields } = useUserStore();

  console.log(completedClassList);

  const sortCourses = (a, b) => {
    if (a.year > b.year) {
      return 1;
    } else if (a.year < b.year) {
      return -1;
    } else {
      if (a.quarter === b.quarter) {
        return 0;
      } else if (a.quarter === "winter") {
        return -1;
      } else if (
        (a.quarter === "spring" && b.quarter === "autumn") ||
        b.quarter === "summer"
      ) {
        return -1;
      } else if (a.quarter === "summer" && b.quarter === "autums") {
        return -1;
      } else {
        return 1;
      }
    }
  };

  let sortedCompletedClassList = completedClassList.sort(sortCourses);

  // Creating a Map of all possible quarters, and they will contain an array, with credits completed for each major requirement at that time, referenced by index
  const QuarterMap = new Map();

  sortedCompletedClassList.forEach((course) => {
    const quarter = course.quarter;
    const year = course.year;

    const quarterString = `${quarter} ${year}`;

    QuarterMap.set(quarterString, []);
  });

  // console.log(QuarterMap);

  // Initialize each major to have a value of 0 for each quarter
  fields.forEach((field, i) => {
    QuarterMap.forEach((value, key) => {
      QuarterMap.set(key, [...value, 0]);
    });
  });

  let requiredIDs = [];
  fields.forEach((field, i) => {
    requiredIDs.push(
      field.requirements.map((req) =>
        req.map((obj) =>
          obj.courses.map((course) => {
            return course.course_id;
          })
        )
      )
    );

    const flattenedIDs = requiredIDs[i].flat(3);

    completedClassList.forEach((course) => {
      const quarter = course.quarter;
      const year = course.year;

      const quarterString = `${quarter} ${year}`;

      if (flattenedIDs.includes(course.course_id)) {
        QuarterMap.get(quarterString)[i] += Number(course.credits);
      }
    });
  });

  let graphData: any = [];
  Array.from(QuarterMap.keys()).forEach((key) => {
    graphData.push({
      name: key,
      creditsAccumulated: QuarterMap.get(key),
    });
  });

  console.log(graphData);

  for (let i = 1; i < graphData.length; i++) {
    for (let j = 0; j < graphData[i].creditsAccumulated.length; j++) {
      graphData[i].creditsAccumulated[j] +=
        graphData[i - 1].creditsAccumulated[j];
    }
  }
  // I need to calculate the progress on the major requirements, basically see how each class taken is fulfilling the major requirements
  // I will have a line for each major requirement
  // The data object will consist of the X axis being quarters, and the y axis being number of credits completed at that time in each major requirement

  // I can keep an array of credits, each index being a consecutive quarter and accumulating the credits taken in that quarter and the previous ones
  // for each major requirement

  // Make a Map of all possible quarters, and for each quarter, make an array with the credits completed for each major requirement

  let data: any = [];

  graphData.map((item, i) => {
    data.push({
      name: `Q${i + 1}`,
      QuarterTitle: item.name[0].toUpperCase() + item.name.slice(1),
    });
  });

  graphData.map((item, i) => {
    item.creditsAccumulated.map((val, j) => {
      data[i][`Q${j + 1}Val`] = val;
    });
  });

  return (
    <div className="w-full  md:row-start-2 col-span-2 lg:mb-4">
      <Card className="w-full h-full shadow-md ">
        <CardHeader>
          <CardTitle>Progress on Majors</CardTitle>
          <CardDescription>
            Let's see how you're doing on your major requirements
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center items-center mr-4 xl:pb-0 lg:pb-6">
          {completedClassList.length ? (
            <div className=" h-[350px] xl:h-[400px] w-full ">
              <ResponsiveContainer width="95%" height="100%">
                <LineChart data={data}>
                  <YAxis className="font-avenir">
                    <Label
                      value="Total Credits"
                      offset={15}
                      angle={-90}
                      position={"insideLeft"}
                      className="font-bold w-[200px]"
                    />
                  </YAxis>
                  <XAxis dataKey="name">
                    <Label
                      value="Quarters"
                      position={"insideBottom"}
                      offset={5}
                      className="font-bold"
                    />
                  </XAxis>

                  {fields.map((f, i) => {
                    return (
                      <Line
                        key={i}
                        dataKey={`Q${i + 1}Val`}
                        strokeWidth={2.1}
                        type="monotone"
                        style={{
                          stroke: "#927c4e",
                          opacity: `${1 - i * 0.2}`,
                        }}
                      />
                    );
                  })}
                  <Tooltip
                    position={{ x: 100, y: 0 }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="flex flex-col">
                              <span className="font-bold text-muted-foreground">
                                Quarter
                              </span>
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                {payload[0].payload.QuarterTitle}
                              </span>
                            </div>

                            <span className="font-bold text-muted-foreground">
                              {" "}
                              Credits Completed
                            </span>

                            {payload.map((load, i) => {
                              return (
                                <div key={i} className="flex flex-col ">
                                  <div className="flex gap-3">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      {fields[i].name}
                                    </span>
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      <b>{load.value}</b>
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div>
                <CardHeader className="font-bold text-center">
                  No Progress to Display, visit the BannerSync Page and Upload
                  your progress to see a visualization.
                </CardHeader>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default MajorProgressGraph;
