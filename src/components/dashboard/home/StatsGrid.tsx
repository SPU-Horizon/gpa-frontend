import { Group, Paper, RingProgress, SimpleGrid, Text } from "@mantine/core";
import { ArrowUpRight } from "lucide-react";
import classes from "@/lib/modules/StatsGrid.module.css";
import { useCourseStore } from "@/stores";

interface Course {
  id: string;
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

  const totalCreditsRequired = 180;

  let completedCredits = completedClassList.reduce((total, course: Course) => {
    return total + parseFloat(course.credits);
  }, 0);

  let inProgressCredits = inProgressClassList.reduce((total, course: Course) => {
    return total + parseFloat(course.credits);
  }, 0);

  const completionPercentage = Math.ceil((completedCredits / totalCreditsRequired) * 100);

  const data = [
    { title: "Completed Courses", icon: "receipt", value: completedClassList.length, diff: 34 },
    { title: "Credits Until Graduation", icon: "coin", value: totalCreditsRequired - completedCredits, diff: -13 },
    {
      title: "Current Major",
      icon: "discount",
      value: "Computer Science",
      diff: 18,
    },
    { title: "Credits In Progress", icon: "user", value: inProgressCredits, diff: -30 },
    { title: "Total Credits Earned", icon: "user", value: completedCredits, diff: -30 },
  ] as const;

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper
        className="dark:bg-black-light dark:border-none hover:scale-[1.01] transition-all duration-200 ease-in-out"
        withBorder
        p="lg"
        radius="md"
        key={stat.title}
      >
        <Group justify="space-between">
          <Text size="md" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" />
        </Group>

        <Group align="flex-end" gap="xs" mt={35}>
          <p className="text-black-base dark:text-white-base text-2xl font-semibold">
            {stat.value}
          </p>
        </Group>
        
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>
        {stats}
        <Paper
          withBorder
          p="lg"
          radius="md"
          key={0}
          className=" dark:bg-black-light dark:border-none hover:scale-[1.01] transition-all duration-200 ease-in-out"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col self-start">
              <Group>
                <Text size="md" c="dimmed" className={classes.title}>
                  Major Status
                </Text>
              </Group>

              <Group align="flex-end" gap="xs" mt={35}>
                <Text className="text-black-base dark:text-white-base text-2xl font-semibold">
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

