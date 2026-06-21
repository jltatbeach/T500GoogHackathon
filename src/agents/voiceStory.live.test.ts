// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";
import { type ProviderName, providerCredentialsPresent } from "./llm";
import { VoiceStoryOutputSchema } from "./schema";
import { runVoiceStory } from "./voiceStory";

/**
 * Live back-end test: exercises the Voice & Story agent (the most complex
 * structured output — full Story Engine) against a real LLM provider.
 *
 * Opt-in only (RUN_LIVE_AGENT_TESTS=1 + a provider key); use `pnpm test:live`.
 * Skipped in the default / pre-push run.
 */

const PROVIDERS: ProviderName[] = ["anthropic", "openai", "xai", "google", "bedrock"];

function firstAvailableProvider(): ProviderName | null {
	const explicit = process.env.LLM_PROVIDER as ProviderName | undefined;
	if (explicit && providerCredentialsPresent(explicit)) return explicit;
	return PROVIDERS.find((p) => providerCredentialsPresent(p)) ?? null;
}

const optedIn = process.env.RUN_LIVE_AGENT_TESTS === "1";
const provider = firstAvailableProvider();
const shouldRun = optedIn && provider !== null;

describe.skipIf(!shouldRun)(`voice & story agent — live call via ${provider}`, () => {
	beforeAll(() => {
		if (provider) process.env.LLM_PROVIDER = provider;
	});

	it("returns a schema-valid VoiceStoryOutput with a full Story Engine", async () => {
		const result = await runVoiceStory(
			"A healthy-living community app that rewards members for sharing clean-eating habits.",
		);

		expect(VoiceStoryOutputSchema.safeParse(result).success).toBe(true);
		// The Story Engine artifacts must be populated.
		expect(result.storyEngine.abt.combined.length).toBeGreaterThan(0);
		expect(result.storyEngine.storySpine.butOneDay.length).toBeGreaterThan(0);
		expect(result.storyEngine.proverb.length).toBeGreaterThan(0);
		expect(result.storyEngine.metaphor.statement.length).toBeGreaterThan(0);
	}, 90_000);
});
