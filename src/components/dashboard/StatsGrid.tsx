import { ArrowUpRight } from "lucide-react";
import { Group, Paper, RingProgress, SimpleGrid, Text } from "@mantine/core";
import { useCourseStore, useUserStore } from "@/stores";
import classes from "@/lib/modules/StatsGrid.module.css";

interface Course {
  course_id: string;
  name: string;
  credits: string; // or number, depending on your actual data structure
}

const icons = {
  user: ArrowUpRight,
  discount: ArrowUpRight,
  receipt: ArrowUpRight,
  coin: ArrowUpRight,
};

export function StatsGrid() {
  const { completedClassList, inProgressClassList } = useCourseStore();
  const { fields } = useUserStore();

  const totalCreditsRequired = 180;

  let completedCredits = completedClassList.reduce((total, course: Course) => {
    course.credits = course.credits || "0";
    return total + parseFloat(course.credits);
  }, 0);

  let inProgressCredits = inProgressClassList.reduce(
    (total, course: Course) => {
      course.credits = course.credits || "0";
      return total + parseFloat(course.credits);
    },
    0
  );

  const completionPercentage = Math.ceil(
    (completedCredits / totalCreditsRequired) * 100
  );

  const data = [
    {
      title: "Completed Courses",
      icon: "receipt",
      value: completedClassList.length,
    },
    {
      title: "Credits Until Complete",
      icon: "coin",
      value: totalCreditsRequired - completedCredits,
    },
    {
      title: "Current Major",
      icon: "discount",
      value: "Computer Science",
    },
    {
      title: "Credits In Progress",
      icon: "user",
      value: inProgressCredits,
    },
    {
      title: "Total Credits Earned",
      icon: "user",
      value: completedCredits,
    },
  ] as const;

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];

    return (
      <Paper
        className="bg-primary dark:border-none hover:scale-[1.01] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
        p="lg"
        radius="md"
        key={stat.title}
      >
        <Group justify="space-between">
          <Text size="md" className={classes.title}>
            {stat.title}
          </Text>
        </Group>

        <Group align="flex-end" gap="xs" mt={35}>
          <p className="text-white dark:text-white text-2xl font-semibold">
            {stat.value}
          </p>
        </Group>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} className="p-0">
        {stats}
        <Paper
          withBorder
          p="lg"
          radius="md"
          key={0}
          className=" dark:bg-muted dark:border-none hover:scale-[1.01] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col self-start">
              <Group>
                <Text size="md" c="dimmed" className={classes.title}>
                  Major Status
                </Text>
              </Group>

              <Group align="flex-end" gap="xs" mt={35}>
                <Text className="text-black-base text-2xl font-semibold">
                  {completionPercentage}% Complete
                </Text>
              </Group>
            </div>

            <div className="flex justify-between items-center">
              <RingProgress
                size={125}
                sections={[{ value: completionPercentage, color: "#927c4e" }]}
                label={
                  <p className="font-semibold text-center text-sm font-avenir ">
                    {completionPercentage}%
                  </p>
                }
              />
            </div>
          </div>
        </Paper>
      </SimpleGrid>
    </div>
  );
}
