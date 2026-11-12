# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — dev server (Next.js with Turbopack) at http://localhost:3000
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `next/core-web-vitals` + `next/typescript`)

There is no test suite.

## Architecture

Single-page personal portfolio (iOS developer) built on Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, and Framer Motion. Path alias `@/` maps to the repo root.

**Data flow:** [app/page.tsx](app/page.tsx) is an async Server Component that calls `getProfileDetails()` ([lib/services/profile.ts](lib/services/profile.ts)), which reads the Firestore doc `ProfileDetails/MyDetail` (`heroSection` stats + `skillsSection` list). The result is passed as `initialData` / `initialSkills` props to the hero and skills client components. The service returns `null` on any failure, so those components must keep local fallback values (see `components/hero/index.tsx` and `components/skills/constants.tsx`). Changing the shape of the Firestore doc means updating the interfaces in `profile.ts` and those fallbacks.

**Firebase:** [lib/firebase.ts](lib/firebase.ts) initializes a singleton app with Firestore and Realtime Database; Analytics is initialized lazily and browser-only via `initAnalytics()`. The config is hardcoded (no env vars).

**Analytics:** [lib/analytics.ts](lib/analytics.ts) `trackEvent()` writes each event to both Firebase Analytics and Realtime Database, keyed by a visitor ID persisted in `localStorage`. `components/AnalyticsTracker.tsx` handles page-navigation tracking; interactive components (contact dialog, skill modal, resume modal) call `trackEvent` directly.

**Other:** `app/layout.tsx` holds SEO metadata and JSON-LD; `app/robots.ts` and `app/sitemap.ts` hardcode the production domain; `app/api/hello/route.ts` is the only API route. The resume PDF lives in `public/` (`Bandan_Kumar_Mahto_Resume.pdf`). `components/AppShowcase.tsx` exists but is currently commented out in the page. `TEMPLATE_INFO.md` is leftover template documentation.

**Theming:** light/dark is driven by `data-theme` on `<html>`. An inline script in `app/layout.tsx` sets it before paint (saved choice in `localStorage`, else the system preference); `lib/theme.ts` + `components/ThemeToggle.tsx` handle switching. Tailwind is configured CSS-first in `app/globals.css` (`@theme`, no `tailwind.config.ts`): the `gray`, `white` and key accent shades point at CSS variables whose values swap per theme, so components keep writing e.g. `text-gray-400` and it adapts. Use `text-onaccent` for text on solid accent buttons so it stays white in both themes. Tailwind 4's default palette is more saturated than v3, so the v3 shades the design uses are pinned in `@theme`.

**Experience:** `components/experience/data.ts` holds roles as start/end `{year, month}` (omit `end` for the current job) plus certifications, whose proof files live in `public/certificates/`. `lib/experience.ts` derives period labels, durations and the hero "Years of Experience" stat from those dates (inclusive months, overlaps counted once). `app/page.tsx` passes the server time down so server and client render the same values; the Firestore `experience` field is ignored.

## Conventions

- Source files use tab indentation (match the surrounding file).
- TypeScript is pinned to 6.0.x: `typescript-eslint` doesn't support TS 7 yet, which breaks `npm run lint`. Revisit when it does.
