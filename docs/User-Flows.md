---
doc_type: user_flows
version: "1.0"
---

# User Flows

Detailed user interaction patterns for this project. Each flow captures the
journey, ordered steps, key interactions (which become integration test
assertions), and success metrics (which become test budgets). Flows are
linked bidirectionally to user stories (`docs/UserStories.md`) and to
epics (`docs/ToDos.md`).

**Document Structure**
- User flows: this file (`docs/User-Flows.md`)
- User stories: `docs/UserStories.md`
- Implementation tracking: `docs/ToDos.md` (epics + tasks)

**Linkage**
- A flow lists `Related Stories` and an `Implemented in` epic
- Stories carry a `User Flow:` back-reference
- Epic YAML carries a `user_flow:` field
- Integration tests appear on the flow as `Integration Tests:` once authored
  (late-stage: written after the implementation epic completes and unit
  tests pass). Run `test-spec FLOW-XXX` to seed the artifact and `link
  FLOW-XXX <ITEST-NNN|path>` for subsequent additions.

---

## Problem Statement

**Context.** Ticket 500 (T500) is an incubator that helps early-stage entrepreneurs
go from idea to a launchable, community-powered app. Cohorts are large and
time-boxed, and founders rarely have engineering, design, and marketing talent
available at the same time.

**The problem.** Two things make or break an incubator project — a working app and
a story that makes people care — and they are usually built in isolation, slowly,
by different people:

- Founders can describe their mission but struggle to turn it into a crisp brand
  voice, pitch, and narrative that survives contact with investors and users.
- Standing up even a minimal app with a real engagement loop takes scarce
  engineering time.
- Marketing and product drift apart: the app ships with a voice that does not match
  the story, and the story is not wired into how the product asks for contributions.

**Who feels it.** The **Ticket 500 Entrepreneur** — a non-technical or solo founder
in the incubator who needs to demo a working, on-message app within the cohort
timeline.

**What success looks like.** A founder describes their community in a sentence and
walks out with (1) a coherent brand voice and story built on proven storytelling
frameworks, (2) a runnable app scaffolded to that story, and (3) a
contribution → reward loop that mirrors the regenerative (ReFi) business model —
all produced by one AI-orchestrated workflow so product and marketing stay in
lockstep.

**What these journeys cover.** The flows below decompose that outcome into discrete,
testable journeys, in pipeline order:

1. **Ideation — Business Idea Refinement** (FLOW-002): a guided problem → solution →
   success interaction that refines the idea before anything is built.
2. **Agentic Research** (planned): LangChain agents research and validate the
   confirmed idea brief (market, audience, comparable solutions).
3. **Voice & Story generation** (FLOW-001): brand voice + Story Engine, grounded in
   the refined and researched idea.
4. **App generation, review/contribution, and live preview & iteration** (planned).

Each flow is a marketing-and-product unit — it carries both the artifact it produces
and the app behavior it drives. (Flow IDs are assigned in creation order, not pipeline
order; the numbered list above is the canonical sequence.)

---

## Personas

Reusable persona definitions; reference them by name from each flow's `Personas:` field.

- **Ticket 500 Entrepreneur** — a non-technical or solo founder in the T500 incubator
  building a community-powered app and refining its marketing/story under a
  time-boxed cohort deadline.

---

## Core Workflows

<!-- Created flows are inserted above the "Planned Flows" section below. -->

---


### FLOW-001: Voice & Story Generation

**Status:** Planned
**Implemented in:** Planned
**Related Stories:** US-001
**Related Flows:** FLOW-002
**Personas:** Ticket 500 Entrepreneur
**Integration Tests:** None

**Journey:** Describe community -> Generate (server-side LLM workflow) -> Review Voice Profile + Story Engine

**Steps:**
1. **Describe community** - Seeded by the confirmed idea brief from FLOW-002 (Ideation) and any Agentic Research findings; the Generate Story button enables once input is present
2. **Generate** - Submit posts to /api/voice-story; the server selects the configured provider and runs the VoiceStoryAgent LangGraph node
3. **Review Story Engine** - Voice Profile, Story Narrative, and Story Engine (ABT, Story Spine, Story Statement, Proverb, Metaphor) render in the result panel

**Key Interactions:**
- Generate Story button is disabled until the user enters a community description
- Submitting calls the voice-story workflow with the entered text
- On success, the generated voice-and-story region is rendered
- On failure (e.g. provider not configured), an error alert is shown

**Success Metrics:**
- Agent output validates against the Zod VoiceStoryOutput schema (no parse errors)
- Voice & Story generation returns within ~30s
- Provider API keys never appear in the client bundle (server-side only)

---


### FLOW-002: Ideation — Business Idea Refinement

**Status:** Planned
**Implemented in:** Planned
**Related Stories:** US-002
**Related Flows:** FLOW-001
**Personas:** Ticket 500 Entrepreneur
**Integration Tests:** None

**Journey:** Problem -> Solution -> Success -> Confirm idea brief -> hand off to Agentic Research

**Steps:**
1. **Frame the problem** - The entrepreneur states the problem they are solving for their users/customers; the assistant reflects it back and sharpens who is affected and how
2. **Define the solution** - The entrepreneur describes how the application solves that problem; the assistant maps the core capability and the contribution/engagement loop
3. **Define success** - The entrepreneur describes what success looks like for users and for the business; the assistant captures measurable outcomes
4. **Confirm the idea brief** - The assistant synthesizes problem/solution/success into a concise idea brief; the entrepreneur edits or confirms it
5. **Hand off to Agentic Research** - The confirmed idea brief seeds the next step (LangChain research agents) and, downstream, Voice & Story generation and app production

**Key Interactions:**
- The entrepreneur is prompted for problem, solution, and success one focus at a time
- The assistant reflects each answer back for confirmation before advancing (refine, do not just capture)
- The entrepreneur can revise any of the three answers before proceeding
- The next step (Agentic Research) is gated until problem, solution, and success are all confirmed

**Success Metrics:**
- The idea brief contains a non-empty problem, solution, and success before research can start
- The idea brief validates (problem/solution/success) and is accepted as input by the Agentic Research step
- The entrepreneur can edit each answer prior to proceeding

---

## Planned Flows

(Empty)

---

## Related Documentation

- [User Stories](UserStories.md)
- [ToDos](ToDos.md)
