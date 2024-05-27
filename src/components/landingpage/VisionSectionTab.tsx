import { CheckMark } from "@/icons";
import { VisionSectionContentProps } from "@/constants/VisionSectionContent";

export default function VisionSectionTab({
  header,
  description,
}: VisionSectionContentProps) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-md dark:bg-gold-base bg-gold-light dark:text-white">
          <CheckMark />
        </div>
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-medium leading-5 dark:text-gray-50">
          {header}
        </h4>
        <p className="mt-2 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
