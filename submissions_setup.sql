-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Allows the public (anon) key used by the app to insert rows into
-- "submissions" -- required because the table has Row Level Security
-- enabled with no policies yet, which blocks all access by default.

create policy "Public can insert submissions"
  on submissions for insert
  with check (true);

-- Optional: only add this if the app needs to read submissions back
-- (e.g. to show a confirmation or history screen).
-- create policy "Public can read submissions"
--   on submissions for select
--   using (true);
