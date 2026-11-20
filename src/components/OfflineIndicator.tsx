import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import type { TranslationSchema } from '../i18n/translations';

interface OfflineIndicatorProps {
  t: TranslationSchema;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ t }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed top-16 inset-x-4 md:inset-x-auto md:end-6 md:top-20 z-40 flex items-center gap-2.5 rounded-2xl bg-[#7F1D1D] text-white px-4 py-2.5 text-xs font-medium shadow-lg border border-white/15"
    >
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>{t.pwa.offlineBanner}</span>
    </div>
  );
};
