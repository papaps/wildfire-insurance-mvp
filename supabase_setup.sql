-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- It creates the single "notes" table and opens it up for the demo.

-- 1. The one table
create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  created_at timestamptz not null default now()
);

-- 2. Enable Row Level Security (required before any client can touch the table)
alter table notes enable row level security;

-- 3. Demo policy: allow the public (anon) key to do everything.
--    WARNING: this makes the table fully public read/write. Fine for a
--    demo/prototype. For anything real, scope these to authenticated users.
create policy "Public can read notes"
  on notes for select
  using (true);

create policy "Public can insert notes"
  on notes for insert
  with check (true);

create policy "Public can delete notes"
  on notes for delete
  using (true);
