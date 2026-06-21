import { describe, expect, it } from "vitest";
import {
	ResearchBriefSchema,
	ResearchRequestSchema,
	VoiceStoryOutputSchema,
	VoiceStoryRequestSchema,
} from "./schema";

describe("VoiceStoryRequestSchema", () => {
	it("rejects empty input", () => {
		expect(VoiceStoryRequestSchema.safeParse({ userInput: "" }).success).toBe(false);
	});

	it("accepts a non-empty prompt", () => {
		const parsed = VoiceStoryRequestSchema.safeParse({ userInput: "A clean-eating community" });
		expect(parsed.success).toBe(true);
	});

	it("accepts an optional research brief", () => {
		const parsed = VoiceStoryRequestSchema.safeParse({
			userInput: "A clean-eating community",
			researchBrief: {
				audience: "families",
				marketGap: "no accountability",
				comparables: ["Noom"],
				rewardOpportunities: ["impact points"],
				assumptions: ["people share publicly"],
			},
		});
		expect(parsed.success).toBe(true);
	});

	it("rejects a malformed research brief", () => {
		const parsed = VoiceStoryRequestSchema.safeParse({
			userInput: "x",
			researchBrief: { audience: "families" },
		});
		expect(parsed.success).toBe(false);
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
			storyEngine: {
				abt: {
					agreement: "You want to eat clean",
					andMultiplier: "and it shapes your long-term health",
					butObstacle: "but doing it alone is hard",
					thereforeSolution: "therefore we reward shared progress",
					combined:
						"You want to eat clean and it shapes your health, but going it alone is hard, therefore we reward shared progress.",
				},
				storySpine: {
					onceUponATime: "a busy family wanted to eat better",
					everyDay: "they struggled alone",
					butOneDay: "they found a community that rewarded sharing",
					becauseOfThat: ["they shared meals", "they earned rewards"],
					untilFinally: "healthy habits stuck",
					everSince: "the community grows together",
					narrative:
						"Once a family struggled to eat well alone, until a community rewarded sharing, and ever since they thrive together.",
				},
				storyStatement: "We pay people to eat their vegetables.",
				proverb: "Shared plates, stronger states.",
				metaphor: {
					statement: "The community is a garden",
					relevance: "members plant habits and harvest rewards together",
					implication: "growth is collective and regenerative",
				},
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

describe("ResearchRequestSchema", () => {
	it("requires a complete idea brief", () => {
		expect(
			ResearchRequestSchema.safeParse({ idea: { problem: "", solution: "x", success: "y" } })
				.success,
		).toBe(false);
	});

	it("accepts a complete idea brief", () => {
		const parsed = ResearchRequestSchema.safeParse({
			idea: { problem: "habit drift", solution: "rewards", success: "retention" },
		});
		expect(parsed.success).toBe(true);
	});
});

describe("ResearchBriefSchema", () => {
	it("validates a complete research brief", () => {
		const result = ResearchBriefSchema.safeParse({
			audience: "Health-conscious urban families",
			marketGap: "Habit apps lack community accountability",
			comparables: ["Strava", "Noom"],
			rewardOpportunities: ["Impact points for shared meals"],
			assumptions: ["People will share habits publicly"],
		});
		expect(result.success).toBe(true);
	});

	it("rejects a brief missing the audience", () => {
		const result = ResearchBriefSchema.safeParse({
			marketGap: "x",
			comparables: [],
			rewardOpportunities: [],
			assumptions: [],
		});
		expect(result.success).toBe(false);
	});
});
