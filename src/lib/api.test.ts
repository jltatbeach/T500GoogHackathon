import { afterEach, describe, expect, it, vi } from "vitest";
import { VoiceStoryOutputSchema } from "../agents/schema";
import { generateVoiceStory } from "./api";

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
});

describe("generateVoiceStory", () => {
	it("returns emulated output when the API responds with 500", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => {
				return new Response(JSON.stringify({ error: "provider failed" }), {
					status: 500,
					headers: { "Content-Type": "application/json" },
				});
			}),
		);
		vi.spyOn(console, "warn").mockImplementation(() => undefined);

		const result = await generateVoiceStory(
			[
				"Problem: healthy habits are hard to sustain",
				"Solution: neighbors share clean-eating reviews",
				"Success: community learning earns impact points",
			].join("\n"),
		);

		expect(VoiceStoryOutputSchema.safeParse(result).success).toBe(true);
		expect(result.targetCommunity).toMatch(/health/i);
		expect(result.storyNarrative.solutionVision).toMatch(/impact points/i);
	});
});
