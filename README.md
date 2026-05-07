# The Blank Page

A daily creative writing prompt engine. Show up every day. Write something real.

**Stack:** Vite + React + TypeScript · Tailwind CSS · Supabase · Vercel

---

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url> the-blank-page
cd the-blank-page
npm install
```

### 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL editor, run the contents of `supabase/schema.sql`
3. In **Authentication → Email Templates**, configure your magic link email if desired
4. In **Authentication → URL Configuration**, add your production URL to "Site URL" and redirect URLs

### 3. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials from the project dashboard (Settings → API):

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run locally

```bash
npm run dev
```

---

## Deploy to Vercel

1. Push the repo to GitHub
2. Connect the repo in the [Vercel dashboard](https://vercel.com/new)
3. Add the two environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in Vercel project settings
4. Deploy — `vercel.json` handles SPA routing automatically

---

## Features

- **Daily prompts** — 120 prompts across 10 genres, rotated deterministically by date
- **Guest mode** — write without an account; sessions saved to localStorage
- **Streak tracking** — one session per calendar day = streak continues
- **Focus mode** — Cmd/Ctrl+Shift+F to hide all UI except the textarea
- **Personal archive** — all sessions saved, filterable by genre
- **Auth** — email/password + magic link via Supabase

## Project structure

```
src/
├── components/        # UI components by domain
│   ├── auth/         # AuthModal, AuthForm
│   ├── layout/       # Layout, Navbar, Footer
│   ├── writing/      # PromptCard, WritingArea, GenreFilter, etc.
│   ├── archive/      # SessionGrid, SessionCard, SessionViewModal
│   ├── home/         # Hero, GenreShowcase, FeatureList
│   └── ui/           # Modal, Toast, ToastContainer
├── contexts/         # AuthContext, ToastContext
├── hooks/            # useAuth, useWritingSession, useStreak, etc.
├── lib/              # prompts.ts, promptUtils.ts, streakUtils.ts, supabase.ts
├── pages/            # Home, Write, Archive, About
├── styles/           # globals.css, typography.css, components.css, animations.css
└── types/            # Shared TypeScript interfaces
supabase/
└── schema.sql        # Run this in Supabase SQL editor
```
# prompts
