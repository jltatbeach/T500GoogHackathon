// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";
import { type ProviderName, providerCredentialsPresent } from "./llm";
import { runResearch } from "./research";
import { ResearchBriefSchema } from "./schema";

/**
 * Live back-end test: exercises the Research agent against a real LLM provider.
 *
 * Opt-in only — runs when RUN_LIVE_AGENT_TESTS=1 AND a provider key is present
 * (use `pnpm test:live`). The default `pnpm test` / pre-push run skips this so
 * it stays fast, deterministic, and free of paid API calls.
 */

const PROVIDERS: ProviderName[] = ["anthropic", "openai", "xai", "google", "bedrock"];

/** Prefer an explicit LLM_PROVIDER (if it has creds), else the first that does. */
function firstAvailableProvider(): ProviderName | null {
	const explicit = process.env.LLM_PROVIDER as ProviderName | undefined;
	if (explicit && providerCredentialsPresent(explicit)) return explicit;
	return PROVIDERS.find((p) => providerCredentialsPresent(p)) ?? null;
}

const optedIn = process.env.RUN_LIVE_AGENT_TESTS === "1";
const provider = firstAvailableProvider();
const shouldRun = optedIn && provider !== null;

describe.skipIf(!shouldRun)(`research agent — live call via ${provider}`, () => {
	beforeAll(() => {
		// Pin the resolved provider to one we have credentials for.
		if (provider) process.env.LLM_PROVIDER = provider;
	});

	it("returns a schema-valid ResearchBrief from a real provider", async () => {
		const brief = await runResearch({
			problem: "Busy families struggle to keep healthy-eating habits on their own.",
			solution: "A community app that rewards members for sharing clean-eating habits.",
			success: "Members sustain habits and the community grows month over month.",
		});

		// The structured output must satisfy the schema...
		expect(ResearchBriefSchema.safeParse(brief).success).toBe(true);
		// ...and contain non-trivial content from the model.
		expect(brief.audience.length).toBeGreaterThan(0);
		expect(brief.marketGap.length).toBeGreaterThan(0);
		expect(brief.comparables.length).toBeGreaterThan(0);
		expect(brief.rewardOpportunities.length).toBeGreaterThan(0);
		expect(brief.assumptions.length).toBeGreaterThan(0);
	}, 60_000);
});
