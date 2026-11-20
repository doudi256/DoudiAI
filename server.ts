import 'dotenv/config';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '2mb' }));

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_INSTRUCTIONS: Record<string, string> = {
  ar: [
    'أنت "Doudi AI" (دودي)، مساعد ذكاء اصطناعي عربي راقٍ، دقيق، وذكي.',
    'قدّم إجابات واضحة، منظمة، وعملية باللغة العربية الفصحى السلسة ما لم يطلب المستخدم لغة أو لهجة أخرى.',
    'استخدم تنسيق Markdown خفيف عند الحاجة (عناوين قصيرة، نقاط مرتبة، كتل برمجية واضحة) دون حشو أو إطالة مبالغ فيها.',
    'لا تخترع حقائق؛ إذا لم تكن متأكداً من معلومة، وضّح ذلك بأمانة ولباقة.',
  ].join(' '),
  fr: [
    'Tu es "Doudi AI", un assistant d’intelligence artificielle raffiné, précis et réactif.',
    'Réponds en français naturel, clair et structuré sauf si l’utilisateur demande une autre langue.',
    'Utilise un formatage Markdown propre (listes concises, blocs de code lisibles) sans verbosité inutile.',
  ].join(' '),
  en: [
    'You are "Doudi AI", a refined, accurate, and thoughtful AI assistant.',
    'Provide clear, well-structured, practical answers in natural English unless the user requests another language.',
    'Use clean Markdown formatting (concise lists, readable code blocks) without unnecessary filler.',
  ].join(' '),
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'doudi-ai' });
});

app.post('/api/chat', async (req, res) => {
  const body = req.body as {
    messages?: IncomingMessage[];
    language?: string;
  };

  const messages = Array.isArray(body?.messages) ? body.messages : [];
  const language =
    body?.language === 'fr' || body?.language === 'en' ? body.language : 'ar';

  const validMessages = messages.filter(
    (m) =>
      m &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.trim().length > 0
  );

  if (validMessages.length === 0) {
    res.status(400).json({
      error: 'EMPTY_MESSAGES',
      message: 'Message list cannot be empty.',
    });
    return;
  }

  const latestMessage = validMessages[validMessages.length - 1];
  if (latestMessage.role !== 'user') {
    res.status(400).json({
      error: 'INVALID_TURN',
      message: 'The latest message must be from the user.',
    });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error: 'API_KEY_MISSING',
      message: 'OpenRouter API key is not configured on the server.',
    });
    return;
  }

  const model =
    process.env.OPENROUTER_MODEL ||
    'meta-llama/llama-3.3-70b-instruct';

  const chatMessages = [
    {
      role: 'system' as const,
      content: SYSTEM_INSTRUCTIONS[language] ?? SYSTEM_INSTRUCTIONS.ar,
    },
    ...validMessages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  ];

  const abortController = new AbortController();
  let clientDisconnected = false;

  res.on('close', () => {
    if (!res.writableEnded) {
      clientDisconnected = true;
      abortController.abort();
    }
  });

  try {
    const upstream = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-OpenRouter-Title': 'Doudi AI',
        },
        body: JSON.stringify({
          model,
          messages: chatMessages,
          stream: true,
        }),
        signal: abortController.signal,
      }
    );

    if (!upstream.ok) {
      const errorDetails = await upstream.text();
      console.error('OpenRouter error:', upstream.status, errorDetails);

      if (!res.headersSent && !clientDisconnected) {
        res.status(502).json({
          error: 'OPENROUTER_ERROR',
          message: `OpenRouter request failed (HTTP ${upstream.status}). Check the API key, model availability, and account credits.`,
        });
      }
      return;
    }

    if (!upstream.body) {
      if (!clientDisconnected) {
        res.status(502).json({
          error: 'EMPTY_STREAM',
          message: 'OpenRouter returned an empty response stream.',
        });
      }
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (!clientDisconnected) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const rawLine of lines) {
          if (clientDisconnected) break;

          const line = rawLine.trim();
          if (!line.startsWith('data:')) continue;

          const data = line.slice(5).trim();
          if (!data || data === '[DONE]') continue;

          let parsed: any;
          try {
            parsed = JSON.parse(data);
          } catch {
            continue;
          }

          if (parsed?.error) {
            const providerMessage =
              typeof parsed.error.message === 'string'
                ? parsed.error.message
                : 'OpenRouter stream error';

            res.write(
              `data: ${JSON.stringify({
                type: 'error',
                message: providerMessage,
              })}\n\n`
            );
            continue;
          }

          const text = parsed?.choices?.[0]?.delta?.content;
          if (typeof text === 'string' && text.length > 0) {
            res.write(
              `data: ${JSON.stringify({ type: 'chunk', text })}\n\n`
            );
          }
        }
      }
    } finally {
      if (clientDisconnected) {
        await reader.cancel().catch(() => {});
      } else {
        reader.releaseLock();
      }
    }

    if (!clientDisconnected && !res.writableEnded) {
      res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
      res.end();
    }
  } catch (err: unknown) {
    if (clientDisconnected) return;

    console.error('OpenRouter API error:', err);

    if (!res.headersSent) {
      res.status(502).json({
        error: 'OPENROUTER_ERROR',
        message: 'Failed to contact OpenRouter. Please try again.',
      });
    } else if (!res.writableEnded) {
      res.write(
        `data: ${JSON.stringify({
          type: 'error',
          message: 'The connection to the AI provider was interrupted.',
        })}\n\n`
      );
      res.end();
    }
  }
});

async function startServer() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Doudi AI server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
