import React from "react";

type LandingSectionHeaderProps = {
  className?: string;
  header: string;
  subtitle?: string;
};

export default function LandingSectionHeader({
  className,
  header,
  subtitle,
}: LandingSectionHeaderProps) {
  return (
    <div className={className}>
      <h2 className="text-3xl font-bold tracki text-center sm:text-5xl ">
        {header}
      </h2>
      <p className="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}
