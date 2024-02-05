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
        <h1 className="text-lg  text-white-light">{title}</h1>
        <Text size="lg" className="text-white-base">
          {description}
        </Text>
        {link && (
          <a
            href={link}
            className="hover:text-red-400 text-gold-bright transition-all ease-in-out"
          >
            {link}
          </a>
        )}
      </Timeline.Item>
    </>
  );
}
