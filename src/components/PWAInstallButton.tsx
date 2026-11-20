import React, { useState } from 'react';
import { CheckCircle2, Download, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import type { TranslationSchema } from '../i18n/translations';

interface PWAInstallButtonProps {
  t: TranslationSchema;
  variant?: 'primary' | 'card';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  t,
  variant = 'primary',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    if (variant === 'card') {
      return (
        <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{t.settings.installedLabel}</span>
        </div>
      );
    }
    return null;
  }

  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={install}
        className={
          variant === 'primary'
            ? 'inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#171717]/80 backdrop-blur-md text-sm font-semibold text-[#0F0F0F] dark:text-white hover:border-[#E11D2E]/50 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E]'
            : 'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] text-white text-sm font-semibold shadow-sm shadow-[#E11D2E]/25 hover:opacity-95 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E]'
        }
      >
        <Download className="h-4 w-4 shrink-0" />
        <span>
          {variant === 'card' ? t.settings.installAction : t.pwa.installBtn}
        </span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={
            variant === 'primary'
              ? 'inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-[#171717]/80 backdrop-blur-md text-sm font-semibold text-[#0F0F0F] dark:text-white hover:border-[#E11D2E]/50 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E]'
              : 'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#1F1F1F] text-sm font-semibold text-[#0F0F0F] dark:text-white hover:border-[#E11D2E]/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E]'
          }
        >
          <Share className="h-4 w-4 shrink-0" />
          <span>{t.pwa.iosInstallBtn}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ios-install-title"
          >
            <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#171717] border border-black/10 dark:border-white/10 p-6 shadow-2xl">
              <h3
                id="ios-install-title"
                className="text-lg font-bold text-[#0F0F0F] dark:text-white"
              >
                {t.settings.iosInstallTitle}
              </h3>
              <div className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                <p>{t.settings.iosInstallStep1}</p>
                <p>{t.settings.iosInstallStep2}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full min-h-[44px] rounded-xl bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] text-white text-sm font-semibold hover:opacity-95 transition-opacity cursor-pointer"
              >
                {t.settings.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
