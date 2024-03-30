import { Card, Text, SimpleGrid, UnstyledButton, Group } from "@mantine/core";
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
import { useNavigate } from "react-router-dom";
import { useNavigationStore } from "@/stores/NavigationStore";
import { useThemeStore } from "@/stores";

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
  const navigate = useNavigate();
  const { setCurrentTab } = useNavigationStore();
  const { theme } = useThemeStore();

  const items = menuButtons.map((item) => (
    <UnstyledButton
      key={item.title}
      className=" bg-gray-100 dark:bg-black-light dark:border-none flex flex-col items-center justify-center text-center rounded-md h-[180px] hover:scale-[1.03] hover:shadow-md transition-all duration-200 ease-in-out"
      onClick={() => {
        navigate(item.link);
        item.tab ? setCurrentTab(item.tab) : setCurrentTab("none");
      }}
    >
      <item.icon color={theme === "dark" ? "white" : "gray"} size="2rem" />
      <Text className=" dark:text-white-light" size="md" mt={8}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card
      withBorder
      radius="md"
      className="bg-transparent dark:bg-transparent p-2 border-none text-black-light"
    >
      <Group justify="space-between">
        <Text className={classes.title}>Menu Options</Text>
      </Group>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
