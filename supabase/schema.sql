-- =========================================================
-- 5i Traders — Supabase schema + Row Level Security policies
-- Run this in the Supabase SQL Editor (or via `supabase db push`)
-- =========================================================

-- Needed for gen_random_uuid()
create extension if not exists pgcrypto;

-- ---------------------------------------------------------
-- leads: trial/contact form submissions
-- ---------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  city text not null,
  note text,
  plan_interest text,
  service_interest text,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'interested', 'converted', 'not interested')),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- ---------------------------------------------------------
-- leads: additional columns for Course + Influencer Management flows
-- (safe to re-run — each statement is a no-op if the column already exists)
-- ---------------------------------------------------------
alter table public.leads add column if not exists course_type text;
alter table public.leads add column if not exists algo_addon boolean not null default false;
alter table public.leads add column if not exists course_amount numeric;
alter table public.leads add column if not exists wants_google_meet boolean not null default false;
alter table public.leads add column if not exists google_meet_link text;

-- ---------------------------------------------------------
-- lead_notes: admin follow-up notes, one-to-many per lead
-- ---------------------------------------------------------
create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_notes_lead_id_idx on public.lead_notes (lead_id);

-- ---------------------------------------------------------
-- reviews: testimonials shown in the homepage marquee
-- ---------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  created_at timestamptz not null default now()
);

-- =========================================================
-- Row Level Security
-- =========================================================

alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.reviews enable row level security;

-- ---- leads -------------------------------------------------
-- Public (anon) can INSERT only — the trial form — and cannot read rows back.
drop policy if exists "public can submit leads" on public.leads;
create policy "public can submit leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- Authenticated admins get full read/write access.
drop policy if exists "admins manage leads" on public.leads;
create policy "admins manage leads"
  on public.leads
  for all
  to authenticated
  using (true)
  with check (true);

-- ---- lead_notes ---------------------------------------------
-- Only authenticated admins may read or write follow-up notes.
drop policy if exists "admins manage lead notes" on public.lead_notes;
create policy "admins manage lead notes"
  on public.lead_notes
  for all
  to authenticated
  using (true)
  with check (true);

-- ---- reviews --------------------------------------------------
-- Public (anon + authenticated) can read reviews for the homepage marquee.
drop policy if exists "public can read reviews" on public.reviews;
create policy "public can read reviews"
  on public.reviews
  for select
  to anon, authenticated
  using (true);

-- Only authenticated admins may create/update/delete reviews.
drop policy if exists "admins manage reviews" on public.reviews;
create policy "admins manage reviews"
  on public.reviews
  for insert
  to authenticated
  with check (true);

drop policy if exists "admins update reviews" on public.reviews;
create policy "admins update reviews"
  on public.reviews
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "admins delete reviews" on public.reviews;
create policy "admins delete reviews"
  on public.reviews
  for delete
  to authenticated
  using (true);


