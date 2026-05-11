# Phase 1 — Insights / Newsletters (Public UI Only)

Scope: Frontend pages, components, and mock data. No backend, no auth, no CMS, no APIs, no email.

## Routes

- `/insights` — Listing page (src/routes/insights.tsx)
- `/insights/$slug` — Article page (src/routes/insights.$slug.tsx)

Both registered through TanStack Router file-based routing. Each route defines its own `head()` with SEO metadata (title, description, og:*).

## Mock Data

`src/data/insights.ts` — exports a typed `Article[]` with 6–8 realistic maritime articles:

- IMO Regulations 2025: Key Updates for Shipowners
- Hong Kong Convention: Ship Recycling Compliance Checklist
- Maritime Safety Standards — SOLAS Amendments
- Hazardous Material Inventory (IHM) — Practical Guidelines
- Green Ship Recycling Practices in South Asia
- EU Ship Recycling Regulation: Yard Approval Process
- Port State Control Inspections — Avoiding Detentions
- MARPOL Annex VI — Sulphur Cap Compliance

Each article: `slug`, `title`, `excerpt`, `category` (Regulations / Compliance / Safety / Sustainability), `publishedAt`, `readingTime`, `coverImage`, `author`, `body` (markdown-ish rich text rendered with structured paragraph/heading/list components — no external markdown lib needed; body stored as an array of typed blocks).

Cover images: use Unsplash maritime photo URLs (ships, ports, containers) for realism.

## Components (src/components/insights/)

- `InsightsHeader.tsx` — Page heading + intro paragraph for `/insights`
- `SearchBar.tsx` — Controlled input with icon (UI only, filters client-side over mock data)
- `CategoryFilter.tsx` — Horizontal pill list (All / Regulations / Compliance / Safety / Sustainability)
- `ArticleCard.tsx` — Cover thumbnail, category badge, title, excerpt, date + reading time, Read More link
- `Pagination.tsx` — Simple Prev / page numbers / Next (client-side over filtered list, 6 per page)
- `ArticleHeader.tsx` — Category, title, author, date, reading time, cover image
- `ArticleBody.tsx` — Renders block array (h2, paragraph, list, quote) with readable typography
- `RelatedArticles.tsx` — Up to 3 same-category cards (excludes current)
- `ShareButtons.tsx` — LinkedIn + Email share (uses `window.location.href` and `mailto:` / LinkedIn share URL — no backend)
- `SiteHeader.tsx` + `SiteFooter.tsx` — Minimal corporate top nav (Home, Services, Insights, Contact placeholders) and footer, applied via `__root.tsx` so insights pages feel integrated. Non-insights links are inert placeholders for now.

shadcn primitives reused: `button`, `input`, `badge`, `card`, `separator`.

## Design System (src/styles.css)

Light, professional, maritime. Update tokens:

- `--background`: near-white
- `--foreground`: deep slate
- `--primary`: muted maritime blue (e.g. `oklch(0.42 0.09 240)`)
- `--primary-foreground`: white
- `--accent`: soft pale blue surface
- `--muted-foreground`: balanced gray for metadata
- `--border`: subtle cool gray

Add utility classes / tokens:
- `--shadow-card`: very soft elevation for article cards on hover only
- Typography: body `text-[17px] leading-[1.75]` on article, `text-base` on listing. Headings use a slightly tighter tracking. Use system font stack (no Google Fonts dependency) — `ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto`. Article body max width `max-w-[68ch]` for comfortable reading.

No flashy animations. Only subtle `transition-colors` on links and a faint translateY on card hover.

## Listing Page Layout

```
[ Site header ]
[ Page intro: "Insights & Newsletters" + 1-sentence description ]
[ SearchBar ] [ CategoryFilter ]
[ Responsive grid: 1 col mobile, 2 col md, 3 col lg ]
  [ ArticleCard ] x N
[ Pagination ]
[ Site footer ]
```

Filtering: client-side filter by category + case-insensitive substring match on title/excerpt. Empty-state message when no results.

## Article Page Layout

```
[ Site header ]
[ Back to Insights link ]
[ ArticleHeader: category badge, H1, author • date • reading time ]
[ Cover image, rounded, full-width within max-w-3xl ]
[ ArticleBody — max-w-[68ch], generous spacing, h2 dividers ]
[ ShareButtons (LinkedIn, Email) ]
[ Separator ]
[ RelatedArticles ]
[ Site footer ]
```

If slug not found → use route `notFoundComponent` with a "Browse all insights" link.

## SEO / Head

- Listing: title "Insights & Newsletters — SOS India", relevant description, og tags.
- Article: title from article, description from excerpt, `og:image` from cover, `og:type=article`. Single H1 per page. Semantic `<article>`, `<time datetime>`, alt text on images.

## Mobile

- Cards stack to 1 column under `md`.
- Filter pills horizontally scroll on small screens (no wrap clutter).
- Article body padding `px-5` on mobile, `px-8` on desktop.
- Tap targets ≥ 44px for share buttons and pagination.

## Out of Scope (Phase 1)

No admin panel, no Lovable Cloud, no auth, no DB, no email sending, no real share analytics, no comments, no subscribe form wiring (a visual "Subscribe" CTA may appear in footer but does nothing).

## Deliverables Checklist

- [ ] `src/data/insights.ts` with 8 articles + types
- [ ] `src/routes/insights.tsx` listing
- [ ] `src/routes/insights.$slug.tsx` article
- [ ] `src/components/insights/*` components above
- [ ] Updated `src/styles.css` tokens
- [ ] `__root.tsx` wraps Outlet with `SiteHeader` + `SiteFooter`
- [ ] Index page gets a small "Latest Insights" teaser linking to `/insights` (3 cards) — keeps integration cohesive without overhauling the home page
