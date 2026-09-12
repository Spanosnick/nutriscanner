# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

NutriScanner is a Next.js app currently at the unmodified `create-next-app` scaffold stage — `app/page.tsx` and `app/layout.tsx` still contain the default starter content. There is no custom application logic, routing, data layer, or test setup yet.

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # run production build
npm run lint    # eslint
```

There is no test runner configured yet.

## Stack

- Next.js 16 (App Router, in `app/`), React 19, TypeScript (strict mode)
- Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config`; styling is configured through `app/globals.css` and PostCSS)
- ESLint flat config (`eslint.config.mjs`) extending `eslint-config-next` core-web-vitals + typescript rules
- Path alias `@/*` maps to the repo root (`tsconfig.json`)
