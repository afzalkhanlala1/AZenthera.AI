# AZenthera AI — Website

Marketing / portfolio site for **AZenthera AI**, a remote-first AI engineering studio. Built with Next.js (App Router) and exported as a fully static site, deployed to GitHub Pages at [azentheraai.com](https://azentheraai.com).

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (theme defined inline in `src/app/globals.css`, no `tailwind.config.js`)
- **Framer Motion** for animation
- **next/font** — Geist Sans, Geist Mono, Instrument Serif
- Static export (`output: "export"`) → deployed via GitHub Pages

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Static export to `./out` |
| `npm run start` | Serve a production build locally |
| `npm run lint` | Run ESLint |

## Project structure

- `src/lib/data.ts` — **all site content** (services, case studies, industries, team, testimonials, etc.). Most content edits happen here.
- `src/app/` — App Router pages (home, services, case-studies, industries, about, contact).
- `src/components/` — UI components, including `sections/` for homepage/about sections and the page templates.
- `src/app/globals.css` — design system: color tokens (light/dark), fonts, custom utilities.
- `public/CNAME` — custom domain for GitHub Pages.

## Documentation

- [`business.md`](./business.md) — all business / content information.
- [`tech.md`](./tech.md) — all technical details and architecture.

> These two files are the source of truth for rebuilding the site. Keep them in sync when content or code changes.

## Configuration

- **Contact form** posts to FormSubmit.co by default. Override the endpoint with the `NEXT_PUBLIC_CONTACT_ENDPOINT` environment variable.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages.
