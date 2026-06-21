import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleResearch } from "../src/server/handler";

export const config = { maxDuration: 60 };

// Vercel Function: runs the emulated Agentic Research agent server-side.
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
	if (req.method !== "POST") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}
	try {
		const result = await handleResearch(req.body);
		res.status(200).json(result);
	} catch (err) {
		res.status(400).json({ error: err instanceof Error ? err.message : "Bad request" });
	}
}
