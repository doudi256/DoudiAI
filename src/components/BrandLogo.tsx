import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
}) => {
  const iconDimensions =
    size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-9 w-9';
  const textSize =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <span className="inline-flex items-center gap-2.5 shrink-0 select-none">
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className={`${iconDimensions} shrink-0 rounded-xl shadow-sm shadow-[#E11D2E]/20`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="doudiLogoBg"
            x1="0"
            y1="0"
            x2="64"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1A1A1A" />
            <stop offset="100%" stopColor="#0F0F0F" />
          </linearGradient>
          <linearGradient
            id="doudiLogoRed"
            x1="16"
            y1="12"
            x2="49"
            y2="52"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FF3344" />
            <stop offset="55%" stopColor="#E11D2E" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="15" fill="url(#doudiLogoBg)" />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="13.5"
          stroke="#E11D2E"
          strokeOpacity="0.32"
          strokeWidth="1.5"
        />
        <path
          d="M19.5 15H31.75C42.25 15 49 21.75 49 32C49 42.25 42.25 49 31.75 49H19.5C18.395 49 17.5 48.105 17.5 47V17C17.5 15.895 18.395 15 19.5 15ZM26 22.25V41.75H31.5C37.75 41.75 41 38 41 32C41 26 37.75 22.25 31.5 22.25H26Z"
          fill="url(#doudiLogoRed)"
        />
      </svg>
      {showText && (
        <span
          className={`${textSize} font-extrabold tracking-tight text-[#0F0F0F] dark:text-white whitespace-nowrap shrink-0`}
        >
          Doudi <span className="text-[#E11D2E]">AI</span>
        </span>
      )}
    </span>
  );
};
