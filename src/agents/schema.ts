import { z } from "zod";

/**
 * Structured output for the Voice & Story Agent.
 *
 * Mirrors the SmartAppState schema in docs/VoiceStoryAgent.md. This module is
 * client-safe (it only imports `zod`), so React components may import the
 * inferred types without pulling in any server/LLM dependencies.
 */

export const VoiceProfileSchema = z.object({
	tone: z.string().describe('Voice tone, e.g. "empowering, approachable, science-backed"'),
	personality: z
		.string()
		.describe('Brand personality, e.g. "community champion, regenerative advocate"'),
	coreValues: z.array(z.string()).describe('Core values, e.g. ["transparency", "sustainability"]'),
});

export const StoryNarrativeSchema = z.object({
	mission: z.string(),
	problemStatement: z.string(),
	solutionVision: z.string(),
	callToAction: z.string(),
	evangelizationAngles: z.array(z.string()),
});

// --- Story engine artifacts (built on the storytelling frameworks) ---------

/** ABT (And, But, Therefore) — Randy Olson. A one-sentence pitch in four moves. */
export const ABTSchema = z.object({
	agreement: z.string().describe("The audience's core want or need"),
	andMultiplier: z.string().describe("Why that need is critical — the stakes"),
	butObstacle: z.string().describe("The conflict or blocker"),
	thereforeSolution: z.string().describe("How the app resolves the conflict"),
	combined: z.string().describe("The full fluent ABT sentence"),
});

/** Story Spine — Kenn Adams. Six beats; "But one day" is the catalyst. */
export const StorySpineSchema = z.object({
	onceUponATime: z.string(),
	everyDay: z.string(),
	butOneDay: z.string().describe("The catalyst that changes everything"),
	becauseOfThat: z.array(z.string()).describe("Cause-and-effect consequences (1-3)"),
	untilFinally: z.string(),
	everSince: z.string(),
	narrative: z.string().describe("The beats woven into one polished paragraph"),
});

/** Business Metaphor — Ron Ploof. Structural "X is Y" analogy. */
export const MetaphorSchema = z.object({
	statement: z.string().describe('The metaphor in "X is Y" / "X as Y" form'),
	relevance: z.string().describe("How it maps to the app's mechanics"),
	implication: z.string().describe("The messaging payload it communicates"),
});

/** The full story engine output, built on the storytelling frameworks. */
export const StoryEngineSchema = z.object({
	abt: ABTSchema,
	storySpine: StorySpineSchema,
	storyStatement: z.string().describe('"Gist with a twist" — a curiosity hook'),
	proverb: z.string().describe("A memorable brand principle, under 129 characters"),
	metaphor: MetaphorSchema,
});

export const VoiceStoryOutputSchema = z.object({
	voiceProfile: VoiceProfileSchema,
	storyNarrative: StoryNarrativeSchema,
	storyEngine: StoryEngineSchema,
	targetCommunity: z.string().describe("The community this app serves"),
});

export const VoiceStoryRequestSchema = z.object({
	userInput: z.string().min(1, "Describe the community app you want to build"),
});

// --- Research agent (FLOW-003) ---------------------------------------------

/** The confirmed idea brief from Ideation (FLOW-002) — input to research. */
export const IdeaBriefSchema = z.object({
	problem: z.string().min(1, "Describe the problem you're solving"),
	solution: z.string().min(1, "Describe how the app solves it"),
	success: z.string().min(1, "Describe what success looks like"),
});

/** Emulated Agentic Research output (FLOW-003). */
export const ResearchBriefSchema = z.object({
	audience: z.string().describe("Primary users/customers and a signal they need this"),
	marketGap: z.string().describe("The market gap or comparable pattern"),
	comparables: z.array(z.string()).describe("Comparable products or approaches"),
	rewardOpportunities: z
		.array(z.string())
		.describe("Ways community contributions could earn impact points (never tokens)"),
	assumptions: z.array(z.string()).describe("Key assumptions to validate"),
});

export const ResearchRequestSchema = z.object({
	idea: IdeaBriefSchema,
});

export type VoiceProfile = z.infer<typeof VoiceProfileSchema>;
export type StoryNarrative = z.infer<typeof StoryNarrativeSchema>;
export type ABT = z.infer<typeof ABTSchema>;
export type StorySpine = z.infer<typeof StorySpineSchema>;
export type Metaphor = z.infer<typeof MetaphorSchema>;
export type StoryEngine = z.infer<typeof StoryEngineSchema>;
export type VoiceStoryOutput = z.infer<typeof VoiceStoryOutputSchema>;
export type VoiceStoryRequest = z.infer<typeof VoiceStoryRequestSchema>;
export type IdeaBriefInput = z.infer<typeof IdeaBriefSchema>;
export type ResearchBrief = z.infer<typeof ResearchBriefSchema>;
export type ResearchRequest = z.infer<typeof ResearchRequestSchema>;
