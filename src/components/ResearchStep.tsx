import type { IdeaBrief } from "./IdeationForm";

function valueOrFallback(value: string, fallback: string): string {
	return value.trim() || fallback;
}

/** Emulated Agentic Research step matching FLOW-003 and the Market Validation wireframes. */
export function ResearchStep({ brief }: { brief: IdeaBrief }) {
	const cards = [
		{
			icon: "▮",
			title: "Market signals",
			body: "Health-minded neighbors want practical, trusted ways to compare habits and learn from each other.",
		},
		{
			icon: "◎",
			title: "Comparable patterns",
			body: "Habit trackers and wellness groups validate demand, but few connect shared learning to visible community impact.",
		},
		{
			icon: "♧",
			title: "Audience signal",
			body: "Families, organizers, and local health advocates need low-friction prompts that turn small actions into shared momentum.",
		},
		{
			icon: "⚖",
			title: "Risks & opportunities",
			body: "The demo should avoid medical claims, keep rewards as impact points, and emphasize community learning over competition.",
		},
	];

	return (
		<section aria-labelledby="research-heading" className="space-y-10">
			<div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-center">
				<div className="mx-auto flex h-64 w-64 items-center justify-center rounded-full bg-[conic-gradient(#0b6b2c_0deg,#0b6b2c_306deg,#e4e2dd_306deg)]">
					<div className="flex h-48 w-48 flex-col items-center justify-center rounded-full bg-[#fbf9f4] text-center">
						<p className="font-display text-6xl font-black text-refi-700">85</p>
						<p className="text-lg text-[#3f493e]">/ 100</p>
						<p className="mt-2 rounded-full bg-[#9ef7a6] px-3 py-1 text-xs font-bold uppercase tracking-wide text-refi-900">
							Emulated
						</p>
					</div>
				</div>

				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-700">
						Step 2 of 6 / Market Validation
					</p>
					<div className="mt-4 flex items-start gap-3">
						<span className="mt-2 text-2xl text-refi-700">✓</span>
						<div>
							<h2
								id="research-heading"
								className="font-display text-4xl font-black text-[#1b1c19] lg:text-5xl"
							>
								Strong need detected.
							</h2>
							<p className="mt-5 max-w-3xl text-lg leading-9 text-[#3f493e]">
								This demo-grade analysis uses the confirmed idea brief to identify audience need,
								comparable patterns, contribution opportunities, and assumptions. It is
								intentionally labeled emulated until live retrieval/citation tooling is added.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="rounded-[2rem] border border-[#e4e2dd] bg-white p-6">
				<h3 className="font-display text-2xl font-bold text-[#1b1c19]">Confirmed idea brief</h3>
				<dl className="mt-5 grid gap-4 text-sm lg:grid-cols-3">
					<div>
						<dt className="font-semibold text-[#3f493e]">Problem</dt>
						<dd className="mt-1 leading-6 text-[#707a6e]">
							{valueOrFallback(brief.problem, "Complete Ideation to seed validation.")}
						</dd>
					</div>
					<div>
						<dt className="font-semibold text-[#3f493e]">Solution</dt>
						<dd className="mt-1 leading-6 text-[#707a6e]">
							{valueOrFallback(brief.solution, "Complete Ideation to seed validation.")}
						</dd>
					</div>
					<div>
						<dt className="font-semibold text-[#3f493e]">Success</dt>
						<dd className="mt-1 leading-6 text-[#707a6e]">
							{valueOrFallback(brief.success, "Complete Ideation to seed validation.")}
						</dd>
					</div>
				</dl>
			</div>

			<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
				{cards.map((card) => (
					<article
						key={card.title}
						className="rounded-3xl border border-[#d8c7a3]/70 bg-white p-7 shadow-[0_20px_60px_-48px_rgba(47,53,47,0.32)]"
					>
						<span className="text-3xl text-refi-700">{card.icon}</span>
						<h3 className="mt-8 font-display text-2xl font-bold text-[#1b1c19]">{card.title}</h3>
						<p className="mt-4 text-base leading-7 text-[#3f493e]">{card.body}</p>
					</article>
				))}
			</div>

			<div className="rounded-[2rem] border border-[#e4e2dd] bg-[#f0eee9] p-8 lg:flex lg:items-center lg:justify-between">
				<div>
					<h3 className="font-display text-3xl font-bold text-[#1b1c19]">
						Ready to shape your narrative?
					</h3>
					<p className="mt-3 max-w-2xl text-[#3f493e]">
						The validation summary can now seed the Brand Story step while keeping all research
						claims demo-safe.
					</p>
				</div>
				<p className="mt-5 rounded-full bg-refi-600 px-5 py-3 text-center text-sm font-bold text-white lg:mt-0">
					Continue to Story →
				</p>
			</div>
		</section>
	);
}
