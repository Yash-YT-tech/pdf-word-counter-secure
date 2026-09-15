# PLAN.md — PDF Word Counter: Detailed Feature & Scope Plan

> **Last Updated:** 2026-09-15  
> **Status:** 🟡 Planning Phase (Pre-Build)

---

## 1. Product Vision

Build the **most trusted, private, and beautiful PDF Word Counter** on the internet. A zero-friction, zero-upload, 100% client-side utility that processes PDFs entirely in the user's browser using Mozilla's `pdfjs-dist`.

### Target Users
| Persona | Pain Point | What They Need |
|---|---|---|
| **Freelance Translators** | Billing clients per word — need accurate word counts from NDAs and contracts | Private word count + CSV export for invoicing |
| **Students & Researchers** | Thesis/paper word limits, reading time estimates | Quick word + page count, estimated reading time |
| **Legal Professionals** | Confidential contracts — cannot upload to cloud services | 100% client-side, zero network traffic guarantee |
| **Content Writers** | Blog post word targets, SEO content length checks | Fast, beautiful, instant results |
| **Corporate Teams** | Internal policy docs — data sovereignty requirements | Offline capability, no third-party tracking |

---

## 2. Core Feature Specification

### 2.1 Primary Tool — PDF Analyzer
| Feature | Description | Priority |
|---|---|---|
| **Drag & Drop Upload** | Visual drop zone with file browser fallback | P0 — Must Have |
| **Total Word Count** | Accurate word count across all pages | P0 — Must Have |
| **Total Page Count** | Number of pages in the PDF | P0 — Must Have |
| **Total Characters** | With spaces AND without spaces (separate counts) | P0 — Must Have |
| **Estimated Reading Time** | Based on 225 words/minute average | P0 — Must Have |
| **Estimated Speaking Time** | Based on 130 words/minute (for presentations) | P1 — Should Have |
| **Page-by-Page Breakdown** | Expandable table: words, characters per page | P1 — Should Have |
| **Scanned PDF Detection** | Alert if PDF contains images without OCR text layer | P1 — Should Have |
| **Copy Summary to Clipboard** | 1-click formatted summary (Word count: X, Pages: Y...) | P0 — Must Have |
| **Export CSV** | Download page-by-page breakdown as CSV for invoicing | P2 — Nice to Have |
| **Multiple File Support** | Process 2-3 PDFs sequentially and compare | P2 — Nice to Have |
| **Dark/Light Mode** | System-preference aware with manual toggle | P0 — Must Have |
| **Offline Support** | Tool works after initial page load with no internet | P1 — Should Have |

### 2.2 Privacy & Trust Signals
| Feature | Description |
|---|---|
| **Privacy Badge** | Prominent shield icon + "100% Private — Your file never leaves your browser" |
| **No Network Traffic Proof** | Visual indicator showing zero bytes sent to server during processing |
| **Open Source Badge** | Link to GitHub repo so users can verify the claim |

### 2.3 Sub-Pages (SEO Keyword Expansion)
| Page | Target Keyword | Content |
|---|---|---|
| `/` (Homepage) | `pdf word counter` | Main tool + 800-1200 word guide |
| `/pdf-page-counter` | `pdf page counter` | Focused page counter variant |
| `/pdf-character-counter` | `pdf character count` | Character-focused variant |
| `/pdf-reading-time` | `pdf reading time calculator` | Reading/speaking time focus |
| `/about` | — | Who built it, mission, trust |
| `/contact` | — | Contact form or email |
| `/privacy-policy` | — | GDPR/CCPA compliant privacy policy |
| `/terms` | — | Terms of service |

### 2.4 SEO Content Requirements
- **Homepage:** 800–1,200 words covering:
  - How to count words in a PDF (step-by-step)
  - Why privacy matters for PDF processing
  - Common use cases (translators, students, legal)
  - Comparison: client-side vs. cloud-based tools
  - Technical explanation of how pdfjs-dist works
- **FAQ Section:** 10-12 questions with JSON-LD FAQPage schema
- **Meta Tags:** Optimized `<title>`, `<meta description>`, OG tags, Twitter cards

---

## 3. Design Requirements

### Visual Direction
- **Style:** Swiss minimalist, inspired by Vercel/Linear aesthetic
- **Typography:** System font stack (Inter, SF Pro, Segoe UI fallbacks)
- **Color Palette:** Neutral grays + single accent color (blue or green for trust)
- **Spacing:** Generous whitespace, 8px grid system per DESIGN.md
- **Cards:** Subtle borders, no heavy shadows, clean stat display
- **Animation:** Subtle fade-in on results, smooth number counting animation
- **Mobile:** Full-width tool area, stacked stat cards, bottom-sheet breakdown

### Design Skills to Apply
1. `@DESIGN.md` — Primary token system (spacing, colors, typography)
2. `design-taste-frontend` — Anti-generic, editorial quality enforcement
3. `high-end-visual-design` — Premium agency-grade visual standards
4. `impeccable` — Post-edit QA and polish checks
5. `emil-design-eng` — Component polish and invisible details
6. `web-design-guidelines` — Vercel-grade layout standards
7. `minimalist-ui` — Clean editorial aesthetic

---

## 4. Technical Constraints

1. **Zero server-side processing.** All PDF parsing happens via `pdfjs-dist` in browser Web Workers.
2. **Zero external API calls.** No analytics pixels, tracking scripts, or CDN requests during PDF processing.
3. **Static site only.** Deploys to Cloudflare Pages as pre-built HTML/CSS/JS.
4. **Sub-second interaction.** Tool must show results within 1-2 seconds for a 50-page PDF.
5. **Core Web Vitals 95+.** Lighthouse performance score must be ≥95 on mobile.
6. **Bundle size budget.** Total JS (including pdfjs-dist worker) must stay under 500KB gzipped.

---

## 5. Competitor Analysis Summary

| Competitor | Strengths | Weaknesses (Our Opportunity) |
|---|---|---|
| **SmallPDF** | Brand recognition, many tools | Requires upload to server, freemium paywall, slow |
| **iLovePDF** | Feature-rich | Forces server upload, privacy concerns, cluttered UI |
| **CountWordsFree** | Simple | Outdated 2010s design, no dark mode, ads everywhere |
| **PDF24** | Free desktop tools | Heavy app download, not web-native, German-only SEO |
| **Online-Utility.org** | Wide tool coverage | Terrible UX, broken mobile, intrusive ads |

### Our Competitive Edge
- ✅ **Zero upload privacy** (unique differentiator)
- ✅ **Modern, beautiful UI** (dark mode, responsive, fast)
- ✅ **Instant results** (no queue, no processing time)
- ✅ **Free forever** (no paywall, no account required)
- ✅ **Offline capable** (works without internet after first load)

---

## 6. Success Metrics

| Metric | Target | Timeline |
|---|---|---|
| **Lighthouse Performance** | ≥ 95/100 (mobile) | At launch |
| **Core Web Vitals** | All green (LCP < 2.5s, FID < 100ms, CLS < 0.1) | At launch |
| **Google Indexing** | Homepage indexed within 48 hours | Week 1 |
| **Search Console Impressions** | 1,000+ impressions/month | Month 2-3 |
| **Daily Organic Visitors** | 10+ visitors/day | Month 2-3 |
| **AdSense Approval** | Approved on first or second attempt | Month 3-4 |
| **Monthly Revenue** | ₹5,000 – ₹20,000/month | Month 6-12 |
