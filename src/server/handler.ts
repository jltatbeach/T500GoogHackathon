import { providerCredentialsPresent, resolveProvider } from "../agents/llm";
import { runResearch } from "../agents/research";
import {
	type ResearchBrief,
	ResearchRequestSchema,
	type VoiceStoryOutput,
	VoiceStoryRequestSchema,
} from "../agents/schema";
import { runVoiceStory } from "../agents/voiceStory";
import { createEmulatedVoiceStory } from "../agents/voiceStoryEmulation";

/**
 * Shared server entrypoints for the agent workflow.
 *
 * Used by both the Vercel Functions (`api/*.ts`) and the Vite dev middleware
 * so production and local dev run identical logic.
 */

/** Throw a clear error if the resolved LLM provider has no credentials. */
function assertProviderConfigured(): void {
	const provider = resolveProvider();
	if (!providerCredentialsPresent(provider)) {
		throw new Error(
			`No credentials configured for LLM provider "${provider}". Set the matching key in .env (see .env.example).`,
		);
	}
}

function errorMessage(err: unknown): string {
	return err instanceof Error ? err.message : "Unknown error";
}

export async function handleVoiceStory(body: unknown): Promise<VoiceStoryOutput> {
	const parsed = VoiceStoryRequestSchema.safeParse(body);
	if (!parsed.success) {
		throw new Error(parsed.error.issues[0]?.message ?? "Invalid request");
	}
	const researchBrief = parsed.data.researchBrief ?? null;
	const provider = resolveProvider();
	if (!providerCredentialsPresent(provider)) {
		console.warn(`[voice-story] Using emulated output; provider "${provider}" has no credentials.`);
		return createEmulatedVoiceStory(parsed.data.userInput, researchBrief);
	}

	try {
		return await runVoiceStory(parsed.data.userInput, researchBrief);
	} catch (err) {
		console.warn("[voice-story] Live generation failed; using emulated output.", {
			provider,
			error: errorMessage(err),
		});
		return createEmulatedVoiceStory(parsed.data.userInput, researchBrief);
	}
}

export async function handleResearch(body: unknown): Promise<ResearchBrief> {
	const parsed = ResearchRequestSchema.safeParse(body);
	if (!parsed.success) {
		throw new Error(parsed.error.issues[0]?.message ?? "Invalid request");
	}
	assertProviderConfigured();
	return runResearch(parsed.data.idea);
}
