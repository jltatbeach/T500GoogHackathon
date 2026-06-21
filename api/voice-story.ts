import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleVoiceStory } from "../src/server/handler";

// Allow time for a real LLM call; the handler races a shorter timeout and
// falls back to emulated output well before this ceiling.
export const config = { maxDuration: 60 };

// Vercel Function: runs the Voice & Story workflow server-side (keeps API keys secret).
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
	if (req.method !== "POST") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}
	try {
		const result = await handleVoiceStory(req.body);
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json({ error: err instanceof Error ? err.message : "Bad request" });
	}
}
