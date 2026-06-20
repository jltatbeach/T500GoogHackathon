/**
 * Storytelling frameworks that power the Voice & Story engine.
 *
 * These are distilled construction rules (paraphrased, not copied) from
 * established narrative frameworks. Attribution per CC BY-NC 4.0:
 *   - ABT (And, But, Therefore) — Randy Olson
 *   - Story Spine — Kenn Adams
 *   - Story Statement, Proverb Construction Kit™, Business Metaphor — Ron Ploof
 * Licensed under Creative Commons Attribution-NonCommercial 4.0 International.
 *
 * The fragments below are composed into the VoiceStoryAgent system prompt so
 * every generated brand voice is built on these proven structures.
 */

export const FRAMEWORK_ATTRIBUTION =
	"Story frameworks: ABT (Randy Olson), Story Spine (Kenn Adams), Story Statement / Proverb Construction Kit / Business Metaphor (Ron Ploof). CC BY-NC 4.0.";

export const ABT_RULES = `ABT (And, But, Therefore) — a single-sentence pitch in four moves:
- Agreement: the audience's core want or need.
- AND (the multiplier): why that need is critical — the stakes for their life, wallet, or wellbeing.
- BUT (the obstacle): the conflict or blocker keeping them from it.
- THEREFORE (the solution): how this app resolves the conflict.
Write it as one fluent, punchy sentence plus the four parts.`;

export const STORY_SPINE_RULES = `Story Spine — six beats; the catalyst ("But one day") is the most important because without disruption there is no story:
- Once upon a time: the protagonist (usually the community member) and their world.
- Every day: the routine friction before the app existed.
- But one day: the catalyst that changes everything.
- And because of that: cause-and-effect consequences (1-3 beats).
- Until finally: the climax / breakthrough.
- And ever since that day: the new status quo.`;

export const STORY_STATEMENT_RULES = `Story Statement — "the gist with a twist": a short, clever line that opens a curiosity loop so the listener asks "wait, how?". Strip all jargon; lead with irony, contrast, or the ultimate human result. Do NOT explain how it works.`;

export const PROVERB_RULES = `Proverb — a memorable operating principle for the brand. Rules:
- Under 129 characters; present tense; second person (you/your) or implied.
- Below a fifth-grade reading level; a definitive statement (no wishy-washy language).
- No wordy trailing clauses. Use plain domain nouns; favor wordplay/sound (alliteration, rhyme, ellipsis) and juxtaposition over literal description.`;

export const METAPHOR_RULES = `Business Metaphor — a structural analogy in "X is Y" / "X as Y" form that turns the abstract concrete. Provide:
- statement: the metaphor itself.
- relevance: how it maps to the app's actual mechanics.
- implication: the messaging payload it communicates (e.g. clarity, safety, belonging).
The metaphor's vocabulary should color the brand voice throughout.`;

/** All framework fragments composed for the system prompt. */
export const STORY_FRAMEWORKS = [
	ABT_RULES,
	STORY_SPINE_RULES,
	STORY_STATEMENT_RULES,
	PROVERB_RULES,
	METAPHOR_RULES,
].join("\n\n");
