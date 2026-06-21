import type { Config } from "tailwindcss";

// Clean, nature-inspired ReFi aesthetic (greens + earth tones) per UILayout.md.
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				refi: {
					50: "#f0f9f1",
					100: "#dcf0de",
					300: "#83da8c",
					500: "#0f6d2d",
					600: "#0b6b2c",
					700: "#00531e",
					900: "#002108",
				},
				earth: {
					100: "#f3eee4",
					300: "#d8c7a3",
					600: "#8a7448",
				},
			},
			fontFamily: {
				display: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
				body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
} satisfies Config;
