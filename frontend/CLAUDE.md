# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

NutriScanner's frontend has grown past the `create-next-app` scaffold: it now has a working auth flow, an authenticated app shell with dashboard/products/profile sections, and a design-token-based styling system. Several pages, however, are still unmigrated scaffold leftovers or unwired stubs — see "Where things actually stand" below before assuming a feature works end-to-end.

This directory (`frontend/`) is the Next.js client only. The API it talks to lives in a sibling directory, `../store-api` (Express 5 + Prisma 5 + JWT + bcryptjs) — not part of this repo checkout's frontend tree. There is no `app/api/` route handler in this project; every request goes out over `fetch` to that external service.

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
- `lucide-react` is the only UI icon library actually used (`Plus`, `X`, `LogOut`, `Menu`, `Eye`/`EyeOff`, etc.)
- `react-router-dom` is listed in `package.json` but is dead weight — nothing in `app/` imports it; all routing/navigation goes through `next/navigation` (`useRouter`, `usePathname`) and `next/link`, as expected for an App Router project. Don't reach for it, and feel free to remove it if you're touching `package.json` anyway.

## Architecture

### Routing and auth gating

- `app/layout.tsx` is the root HTML layout: loads `Archivo` + `IBM Plex Mono` via `next/font/google` and wraps `{children}` in `<AuthProvider>` (from `app/context/authContext.js`).
- `app/page.tsx` is a client-side redirect gate: once `useAuth()` reports `loading === false`, it does `router.replace('/dashboard')` if a store is logged in, otherwise `router.replace('/login')`.
- `app/(app)/` is a route group (no URL segment) holding every authenticated page: `dashboard/`, `products/`, `product/[productId]/` (+ nested `edit/`), `profile/` (+ nested `edit/`). `app/(app)/layout.js` is the gate for this whole group — it's a Client Component that redirects to `/login` if `!loading && !store`, and while loading/unauthenticated renders nothing but a "Loading..." message. Once authenticated it renders `<NavBar />` plus `<main className="max-w-[1360px] mx-auto px-6 py-8">{children}</main>`.
- `app/login/` and `app/register/` are top-level routes, siblings of the `(app)` group — they render without `NavBar` or the `(app)` shell, and each bounces an already-logged-in user to `/dashboard` via the same `useAuth()` check.
- The two dynamic `product/[productId]` pages are async Server Components that `await params` (Next 16 async-params convention) — keep that pattern if you add more dynamic routes here.

### Auth (`app/context/authContext.js` + `app/lib/apiClient.js`)

- `useAuth()` exposes `{ store, loading, login, logout, updateStore }`. The token lives in `localStorage` under `token`; on mount, `AuthProvider` reads it and calls `api.me()` to validate/hydrate `store`, clearing the token on failure. `login(token, storeData)` persists the token and sets `store`; `updateStore(storeData)` just replaces the cached store object (used after profile edits) without re-fetching.
- `app/lib/apiClient.js` is a single small `fetch` wrapper: base URL from `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000`, see `.env.example`), attaches `Authorization: Bearer <token>` when a token is in `localStorage`, and throws on non-OK responses using the server's `error` field. The exported `api` object currently only has auth methods: `register`, `login`, `me`, `updateMe` — there are no product endpoints yet, which is why the products feature (below) has nothing to call.

### Where things actually stand per feature

- **Profile is the only fully wired feature end-to-end**: `profile/page.js` reads `store` straight from `useAuth()` (no extra fetch); `profile/edit/page.js` seeds a form from `store`, calls `api.updateMe(...)` on submit, then `updateStore()` + `router.push('/profile')`. Use this as the reference pattern for wiring up new authenticated mutations.
- **Products is UI-only scaffolding, not a working feature**: `products/page.js` always renders the empty-state card regardless of what's "added" (no list, no fetch, no persisted state). `products/AddProductModal.js` is a fully local form — `validate()` runs client-side but `handleSubmit` never calls any API; it just clears the form and closes the modal. `product/[productId]/page.js` and its `edit/page.js` are static placeholders ("Product details will show up here soon.") with no data fetching. Building real product support means adding backend endpoints + `apiClient` methods first, then wiring these pages to them.
- `dashboard/page.js` is scaffold-era placeholder content, not wired to any data.

### Styling: two eras coexist

- Newer surfaces (`app/(app)/products/*`, `app/components/NavBar.js`, root `app/layout.tsx`, `app/globals.css`) use a custom design-token palette defined via Tailwind v4 `@theme` in `globals.css`: `bg-canvas`, `text-ink` / `text-ink-muted` / `text-ink-soft`, `border-rule` / `border-rule-strong`, `bg-accent` / `bg-accent-wash`, `bg-surface` / `bg-surface-hover`.
- Older, not-yet-migrated surfaces (`login`, `register`, `dashboard`, `profile`, `profile/edit`, both `product/[productId]` pages) still use generic Tailwind grays/emeralds from the original scaffold (`text-gray-900`, `bg-emerald-600`, etc.). When touching these pages, check whether the task wants them migrated to the token system or left alone.
- `design_handoff_navigation/README.md` is the source-of-truth design spec for the nav/token system (visual states, token table, and an explicit "open items" note that `max-w-[1360px]` in the new nav doesn't match the narrower width still used by `(app)` pages, and that login/register predate the tokens). Its `code/` subfolder mirrors the real `NavBar.js` / `globals.css` / `layout.tsx` and is what the current implementation was derived from — check it before redesigning the nav.
- There are no shared Button/Input/Card components; every form (`login`, `register`, `AddProductModal`, `profile/edit`) re-implements its own inputs inline, following the same pattern: one `formData` object in `useState`, a single `handleChange(e)` keyed by `e.target.name`, a local `validate()` returning an error string, and a red-banner error display on failure.
