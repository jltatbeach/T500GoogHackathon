---
doc_type: user_stories
version: "1.0"
last_updated: "[DATE]"
---

# User Stories

<!--
TEMPLATE USAGE INSTRUCTIONS:
0. Update frontmatter: set last_updated to current date, increment version for structural changes
1. Add completed stories under "Completed Stories" section
2. Add planned stories under "Planned Stories" section
3. Move completed stories from "Planned" to "Completed" sections
4. Update epic links when implementation begins
5. Check acceptance criteria as features are verified
6. (Optional) Update reference URLs if using a fork with modified standards
7. Remove these usage instruction comments before committing
-->

This document captures user stories that drive feature development. User stories are reverse-engineered from completed epics and updated as new features are planned.

**Document Structure**

- Active stories: This file (`docs/UserStories.md`)
- Implementation tracking: `docs/ToDos.md` (epics and tasks)
- Completed work: `docs/CompletedTasks.md`

**Format:** Each story follows the standard template:
> As a [persona], I want [capability] so that [benefit].

**User Stories Standard Reference** (canonical):
[user-stories-standard.md](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/user-stories-standard.md)

---

## Completed Stories

<!-- Add completed user stories here -->

---

#### US-001: Voice & Story generation engine

> As a **entrepreneur building a community sustainability app**, I want **generate a brand voice and mission story from a short description of my community** so that **every downstream agent and contributor builds on one consistent, compelling narrative**.

**Implemented in:** Planned
**User Flow:** FLOW-001

**Status:** Planned

**Acceptance Criteria:**

- [ ] Voice & Story agent returns a Voice Profile (tone, personality, core values)
- [ ] Output includes a Story Engine: ABT pitch, Story Spine, Story Statement, Proverb, and Metaphor
- [ ] Agent output is Zod-validated structured data consumed by downstream agents
- [ ] LLM calls run server-side across configured providers (anthropic/openai/xai/google/bedrock); no keys in the client
- [ ] Generated voice and story render in the wizard UI

---

#### US-002: Guided business-idea refinement

> As a **Ticket 500 Entrepreneur**, I want **refine my business idea through a guided problem -> solution -> success interaction before the app is generated** so that **the generated Smart App and story are grounded in a validated idea rather than a vague prompt**.

**Implemented in:** Planned
**User Flow:** FLOW-002

**Status:** Planned

**Acceptance Criteria:**

- [ ] The flow prompts for the problem being solved for users/customers
- [ ] The flow prompts for how the application solves that problem
- [ ] The flow prompts for what success looks like
- [ ] Each answer is reflected back for confirmation/refinement before proceeding
- [ ] A confirmed problem/solution/success brief is produced and seeds Voice & Story generation

---

## Planned Stories

Stories below are candidates for future epics. Move to "Completed Stories" when implemented.

#### US-003: Emulated Agentic Research brief

> As a **Ticket 500 Entrepreneur**, I want **see a research-backed summary of my confirmed idea before story generation** so that **the generated story and app feel grounded in audience, market, and reward-loop assumptions even before live research agents are connected**.

**Implemented in:** Planned
**User Flow:** FLOW-003

**Status:** Planned

**Acceptance Criteria:**

- [ ] Research is gated until the Ideation brief is complete
- [ ] Research output is clearly labeled as emulated/demo data
- [ ] Output includes audience signal, comparable pattern, reward opportunity, and assumptions
- [ ] Research context is available to seed Voice & Story generation

---

#### US-004: Clean Health app generation trace

> As a **Ticket 500 Entrepreneur**, I want **watch the system turn my story into a Clean Health app map and impact-point mechanics** so that **I can understand how the agent workflow creates a coherent product from the story**.

**Implemented in:** Planned
**User Flow:** FLOW-004

**Status:** Planned

**Acceptance Criteria:**

- [ ] Generate App is gated until Voice & Story output exists
- [ ] Workflow trace shows design, feature, review, and preview-builder stages
- [ ] Generated artifacts include app map, component list, and impact-point rules
- [ ] Preview step unlocks only after a generated app configuration exists

---

#### US-005: Clean Health preview

> As a **Ticket 500 Entrepreneur**, I want **preview the generated Clean Health app with Home, Contribute, Rewards, and Community views** so that **I can demonstrate a tangible app experience instead of only describing generated artifacts**.

**Implemented in:** Planned
**User Flow:** FLOW-005

**Status:** Planned

**Acceptance Criteria:**

- [ ] Clean Health preview is gated until app generation completes
- [ ] Preview includes Home, Contribute, Rewards, and Community tabs
- [ ] Preview is responsive across desktop demo, tablet, and mobile layouts
- [ ] Preview makes the path to submit a contribution obvious

---

#### US-006: Simulated contribution and impact points

> As a **simulated Clean Health community member**, I want **submit a contribution and see impact points credited** so that **the demo proves the contribution -> reward -> community impact loop**.

**Implemented in:** Planned
**User Flow:** FLOW-006

**Status:** Planned

**Acceptance Criteria:**

- [ ] Contribution form is clearly labeled as simulated community member mode
- [ ] Submit is disabled until required contribution text is present
- [ ] Reward preview and confirmation use impact points only
- [ ] Community impact metrics update after submission
- [ ] Future verification is mentioned subtly without token-claim language

---

#### US-007: Responsive workflow shell

> As a **Ticket 500 Entrepreneur**, I want **a responsive side-navbar workflow with system/light/dark background control** so that **the demo stays legible and aligned with the approved wireframes on desktop, tablet, and mobile**.

**Implemented in:** Planned
**User Flow:** FLOW-002

**Status:** Planned

**Acceptance Criteria:**

- [ ] Desktop uses a persistent side navbar
- [ ] Mobile exposes workflow navigation as a drawer
- [ ] Background mode defaults to System with Light and Dark overrides
- [ ] Light mode uses a soft light-blue background with sufficient contrast
- [ ] Navigation gating follows the workflow prerequisites

---

---

## Story Template

Use this template when adding new user stories:

```markdown
#### US-XXX: [Short Title]

> As a **[persona]**, I want **[capability]** so that **[benefit]**.

**Implemented in:** [EPIC-ID or "Planned"]

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Completed:** [Date or "Planned"]
```

---

## Relationship to Epics

User stories capture the **why** (user need and benefit). Epics capture the **what** (technical implementation tasks).

| Artifact | Purpose | Location |
|----------|---------|----------|
| User Story | Business/user need | `docs/UserStories.md` |
| Epic | Implementation scope | `docs/ToDos.md` |
| Task | Technical work item | Nested in epic YAML |
| Acceptance Criteria | Definition of done | In user story |

**Workflow:**

1. Identify user need -> Create user story
2. Design solution -> Create epic with tasks
3. Implement -> Work through tasks via `/nextTask` and `/implement`
4. Complete -> Mark epic complete, update story status

---

## References

- **Task Tracking:** `docs/ToDos.md`
- **Completed Work:** `docs/CompletedTasks.md`
- **User Stories Standard** (canonical): [user-stories-standard.md](https://gitlab.com/smart-assets.io/gitlab-profile/-/blob/master/docs/common/user-stories-standard.md)
