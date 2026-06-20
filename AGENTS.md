# Smart Community App Generator — Agent Guidance

This is the condensed AI-assistant guidance for OpenAI Codex, GitHub Copilot, Cursor, and other Agentic AI Foundation tools.

**Single source of truth:** See [CLAUDE.md](./CLAUDE.md) for complete project guidelines. This file summarizes the load-bearing sections.

## Project Overview

AI-workflow-driven **Smart Community App Generator** (GDG Newport Beach Google I/O Extended hackathon). Helps entrepreneurs generate community sustainability apps with built-in contribution-reward loops. The generator itself demonstrates the Smart Assets ReFi business model.

**Core flow:** Voice & Story Agent (first step) → Design & Feature Agents → Review & Contribution Loop → Live Preview & Iteration — all orchestrated as LangGraph.js StateGraph nodes.

**Stack:** TypeScript (strict) + Next.js (App Router) + LangGraph.js + TailwindCSS/shadcn + Zod + Biome + Vitest, deployed on Vercel. Optional uv/Python hybrid services via FastAPI.

## Git Interaction

- DO NOT `git add`, `git rm`, or `git commit` directly — use `/quick-commit`.
- `git mv` permitted with user confirmation. Destructive `git stash` subcommands are blocked.
- Default branch `dev`; PRs target `main`. YOLO/worktree exceptions apply.

## Attribution Policy

- Use `[agent]` prefix in commit messages when in agentic mode.
- Do NOT add "Generated with Claude Code", emoji, or `Co-Authored-By` footers.

## Code Style

- TypeScript strict; explicit types at module boundaries; no unjustified `any`.
- Function components + hooks; Biome for lint/format; Zod for runtime validation of all agent outputs.
- Log errors with context; avoid `console.log` in production paths.

## Security

- LLM/provider API keys in environment variables only (`.env` git-ignored; `.env.example` documents them).
- No PII or secrets in logs, commits, comments, errors, or examples — use generic placeholders.
- Validate all agent structured outputs with Zod; treat prompts as untrusted. Smart-contract/ZK features are UI placeholders only.

## Stigmergic Collaboration

Coordinate through shared `.md` files. Before work: read `docs/ToDos.md`, check `docs/work-logs/`, review `docs/discoveries/`. Claim tasks by updating YAML status/`claimed_by` in `docs/ToDos.md`.

## Development Modes

| Mode | Command | Git Access |
|------|---------|------------|
| Safe (default) | `claude` / `claude-safe` | `/quick-commit`, `/recursive-push` only |
| Agentic | `claude-agentic` | Direct git |
| YOLO | `claude-agentic` (worktree) | Full autonomy, isolated |

## Slash Commands

`/quick-commit`, `/recursive-push`, `/nextTask`, `/implement`, `/epic-review`, `/epic-hygiene`, `/harmonize`, `/multi-repo-sync`, `/story`, `/user-flow`, `/work-tasks`.

## License

Sovereign Source License (SSL) v0.3 — see [SovereignLicense.md](./SovereignLicense.md). Extends Apache 2.0; canonical text at https://gitlab.com/smart-assets.io/SovereignLicense.

---

**Related Files:**
- `CLAUDE.md` — Primary guidance (single source of truth)
- `GEMINI.md` — Pointer for Gemini CLI
