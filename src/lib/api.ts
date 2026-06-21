import type { IdeaBriefInput, ResearchBrief, VoiceStoryOutput } from "../agents/schema";

/** POST a JSON body and return the typed result, surfacing server error text. */
async function postJson<T>(path: string, body: unknown): Promise<T> {
	const res = await fetch(path, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
	if (!res.ok) {
		const detail = (await res.json().catch(() => ({}))) as { error?: string };
		throw new Error(detail.error ?? `Request failed (${res.status})`);
	}
	return (await res.json()) as T;
}

/** Client wrapper for the server-side Voice & Story workflow endpoint. */
export function generateVoiceStory(
	userInput: string,
	researchBrief?: ResearchBrief,
): Promise<VoiceStoryOutput> {
	return postJson<VoiceStoryOutput>("/api/voice-story", { userInput, researchBrief });
}

/** Client wrapper for the server-side emulated Agentic Research endpoint. */
export function generateResearch(idea: IdeaBriefInput): Promise<ResearchBrief> {
	return postJson<ResearchBrief>("/api/research", { idea });
}
