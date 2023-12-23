import { useState } from "react";

import { FeatureSectionContent } from "@/constants/FeatureSectionContent";
import FeatureButton from "@/components/landingpage/FeatureButton";
import FeatureImagePoster from "@/components/landingpage/FeatureImagePoster";
import LandingSectionHeader from "@/components/landingpage/LandingSectionHeader";

export default function FeatureSection() {
  const [photo, setPhoto] = useState(1);
  return (
    <div className="">
      {/* <!-- Features --> */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="relative p-6 md:p-2">
          {/* <!-- Grid --> */}
          <div className="relative z-10 grid grid-cols-12 gap-16 lg:block ">
            <div className=" mb-0 col-span-6 col-start-8 order-2">
              <LandingSectionHeader
                header="GPA Features"
                subtitle="How we make our Vision a Reality."
                className="sm:text-center"
              />

              {/* <!-- Tab Navs --> */}
              <nav
                className="grid gap-4 mt-5 md:mt-10"
                aria-label="Tabs"
                role="tablist"
              >
                {FeatureSectionContent.map((content, index) => (
                  <FeatureButton
                    key={index + 1}
                    header={content.header}
                    description={content.description}
                    icon={content.icon}
                    index={index + 1}
                    HandleChange={() => setPhoto(index + 1)}
                    className={
                      index + 1 === FeatureSectionContent.length
                        ? "mb-7"
                        : undefined
                    }
                  />
                ))}
              </nav>
              {/* <!-- End Tab Navs --> */}
            </div>

            <div className="col-span-6">
              <FeatureImagePoster photo={photo} />
            </div>
          </div>
          {/* <!-- End Grid --> */}
        </div>
      </div>
      {/* <!-- End Features --> */}
    </div>
  );
}
