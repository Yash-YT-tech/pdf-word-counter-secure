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

### Phase 0: Scaffold & Foundation

| # | Hash | Message | Date |
|---|---|---|---|
| 1 | `9fe84bf` | `feat: scaffold AstroJS project with Tailwind v4, sitemap, pdfjs-dist, and Vercel design system` | 2026-09-15 |

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
