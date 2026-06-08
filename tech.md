# AZenthera AI — Technical Reference

> Single source of truth for **all technical details** of the AZenthera AI website.
> Together with `business.md`, this file should be enough to **rebuild the site from scratch**.
>
> **Maintenance rule:** Whenever code, structure, dependencies, config, design tokens, or build/deploy setup changes, update this file in the same change.

---

## 1. Stack overview

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js (App Router) | `16.1.6` |
| UI library | React + React DOM | `19.2.3` |
| Language | TypeScript | `^5` |
| Styling | Tailwind CSS v4 (via PostCSS plugin) | `^4` |
| Animation | `framer-motion` / `motion` | `^12.38.0` |
| Voice (live) | `@elevenlabs/react` (Conversational AI) | `^1.6.4` |
| HTML parsing | `cheerio` (site inspection) | `^1.2.0` |
| LLM (optional) | `openai` (inspect summarization) | `^6.x` |
| Rate limiting (optional) | `@upstash/ratelimit` + `@upstash/redis` | `^2.x` / `^1.x` |
| Script runner | `tsx` (dev dep, for the audio script) | — |
| Fonts | `next/font/google` — Geist Sans, Geist Mono, Instrument Serif | — |
| Linting | ESLint + `eslint-config-next` | `^9` / `16.1.6` |
| Hosting | **Vercel** (server runtime for API routes) | — |
| Package manager | npm (uses `package-lock.json`) | — |

**Project type:** server-rendered marketing site on **Vercel**. Most content is hardcoded in TypeScript (`src/lib/data.ts`, `src/lib/voiceAgents.ts`) and pages are static/SSG, but there are now two dynamic API routes (`/api/inspect`, `/api/voice/token`) powering the Voice Agents "Try it yourself" feature.

> History: this was previously a fully static export (`output: "export"`) on GitHub Pages. It was migrated to Vercel because the live voice trial needs a server (secret keys, signed-URL minting, SSRF-safe site fetching, rate limiting).

---

## 2. Commands

```bash
npm install        # install deps
npm run dev        # dev server (Next + Turbopack) at http://localhost:3000
npm run build      # production build (server + SSG)
npm run start      # serve the production build
npm run lint       # eslint
npm run gen:audio  # (one-time) generate demo voice clips via ElevenLabs TTS — needs ELEVENLABS_API_KEY
```

---

## 3. Configuration files

### `next.config.ts`
```ts
const nextConfig: NextConfig = {
  trailingSlash: true,     // canonical URLs with trailing slash
};
```
> `output: "export"` and `images.unoptimized` were removed during the Vercel migration so API routes run.
> Note: with `trailingSlash: true`, POSTs to `/api/x` 308-redirect to `/api/x/` (preserved method+body). Client `fetch` calls therefore target the trailing-slash URLs (`/api/inspect/`, `/api/voice/token/`) to skip the redirect hop.

### `tsconfig.json` (key bits)
- `strict: true`, `target: ES2017`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `noEmit: true`.
- Path alias: **`@/*` → `./src/*`** (used everywhere, e.g. `@/lib/data`, `@/components/...`).

### `postcss.config.mjs`
- Single plugin: `@tailwindcss/postcss` (Tailwind v4 style — no `tailwind.config.js`; theme is defined inline in CSS).

### `eslint.config.mjs`
- Flat config extending `next/core-web-vitals` + `next/typescript`.

### `.gitignore`
- Standard Next.js ignores (`/node_modules`, `/.next/`, `/out/`, env files, etc.).

---

## 4. Directory structure

```
AZenthera.AI/
├── public/
│   ├── (svgs)                     # next.svg, vercel.svg, etc.
│   └── voice/
│       ├── scenes/                # demo scene imagery (reception/caller/calendar/…png)
│       └── audio/<slug>/<n>.mp3   # generated demo audio (gitignored until generated)
├── scripts/
│   └── generate-demo-audio.ts     # one-time ElevenLabs TTS for demo clips (npm run gen:audio)
├── src/
│   ├── app/                       # App Router pages
│   │   ├── layout.tsx             # root layout (fonts, metadata, Navbar/Footer, ThemeProvider)
│   │   ├── globals.css            # design system (Tailwind v4 + CSS vars + utilities + orb keyframes)
│   │   ├── page.tsx               # homepage
│   │   ├── about/ contact/ industries/ case-studies/   # (as before)
│   │   ├── services/
│   │   │   ├── page.tsx           # index (lists 8 services)
│   │   │   ├── <slug>/page.tsx    # 8 service detail pages
│   │   │   └── ai-agents/
│   │   │       ├── page.tsx       # service page + <VoiceAgentsPromo/>
│   │   │       └── voice/
│   │   │           ├── page.tsx           # Voice Agents index
│   │   │           └── [slug]/page.tsx    # voice agent detail (generateStaticParams)
│   │   └── api/                   # SERVER routes (Node runtime)
│   │       ├── inspect/route.ts           # POST: SSRF-safe site inspection
│   │       └── voice/token/route.ts       # POST: ElevenLabs signed-URL minting
│   ├── components/
│   │   ├── Navbar.tsx  Footer.tsx  ThemeProvider.tsx  ThemeToggle.tsx
│   │   ├── PageHero.tsx  SectionHeading.tsx  Button.tsx  AnimatedSection.tsx
│   │   ├── ServiceCard.tsx  CaseStudyCard.tsx
│   │   ├── ServicePageTemplate.tsx   # now accepts optional `extraSection` slot
│   │   ├── CaseStudyPageTemplate.tsx
│   │   ├── sections/             # homepage + about sections (Hero, ServicesGrid, …)
│   │   └── voice/                # Voice Agents feature
│   │       ├── AgentOrb.tsx               # shared CSS/SVG voice visualizer
│   │       ├── VoiceAgentCard.tsx         # catalog card
│   │       ├── VoiceAgentsGrid.tsx        # catalog grid
│   │       ├── VoiceAgentsPromo.tsx       # promo block for the AI Agents page
│   │       ├── VoiceAgentDetail.tsx       # detail page (lazy-loads LiveTrial, ssr:false)
│   │       ├── DemoSimulationPlayer.tsx   # pre-recorded animated demo
│   │       └── LiveTrial.tsx              # live ElevenLabs call (ConversationProvider)
│   └── lib/
│       ├── data.ts               # core site content + interfaces
│       ├── voiceAgents.ts        # voice agent catalog + demo scripts + personas
│       └── rateLimit.ts          # Upstash-or-in-memory rate limiter + clientIp
├── .env.example                  # documents required env vars
├── business.md  tech.md          # references (keep in sync)
├── next.config.ts, tsconfig.json, postcss.config.mjs, eslint.config.mjs
├── package.json, package-lock.json
└── README.md                     # project-specific
```

---

## 5. Content model (`src/lib/data.ts`)

The whole site is **data-driven from one file.** It exports typed arrays and helper lookups; pages/components import and render them. To change site content, edit this file (no JSX edits needed for most copy).

**Interfaces:** `NavLink`, `Service`, `Industry`, `CaseStudy`, `CaseStudyResult`, `ProcessStep`, `Stat`, `Testimonial`, `TechStackCategory`, `WhyChooseUsItem`, `FooterLinkGroup`, `TeamMember`.

**Exported data:** `navLinks`, `services` (8), `industries` (10), `caseStudies` (6), `processSteps` (5), `stats` (4), `testimonials` (5), `techStack` (6 categories), `whyChooseUs` (4), `team` (2), `footerLinks` (3 groups).

**Helpers:** `getServiceBySlug(slug)`, `getCaseStudyBySlug(slug)`.

> The `Service`/`CaseStudy` `slug` fields drive routing: service detail pages call `getServiceBySlug("<slug>")`; the case-study dynamic route uses `generateStaticParams()` over `caseStudies`.

### Voice agent content (`src/lib/voiceAgents.ts`)
Separate file so `data.ts` stays lean. Exports `voiceAgents` (5) + `getVoiceAgentBySlug`. The `VoiceAgent` interface includes: `slug, name, tagline, icon, accent, summary, details, capabilities[], idealFor[], specs[]`, plus:
- `persona` / `firstMessage` — templates for the LIVE agent, using `{{businessName}}`, `{{businessSummary}}`, `{{services}}`, `{{sourceUrl}}` (filled from the inspected site).
- `demo` — `{ scenario, context, turns[] }`, each turn `{ speaker, text, audioSrc, scene }`. `scene` keys an image in `public/voice/scenes/<scene>.png`; `audioSrc` points at `public/voice/audio/<slug>/<n>.mp3`.

### Tech stack categories (shown on site, `techStack`)
- **AI & LLMs:** LangChain, LlamaIndex, OpenAI, Anthropic, Gemini, Google ADK, n8n, Ollama
- **ML & Deep Learning:** PyTorch, TensorFlow, Hugging Face, YOLOv9-v11, Whisper, scikit-learn
- **Vision & Edge:** OpenCV, TensorRT, ONNX, NVIDIA Jetson, ARM64, CUDA, GOTURN
- **Cloud & MLOps:** Docker, Kubernetes, FastAPI, Firebase, Cloud Run, AWS Glue, Azure Synapse, Microsoft Fabric, MLflow
- **Data & Analytics:** PostgreSQL, SQL Server, Vector DB, Tableau, Power BI, Pandas, ETL
- **Development:** Python, C++, Node.js, React, Qt, REST APIs, Git

---

## 6. Routing

- App Router. Pages are Static/SSG; the two `/api/*` handlers are dynamic server functions.
- **Service detail pages:** one explicit folder per slug under `src/app/services/<slug>/page.tsx`, each exporting `metadata` and rendering `<ServicePageTemplate service={getServiceBySlug("<slug>")} />`. Calls `notFound()` if the slug isn't in `data.ts`.
- **Case study detail pages:** dynamic `src/app/case-studies/[slug]/page.tsx`:
  - `generateStaticParams()` returns every `caseStudies[].slug`.
  - `generateMetadata()` builds title/description from the case study.
  - Renders `<CaseStudyPageTemplate />`.
- **Voice Agents:** `/services/ai-agents/voice` (index) + dynamic `voice/[slug]` (SSG via `generateStaticParams` over `voiceAgents`).
- **API routes:** `/api/inspect` and `/api/voice/token` are dynamic server functions (Node runtime), not statically rendered.
- `params` is a `Promise` (Next 15+ convention) and is `await`ed.

---

## 7. Theming (light/dark)

- `ThemeProvider` (`src/components/ThemeProvider.tsx`): React context, `theme` state defaulting to `"dark"`, persisted in `localStorage` under key `"theme"`, applied by toggling `light`/`dark` class on `<html>`.
- `layout.tsx` sets `<html className="dark" suppressHydrationWarning>` and injects an inline `<head>` script that reads `localStorage.theme` and applies it **before paint** (prevents theme flash / FOUC).
- `ThemeToggle` flips the theme via the context.
- Colors are **CSS custom properties** defined in `globals.css` for `:root` (light) and `.dark` (dark), then mapped to Tailwind theme tokens via `@theme inline`.

---

## 8. Design system (`src/app/globals.css`)

Tailwind v4 imported via `@import "tailwindcss";`. Dark variant declared with `@variant dark (&:is(.dark, .dark *))`. No `tailwind.config.js` — theme tokens are mapped inline with `@theme inline`.

### Color tokens (CSS variables)
Editorial palette — **light = warm paper / ink**, **dark = deep ink / warm paper**.

| Token | Light | Dark |
|-------|-------|------|
| `--background` | `#f6f4ee` | `#0a0a0c` |
| `--background-alt` | `#efece4` | `#0f0f12` |
| `--foreground` | `#15151a` | `#ece9e0` |
| `--foreground-soft` | `#2a2a31` | `#c9c6bd` |
| `--text-muted` | `#6b6b73` | `#8a8780` |
| `--text-subtle` | `#9a9aa3` | `#5a5852` |
| `--surface` | `#ffffff` | `#111114` |
| `--surface-elev` | `#fafaf6` | `#16161b` |
| `--border` | `#d9d6cc` | `#25252c` |
| `--border-strong` | `#b8b4a8` | `#34343d` |
| `--hairline` | `rgba(20,20,26,0.08)` | `rgba(236,233,224,0.08)` |
| `--accent` | `#4f46e5` (indigo) | `#8b87ff` |
| `--accent-hover` | `#4338ca` | `#a5a1ff` |
| `--signal-positive` | `#15803d` | `#4ade80` |
| `--signal-warning` | `#b45309` | `#f59e0b` |

Exposed to Tailwind as `bg-background`, `text-foreground`, `text-text-muted`, `border-hairline`, `text-accent`, `text-signal-positive`, etc.

### Fonts (mapped to Tailwind families)
- `--font-sans` → Geist (`--font-geist-sans`)
- `--font-mono` → Geist Mono (`--font-geist-mono`)
- `--font-display` → Instrument Serif (`--font-display`), used for big editorial display + italic accents.

### Custom utility classes (defined in globals.css)
- Type: `.font-display`, `.serif-italic`, `.eyebrow` (mono uppercase caption), `.label-mono`.
- Surfaces/lines: `.hairline-t/.hairline-b/.hairline-y`, `.rule`, `.rule-strong`, `.card` (+ `.card:hover`).
- Backgrounds: `.grid-bg` (64px grid), `.dot-bg` (28px dots), `.grain` (SVG fractal-noise paper texture, light/dark variants), `.accent-tint` (gradient band).
- Motion: `@keyframes marquee` + `.marquee-track` (40s infinite — used by hero client ticker).
- Links: `.link-underline` (animated underline on hover).
- Global: smooth scroll, custom thin scrollbar, `::selection` uses accent, `:focus-visible` accent outline, body font-feature-settings `ss01/ss02/cv11`.

### Recurring layout conventions
- Max content width: `max-w-[1320px] mx-auto`, horizontal padding `px-6 lg:px-10`.
- Section vertical rhythm: `py-20 lg:py-28`.
- Heavy use of mono "markers" (e.g. `S/01`, `CS/02`, `§01`, `/03`) and `tabular-nums` for an editorial/technical feel.
- 12-column grids (`grid-cols-12`) for asymmetric editorial layouts.

---

## 9. Key components

- **`layout.tsx`** — loads 3 Google fonts as CSS variables; sets global `Metadata` (title template `"%s | AZenthera AI"`, description, keywords, OpenGraph, Twitter, robots); wraps app in `ThemeProvider` with `<Navbar>` / `<main>` / `<Footer>`.
- **`Navbar.tsx`** (client) — fixed header, transparent until `scrollY > 8` then blurred bg + hairline border. Desktop has a hover **Services mega-dropdown** (2-col grid of all 8 services from `data.ts`). Mobile hamburger opens an animated sheet (Framer Motion) listing nav + capabilities. Note: its internal `navLinks` array is **separate** from `data.ts`'s `navLinks` and uses different labels ("Work", "Studio").
- **`Footer.tsx`** (client) — giant display wordmark, brand blurb, capabilities list (from `services`), studio links, contact details, social icons (LinkedIn/GitHub — placeholder URLs), dynamic year.
- **`PageHero.tsx`** — shared inner-page hero: `eyebrow`, `marker`, `title` (ReactNode), `description`, `meta[]` (label/value pairs).
- **`ServicePageTemplate.tsx`** — sections: PageHero → Overview → Capabilities → Benefits → Stack → Adjacent capabilities → optional `extraSection` → ContactCTA. The `extraSection` slot lets the AI Agents page inject `<VoiceAgentsPromo/>` without forking the template.
- **`CaseStudyPageTemplate.tsx`** — PageHero → Results strip (3 metrics) → Problem (§01) → Solution (§02) → Architecture + tech stack (§03) → Next case link → ContactCTA.
- **Homepage sections** (`src/components/sections/`) — composed in `app/page.tsx` in this order: Hero, ServicesGrid, WhyChooseUs, ProcessSection, CaseStudiesPreview, TechStackSection, TestimonialsSection, ContactCTA.
- **Voice components** (`src/components/voice/`) — see section 10.1.
- Most interactive/animated components are `"use client"` (Framer Motion, hooks). Pure data pages (e.g. services index) are server components.

---

## 10. Contact form (`src/app/contact/ContactForm.tsx`)

- Client component; submits JSON via `fetch` to a third-party endpoint:
  - Default: `https://formsubmit.co/ajax/afzaljawadkhan@gmail.com` (FormSubmit.co — free, one-time email confirmation).
  - Override with env var **`NEXT_PUBLIC_CONTACT_ENDPOINT`** (e.g. Web3Forms / Formspree / custom API).
- Payload fields: `name`, `email`, `company`, `subject`, `message`, plus FormSubmit meta (`_subject`, `_template: "table"`, `_captcha: "false"`).
- **Prefill:** reads `?subject=` and `?agent=` from the URL on mount (controlled `subject` select + `message` textarea). The Voice Agents "Build my X" CTAs link here with the agent type prefilled.
- States: submitting / done (success screen) / error (shows mailto fallback).

---

## 10.1 Voice Agents feature

The interactive showcase under `/services/ai-agents/voice`. Provider: **ElevenLabs Conversational AI** via `@elevenlabs/react`.

**Components (`src/components/voice/`):**
- `AgentOrb` — shared CSS/SVG visualizer (pulsing rings + equalizer), driven by `active`/`speaking`/`accent`. Keyframes live in `globals.css` (`orbPulse`, `orbBob`, `eqBar`).
- `VoiceAgentsGrid` / `VoiceAgentCard` — catalog.
- `VoiceAgentsPromo` — promo block injected into the AI Agents page.
- `VoiceAgentDetail` — detail page; renders the demo + lazy-loads `LiveTrial` via `next/dynamic({ ssr: false })`.
- `DemoSimulationPlayer` — pre-recorded simulation. Plays `demo.turns` with captions + per-turn scene image + orb; plays `audioSrc` mp3s, **falls back to the Web Speech API**, then to timed advance.
- `LiveTrial` — the live call. Wraps `<ConversationProvider>` (required by the SDK). Flow: URL → `POST /api/inspect/` → `POST /api/voice/token/` → `getUserMedia` → `conversation.startSession({ signedUrl, connectionType: "websocket", overrides: { agent: { prompt, firstMessage, language } }, dynamicVariables })`. A 180s countdown calls `endSession()`; transcript built from `onMessage`; mute via `setMuted`.

**SDK notes (`@elevenlabs/react` v1.6.x):** `useConversation()` must be inside `ConversationProvider`; `startSession` is synchronous (returns `void`); state is read off the hook (`status`, `isSpeaking`, `isMuted`, `setMuted`). The ElevenLabs dashboard agent must have **prompt + first_message overrides enabled** and a **max-duration** set (server-side backstop to the client timer).

### API routes (`src/app/api/`, Node runtime)
- `POST /api/inspect` — body `{ url }`. Normalizes URL; **SSRF guard** (`assertPublicHost`: rejects literal/resolved private, loopback, link-local, CGNAT, unique-local IPs; `localhost`/`.local`). Fetches with 8s timeout + 1.5 MB cap, parses with `cheerio` (title, og:site_name, meta description, headings → candidate services). If `OPENAI_API_KEY` set, summarizes via `gpt-4o-mini` into `{ businessName, summary, services[] }`; otherwise heuristic. Rate-limited 10/hour/IP.
- `POST /api/voice/token` — body `{ agentSlug }`. Validates the slug, rate-limits **4/day/IP**, then calls ElevenLabs `get-signed-url` with `xi-api-key` and returns `{ signedUrl }`. Returns **503** with a friendly message if `ELEVENLABS_API_KEY`/`ELEVENLABS_AGENT_ID` are unset (the UI then points to demo/contact).

### Rate limiting (`src/lib/rateLimit.ts`)
`rateLimit(id, limit, windowSec)` uses Upstash when `UPSTASH_REDIS_REST_URL`/`_TOKEN` are set, else a best-effort in-memory map (NOT durable across serverless invocations — set Upstash in production). `clientIp(req)` reads `x-forwarded-for`/`x-real-ip`.

### Demo audio (`scripts/generate-demo-audio.ts`)
One-time `npm run gen:audio` (needs `ELEVENLABS_API_KEY`; optional voice-id overrides) → writes `public/voice/audio/<slug>/<n>.mp3` (commit them). Until generated, the player uses the Web Speech fallback. Scene imagery is committed at `public/voice/scenes/*.png`.

---

## 10.2 Environment variables

| Var | Scope | Purpose |
|-----|-------|---------|
| `ELEVENLABS_API_KEY` | server | Mint signed URLs + generate demo audio |
| `ELEVENLABS_AGENT_ID` | server | The Conversational AI agent (overrides enabled) |
| `OPENAI_API_KEY` | server (optional) | LLM summary in `/api/inspect` |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | server (optional) | Durable rate limiting |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | client (optional) | Contact form endpoint override |

See `.env.example`. Set the same values in the Vercel project settings.

---

## 11. Build & deploy

- **Hosting:** **Vercel** (connect the GitHub repo in the Vercel dashboard; it deploys on push to `main`). Custom domain `azentheraai.com` is configured in Vercel (the old `public/CNAME` was removed).
- `npm run build` produces a server build: most pages are Static/SSG; `/api/inspect` and `/api/voice/token` are dynamic (`ƒ`) server functions.
- The previous GitHub Pages workflow (`.github/workflows/deploy.yml`) was removed during migration.
- Add the env vars above in Vercel before the live trial will work (otherwise `/api/voice/token` returns 503 and the UI degrades gracefully to the demo + contact).

---

## 12. Technical issues / cleanup — status

| Issue | Status |
|-------|--------|
| Leftover "MetaViz AI" brand in `case-studies/[slug]` metadata | ✅ Fixed → "AZenthera AI" |
| Orphan/broken service routes (`ai-apps`, `saas-platforms`, `ui-ux-design`, `video-analytics`, `website-development`) | ✅ Deleted (folders + files removed; build now emits exactly 8 service routes) |
| Two `navLinks` sources (unused export in `data.ts` vs local array in `Navbar.tsx`) | ✅ Fixed → removed the unused `navLinks` export and `NavLink` interface from `data.ts`; `Navbar.tsx` is now the single source |
| Footer social URLs were bare placeholders | ⚠️ Partial — GitHub fixed to `https://github.com/afzalkhanlala1`; **LinkedIn still a placeholder** (`https://linkedin.com`) pending a real URL |
| Dead file `azenthera-site.jsx` (~57 KB) | ✅ Deleted |
| Default `create-next-app` README | ✅ Replaced with a project-specific README |
| npm audit: 3 vulnerabilities (2 moderate, 1 high) at install | ⬜ Open — not yet addressed (`npm audit fix` may change deps; defer until intentionally reviewed) |
| Hosting was static GitHub Pages (couldn't run server code) | ✅ Migrated to Vercel; `output: "export"` removed; API routes added |

### Open follow-ups for the Voice Agents feature
- Create the ElevenLabs agent + set `ELEVENLABS_API_KEY` / `ELEVENLABS_AGENT_ID` (and enable prompt/first-message overrides + a max-duration) in Vercel.
- Run `npm run gen:audio` once and commit `public/voice/audio/**` for higher-quality demos (Web Speech fallback works meanwhile).
- (Recommended) set Upstash env vars for durable rate limiting; consider adding Cloudflare Turnstile to the live trial.
- (Optional) set `OPENAI_API_KEY` so site inspection produces a richer business brief.

> Verified: `npm run build` passes; `/api/inspect`, `/api/voice/token`, and `/services/ai-agents/voice` smoke-tested locally (SSRF blocked, graceful 503 when voice unconfigured, public inspect parses).

---

*Last updated: 2026-06-06. Keep in sync with the codebase and `business.md`.*
