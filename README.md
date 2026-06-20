# Smart Community App Generator

[![License: SSL](https://img.shields.io/badge/license-SovereignLicense-blue.svg)](./SovereignLicense.md)

An AI-workflow-driven generator that helps entrepreneurs spin up **community-powered sustainability / healthy-living apps** with built-in contribution-reward loops. The generator is itself a live demonstration of the Smart Assets ReFi business model: community contributions (data + reviews) are rewarded, and the build process follows the agent-orchestrated AI development workflows from the [smart-assets.io](https://gitlab.com/smart-assets.io/) GitLab profile.

> **Hackathon project** — GDG Newport Beach, Google I/O Extended (June 2026). Built standalone, deployable to Vercel from GitHub, with a ≤ 3-minute demo.

## Why

- Embodies the Smart Assets **ReFi vision** — regenerative, outcome-tied, community-financed.
- Extends the **BountyForge** coordination/incentive mindset into an AI-orchestrated Smart App builder.
- The generation process *is* the pitch: AI-guided Voice & Story → generated app via agent workflow → community contribution & reward in action.

## How It Works — The AI Workflow

A stateful, multi-agent [LangGraph.js](https://langchain-ai.github.io/langgraphjs/) `StateGraph` drives the flow. The **Voice & Story Agent** runs first and sets the voice that every downstream agent (and future contributor) must respect.

```mermaid
flowchart LR
    A[Voice & Story Agent<br/>brand voice + mission narrative] --> B[Design & Feature Agents<br/>app structure + reward mechanics]
    B --> C[Review & Contribution Loop<br/>AI review; contributions rewarded]
    C --> D[Live Preview & Iteration<br/>runnable mini-app]
    D -. iterate .-> A
```

1. **Voice & Story Agent** *(first step)* — Guided AI-assisted creation of brand voice, mission narrative, and evangelization story. Outputs Zod-validated structured data consumed by every later agent. Initial user input is treated as a rewardable *contribution*.
2. **Design & Feature Agents** — Generate app structure, contribution flows, and reward mechanics consistent with the story and ReFi principles.
3. **Review & Contribution Loop** — AI-assisted review; contributions (data/reviews) are scored and rewarded, mirroring the business model.
4. **Live Preview & Iteration** — A runnable mini-app (the "Health Clean" example) with a working contribution → reward loop and placeholders for future smart-contract / ZK features.

## Stack

| Layer | Choice |
|-------|--------|
| Language / Runtime | TypeScript (strict) + Node.js |
| Framework | Vite + React (SPA); server logic via Vercel Functions in `api/` |
| Agent Orchestration | LangGraph.js (`StateGraph`, server-side) |
| Validation | Zod (agent structured outputs) |
| Styling | TailwindCSS (clean, nature-inspired ReFi aesthetic) |
| State | React state + TanStack Query |
| Package manager | pnpm |
| Lint / Format | Biome |
| Testing | Vitest |
| Deployment | Vercel (one-command from GitHub) |
| Optional hybrid | uv/Python services via FastAPI for heavier computation |

## UI Overview

- **Sidebar navigation**: Voice & Story (workflow start) · Generate App (agent orchestration) · Preview · Community Impact & Contributions.
- **Wizard flow**: Story → Design → Generate → Review/Contribute → Iterate, with a live LangGraph execution trace for the demo.
- **Generated app preview** (Health Clean): tabbed Home/Dashboard · Contribute · My Rewards · Community, with a working contribution form and reward preview.
- **Key components**: `VoiceStoryForm`, `ContributionCard`, `ImpactDashboard`, `GeneratedAppPreview`.

## Repository Structure

```
T500GoogHackathon/
├── index.html               # Vite entry
├── package.json             # pnpm scripts + deps
├── vite.config.ts           # Vite + React, dev API middleware, Vitest config
├── tsconfig.json            # TypeScript (strict)
├── biome.jsonc              # Lint + format
├── tailwind.config.ts       # ReFi theme
├── vercel.json              # Vercel build config
├── .env.example             # Provider keys (mirrors /multi-review wiring)
├── api/
│   └── voice-story.ts       # Vercel Function — runs the workflow server-side
├── src/
│   ├── main.tsx  App.tsx    # React entry + wizard shell (sidebar nav)
│   ├── agents/              # schema.ts (Zod), llm.ts (provider factory), voiceStory.ts (LangGraph)
│   ├── server/handler.ts    # Shared server entrypoint (dev + prod)
│   ├── components/          # VoiceStoryForm, StoryResult (+ tests)
│   └── lib/api.ts           # Client fetch wrapper
├── README.md  CLAUDE.md  AGENTS.md  GEMINI.md  SovereignLicense.md
└── docs/
    ├── SmartAppPlan.md      # Overall hackathon plan and AI-workflow flow
    ├── VoiceStoryAgent.md   # Voice & Story agent spec + LangGraph state schema (Option A)
    ├── 3MinuteDemoScript.md # 3-minute demo script (Option C)
    ├── designs/UILayout.md  # UI layout and component structure (Option B)
    ├── ToDos.md  UserStories.md  User-Flows.md       # Stigmergic task tracking
    └── Backlog.md  CompletedTasks.md  roadmap.md
```

## Getting Started

```bash
pnpm install
cp .env.example .env   # add an LLM provider key (never commit); defaults to LLM_PROVIDER=google
pnpm dev               # Vite dev server + local /api middleware
pnpm build             # typecheck + production build
pnpm lint              # Biome lint + format check
pnpm test              # Vitest
```

`pnpm dev` runs the React app and a dev-only `/api/voice-story` middleware so the workflow works locally without `vercel dev`; in production that path is served by the Vercel Function in `api/`. LLM calls run **server-side only** — provider keys live in environment variables (see `.env.example`), never in the client bundle.

### LLM providers

The LangGraph agents target the same providers wired into `/multi-review`, selected via `LLM_PROVIDER` (`anthropic` | `openai` | `xai` | `google` | `bedrock`). Each uses its standard key env var (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `XAI_API_KEY`/`GROK_API_KEY`, `GEMINI_API_KEY`/`GOOGLE_API_KEY`, AWS creds for Bedrock).

## Demo (≤ 3 minutes)

1. **0:00–0:40** — Introduce the problem and the generator.
2. **0:40–1:40** — Live Voice & Story creation; show the agent and generated Voice Profile + Narrative.
3. **1:40–2:30** — Run the full multi-agent workflow; preview the Health Clean app; submit a contribution and see it rewarded.
4. **2:30–3:00** — Close on the contribution-reward business model, future smart-contract / ZK integration, and the deployed link.

See [docs/3MinuteDemoScript.md](./docs/3MinuteDemoScript.md) for the full script.

## Documentation

- [docs/SmartAppPlan.md](./docs/SmartAppPlan.md) — plan, architecture, and gaps vs. existing Smart Assets approaches
- [docs/VoiceStoryAgent.md](./docs/VoiceStoryAgent.md) — agent spec, state schema, and prompt template
- [docs/designs/UILayout.md](./docs/designs/UILayout.md) — screens, components, and styling
- [CLAUDE.md](./CLAUDE.md) — guidance for AI coding assistants (the canonical project reference)

## Contributing

This project uses **stigmergic collaboration** — coordinate through the shared `.md` files in `docs/` (read `docs/ToDos.md` before starting). See [CLAUDE.md](./CLAUDE.md) for git conventions, code style, security/PII rules, and development modes.

## License

Licensed under the **Sovereign Source License (SSL) v0.3** — see [SovereignLicense.md](./SovereignLicense.md). SSL extends Apache 2.0 with an optional ecosystem layer (data spigot, SATCHEL, ecosystem credits); all Apache 2.0 rights and freedoms are preserved. Canonical text: [smart-assets.io/SovereignLicense](https://gitlab.com/smart-assets.io/SovereignLicense).
