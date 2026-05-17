-- gwimap MVP schema (Supabase Postgres)

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'fear_level') then
    create type fear_level as enum ('1', '2', '3', '4', '5');
  end if;
end $$;

create table if not exists public.spots (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  lat double precision not null,
  lng double precision not null,
  fear_level fear_level not null default '1',
  categories text[] not null default '{}',
  representative_image_url text,
  report_count integer not null default 0 check (report_count >= 0),
  status text not null default 'active' check (status in ('active', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  spot_id uuid not null references public.spots(id) on delete cascade,
  title text not null check (char_length(title) between 2 and 80),
  content text not null check (char_length(content) between 10 and 2000),
  fear_level fear_level not null,
  category text not null check (category in ('sighting', 'sound', 'presence', 'other')),
  occurred_at_hour smallint check (occurred_at_hour between 0 and 23),
  image_url text,
  is_anonymous boolean not null default true,
  moderation_status text not null default 'visible' check (moderation_status in ('visible', 'flagged', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.report_flags (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  reason text not null check (reason in ('defamation', 'false_info', 'abuse', 'other')),
  detail text,
  created_at timestamptz not null default now()
);

create index if not exists idx_spots_lat_lng on public.spots (lat, lng);
create index if not exists idx_spots_status on public.spots (status);
create index if not exists idx_reports_spot_id_created_at on public.reports (spot_id, created_at desc);
create index if not exists idx_reports_moderation_status on public.reports (moderation_status);
create index if not exists idx_report_flags_report_id on public.report_flags (report_id);

create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_spots_updated_at on public.spots;
create trigger trg_spots_updated_at
before update on public.spots
for each row
execute function public.handle_updated_at();

drop trigger if exists trg_reports_updated_at on public.reports;
create trigger trg_reports_updated_at
before update on public.reports
for each row
execute function public.handle_updated_at();

create or replace function public.increment_spot_report_count()
returns trigger as $$
begin
  update public.spots
  set report_count = report_count + 1
  where id = new.spot_id;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_reports_increment_count on public.reports;
create trigger trg_reports_increment_count
after insert on public.reports
for each row
execute function public.increment_spot_report_count();

alter table public.spots enable row level security;
alter table public.reports enable row level security;
alter table public.report_flags enable row level security;

drop policy if exists spots_select_active on public.spots;
create policy spots_select_active
on public.spots for select
using (status = 'active');

drop policy if exists reports_select_visible on public.reports;
create policy reports_select_visible
on public.reports for select
using (moderation_status = 'visible');

drop policy if exists reports_insert_anon on public.reports;
create policy reports_insert_anon
on public.reports for insert
with check (true);

drop policy if exists report_flags_insert_open on public.report_flags;
create policy report_flags_insert_open
on public.report_flags for insert
with check (true);
