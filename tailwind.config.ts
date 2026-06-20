import type { Config } from "tailwindcss";

// Clean, nature-inspired ReFi aesthetic (greens + earth tones) per UILayout.md.
export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				refi: {
					50: "#f0f9f1",
					100: "#dcf0de",
					300: "#86cf8f",
					500: "#3fa454",
					600: "#2f8542",
					700: "#276a37",
					900: "#1a3f24",
				},
				earth: {
					100: "#f3eee4",
					300: "#d8c7a3",
					600: "#8a7448",
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
