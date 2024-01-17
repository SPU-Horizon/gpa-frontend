import React from "react";
import VisionSectionTab from "./VisionSectionTab";
import { VisionSectionContentProps } from "@/constants/VisionSectionContent";

type VisionSectionMemberProps = {
  content: VisionSectionContentProps[];
  MemberHeader: string;
  MemberDescription: string;
  image: string;
  swap?: boolean;
};

export default function VisionSectionMember({
  content,
  MemberHeader,
  MemberDescription,
  image,
  swap,
}: VisionSectionMemberProps) {
  return (
    <div>
      {swap ? (
        <div className="grid gap-8 grid-cols-2 items-center md:flex md:flex-col-reverse ">
          <div aria-hidden="true" className="mt-10 lg:mt-0">
            <img
              src={image}
              alt=""
              className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-50">
              {MemberHeader}
            </h3>
            <p className="mt-3 text-lg dark:text-gray-400">
              {MemberDescription}
            </p>
            <div className="mt-12 space-y-12">
              {content.map((item, index) => (
                <VisionSectionTab
                  key={index + 1}
                  header={item.header}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-2 items-center md:grid-cols-1">
          <div>
            <h3 className="text-2xl font-bold tracki sm:text-3xl dark:text-gray-50">
              {MemberHeader}
            </h3>
            <p className="mt-3 text-lg dark:text-gray-400">
              {MemberDescription}
            </p>
            <div className="mt-12 space-y-12">
              {content.map((item, index) => (
                <VisionSectionTab
                  key={index + 1}
                  header={item.header}
                  description={item.description}
                />
              ))}
            </div>
          </div>
          <div aria-hidden="true" className="mt-10 lg:mt-0">
            <img
              src={image}
              alt=""
              className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
