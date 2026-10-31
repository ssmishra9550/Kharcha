-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- One row per user. Row Level Security guarantees a user can only ever read or write their own row.

create table if not exists public.kharcha (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.kharcha enable row level security;

create policy "Users can read their own data"
  on public.kharcha for select
  using ((select auth.uid()) = user_id);

create policy "Users can insert their own data"
  on public.kharcha for insert
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own data"
  on public.kharcha for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
