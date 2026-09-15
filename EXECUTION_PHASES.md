# EXECUTION_PHASES.md — PDF Word Counter: Phased Build Roadmap

> **Last Updated:** 2026-09-15  
> **Status:** ✅ Phase 4 Complete — Ready for Phase 5 (Deploy & Domain Setup)

---

## Phase Overview

```
Phase 0 ──► Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5 ──► Phase 6
Scaffold     Layout &    Core PDF    SEO &       Polish &    Deploy &    Analytics
& Skills     Design      Tool        Content     Favicon &   Domain      & Search
             System      Engine                  Pre-Deploy  Setup       Console
                                                                         
[DONE ✅]   [DONE ✅]   [DONE ✅]   [DONE ✅]   [DONE ✅]   [NEXT ▶]   [PENDING]
```

---

## Phase 0: Project Scaffold & Skill Installation ✅ COMPLETE

**Duration:** ~30 minutes  
**Status:** ✅ Done (2026-09-15)

### Completed Tasks:
- [x] Initialize AstroJS project (`npm create astro@latest -- --template minimal`)
- [x] Install base dependencies (`npm install`)
- [x] Add Tailwind CSS v4 (`npx astro add tailwind -y`)
- [x] Add @astrojs/sitemap (`npx astro add sitemap -y`)
- [x] Install pdfjs-dist (`npm install pdfjs-dist`)
- [x] Add Vercel DESIGN.md (`npx getdesign@latest add vercel`)
- [x] Initialize Git repo with first commit
- [x] Verify dev server boots cleanly (`npm run dev` → localhost:4321)
- [x] Install Impeccable skill (`npx impeccable install`)
- [x] Install Emil Kowalski skills (`npx skills@latest add emilkowalski/skills`)
- [x] Install Taste Skill — 13 skills (`npx skills add https://github.com/Leonxlnx/taste-skill`)
- [x] Install Vercel Web Design Guidelines (`npx skills@latest add vercel-labs/agent-skills --skill web-design-guidelines`)
- [x] Create project documentation (AGENTS.md, PLAN.md, ARCHITECTURE.md, etc.)

---

## Phase 1: Layout System & Design Foundation ✅ COMPLETE

**Duration:** ~1 hour  
**Status:** ✅ Done (2026-09-15)

### Completed Tasks:
- [x] Create `src/layouts/Layout.astro` — Base HTML shell
  - Import `global.css` (Tailwind v4)
  - Add `<meta>` charset, viewport, description, OG tags, Twitter cards
  - Anti-FOUC inline dark mode initialization script
  - Google Analytics 4 placeholder
  - WebApplication JSON-LD structured data schema
- [x] Create `src/components/Header.astro`
  - Brand logo with document icon and pulsing "100% Private" badge
  - Navigation links (Tool, Why Private, How It Works, FAQ, About)
  - Dark/light theme toggle button
  - GitHub source code link
  - Responsive mobile navigation drawer
- [x] Create `src/components/Footer.astro`
  - 100% Client-side privacy statement
  - Tools & features directory
  - Trust & legal navigation (Privacy Policy, Terms, About, Contact)
  - Cloudflare Edge & copyright notice
- [x] Set up `src/styles/global.css`
  - Tailwind v4 `@import "tailwindcss";`
  - Light and dark mode theme variables
  - Minimal modern scrollbars
  - Smooth theme transitions
- [x] Create custom `src/pages/404.astro` error page
- [x] Create initial legal & trust pages (`about.astro`, `contact.astro`, `privacy-policy.astro`, `terms.astro`)
- [x] Create `public/robots.txt` and `public/_headers` (duplicate content blocker)
- [x] Configure `site` URL in `astro.config.mjs` for automated sitemap generation
- [x] Verified static build: 6 pages compiled cleanly in ~1 second

---

## Phase 2: Core PDF Tool Engine ✅ COMPLETE

**Duration:** ~2 hours  
**Status:** ✅ Done (2026-09-15)

### Completed Tasks:
- [x] Create `src/scripts/pdf-processor.ts`
  - Initialize pdfjs-dist with self-hosted Web Worker (`/pdf.worker.min.mjs`)
  - `analyzePDF(file: File, onProgress)` → in-memory arrayBuffer processing
  - Per-page text extraction via `page.getTextContent()`
  - Accurate word counting (normalized whitespace splitting)
  - Character metrics (with spaces & without spaces)
  - Estimated reading time (at 225 wpm) & speaking time (at 130 wpm)
  - Diagnostic scanner to detect image-only / scanned PDFs lacking text layer
  - Password & format error exception handling
- [x] Create `src/components/DropZone.astro`
  - Drag-and-drop visual drop zone with hover/drag state animations
  - File browser fallback input
  - Dynamic animated progress bar ("Analyzing page X of Y...")
  - Error state alert banner with "Try Again" dismiss action
- [x] Create `src/components/StatsDisplay.astro`
  - 6-card metric grid: Words, Pages, Characters (spaces), Characters (no spaces), Reading Time, Speaking Time
  - Document header banner with file name, file size, and memory sandbox badge
  - Scanned PDF warning alert banner
  - 1-click "Copy Summary" button with clipboard API and copied state feedback
  - "Export CSV Report" button with browser file download
  - "New File" reset action
- [x] Create `src/components/PageBreakdown.astro`
  - Expandable/collapsible table with granular per-page metrics
  - Sticky glassmorphism table header and zebra striping
  - Instant page number filter search input
- [x] Wire full tool into `src/pages/index.astro`
- [x] Copy self-hosted `pdf.worker.min.mjs` (1.3MB) into `public/` for zero-CDN offline reliability
- [x] Verified production build: 6 pages built cleanly in under 1 second

---

## Phase 3: SEO Content & Legal Pages ✅ COMPLETE

**Duration:** ~1.5 hours  
**Status:** ✅ Done (2026-09-15)

### Completed Tasks:
- [x] Write 1,000+ word editorial guide for homepage (`src/components/SEOContent.astro`)
  - The mechanics of PDF text extraction (glyph operators, font matrices, ligatures)
  - Security hazards of cloud-based converters (NDAs, HIPAA, GDPR)
  - In-depth industry use cases (translators, students, legal litigation, speakers)
  - Architectural comparison table: Client-Side vs. Cloud Converters
  - Comprehensive explanation of scanned documents vs. digital PDFs (OCR)
- [x] Create `src/components/FAQ.astro`
  - 10 targeted SEO questions and answers
  - Accessible accordion UI with animated chevron rotation
  - Structured JSON-LD `FAQPage` schema embedded in page
- [x] Expand and enhance trust & legal pages:
  - `src/pages/privacy-policy.astro` — GDPR, CCPA/CPRA, and Google AdSense cookie compliance
  - `src/pages/terms.astro` — 100% user document IP ownership, warranty disclaimers, liability limits
  - `src/pages/about.astro` — Mission, client-side Web Worker architecture, open-source verification
  - `src/pages/contact.astro` — Direct email, GitHub issue tracker, 24-48h response commitment
- [x] Verified static build: 6 pages compiled cleanly in ~1 second

---

## Phase 4: Polish, Favicon & Pre-Deploy QA ✅ COMPLETE

**Duration:** ~1–2 hours  
**Status:** ✅ Done (2026-09-15)

### Completed Tasks:
- [x] Design brand identity with minimalist document & privacy shield iconography
- [x] Generate full favicon suite (`public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`, `public/site.webmanifest`)
- [x] Wire favicon code into `Layout.astro` `<head>`
- [x] Create high-resolution `public/og-image.png` (1200x630 social share card)
- [x] Implement accessibility polish: keyboard navigation (Enter/Space on Dropzone), aria-labels, focus rings
- [x] Test dark mode and responsive layouts across all 6 static routes
- [x] Verify client-side Web Worker memory safety and zero server calls
- [x] Verify clean production build: 6 pages + sitemap compiled in ~1s
- [x] **Git commit:** `feat: add custom favicon suite, og-image, webmanifest, and a11y polish`

---

## Phase 5: Deploy & Domain Setup 🔲 NEXT

**Duration:** ~1–2 hours  
**Prerequisite:** Phase 4 complete

### Tasks:
- [ ] Login to Cloudflare Wrangler (`npx wrangler login`)
- [ ] Build project (`npm run build`)
- [ ] Deploy to Cloudflare Pages (`npx wrangler pages deploy dist`)
- [ ] Create `public/_headers` with `X-Robots-Tag: noindex` for `*.pages.dev`
- [ ] Validate domain availability on [Instant Domain Search](https://instantdomainsearch.com/)
- [ ] Purchase `.com` domain (Spaceship or Namecheap)
- [ ] Turn off auto-renewal on domain
- [ ] Add domain to Cloudflare (Free plan)
- [ ] Update registrar nameservers to Cloudflare's assigned NS
- [ ] Bind custom domain in Cloudflare Pages (root + www)
- [ ] Wait for DNS propagation and SSL certificate issuance
- [ ] Set up Cloudflare Email Routing (`support@yourdomain.com` → Gmail)
- [ ] Update `astro.config.mjs` with `site: 'https://yourdomain.com'`
- [ ] Rebuild and redeploy with correct site URL
- [ ] Add deploy script to package.json: `"deploy": "npm run build && wrangler pages deploy dist"`
- [ ] **Git commit:** `feat: deploy to Cloudflare Pages, bind custom domain`

---

## Phase 6: Analytics, Search Console & Monetization 🔲

**Duration:** ~1–2 hours (setup) + 30–60 day waiting period  
**Prerequisite:** Phase 5 complete

### Tasks:
- [ ] Create GA4 property, get Measurement ID (`G-XXXXXXXXXX`)
- [ ] Embed GA4 gtag script in Layout.astro
- [ ] Verify domain in Google Search Console (DNS TXT record)
- [ ] Submit sitemap to GSC: `https://yourdomain.com/sitemap-index.xml`
- [ ] Request indexing for homepage via URL Inspection
- [ ] Import GSC property into Bing Webmaster Tools (1-click)
- [ ] Redeploy with analytics code
- [ ] **WAIT 30–60 days** for organic traffic to build
- [ ] Monitor GSC for impressions, clicks, and any crawl errors
- [ ] When daily visitors reach 5–10+, apply for Google AdSense
- [ ] Complete AdSense verification (meta tag, tax forms, ID)
- [ ] Once approved, enable Auto Ads with Auto-Optimize
- [ ] **Git commit:** `feat: add GA4, submit to search consoles`

---

## Post-Launch Growth Ideas (Future Phases)

- [ ] Add sub-pages for keyword variants (`/pdf-page-counter`, `/pdf-character-counter`)
- [ ] Build international clones (Spanish, German, Portuguese)
- [ ] Add multi-language support via Astro i18n
- [ ] Create a blog section with PDF-related guides
- [ ] Add social sharing buttons for results
- [ ] Explore programmatic SEO for long-tail keywords
