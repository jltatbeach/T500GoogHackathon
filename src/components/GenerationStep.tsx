const TRACE_ITEMS = [
	{ label: "Voice & Story accepted", status: "✓" },
	{ label: "Design agent: app map", status: "~" },
	{ label: "Feature agent: impact points", status: "~" },
	{ label: "Review agent: consistency", status: "•" },
	{ label: "Preview builder: Clean Health", status: "•" },
] as const;

/** Emulated app generation trace for Clean Health. */
export function GenerationStep({
	appGenerated,
	onGenerate,
}: {
	appGenerated: boolean;
	onGenerate: () => void;
}) {
	return (
		<section aria-labelledby="generate-heading" className="space-y-6">
			<div>
				<h2 id="generate-heading" className="text-2xl font-semibold text-refi-900">
					Generate App
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-gray-600">
					Agents convert the story into screens, features, and impact points. This first pass
					emulates the downstream agents while preserving the workflow trace.
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
				<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
					<h3 className="font-semibold text-refi-900">Workflow trace</h3>
					<ol className="mt-4 space-y-3 text-sm">
						{TRACE_ITEMS.map((item) => (
							<li key={item.label} className="flex items-center gap-3">
								<span className="flex h-6 w-6 items-center justify-center rounded-full bg-refi-100 text-xs font-bold text-refi-700">
									{item.status}
								</span>
								<span className="text-gray-700">{item.label}</span>
							</li>
						))}
					</ol>
				</div>

				<div className="rounded-xl border border-earth-300 bg-earth-100 p-5 shadow-sm">
					<h3 className="font-semibold text-earth-600">Subtle future note</h3>
					<p className="mt-2 text-sm text-gray-700">
						Future proof-based verification can back rewards later. This demo uses local impact
						points only.
					</p>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				{[
					["App map", "Home, Contribute, Rewards, and Community tabs for Clean Health."],
					["Components", "Preview shell, contribution card, reward confirmation, dashboard."],
					["Impact rules", "+25 impact points for a complete clean-eating review."],
				].map(([title, body]) => (
					<article key={title} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
						<h3 className="text-sm font-semibold text-refi-900">{title}</h3>
						<p className="mt-2 text-sm text-gray-600">{body}</p>
					</article>
				))}
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<button
					type="button"
					onClick={onGenerate}
					className="min-h-11 rounded-md bg-refi-600 px-4 py-2 text-sm font-medium text-white hover:bg-refi-700"
				>
					{appGenerated ? "Regenerate Clean Health preview" : "Generate Clean Health preview"}
				</button>
				{appGenerated && (
					<p className="rounded-full bg-refi-50 px-3 py-2 text-sm font-medium text-refi-700">
						Clean Health preview ready
					</p>
				)}
			</div>
		</section>
	);
}
