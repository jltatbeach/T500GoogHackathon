import { type ResearchBrief, type VoiceStoryOutput, VoiceStoryOutputSchema } from "./schema";

function extractField(input: string, label: string, fallback: string): string {
	const line = input
		.split("\n")
		.find((item) => item.toLowerCase().startsWith(`${label.toLowerCase()}:`));
	return line?.slice(label.length + 1).trim() || fallback;
}

function audienceFrom(brief: ResearchBrief | null): string {
	return brief?.audience.trim() || "Health-minded neighbors and local organizers";
}

/**
 * Schema-valid fallback for demo continuity when the live provider is missing
 * or unavailable. This module is client-safe: it imports only zod-backed types.
 */
export function createEmulatedVoiceStory(
	userInput: string,
	researchBrief: ResearchBrief | null = null,
): VoiceStoryOutput {
	const problem = extractField(
		userInput,
		"Problem",
		"Healthy habits fade when people lack trusted local examples and shared accountability.",
	);
	const solution = extractField(
		userInput,
		"Solution",
		"Clean Health gives neighbors a place to share clean-eating reviews, habit swaps, and practical local resources.",
	);
	const success = extractField(
		userInput,
		"Success",
		"Useful contributions build visible community learning and earn impact points.",
	);
	const targetCommunity = audienceFrom(researchBrief);
	const marketGap =
		researchBrief?.marketGap.trim() ||
		"Wellness tools track individual activity, but few turn local learning into shared community impact.";
	const rewardIdea =
		researchBrief?.rewardOpportunities[0]?.trim() ||
		"Credit impact points for useful clean-eating reviews and habit swaps.";

	return VoiceStoryOutputSchema.parse({
		voiceProfile: {
			tone: "Practical, encouraging, and transparent",
			personality: "A trusted community coach who makes healthy action feel local and achievable",
			coreValues: ["community learning", "healthy participation", "transparent impact"],
		},
		storyNarrative: {
			mission:
				"Help neighbors turn everyday clean-health choices into shared knowledge, visible progress, and community momentum.",
			problemStatement: problem,
			solutionVision: `${solution} Success means ${success}`,
			callToAction:
				"Share one useful clean-eating review so another neighbor can make a healthier choice today.",
			evangelizationAngles: [
				marketGap,
				rewardIdea,
				"Local habit swaps become reusable community knowledge.",
				"Impact points make helpful contributions visible without implying tokens or claimable assets.",
				"Founders can test a contribution loop before investing in a full custom build.",
			],
		},
		storyEngine: {
			abt: {
				agreement:
					"Neighbors want healthier routines that fit real family schedules and local constraints",
				andMultiplier:
					"and the best ideas often come from people already practicing those habits nearby",
				butObstacle:
					"but those practical examples are scattered across chats, memory, and one-off conversations",
				thereforeSolution:
					"therefore Clean Health turns shared reviews and habit swaps into visible community learning and impact points",
				combined:
					"Neighbors want healthier routines that fit real life, and the best ideas often come from nearby peers, but those examples are scattered, therefore Clean Health turns shared reviews and habit swaps into visible community learning and impact points.",
			},
			storySpine: {
				onceUponATime:
					"A neighborhood wanted healthier meals, clearer choices, and a practical way to learn from each other.",
				everyDay:
					"People tried small improvements on their own, but useful lessons disappeared after a single conversation.",
				butOneDay:
					"A founder created Clean Health so every useful review could help the next neighbor.",
				becauseOfThat: [
					"Members shared clean-eating reviews in one place.",
					"The community could see which actions created momentum.",
					"Helpful contributions earned impact points in a demo ledger.",
				],
				untilFinally:
					"Clean-health habits became easier to repeat because the community could learn together.",
				everSince:
					"Each contribution strengthened the local knowledge base and made the next healthy action easier.",
				narrative:
					"A neighborhood wanted healthier routines, but useful lessons kept disappearing after one-off conversations. One day, a founder created Clean Health so every clean-eating review could help the next neighbor. Because members shared practical tips, tracked visible impact, and earned impact points for useful contributions, healthy action became easier to repeat together.",
			},
			storyStatement:
				"What if a neighborhood could learn healthier habits from itself and make every useful review count?",
			proverb: "Shared healthy choices become community momentum.",
			metaphor: {
				statement: "Clean Health is a community recipe box",
				relevance: "Each member adds a practical habit, review, or resource that others can reuse.",
				implication:
					"The product should feel useful, trustworthy, and contribution-driven rather than competitive.",
			},
		},
		targetCommunity,
	});
}
