# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Two independent npm projects, no workspace/monorepo tooling at the root:

- `frontend/` — Next.js 16 App Router UI (store owner dashboard)
- `store-api/` — Express 5 + Prisma + PostgreSQL JSON API

Each has its own `package.json`, `node_modules`, and `.env`. Install and run them separately.

## Commands

```bash
# frontend (port 3000)
npm --prefix frontend run dev      # dev server
npm --prefix frontend run build    # production build (also the only typecheck in CI-less repo)
npm --prefix frontend run lint     # eslint flat config

# store-api (port 4000 — see gotcha below)
npm --prefix store-api run dev     # nodemon index.js
npm --prefix store-api start       # node index.js
npm --prefix store-api run studio  # prisma studio
npx --prefix store-api prisma migrate dev --name <name>   # new migration
npx --prefix store-api prisma generate                    # after editing schema.prisma
```

`.claude/launch.json` defines both services (`frontend` → 3000, `store-api` → 4000).

There is no test runner in either project. "Verify" means: run both servers, exercise the flow in the browser, and `npm --prefix frontend run build` for type errors.

### Environment

- `store-api/.env` — `DATABASE_URL`, `JWT_SECRET` (the server **throws at boot** if missing), `PORT`
- `frontend/.env.local` — `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4000` in code)

Both have `.env.example` files; `.env*` is gitignored in both projects.

## Architecture

### Auth is the spine of the app

There is one authenticated entity: a **Store**. There are no user accounts separate from stores.

1. `POST /api/auth/register` / `POST /api/auth/login` return `{ token, store }`. The token is a JWT carrying `{ storeId }`, 7-day expiry, signed with `JWT_SECRET`.
2. `frontend/app/lib/apiClient.js` is the **only** place that talks to the API. It reads `token` from `localStorage` and attaches `Authorization: Bearer …`. Components never call `fetch` directly — add a method to `api` instead.
3. `frontend/app/context/authContext.js` (`AuthProvider`, mounted in `app/layout.tsx`) revalidates a stored token on first load via `GET /api/auth/me` and clears it on failure. `useAuth()` exposes `{ store, loading, login, logout, updateStore }`.
4. `frontend/app/(app)/layout.js` is the route guard: it renders a loading state until `AuthProvider` settles, then redirects to `/login` when there is no store.

**Any new authenticated page belongs under `app/(app)/`** — that route group is what makes it protected. `app/login`, `app/register`, and `app/page.tsx` (a redirect shim to `/dashboard` or `/login`) sit outside it.

Note this guard is **client-side only** — there is no middleware or server-side session check. Protected pages are Client Components (`'use client'`); data fetching happens in effects/handlers against the API, not in Server Components.

On the API side, `requireAuth` verifies the bearer token and sets `req.storeId`. Mutations should be scoped to `req.storeId`, not to an id from the URL.

### Two API surfaces — only one is live

- `/api/auth/*` (register, login, `GET`/`PUT /api/auth/me`) — the surface the frontend actually uses. `PUT /api/auth/me` updates name/phone/address; **email is deliberately immutable** here and the edit form disables the field.
- `/api/stores/*` — an earlier generic CRUD layer, not wired into the frontend. Its authorization is still incomplete: `PUT`/`DELETE /api/stores/:id` check for *a* token but never compare the URL id against `req.storeId`. Don't treat it as a safe template.
- `/api/products/*` and `/api/categories/*` — not yet wired into the frontend (the Products page UI exists but doesn't call the API), but these routes now have `requireAuth` and product reads/writes are scoped to `req.storeId` (looked up from the DB and compared, never trusted from the URL/body). Categories are global (shared across stores), so category routes only require *a* valid token, not store ownership.

`omitPassword()` strips the bcrypt hash before any store object leaves the API — use it on every response that includes a store.

### Data model (`store-api/prisma/schema.prisma`)

`Store` 1—n `Product` with `onDelete: Cascade`. `Category` 1—n `Product` with `onDelete: Restrict` (a category can't be deleted while products still reference it) — categories are global, not per-store. `Store.name`, `Store.email` and `Category.name` are all unique (so a duplicate returns Prisma `P2002` → 409); `Product` is unique per `(name, storeId)` and requires a `categoryId`. `Store.password` holds a bcrypt hash (cost 10).

Prisma error code `P2002` is mapped to HTTP 409 in the auth/store routes — keep that pattern when adding writes.

## Conventions

- Pages and components are plain **`.js` with JSX** (`allowJs` is on); only `app/layout.tsx` and `app/page.tsx` are TypeScript. Follow the surrounding file rather than converting.
- Indentation: 4 spaces in the `.js` app files, 2 in the `.tsx`/config files.
- Tailwind v4 through `@import "tailwindcss"` in `app/globals.css` — there is no `tailwind.config`. The visual language is emerald-600 as the accent on a gray-50/white surface, `rounded-2xl` cards, `border-gray-200`.
- Forms follow one shape: a single `formData` object, one `handleChange` keyed by input `name`, a `validate()` returning an error string, and `error`/`loading` state rendered as a red banner plus a disabled submit button. Match `app/login/page.js` or `app/(app)/profile/edit/page.js`.
- Path alias `@/*` → `frontend/` root, though most imports are relative.

## Gotchas

- **Port collision.** `store-api/index.js` falls back to `PORT || 3000`, which is Next's port. `store-api/.env` must set `PORT=4000` or the frontend's default `NEXT_PUBLIC_API_URL` won't reach it.
- `npm --prefix store-api run migrate` is hardcoded to `--name init`; use the explicit `prisma migrate dev --name <name>` command above instead.
- `store-api/{.claude,.cursor,.agents,.devin}/skills/` are **generated mirrors** produced by `prisma.config.ts` (`skills.agents`) — edit none of them by hand. The `prisma-composer` skill they ship describes a framework this project does not use; the API is plain `@prisma/client` + Express.
- `frontend/.agents/skills/supabase*` and `frontend/skills-lock.json` are leftovers from the pre-Express Supabase backend (removed in `ea7eba0`). Nothing in the app uses Supabase.
- `react-router-dom` is in `frontend/package.json` but unused — routing is Next's App Router.
- `frontend/app/layout.tsx` still carries the `create-next-app` default `metadata` title/description.
