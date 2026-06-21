const TRACE_ITEMS = [
	{
		label: "Designing structure",
		detail: "Layout and architecture validated.",
		status: "complete",
	},
	{
		label: "Building contribution flow",
		detail: "Defining regenerative loops...",
		status: "active",
	},
	{ label: "Creating reward mechanics", detail: "Impact-point rules queued.", status: "pending" },
	{ label: "Assembling preview", detail: "Finalizing visual assets...", status: "pending" },
] as const;

/** Emulated app generation trace for Clean Health. */
export function GenerationStep({
	appGenerated,
	onGenerate,
}: {
	appGenerated: boolean;
	onGenerate: () => void;
}) {
	const completion = appGenerated ? 100 : 64;

	return (
		<section aria-labelledby="generate-heading" className="space-y-10">
			<div className="text-center">
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-700">
					Step 5 of 6 / App Generation
				</p>
				<h2
					id="generate-heading"
					className="mx-auto mt-4 max-w-3xl font-display text-5xl font-black leading-tight text-[#1b1c19]"
				>
					Nurturing your digital ecosystem.
				</h2>
				<p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#3f493e]">
					The multi-agent pipeline is weaving your business summary into a functional Clean Health
					preview with contribution loops and impact-point rules.
				</p>
			</div>

			<div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem]">
				<div className="rounded-[2rem] border border-[#e4e2dd] bg-white p-8 shadow-[0_24px_80px_-52px_rgba(47,53,47,0.38)]">
					<div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
						<div className="flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-refi-700 bg-refi-50 text-5xl text-refi-700">
							ϟ
						</div>
						<h3 className="mt-8 font-display text-3xl font-bold text-[#1b1c19]">
							{appGenerated ? "Preview Infrastructure Ready" : "Generating Infrastructure"}
						</h3>
						<p className="mt-3 text-xl font-semibold text-refi-700">
							{appGenerated ? "Generation complete." : "Building contribution flow..."}
						</p>
					</div>

					<div>
						<div className="flex items-end justify-between">
							<p className="font-semibold text-[#1b1c19]">Overall Completion</p>
							<p className="font-display text-3xl font-bold text-refi-700">{completion}%</p>
						</div>
						<div className="mt-3 h-3 rounded-full bg-[#e4e2dd]">
							<div className="h-3 rounded-full bg-refi-600" style={{ width: `${completion}%` }} />
						</div>
						<div className="mt-4 flex justify-between text-sm text-[#707a6e]">
							<span>Phase: Agent Synthesis</span>
							<span>{appGenerated ? "Ready" : "Est. time remaining: 2m 40s"}</span>
						</div>
					</div>
				</div>

				<aside className="space-y-5">
					<h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#707a6e]">
						Pipeline Status
					</h3>
					{TRACE_ITEMS.map((item) => {
						const isActive = item.status === "active";
						const isComplete = item.status === "complete" || appGenerated;
						return (
							<div
								key={item.label}
								className={`rounded-3xl border p-5 shadow-sm ${
									isActive && !appGenerated
										? "border-[#bfcabb] bg-white"
										: isComplete
											? "border-[#e4e2dd] bg-white"
											: "border-transparent bg-white/45 opacity-60"
								}`}
							>
								<div className="flex items-center gap-4">
									<span
										className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
											isComplete ? "bg-refi-50 text-refi-700" : "bg-[#e4e2dd] text-[#707a6e]"
										}`}
									>
										{isComplete ? "✓" : isActive ? "↻" : "○"}
									</span>
									<div>
										<p className="font-display text-xl font-bold text-[#1b1c19]">{item.label}</p>
										<p className="text-sm text-[#707a6e]">{item.detail}</p>
									</div>
								</div>
							</div>
						);
					})}

					<div className="rounded-[2rem] bg-[#587d6e] p-7 text-white shadow-[0_24px_80px_-52px_rgba(47,53,47,0.42)]">
						<p className="text-sm font-bold uppercase tracking-[0.18em] text-refi-50">
							Agent Insight
						</p>
						<p className="mt-4 text-lg italic leading-8">
							“The contribution flow is optimized for low-friction community engagement while
							keeping impact-point language demo-safe.”
						</p>
					</div>
				</aside>
			</div>

			<div className="grid gap-5 md:grid-cols-4">
				{[
					["Computational load", "Moderate ·"],
					["Agent sync latency", "14ms"],
					["Memory allocation", "4.2GB"],
					["Network stability", "99.9%"],
				].map(([label, value]) => (
					<div key={label} className="rounded-3xl border border-[#e4e2dd] bg-white p-6">
						<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#707a6e]">
							{label}
						</p>
						<p className="mt-3 font-display text-3xl font-bold text-[#1b1c19]">{value}</p>
					</div>
				))}
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3">
				<button
					type="button"
					onClick={onGenerate}
					className="min-h-11 rounded-full bg-refi-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-refi-900/10 hover:bg-refi-700"
				>
					{appGenerated ? "Regenerate Clean Health preview" : "Generate Clean Health preview"}
				</button>
				{appGenerated && (
					<p className="rounded-full bg-refi-50 px-4 py-2 text-sm font-bold text-refi-700">
						Clean Health preview ready
					</p>
				)}
			</div>
		</section>
	);
}
