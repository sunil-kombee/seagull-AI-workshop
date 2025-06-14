# 📘 Cursor AI Frontend Rules — Seagull Project

## Project Name
**Seagull** — Global Travel Services Booking Platform

## Tech Stack
- **Next.js**: (App Router)
- **React**
- **Tailwind CSS**: 3.4
- **State Management**: Zustand
- **Forms & Validation**: React Hook Form + Zod
- **Networking**: Axios with interceptors
- **UX Libraries**: Lucide React, Headless UI, react-hot-toast
- **Utilities**: Day.js, clsx, tailwind-merge
- **Domain**: TravelTech (Booking, Checkout, Payments, QR)

---

## Rule 1: Use `next/dynamic` for non-critical or heavy components

**Applies To**: Frontend  
**Context**: Large components like Swiper, QR code preview, or charts.  
**Rule**: Import with `next/dynamic` and set `{ ssr: false }` where needed.  
**Rationale**: Reduces TTFB, avoids hydration mismatch, and improves Lighthouse score.

---

## Rule 2: Forms must use `react-hook-form` + `zod` schema

**Applies To**: Frontend  
**Context**: For `/checkout`, `/login`, `/profile`, `/admin/*`, etc.  
**Rule**: Integrate Zod schemas via `zodResolver` to enforce both client-side and backend-aligned validations.  
**Rationale**: Ensures correctness, user feedback, and secure input handling.

---

## Rule 3: Query params must be reflected in the URL for filter/search routes

**Applies To**: Frontend  
**Context**: Listings on `/services`, `/admin/bookings`, `/admin/reports`.  
**Rule**: Use `useSearchParams` + `router.push()` to sync filters with URLs.  
**Rationale**: Supports deep linking, bookmarking, and analytics.

---

## Rule 4: Always use `next/image` for image rendering

**Applies To**: Frontend  
**Context**: Product/service cards, QR previews, SIM thumbnails.  
**Rule**: Use `next/image` with `fill` or `responsive` layout. Avoid `<img>`.  
**Rationale**: Native image optimization via CDN, better LCP performance.

---

## Rule 5: Build all pages mobile-first

**Applies To**: Frontend  
**Context**: `/services`, `/confirmation`, `/checkout`, etc.  
**Rule**: Design from `sm:` upward using Tailwind's mobile-first approach.  
**Rationale**: Seagull’s users will book services on-the-go, on phones.

---

## Rule 6: Show skeletons for all async list views

**Applies To**: Frontend  
**Context**: Cards, bookings, admin panels, filtered reports.  
**Rule**: Use Skeleton components during loading states.  
**Rationale**: Improves perceived performance and UX continuity.

---

## Rule 7: Use `react-hot-toast` for all success/error user feedback

**Applies To**: Frontend  
**Context**: On form submission, payment, booking, etc.  
**Rule**: Wrap API calls with toast handlers using `toast.promise(...)`.  
**Rationale**: Provides instant feedback for critical user flows.

---

## Rule 8: Cart and auth session state should be managed via Zustand

**Applies To**: Frontend  
**Context**: Multi-service cart, temporary booking state, UI flags.  
**Rule**: Use Zustand for ephemeral, session-only state across pages.  
**Rationale**: Lightweight, boilerplate-free and SSR-safe.

---

## Rule 9: All QR code displays must include fallback text + download support

**Applies To**: Frontend  
**Context**: `/confirmation`, `/bookings`, and vouchers.  
**Rule**: Use a QR code generator that supports `alt`, and allow users to download.  
**Rationale**: Accessibility + offline support during travel.

---

## Rule 10: Use `Intl.NumberFormat` and `Intl.DateTimeFormat` for locale formatting

**Applies To**: Frontend  
**Context**: All currency, booking dates, service availability.  
**Rule**: Localize with appropriate options (e.g., `INR`, `USD`, 24h clock, weekday names).  
**Rationale**: Makes international pricing and calendars clearer.

---

## Rule 11: Poll for payment status on `/confirmation`

**Applies To**: Frontend  
**Context**: Stripe confirmations may lag webhook processing.  
**Rule**: Poll every 2 seconds for 30 seconds max. Provide a final fallback with support contact.  
**Rationale**: Prevents lost bookings due to race conditions in payment flow.

---

## Rule 12: Protect admin routes with role-based client checks

**Applies To**: Frontend  
**Context**: All `/admin` pages.  
**Rule**: Hide navigation + redirect unauthorized users on load. Optionally add server auth in `middleware.ts`.  
**Rationale**: Adds client-side UX fallback on top of server auth logic.

---

## Rule 13: Use shared layout wrappers for `/admin` and `/checkout` sections

**Applies To**: Frontend  
**Context**: Shared headers, sidebars, and flows.  
**Rule**: Use `app/admin/layout.tsx` and `app/checkout/layout.tsx` for global UI containers.  
**Rationale**: Maintains layout consistency and simplifies navigation/logic.

---

## Rule 14: Always use `tailwind-merge` when combining dynamic classNames

**Applies To**: Frontend  
**Context**: Conditional button styling, errors, themes.  
**Rule**: Use `twMerge()` or utility wrapper when composing tailwind classes dynamically.  
**Rationale**: Prevents class conflicts and visual bugs.

---

## Rule 15: Prefer server components and caching via `generateStaticParams` and `revalidate`

**Applies To**: Frontend  
**Context**: `/services/[slug]`, static services like `/sim-insurance`.  
**Rule**: Use App Router conventions to statically generate read-only data.  
**Rationale**: Improves performance, scalability, and SEO.

---

## Rule 16: Use `clsx()` for class merging with conditions

**Applies To**: Frontend  
**Context**: Interactive UI components.  
**Rule**: Replace manual string joins with `clsx()` to combine conditional Tailwind classes.  
**Rationale**: Cleaner code, easier debugging, and avoids class overwrite bugs.

---

## Rule 17: In all filtered lists, add empty state UI when results = 0

**Applies To**: Frontend  
**Context**: Filters on `/services`, `/admin/bookings`, `/bookings`.  
**Rule**: If no items match, show an icon, title, and optional CTA to reset filters.  
**Rationale**: Guides user and avoids confusion.

---

## Rule 18: Add basic timezone awareness to all date pickers and calendar displays

**Applies To**: Frontend  
**Context**: Travel bookings across timezones.  
**Rule**: Use Day.js with `dayjs.tz` or browser time offset where relevant.  
**Rationale**: Prevents booking at the wrong hour, especially for airport transfers.

---

## Rule 19: Lazy load all below-the-fold sections with dynamic import

**Applies To**: Frontend  
**Context**: Landing, service detail, booking history, etc.  
**Rule**: Use `next/dynamic` with loading skeletons for non-critical content.  
**Rationale**: Optimizes LCP, reduces initial bundle.

---

## Rule 20: Prefer semantic HTML with Tailwind for accessibility

**Applies To**: Frontend  
**Context**: All buttons, forms, links, headers.  
**Rule**: Use `<button>`, `<a>`, `<form>`, `<section>` over `<div>`s.  
**Rationale**: Required for accessibility (WCAG), improves SEO, and keyboard navigation.