import { useEffect, useState } from "react";
import type { VoiceStoryOutput } from "./agents/schema";
import { BusinessSummaryStep } from "./components/BusinessSummaryStep";
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

// New visual wireframes name the same journey as:
// Ideation → Market Validation → Brand Story → Business Summary → App Generation → App Preview.
// Product constraints still keep Clean Health and impact points (not tokens) as canonical demo content.
const STEPS = [
	{ key: "ideation", label: "Ideation", description: "Problem / solution / success", icon: "◌" },
	{
		key: "market-validation",
		label: "Market Validation",
		description: "Audience / market / comparables",
		badge: "Emulated",
		icon: "✺",
	},
	{
		key: "brand-story",
		label: "Brand Story",
		description: "Voice Profile + Story Engine",
		icon: "✍",
	},
	{
		key: "business-summary",
		label: "Business Summary",
		description: "Blueprint before generation",
		icon: "□",
	},
	{
		key: "app-generation",
		label: "App Generation",
		description: "Screens + impact-point rules",
		icon: "ϟ",
	},
	{
		key: "app-preview",
		label: "App Preview",
		description: "Clean Health contribution demo",
		icon: "◎",
	},
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
			return "Let's bring your community idea to life";
		case "market-validation":
			return "Strong need detected";
		case "brand-story":
			return "Crafting your brand story";
		case "business-summary":
			return "Business summary";
		case "app-generation":
			return "Nurturing your digital ecosystem";
		case "app-preview":
			return "Your community is ready to bloom";
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
	const isDark = effectiveBackground === "dark";

	function canSelect(index: number): boolean {
		const key = STEPS[index]?.key;
		if (!key) return false;
		if (key === "ideation") return true;
		if (key === "market-validation" || key === "brand-story") return isBriefReady;
		if (key === "business-summary" || key === "app-generation") return hasStory;
		if (key === "app-preview") return appGenerated;
		return false;
	}

	function selectStep(index: number) {
		if (!canSelect(index)) return;
		setStep(index);
		setIsNavOpen(false);
	}

	function canAdvance(): boolean {
		if (activeKey === "ideation") return isBriefReady;
		if (activeKey === "market-validation") return true;
		if (activeKey === "brand-story") return hasStory;
		if (activeKey === "business-summary") return hasStory;
		if (activeKey === "app-generation") return appGenerated;
		return false;
	}

	function nextLabel(): string {
		if (activeKey === "ideation") return "Next: Market Validation";
		if (activeKey === "market-validation") return "Next: Brand Story";
		if (activeKey === "brand-story") return "Next: Business Summary";
		if (activeKey === "business-summary") return "Next: App Generation";
		if (activeKey === "app-generation") return "Next: App Preview";
		return "Next";
	}

	const shellClass = isDark
		? "min-h-screen bg-[#121412] font-body text-[#e2e3df]"
		: "min-h-screen bg-[#fbf9f4] font-body text-[#1b1c19]";
	const workspaceClass = isDark
		? "min-h-screen flex-1 bg-[radial-gradient(circle_at_70%_20%,rgba(131,218,140,0.10),transparent_32%),#121412]"
		: "min-h-screen flex-1 bg-[radial-gradient(circle_at_76%_18%,rgba(158,247,166,0.28),transparent_28%),#fbf9f4]";
	const panelClass = isDark
		? "rounded-[2rem] border border-white/10 bg-[#1a1c1a]/95 p-5 shadow-2xl shadow-black/20 lg:p-8"
		: "rounded-[2rem] border border-[#e4e2dd] bg-white/80 p-5 shadow-[0_24px_80px_-48px_rgba(47,53,47,0.35)] backdrop-blur lg:p-8";

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

			<div className="lg:pl-[280px]">
				<div className={workspaceClass}>
					<header
						className={`sticky top-0 z-20 border-b px-4 py-4 backdrop-blur lg:px-8 ${
							isDark ? "border-white/10 bg-[#121412]/90" : "border-[#e4e2dd] bg-[#fbf9f4]/90"
						}`}
					>
						<div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
							<div className="flex min-w-0 items-center gap-3">
								<button
									type="button"
									onClick={() => setIsNavOpen(true)}
									className="min-h-11 rounded-full border border-[#bfcabb] px-4 py-2 text-sm font-semibold lg:hidden"
								>
									Workflow
								</button>
								<div className="min-w-0">
									<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-700 dark:text-refi-300">
										Step {step + 1} of {STEPS.length} / {active.label}
									</p>
									<h1 className="truncate font-display text-xl font-black text-refi-700 lg:text-2xl">
										{step === 0 ? "Smart Community App Generator" : stepTitle(activeKey)}
									</h1>
								</div>
							</div>

							<div className="hidden items-center gap-2 sm:flex">
								<button type="button" className="min-h-11 rounded-full px-3 text-sm font-semibold">
									? Support
								</button>
								<button type="button" className="min-h-11 rounded-full px-3 text-sm font-semibold">
									◎ Account
								</button>
							</div>
						</div>
					</header>

					<main className="mx-auto max-w-[1200px] px-4 py-6 lg:px-8 lg:py-10">
						<div className={panelClass}>
							{activeKey === "ideation" && <IdeationForm value={brief} onChange={setBrief} />}
							{activeKey === "market-validation" && <ResearchStep brief={brief} />}
							{activeKey === "brand-story" && (
								<VoiceStoryForm idea={brief} onGenerated={setStoryResult} />
							)}
							{activeKey === "business-summary" && (
								<BusinessSummaryStep brief={brief} story={storyResult} />
							)}
							{activeKey === "app-generation" && (
								<GenerationStep
									appGenerated={appGenerated}
									onGenerate={() => setAppGenerated(true)}
								/>
							)}
							{activeKey === "app-preview" && <CleanHealthPreview />}
						</div>
					</main>

					<footer
						className={`sticky bottom-0 border-t px-4 py-3 backdrop-blur lg:px-8 ${
							isDark ? "border-white/10 bg-[#121412]/92" : "border-[#e4e2dd] bg-[#fbf9f4]/92"
						}`}
					>
						<div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3">
							<button
								type="button"
								onClick={() => setStep((s) => Math.max(0, s - 1))}
								disabled={step === 0}
								className="min-h-11 rounded-full px-4 py-2 text-sm font-semibold text-[#3f493e] hover:bg-[#eae8e3] disabled:cursor-not-allowed disabled:opacity-40 dark:text-[#bfcabb] dark:hover:bg-white/10"
							>
								← Back
							</button>
							<div className="hidden flex-1 items-center justify-center gap-2 md:flex">
								<span className="text-xs text-[#707a6e] dark:text-[#bfcabb]">Smart Community</span>
								<span className="h-px w-10 bg-[#bfcabb]" />
								<span className="text-xs text-[#ad3309]">Grounded in regeneration</span>
							</div>
							<button
								type="button"
								onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
								disabled={isLast || !canAdvance()}
								className="min-h-11 rounded-full bg-refi-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-refi-900/10 hover:bg-refi-700 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{nextLabel()} →
							</button>
						</div>
					</footer>
				</div>
			</div>
		</div>
	);
}
