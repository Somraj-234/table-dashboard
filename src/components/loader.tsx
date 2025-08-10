import React from "react";

const Loader: React.FC = () => (
  <div className="relative h-24 w-24">
    <svg
      className="absolute inset-0 w-full h-full"
      width="1344"
      height="1417"
      viewBox="0 0 1344 1417"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_341_123)">
        <mask id="path-1-inside-1_341_123" fill="white">
          <path d="M1319 672C1319 1029.33 1029.33 1319 672 1319C314.672 1319 25 1029.33 25 672C25 314.672 314.672 25 672 25C1029.33 25 1319 314.672 1319 672ZM141.944 672C141.944 964.742 379.258 1202.06 672 1202.06C964.742 1202.06 1202.06 964.742 1202.06 672C1202.06 379.258 964.742 141.944 672 141.944C379.258 141.944 141.944 379.258 141.944 672Z" />
        </mask>
        <path
          d="M1319 672C1319 1029.33 1029.33 1319 672 1319C314.672 1319 25 1029.33 25 672C25 314.672 314.672 25 672 25C1029.33 25 1319 314.672 1319 672ZM141.944 672C141.944 964.742 379.258 1202.06 672 1202.06C964.742 1202.06 1202.06 964.742 1202.06 672C1202.06 379.258 964.742 141.944 672 141.944C379.258 141.944 141.944 379.258 141.944 672Z"
          stroke="white"
          strokeWidth="242"
          shapeRendering="crispEdges"
          mask="url(#path-1-inside-1_341_123)"
        />
      </g>

      <circle
        cx="672"
        cy="672"
        r="659.5"
        stroke="black"
        strokeWidth="25"
        fill="none"
      />
      <circle
        cx="672"
        cy="672"
        r="532.5"
        stroke="black"
        strokeWidth="25"
        fill="none"
      />

      <g
        style={{
          transformOrigin: "672px 672px",
          animation: "spin-green-arc 1.2s linear infinite",
        }}
      >
        <circle
          cx="672"
          cy="672"
          r="596"
          stroke="#5ECD40"
          strokeWidth="117"
          fill="none"
          strokeLinecap="square"
          strokeDasharray="940 3000"
          strokeDashoffset="0"
        />
      </g>

      <defs>
        <filter
          id="filter0_d_341_123"
          x="21"
          y="25"
          width="1302"
          height="1392"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="94" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_341_123"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_341_123"
            result="shape"
          />
        </filter>
      </defs>

      <style>
        {`
          @keyframes spin-green-arc {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </svg>
  </div>
);

export default Loader;
