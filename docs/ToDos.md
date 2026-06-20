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

### EPIC-001: Initial project wireframes

```yaml
---
epic_id: EPIC-001
title: "Initial project wireframes"
status: pending
priority: p0
user_story: US-001
blocked_by: []
created_at: 2026-06-20
claimed_by: null
claimed_at: null
tasks:
  - id: TASK-001-1
    title: "Define user workflows and UI problem framing"
    status: pending
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
- Should the sample generated app remain **Health Clean**, or should wireframes use a different example community?
- How visible should future smart-contract/ZK placeholders be in the initial wireframes?
- Are there any sponsor/judge-facing messages that must appear above the fold during the demo?

**Notes:**

- Reference `README.md`, `docs/SmartAppPlan.md`, `docs/designs/UILayout.md`, `docs/User-Flows.md`, and `docs/3MinuteDemoScript.md` before drafting.
- Do not start wireframes until the workflow, problem statement, solution, and UI process are documented.
- Keep the design nature-inspired and ReFi-aligned, but prefer wireframe clarity over visual polish for this epic.

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
