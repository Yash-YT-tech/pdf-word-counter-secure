# EXECUTION_PHASES.md — PDF Word Counter: Phased Build Roadmap

> **Last Updated:** 2026-09-15  
> **Status:** 🟡 Phase 0 Complete — Ready for Phase 1

---

## Phase Overview

```
Phase 0 ──► Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5 ──► Phase 6
Scaffold     Layout &    Core PDF    SEO &       Deploy &    Analytics   AdSense &
& Skills     Design      Tool        Content     Domain      & Search    Monetize
             System      Engine                  Setup       Console
                                                                     
[DONE ✅]   [NEXT ▶]   [PENDING]   [PENDING]   [PENDING]   [PENDING]   [PENDING]
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

## Phase 1: Layout System & Design Foundation 🔲 NEXT

**Duration:** ~2–3 hours  
**Prerequisite:** Phase 0 complete

### Tasks:
- [ ] Create `src/layouts/Layout.astro` — Base HTML shell
  - Import `global.css` (Tailwind)
  - Add `<meta>` charset, viewport, description, OG tags
  - Add dark mode class toggle (`<html class="dark">`)
  - Add Google Analytics 4 script placeholder (empty until Phase 5)
  - Add JSON-LD Organization schema
- [ ] Create `src/components/Header.astro`
  - Logo/site name (text-based initially)
  - Navigation links: Home, About, Contact
  - Dark/light mode toggle button with system preference detection
  - Mobile responsive hamburger menu
- [ ] Create `src/components/Footer.astro`
  - Privacy Policy, Terms, About, Contact links
  - "Built with ❤️ — 100% Private" tagline
  - Copyright notice
- [ ] Set up `src/styles/global.css`
  - Tailwind v4 import
  - Custom CSS properties for theme colors (light/dark)
  - Base typography scale
  - Smooth transitions for theme switching
- [ ] Create `src/scripts/theme-toggle.ts`
  - Read `localStorage` theme preference
  - Fall back to `prefers-color-scheme` media query
  - Toggle `dark` class on `<html>` element
  - Persist choice to `localStorage`
- [ ] Create custom `src/pages/404.astro` error page
- [ ] **Git commit:** `feat: add base layout, header, footer, dark mode system`

---

## Phase 2: Core PDF Tool Engine 🔲

**Duration:** ~3–4 hours  
**Prerequisite:** Phase 1 complete

### Tasks:
- [ ] Create `src/scripts/pdf-processor.ts`
  - Initialize pdfjs-dist with Web Worker
  - `processPDF(file: File)` → returns structured results object
  - Per-page text extraction via `page.getTextContent()`
  - Word counting (split by whitespace, filter empty strings)
  - Character counting (with spaces / without spaces)
  - Reading time calculation (total words / 225)
  - Speaking time calculation (total words / 130)
  - Scanned PDF detection (pages with 0 extractable text)
  - Error handling for corrupt/encrypted PDFs
- [ ] Create `src/components/DropZone.astro`
  - Drag-and-drop visual area with dashed border
  - File input fallback button
  - Accept only `.pdf` files
  - Loading spinner/progress during processing
  - File name and size display after selection
- [ ] Create `src/components/StatsDisplay.astro`
  - 4-column stat card grid (Words, Pages, Characters, Reading Time)
  - Animated number counting effect
  - Speaking time as secondary stat
  - Scanned PDF warning banner (if detected)
- [ ] Create `src/components/PageBreakdown.astro`
  - Expandable/collapsible table
  - Columns: Page #, Words, Characters
  - Zebra striping, responsive scroll on mobile
- [ ] Create `src/scripts/clipboard.ts`
  - Copy formatted summary to clipboard
  - Show success toast/notification
- [ ] Add CSV export functionality
  - Generate CSV blob from page breakdown data
  - Trigger browser download
- [ ] Wire everything together on `src/pages/index.astro`
- [ ] **Git commit:** `feat: implement core PDF processing engine and tool UI`

---

## Phase 3: SEO Content & Legal Pages 🔲

**Duration:** ~2–3 hours  
**Prerequisite:** Phase 2 complete

### Tasks:
- [ ] Write 800–1,200 word editorial guide for homepage
  - How to count words in a PDF (step-by-step)
  - Why client-side processing matters for privacy
  - Use cases for translators, students, lawyers
  - Technical explanation (accessible language)
- [ ] Create `src/components/FAQ.astro`
  - 10–12 SEO-relevant questions and answers
  - Accordion UI with smooth expand/collapse
  - JSON-LD FAQPage structured data in `<head>`
- [ ] Create `src/components/SEOContent.astro`
  - Wrapper for the editorial guide section
  - Proper H2/H3 heading hierarchy
  - Internal links to sub-pages
- [ ] Create legal pages:
  - `src/pages/privacy-policy.astro` — GDPR/CCPA compliant
  - `src/pages/terms.astro` — Terms of service
  - `src/pages/about.astro` — Mission, trust, who built it
  - `src/pages/contact.astro` — Contact info (professional email)
- [ ] Optimize all meta tags across all pages
  - Unique `<title>` per page (< 60 chars)
  - Unique `<meta description>` per page (150–160 chars)
  - OG image, OG title, OG description
  - Twitter card meta tags
- [ ] Create `public/robots.txt`
- [ ] Verify `sitemap.xml` generation
- [ ] **Git commit:** `feat: add SEO content, FAQ schema, legal pages, robots.txt`

---

## Phase 4: Polish, Favicon & Pre-Deploy QA 🔲

**Duration:** ~1–2 hours  
**Prerequisite:** Phase 3 complete

### Tasks:
- [ ] Generate logo on [LogoFast](https://logofa.st/)
- [ ] Generate full favicon suite on [RealFaviconGenerator](https://realfavicongenerator.net/)
- [ ] Add all favicon files to `public/`
- [ ] Wire favicon code into Layout.astro `<head>`
- [ ] Create `public/og-image.png` (1200x630 social share image)
- [ ] Run Lighthouse audit (target ≥ 95 mobile performance)
- [ ] Test dark mode on every page
- [ ] Test mobile responsiveness on every page
- [ ] Test PDF tool with: small PDF (1 page), large PDF (100+ pages), scanned PDF, encrypted PDF
- [ ] Run Impeccable polish check (`/impeccable polish`)
- [ ] Fix any visual inconsistencies or accessibility issues
- [ ] **Git commit:** `feat: add favicon, OG image, polish pass, QA complete`

---

## Phase 5: Deploy & Domain Setup 🔲

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
