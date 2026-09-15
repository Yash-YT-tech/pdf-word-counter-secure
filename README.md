# Private PDF Word & Page Counter (`pdf-word-counter-secure`)

> **100% Client-Side & Private.** Your file never leaves your browser. Zero data sent to any server. Works offline.

A modern, privacy-first micro-utility tool to count words, pages, characters, and calculate estimated reading and speaking times for PDF documents directly in the user's browser using Mozilla's `pdfjs-dist` and AstroJS.

## 🚀 Key Features
- **100% Client-Side Privacy:** PDFs are processed in browser memory via Web Workers. No server uploads.
- **Accurate Word & Character Counts:** Total words, characters (with & without spaces).
- **Page-by-Page Breakdown:** Detailed table with per-page metrics.
- **Reading & Speaking Time Estimates:** Instant calculation based on standard reading (225 wpm) and speaking (130 wpm) speeds.
- **Scanned Document Detection:** Alerts users if a PDF lacks a searchable text layer (image-only / scanned PDF).
- **Fast & Modern:** Built with AstroJS, Tailwind CSS v4, and Vercel design system guidelines. Zero bloat, instant load, dark & light mode support.

## 🧞 Project Commands
Run from the root of the project:

| Command | Action |
|---|---|
| `npm install` | Installs project dependencies |
| `npm run dev` | Starts local development server at `localhost:4321` |
| `npm run build` | Builds production-ready static site to `./dist/` |
| `npm run preview` | Previews production build locally |

## 🛠️ Stack
- **Framework:** [Astro](https://astro.build/) (v5+)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **PDF Engine:** [pdfjs-dist](https://github.com/mozilla/pdf.js) (Mozilla PDF.js)
- **Deployment:** Cloudflare Pages
