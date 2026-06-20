import { describe, expect, it } from "vitest";
import { VoiceStoryOutputSchema, VoiceStoryRequestSchema } from "./schema";

describe("VoiceStoryRequestSchema", () => {
	it("rejects empty input", () => {
		expect(VoiceStoryRequestSchema.safeParse({ userInput: "" }).success).toBe(false);
	});

	it("accepts a non-empty prompt", () => {
		const parsed = VoiceStoryRequestSchema.safeParse({ userInput: "A clean-eating community" });
		expect(parsed.success).toBe(true);
	});
});

describe("VoiceStoryOutputSchema", () => {
	it("validates a complete agent output", () => {
		const result = VoiceStoryOutputSchema.safeParse({
			voiceProfile: {
				tone: "empowering, science-backed",
				personality: "community champion",
				coreValues: ["transparency", "sustainability"],
			},
			storyNarrative: {
				mission: "Help communities eat clean",
				problemStatement: "Healthy habits are hard alone",
				solutionVision: "Reward shared progress",
				callToAction: "Join and contribute",
				evangelizationAngles: ["wellness", "regeneration"],
			},
			targetCommunity: "Health-conscious urban families",
		});
		expect(result.success).toBe(true);
	});

	it("rejects output missing the story narrative", () => {
		const result = VoiceStoryOutputSchema.safeParse({
			voiceProfile: { tone: "x", personality: "y", coreValues: [] },
			targetCommunity: "z",
		});
		expect(result.success).toBe(false);
	});
});
