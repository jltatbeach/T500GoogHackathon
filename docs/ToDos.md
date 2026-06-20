---
doc_type: todos
version: "1.0"
last_updated: 2026-06-20
mr_status:
  ready: false
  target_branch: main
---

# Tasks and Epics

<!--
TEMPLATE USAGE INSTRUCTIONS:
0. Update the frontmatter date when modifying this file
   (Update version only for significant structural changes to template)
1. Replace all [PROJECT_NAME] and [PROJECT_SPECIFIC] markers
2. Add new epics using the YAML frontmatter format below
3. Move completed epics to docs/CompletedTasks.md
4. Use /nextTask to find the next task to work on
5. Use /implement to execute tasks with full context
6. Remove these usage instruction comments before committing
-->

This document tracks implementation work through **epics** (logical groupings of related tasks).

**Document Structure**

- Active work: This file (`docs/ToDos.md`)
- User stories: `docs/UserStories.md`
- Completed work: `docs/CompletedTasks.md`
- Backlog: `docs/Backlog.md`

**For LLM assistance in multi-repo workspace:**
See [Task Tracking Standard]([RELATIVE_PATH]/top-level-gitlab-profile/docs/common/task-tracking-standard.md)

**For reference (GitLab):**
[Task Tracking Standard](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/task-tracking-standard.md)

---

## MR/PR Tracking

When all tasks in this file are complete and ready for merge, update the frontmatter:

```yaml
mr_status:
  ready: true
  target_branch: main
  title: "feat: [PROJECT_SPECIFIC: MR title]"
  description: |
    ## Summary
    - [Completed items]

    ## Test plan
    - [x] All tests passing
  labels: ["feature", "enhancement"]
```

---

## Active Epics

<!-- Epics are ordered by priority. Work on the highest priority epic first. -->

---

### EPIC-008: Agentic backend — server-side agent slices

```yaml
---
epic_id: EPIC-008
title: "Agentic backend — server-side agent slices (Research, Generate, Reward)"
status: in_progress
priority: p0
user_story: US-003
user_flow: FLOW-003
blocked_by: []          # Intentionally unblocked — this is the next implementation step.
created_at: 2026-06-20
claimed_by: claude-session
claimed_at: 2026-06-20
tasks:
  - id: TASK-008-1
    title: "Research agent slice (FLOW-003)"
    status: complete
    claimed_by: claude-session
    completed_date: 2026-06-20
    unit_tests: [src/agents/schema.test.ts, src/agents/research.live.test.ts]
    acceptance:
      - "Add ResearchBriefSchema (audience, marketGap, comparables[], rewardOpportunities[], assumptions[]) to src/agents/schema.ts; client-safe (zod only)."
      - "Add src/agents/research.ts: runResearch(idea) node using createChatModel().withStructuredOutput(ResearchBriefSchema)."
      - "Expose via src/server/handler.ts (handleResearch), api/research.ts, and a /api/research dev-middleware route in vite.config.ts."
      - "POST /api/research returns a validated ResearchBrief from an IdeaBrief; returns 400 on invalid input or missing provider credentials."
      - "Vitest covers the schema; no provider keys appear in client code."
      - "Live back-end test (src/agents/research.live.test.ts) exercises a real LLM call; opt-in via `pnpm test:live` (RUN_LIVE_AGENT_TESTS=1), auto-selects an available provider, and is skipped in the default/pre-push run."

  - id: TASK-008-2
    title: "Voice & Story research context (FLOW-001)"
    status: pending
    blocked_by: [TASK-008-1]
    acceptance:
      - "VoiceStoryRequestSchema accepts an optional researchBrief; voiceStory.ts includes it in the prompt context."
      - "The seeded prompt remains editable before generation; existing VoiceStory tests still pass."

  - id: TASK-008-3
    title: "Generate-App agent slice (FLOW-004)"
    status: pending
    blocked_by: [TASK-008-2]
    acceptance:
      - "Add AppConfigSchema (Clean Health tabs Home/Contribute/Rewards/Community, components[], impactPointRules[])."
      - "Add src/agents/generateApp.ts: runGenerateApp(storyEngine) node; api/generate-app.ts + dev-middleware route."
      - "Output derives from the Story Engine; reward language is impact-points only (no claimable-token wording)."

  - id: TASK-008-4
    title: "Reward agent slice (FLOW-006)"
    status: pending
    blocked_by: [TASK-008-3]
    acceptance:
      - "Add ContributionSchema and ImpactAwardSchema (impact points only)."
      - "Add src/agents/reward.ts to score a contribution into impact points (LLM-scored or deterministic); api/reward.ts + dev-middleware route."
      - "Responses never imply a live token or claimable asset; smart-contract/ZK stays a subtle future-verification note."

  - id: TASK-008-5
    title: "Provider guards, optional pipeline graph, and verification"
    status: pending
    blocked_by: [TASK-008-4]
    acceptance:
      - "Every endpoint reuses providerCredentialsPresent and the shared handler error contract."
      - "Optionally promote SmartAppState into a shared multi-node graph (idea -> research -> voiceStory -> generateApp); per-phase endpoints still work."
      - "pnpm lint, typecheck, test, and build all pass; CLAUDE.md/SmartAppPlan.md note the new endpoints."

  - id: TASK-008-6
    title: "Add DeepSeek v4 as a provider option"
    status: pending
    acceptance:
      - "Add a 'deepseek' provider to src/agents/llm.ts (ProviderName, DEFAULT_MODELS, createChatModel, providerCredentialsPresent) using DeepSeek's OpenAI-compatible API (ChatOpenAI with configuration.baseURL = https://api.deepseek.com) and a DeepSeek v4 model id."
      - "Read DEEPSEEK_API_KEY from env; document it in .env.example alongside the other providers."
      - "Reference the BountyForge wiring example (https://www.bountyforge.app/#try) for the integration approach."
      - "withStructuredOutput works for the Research and Voice & Story agents under deepseek (verify via pnpm test:live with LLM_PROVIDER=deepseek)."
      - "No keys in client code; pnpm lint, typecheck, test, build all pass."
---
```

**Context:** The existing phase epics (EPIC-003/005/006) are UI/**emulated**. This epic builds the real agentic back-end behind them, reusing the proven Voice & Story vertical slice (`schema.ts` → `agents/<phase>.ts` node → `server/handler.ts` → `api/<phase>.ts` → `lib/api.ts`). **This is the next implementation step**; it is deliberately `blocked_by: []` while the UI epics remain chained behind EPIC-001. The emulated UI steps later swap their demo data for these endpoints.

**Scope:**

- Included: server-side Zod schemas, LangGraph nodes, `/api` endpoints (research, generate-app, reward), provider-credential guards, unit tests, and an optional unified pipeline graph.
- Excluded: live web-search/retrieval tools and vector stores (Research stays demo-capable; a real search tool is a later epic); UI redesign (owned by EPIC-002/003/005/006); persistence beyond in-memory.

**Notes:**

- LLM calls stay server-side only; reuse `src/agents/llm.ts` (all five providers) and the `providerCredentialsPresent` guard.
- Mirror the existing VoiceStory slice for every new agent so the pattern stays uniform.
- Spans US-003 (research), US-001 (Voice & Story context), US-004 (generation), and US-006 (reward); primary linkage is US-003 / FLOW-003.

---

### EPIC-001: Initial project wireframes

```yaml
---
epic_id: EPIC-001
title: "Initial project wireframes"
status: in_progress
priority: p0
user_story: US-001
blocked_by: []
created_at: 2026-06-20
claimed_by: null
claimed_at: null
tasks:
  - id: TASK-001-1
    title: "Define user workflows and UI problem framing"
    status: complete
    claimed_by: pi-session
    claimed_at: 2026-06-20T22:30:40Z
    completed_date: 2026-06-20
    unit_tests: [docs/User-Flows.md, docs/designs/InitialWireframes.md]
    completion_gaps: []
    acceptance:
      - "Document primary user workflows in docs/User-Flows.md before drafting wireframes."
      - "Each workflow identifies persona, problem trigger, goal, ordered steps, key UI interactions, and success outcome."
      - "Add or reference a UI definition section with the user's problem statement, the proposed solution, and the process the UI guides them through."
      - "Confirm primary demo persona, 3-minute journey, wireframe format, viewport priority, and sample generated app."

  - id: TASK-001-2
    title: "Draft low-fidelity wireframes from the user workflows"
    status: pending
    blocked_by: [TASK-001-1]
    acceptance:
      - "Create docs/designs/InitialWireframes.md or an equivalent agreed artifact."
      - "Use the approved docs/User-Flows.md workflows as the source for screen order and state transitions."
      - "Show the problem -> solution -> process framing in the first screen or intro panel."
      - "Cover the current app shell: sidebar workflow navigation and main wizard canvas."
      - "Cover Voice & Story input, generated Voice Profile, Story Narrative, and Story Engine result states."
      - "Cover the downstream demo sequence: generation progress, generated app preview, contribution form, reward confirmation, and community impact summary."
      - "Annotate each wireframe with required components, data states, and demo-timing notes."

  - id: TASK-001-3
    title: "Review wireframes against project context and prepare implementation handoff"
    status: pending
    blocked_by: [TASK-001-2]
    acceptance:
      - "Cross-check wireframes against README.md, docs/SmartAppPlan.md, docs/designs/UILayout.md, and docs/3MinuteDemoScript.md."
      - "Identify any gaps between the current React placeholders and the desired wireframe flow."
      - "Add a short implementation handoff section listing components/screens to build next."
---
```

**Context:** The current React app has a working Voice & Story first step and placeholder downstream screens. Initial wireframes are now the next top priority, but the first step is to define the user workflows and UI problem framing those wireframes must solve. This will align the 3-minute hackathon demo, generated app preview, contribution/reward loop, and community impact story before further UI implementation.

**Scope:**

- Included: user workflow definitions in `docs/User-Flows.md` that precede and drive the wireframes.
- Included: UI definition framing for the user's problem statement, the proposed solution, and the process the product guides them through.
- Included: low-fidelity wireframes for the full generator journey from Voice & Story through rewarded contribution and community impact.
- Included: annotations that map wireframe regions to existing or planned components (`VoiceStoryForm`, `StoryResult`, `GeneratedAppPreview`, `ContributionCard`, `ImpactDashboard`).
- Excluded: production React implementation, high-fidelity visual design, final copywriting, and real smart-contract/ZK integrations.

**Clarifying Questions:**

- Which primary personas and user workflows must be defined before wireframing?
- What format should the initial wireframes use: Markdown/Mermaid, static images, Figma, or a lightweight HTML prototype?
- Should the first pass optimize for the live desktop demo, a mobile PWA experience, or both?
- Should the sample generated app remain **Clean Health**, or should wireframes use a different example community?
- How visible should future smart-contract/ZK placeholders be in the initial wireframes?
- Are there any sponsor/judge-facing messages that must appear above the fold during the demo?

**Notes:**

- Reference `README.md`, `docs/SmartAppPlan.md`, `docs/designs/UILayout.md`, `docs/User-Flows.md`, and `docs/3MinuteDemoScript.md` before drafting.
- Do not start wireframes until the workflow, problem statement, solution, and UI process are documented.
- Keep the design nature-inspired and ReFi-aligned, but prefer wireframe clarity over visual polish for this epic.

---

### EPIC-002: Responsive workflow shell implementation

```yaml
---
epic_id: EPIC-002
title: "Responsive workflow shell implementation"
status: pending
priority: p0
user_story: US-007
user_flow: FLOW-002
blocked_by: [EPIC-001]
created_at: 2026-06-20
claimed_by: null
claimed_at: null
tasks:
  - id: TASK-002-1
    title: "Replace horizontal stepper with responsive side-navbar navigation"
    status: pending
    acceptance:
      - "Desktop layout uses a persistent left side navbar matching docs/designs/InitialWireframes.md."
      - "Mobile layout exposes the workflow as a drawer opened by a Workflow button."
      - "Completed steps remain navigable; upcoming steps remain gated by prerequisites."

  - id: TASK-002-2
    title: "Add system-default background mode switch"
    status: pending
    acceptance:
      - "Background mode defaults to System and follows prefers-color-scheme."
      - "Light and Dark overrides are available from the workflow navigation."
      - "Light mode uses a soft light-blue background with sufficient contrast."

  - id: TASK-002-3
    title: "Align Ideation screen with wireframe"
    status: pending
    acceptance:
      - "Ideation shows problem -> solution -> success framing above the form."
      - "Idea brief preview updates live and clearly indicates completion state."
      - "Next is disabled until problem, solution, and success are all present."

  - id: TASK-002-4
    title: "Verify responsive shell behavior"
    status: pending
    acceptance:
      - "Vitest coverage asserts default System background and gated navigation."
      - "No TypeScript or Biome diagnostics remain."
      - "Manual responsive check covers desktop, tablet, and mobile widths."
---
```

**Context:** The current UI must match the approved side-navbar wireframes and responsive behavior instead of the earlier horizontal stepper shell.

**Scope:**

- Included: app shell, side navigation, mobile drawer, background mode switch, Ideation layout, and shell tests.
- Excluded: real downstream agents, production persistence, and visual polish beyond the approved low-fidelity design.

**Notes:**

- Keep `docs/designs/InitialWireframes.md` as the source of truth for shell behavior.
- Prefer accessible buttons and visible labels; do not rely on placeholder text alone.

---

### EPIC-003: Emulated Agentic Research step

```yaml
---
epic_id: EPIC-003
title: "Emulated Agentic Research step"
status: pending
priority: p0
user_story: US-003
user_flow: FLOW-003
blocked_by: [EPIC-002]
created_at: 2026-06-20
claimed_by: null
claimed_at: null
tasks:
  - id: TASK-003-1
    title: "Define ResearchBrief shape and demo content"
    status: pending
    acceptance:
      - "ResearchBrief includes audience signal, market/comparable pattern, reward opportunity, and assumptions."
      - "Research output is clearly labeled emulated/demo data."
      - "The brief can be serialized or passed to downstream UI state."

  - id: TASK-003-2
    title: "Implement Research screen"
    status: pending
    acceptance:
      - "Research screen displays the confirmed idea brief from Ideation."
      - "Emulated research trace and summary cards match InitialWireframes.md."
      - "Proceeding to Voice & Story carries research context forward."

  - id: TASK-003-3
    title: "Test Research gating and rendering"
    status: pending
    acceptance:
      - "Research is unavailable until Ideation is complete."
      - "Tests verify emulated research content renders after advancing."
      - "No TypeScript or Biome diagnostics remain."
---
```

**Context:** Research is required in the workflow but should be emulated for the hackathon until live LangChain research agents exist.

**Scope:**

- Included: emulated research content, ResearchBrief handoff, and UI tests.
- Excluded: live web/API research, vector stores, caching, and citations.

---

### EPIC-004: Voice & Story handoff refinement

```yaml
---
epic_id: EPIC-004
title: "Voice & Story handoff refinement"
status: pending
priority: p0
user_story: US-001
user_flow: FLOW-001
blocked_by: [EPIC-003]
created_at: 2026-06-20
claimed_by: null
claimed_at: null
tasks:
  - id: TASK-004-1
    title: "Seed Voice & Story with idea and research context"
    status: pending
    acceptance:
      - "VoiceStoryForm prompt includes problem, solution, success, and ResearchBrief content."
      - "The seeded prompt remains editable before generation."
      - "Server-side LLM error states remain visible and accessible."

  - id: TASK-004-2
    title: "Add Story handoff panel"
    status: pending
    acceptance:
      - "Generated results include design tone, contribution ask, and impact-point promise."
      - "The handoff panel is visible without reading every Story Engine field."
      - "Generated story state gates the Generate App step."

  - id: TASK-004-3
    title: "Test Voice & Story handoff behavior"
    status: pending
    acceptance:
      - "Existing VoiceStoryForm tests still pass."
      - "New tests verify seeded context and generated-state gating."
      - "No provider keys appear in client-side code or tests."
---
```

**Context:** Voice & Story is the core agent step and must provide an obvious handoff to app generation.

**Scope:**

- Included: richer prompt seeding, result layout, handoff panel, and gating.
- Excluded: changes to provider selection or story framework rules unless required by tests.

---

### EPIC-005: Clean Health generation trace

```yaml
---
epic_id: EPIC-005
title: "Clean Health generation trace"
status: pending
priority: p1
user_story: US-004
user_flow: FLOW-004
blocked_by: [EPIC-004]
created_at: 2026-06-20
claimed_by: null
claimed_at: null
tasks:
  - id: TASK-005-1
    title: "Define generated app configuration"
    status: pending
    acceptance:
      - "Generated config includes Clean Health tabs, dashboard content, contribution types, and impact-point rules."
      - "Config is derived from or references the Voice & Story handoff."
      - "Future verification note remains subtle and non-tokenized."

  - id: TASK-005-2
    title: "Implement Generate App screen"
    status: pending
    acceptance:
      - "Generation trace shows design, feature, review, and preview-builder stages."
      - "Generated artifact cards include app map, components, and impact rules."
      - "Generate action unlocks the Preview step."

  - id: TASK-005-3
    title: "Test generation trace and preview unlock"
    status: pending
    acceptance:
      - "Tests verify Preview remains locked before generation."
      - "Tests verify Generate action makes Clean Health preview available."
      - "No TypeScript or Biome diagnostics remain."
---
```

**Context:** The demo needs a visible agent workflow trace before showing the generated Clean Health app.

**Scope:**

- Included: emulated generation trace and generated app config.
- Excluded: real code generation or file scaffolding.

---

### EPIC-006: Clean Health preview and impact-point loop

```yaml
---
epic_id: EPIC-006
title: "Clean Health preview and impact-point loop"
status: pending
priority: p1
user_story: US-005
user_flow: FLOW-005
blocked_by: [EPIC-005]
created_at: 2026-06-20
claimed_by: null
claimed_at: null
tasks:
  - id: TASK-006-1
    title: "Build responsive Clean Health preview shell"
    status: pending
    acceptance:
      - "Preview renders Clean Health Home, Contribute, Rewards, and Community tabs."
      - "Preview behaves as a phone-like frame on desktop and full-width app surface on mobile."
      - "Clean Health naming is consistent across UI and docs."

  - id: TASK-006-2
    title: "Implement simulated community member contribution"
    status: pending
    acceptance:
      - "Contribution form is clearly labeled as simulated community member mode."
      - "Submit is disabled until required contribution text is present."
      - "Reward preview uses impact points only."

  - id: TASK-006-3
    title: "Show reward confirmation and impact dashboard update"
    status: pending
    acceptance:
      - "Submitting a contribution shows +25 impact points credited."
      - "Community metrics update after submission."
      - "Smart-contract/ZK appears only as a subtle future verification note."

  - id: TASK-006-4
    title: "Test contribution loop"
    status: pending
    acceptance:
      - "Tests cover tab navigation, disabled submit state, contribution submit, and metric update."
      - "Flow completes in a path suitable for the 3-minute demo."
      - "No TypeScript or Biome diagnostics remain."
---
```

**Context:** The contribution -> impact points -> impact confirmation moment is the main ReFi loop judges need to see.

**Scope:**

- Included: preview UI, local/demo contribution state, impact points, and dashboard metrics.
- Excluded: persistence, authentication, real tokens, smart contracts, and ZK proof verification.

---

### EPIC-007: Demo readiness and documentation sync

```yaml
---
epic_id: EPIC-007
title: "Demo readiness and documentation sync"
status: pending
priority: p1
user_story: US-006
user_flow: FLOW-006
blocked_by: [EPIC-006]
created_at: 2026-06-20
claimed_by: null
claimed_at: null
tasks:
  - id: TASK-007-1
    title: "Synchronize docs with final UI decisions"
    status: pending
    acceptance:
      - "README, CLAUDE.md, SmartAppPlan, UILayout, VoiceStoryAgent, and 3MinuteDemoScript use Clean Health naming."
      - "Docs describe side-navbar navigation and responsive behavior consistently."
      - "Docs describe impact points and subtle future verification consistently."

  - id: TASK-007-2
    title: "Create integration test specs for completed flows"
    status: pending
    acceptance:
      - "Given/When/Then specs exist for FLOW-002 through FLOW-006."
      - "Specs are linked back from docs/User-Flows.md."
      - "Known integration-test gaps are documented if not implemented."

  - id: TASK-007-3
    title: "Rehearse and tighten 3-minute demo script"
    status: pending
    acceptance:
      - "Demo timing fits <= 3 minutes."
      - "Script highlights Ideation, Voice & Story, Clean Health preview, simulated contribution, and impact points."
      - "Fallback talking points exist for provider/API failures."

  - id: TASK-007-4
    title: "Run final release validation"
    status: pending
    acceptance:
      - "pnpm lint, typecheck, test, and build pass."
      - "PWA preview is tested with pnpm build && pnpm preview."
      - "MR/PR tracking frontmatter is updated when ready."

  - id: TASK-007-5
    title: "Deploy to Vercel Hobby with Vite setup"
    status: pending
    blocked_by: [TASK-007-4]
    acceptance:
      - "Vercel project is linked to the user's Hobby account; no account-specific IDs or secrets are committed."
      - "Vercel uses the Vite framework preset with pnpm build and dist output (vercel.json/project settings stay aligned)."
      - "Server-side Vercel Functions under api/ work for /api/voice-story and /api/research with required LLM env vars configured in Vercel project settings."
      - "SPA/PWA routing works on the deployed URL, and API routes remain network-only/not cached by the service worker."
      - "Live deployed demo is smoke-tested, including Clean Health preview and expected provider-credential fallback behavior if keys are absent."
---
```

**Context:** Once the UI flow works, docs and demo materials need to match exactly so the hackathon demo is coherent.

**Scope:**

- Included: docs sync, test specs, demo script, final validation, and Vercel Hobby deployment readiness.
- Excluded: paid Vercel team features or production infrastructure beyond the hackathon Hobby-account deployment.

---

<!-- Add more epics following the same format -->

---

## Epic Template

Use this template when adding new epics:

```yaml
---
epic_id: EPIC-XXX
title: "Short descriptive title"
status: pending
priority: p2
user_story: US-XXX
blocked_by: []
created_at: YYYY-MM-DD
claimed_by: null         # Implementer ID: human-{email}, {tool}-session[-{id}], or {team}/{role}
claimed_at: null
tasks:
  - id: TASK-XXX-1
    title: "Task description"
    status: pending
    acceptance:
      - "Measurable acceptance criterion"
---
```

---

## Task States

| Status | Meaning | Next Action |
|--------|---------|-------------|
| `pending` | Not started | Available to claim |
| `in_progress` | Being worked on | Continue or handoff |
| `blocked` | Waiting on dependency | Check `blocked_by` |
| `review` | Ready for review | Review and approve |
| `complete` | Done | Move to CompletedTasks.md |

---

## Workflow

1. **Find next task**: Use `/nextTask` to identify the highest priority unclaimed task
2. **Claim task**: Set `claimed_by` using [Implementer Identification](../common/stigmergic-collaboration.md#implementer-identification) format and `status: in_progress`
3. **Implement**: Use `/implement` to execute with full context
4. **Complete**: Mark `status: complete` when acceptance criteria met
5. **Move epic**: When all tasks complete, move epic to `docs/CompletedTasks.md`

---

## References

- **User Stories:** `docs/UserStories.md`
- **Completed Work:** `docs/CompletedTasks.md`
- **Backlog:** `docs/Backlog.md`
- **MR/PR Tracking Standard:** [docs/common/todos-mr_pr-tracking-standard.md]([RELATIVE_PATH]/top-level-gitlab-profile/docs/common/todos-mr_pr-tracking-standard.md)
