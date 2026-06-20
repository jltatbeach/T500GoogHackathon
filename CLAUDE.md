# Smart Community App Generator

This file provides guidance to AI coding assistants when working with code in this repository.

**Supported formats:** Both `CLAUDE.md` (Anthropic Claude Code) and `AGENTS.md` (OpenAI Codex, GitHub Copilot, Cursor, Agentic AI Foundation standard) are supported. `CLAUDE.md` is the single source of truth; `AGENTS.md` and `GEMINI.md` point here.

## LLM Development Philosophy

This project follows Smart Assets' **document-first development** approach. See the [AI Coding Philosophy](../SA/top-level-gitlab-profile/docs/common/ai-coding-philosophy.md) for complete details.

**For reference (GitLab):**
[AI Coding Philosophy](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/ai-coding-philosophy.md)

### Key Principles

1. **Stigmergic Collaboration**: Coordinate with other agents through shared `.md` files
2. **Document-First**: Create design docs and specifications BEFORE implementation
3. **Signal vs. Slop**: Maximize code that solves problems; avoid over-engineering
4. **Acceptance Criteria**: Define measurable success criteria in task definitions

### Standard Document Structure

| Document | Purpose | Location |
|----------|---------|----------|
| User Stories | Business needs and acceptance criteria | `docs/UserStories.md` |
| Tasks/Epics | Implementation tracking | `docs/ToDos.md` |
| Completed Work | Historical reference | `docs/CompletedTasks.md` |
| Backlog | Deferred items | `docs/Backlog.md` |
| Work Logs | Session progress | `docs/work-logs/*.md` |
| Discoveries | Shared findings | `docs/discoveries/*.md` |

## Stigmergic Collaboration

This project uses **stigmergic collaboration** - agents coordinate through shared `.md` files rather than direct messaging. When using Claude Code agent teams, real-time IPC replaces file-based coordination; stigmergic files remain for cross-session continuity, audit trails, and cross-tool interop.

**For LLM assistance in multi-repo workspace:**
See [Stigmergic Collaboration Guide](../SA/top-level-gitlab-profile/docs/common/stigmergic-collaboration.md)

**For reference (GitLab):**
[Stigmergic Collaboration Guide](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/stigmergic-collaboration.md)

### Before Starting Work

1. **Read `docs/ToDos.md`** to check task status and claims
2. **Check `docs/work-logs/`** for existing progress on related tasks
3. **Review `docs/discoveries/`** for relevant context from other agents

### When Claiming a Task

Update the task in `docs/ToDos.md`:

```yaml
---
id: TASK-001
status: in_progress          # Changed from 'pending'
claimed_by: claude-session-a1b2c3  # See Implementer Identification format
claimed_at: 2025-01-15T10:00:00Z
# Other valid claimed_by formats:
#   human-jeff@example.com        # Human (git config --get user.email)
#   design-sprint/researcher      # Agent team member ({team}/{name})
---
```

### During Work

1. **Create work log** at `docs/work-logs/task-{id}-{timestamp}.md`
2. **Document discoveries** in `docs/discoveries/` for other agents
3. **Update blockers** if you encounter dependencies

### Before Pausing/Completing

Update your work log with handoff notes:

```yaml
---
handoff_status: ready | paused | blocked
next_steps:
  - What remains to be done
---
```

## AI Artifact Generation Guidelines

**Core strategy:** Default to **Markdown + Mermaid** as the source of truth for all generated artifacts. Use **HTML** only when high engagement or advanced interactivity is required.

| Format | Use for | Notes |
|--------|---------|-------|
| **Markdown + Mermaid** | Primary. Diagrams, structured documents, plans, specs | Relative links and raw Git URLs for asset referencing |
| **HTML (CSS/JS + embedded Mermaid)** | Secondary. Interactive dashboards, prototypes, stakeholder deliverables | When visual polish and engagement are critical |

**Hybrid rule:** Always produce Markdown as the canonical, Git-friendly version first; generate a self-contained HTML export on request.

## Project Context

- **Problem:** Entrepreneurs need a fast way to spin up community-powered sustainability / healthy-living apps with built-in contribution-reward loops.
- **Ecosystem fit:** Embodies the Smart Assets ReFi vision (regenerative, outcome-tied, community-financed) and extends the BountyForge coordination/incentive mindset into an AI-orchestrated Smart App builder. The build process itself follows the smart-assets.io AI development workflows (agent-orchestrated, iterative, contribution-driven).
- **Key technologies:** TypeScript + Vite + React frontend, LangGraph.js multi-agent orchestration (server-side), TailwindCSS, Vercel deployment.

## Project Overview

Build a **Smart Community App Generator** — an AI-workflow-driven tool that helps entrepreneurs generate community sustainability apps. The generator is itself a demonstration of the contribution-reward business model.

**Core AI Workflow Flow** (agent-orchestrated, iterative, contribution-driven):

1. **Voice & Story Agent** (first step) — Guided AI-assisted creation of brand voice, mission narrative, and evangelization story that sets the "voice" for the entire app and future contributions.
2. **Design & Feature Agents** — Generate app structure, contribution flows, and reward mechanics consistent with the story and ReFi principles.
3. **Review & Contribution Loop** — AI-assisted review; contributions (data/reviews) to the generated app are rewarded, mirroring the business model.
4. **Live Preview & Iteration** — Runnable mini-app (e.g. "Health Clean") with a working contribution → reward loop.

This is a hackathon project (GDG Newport Beach Google I/O Extended). Scope constraints: standalone, runnable + deployable (GitHub → Vercel), demo ≤ 3 minutes, with UI placeholders highlighting future smart-contract / ZK capability.

## Repository Structure

```
T500GoogHackathon/
├── index.html, package.json, vite.config.ts, tsconfig.json, biome.jsonc,
│   tailwind.config.ts, postcss.config.js, vercel.json, .env.example
├── api/
│   └── voice-story.ts       # Vercel Function — runs the workflow server-side
├── src/
│   ├── main.tsx, App.tsx     # React entry + wizard shell
│   ├── agents/              # schema.ts (Zod), llm.ts (provider factory), voiceStory.ts (LangGraph)
│   ├── server/handler.ts    # Shared server entrypoint (dev middleware + Vercel fn)
│   ├── components/          # VoiceStoryForm, StoryResult (+ *.test.tsx)
│   ├── lib/api.ts           # Client fetch wrapper
│   └── test/setup.ts        # Vitest + jsdom setup
├── docs/                    # Planning docs + stigmergic task tracking (harmonized)
│   ├── SmartAppPlan.md      # Overall hackathon plan and AI-workflow flow
│   ├── VoiceStoryAgent.md   # Voice & Story agent spec + LangGraph state schema (Option A)
│   ├── 3MinuteDemoScript.md # 3-minute demo script (Option C)
│   ├── designs/UILayout.md  # UI layout and component structure (Option B)
│   ├── ToDos.md, UserStories.md, User-Flows.md
│   └── Backlog.md, CompletedTasks.md, roadmap.md
└── CLAUDE.md / AGENTS.md / GEMINI.md / README.md / SovereignLicense.md
```

## Commands

### Git Interaction

**For LLM assistance in multi-repo workspace:**
See [Git Interaction Policy](../SA/top-level-gitlab-profile/docs/common/git-interaction-policy.md)
*(Note: This crosses repository boundaries to the top-level-gitlab-profile repository)*

**For reference (GitLab):**
[Git Interaction Policy](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/git-interaction-policy.md)

**Summary for this project:**
- DO NOT ever `git add`, `git rm` or `git commit` code — use `/quick-commit`
- `git mv` is permitted with user confirmation
- `git stash`: `list`/`show` permitted; bare `git stash` and `push`/`save`/`apply` require confirmation; `pop`/`drop`/`clear`/`branch` are blocked (destructive)
- YOLO mode exceptions apply in git worktrees
- Default working branch is `dev`; PRs target `main`

### Project-Specific Commands

Vite + React + TypeScript app, managed with **pnpm** (do not use npm — see `pnpm-workspace.yaml`).

```bash
# Install dependencies
pnpm install

# Development server (+ local /api middleware for the agent endpoint)
pnpm dev

# Build (typecheck + vite build)
pnpm build

# Lint / format (Biome)
pnpm lint        # check
pnpm lint:fix    # apply fixes

# Typecheck only
pnpm typecheck

# Test (Vitest)
pnpm test

# Install git hooks (also runs automatically via `prepare` on pnpm install)
pnpm hooks:install
```

**Git hooks (husky):** pre-commit runs `lint` + `typecheck`; pre-push runs `lint`/`typecheck`/`test`/`build` with an `ls-remote` race guard. Both run uv Python checks (`ruff`, `pytest`) only when a `pyproject.toml` exists. Mirrors the SA/* hook pattern.

LLM calls run **server-side only** (`api/voice-story.ts` in prod, the Vite dev middleware locally) so provider keys never reach the client bundle.

### Configuration File Conventions

When creating or modifying configuration files:

1. **Check for existing files first**: Before creating any `.json` file, check if `.jsonc` or `.json5` variants exist.
2. **Prefer existing format**: If `config.jsonc` or `config.json5` exists, edit that instead of creating `config.json`.
3. **Default to JSONC**: When creating new config files, prefer `.jsonc` for inline documentation.

### Slash Commands

The following slash commands are provided by the workspace [AItools](../SA/top-level-gitlab-profile/AItools/):

#### Git Operations
- `/quick-commit` - Stage and commit changes (required in safe mode)
- `/recursive-push` - Push across repositories

#### Task Management
- `/nextTask` - Find and select next task to work on
- `/implement` - Begin implementation of a task
- `/epic-review` - Preview and summarize epics
- `/epic-hygiene` - Archive completed epics

#### Workspace Sync
- `/harmonize` - Sync workspace policies into this repo
- `/multi-repo-sync` - Workspace-wide sync orchestration

#### Project-Specific (available)
- `/story` - Create/link user stories (`docs/UserStories.md` exists)
- `/user-flow` - Create/link user flows (`docs/User-Flows.md` exists)
- `/work-tasks` - Work through tasks (`docs/ToDos.md` exists)

## Development Modes

This project supports three operational modes for AI-assisted development.

| Mode | Command | Git Access |
|------|---------|------------|
| **Safe** | `claude` / `claude-safe` | Via `/quick-commit`, `/recursive-push` only |
| **Agentic** | `claude-agentic` | Direct git permitted |
| **YOLO** | `claude-agentic` (in worktree) | Full autonomy, isolated |

**Safe mode** is the default. Use slash commands for all git operations.

**For reference (GitLab):**
[Development Modes](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/development-modes.md)

## Architecture Overview

```yaml
architecture:
  system_design:
    name: Smart Community App Generator
    purpose: AI-workflow-driven generation of community sustainability apps with contribution-reward loops
    approach: Agent-orchestrated, iterative, document-first; the generator demonstrates its own ReFi business model

  core_components:
    Voice & Story Agent:
      description: First and most important agent; defines brand voice and mission narrative
      implementation: LangGraph.js StateGraph node
      features:
        - Guided conversation / structured form as workflow entry point
        - Structured output (Zod-validated) consumed by downstream agents
        - Review/contribution hook treating initial input as a rewardable contribution

    Design & Feature Agents:
      description: Generate app structure, contribution flows, and reward mechanics
      framework: LangGraph.js
      capabilities:
        - Story-consistent app scaffolding
        - ReFi-aligned reward mechanics

    Review & Contribution Loop:
      description: AI-assisted review; contributions rewarded, mirroring the business model

  data_flow:
    input: Entrepreneur prompt / guided questions
    processing: LangGraph StateGraph (Voice & Story -> Design -> Review -> Preview/Iterate)
    output: Runnable mini-app with working contribution -> reward loop

  technology_stack:
    Language/Runtime: TypeScript (strict) + Node.js
    Framework: Vite + React (SPA); server logic via Vercel Functions in api/
    Styling: TailwindCSS
    Orchestration: LangGraph.js (server-side)
    Validation: Zod (agent structured outputs)
    State: React state + TanStack Query
    Lint/Format: Biome
    Test: Vitest (+ Testing Library, jsdom)
    Package manager: pnpm
    Deployment: Vercel (GitHub-driven)
```

### Key Design Patterns
- **StateGraph workflow**: agents are nodes in a stateful LangGraph that downstream nodes must respect and build upon.
- **Structured agent I/O**: all agent outputs are Zod-validated structured data, not free text.
- **Framework-driven voice engine**: the VoiceStoryAgent composes its prompt from `src/agents/storyFrameworks.ts` and emits a Story Engine (ABT, Story Spine, Story Statement, Proverb, Metaphor). Frameworks by Randy Olson / Kenn Adams / Ron Ploof, CC BY-NC 4.0 (paraphrased with attribution).
- **Contribution-as-first-class**: user input and reviews are modeled as rewardable contributions throughout.

## Code Style

### General Guidelines
- **TypeScript**: strict mode; prefer explicit types at module boundaries; no `any` without justification.
- **Error Handling**: log errors with context; avoid `console.log` in production paths.
- **Testing**: TDD where practical; cover agent node behavior and structured output schemas.
- **Git Commits**: clear conventional-commit messages via `/quick-commit`.

### Language-Specific
- **TypeScript/React**: function components + hooks; Biome for lint/format; Zod for runtime validation.
- **Python (optional hybrid)**: if uv/Python services are added for heavier computation, follow smart-assets.io uv standards and expose via simple FastAPI endpoints.

## Testing Strategy

**For reference (GitLab):**
[Testing Guidelines](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/testing-guidelines.md)

**Test Framework**: Vitest (+ Testing Library, jsdom)

**Test Types**:
- Unit tests for LangGraph agent nodes and Zod schemas
- Component tests for the wizard UI (accessibility-first; see UI Test Assertions below)
- Integration test for the end-to-end Voice & Story → generated-preview flow

### UI Test Assertions

React UI tests should prove user-observable DOM structure and state, not incidental copy or formatted sample values.

- **Preferred:** Accessibility-first queries (`getByRole`, `getByLabelText`, `aria-*`, focus state) and asserting semantic regions are wired correctly, then asserting behavior through state changes or callback/data-source calls.
- **Acceptable:** `data-testid` when no accessible handle exists; `id` for form/ARIA relationships.
- **Avoid:** `getByText`/`queryByText` for literal display copy or formatted numbers; `getAllByText(...).length` as a DOM-assertion substitute; CSS class selectors that change with styling.
- **When exact text is appropriate:** only when the behavior under test is copy, formatting, validation messages, or content transformation — scope with `within(...)`.

## Security Considerations

**For reference (GitLab):**
[Security Best Practices](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/security-best-practices.md)

### Project-Specific Security
- **API keys**: LLM provider keys (Anthropic/Google/etc.) live in environment variables only — never commit them. Use `.env` (git-ignored) and a `.env.example` for documentation.
- **Agent inputs**: validate all agent structured outputs with Zod before use; treat user prompts as untrusted.
- **Future smart-contract / ZK placeholders**: keep these as UI placeholders only for the hackathon; no key material in the client.

### PII (Personally Identifiable Information) Protection

**CRITICAL:** Never expose, log, or commit PII to version control or public systems.

- ❌ **NEVER** log PII, commit it to git, or expose it in error messages or examples.
- ✅ **ALWAYS** use generic placeholders in examples (`user@example.com`, `User123`), relative paths instead of home directories, and environment variables for secrets.

**Security Checklist**:
- [ ] No PII in logs, error messages, or debug output
- [ ] No PII or secrets in git commits, comments, or documentation
- [ ] LLM/provider API keys in env vars only (`.env` git-ignored)
- [ ] Agent outputs validated (Zod) before use
- [ ] No real user data in tests/examples (synthetic only)

## Development Environment

### Requirements
- Node.js 20+ (developed on 24)
- pnpm 11+
- (Optional) Python 3.11+ with uv, if hybrid services are added

### Setup
```bash
cd T500GoogHackathon
pnpm install
cp .env.example .env   # add a provider API key
pnpm dev
```

### Environment Variables
Provider env vars mirror the `/multi-review` wiring (see `.env.example`):
```bash
LLM_PROVIDER=google                       # anthropic | openai | xai | google | bedrock
GOOGLE_API_KEY=...   # or GEMINI_API_KEY  # default provider
ANTHROPIC_API_KEY=...                     # ANTHROPIC_MODEL optional
OPENAI_API_KEY=...
XAI_API_KEY=...      # or GROK_API_KEY
AWS_ACCESS_KEY_ID=... AWS_SECRET_ACCESS_KEY=... AWS_REGION=us-east-1   # Bedrock
```

## License

This project is licensed under the **Sovereign Source License (SSL) v0.3** — see [SovereignLicense.md](./SovereignLicense.md). SSL extends Apache 2.0 with an optional ecosystem layer (data spigot, SATCHEL, ecosystem credits); all Apache 2.0 rights and freedoms are preserved.

**Canonical license:** [SovereignLicense](https://gitlab.com/smart-assets.io/SovereignLicense)

## References
- **Plan**: [docs/SmartAppPlan.md](./docs/SmartAppPlan.md)
- **Voice & Story Agent spec**: [docs/VoiceStoryAgent.md](./docs/VoiceStoryAgent.md)
- **UI Layout**: [docs/designs/UILayout.md](./docs/designs/UILayout.md)
- **Demo Script**: [docs/3MinuteDemoScript.md](./docs/3MinuteDemoScript.md)
- **User Stories**: [docs/UserStories.md](./docs/UserStories.md)
- **Task Tracking**: [docs/ToDos.md](./docs/ToDos.md)
- **GitLab Organization**: https://gitlab.com/smart-assets.io/
- **This repo**: https://github.com/jltatbeach/T500GoogHackathon

## grepai - Semantic Code Search

`grepai` is an optional, MIT-licensed semantic-search tool. If installed and indexed locally, prefer it for intent-based code exploration (`grepai search "..." --json --compact`, `grepai trace ...`); otherwise fall back to your harness's native search and file-reading tools. It is recommended but never required. Use native text/glob search for exact strings and file-path patterns.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
