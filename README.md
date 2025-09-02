# Primavera3D Website

> A high‑performance, portfolio‑driven web experience for 3D modeling, parametric design, and digital fabrication. Built with Next.js, React Three Fiber, and a modern, privacy‑first stack.
> **Repo owner:** Primavera3D Product Team (MADFAM)

---

## TL;DR (Quick Start)

```bash
# Prereqs: Node 20 LTS, pnpm 9+, Git
corepack enable          # enables pnpm if not installed
pnpm i                   # install all deps
cp .env.example .env     # create and fill your env vars
pnpm db:up               # start local Postgres (if using Docker) OR ensure DATABASE_URL is reachable
pnpm db:migrate          # run Prisma migrations
pnpm dev                 # start Next.js on http://localhost:3000
```

---

## Overview

This repository hosts the **Primavera3D** website: an immersive showcase of 3D work, real‑time configurators, and case studies. It includes:

* Interactive **3D viewer** with AR support
* **Portfolio system** powered by Sanity CMS
* **Interactive tools** (cost calculator, timeline estimator, material selector)
* Privacy‑respecting **analytics** and experimentation
* Production‑ready CI/CD for **Vercel** deployments

### Goals

* Convert qualified leads (+200%)
* Maintain Core Web Vitals budgets (INP ≤ 200ms, LCP ≤ 2.5s p75)
* Ship secure, accessible, localized experiences (WCAG 2.2 AA; en‑US, es‑MX)

---

## Tech Stack

* **App:** Next.js 14 (App Router, RSC), TypeScript 5, React 18
* **UI:** Tailwind CSS, Radix UI + shadcn/ui, Framer Motion, GSAP/ScrollTrigger, Lottie
* **3D:** Three.js / **React Three Fiber**, @google/model‑viewer (AR), DRACO/KTX2
* **Content:** **Sanity.io** (CMS), MDX for technical docs
* **Data:** Prisma ORM, **PostgreSQL**
* **Media:** Cloudinary (images/video), Mux (streaming), AWS S3 (3D assets)
* **Auth/Email/Payments:** (optional) NextAuth/OAuth, SendGrid, Stripe
* **Analytics:** Vercel Analytics, **Mixpanel**, Sentry, Hotjar (privacy mode)
* **Dev:** Turborepo, Vitest, Playwright, Storybook, ESLint/Prettier

> **Browser support:** Evergreen Chrome/Edge/Firefox, Safari 16+. WebGL 2 preferred; graceful fallback otherwise.

---

## Monorepo Layout (Turborepo)

```
.
├─ apps/
│  └─ web/                # Next.js app
├─ packages/
│  ├─ ui/                 # shared UI components (shadcn/radix wrappers)
│  ├─ config/             # eslint, tsconfig, tailwind presets
│  ├─ viewer-3d/          # R3F components, loaders, shaders
│  └─ utils/              # shared utilities (i18n, analytics)
├─ prisma/                # schema.prisma, migrations
├─ .vscode/               # recommended workspace settings
└─ ...
```

---

## Environment Setup

Create `.env` from `.env.example` and fill the values.

```env
# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/primavera3d

# Sanity (CMS)
SANITY_PROJECT_ID=xxxx
SANITY_DATASET=production
SANITY_API_TOKEN=secret

# Storage & Media
AWS_REGION=us-east-1
AWS_S3_BUCKET=primavera3d-assets
AWS_ACCESS_KEY_ID=xxxx
AWS_SECRET_ACCESS_KEY=xxxx
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
MUX_TOKEN_ID=xxxx
MUX_TOKEN_SECRET=xxxx

# Analytics & Monitoring
NEXT_PUBLIC_MIXPANEL_TOKEN=xxxx
SENTRY_DSN=xxxx
NEXT_PUBLIC_HOTJAR_ID=xxxx
VERCEL_ANALYTICS_ID=auto

# Email & Payments (optional)
SENDGRID_API_KEY=xxxx
STRIPE_SECRET_KEY=sk_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx

# Scheduling (optional)
NEXT_PUBLIC_CAL_URL=https://cal.com/primavera3d/intro
```

> **Security:** Never commit real secrets. Use Vercel project envs for deployments; limit access via least‑privilege.

---

## Development

Common scripts (run from repo root):

```bash
pnpm dev        # start app(s) in dev mode
pnpm build      # typecheck + build all packages
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
pnpm test       # vitest
pnpm e2e        # playwright tests
pnpm storybook  # component explorer

# Database
pnpm db:up         # starts local Postgres via Docker compose (if provided)
pnpm db:migrate    # apply prisma migrations
pnpm db:studio     # open Prisma Studio
```

### Running the Web App

```bash
cd apps/web
pnpm dev
# open http://localhost:3000
```

---

## CMS (Sanity) Workflow

* Content model: **Project, Service, Resource, Post, Asset**
* Draft → Review → Publish flow with role‑based permissions
* Preview via Next.js Draft Mode; webhooks trigger ISR revalidation

> See `apps/web/sanity/` for schemas and GROQ queries.

---

## 3D Viewer & Asset Pipeline

**Accepted uploads:** GLB/GLTF (preferred), FBX/OBJ (converted), STEP/IGES (converted to GLB).
**Budgets:** target **≤10 MB** per model (optimized), ≤ 2K textures where possible.

Pipeline:

1. **Upload** → validation + virus scan, authoring guidelines enforced
2. **Optimize** → DRACO geometry, KTX2 textures, generate **LOD x3**, thumbnails/turntable
3. **Store** → originals (S3 private), optimized (CDN), thumbnails (Cloudinary)
4. **Deliver** → progressive loading (low→high), device/network‑adaptive quality

Viewer capabilities: orbit/zoom/pan, annotations, section, material presets/switching, screenshots, AR deep‑links (USDZ/GLB).

Authoring tips:

* Merge meshes where possible; prefer PBR Metallic‑Roughness
* Limit draw calls; use instancing for repeats
* Bake lighting if appropriate; keep HDRIs small

---

## Analytics & Event Taxonomy

Use **Mixpanel** for product analytics and **Vercel Analytics** for Web Vitals/RUM. Key events:

```ts
// apps/web/lib/analytics/events.ts
export const events = {
  portfolio_view: (id: string) => ({ event: 'portfolio_view', id }),
  viewer_interact: (id: string, action: 'orbit'|'zoom'|'mat_swap') => ({ event: 'viewer_interact', id, action }),
  ar_launch: (id: string) => ({ event: 'ar_launch', id }),
  quote_request: (source: string) => ({ event: 'quote_request', source }),
  start_project: () => ({ event: 'start_project' }),
};
```

> Privacy: enable IP anonymization; honor CMP consent; avoid PII in event payloads.

---

## Accessibility (WCAG 2.2 AA)

* Keyboard support for **all** interactive UI and 3D controls
* Visible focus states; reduced‑motion variants; adjustable auto‑rotate
* Alt text, captions, semantic markup, ARIA where needed
* Color contrast ≥ 4.5:1; test with axe & manual audits

---

## Internationalization

* Locales: **en-US**, **es-MX** (extendable)
* Use `next-intl` (or equivalent) with locale‑aware routes and metadata
* Localize dates, numbers, SEO, and CMS content

---

## Performance Budgets (p75)

* **LCP ≤ 2.5s**, **INP ≤ 200ms**, **CLS ≤ 0.10**
* **3D:** initial model load < 3s (10 MB on 4G), 60fps desktop / 30fps mobile
* Enforce via Lighthouse CI + WebPageTest profiles

Optimization checklist:

* DRACO, KTX2, LOD, instancing, occlusion culling
* AVIF/WebP responsive images; defer non‑critical scripts
* Route‑level code splitting; tree‑shaking; critical CSS

---

## Testing & Quality

* **Unit:** Vitest
* **E2E:** Playwright
* **Visual/UX:** Storybook + Chromatic (optional)
* **A11y:** axe + manual audits

**PR Checks (Definition of Done):**

* [ ] CI green (lint, type, unit, build)
* [ ] Core Web Vitals budgets met on PR Preview
* [ ] a11y checks pass (no critical issues)
* [ ] Events fire per spec; no PII
* [ ] Copy reviewed for both locales

---

## CI/CD & Environments

* **Vercel** for hosting + PR Previews
* **Main** → production; **Develop** → staging
* ISR + webhooks for CMS content

Secrets managed in Vercel Project Settings; rotate regularly.

---

## Coding Standards

* **TypeScript strict**; ESLint + Prettier
* **Conventional Commits** (e.g., `feat: add AR quick look`)
* Branches: `feat/*`, `fix/*`, `chore/*`, `docs/*`, `perf/*`, `refactor/*`
* File naming: kebab‑case for files, PascalCase for components

---

## Directory Reference (app subset)

```
apps/web/
├─ app/                 # Next.js App Router
│  ├─ (marketing)/      # public pages (home, services, about)
│  ├─ (portfolio)/      # projects, filters
│  ├─ api/              # edge/API routes
│  └─ layout.tsx
├─ components/          # UI + R3F components
├─ lib/                 # utils (i18n, analytics, cms, viewer)
├─ sanity/              # schemas & queries
├─ styles/              # tailwind.css, tokens
└─ public/              # static assets (favicons, og images)
```

---

## Feature Flags & Experiments

* Edge‑controlled flags (Vercel Edge Config) for:

  * Portfolio layout variants
  * 3D control presets
  * CTA copy/placement
* A/B results tracked in Mixpanel; flag keys documented in `/packages/config/flags.ts`

---

## Security & Compliance

* HTTPS/HSTS, security headers, CSRF protection
* OAuth2/JWT (if auth enabled); role‑based access for CMS actions
* DMCA process and asset usage tracking; optional watermarking
* GDPR/CCPA/LGPD alignment, Consent Management Platform

---

## Troubleshooting

* **WebGL not supported** → viewer auto‑falls back to imagery/video; check browser/GPU drivers
* **Model won’t load** → verify GLB/KTX2/DRACO versions; check console for `KHR_texture_basisu` support
* **Slow LCP** → inspect hero media (optimize poster, preload critical assets)
* **Analytics missing** → check consent state and `NEXT_PUBLIC_MIXPANEL_TOKEN`

---

## Roadmap (Snapshot)

* Post‑launch: Parametric Playground, VR scenes, AI Design Assistant, Client Portal, Advanced Analytics

---

## Contributing

1. Create a feature branch from `develop`
2. Commit with **Conventional Commits**
3. Open PR to `develop` with description, screenshots, and **perf/a11y** notes
4. Request review from Eng + Design; ensure PR checklist is complete

> See `docs/CONTRIBUTING.md` (to be added) for more details.

---

## License

TBD — default is “All rights reserved (MADFAM)” unless specified otherwise.

---

## Maintainers

* **Technical Lead:** TBA
* **Design Lead:** TBA
* **Product Owner:** TBA
* **Project Manager:** TBA

For questions, open an issue with the `question` label or contact the Product Team.
