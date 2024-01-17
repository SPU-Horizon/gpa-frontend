import { IconProps } from ".";

export default function BannerIntegration({
  height,
  width,
  shadow,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "50"}
      height={height || "50"}
      viewBox="0 0 139 129"
      fill="none"
    >
      <g filter="url(#filter0_d_136_89)">
        <rect
          x="4"
          width="131"
          height="120.083"
          rx="28"
          fill="#927C4E"
          fillOpacity="0.7"
        />
        <path
          d="M83.1458 40.5476H55.8542C54.7775 40.5476 53.9048 41.4204 53.9048 42.497V43.7966C53.9048 44.8733 54.7775 45.746 55.8542 45.746C55.8542 53.1347 59.9979 59.3703 65.6696 61.3413C59.9979 63.3123 55.8542 69.5479 55.8542 76.9365C54.7775 76.9365 53.9048 77.8093 53.9048 78.8859V80.1855C53.9048 81.2622 54.7775 82.1349 55.8542 82.1349H83.1458C84.2225 82.1349 85.0952 81.2622 85.0952 80.1855V78.8859C85.0952 77.8093 84.2225 76.9365 83.1458 76.9365C83.1458 69.5479 79.002 63.3123 73.3304 61.3413C79.002 59.3703 83.1458 53.1347 83.1458 45.746C84.2225 45.746 85.0952 44.8733 85.0952 43.7966V42.497C85.0952 41.4204 84.2225 40.5476 83.1458 40.5476ZM77.0476 71.7381H61.9525C63.3382 67.937 66.1841 65.2401 69.5 65.2401C72.8157 65.2401 75.6619 67.9364 77.0476 71.7381ZM77.0491 50.9444H61.9524C61.3765 49.3644 61.0526 47.5937 61.0526 45.746H77.9474C77.9474 47.5984 77.6236 49.3676 77.0491 50.9444Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_136_89"
          x="0"
          y="0"
          width="139"
          height="128.083"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          {shadow && (
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
          )}

          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_136_89"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_136_89"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
