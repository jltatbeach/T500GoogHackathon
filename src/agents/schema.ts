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

export const VoiceStoryOutputSchema = z.object({
	voiceProfile: VoiceProfileSchema,
	storyNarrative: StoryNarrativeSchema,
	targetCommunity: z.string().describe("The community this app serves"),
});

export const VoiceStoryRequestSchema = z.object({
	userInput: z.string().min(1, "Describe the community app you want to build"),
});

export type VoiceProfile = z.infer<typeof VoiceProfileSchema>;
export type StoryNarrative = z.infer<typeof StoryNarrativeSchema>;
export type VoiceStoryOutput = z.infer<typeof VoiceStoryOutputSchema>;
export type VoiceStoryRequest = z.infer<typeof VoiceStoryRequestSchema>;
