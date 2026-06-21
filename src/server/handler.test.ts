// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import { VoiceStoryOutputSchema } from "../agents/schema";
import { handleVoiceStory } from "./handler";

const ENV_KEYS = [
	"LLM_PROVIDER",
	"GOOGLE_API_KEY",
	"GEMINI_API_KEY",
	"ANTHROPIC_API_KEY",
	"OPENAI_API_KEY",
	"XAI_API_KEY",
	"GROK_API_KEY",
	"AWS_ACCESS_KEY_ID",
	"AWS_SECRET_ACCESS_KEY",
] as const;

const originalEnv = new Map<string, string | undefined>(
	ENV_KEYS.map((key) => [key, process.env[key]]),
);

function restoreEnv() {
	for (const key of ENV_KEYS) {
		const value = originalEnv.get(key);
		if (value === undefined) {
			delete process.env[key];
		} else {
			process.env[key] = value;
		}
	}
}

afterEach(() => {
	restoreEnv();
	vi.restoreAllMocks();
});

describe("handleVoiceStory", () => {
	it("returns an emulated schema-valid story when provider credentials are missing", async () => {
		for (const key of ENV_KEYS) delete process.env[key];
		process.env.LLM_PROVIDER = "google";
		vi.spyOn(console, "warn").mockImplementation(() => undefined);

		const result = await handleVoiceStory({
			userInput: [
				"Problem: neighbors want practical clean-health habits",
				"Solution: members share clean-eating reviews",
				"Success: useful contributions earn impact points",
			].join("\n"),
		});

		expect(VoiceStoryOutputSchema.safeParse(result).success).toBe(true);
		expect(result.storyNarrative.callToAction).toMatch(/clean-eating review/i);
		expect(result.storyEngine.abt.combined).toMatch(/impact points/i);
	});

	it("still rejects invalid input", async () => {
		await expect(handleVoiceStory({ userInput: "" })).rejects.toThrow(/describe/i);
	});
});
