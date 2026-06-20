import { useState } from "react";
import {
	EMPTY_BRIEF,
	type IdeaBrief,
	IdeationForm,
	isBriefComplete,
} from "./components/IdeationForm";
import { VoiceStoryForm } from "./components/VoiceStoryForm";
import { type WizardStep, WizardStepper } from "./components/WizardStepper";

// Wizard steps follow the canonical journey pipeline (docs/User-Flows.md):
// Ideation → Agentic Research → Voice & Story → Generate App → Preview.
const STEPS = [
	{ key: "ideation", label: "Ideation" },
	{ key: "research", label: "Research" },
	{ key: "voice-story", label: "Voice & Story" },
	{ key: "generate", label: "Generate App" },
	{ key: "preview", label: "Preview" },
] as const satisfies readonly WizardStep[];

type StepKey = (typeof STEPS)[number]["key"];

const PLACEHOLDERS: Partial<Record<StepKey, string>> = {
	research:
		"Agentic Research (LangChain agents) will validate and enrich your idea brief — audience, comparable solutions, and market signals — before the story is written.",
	generate:
		"Design & Feature agents will generate the app structure, contribution flows, and reward mechanics from your Voice & Story.",
	preview:
		"A runnable mini-app preview (e.g. “Health Clean”) with a working contribution → reward loop will appear here.",
};

export function App() {
	const [step, setStep] = useState(0);
	const [brief, setBrief] = useState<IdeaBrief>(EMPTY_BRIEF);

	const active = STEPS[step];
	// The Ideation step gates the wizard until problem/solution/success are answered.
	const canAdvance = active.key !== "ideation" || isBriefComplete(brief);
	const isLast = step === STEPS.length - 1;

	return (
		<div className="mx-auto flex min-h-screen max-w-4xl flex-col p-6">
			<header>
				<h1 className="text-lg font-bold text-refi-900">Smart Community App Generator</h1>
				<p className="text-sm text-gray-500">
					Step {step + 1} of {STEPS.length}: {active.label}
				</p>
				<div className="mt-4">
					<WizardStepper steps={STEPS} current={step} onSelect={setStep} />
				</div>
			</header>

			<main className="flex-1 py-8">
				{active.key === "ideation" && <IdeationForm value={brief} onChange={setBrief} />}
				{active.key === "voice-story" && <VoiceStoryForm idea={brief} />}
				{(active.key === "research" || active.key === "generate" || active.key === "preview") && (
					<section aria-labelledby="step-heading" className="max-w-2xl">
						<h2 id="step-heading" className="text-2xl font-semibold text-refi-900">
							{active.label}
						</h2>
						<p className="mt-2 rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
							{PLACEHOLDERS[active.key]}
						</p>
					</section>
				)}
			</main>

			<footer className="flex items-center justify-between border-t border-gray-200 pt-4">
				<button
					type="button"
					onClick={() => setStep((s) => Math.max(0, s - 1))}
					disabled={step === 0}
					className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
				>
					Back
				</button>
				<button
					type="button"
					onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
					disabled={isLast || !canAdvance}
					className="rounded-md bg-refi-600 px-4 py-2 text-sm font-medium text-white hover:bg-refi-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Next
				</button>
			</footer>
		</div>
	);
}
