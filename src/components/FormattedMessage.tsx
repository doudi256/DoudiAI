import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface FormattedMessageProps {
  content: string;
  copyLabel: string;
  copiedLabel: string;
}

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          dir="ltr"
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-black/[0.06] dark:bg-white/[0.1] text-[#B91C1C] dark:text-[#FCA5A5] text-[0.85em]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-bold text-[#0F0F0F] dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({
  content,
  copyLabel,
  copiedLabel,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const blocks = content.split(/(```[\s\S]*?```)/g);

  const handleCopyCode = async (codeText: string, index: number) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1600);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <div className="space-y-3 text-[15px] leading-[1.7] break-words">
      {blocks.map((block, bIdx) => {
        if (block.startsWith('```') && block.endsWith('```')) {
          const inner = block.slice(3, -3);
          const firstNewline = inner.indexOf('\n');
          const lang =
            firstNewline > -1 ? inner.slice(0, firstNewline).trim() : '';
          const code =
            firstNewline > -1 ? inner.slice(firstNewline + 1) : inner;

          return (
            <div
              key={bIdx}
              dir="ltr"
              className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#141414] text-neutral-100 my-2"
            >
              <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.08] text-xs text-neutral-400">
                <span className="font-mono">{lang || 'code'}</span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(code, bIdx)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 text-neutral-300 transition-colors cursor-pointer"
                >
                  {copiedIndex === bIdx ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{copiedLabel}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>{copyLabel}</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 overflow-x-auto text-[13px] leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        const lines = block
          .split('\n')
          .map((l) => l.trimEnd())
          .filter((l, i, arr) => !(l === '' && arr[i - 1] === ''));

        if (lines.length === 0) return null;

        return (
          <div key={bIdx} className="space-y-2">
            {lines.map((line, lIdx) => {
              if (!line.trim()) {
                return <div key={lIdx} className="h-1" />;
              }
              if (line.startsWith('### ')) {
                return (
                  <h4
                    key={lIdx}
                    className="text-base font-bold text-[#0F0F0F] dark:text-white pt-1"
                  >
                    {renderInline(line.slice(4))}
                  </h4>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h3
                    key={lIdx}
                    className="text-lg font-bold text-[#0F0F0F] dark:text-white pt-1"
                  >
                    {renderInline(line.slice(3))}
                  </h3>
                );
              }
              if (/^[-*•]\s+/.test(line)) {
                return (
                  <div key={lIdx} className="flex items-start gap-2.5 ps-1">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#E11D2E] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="flex-1">
                      {renderInline(line.replace(/^[-*•]\s+/, ''))}
                    </span>
                  </div>
                );
              }
              if (/^\d+[.)]\s+/.test(line)) {
                const match = line.match(/^(\d+[.)])\s+(.*)$/);
                if (match) {
                  return (
                    <div key={lIdx} className="flex items-start gap-2 ps-1">
                      <span className="font-bold text-[#E11D2E] tabular-nums shrink-0">
                        {match[1]}
                      </span>
                      <span className="flex-1">{renderInline(match[2])}</span>
                    </div>
                  );
                }
              }
              return <p key={lIdx}>{renderInline(line)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
};
