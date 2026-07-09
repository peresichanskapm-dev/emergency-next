# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Single-page marketing landing for **emergency+** — a one-day precourse on complications
in aesthetic medicine (event "10 вересня 2026, Emily Resort"). Noir / detective visual
theme (fingerprints, dossier, "evidence"). Ukrainian only — **no i18n**. The site is a
vertical stack of sections composed on the home page.

## Commands

- `npm run dev` — **run by the user only.** Do NOT start the dev server (Bash or preview
  tools). When a change needs a visual check, ask the user to run it and report back.
- `npm run build` / `npm run start` — production build / serve.
- `npm run lint` — ESLint (flat config, `eslint-config-next`).
- Type-check: `npx tsc --noEmit` (no dedicated script; `strict` is on).

Requires Node ≥ 20.19 (for `sass`); developed on Node 24.

## Stack

Next.js 16 (App Router, **Turbopack**, React 19), TypeScript `strict`, **SCSS Modules**
(`sass`), local woff2 fonts. Import alias `@/*` → project root (`tsconfig.json`).

**There is no Tailwind.** It was removed in favour of SCSS Modules to match the reference
project `lviv-invest`. Do not reintroduce Tailwind utilities in markup.

## Architecture & conventions

Mirrors the `../lviv-invest` reference project's structure.

### Folder-per-component

Every component is its own folder holding the component + its styles:

```
components/
  Header/            Header.tsx + Header.module.scss   (global chrome: Header, Footer)
  home/
    Hero/            Hero.tsx + Hero.module.scss        (home-page sections live here)
    Stats/ …
```

Home-page sections go under `components/home/<Name>/`; global chrome (Header/Footer) at
`components/<Name>/`. Import with the full path, e.g. `@/components/home/Hero/Hero`.
Sections are composed in `app/page.tsx`; `Header` is rendered once in `app/layout.tsx`.
Components are Server Components by default; add `'use client'` only when needed.

### Styling — SCSS Modules, rem-based (1rem = 10px)

- Each component styles itself via `styles.module.scss` imported as `s` and referenced as
  `className={s.foo}`. No global class names, no utility classes in markup.
- **`_reset.scss` sets `html,body { font-size: 10px }`, so `1rem = 10px`.** Size everything
  in rem (e.g. `1.6rem` = 16px, `5.4rem` = 54px). Use nesting and `@media` inside modules
  (breakpoints used: 576 / 768 / 992 / 1280 px).
- Global stylesheet: `app/globals.scss` `@use`s `app/styles/_fonts`, `_vars`, `_reset`,
  `_typography`. `.container` (max 128rem) is the shared layout wrapper.

### Design tokens — `app/styles/_vars.scss` (CSS custom properties)

Colors: `--color-bg` #fff, `--color-light` #eeeef1 (light section bg, e.g. Hero),
`--color-text` #211f20, `--color-red` #be1027 (accent), `--color-black` #000.
Fonts: `--font-primary` = **Steppe** (display/UI), `--font-typewriter` = **B52** (dates,
mono accents). Reference these vars in modules — never hardcode hex.

### Fonts

Local woff2 in `public/fonts/`, declared in `app/styles/_fonts.scss`. Steppe is available
in weights 300–900 (`font-weight: 800/900` for headings); B52 is a single 400.

### Assets & design references

Static images under `public/img/<section>/…`, rendered with `next/image`. The Figma
mockups live in `pictures/` — `Emergency.png` (full desktop), `Emergency_mobile.png`
(mobile), plus per-section crops (`Hero-section/`, `header/`). Match these when building
sections.

## Gotchas

- **Turbopack caches module resolution.** After adding a dependency (e.g. `sass`), a stale
  dev server keeps reporting it missing ("Error evaluating Node.js code / install sass")
  even after restart — delete `.next` and restart to force a clean resolve.
- Per `AGENTS.md`, this Next.js has breaking changes vs. older versions; consult
  `node_modules/next/dist/docs/` before writing Next-specific code.
