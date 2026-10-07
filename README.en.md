# cosmogram-front

[Українська](README.md) · **English**

The frontend of Cosmogram, a web app that builds a natal chart, a Destiny Matrix and a Pythagorean Square from your date, place and (optionally) time of birth, with plain-language readings for each.

**Demo:** [cosmogram-front.vercel.app](https://cosmogram-front.vercel.app)

The calculations run on a separate backend (Express + MongoDB, repository `cosmogram-back`). This repository is the interface: the form, the visualisations, the dashboard and sharing.

## Features

- **No sign-up required.** Guests see their result right away; an account is only needed to keep a chart. If a guest signs up after calculating, the chart is saved automatically.
- **Natal chart.** A wheel with planets, houses and aspects, a list of positions and the balance of elements. Birth time is optional: without it the chart is cast for noon, houses and the ascendant are not shown, and the interface says so plainly.
- **Destiny Matrix.** The octagram in its classic layout with labelled positions A–H, the purpose line, ancestral programmes, and the money and relationship channels.
- **Pythagorean Square.** The classic grid (top row 1-4-7) with working numbers and the eight lines.
- **Readings for everything.** Tap any planet, aspect, arcanum, cell or line to read what it means in that exact position. Above the result there is a short summary: Sun, Moon, Ascendant, dominant element and the matrix centre.
- **Dashboard.** Saved charts, editing birth data (the backend recalculates the chart), deleting.
- **Sharing.** A public link to a chart that can be switched off, with a personalised OG preview showing the name, Sun sign and matrix centre.
- **Three languages:** Ukrainian, English, Polish.
- **Accessibility:** skip link, keyboard navigation, `aria` attributes, respect for `prefers-reduced-motion`.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript (`strict`)
- CSS Modules with design tokens in `globals.css`
- [zustand](https://github.com/pmndrs/zustand) for auth, profiles and the guest result
- [react-hook-form](https://react-hook-form.com/) + [zod](https://zod.dev/) for forms and validation
- [axios](https://axios-http.com/) for API requests with token refresh
- `next/og` for generating OG images
- A small home-grown i18n layer, no third-party library

## Running locally

You need Node.js 18+ and a running `cosmogram-back` backend.

```bash
npm install
cp .env.local.example .env.local   # then fill in your values
npm run dev
```

If the backend and the frontend want the same port locally, run the frontend on another one: `npm run dev -- -p 3001`.

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend, including the `/api` prefix |
| `NEXT_PUBLIC_SITE_URL` | The frontend's own address. Next uses it to build absolute URLs for OG tags and canonical links — without it, link previews on social networks break |

Both variables are public (`NEXT_PUBLIC_` values end up in the browser), so they must not hold secrets.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Type check (`tsc --noEmit`) |

## Project structure

```
src/
  app/          — App Router routes: home, login/register, profile, preview, share,
                  plus error/loading/not-found and opengraph-image
  components/   — components grouped by area (birth-form, cosmogram, dashboard, layout, ui…);
                  each in its own folder: Component.tsx, Component.module.css, index.ts
  hooks/        — reusable hooks
  i18n/         — UI dictionary (dictionaries.ts) and domain texts:
                  readings for planets, signs, arcana, elements and the square
  mocks/        — the example result shown on the home page
  services/     — API clients
  store/        — zustand stores
  types/        — shared types
  utils/        — utilities
```

## About the calculation methods

The backend does the calculations; the frontend only displays and explains the results.

- **Natal chart** — planetary positions from ephemerides, houses and aspects.
- **Destiny Matrix** — Natalia Ladini's method: A is the day, B the month, C the digit sum of the year, D their sum, and the centre the sum of all four; numbers above 22 are reduced by adding their digits.
- **Pythagorean Square** — the classic method with four working numbers.

The readings are descriptive, not predictive. The Destiny Matrix and the Pythagorean Square are tools for self-reflection, not scientific methods, and the app says so openly.

## Deployment

The frontend is deployed on Vercel. In production, set `NEXT_PUBLIC_API_URL` (the deployed backend) and `NEXT_PUBLIC_SITE_URL` (the frontend domain), and add the frontend domain to `CORS_ORIGINS` on the backend.

OG images run on the edge runtime: in Next 14 the Node version of `next/og` breaks the build on Windows because of how it resolves the path to its bundled font.
