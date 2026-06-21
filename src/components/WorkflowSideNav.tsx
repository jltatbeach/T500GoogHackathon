export interface WorkflowStep {
	key: string;
	label: string;
	description: string;
	badge?: string;
	icon?: string;
}

export type BackgroundMode = "system" | "light" | "dark";

const BACKGROUND_OPTIONS: { value: BackgroundMode; label: string }[] = [
	{ value: "system", label: "System" },
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
];

/** Responsive side-nav workflow rail matching the generated design wireframes. */
export function WorkflowSideNav({
	steps,
	current,
	canSelect,
	onSelect,
	backgroundMode,
	effectiveBackground,
	onBackgroundModeChange,
}: {
	steps: readonly WorkflowStep[];
	current: number;
	canSelect: (index: number) => boolean;
	onSelect: (index: number) => void;
	backgroundMode: BackgroundMode;
	effectiveBackground: Exclude<BackgroundMode, "system">;
	onBackgroundModeChange: (mode: BackgroundMode) => void;
}) {
	const isDark = effectiveBackground === "dark";
	const progress = Math.round(((current + 1) / steps.length) * 100);

	return (
		<nav
			aria-label="Workflow navigation"
			className={`flex h-full min-h-screen w-[280px] flex-col border-r p-5 shadow-sm ${
				isDark
					? "border-[#3f493e] bg-[#121412] text-[#e2e3df]"
					: "border-[#bfcabb] bg-[#fbf9f4] text-[#1b1c19]"
			}`}
		>
			<div className="px-2 pt-4">
				<h1 className="font-display text-2xl font-black leading-tight text-refi-700 dark:text-refi-300">
					Smart Community
				</h1>
				<p className={isDark ? "text-sm text-[#bfcabb]" : "text-sm text-[#707a6e]"}>
					Regenerative App Builder
				</p>
			</div>

			<div
				className={`mt-8 rounded-3xl border p-4 ${
					isDark ? "border-white/10 bg-white/5" : "border-[#e4e2dd] bg-white/70"
				}`}
			>
				<div className="flex items-end justify-between gap-3">
					<div>
						<p className="font-display text-2xl font-bold text-refi-700 dark:text-refi-300">
							{progress}%
						</p>
						<p className={isDark ? "text-xs text-[#bfcabb]" : "text-xs text-[#707a6e]"}>
							Step {current + 1} of {steps.length}
						</p>
					</div>
					<span
						className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
							isDark ? "bg-[#1e201e] text-[#83da8c]" : "bg-refi-50 text-refi-700"
						}`}
					>
						{effectiveBackground}
					</span>
				</div>
				<div className="mt-3 h-2 rounded-full bg-[#e4e2dd] dark:bg-[#333533]">
					<div
						className="h-2 rounded-full bg-refi-600 transition-all"
						style={{ width: `${progress}%` }}
					/>
				</div>
				<div className="mt-4 grid grid-cols-3 gap-1 rounded-full bg-[#e4e2dd]/70 p-1 dark:bg-black/30">
					{BACKGROUND_OPTIONS.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => onBackgroundModeChange(option.value)}
							aria-pressed={backgroundMode === option.value}
							className={`min-h-11 rounded-full px-2 py-1 text-xs font-semibold transition ${
								backgroundMode === option.value
									? "bg-white text-refi-900 shadow-sm dark:bg-[#83da8c] dark:text-[#003913]"
									: "text-[#3f493e] hover:bg-white/60 dark:text-[#bfcabb] dark:hover:bg-white/10"
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			</div>

			<ol className="mt-8 space-y-2">
				{steps.map((step, index) => {
					const status = index < current ? "done" : index === current ? "current" : "upcoming";
					const isDisabled = !canSelect(index);
					const activeClass = isDark
						? "bg-[#587d6e] text-[#fafffa] shadow-lg shadow-black/20"
						: "bg-[#587d6e] text-[#fafffa] shadow-sm";
					const doneClass = isDark
						? "text-[#e2e3df] hover:bg-white/10"
						: "text-[#1b1c19] hover:bg-[#eae8e3]";
					const upcomingClass = isDark ? "text-[#bfcabb]/55" : "text-[#3f493e]/60";

					return (
						<li key={step.key}>
							<button
								type="button"
								onClick={() => onSelect(index)}
								disabled={isDisabled}
								aria-current={status === "current" ? "step" : undefined}
								className={`flex min-h-11 w-full items-center gap-3 rounded-full px-4 py-3 text-left transition active:scale-[0.98] ${
									status === "current" ? activeClass : status === "done" ? doneClass : upcomingClass
								} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
							>
								<span aria-hidden="true" className="w-6 shrink-0 text-xl leading-none">
									{status === "done" ? "✓" : (step.icon ?? `${index + 1}`)}
								</span>
								<span className="min-w-0">
									<span className="flex flex-wrap items-center gap-2 font-body text-sm font-semibold">
										{step.label}
										{step.badge && (
											<span className="rounded-full bg-[#ffdbd1] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#641700]">
												{step.badge}
											</span>
										)}
									</span>
									<span className="mt-0.5 block text-xs opacity-75">{step.description}</span>
								</span>
							</button>
						</li>
					);
				})}
			</ol>

			<div className="mt-auto space-y-4 px-2 pb-2">
				<button
					type="button"
					className="min-h-11 w-full rounded-full bg-refi-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-refi-900/10 transition hover:bg-refi-700"
				>
					Save Progress
				</button>
				<div className={`border-t pt-4 ${isDark ? "border-white/10" : "border-[#bfcabb]"}`}>
					<p className="font-semibold">Alex River</p>
					<p className={isDark ? "text-xs text-[#bfcabb]" : "text-xs text-[#707a6e]"}>
						Project Lead
					</p>
				</div>
			</div>
		</nav>
	);
}
