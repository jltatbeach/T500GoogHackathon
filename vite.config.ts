/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { type Plugin, type PluginOption, defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

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
	plugins: [
		react(),
		devApi(),
		VitePWA({
			// New service worker activates automatically on next load (SA standard).
			registerType: "autoUpdate",
			injectRegister: "auto",
			includeAssets: ["favicon.svg", "favicon.ico", "apple-touch-icon.png"],
			manifest: {
				name: "Smart Community App Generator",
				short_name: "Smart Community",
				description:
					"AI-workflow-driven generator for community sustainability apps with built-in contribution-reward loops.",
				theme_color: "#2f8542",
				background_color: "#ffffff",
				display: "standalone",
				start_url: "/",
				icons: [
					{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
					{ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
					{
						src: "/icons/maskable-512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				// App-shell PWA: precache the build, but never cache the server-side
				// LLM endpoint — generation always needs the network.
				navigateFallbackDenylist: [/^\/api\//],
				runtimeCaching: [
					{ urlPattern: ({ url }) => url.pathname.startsWith("/api"), handler: "NetworkOnly" },
				],
			},
			// vite-plugin-pwa pulls a second vite copy (via workbox-build → terser),
			// so its Plugin type identity differs; reconcile to this project's vite.
		}) as PluginOption,
	],
	build: { outDir: "dist", emptyOutDir: true },
	server: { open: true },
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
	},
});
