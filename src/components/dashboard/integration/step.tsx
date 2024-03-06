import { Timeline, Text } from "@mantine/core";
import React from "react";

export type StepProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
};

export default function Step({ title, description, icon, link }: StepProps) {
  return (
    <>
      <Timeline.Item bullet={icon}>
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
