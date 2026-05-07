-- The Blank Page — Supabase Schema
-- Run this in the Supabase SQL editor after creating a new project.

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ── writing_sessions ──────────────────────────────────────────────────────
create table public.writing_sessions (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  prompt_id        text not null,
  prompt_text      text not null,
  genre            text not null,
  body             text not null,
  word_count       integer not null check (word_count >= 10),
  duration_seconds integer not null default 0,
  created_at       timestamptz not null default now()
);

-- ── streaks ───────────────────────────────────────────────────────────────
create table public.streaks (
  user_id           uuid primary key references auth.users(id) on delete cascade,
  current_streak    integer not null default 0,
  longest_streak    integer not null default 0,
  last_written_date date,
  total_sessions    integer not null default 0
);

-- ── Indexes ───────────────────────────────────────────────────────────────
create index writing_sessions_user_id_idx on public.writing_sessions(user_id);
create index writing_sessions_created_at_idx on public.writing_sessions(created_at desc);
create index writing_sessions_genre_idx on public.writing_sessions(genre);

-- ── Row Level Security ────────────────────────────────────────────────────
alter table public.writing_sessions enable row level security;
alter table public.streaks enable row level security;

-- writing_sessions policies
create policy "own sessions select"
  on public.writing_sessions for select
  using (auth.uid() = user_id);

create policy "own sessions insert"
  on public.writing_sessions for insert
  with check (auth.uid() = user_id);

create policy "own sessions update"
  on public.writing_sessions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "own sessions delete"
  on public.writing_sessions for delete
  using (auth.uid() = user_id);

-- streaks policies
create policy "own streak select"
  on public.streaks for select
  using (auth.uid() = user_id);

create policy "own streak insert"
  on public.streaks for insert
  with check (auth.uid() = user_id);

create policy "own streak update"
  on public.streaks for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
-- No delete policy on streaks — cascade from auth.users handles cleanup.
