# createdinua.org

Ukrainian cinema in Israel cultural initiative website. Rebuilt from Framer to custom stack for $0/month hosting.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + Payload CMS 3 (embedded)
- **Database:** SQLite (`file:./db/payload.db`)
- **Styling:** Tailwind CSS v4 + CSS custom properties (design tokens)
- **i18n:** next-intl with `[locale]` routing
- **Font:** Mariupol (woff files in `public/fonts/mariupol/`)
- **Hosting:** Vercel (free tier)

## Project Structure

```
src/
  app/
    (frontend)/          # Public site
      [locale]/          # i18n routes (uk, en, he)
        layout.tsx       # Root layout with RTL support
        page.tsx         # Homepage
        schedule/        # Screenings by date
        catalog/         # Movie grid
        movie/[slug]/    # Movie detail
        about/           # About page
      tokens.css         # Design tokens (single source of truth)
      globals.css        # @font-face, Tailwind, base styles
    (payload)/           # Payload admin + API
      admin/             # Admin panel
      api/               # REST API + seed endpoint
  collections/           # Payload collections: Movie, Screening, Place, Users, Media
  globals/               # Payload globals: Announcement, SiteSettings
  components/            # React components
  i18n/                  # Routing config, localized pathnames
  lib/                   # Data fetching helpers (payload.ts)
  messages/              # Translation JSON files (uk, en, he)
```

## Design System

- All tokens live in `src/app/(frontend)/tokens.css` — this is the single source of truth
- Token names map 1:1 to Figma variables (file key: `d36HfZBw9o0JLzKYyZw3CA`)
- Brand colors: primary `#33B5FF` (blue), accent `#FFD700` (gold)
- Use semantic token vars (`var(--color-primary)`) in components, not raw Tailwind classes
- `globals.css` maps tokens to Tailwind `@theme` for utility class usage

## i18n

- Locales: `uk` (default), `en`, `he`
- Hebrew (`he`) is RTL — layout uses `dir="rtl"` on `<html>`
- Payload fields use `localized: true` for CMS content
- URL paths are localized (e.g., `/uk/afisha`, `/en/schedule`, `/he/schedule`)

## Commands

- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run generate:types` — Regenerate Payload types
- Seed data: `POST /api/seed` (creates sample movies, screenings, places)

## Git

- Author: `ctesic <ctesic@users.noreply.github.com>`
- Do not commit: `db/`, `payload-types.ts`, `importMap.js`, `.env`

## Key Decisions

- Payload CMS chosen over Sanity for less vendor lock-in
- SQLite chosen for simplicity and free Vercel deployment (no external DB)
- CSS custom properties as tokens (not Tailwind config) for Figma 1:1 mapping
- Mariupol font for Ukrainian identity branding
