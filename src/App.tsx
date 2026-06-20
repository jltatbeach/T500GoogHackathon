import { useState } from "react";
import { VoiceStoryForm } from "./components/VoiceStoryForm";

// Wizard steps (Story → Design → Generate → Review/Contribute → Iterate) per docs/designs/UILayout.md.
// State-driven single page: the sidebar swaps the active step (no router).
const STEPS = [
	{ key: "voice-story", label: "Voice & Story", ready: true },
	{ key: "generate", label: "Generate App", ready: false },
	{ key: "preview", label: "Preview", ready: false },
	{ key: "community", label: "Community Impact", ready: false },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const PLACEHOLDERS: Record<Exclude<StepKey, "voice-story">, string> = {
	generate:
		"Design & Feature agents will generate the app structure, contribution flows, and reward mechanics from your Voice & Story.",
	preview:
		"A runnable mini-app preview (e.g. “Health Clean”) with a working contribution → reward loop will appear here.",
	community:
		"Community impact and rewarded contributions (data/reviews) will be tracked here, mirroring the ReFi business model.",
};

export function App() {
	const [active, setActive] = useState<StepKey>("voice-story");

	return (
		<div className="flex min-h-screen">
			<nav aria-label="Workflow navigation" className="w-60 shrink-0 bg-refi-900 p-4 text-white">
				<h1 className="text-lg font-bold">Smart Community App Generator</h1>
				<ul className="mt-6 space-y-1">
					{STEPS.map((step) => (
						<li key={step.key}>
							<button
								type="button"
								onClick={() => setActive(step.key)}
								aria-current={active === step.key ? "step" : undefined}
								className={`block w-full rounded px-3 py-2 text-left text-sm ${
									active === step.key
										? "bg-refi-600 font-medium"
										: "text-refi-100 hover:bg-refi-700"
								}`}
							>
								{step.label}
								{!step.ready && <span className="ml-1 text-xs opacity-60">(soon)</span>}
							</button>
						</li>
					))}
				</ul>
			</nav>

			<main className="flex-1 p-8">
				{active === "voice-story" ? (
					<VoiceStoryForm />
				) : (
					<section aria-labelledby="step-heading" className="max-w-2xl">
						<h2 id="step-heading" className="text-2xl font-semibold text-refi-900">
							{STEPS.find((s) => s.key === active)?.label}
						</h2>
						<p className="mt-2 rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
							{PLACEHOLDERS[active as Exclude<StepKey, "voice-story">]}
						</p>
					</section>
				)}
			</main>
		</div>
	);
}
