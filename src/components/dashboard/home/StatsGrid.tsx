import { Group, Paper, RingProgress, SimpleGrid, Text } from "@mantine/core";
import { ArrowUpRight } from "lucide-react";
import classes from "@/lib/modules/StatsGrid.module.css";

const icons = {
  user: ArrowUpRight,
  discount: ArrowUpRight,
  receipt: ArrowUpRight,
  coin: ArrowUpRight,
};

const data = [
  { title: "Completed Courses", icon: "receipt", value: "21", diff: 34 },
  { title: "Credits Until Graduation", icon: "coin", value: "78", diff: -13 },
  {
    title: "Current Major",
    icon: "discount",
    value: "Computer Science",
    diff: 18,
  },
  { title: "Credits In Progress", icon: "user", value: "16", diff: -30 },
  { title: "Total Credits Earned", icon: "user", value: "102", diff: -30 },
] as const;

export function StatsGrid() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowUpRight;

    return (
      <Paper
        className=" dark:text-white-base hover:scale-[1.01] transition-all duration-200 ease-in-out"
        withBorder
        p="lg"
        radius="md"
        key={stat.title}
      >
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" />
        </Group>

        <Group align="flex-end" gap="xs" mt={35}>
          <p className="text-black-base dark:text-white-base text-lg">
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
          className="hover:scale-[1.01] transition-all duration-200 ease-in-out"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col self-start">
              <Group>
                <Text size="xs" c="dimmed" className={classes.title}>
                  Major Status
                </Text>
              </Group>

              <Group align="flex-end" gap="xs" mt={35}>
                <Text className={classes.value}>Percentage %</Text>
              </Group>
            </div>

            <div className="flex justify-between items-center">
              <RingProgress
                size={90}
                sections={[{ value: 40, color: "#927c4e" }]}
                label={
                  <p className="dark:text-white-base font-semibold text-black-light text-center text-sm font-avenir ">
                    40%
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
