export interface WorkflowStep {
	key: string;
	label: string;
	description: string;
	badge?: string;
}

export type BackgroundMode = "system" | "light" | "dark";

const BACKGROUND_OPTIONS: { value: BackgroundMode; label: string }[] = [
	{ value: "system", label: "System" },
	{ value: "light", label: "Light" },
	{ value: "dark", label: "Dark" },
];

/** Responsive side-nav workflow rail matching docs/designs/InitialWireframes.md. */
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
	return (
		<nav
			aria-label="Workflow navigation"
			className="flex h-full min-h-screen w-72 flex-col bg-refi-900 p-5 text-white shadow-xl"
		>
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-refi-300">
					Smart Community
				</p>
				<h1 className="mt-2 text-xl font-bold leading-tight">App Generator</h1>
				<p className="mt-3 text-sm text-refi-100">
					Turn a founder idea into a story-led app with a visible contribution loop.
				</p>
			</div>

			<div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3">
				<div className="flex items-center justify-between gap-3">
					<div>
						<p className="text-xs font-semibold uppercase tracking-wide text-refi-100">
							Background
						</p>
						<p className="text-xs text-refi-100/70">Effective: {effectiveBackground}</p>
					</div>
				</div>
				<div className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-refi-950/40 p-1">
					{BACKGROUND_OPTIONS.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => onBackgroundModeChange(option.value)}
							aria-pressed={backgroundMode === option.value}
							className={`min-h-11 rounded-full px-2 py-1 text-xs font-semibold ${
								backgroundMode === option.value
									? "bg-white text-refi-900"
									: "text-refi-100 hover:bg-white/10"
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			</div>

			<ol className="mt-6 space-y-2">
				{steps.map((step, index) => {
					const status = index < current ? "done" : index === current ? "current" : "upcoming";
					const isDisabled = !canSelect(index);
					return (
						<li key={step.key}>
							<button
								type="button"
								onClick={() => onSelect(index)}
								disabled={isDisabled}
								aria-current={status === "current" ? "step" : undefined}
								className={`flex min-h-11 w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
									status === "current"
										? "bg-refi-600 shadow-lg shadow-refi-950/20"
										: status === "done"
											? "text-refi-50 hover:bg-refi-700"
											: "cursor-not-allowed text-refi-100/45"
								}`}
							>
								<span
									aria-hidden="true"
									className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
										status === "upcoming"
											? "bg-white/10 text-refi-100/60"
											: "bg-refi-50 text-refi-700"
									}`}
								>
									{status === "done" ? "✓" : index + 1}
								</span>
								<span className="min-w-0">
									<span className="flex flex-wrap items-center gap-2 text-sm font-semibold">
										{step.label}
										{step.badge && (
											<span className="rounded-full bg-earth-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-earth-600">
												{step.badge}
											</span>
										)}
									</span>
									<span className="mt-1 block text-xs leading-5 text-refi-100/80">
										{step.description}
									</span>
								</span>
							</button>
						</li>
					);
				})}
			</ol>

			<div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-refi-100">
				<p className="font-semibold text-white">Future: install PWA</p>
				<p className="mt-1">Offline app shell now; AI generation stays network-only.</p>
			</div>
		</nav>
	);
}
