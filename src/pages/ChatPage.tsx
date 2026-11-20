import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  RefreshCw,
  Send,
  Square,
  Trash2,
  WifiOff,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { ChatSkeleton } from '../components/ChatSkeleton';
import { ConfirmModal } from '../components/ConfirmModal';
import { FormattedMessage } from '../components/FormattedMessage';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import type { TranslationSchema } from '../i18n/translations';
import type { ChatMessage, Language } from '../types';

interface ChatPageProps {
  t: TranslationSchema;
  language: Language;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  onClearChat: () => void;
}

export const ChatPage: React.FC<ChatPageProps> = ({
  t,
  language,
  messages,
  setMessages,
  onClearChat,
}) => {
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isOnline = useOnlineStatus();
  const scrollEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 144)}px`;
  }, [input]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleCopyMessage = async (msg: ChatMessage) => {
    try {
      await navigator.clipboard.writeText(msg.content);
      setCopiedId(msg.id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      // Ignore clipboard failure
    }
  };

  const handleStop = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  };

  const sendMessageText = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isStreaming) return;

    if (!isOnline) {
      setErrorBanner(t.chat.offlineNotice);
      return;
    }

    setErrorBanner(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      createdAt: Date.now(),
    };

    const assistantId = `assistant-${Date.now() + 1}`;
    const placeholderAssistant: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: Date.now() + 1,
    };

    const conversationForApi = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [...prev, userMsg, placeholderAssistant]);
    setInput('');
    setIsStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationForApi,
          language,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        const code = errPayload?.error;
        const msg =
          code === 'API_KEY_MISSING'
            ? t.chat.errorApiKey
            : errPayload?.message || t.chat.errorGeneric;
        throw new Error(msg);
      }

      if (!response.body) {
        throw new Error(t.chat.errorGeneric);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() ?? '';

        for (const eventChunk of events) {
          const line = eventChunk
            .split('\n')
            .find((l) => l.startsWith('data: '));
          if (!line) continue;

          const jsonStr = line.slice(6).trim();
          if (!jsonStr) continue;

          const parsed = JSON.parse(jsonStr) as {
            type: 'chunk' | 'done' | 'error';
            text?: string;
            message?: string;
          };

          if (parsed.type === 'chunk' && parsed.text) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + parsed.text }
                  : m
              )
            );
          } else if (parsed.type === 'error') {
            throw new Error(parsed.message || t.chat.errorGeneric);
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // Remove empty assistant placeholder if user cancelled before first token
        setMessages((prev) =>
          prev.filter((m) => !(m.id === assistantId && !m.content.trim()))
        );
      } else {
        const errMessage =
          err instanceof Error && err.message ? err.message : t.chat.errorGeneric;
        setErrorBanner(errMessage);
        setMessages((prev) =>
          prev.filter((m) => !(m.id === assistantId && !m.content.trim()))
        );
      }
    } finally {
      abortRef.current = null;
      setIsStreaming(false);
    }
  };

  const handleRetryLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    // Remove last user message so sendMessageText re-sends cleanly without duplication
    const idx = messages.findIndex((m) => m.id === lastUser.id);
    if (idx !== -1) {
      const base = messages.slice(0, idx);
      setMessages(base);
      setTimeout(() => {
        void sendMessageText(lastUser.content);
      }, 20);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessageText(input);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-10.5rem)] md:h-[calc(100dvh-8.5rem)] min-h-[460px] rounded-3xl bg-white/80 dark:bg-[#171717]/80 backdrop-blur-xl border border-black/[0.07] dark:border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden">
      {/* Chat Toolbar */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/60 dark:bg-[#171717]/60">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-[#0F0F0F] dark:text-white truncate">
            {t.chat.title}
          </h1>
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 tabular-nums whitespace-nowrap shrink-0">
            · {t.chat.messagesCountLabel(messages.length)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowClearConfirm(true)}
          disabled={messages.length === 0 || isStreaming}
          className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-[#E11D2E] hover:bg-[#E11D2E]/10 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Trash2 className="h-4 w-4 shrink-0" />
          <span>{t.chat.clearButton}</span>
        </button>
      </div>

      {/* Offline warning inside chat */}
      {!isOnline && (
        <div className="flex items-center gap-2.5 px-4 sm:px-6 py-2.5 bg-[#7F1D1D]/10 dark:bg-[#E11D2E]/15 border-b border-[#E11D2E]/20 text-xs font-medium text-[#7F1D1D] dark:text-[#FCA5A5]">
          <WifiOff className="h-4 w-4 shrink-0" />
          <span>{t.chat.offlineNotice}</span>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-5">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto py-6">
            <BrandLogo size="lg" showText={false} />
            <h2 className="mt-5 text-xl sm:text-2xl font-bold text-[#0F0F0F] dark:text-white">
              {t.chat.emptyTitle}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.chat.emptySubtitle}
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {t.chat.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void sendMessageText(suggestion)}
                  className="text-start min-h-[48px] p-4 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.03] hover:border-[#E11D2E]/45 hover:bg-[#E11D2E]/[0.03] dark:hover:bg-[#E11D2E]/[0.08] text-sm font-medium text-[#0F0F0F] dark:text-neutral-100 transition-colors cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isWaitingFirstToken =
              !isUser && isStreaming && msg.content.length === 0;

            return (
              <div
                key={msg.id}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`group relative max-w-[88%] sm:max-w-[78%] rounded-3xl px-4 sm:px-5 py-3.5 ${
                    isUser
                      ? 'bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] text-white shadow-md shadow-[#E11D2E]/20'
                      : 'bg-neutral-100/85 dark:bg-[#222222]/90 text-[#0F0F0F] dark:text-neutral-100 border border-black/[0.05] dark:border-white/[0.07]'
                  }`}
                >
                  {isUser ? (
                    <p className="text-[15px] leading-[1.65] whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  ) : isWaitingFirstToken ? (
                    <ChatSkeleton thinkingLabel={t.chat.thinking} />
                  ) : (
                    <>
                      <FormattedMessage
                        content={msg.content}
                        copyLabel={t.chat.copyMessage}
                        copiedLabel={t.chat.copied}
                      />
                      {msg.content.trim().length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(msg)}
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-[#E11D2E] transition-colors cursor-pointer py-1 px-2 rounded-lg"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                <span>{t.chat.copied}</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" />
                                <span>{t.chat.copyMessage}</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}

        {errorBanner && (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E11D2E]/30 bg-[#E11D2E]/10 px-4 py-3 text-sm text-[#7F1D1D] dark:text-[#FCA5A5]"
          >
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#E11D2E]" />
              <span>{errorBanner}</span>
            </div>
            {messages.some((m) => m.role === 'user') && !isStreaming && (
              <button
                type="button"
                onClick={handleRetryLast}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E11D2E] text-white text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{t.chat.retryButton}</span>
              </button>
            )}
          </div>
        )}

        <div ref={scrollEndRef} />
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void sendMessageText(input);
        }}
        className="p-3 sm:p-4 border-t border-black/[0.06] dark:border-white/[0.08] bg-white/75 dark:bg-[#171717]/85"
      >
        <div className="flex items-end gap-2.5 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0F0F0F] px-3.5 py-2 focus-within:border-[#E11D2E] focus-within:ring-2 focus-within:ring-[#E11D2E]/20 transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chat.placeholder}
            aria-label={t.chat.placeholder}
            disabled={isStreaming}
            className="flex-1 resize-none bg-transparent py-2 text-[15px] text-[#0F0F0F] dark:text-white placeholder:text-neutral-400 focus:outline-none max-h-36 disabled:opacity-60"
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={handleStop}
              aria-label={t.chat.stopButton}
              className="min-h-[44px] min-w-[44px] px-3.5 rounded-xl bg-[#0F0F0F] dark:bg-white text-white dark:text-[#0F0F0F] flex items-center justify-center gap-1.5 text-xs font-bold hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              <span className="hidden sm:inline">{t.chat.stopButton}</span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label={t.chat.sendButton}
              className="min-h-[44px] min-w-[44px] px-4 rounded-xl bg-gradient-to-br from-[#E11D2E] to-[#7F1D1D] text-white flex items-center justify-center gap-1.5 text-sm font-bold shadow-sm shadow-[#E11D2E]/25 hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97] transition-all shrink-0 cursor-pointer"
            >
              <Send className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">{t.chat.sendButton}</span>
            </button>
          )}
        </div>
      </form>

      <ConfirmModal
        open={showClearConfirm}
        title={t.chat.clearConfirmTitle}
        description={t.chat.clearConfirmDesc}
        confirmLabel={t.chat.confirmAction}
        cancelLabel={t.chat.cancelAction}
        onConfirm={() => {
          onClearChat();
          setErrorBanner(null);
          setShowClearConfirm(false);
        }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </div>
  );
};
