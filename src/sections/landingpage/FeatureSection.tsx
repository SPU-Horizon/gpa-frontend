import { FeatureSectionContent } from "@/constants";
import FeatureButton from "@/components/landingpage/FeatureButton";
import LandingSectionHeader from "@/components/landingpage/LandingSectionHeader";
import { CustomCarousel } from "@/components/custom";
import { FeatureOne, FeatureThree, FeatureTwo } from "@/images";

export default function FeatureSection() {
  return (
    <div className="dark:bg-black-light dark:text-white-light">
      {/* <!-- Features --> */}
      <div className="max-w-[85rem] px-4 py-20 sm:px-6 md:py-[5rem] lg:px-8 lg:py-14 mx-auto">
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
                    className={
                      index + 1 === FeatureSectionContent.length
                        ? "mb-7 "
                        : undefined
                    }
                  />
                ))}
              </nav>
              {/* <!-- End Tab Navs --> */}
            </div>

            <div className="col-span-6">
              <div className="h-full">
                <CustomCarousel
                  content={[
                    { photo: FeatureOne },
                    { photo: FeatureTwo },
                    { photo: FeatureThree },
                  ]}
                />
              </div>
            </div>
          </div>
          {/* <!-- End Grid --> */}
        </div>
      </div>
      {/* <!-- End Features --> */}
    </div>
  );
}
