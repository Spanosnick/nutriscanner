# Handoff: NutriScanner primary navigation

## Overview
Primary top navigation for the NutriScanner store console — the back-office web app where a store that sells handmade food (sandwiches, wraps, sweets) manages its products and their nutritional information. The nav carries the NutriScanner logo, three destinations (Dashboard, Products, Profile) and a Log out action on the far right.

This handoff also establishes the app's first design tokens (color, type, spacing, radii), since this is the first designed surface in the product.

## About the design files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look and behavior, not production code to paste in.

**Exception:** this project's target codebase is already known (\`Spanosnick/nutriscanner\`, Next.js App Router + Tailwind v4), so \`code/\` contains a real implementation written against those exact files. Use it directly; use \`Navigation.dc.html\` only as the visual reference when something is ambiguous.

## Fidelity
**High-fidelity.** Final colors, typography, spacing and states. Recreate pixel-accurately.

## Target codebase

| Handoff file | Repo destination |
| --- | --- |
| \`code/NavBar.js\` | \`frontend/app/components/NavBar.js\` (replaces existing) |
| \`code/globals.css\` | \`frontend/app/globals.css\` (replaces existing) |
| \`code/layout.tsx\` | \`frontend/app/layout.tsx\` (replaces existing) |

Repo: \`Spanosnick/nutriscanner\`, branch \`main\`, subtree \`frontend/\`.
Stack: Next.js App Router, Tailwind CSS v4 (\`@import "tailwindcss"\` + \`@theme\`), \`next/font/google\`, JS components with a TS root layout.

Existing contracts the nav must keep:
- \`useAuth()\` from \`app/context/authContext\` provides \`{ store, logout }\`; the store label renders \`store?.name\` and must tolerate \`undefined\`.
- \`usePathname()\` decides the active link via \`pathname.startsWith(href)\`.
- Logout calls \`logout()\` then \`router.push('/login')\`.
- Routes: \`/dashboard\`, \`/products\`, \`/profile\`, \`/login\`. The nav is mounted from \`app/(app)/layout.js\`.

## Screen: primary nav — desktop, default

**Purpose:** move between the three console areas and sign out.

**Layout:** \`<header>\`, \`position: sticky; top: 0; z-index: 20\`, background \`#FFFFFF\`, \`border-bottom: 1px solid #E3E7E8\`. Inner \`<nav>\`: \`max-width: 1360px\`, centered, \`padding: 0 24px\`, \`height: 68px\`, \`display: flex; align-items: center; gap: 24px\`.

**Components, left to right:**

1. **Logo lockup** — flex row, \`gap: 11px\`, links to \`/dashboard\`, no underline.
   - Mark: 34×34, \`border-radius: 9px\`, \`1px dashed #B9C2C4\`, fill \`repeating-linear-gradient(135deg, #F1F4F4 0 5px, #FFFFFF 5px 10px)\`. **This is a placeholder** — the real NutriScanner mark does not exist yet.
   - Wordmark: "NutriScanner", Archivo 700, 17px, \`letter-spacing: -0.025em\`, \`#101418\`.
   - Sub-label: \`store?.name\`, IBM Plex Mono 400, 9.5px, uppercase, \`letter-spacing: 0.1em\`, \`#8A9597\`, \`margin-top: 5px\`. Hidden when absent.

2. **Divider** — 1×26px, \`#E3E7E8\`. Hidden below \`md\`.

3. **Links** — flex row, \`gap: 4px\`, takes remaining space. Each link:
   - \`height: 38px\`, \`padding: 0 14px\`, \`border-radius: 10px\`, \`gap: 9px\`, \`font-size: 14px\`, \`white-space: nowrap\`.
   - Leading dot: 8×8, \`border-radius: 2px\`.
   - Labels: "Dashboard", "Products", "Profile".

4. **Log out** — pushed right. \`height: 38px\`, \`padding: 0 15px\`, \`border: 1px solid #E3E7E8\`, \`border-radius: 10px\`, background \`#FFFFFF\`, Archivo 500 14px \`#4A5457\`, \`gap: 9px\`. Icon: 13×13 box, \`1.5px solid currentColor\`, \`border-radius: 3px\`, right border transparent (a door/exit suggestion, not a drawn icon).

### Link states

| State | Background | Text | Weight | Dot |
| --- | --- | --- | --- | --- |
| Default | transparent | \`#4A5457\` | 500 | \`#C9D0D1\` |
| Hover | \`#F1F4F4\` | \`#101418\` | 500 | \`#C9D0D1\` |
| Active (current page) | \`#E4F1F4\` | \`#0E7490\` | 600 | \`#0E7490\` |
| Keyboard focus | as above | as above | — | — plus \`outline: 2px solid #0E7490; outline-offset: 2px\` |

Active is a **pill**, not an underline. Transition background and color at 140ms ease. Active link gets \`aria-current="page"\`.

Log out hover: \`border-color: #C9D0D1\`, background \`#FBFCFC\`, text \`#101418\`. Same focus ring.

## Screen: primary nav — scrolled / condensed

Triggered at \`window.scrollY > 40\`.

- Bar height 68px → 52px (transition \`height\` 150ms).
- Logo mark 34×34 → 26×26, radius 9px → 7px; wordmark 17px → 15px.
- Store sub-label hides.
- Links and Log out drop to \`height: 32px\`, \`padding: 0 12px\` / \`0 13px\`, \`border-radius: 8px\`, font 13.5px.
- Bottom border is replaced by \`box-shadow: 0 1px 12px rgba(16,20,24,0.08)\`.

Scroll listener is passive; state is read once on mount so a deep-linked scrolled page renders condensed immediately.

## Screen: primary nav — mobile

Below the \`md\` breakpoint (768px) the link row and Log out button are hidden and replaced by a menu toggle.

**Toggle:** 44×44, \`border-radius: 10px\`, hover \`#F1F4F4\`. Closed: three 17×1.8px bars, \`#101418\`, \`gap: 4px\`. Open: "×" glyph, 18px. \`aria-expanded\` and \`aria-label\` ("Open menu" / "Close menu") required.

**Open panel:** below the bar, background \`#FFFFFF\`, \`border-top: 1px solid #E3E7E8\`, \`padding: 10px\`. Rows are \`height: 48px\` (above the 44px touch minimum), \`padding: 0 14px\`, \`border-radius: 10px\`, \`gap: 11px\`, font 15px, same state colors as desktop. A 1px \`#E3E7E8\` divider with \`margin: 10px 14px\` separates the links from Log out.

Panel closes on route change.

## Interactions & behavior

- Click a link → Next.js client navigation; active pill follows \`pathname\`.
- Click Log out → \`logout()\` then \`router.push('/login')\`.
- Scroll past 40px → condensed bar.
- Mobile toggle → open/close panel; navigating closes it.
- Every interactive element is reachable by keyboard and shows the 2px accent focus ring.
- No loading or error states in the nav. If \`store\` is still loading, the sub-label is simply absent — do not render a skeleton.

## State management

Local to the component:
- \`condensed: boolean\` — from a passive \`scroll\` listener, threshold 40px.
- \`open: boolean\` — mobile panel; reset to \`false\` on \`pathname\` change.

From context/router: \`store\`, \`logout\` (\`useAuth\`), \`pathname\` (\`usePathname\`), \`router\` (\`useRouter\`). No data fetching.

## Design tokens

Declared in \`globals.css\` under Tailwind v4 \`@theme\`, so each is available as a utility (\`bg-accent\`, \`text-ink-muted\`, \`border-rule\`).

**Color**
| Token | Hex | Use |
| --- | --- | --- |
| accent | \`#0E7490\` | active link, focus ring, links |
| accent-wash | \`#E4F1F4\` | active pill background |
| ink | \`#101418\` | primary text |
| ink-muted | \`#4A5457\` | inactive links, buttons |
| ink-soft | \`#8A9597\` | micro-labels |
| rule | \`#E3E7E8\` | borders, dividers |
| rule-strong | \`#C9D0D1\` | inactive dots, hover borders |
| canvas | \`#F7F8F8\` | page background |
| surface | \`#FBFCFC\` | button hover |
| surface-hover | \`#F1F4F4\` | link hover |

Accent hover for plain text links: \`#0B5A6E\`.

**Typography** — Archivo (400/500/600/700) for UI; IBM Plex Mono (400/500) for uppercase micro-labels only. Both via \`next/font/google\`, exposed as \`--font-archivo\` / \`--font-plex-mono\` and mapped to \`--font-sans\` / \`--font-mono\`.

| Role | Font | Size | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Wordmark | Archivo | 17px (15px condensed) | 700 | -0.025em |
| Nav link | Archivo | 14px (13.5px condensed) | 500 / 600 active | — |
| Mobile row | Archivo | 15px | 500 / 600 active | — |
| Micro-label | IBM Plex Mono | 9.5–11px | 400 | 0.1em, uppercase |
| Page H1 | Archivo | 40px | 700 | -0.03em |

**Spacing** — 4 / 9 / 10 / 14 / 24px in the bar; page gutter 24px; content max-width 1360px.

**Radii** — 8px (condensed pill), 9px (logo mark), 10px (pill, button, mobile row), 14px (cards).

**Heights** — bar 68 / 52px; pill 38 / 32px; mobile row 48px; touch target ≥44px.

**Shadow** — condensed bar only: \`0 1px 12px rgba(16,20,24,0.08)\`.

Light mode only. The create-next-app \`prefers-color-scheme: dark\` block is removed; dark mode is out of scope until the palette is extended.

## Assets

None shipped. The logo is a dashed CSS placeholder inside \`LogoMark\` — swap it when the real mark exists. Link dots and the logout glyph are CSS shapes, not an icon set; if you adopt one (lucide-react suits the weight), replace them at 16px and keep the 9px gap.

## Files

| File | What it is |
| --- | --- |
| \`Navigation.dc.html\` | The HTML design reference — live bar, condensed variant, mobile panels, token sheet. Open in a browser. |
| \`code/NavBar.js\` | Implementation for \`frontend/app/components/NavBar.js\` |
| \`code/globals.css\` | Implementation for \`frontend/app/globals.css\` |
| \`code/layout.tsx\` | Implementation for \`frontend/app/layout.tsx\` |

## Open items

- \`max-w-5xl\` in the old nav became \`max-w-[1360px]\`. Page content under \`app/(app)/\` still uses the narrower width — align pages to 1360px or narrow the nav back; do not leave them mismatched.
- Login and register pages predate these tokens and still carry create-next-app styling.
