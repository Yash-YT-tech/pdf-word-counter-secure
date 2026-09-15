# GIT_LOG.md — PDF Word Counter: Git Conventions & History

> **Last Updated:** 2026-09-15

---

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>: <short description>

[optional body]
[optional footer]
```

### Types:
| Type | When to Use |
|---|---|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `docs` | Documentation only changes |
| `style` | CSS/design changes that don't affect functionality |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or correcting tests |
| `chore` | Build process, dependency updates, tooling |
| `seo` | SEO-specific changes (meta tags, schema, content) |
| `deploy` | Deployment-related changes |

### Examples:
```
feat: add base layout with dark mode system
feat: implement core PDF processing engine
seo: add 1000-word editorial guide and FAQ schema
fix: handle encrypted PDF error gracefully
style: polish stats card spacing and shadows
deploy: configure Cloudflare Pages deployment
chore: update pdfjs-dist to latest version
```

---

## Branching Strategy

**Simple trunk-based development** (single developer micro-SaaS):
- `main` — Production branch, always deployable
- Feature work done directly on `main` with frequent commits
- Each phase gets a commit (or series of commits) before moving to next

---

## The Guide's Golden Rule

> **⚠️ COMMIT BEFORE EACH NEW PROMPT/TASK!**  
> From the Compile Future guide: "Committing before giving each prompt is important."  
> This ensures you can always roll back if an AI agent produces bad output.

---

## Commit History

### Phase 2: Core PDF Tool Engine

| # | Hash | Message | Date |
|---|---|---|---|
| 7 | `pending` | `feat: implement core PDF processing engine, interactive dropzone, metric stats, and page breakdown` | 2026-09-15 |

### Phase 1: Layout System & Design Foundation

| # | Hash | Message | Date |
|---|---|---|---|
| 6 | `79f235b` | `feat: integrate temporary Agentation visual feedback toolbar and skills` | 2026-09-15 |
| 5 | `9b07b6a` | `feat: implement layout system, header, footer, dark mode, 404, legal pages, robots.txt, and sitemap` | 2026-09-15 |

### Phase 0: Scaffold & Foundation

| # | Hash | Message | Date |
|---|---|---|---|
| 4 | `1fb146c` | `docs: record GitHub remote origin sync in GIT_LOG` | 2026-09-15 |
| 3 | `5c9a975` | `docs: add project documentation (AGENTS, PLAN, ARCHITECTURE, EXECUTION_PHASES, CHANGES_LOG, PROGRESS_LOG, GIT_LOG) and install 26+ design/engineering skills (Impeccable, Emil Kowalski, Taste, Vercel)` | 2026-09-15 |
| 2 | `230ef07` | `feat: scaffold AstroJS project with Tailwind v4, sitemap, pdfjs-dist, and Vercel design system` | 2026-09-15 |
| 1 | `7f6fd39` | `Initial commit (from GitHub repo)` | 2026-09-15 |

- **Remote Origin:** `https://github.com/Yash-YT-tech/pdf-word-counter-secure.git` (tracked on `main`)

---

*Future commits will be logged above this line as work progresses.*

---

## Useful Git Commands

```bash
# Check status
git status

# Stage all changes
git add .

# Commit with message
git commit -m "feat: description here"

# View log
git log --oneline -10

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Push to GitHub (after remote is added)
git push origin main

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/pdf-word-counter.git
```
