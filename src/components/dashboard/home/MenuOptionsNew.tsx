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

const menuButtons = [
  {
    title: "Build Your Schedule",
    icon: BookMarked,
    color: "violet",
    link: "/dashboard/plan",
    tab: "Build Schedule",
  },
  {
    title: "Submit your Courses",
    icon: FolderSync,
    color: "indigo",
    link: "/dashboard/integrate-banner",
    tab: "Integrate with Banner",
  },
  {
    title: "Majors and Requirements",
    icon: Search,
    color: "blue",
    link: "/dashboard/majors",
    tab: "Majors",
  },
  {
    title: "Request Admin Access",
    icon: Send,
    color: "green",
    link: "/dashboard/admin",
    tab: "Admin",
  },
  {
    title: "Build a Schedule",
    icon: Building,
    color: "teal",
    link: "/dashboard/schedule",
    tab: "Build Schedule",
  },
  {
    title: "Saved Schedules",
    icon: SaveAll,
    color: "cyan",
    link: "/dashboard/saved-schedules",
    tab: "Saved Schedules",
  },
  {
    title: "Meet with an Advisor",
    icon: SmilePlus,
    color: "pink",
    link: "/dashboard/advisor",
    tab: "Advisor",
  },
  {
    title: "View Your Profile",
    icon: CircleUserRound,
    color: "red",
    link: "/dashboard/profile",
    tab: "Profile",
  },
];

export function ActionsGrid() {
  const theme = useMantineTheme();

  const items = menuButtons.map((item) => (
    <UnstyledButton 
     key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][9]} size="2rem" />
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
