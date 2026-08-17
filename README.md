# 5i Traders — Algorithmic Forex Trading Website

A single-page marketing site with a lead-capture form, auto-scrolling testimonial
marquee, pricing, and a password-protected admin dashboard for managing leads —
built with React (Vite), Tailwind CSS, Framer Motion, and Supabase.

## Tech stack

- **Frontend:** React 18 + Vite, Tailwind CSS, Framer Motion, React Router, lucide-react icons
- **Backend:** Supabase (Postgres + Auth + Row Level Security)
- **Hosting:** any static host for the frontend (Vercel/Netlify), Supabase Cloud for the backend

## 1. Install dependencies

```bash
npm install
```

## 2. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. Once it's provisioned, open **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key

## 3. Run the database migration

1. In the Supabase dashboard, open the **SQL Editor**.
2. Paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and run it.

This creates:

- `leads` — trial/contact form submissions
- `lead_notes` — admin follow-up notes, linked to a lead
- `reviews` — testimonials shown in the homepage marquee (seeded with 3 sample rows)

...and sets up Row Level Security so that:

- Anyone can **insert** into `leads` (the public trial form) but **cannot read leads back**.
- Anyone can **read** `reviews` (for the public marquee).
- Only **authenticated admin users** can read/write `leads`, `lead_notes`, and manage `reviews`.

## 4. Create an admin account

Admin accounts are **not** created through public sign-up. In the Supabase dashboard:

**Authentication → Users → Add user** → enter an email + password.

That account can then sign in at `/admin/login` to reach `/admin/dashboard`.

## 5. Add environment variables

```bash
cp .env.example .env
```

Fill in the two values from step 2:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## 6. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173`.

## 7. Deploying

**Frontend (Vercel or Netlify):**

1. Push this repo to GitHub.
2. Import it into Vercel/Netlify.
3. Set the build command to `npm run build` and output directory to `dist`.
4. Add the same two env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in the host's
   environment variable settings.
5. Deploy.

**Backend:** nothing to deploy — Supabase is already hosted. Just make sure the SQL
migration and admin account (steps 3–4) are done on the production project.

## Adding your own assets

The logo is already wired in (`src/assets/logo/logo.png`, used in `Header.jsx` and
`Footer.jsx`) — its blue/cyan tone is what the whole accent palette (`signal` in
`tailwind.config.js`) is built around. Testimonials and team photos are still
placeholders for you to drop in:

| Asset | Where it's referenced | Suggested path |
|---|---|---|
| Logo | `src/components/Header.jsx`, `src/components/Footer.jsx` — already in place | `src/assets/logo/logo.png` |
| Profit screenshots | `src/components/ProofSection.jsx` (`SCREENSHOT_LABELS` array + placeholder grid) | `src/assets/proof/` |
| Team photos | `src/components/Experts.jsx` (`EXPERTS` array + placeholder circles) | `src/assets/team/` |
| Reviews | `reviews` table in Supabase (preferred), or edit the fallback array in `src/data/reviews.js` | — |

To swap a placeholder for a real image: import the file at the top of the component
(e.g. `import shot1 from '../assets/proof/screenshot-1.png'`) and replace the
`PlaceholderSlot` usage with an `<img src={shot1} alt="..." className="..." />`,
keeping the existing sizing classes so the layout doesn't shift.

## Color palette

The accent color is driven off the logo and defined once in `tailwind.config.js`
under `colors.signal` (`#2FA8FF`, an electric blue). To retint the whole site, edit
that token — every `bg-signal`, `text-signal`, and `border-signal` class picks it up
automatically. A couple of hard-coded glow/shadow values (in `Hero.jsx`, `Pricing.jsx`,
and `index.css`) use the same blue as an RGBA shadow color and would need updating
separately if you change the accent.

## Project structure

```
src/
  components/       Reusable UI + section components
  pages/            Home, AdminLogin, AdminDashboard
  lib/               supabaseClient.js, scroll helper
  data/              Static fallback data (reviews, pricing)
  assets/            Drop logo / screenshots / team photos here
supabase/
  schema.sql         Full DB schema + RLS policies
```

## Notes

- The testimonial marquee reads from the `reviews` table and falls back to
  `src/data/reviews.js` if the table is empty or unreachable.
- The lead form only ever **inserts** into `leads` — it has no read access, so form
  submissions never leak other people's data even though the anon key is public.
- Admin dashboard route (`/admin/dashboard`) redirects to `/admin/login` if there's no
  active Supabase session.
