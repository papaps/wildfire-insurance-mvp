# React + Supabase Starter

A minimal full-stack app: a React (Vite) frontend backed by a single Supabase
`notes` table. Supabase provides the Postgres database **and** an auto-generated
API, so there is no backend server to write or host.

Full CRUD is wired up: list, add, and delete notes.

---

## Prerequisites

- Node.js 18+ (`node --version`)
- A free [Supabase](https://supabase.com) account
- (For deploy) a free [Netlify](https://netlify.com) account + a GitHub repo

---

## Step 1 — Create the Supabase project & table

1. Go to [supabase.com](https://supabase.com) → **New project**. Pick a name,
   a strong DB password, and a region near you. Wait ~2 min for it to spin up.
2. In the left sidebar open **SQL Editor** → **New query**.
3. Open [`supabase_setup.sql`](supabase_setup.sql) from this repo, copy its
   contents into the editor, and click **Run**. This creates the `notes` table
   and its access policies.
4. Open **Project Settings** (gear icon) → **API**. Copy two values:
   - **Project URL**
   - **anon public** key (under "Project API keys")

---

## Step 2 — Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and paste in the two values from Step 1:

```
VITE_SUPABASE_URL=https://your-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

`.env` is gitignored — it will never be committed.

---

## Step 3 — Install & run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173). Add a note — it is
saved to Postgres and re-appears after a refresh.

---

## Step 4 — Deploy the frontend to Netlify

1. Push this project to a GitHub repo.
2. On [netlify.com](https://netlify.com): **Add new site → Import an existing
   project** → pick your repo.
3. Build settings (Netlify usually auto-detects these):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Before deploying, add your env vars: **Site settings → Environment
   variables** → add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Deploy. Every future `git push` auto-deploys.

That's it — DB, API, and frontend all live, all on free tiers.

---

## Project structure

```
.
├── index.html            # Vite entry HTML
├── package.json
├── vite.config.js
├── .env.example          # template for your Supabase keys
├── supabase_setup.sql    # run once in the Supabase SQL editor
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # the notes UI + all CRUD calls
    ├── supabase.js       # Supabase client (reads env vars)
    └── index.css         # styling
```

## The table

| Column       | Type          | Default              |
| ------------ | ------------- | -------------------- |
| `id`         | `uuid`        | `gen_random_uuid()`  |
| `content`    | `text`        | —                    |
| `created_at` | `timestamptz` | `now()`              |

## Security note

The demo policies in `supabase_setup.sql` make the table fully public (anyone
with the anon key can read/write/delete). That is fine for a prototype. For a
real app, add [Supabase Auth](https://supabase.com/docs/guides/auth) and scope
the policies to `auth.uid()` so users only touch their own rows.
