import type { VoiceStoryOutput } from "../agents/schema";

/** Client wrapper for the server-side Voice & Story workflow endpoint. */
export async function generateVoiceStory(userInput: string): Promise<VoiceStoryOutput> {
	const res = await fetch("/api/voice-story", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ userInput }),
	});
	if (!res.ok) {
		const detail = (await res.json().catch(() => ({}))) as { error?: string };
		throw new Error(detail.error ?? `Request failed (${res.status})`);
	}
	return (await res.json()) as VoiceStoryOutput;
}
