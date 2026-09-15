# ARCHITECTURE.md — PDF Word Counter: Technical Architecture

> **Last Updated:** 2026-09-15  
> **Status:** 🟢 Finalized

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER'S BROWSER                               │
│                                                                     │
│  ┌────────────────────┐    ┌──────────────────────────────────┐     │
│  │   Astro Page (SSG) │    │   PDF Processing Web Worker      │     │
│  │                    │    │                                  │     │
│  │  • Drop Zone UI    │◄──►│  • pdfjs-dist (Mozilla PDF.js)  │     │
│  │  • Stats Display   │    │  • Text extraction per page     │     │
│  │  • Dark/Light Mode │    │  • Word/char/page counting      │     │
│  │  • SEO Content     │    │  • Scanned PDF detection        │     │
│  │  • FAQ Section     │    │  • Zero network calls           │     │
│  └────────────────────┘    └──────────────────────────────────┘     │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    NO DATA LEAVES THIS BOX                   │    │
│  │         All PDF bytes stay in browser memory only            │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ Static HTML/CSS/JS served from edge
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     CLOUDFLARE PAGES (CDN Edge)                      │
│                                                                     │
│  • Pre-built static HTML (AstroJS SSG output)                       │
│  • Global CDN distribution (300+ edge locations)                    │
│  • Free universal SSL certificate                                   │
│  • Custom domain binding (yourdomain.com + www)                     │
│  • Email Routing (support@yourdomain.com → Gmail)                   │
│  • _headers file: X-Robots-Tag: noindex on *.pages.dev              │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ DNS / Nameservers
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     DOMAIN REGISTRAR                                 │
│           (Spaceship / Namecheap — .com domain)                     │
│           Nameservers pointed to Cloudflare                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| **Framework** | AstroJS | v5+ (v7.3) | Zero JS by default, SSG, Islands Architecture, 100/100 Lighthouse |
| **Styling** | Tailwind CSS | v4.3 | CSS-first config, no `tailwind.config.js`, modern JIT engine |
| **PDF Engine** | pdfjs-dist | v6.3 | Mozilla's battle-tested PDF parser, runs in Web Worker, MIT license |
| **Build Tool** | Vite | (via Astro) | Sub-second HMR, optimized production builds |
| **SEO** | @astrojs/sitemap | v3.7 | Auto-generated sitemap.xml at build time |
| **Hosting** | Cloudflare Pages | Free tier | Unlimited bandwidth, global edge CDN, free SSL |
| **DNS** | Cloudflare DNS | Free tier | Fast propagation, DDoS protection |
| **Email** | Cloudflare Email Routing | Free | Forwards custom domain email to Gmail |
| **Analytics** | Google Analytics 4 | Free | Traffic measurement and attribution |
| **Search** | Google Search Console | Free | Indexing, impressions, click tracking |
| **Monetization** | Google AdSense | Free | Auto Ads with Auto-Optimize |

---

## 3. PDF Processing Pipeline

```
User drops PDF file
        │
        ▼
┌─────────────────────┐
│ FileReader API       │  Read file as ArrayBuffer (stays in browser memory)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ pdfjs-dist          │  Initialize PDF document from ArrayBuffer
│ getDocument()       │  Uses Web Worker for non-blocking processing
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Loop: page 1..N     │  For each page:
│ page.getTextContent()│  → Extract text items array
│                     │  → Concatenate into page string
│                     │  → Count words (split by whitespace, filter empty)
│                     │  → Count characters (with/without spaces)
│                     │  → Detect if page has zero text (scanned image)
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Aggregate Results    │  • Total words = sum of per-page words
│                     │  • Total chars = sum of per-page chars
│                     │  • Reading time = total words / 225
│                     │  • Speaking time = total words / 130
│                     │  • Scanned warning = any page with 0 text
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Render Results UI    │  Update DOM with animated counter display
│                     │  Populate page-by-page breakdown table
│                     │  Enable copy/export buttons
└─────────────────────┘
```

---

## 4. File & Directory Structure

```
pdf-word-counter/
├── .agents/skills/            # Installed AI agent skills (26+ skills)
├── .claude/                   # Impeccable hooks & Claude config
├── .impeccable/               # Impeccable engine binary
│
├── AGENTS.md                  # Project rules for AI agents
├── DESIGN.md                  # Vercel design system tokens
├── PLAN.md                    # Feature plan & scope
├── ARCHITECTURE.md            # This file — technical decisions
├── EXECUTION_PHASES.md        # Phased build roadmap
├── CHANGES_LOG.md             # Chronological change log
├── PROGRESS_LOG.md            # Progress tracking
├── GIT_LOG.md                 # Git conventions & history
│
├── astro.config.mjs           # Astro + Tailwind + Sitemap config
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config
│
├── src/
│   ├── layouts/
│   │   └── Layout.astro       # Base HTML shell (head, meta, analytics, fonts)
│   │
│   ├── components/
│   │   ├── Header.astro       # Navigation header with dark mode toggle
│   │   ├── Footer.astro       # Trust footer with legal links
│   │   ├── DropZone.astro     # PDF upload drag-and-drop area
│   │   ├── StatsDisplay.astro # Word/page/char/time metric cards
│   │   ├── PageBreakdown.astro# Per-page expandable table
│   │   ├── PrivacyBadge.astro # Trust signal component
│   │   ├── FAQ.astro          # FAQ accordion with JSON-LD
│   │   └── SEOContent.astro   # 800-1200 word editorial section
│   │
│   ├── pages/
│   │   ├── index.astro        # Homepage — main tool + SEO content
│   │   ├── about.astro        # About page
│   │   ├── contact.astro      # Contact page
│   │   ├── privacy-policy.astro # Privacy policy
│   │   ├── terms.astro        # Terms of service
│   │   └── 404.astro          # Custom 404 error page
│   │
│   ├── scripts/
│   │   ├── pdf-processor.ts   # Core PDF parsing logic (pdfjs-dist)
│   │   ├── theme-toggle.ts    # Dark/light mode with localStorage
│   │   └── clipboard.ts       # Copy-to-clipboard utility
│   │
│   └── styles/
│       └── global.css         # Tailwind v4 imports + custom properties
│
├── public/
│   ├── favicon.ico            # Favicon (from RealFaviconGenerator)
│   ├── favicon.svg            # SVG favicon
│   ├── apple-touch-icon.png   # iOS icon
│   ├── site.webmanifest       # PWA manifest
│   ├── robots.txt             # Crawl directives + sitemap URL
│   ├── _headers               # Cloudflare Pages: noindex on *.pages.dev
│   └── og-image.png           # Open Graph social share image
│
└── dist/                      # Build output (deployed to Cloudflare)
```

---

## 5. Key Architectural Decisions

### ADR-1: Static Site Generation (SSG) over Server-Side Rendering (SSR)
- **Decision:** Use Astro's default static output mode.
- **Rationale:** The PDF tool is 100% client-side. No server logic needed. SSG gives us the fastest possible page loads, perfect SEO crawlability, and free Cloudflare Pages hosting.

### ADR-2: pdfjs-dist over alternative PDF libraries
- **Decision:** Use Mozilla's `pdfjs-dist` for all PDF text extraction.
- **Rationale:** Battle-tested (powers Firefox's PDF viewer), MIT licensed, supports Web Workers for non-blocking processing, handles encrypted PDFs, and is the de facto standard for browser-based PDF parsing.

### ADR-3: Cloudflare Pages over Vercel/Netlify
- **Decision:** Deploy to Cloudflare Pages.
- **Rationale:** Truly unlimited bandwidth on free tier (Vercel has 100GB/month limit), integrated email routing, DNS management, and SSL — all from one dashboard at ₹0.

### ADR-4: No client-side framework (React/Vue/Svelte)
- **Decision:** Use vanilla JavaScript in Astro Islands for interactive elements.
- **Rationale:** The tool has minimal interactivity (file drop, results display, theme toggle). Adding React would add ~40KB gzipped for zero benefit. Vanilla JS keeps bundle tiny and Lighthouse scores perfect.

### ADR-5: Web Worker for PDF processing
- **Decision:** Run pdfjs-dist in a Web Worker to prevent UI thread blocking.
- **Rationale:** Large PDFs (100+ pages) can take 2-3 seconds to parse. Without a Web Worker, the UI would freeze during processing, causing terrible UX.

---

## 6. Performance Budget

| Metric | Budget | Enforcement |
|---|---|---|
| **Total JS (gzipped)** | < 500 KB | Includes pdfjs-dist worker |
| **First Contentful Paint** | < 1.0s | Astro SSG + Cloudflare edge |
| **Largest Contentful Paint** | < 2.5s | No hero images, text-first |
| **Cumulative Layout Shift** | < 0.05 | Reserved heights for all dynamic content |
| **Time to Interactive** | < 2.0s | Deferred pdfjs worker loading |
| **Lighthouse Performance** | ≥ 95 | Mobile audit as gate |

---

## 7. Security Considerations

1. **No file transmission:** PDF bytes never leave `window` scope. Verify with Network tab in DevTools.
2. **No localStorage of PDF data:** File contents are garbage-collected after processing. Only theme preference stored.
3. **CSP headers:** Strict Content Security Policy via `_headers` file — no inline scripts, no external script sources.
4. **Subresource Integrity:** If loading pdfjs worker from CDN, use SRI hashes. Prefer self-hosting.
5. **No cookies for tool functionality:** Only Google Analytics and AdSense cookies (disclosed in privacy policy).
