import { VisionOne, VisionTwo } from "@/images";
import {
  VisionSectionContentTop,
  VisionSectionContentBottom,
} from "@/constants/VisionSectionContent";
import VisionSectionMember from "@/components/landingpage/VisionSectionMember";
import LandingSectionHeader from "@/components/landingpage/LandingSectionHeader";

export default function VisionSection() {
  return (
    <div id="Vision">
      <section className="dark:bg-black-light dark:text-gray-100">
        <div className="container pb-[6rem] max-w-[80rem] p-6 pt-20  mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
          {/* Header */}

          <LandingSectionHeader
            header="Our Vision"
            subtitle="From Students to Students."
            className="text-center"
          />

          {/* Vision Section Member Heading */}
          <VisionSectionMember
            content={VisionSectionContentTop}
            MemberHeader="Streamline Academic Planning "
            MemberDescription="We want to empower students to chart their academic future with
            clarity and confidence."
            image={VisionOne}
          />

          <VisionSectionMember
            content={VisionSectionContentBottom}
            MemberHeader="Student-Centric Success"
            MemberDescription="Envision success from a student-centric perspective, where the app becomes a catalyst for personal growth, resilience, and achievement, laying the foundation for a fulfilling academic future."
            image={VisionTwo}
            swap
          />
        </div>
      </section>
    </div>
  );
}
