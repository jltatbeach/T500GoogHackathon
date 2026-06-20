import { VoiceStoryForm } from "./components/VoiceStoryForm";

// Wizard steps (Story → Design → Generate → Review/Contribute → Iterate) per docs/designs/UILayout.md.
const NAV_STEPS = [
	{ key: "voice-story", label: "Voice & Story", active: true },
	{ key: "generate", label: "Generate App", active: false },
	{ key: "preview", label: "Preview", active: false },
	{ key: "community", label: "Community Impact", active: false },
] as const;

export function App() {
	return (
		<div className="flex min-h-screen">
			<nav aria-label="Workflow navigation" className="w-60 shrink-0 bg-refi-900 p-4 text-white">
				<h1 className="text-lg font-bold">Smart Community App Generator</h1>
				<ul className="mt-6 space-y-1">
					{NAV_STEPS.map((step) => (
						<li key={step.key}>
							<span
								aria-current={step.active ? "step" : undefined}
								className={`block rounded px-3 py-2 text-sm ${
									step.active ? "bg-refi-600 font-medium" : "text-refi-100 opacity-70"
								}`}
							>
								{step.label}
							</span>
						</li>
					))}
				</ul>
			</nav>

			<main className="flex-1 p-8">
				<VoiceStoryForm />
			</main>
		</div>
	);
}
