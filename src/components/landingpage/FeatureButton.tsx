import React from "react";
// Test
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
      <div className="">
        <button
          type="button"
          className="text-slate-800  hover:text-white-light ease-in-out hover:scale-[1.07] duration-200 hover:shadow-lg active:hover:border-transparent text-start hover:bg-gold-light  dark:hover:bg-muted p-4 md:p-5 rounded-xl  xs:p-1"
          id={`tabs-with-card-item-${index}`}
          data-hs-tab="#tabs-with-card-1"
          aria-controls={`tabs-with-card-${index}`}
          role="tab"
          onClick={HandleChange}
        >
          <div className="flex items-center sm:flex-col dark:text-white">
            <div>{icon}</div>
            <span className="grow ms-6 sm:ms-0">
              <div className="block text-lg font-semibold sm:text-center sm:w-full">
                {header}
              </div>
              <div className="block mt-1  sm:text-center">{description}</div>
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
