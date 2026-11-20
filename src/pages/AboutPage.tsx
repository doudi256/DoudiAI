import React from 'react';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import type { TranslationSchema } from '../i18n/translations';
import type { Language, PageId } from '../types';

interface AboutPageProps {
  t: TranslationSchema;
  language: Language;
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  t,
  language,
  onNavigate,
}) => {
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] p-6 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        <BrandLogo size="lg" />
        <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] dark:text-white tracking-tight">
          {t.about.title}
        </h1>
        <p className="mt-2 text-base text-[#E11D2E] font-semibold">
          {t.about.subtitle}
        </p>

        <div className="mt-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
          <h2 className="text-lg font-bold text-[#0F0F0F] dark:text-white">
            {t.about.overviewTitle}
          </h2>
          <p className="mt-2.5 text-[15px] sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {t.about.overviewBody}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {t.about.pillars.map((pillar) => (
          <article
            key={pillar.index}
            className="rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.28)]"
          >
            <span className="text-xs font-bold tabular-nums text-[#E11D2E]">
              {pillar.index}
            </span>
            <h3 className="mt-3 text-base sm:text-lg font-bold text-[#0F0F0F] dark:text-white">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {pillar.body}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-2xl bg-[#E11D2E]/10 text-[#E11D2E] flex items-center justify-center shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F0F0F] dark:text-white">
              {t.about.privacyTitle}
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
              {t.about.privacyBody}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('chat')}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-2xl bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] text-white text-sm font-bold shadow-md shadow-[#E11D2E]/25 hover:brightness-110 transition-all whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>{t.about.ctaChat}</span>
          <ArrowIcon className="h-4 w-4 shrink-0" />
        </button>
      </section>
    </div>
  );
};
