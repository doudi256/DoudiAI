import React from 'react';

interface ChatSkeletonProps {
  thinkingLabel: string;
}

export const ChatSkeleton: React.FC<ChatSkeletonProps> = ({
  thinkingLabel,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="w-[240px] sm:w-[360px] md:w-[440px] max-w-full space-y-3.5 py-0.5"
    >
      {/* Header row with status label */}
      <div className="flex items-center gap-2.5">
        <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] flex items-center justify-center text-[11px] font-extrabold text-white shrink-0 shadow-sm shadow-[#E11D2E]/25">
          D
        </div>
        <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">
          {thinkingLabel}
        </span>
      </div>

      {/* Multi-line prose skeleton bars */}
      <div className="space-y-2.5" aria-hidden="true">
        <div className="h-3.5 w-full rounded-full doudi-skeleton" />
        <div className="h-3.5 w-[90%] rounded-full doudi-skeleton" />
        <div className="h-3.5 w-[76%] rounded-full doudi-skeleton" />
        <div className="h-3.5 w-[54%] rounded-full doudi-skeleton" />
      </div>
    </div>
  );
};
