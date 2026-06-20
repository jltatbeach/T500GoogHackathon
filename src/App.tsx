import { useEffect, useState } from "react";
import type { VoiceStoryOutput } from "./agents/schema";
import { CleanHealthPreview } from "./components/CleanHealthPreview";
import { GenerationStep } from "./components/GenerationStep";
import {
	EMPTY_BRIEF,
	type IdeaBrief,
	IdeationForm,
	isBriefComplete,
} from "./components/IdeationForm";
import { ResearchStep } from "./components/ResearchStep";
import { VoiceStoryForm } from "./components/VoiceStoryForm";
import {
	type BackgroundMode,
	WorkflowSideNav,
	type WorkflowStep,
} from "./components/WorkflowSideNav";

// Wizard steps follow the canonical journey pipeline (docs/User-Flows.md):
// Ideation → Emulated Research → Voice & Story → Generate App → Preview.
const STEPS = [
	{ key: "ideation", label: "Ideation", description: "Problem / solution / success" },
	{
		key: "research",
		label: "Research",
		description: "Audience / market / comparables",
		badge: "Emulated",
	},
	{ key: "voice-story", label: "Voice & Story", description: "Voice Profile + Story Engine" },
	{ key: "generate", label: "Generate App", description: "Screens + impact-point rules" },
	{ key: "preview", label: "Preview", description: "Clean Health contribution demo" },
] as const satisfies readonly WorkflowStep[];

type StepKey = (typeof STEPS)[number]["key"];
type EffectiveBackground = Exclude<BackgroundMode, "system">;

function getSystemBackground(): EffectiveBackground {
	if (typeof window === "undefined") return "light";
	return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function stepTitle(step: StepKey): string {
	switch (step) {
		case "ideation":
			return "Problem, solution, and success";
		case "research":
			return "Emulated research handoff";
		case "voice-story":
			return "Voice & Story generation";
		case "generate":
			return "Generate Clean Health";
		case "preview":
			return "Preview and contribution loop";
	}
}

export function App() {
	const [step, setStep] = useState(0);
	const [brief, setBrief] = useState<IdeaBrief>(EMPTY_BRIEF);
	const [storyResult, setStoryResult] = useState<VoiceStoryOutput | null>(null);
	const [appGenerated, setAppGenerated] = useState(false);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>("system");
	const [systemBackground, setSystemBackground] =
		useState<EffectiveBackground>(getSystemBackground);

	useEffect(() => {
		const media = window.matchMedia?.("(prefers-color-scheme: dark)");
		if (!media) return;

		function updateSystemBackground(event: MediaQueryListEvent) {
			setSystemBackground(event.matches ? "dark" : "light");
		}

		media.addEventListener("change", updateSystemBackground);
		return () => media.removeEventListener("change", updateSystemBackground);
	}, []);

	const active = STEPS[step];
	const activeKey = active.key;
	const isBriefReady = isBriefComplete(brief);
	const hasStory = Boolean(storyResult);
	const isLast = step === STEPS.length - 1;
	const effectiveBackground = backgroundMode === "system" ? systemBackground : backgroundMode;

	function canSelect(index: number): boolean {
		const key = STEPS[index]?.key;
		if (!key) return false;
		if (key === "ideation") return true;
		if (key === "research" || key === "voice-story") return isBriefReady;
		if (key === "generate") return hasStory;
		if (key === "preview") return appGenerated;
		return false;
	}

	function selectStep(index: number) {
		if (!canSelect(index)) return;
		setStep(index);
		setIsNavOpen(false);
	}

	function canAdvance(): boolean {
		if (activeKey === "ideation") return isBriefReady;
		if (activeKey === "research") return true;
		if (activeKey === "voice-story") return hasStory;
		if (activeKey === "generate") return appGenerated;
		return false;
	}

	function nextLabel(): string {
		if (activeKey === "ideation") return "Next: Research";
		if (activeKey === "research") return "Next: Voice & Story";
		if (activeKey === "voice-story") return "Next: Generate App";
		if (activeKey === "generate") return "Next: Preview App";
		return "Next";
	}

	const shellClass =
		effectiveBackground === "dark"
			? "min-h-screen bg-slate-950 text-slate-100"
			: "min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 text-slate-900";
	const workspaceClass =
		effectiveBackground === "dark"
			? "min-h-screen flex-1 bg-slate-950/95"
			: "min-h-screen flex-1 bg-sky-50/40";
	const panelClass =
		effectiveBackground === "dark"
			? "rounded-2xl border border-white/10 bg-white p-5 text-gray-900 shadow-xl lg:p-8"
			: "rounded-2xl border border-sky-200/80 bg-sky-50/90 p-5 shadow-xl shadow-sky-900/10 lg:p-8";

	return (
		<div className={shellClass}>
			<div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block">
				<WorkflowSideNav
					steps={STEPS}
					current={step}
					canSelect={canSelect}
					onSelect={selectStep}
					backgroundMode={backgroundMode}
					effectiveBackground={effectiveBackground}
					onBackgroundModeChange={setBackgroundMode}
				/>
			</div>

			{isNavOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					<button
						type="button"
						aria-label="Close workflow navigation"
						className="absolute inset-0 bg-black/50"
						onClick={() => setIsNavOpen(false)}
					/>
					<div className="relative h-full max-w-[18rem]">
						<WorkflowSideNav
							steps={STEPS}
							current={step}
							canSelect={canSelect}
							onSelect={selectStep}
							backgroundMode={backgroundMode}
							effectiveBackground={effectiveBackground}
							onBackgroundModeChange={setBackgroundMode}
						/>
					</div>
				</div>
			)}

			<div className="lg:pl-72">
				<div className={workspaceClass}>
					<header className="sticky top-0 z-20 border-b border-sky-200/70 bg-sky-50/95 px-4 py-3 backdrop-blur lg:hidden">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="text-xs font-semibold uppercase tracking-wide text-refi-600">
									Smart Community
								</p>
								<p className="font-semibold text-refi-900">{active.label}</p>
							</div>
							<button
								type="button"
								onClick={() => setIsNavOpen(true)}
								className="min-h-11 rounded-md bg-refi-600 px-4 py-2 text-sm font-medium text-white"
							>
								Workflow
							</button>
						</div>
					</header>

					<main className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-10">
						<div className="mb-6">
							<p className="text-sm font-medium text-refi-600">
								Step {step + 1} of {STEPS.length}: {active.label}
							</p>
							<h1 className="mt-1 text-3xl font-bold text-refi-900">{stepTitle(activeKey)}</h1>
						</div>

						<div className={panelClass}>
							{activeKey === "ideation" && <IdeationForm value={brief} onChange={setBrief} />}
							{activeKey === "research" && <ResearchStep brief={brief} />}
							{activeKey === "voice-story" && (
								<VoiceStoryForm idea={brief} onGenerated={setStoryResult} />
							)}
							{activeKey === "generate" && (
								<GenerationStep
									appGenerated={appGenerated}
									onGenerate={() => setAppGenerated(true)}
								/>
							)}
							{activeKey === "preview" && <CleanHealthPreview />}
						</div>
					</main>

					<footer className="sticky bottom-0 border-t border-sky-200/70 bg-sky-50/95 px-4 py-3 backdrop-blur lg:px-8">
						<div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
							<button
								type="button"
								onClick={() => setStep((s) => Math.max(0, s - 1))}
								disabled={step === 0}
								className="min-h-11 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
							>
								Back
							</button>
							<button
								type="button"
								onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
								disabled={isLast || !canAdvance()}
								className="min-h-11 rounded-md bg-refi-600 px-4 py-2 text-sm font-medium text-white hover:bg-refi-700 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{nextLabel()}
							</button>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}
