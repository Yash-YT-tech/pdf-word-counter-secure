# AGENTS.md — PDF Word Counter

## Project Identity
- **Project:** Private PDF Word & Page Counter
- **Codename:** pdf-word-counter
- **Domain (Candidate):** TBD (validate on instantdomainsearch.com before purchase)
- **Type:** Client-side micro-utility tool (100% browser-based, zero server uploads)
- **Stack:** AstroJS v5 + Tailwind CSS v4 + pdfjs-dist + Cloudflare Pages
- **Revenue Model:** Google AdSense (Auto Ads with Auto-Optimize)

## Core Privacy Promise
> **"100% Private & Client-Side. Your file never leaves your browser. Zero data sent to any server. Works offline."**

This is NOT a marketing line — it is a hard architectural constraint. Under NO circumstances should any file data, text content, or metadata from user PDFs be transmitted to any external service, API, or analytics endpoint. The entire PDF processing pipeline runs in-browser via Mozilla's `pdfjs-dist` Web Workers.

## Design Philosophy
- Follow `@DESIGN.md` (Vercel design system) as the primary visual standard.
- Adhere to Impeccable, Taste Skill, Emil Kowalski, and UI/UX Pro Max skill guidelines.
- Swiss minimalism: clean typography, generous whitespace, purposeful motion.
- Seamless dark/light mode toggle with system preference detection.
- Mobile-first responsive design — tool must work flawlessly on phones.

## Active Skills (Installed in Project)
| Skill | Purpose | Source |
|---|---|---|
| **Impeccable** | Post-edit visual QA, polish enforcement, anti-slop | `pbakaus/impeccable` |
| **UI/UX Pro Max** | Premium UI patterns, spacing, shadows, cards | `nextlevelbuilder/ui-ux-pro-max-skill` |
| **Emil Kowalski Skills** | Component library selection, animation, toast UX | `emilkowalski/skills` |
| **Taste Skill (v2)** | Anti-generic frontend design, editorial UI | `Leonxlnx/taste-skill` |
| **Web Design Guidelines** | Vercel-grade layout, typography, color systems | `vercel-labs/agent-skills` |
| **Tailwind v4 Docs** | Accurate Tailwind v4 utility classes (no v3 legacy) | `Lombiq/Tailwind-Agent-Skills` |
| **Vercel DESIGN.md** | Design tokens, spacing scale, component standards | `getdesign.md/vercel` |

## Key Rules for AI Agents Working on This Project
1. **Read `DESIGN.md` before writing ANY UI code.** Every component must conform to its spacing, color, and typography tokens.
2. **Read `PLAN.md` before starting any feature.** Understand the full scope before coding.
3. **Read `ARCHITECTURE.md` for technical decisions.** Do not deviate from the chosen architecture without updating the document first.
4. **Commit before each new prompt/task.** Follow the guide's git discipline — never lose working state.
5. **No placeholder content.** Every page must have real, SEO-optimized copy. No "Lorem ipsum" anywhere.
6. **Tailwind v4 ONLY.** Do not use `tailwind.config.js` or any Tailwind v3 patterns. Use CSS-first configuration via `@import "tailwindcss"`.
7. **Zero external API calls from user-facing code.** The PDF tool must be 100% offline-capable after initial page load.
8. **Test dark mode and mobile on every change.** Both are non-negotiable for AdSense approval and ranking.

## File Structure Conventions
```
pdf-word-counter/
├── AGENTS.md              # This file — project rules
├── DESIGN.md              # Vercel design system tokens
├── PLAN.md                # Detailed feature plan & scope
├── ARCHITECTURE.md        # Technical architecture decisions
├── EXECUTION_PHASES.md    # Phased build roadmap
├── CHANGES_LOG.md         # Chronological change log
├── PROGRESS_LOG.md        # Progress tracking with status
├── GIT_LOG.md             # Git commit conventions & history
├── astro.config.mjs       # Astro + Tailwind + Sitemap config
├── src/
│   ├── layouts/Layout.astro    # Base HTML shell (meta, analytics, dark mode)
│   ├── components/             # Reusable Astro/JS components
│   ├── pages/                  # Route pages (index, about, privacy, terms, contact)
│   ├── styles/global.css       # Tailwind v4 imports + custom properties
│   └── scripts/                # Client-side JS (pdf-processor, theme-toggle)
├── public/                     # Static assets (favicon suite, robots.txt)
└── .impeccable/                # Impeccable skill configuration
```

## SEO Requirements
- **Primary Keyword:** `pdf word counter`
- **Supporting Keywords:** `count words in pdf`, `pdf page counter`, `private pdf word counter`, `pdf character count`, `pdf reading time`, `client side pdf word counter`, `free pdf word count tool`, `pdf word counter no upload`
- **Content Requirement:** 800–1,200 words of editorial guide below the tool on homepage.
- **Schema Markup:** JSON-LD FAQPage structured data.
- **Legal Pages:** `/privacy-policy`, `/terms`, `/about`, `/contact` — all mandatory for AdSense.

## Reference Documents
- [micro-saas-yt-video-un.md](../micro-saas-yt-video-un.md) — Master strategy guide from Compile Future video.
