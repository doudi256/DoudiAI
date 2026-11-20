import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Languages, ShieldCheck, Zap } from 'lucide-react';
import { PWAInstallButton } from '../components/PWAInstallButton';
import type { TranslationSchema } from '../i18n/translations';
import type { Language, PageId } from '../types';

interface HomePageProps {
  t: TranslationSchema;
  language: Language;
  onNavigate: (page: PageId) => void;
}

const FEATURE_ICONS = [Zap, Languages, ShieldCheck];

export const HomePage: React.FC<HomePageProps> = ({
  t,
  language,
  onNavigate,
}) => {
  const [imgError, setImgError] = useState(false);
  const isRTL = language === 'ar';
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] p-7 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <p className="text-xs sm:text-sm font-semibold text-[#E11D2E] tracking-wide">
            {t.hero.kicker}
          </p>

          <h1
            className="mt-3 font-extrabold tracking-tight text-[#0F0F0F] dark:text-white leading-[1.2] text-balance"
            style={{ fontSize: 'clamp(1.85rem, 3.6vw, 3.25rem)' }}
          >
            {t.hero.title}
          </h1>

          <p className="mt-5 text-base sm:text-[17px] text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => onNavigate('chat')}
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3 rounded-2xl bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#E11D2E]/25 hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] focus-visible:ring-offset-2"
            >
              <span>{t.hero.ctaStart}</span>
              <ArrowIcon className="h-4 w-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-2xl border border-black/10 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] text-sm font-semibold text-[#0F0F0F] dark:text-white hover:border-[#E11D2E]/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E]"
            >
              {t.hero.ctaAbout}
            </button>

            <PWAInstallButton t={t} variant="primary" />
          </div>
        </div>

        <div className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-black/[0.07] dark:border-white/[0.08] bg-[#141414] min-h-[240px] sm:min-h-[300px] lg:min-h-full shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          {!imgError ? (
            <img
              src="/src/assets/images/hero_crimson_studio_1795188552681.jpg"
              alt={t.hero.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full lg:h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#450A0A] text-white">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] flex items-center justify-center text-4xl font-extrabold shadow-xl shadow-[#E11D2E]/30">
                D
              </div>
              <p className="mt-4 text-sm font-semibold text-neutral-300">
                Doudi AI
              </p>
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute bottom-5 inset-x-5 flex items-center justify-between text-white/90 text-xs font-medium">
            <span>Doudi AI</span>
            <span className="text-[#FCA5A5]">AR · FR · EN</span>
          </div>
        </div>
      </section>

      {/* 3 Feature Cards */}
      <section aria-labelledby="features-heading" className="space-y-6">
        <div className="max-w-2xl">
          <h2
            id="features-heading"
            className="text-xl sm:text-2xl font-bold text-[#0F0F0F] dark:text-white tracking-tight"
          >
            {t.features.sectionTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {t.features.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.features.items.map((item, idx) => {
            const Icon = FEATURE_ICONS[idx] ?? Zap;
            return (
              <article
                key={item.index}
                className="group rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.28)] hover:border-[#E11D2E]/35 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#E11D2E]/12 to-[#7F1D1D]/10 dark:from-[#E11D2E]/20 dark:to-[#7F1D1D]/20 text-[#E11D2E] flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold tabular-nums text-neutral-400 dark:text-neutral-500">
                    {item.index}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#0F0F0F] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
