/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { type Plugin, defineConfig, loadEnv } from "vite";

/**
 * Dev-only API middleware.
 *
 * Vite is a client bundler, so LLM calls (which need secret keys) must run
 * server-side. In production these live as Vercel Functions under `api/`.
 * For local `pnpm dev` we mount the same handler here so the app is runnable
 * without `vercel dev`. Both paths share `src/server/handler.ts`.
 */
function devApi(): Plugin {
	return {
		name: "dev-api",
		configureServer(server) {
			// Make .env values available to the server-side agent during dev.
			const env = loadEnv(server.config.mode, server.config.root, "");
			for (const key of Object.keys(env)) {
				if (process.env[key] === undefined) process.env[key] = env[key];
			}

			server.middlewares.use("/api/voice-story", async (req, res, next) => {
				if (req.method !== "POST") return next();
				try {
					const body = await readJson(req);
					const { handleVoiceStory } = await server.ssrLoadModule("/src/server/handler.ts");
					const result = await handleVoiceStory(body);
					res.setHeader("Content-Type", "application/json");
					res.end(JSON.stringify(result));
				} catch (err) {
					res.statusCode = 400;
					res.setHeader("Content-Type", "application/json");
					res.end(JSON.stringify({ error: err instanceof Error ? err.message : "Bad request" }));
				}
			});
		},
	};
}

function readJson(req: import("node:http").IncomingMessage): Promise<unknown> {
	return new Promise((resolve, reject) => {
		const chunks: Buffer[] = [];
		req.on("data", (c) => chunks.push(c));
		req.on("end", () => {
			try {
				const raw = Buffer.concat(chunks).toString("utf8");
				resolve(raw ? JSON.parse(raw) : {});
			} catch (e) {
				reject(e);
			}
		});
		req.on("error", reject);
	});
}

export default defineConfig({
	plugins: [react(), devApi()],
	build: { outDir: "dist", emptyOutDir: true },
	server: { open: true },
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
	},
});
