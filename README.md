# Open Tickets site prototype

A React + TypeScript + Vite single-page website prototype branded for Open Tickets. The layout keeps the responsive event-ticketing, event detail, cart, wallet, FAQ and support experiences while using a locally bundled snapshot of public event data and artwork from [opentickets.co.za](https://opentickets.co.za/).

> **Important:** this repository is a front-end prototype. It does not connect to Open Tickets' production accounts, booking database, payment gateway, support system or ticket validation. Checkout/login actions are local demos. The event catalogue is a static snapshot (fetched 29 October 2026), not a live API feed. Confirm current prices, event status, availability and policies on the official website before relying on them.

## Requirements

- Node.js 20 or newer (Node 20 LTS recommended)
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Vite starts on `http://localhost:5173`. Production build and local preview:

```bash
npm run build
npm run preview
```

## Main routes

`/` home · `/events` all events · `/event/:slug` and `/o/:organizerSlug/:slug` event detail · `/cart` prototype cart · `/profile/tickets` local ticket wallet · `/find-my-tickets` ticket lookup demo · `/host` organiser enquiry demo · `/about` · `/contact` · `/faq` · `/login` · `/register` · `/privacy` · `/terms` · `/refund-policy` · `/refund-guarantee`.

## Project map

```text
.
├── index.html                    # document metadata, fonts, app mount point
├── package.json                  # scripts and runtime/development dependencies
├── package-lock.json             # reproducible npm dependency versions
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite + React + Tailwind v4 plugin and dev host
├── README.md                     # setup and project notes
├── GITHUB_GUIDE_BN.md            # Bengali GitHub publishing and maintenance guide
├── opentickets_source_data.json  # fetched public event listing/detail snapshot
├── public/
│   ├── icon.svg                  # prototype PWA/favicon icon
│   ├── manifest.webmanifest      # installable web-app metadata
│   ├── sw.js                    # service-worker shell
│   ├── assets/logo/              # light/dark Open Tickets wordmarks
│   ├── assets/pgw-logos/         # payment-type display artwork
│   └── media/
│       ├── auth/                 # generic sign-in background images
│       ├── categories/           # category artwork used by home/filter UI
│       └── events/               # local event banner images from source listings
└── src/
    ├── main.tsx                  # React entry point, router/provider, PWA registration
    ├── App.tsx                   # application shell and URL route table
    ├── index.css                 # global Tailwind tokens, themes and UI utilities
    ├── context/AppContext.tsx    # theme, local cart/tickets, local demo user and overlays
    ├── data/
    │   ├── events.ts             # typed event catalogue, categories, image wall, ZAR formatter
    │   └── legalAndFaq.ts        # source-based FAQ copy and footer navigation
    ├── components/
    │   ├── SiteHeader.tsx        # desktop/tablet site navigation and theme/search controls
    │   ├── SiteFooter.tsx        # footer, contact/social/payment links and mobile footer sheets
    │   ├── MobileBottomNav.tsx   # floating mobile navigation and More drawer
    │   ├── OpenTicketsCard.tsx   # source-style event listing card
    │   ├── OrganizerCtaBand.tsx  # event organiser CTA
    │   ├── SearchModal.tsx       # site-wide event search overlay
    │   ├── StoryViewerModal.tsx  # event story overlay
    │   └── ToastContainer.tsx    # notifications and mobile wallet preview simulator
    └── pages/
        ├── HomePage.tsx          # homepage and event catalogue highlights
        ├── EventsPage.tsx        # searchable/filterable event list
        ├── EventDetailPage.tsx   # event description, venue, ticket tiers and booking demo
        ├── CartPage.tsx          # local cart and non-payment checkout demo
        ├── MyTicketsPage.tsx     # local ticket wallet / QR demo
        ├── FindMyTicketsPage.tsx # guest ticket lookup demo
        ├── HostPage.tsx          # organiser enquiry prototype
        ├── AboutPage.tsx         # project/company overview and official links
        ├── ContactPage.tsx       # source-published support channels
        ├── FaqPage.tsx           # source-based FAQ browser
        ├── AuthPage.tsx          # local sign-in/register demo
        ├── LegalPage.tsx         # links to official policy/terms pages
        └── NotFoundPage.tsx      # fallback route
```

## Where to make common changes

- **Branding, colors, fonts, global responsive styles:** `src/index.css`, `index.html`, `public/icon.svg`, `public/manifest.webmanifest`, `public/assets/logo/`.
- **Events, prices, event descriptions, dates, venues and categories:** `src/data/events.ts`; matching image files live in `public/media/events/`. The raw scrape snapshot is in `opentickets_source_data.json`.
- **FAQ wording and footer link groups:** `src/data/legalAndFaq.ts`.
- **Shared navigation, mobile drawer, search and footer:** `src/components/`.
- **A single page's layout/content:** matching file in `src/pages/`.
- **Local-only app/cart/ticket behaviour:** `src/context/AppContext.tsx`; checkout is deliberately not a real payment integration.
- **Add or change routes:** `src/App.tsx`.

## Event-data maintenance

`src/data/events.ts` contains a bundled public snapshot of the event cards and ticket tiers collected from the public Open Tickets home/event pages on 29 October 2026. It is intentionally local so the prototype works without cross-origin API access. It does **not** update itself from Open Tickets. For current facts, use the official event pages linked in the detail view or update the local data and image assets after checking the source. Do not treat old snapshot prices or availability as live.

## Deploy to GitHub Pages

This repository includes `.github/workflows/deploy.yml`. Push the project to the `main` branch of the repository named `open-tickets`; GitHub Actions runs `npm ci`, builds with the `/open-tickets/` base path, and deploys `dist/` to Pages. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the build/deploy source. The `public/404.html` file handles direct refreshes on client-side routes.

For a different repository name, change the base path in `vite.config.ts` and `public/404.html` to match that repository URL before deploying.

See [`GITHUB_GUIDE_BN.md`](./GITHUB_GUIDE_BN.md) for step-by-step repository creation, push commands and a Bengali file map. The repository should not include `node_modules/`, `dist/`, browser caches, screenshots or generated ZIP archives.
