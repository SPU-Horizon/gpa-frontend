import React from "react";

export type FeatureButtonProps = {
  className?: string;
  header: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
  HandleChange?: () => void;
};

export default function FeatureButton({
  className,
  header,
  description,
  icon,
  index,
  HandleChange,
}: FeatureButtonProps) {
  return (
    <div className={className}>
      <button
        type="button"
        className="text-slate-800 hover:shadow-md active:hover:border-transparent text-start hover:bg-gray-100 p-4 md:p-5 rounded-xl  active xs:p-1"
        id={`tabs-with-card-item-${index}`}
        data-hs-tab="#tabs-with-card-1"
        aria-controls={`tabs-with-card-${index}`}
        role="tab"
        onClick={HandleChange}
      >
        <div className="flex items-center sm:flex-col ">
          <div>{icon}</div>
          <span className="grow ms-6 sm:ms-0">
            <div className="block text-lg font-semibold text-gray-800 sm:text-center sm:w-full">
              {header}
            </div>
            <div className="block mt-1 text-gray-800  sm:text-center">
              {description}
            </div>
          </span>
        </div>
      </button>
    </div>
  );
}
