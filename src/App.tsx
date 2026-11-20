import { useEffect, useState } from 'react';
import { Home, Info, MessageSquare, Settings } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BrandLogo } from './components/BrandLogo';
import { OfflineIndicator } from './components/OfflineIndicator';
import { TRANSLATIONS } from './i18n/translations';
import { AboutPage } from './pages/AboutPage';
import { ChatPage } from './pages/ChatPage';
import { HomePage } from './pages/HomePage';
import { SettingsPage } from './pages/SettingsPage';
import type { ChatMessage, Language, PageId, ThemeMode } from './types';

const STORAGE_KEYS = {
  chat: 'doudi_ai_chat_history',
  theme: 'doudi_ai_theme',
  language: 'doudi_ai_language',
} as const;

function readStoredLanguage(): Language {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.language);
    if (val === 'ar' || val === 'fr' || val === 'en') return val;
  } catch {
    // Ignore storage access errors
  }
  return 'ar';
}

function readStoredTheme(): ThemeMode {
  try {
    const val = localStorage.getItem(STORAGE_KEYS.theme);
    if (val === 'light' || val === 'dark') return val;
  } catch {
    // Ignore storage access errors
  }
  return 'light';
}

function readStoredMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.chat);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (m): m is ChatMessage =>
          m &&
          typeof m.id === 'string' &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      );
    }
  } catch {
    // Ignore invalid JSON
  }
  return [];
}

export default function App() {
  const [page, setPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>(readStoredLanguage);
  const [theme, setTheme] = useState<ThemeMode>(readStoredTheme);
  const [messages, setMessages] = useState<ChatMessage[]>(readStoredMessages);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEYS.language, language);
    } catch {
      // Ignore storage error
    }
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // Ignore storage error
    }
  }, [theme]);

  useEffect(() => {
    try {
      const clean = messages.filter((m) => m.content.trim().length > 0);
      localStorage.setItem(STORAGE_KEYS.chat, JSON.stringify(clean));
    } catch {
      // Ignore storage quota error
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEYS.chat);
    } catch {
      // Ignore
    }
  };

  const handleResetAllData = () => {
    setMessages([]);
    setLanguage('ar');
    setTheme('light');
    try {
      localStorage.removeItem(STORAGE_KEYS.chat);
      localStorage.removeItem(STORAGE_KEYS.language);
      localStorage.removeItem(STORAGE_KEYS.theme);
    } catch {
      // Ignore
    }
  };

  const navItems: Array<{
    id: PageId;
    label: string;
    icon: typeof Home;
  }> = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'chat', label: t.nav.chat, icon: MessageSquare },
    { id: 'settings', label: t.nav.settings, icon: Settings },
    { id: 'about', label: t.nav.about, icon: Info },
  ];

  const activeNavTitle =
    navItems.find((item) => item.id === page)?.label ?? t.brandName;

  return (
    <div className="relative min-h-dvh flex flex-col bg-[#FAFAFA] dark:bg-[#0F0F0F] text-[#0F0F0F] dark:text-white transition-colors duration-200 overflow-x-hidden">
      {/* Subtle architectural crimson radial ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      >
        <div className="absolute -top-36 start-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-[#E11D2E]/[0.06] dark:bg-[#E11D2E]/[0.11] blur-[120px]" />
        <div className="absolute bottom-0 end-0 h-[320px] w-[480px] rounded-full bg-[#7F1D1D]/[0.05] dark:bg-[#7F1D1D]/[0.12] blur-[120px]" />
      </div>

      {/* Desktop Top Navigation Bar (Strict 3-Zone Contract) */}
      <header className="sticky top-0 z-30 h-12 md:h-16 bg-white/80 dark:bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand */}
          <button
            type="button"
            onClick={() => setPage('home')}
            className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded-xl"
          >
            <BrandLogo size="sm" />
          </button>

          {/* Mobile Page Context */}
          <span className="md:hidden text-sm font-bold text-neutral-700 dark:text-neutral-200 truncate">
            {activeNavTitle}
          </span>

          {/* Zone 2: Desktop Single-Line Nav Links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7"
          >
            {navItems.map((item) => {
              const isActive = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPage(item.id)}
                  className={`relative py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E] rounded-md ${
                    isActive
                      ? 'text-[#E11D2E]'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-[#0F0F0F] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-[#E11D2E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="hidden md:flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setPage('chat')}
              className="min-h-[40px] px-5 py-2 rounded-xl bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] text-white text-sm font-bold shadow-sm shadow-[#E11D2E]/25 hover:brightness-110 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D2E]"
            >
              {t.hero.ctaStart}
            </button>
          </div>
        </div>
      </header>

      <OfflineIndicator t={t} />

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {page === 'home' && (
              <HomePage t={t} language={language} onNavigate={setPage} />
            )}
            {page === 'chat' && (
              <ChatPage
                t={t}
                language={language}
                messages={messages}
                setMessages={setMessages}
                onClearChat={handleClearChat}
              />
            )}
            {page === 'settings' && (
              <SettingsPage
                t={t}
                theme={theme}
                onChangeTheme={setTheme}
                language={language}
                onChangeLanguage={setLanguage}
                onClearChat={handleClearChat}
                onResetAllData={handleResetAllData}
              />
            )}
            {page === 'about' && (
              <AboutPage t={t} language={language} onNavigate={setPage} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Quiet Desktop Footer */}
      {page !== 'chat' && (
        <footer className="hidden md:block relative z-10 border-t border-black/[0.06] dark:border-white/[0.08] py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <span>{t.footer.rights}</span>
            <div className="flex items-center gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPage(item.id)}
                  className="hover:text-[#E11D2E] transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </footer>
      )}

      {/* Mobile Bottom Tab Bar */}
      <nav
        aria-label="Mobile"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 pb-safe bg-white/90 dark:bg-[#0F0F0F]/92 backdrop-blur-xl border-t border-black/[0.07] dark:border-white/[0.08]"
      >
        <div className="grid grid-cols-4 h-full max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                className={`min-h-[44px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[#E11D2E]'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.9]'
                  }`}
                />
                <span className="text-[11px] font-semibold leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
