import { providerCredentialsPresent, resolveProvider } from "../agents/llm";
import { runResearch } from "../agents/research";
import {
	type ResearchBrief,
	ResearchRequestSchema,
	type VoiceStoryOutput,
	VoiceStoryRequestSchema,
} from "../agents/schema";
import { runVoiceStory } from "../agents/voiceStory";

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

export async function handleVoiceStory(body: unknown): Promise<VoiceStoryOutput> {
	const parsed = VoiceStoryRequestSchema.safeParse(body);
	if (!parsed.success) {
		throw new Error(parsed.error.issues[0]?.message ?? "Invalid request");
	}
	assertProviderConfigured();
	return runVoiceStory(parsed.data.userInput, parsed.data.researchBrief ?? null);
}

export async function handleResearch(body: unknown): Promise<ResearchBrief> {
	const parsed = ResearchRequestSchema.safeParse(body);
	if (!parsed.success) {
		throw new Error(parsed.error.issues[0]?.message ?? "Invalid request");
	}
	assertProviderConfigured();
	return runResearch(parsed.data.idea);
}
