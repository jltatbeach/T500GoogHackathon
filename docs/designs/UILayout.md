# Option B: UI Layout & Component Structure (Aligned with smart-assets.io AI Workflows)

## User Workflow First Principle

Before drafting low-fidelity wireframes, define the user workflows in
`docs/User-Flows.md`. The wireframes should solve a concrete user problem,
show the proposed solution, and make the process obvious enough for a
3-minute hackathon demo.

## User-Centered UI Definition

### Problem Statement

Community entrepreneurs often know the impact they want to create, but they
struggle to translate that mission into a coherent app concept, brand voice,
contribution loop, and demo-ready product experience.

### Solution

The Smart Community App Generator guides them through an AI-orchestrated
workflow that turns a short community idea into a consistent Voice & Story,
a generated Smart App preview, and a visible contribution -> reward -> impact
loop.

### UI Process

1. Define the user's community, problem, and desired impact.
2. Generate the Voice Profile, Story Narrative, and Story Engine.
3. Map the story into app structure, reward mechanics, and contribution flows.
4. Preview the generated Smart App, starting with the Health Clean example.
5. Submit a community contribution and show the reward confirmation.
6. Summarize community impact and invite iteration on the generated app.

## Overall App Layout (Vite + React, using standard templates)

- Sidebar: Navigation (Voice & Story (AI Workflow Start) | Generate App (Agent Orchestration) | Preview | Community Impact & Contributions)
- Main Content Area: Step-by-step wizard style following AI development workflow (Problem -> Story -> Design -> Generate -> Review/Contribute -> Iterate)

## Key Screens

### 1. Voice & Story Creation (Landing / First Step)

- Large prompt area or guided questions.
- Live preview pane showing evolving narrative.
- "Generate Story" button that triggers VoiceStoryAgent.

### 2. App Generation Progress (AI Workflow Visualization)

- Visual LangGraph execution trace showing the AI workflow steps (highly recommended for demo â€” shows agent orchestration per smart-assets.io approach).
- Progress indicators for each agent, with review/contribution hooks.

### 3. Generated App Preview (Health Clean Example)

- Tabbed view: Home/Dashboard | Contribute | My Rewards | Community
- Working contribution form (submit review/data â†’ see reward).
- Placeholder sections for future smart contract/ZK features.

## Recommended Components

- VoiceStoryForm
- ContributionCard (with reward preview)
- ImpactDashboard
- GeneratedAppPreview (dynamic based on state)

## Styling Notes

- Clean, modern, nature-inspired (greens, earth tones) consistent with ReFi values.
- Use your standard Tailwind/shadcn setup.

This layout ensures a smooth user journey from story creation to live app preview.

---

## Finalized Architecture (2026-06-20)

Decisions locked in before US-001 implementation. The SA standard for apps/PWAs is **Vite + React** (no Next.js across SA web apps); PWA tooling is therefore `vite-plugin-pwa` (as in `@satchel/pwa`), not `next-pwa`/Serwist.

### UI shell

- **State-driven wizard** (no `react-router`): a numbered progress stepper + Back/Next walk the canonical journey pipeline (`src/App.tsx` + `WizardStepper`). Steps: **Ideation → Research → Voice & Story → Generate App → Preview**.
- **Ideation** (step 1, `IdeationForm`) implements FLOW-002's problem → solution → success prompts; **Next is gated** until all three are answered. The brief seeds the Voice & Story step (`VoiceStoryForm idea={brief}`).
- Downstream steps (Research, Generate, Preview) show placeholders until their agents exist.
- Accessibility-first: the stepper is an `<ol aria-label="Progress">` of `<button>`s with `aria-current="step"`; completed steps are navigable, upcoming steps disabled.

### PWA architecture (`vite-plugin-pwa`)

| Decision | Choice |
|----------|--------|
| Offline scope | **Installable app shell** — precache build + icons; `/api/*` is `NetworkOnly` (server-side LLM always needs the network) |
| SW update strategy | **`autoUpdate`** (silent; activates on next load) — SA default |
| Icons / branding | **Generated ReFi placeholders** — 192/512 + maskable from `public/favicon.svg`, theme `#2f8542` |
| Dev behavior | SW disabled in `pnpm dev` (so it doesn't shadow the dev `/api` middleware); test via `pnpm build && pnpm preview` |

### Styling

- Tailwind ReFi palette (`refi`/`earth` tokens in `tailwind.config.ts`). shadcn/ui deferred (not required for the hackathon shell).
