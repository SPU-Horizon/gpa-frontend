import { FeatureButtonProps } from "@/components/landingpage/FeatureButton";
import { BannerIntegration, ModernUX, VisualizeIcon } from "@/icons";

export const FeatureSectionContent: FeatureButtonProps[] = [
  {
    header: "Modern User Experience",
    description:
      "We know, Banner is outdated. So we created a modern design that fits with the times.",
    icon: <ModernUX height={50} width={50} />,
  },
  {
    header: "Banner Integration",
    description:
      "With the click of a few buttons, we can generate your course sequence. We interact with SPU’s existing systems, allowing for a seamless experience.",
    icon: <BannerIntegration />,
  },
  {
    header: "Course Sequence Generator",
    description:
      "We Visualize your Graduation Path, so that you don’t have to. GPA offers a personalized diagram that takes the work out of understanding the plan created for you.",
    icon: <VisualizeIcon height={50} width={50} />,
  },
];
