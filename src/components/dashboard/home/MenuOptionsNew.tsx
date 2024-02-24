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
  { title: "Create a Plan", icon: BookMarked, color: "violet", link: "/create-plan" },
  { title: "Submit your Courses", icon: FolderSync, color: "indigo", link: "/create-plan" },
  { title: "Majors and Requirements", icon: Search, color: "blue", link: "/create-plan" },
  { title: "Request Admin Access", icon: Send, color: "green", link: "/create-plan" },
  { title: "Build a Schedule", icon: Building, color: "teal", link: "/create-plan" },
  { title: "Saved Schedules", icon: SaveAll, color: "cyan", link: "/create-plan" },
  { title: "Meet with an Advisor", icon: SmilePlus, color: "pink", link: "/create-plan" },
  { title: "View Your Profile", icon: CircleUserRound, color: "red" , link: "/create-plan"},
];

export function ActionsGrid() {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <UnstyledButton
      key={item.title}
      className="flex flex-col items-center justify-center text-center rounded-md h-[180px] hover:scale-[1.03] hover:shadow-md transition-all duration-200 ease-in-out"
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
