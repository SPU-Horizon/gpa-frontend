import { Timeline, Text } from "@mantine/core";
import React from "react";
import { useThemeStore } from "@/stores";

export type StepProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
};

export default function Step({ title, description, icon, link }: StepProps) {
  const { theme } = useThemeStore();
  return (
    <>
      <Timeline.Item
        bullet={icon}
        styles={{
          itemBullet: {
            backgroundColor: theme === "dark" ? "#222" : "#eee",
            borderColor: theme === "dark" ? "#222" : "#eee",
            color: theme === "dark" ? "white" : "black",
            "::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "-4px",
              transform: "translateY(-50%)",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
            },
          },
        }}
      >
        <h1 className="text-lg dark:text-white-light text-black-base">
          {title}
        </h1>
        <Text size="lg" className="dark:text-white-base text-black-light">
          {description}
        </Text>
        {link && (
          <a
            href={link}
            className="hover:text-red-400 dark:hover:text-gold-bright transition-all ease-in-out text-blue-500 dark:text-blue-400"
          >
            {link}
          </a>
        )}
      </Timeline.Item>
    </>
  );
}
