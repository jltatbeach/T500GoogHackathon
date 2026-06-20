import { providerCredentialsPresent, resolveProvider } from "../agents/llm";
import { type VoiceStoryOutput, VoiceStoryRequestSchema } from "../agents/schema";
import { runVoiceStory } from "../agents/voiceStory";

/**
 * Shared server entrypoint for the Voice & Story workflow.
 *
 * Used by both the Vercel Function (`api/voice-story.ts`) and the Vite dev
 * middleware so production and local dev run identical logic.
 */
export async function handleVoiceStory(body: unknown): Promise<VoiceStoryOutput> {
	const parsed = VoiceStoryRequestSchema.safeParse(body);
	if (!parsed.success) {
		throw new Error(parsed.error.issues[0]?.message ?? "Invalid request");
	}

	const provider = resolveProvider();
	if (!providerCredentialsPresent(provider)) {
		throw new Error(
			`No credentials configured for LLM provider "${provider}". Set the matching key in .env (see .env.example).`,
		);
	}

	return runVoiceStory(parsed.data.userInput);
}
