export type Language = 'ar' | 'fr' | 'en';

export type ThemeMode = 'light' | 'dark';

export type PageId = 'home' | 'chat' | 'settings' | 'about';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
  error?: boolean;
}
