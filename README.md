# Missive — premium AI chatbot frontend

A full redesign built with **Next.js 15 (App Router), TypeScript, Tailwind
CSS v4, shadcn-style components, Framer Motion, next-themes, and Lucide
icons**, wired to the "Cordial — Chat Agent with Gmail Correspondence" n8n
workflow.

## Getting started

```bash
npm install
cp .env.local.example .env.local
# edit .env.local with your n8n webhook's Production URL
npm run dev
```

Visit `http://localhost:3000`.

## Pages

- `/` — landing page (hero, trusted tech, features, workflow timeline,
  why-choose, animated stats, chat preview, Gmail automation, testimonials,
  FAQ, CTA, footer)
- `/features` — dedicated features page
- `/workflow` — dedicated pipeline/timeline page
- `/about` — project overview
- `/chat` — the chat dashboard (ChatGPT-style sidebar + chat window)

## Structure

```
app/                 routes (home, chat, features, workflow, about)
components/ui/       shadcn-style primitives (button, card, dialog, ...)
components/layout/   navbar, footer, theme toggle/provider, logo
components/home/     landing-page sections
components/chat/     sidebar, message list, markdown renderer, input, settings
hooks/               useConversations — state, persistence, API calls
lib/                 api.ts (webhook client), storage.ts (localStorage), utils.ts, site.ts
types/                shared TypeScript types
```

## Wiring to n8n

1. In n8n, activate the workflow and copy the **Production URL** of the
   `Webhook` node (path `cordial-chat`).
2. Paste it into `.env.local` as `NEXT_PUBLIC_MISSIVE_WEBHOOK_URL`.
3. The frontend POSTs `{ chatInput, userEmail, sessionId }` and expects
   `{ output }` back — this matches the workflow's `Webhook` → `AI Agent` →
   `Respond to Webhook` nodes exactly, no backend changes needed.

Each conversation in the sidebar uses its own `sessionId`, so the workflow's
`Simple Memory` node keeps each thread's context separate. "New Chat" starts
a fresh session; conversation history itself lives in the browser's
`localStorage` (the workflow has no history store of its own).

## Notes on scope / what's approximated

- **Streaming UI**: the input area has a working stop button and the chat
  window is structured to support token streaming, but the current webhook
  returns one JSON response per turn, not a stream — so replies currently
  appear all at once rather than typed out live. Swapping in a streaming
  n8n response later won't require restructuring the UI.
- **"Email sent" toast**: the workflow doesn't emit a separate
  success/failure event, so the toast fires when the assistant's reply text
  itself confirms the email was sent (matching phrases like "sent
  successfully"). If you change the agent's confirmation wording, update the
  `SENT_CONFIRMATION` regex in `app/chat/page.tsx`.
- **Auth, Supabase, file uploads, voice input**: not implemented — the spec
  listed these as future compatibility targets. The folder structure and
  the `useConversations` hook are deliberately factored so a real backend
  or auth layer can be dropped in later without a rewrite.
- Code blocks in assistant replies get `rehype-highlight`'s structural
  classes, but no syntax-color theme is bundled (so highlighting is
  structural, not colorized) to avoid hardcoding a theme that fights
  light/dark mode. Drop in a highlight.js theme file if you want colorized
  code.

## Git ignore and local env files

A `.gitignore` has been added to exclude build artifacts, dependencies, and local environment files that should not be committed. Common ignored entries include:

- `node_modules/`
- `.next/`, `out/`, `build/`
- `.env.local` and other `*.env.*.local` files (local secrets)
- `.vercel/`, `.cache/`, `coverage/`, `dist/`
- Editor and OS files such as `.vscode/`, `.idea/`, `.DS_Store`

Do NOT commit `.env.local` or any files containing secrets. Use the provided `.env.local.example` as a template and keep your local values in `.env.local` (it is ignored by `.gitignore`).

If you'd like anything else added to `.gitignore` (e.g., specific IDE folders, local tooling caches), say which tools are in use and they will be added.
