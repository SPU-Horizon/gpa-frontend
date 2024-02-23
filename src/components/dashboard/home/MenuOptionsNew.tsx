import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  useMantineTheme,
} from "@mantine/core";
import {
  BookMarked,
  CircleUserRound,
  Send,
  Building,
  SaveAll,
  SmilePlus,
  Search,
  FolderSync,
} from "lucide-react";
import classes from "@/lib/modules/MenuOptions.module.css";

const mockdata = [
  { title: "Create a Plan", icon: BookMarked, color: "violet" },
  { title: "Submit your Courses", icon: FolderSync, color: "indigo" },
  { title: "Majors and Requirements", icon: Search, color: "blue" },
  { title: "Request Admin Access", icon: Send, color: "green" },
  { title: "Build a Schedule", icon: Building, color: "teal" },
  { title: "Saved Schedules", icon: SaveAll, color: "cyan" },
  { title: "Meet with an Advisor", icon: SmilePlus, color: "pink" },
  { title: "View Your Profile", icon: CircleUserRound, color: "red" },
];

export function ActionsGrid() {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className=" bg-gray-100 dark:bg-black-light  flex flex-col items-center justify-center text-center rounded-md h-[180px] hover:scale-[1.03] hover:shadow-md transition-all duration-200 ease-in-out"
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="md" mt={8}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Menu Options</Text>
      </Group>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
