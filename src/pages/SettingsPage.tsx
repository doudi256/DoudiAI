import React, { useState } from 'react';
import { Check, Globe, Moon, Sun, Trash2 } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';
import { PWAInstallButton } from '../components/PWAInstallButton';
import type { TranslationSchema } from '../i18n/translations';
import type { Language, ThemeMode } from '../types';

interface SettingsPageProps {
  t: TranslationSchema;
  theme: ThemeMode;
  onChangeTheme: (theme: ThemeMode) => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onClearChat: () => void;
  onResetAllData: () => void;
}

const LANGUAGE_OPTIONS: Array<{ id: Language; label: string }> = [
  { id: 'ar', label: 'العربية' },
  { id: 'fr', label: 'Français' },
  { id: 'en', label: 'English' },
];

export const SettingsPage: React.FC<SettingsPageProps> = ({
  t,
  theme,
  onChangeTheme,
  language,
  onChangeLanguage,
  onClearChat,
  onResetAllData,
}) => {
  const [confirmResetAll, setConfirmResetAll] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] dark:text-white tracking-tight">
          {t.settings.title}
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          {t.settings.subtitle}
        </p>
      </div>

      {toastMessage && (
        <div
          role="status"
          className="flex items-center gap-2.5 rounded-2xl bg-emerald-600 text-white px-4 py-3 text-sm font-medium shadow-lg"
        >
          <Check className="h-4 w-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] divide-y divide-black/[0.06] dark:divide-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        {/* Theme Toggle */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#0F0F0F] dark:text-white">
              {t.settings.appearanceLabel}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {t.settings.appearanceDesc}
            </p>
          </div>

          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-neutral-100 dark:bg-[#0F0F0F] border border-black/[0.05] dark:border-white/[0.08] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onChangeTheme('light')}
              className={`inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                theme === 'light'
                  ? 'bg-white text-[#0F0F0F] shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-[#0F0F0F] dark:hover:text-white'
              }`}
            >
              <Sun className="h-4 w-4 text-[#E11D2E]" />
              <span>{t.settings.lightMode}</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeTheme('dark')}
              className={`inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                theme === 'dark'
                  ? 'bg-[#1F1F1F] text-white shadow-sm border border-white/10'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-[#0F0F0F] dark:hover:text-white'
              }`}
            >
              <Moon className="h-4 w-4 text-[#E11D2E]" />
              <span>{t.settings.darkMode}</span>
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-[#E11D2E]" />
              <h2 className="text-base font-bold text-[#0F0F0F] dark:text-white">
                {t.settings.languageLabel}
              </h2>
            </div>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {t.settings.languageDesc}
            </p>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-neutral-100 dark:bg-[#0F0F0F] border border-black/[0.05] dark:border-white/[0.08] self-start sm:self-auto">
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChangeLanguage(opt.id)}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  language === opt.id
                    ? 'bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-[#0F0F0F] dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* PWA Installation */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-[#0F0F0F] dark:text-white">
              {t.settings.installLabel}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {t.settings.installDesc}
            </p>
          </div>
          <div className="shrink-0">
            <PWAInstallButton t={t} variant="card" />
          </div>
        </div>

        {/* Data Management */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-base font-bold text-[#0F0F0F] dark:text-white">
              {t.settings.dataLabel}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {t.settings.dataDesc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClearChat();
                triggerToast(t.settings.dataClearedToast);
              }}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#0F0F0F] text-sm font-semibold text-[#0F0F0F] dark:text-white hover:border-[#E11D2E]/50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4 text-[#E11D2E]" />
              <span>{t.settings.clearChatOnly}</span>
            </button>

            <button
              type="button"
              onClick={() => setConfirmResetAll(true)}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#E11D2E]/10 text-[#B91C1C] dark:text-[#FCA5A5] text-sm font-semibold hover:bg-[#E11D2E]/20 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4" />
              <span>{t.settings.resetAllData}</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmResetAll}
        title={t.settings.resetConfirmTitle}
        description={t.settings.resetConfirmDesc}
        confirmLabel={t.chat.confirmAction}
        cancelLabel={t.chat.cancelAction}
        onConfirm={() => {
          onResetAllData();
          setConfirmResetAll(false);
          triggerToast(t.settings.dataClearedToast);
        }}
        onCancel={() => setConfirmResetAll(false)}
      />
    </div>
  );
};
