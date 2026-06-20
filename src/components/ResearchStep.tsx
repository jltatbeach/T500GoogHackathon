import type { IdeaBrief } from "./IdeationForm";

function valueOrFallback(value: string, fallback: string): string {
	return value.trim() || fallback;
}

/** Emulated Agentic Research step matching FLOW-003. */
export function ResearchStep({ brief }: { brief: IdeaBrief }) {
	const cards = [
		{
			title: "Audience signal",
			body: "Health-minded neighbors want simple ways to share credible habits and see community momentum.",
		},
		{
			title: "Market gap",
			body: "Most wellness apps track individual habits, but fewer reward community reviews and shared learning.",
		},
		{
			title: "Reward idea",
			body: "Award impact points for clean-eating reviews, evidence-backed tips, and local resource updates.",
		},
		{
			title: "Assumption",
			body: "The first demo can emulate research while preserving the eventual ResearchBrief contract.",
		},
	];

	return (
		<section aria-labelledby="research-heading" className="space-y-6">
			<div>
				<div className="flex flex-wrap items-center gap-2">
					<h2 id="research-heading" className="text-2xl font-semibold text-refi-900">
						Research
					</h2>
					<span className="rounded-full bg-earth-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-earth-600">
						Emulated
					</span>
				</div>
				<p className="mt-2 max-w-2xl text-sm text-gray-600">
					Research agents turn your brief into evidence for story and design. This demo uses
					emulated outputs until the real research agent is wired in.
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
				<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
					<h3 className="font-semibold text-refi-900">Confirmed idea brief</h3>
					<dl className="mt-4 space-y-3 text-sm">
						<div>
							<dt className="font-medium text-gray-700">Problem</dt>
							<dd className="mt-1 text-gray-600">
								{valueOrFallback(brief.problem, "Complete Ideation to seed research.")}
							</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Solution</dt>
							<dd className="mt-1 text-gray-600">
								{valueOrFallback(brief.solution, "Complete Ideation to seed research.")}
							</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Success</dt>
							<dd className="mt-1 text-gray-600">
								{valueOrFallback(brief.success, "Complete Ideation to seed research.")}
							</dd>
						</div>
					</dl>
				</div>

				<div className="rounded-xl border border-refi-100 bg-refi-50 p-5 shadow-sm">
					<h3 className="font-semibold text-refi-900">Emulated research trace</h3>
					<ul className="mt-4 space-y-3 text-sm text-refi-900">
						{[
							"Audience signal",
							"Comparable apps",
							"Reward opportunities",
							"Risks and assumptions",
						].map((item) => (
							<li key={item} className="flex items-center gap-2">
								<span className="flex h-5 w-5 items-center justify-center rounded-full bg-refi-600 text-xs font-bold text-white">
									✓
								</span>
								{item}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{cards.map((card) => (
					<article
						key={card.title}
						className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
					>
						<h3 className="text-sm font-semibold text-refi-900">{card.title}</h3>
						<p className="mt-2 text-sm text-gray-600">{card.body}</p>
					</article>
				))}
			</div>
		</section>
	);
}
