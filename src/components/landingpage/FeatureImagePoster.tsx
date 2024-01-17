import React from "react";
import { FeatureOne, FeatureTwo, FeatureThree } from "@/images";

type FeatureImagePosterProps = {
  photo: number;
};

export default function FeatureImagePoster({ photo }: FeatureImagePosterProps) {
  return (
    <div className="relative min-h-[500px] ">
      {/* <!-- Tab Content --> */}
      <div>
        <div role="tabpanel" aria-labelledby="tabs-with-card-item-1">
          {photo === 1 && (
            <img
              className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]"
              src={FeatureOne}
              alt="Image Description"
            />
          )}
          {photo === 2 && (
            <img
              className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]"
              src={FeatureTwo}
              alt="Image Description"
            />
          )}
          {photo === 3 && (
            <img
              className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]"
              src={FeatureThree}
              alt="Image Description"
            />
          )}
        </div>
      </div>
      {/* <!-- End Tab Content --> */}
    </div>
  );
}
