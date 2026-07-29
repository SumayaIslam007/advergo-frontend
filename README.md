# Advergo Frontend

Next.js (App Router) storefront for Advergo Sports & Fashion Wear Ltd. -- product catalog, fabric
guide, custom quote flow with live pricing, and customer accounts/wishlist. Talks to the
[Django backend](../advergo-backend) over its REST API.

## Setup

```bash
cp .env.example .env.local   # sets NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
npm install
npm run dev
```

The backend must be running (see `advergo-backend/README.md`) for pages to render real data --
every catalog/content page fetches from the Django API server-side; there's no local static
fallback data anymore.

## Auth

Login/registration go through Next.js Route Handlers (`src/app/api/auth/*`), which proxy to the
Django backend and store the resulting JWTs as **httpOnly cookies** -- never exposed to
client-side JS, so an XSS bug can't be used to steal a session token. `src/lib/auth/server-fetch.ts`
(`authFetch`) wraps calls from Server Components/Route Handlers with the cookie's access token and
transparently refreshes it once on a 401 before giving up.

Client Components that need an authenticated mutation (e.g. the wishlist heart button) call a
same-origin Next.js route (`/api/wishlist`) rather than hitting Django directly, so the browser
never needs to see the token at all -- the route handler reads it from the cookie server-side.

## Project layout

```
src/
  app/                  routes (App Router)
    api/auth/            login/register/logout/me route handlers (BFF -- sets httpOnly cookies)
    api/wishlist/         same-origin proxy for the wishlist toggle (Client Components use this)
    login/, register/     account pages
    wishlist/              "my wishlist" page (server-rendered, redirects to /login if signed out)
  components/
    ui/                  generic primitives (Button, Field, SelectField, Section, ...)
    layout/              Navbar, Footer, WhatsAppButton (shared chrome)
    sections/<page>/     page-specific composite blocks
  lib/
    api/                 typed fetch functions against the public Django API (catalog, content,
                         reviews, pricing, quotes) + the `safe()` fallback wrapper
    auth/                cookie helpers, `authFetch`, `getCurrentUser`, wishlist server helper
  types/index.ts         content + auth + form value types, mirroring the backend's API shape
```

New page → folder in `src/app/` + a `sections/<name>/` folder for its blocks. New reusable UI
primitive → `src/components/ui/`. New content type → add the interface to `types/index.ts`, then
a fetch function in `src/lib/api/`.

## Resilience note

Every data-fetching call site in a page goes through `safe(promise, fallback)`
(`src/lib/api/client.ts`) rather than being awaited directly. This isn't defensive-for-the-sake-of-it:
during testing, a transient backend hiccup inside `Promise.all` threw uncaught, which tripped
Next's dev-mode error-recovery into a reload loop that hammered the backend far harder than the
original hiccup. `safe()` means a page degrades to an empty/placeholder state instead of crashing.

## Testing & linting

```bash
npx tsc --noEmit
npx eslint .
```

There is no frontend test suite yet (no component/e2e tests configured). Changes have been
verified manually via `npm run dev` + a real browser for every phase of work so far.
