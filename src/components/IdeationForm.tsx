export interface IdeaBrief {
	problem: string;
	solution: string;
	success: string;
}

export const EMPTY_BRIEF: IdeaBrief = { problem: "", solution: "", success: "" };

/** A brief is complete once all three prompts are answered (gates the wizard). */
export function isBriefComplete(brief: IdeaBrief): boolean {
	return Boolean(brief.problem.trim() && brief.solution.trim() && brief.success.trim());
}

const PROMPTS: { key: keyof IdeaBrief; label: string; placeholder: string; hint: string }[] = [
	{
		key: "problem",
		label: "What problem are you solving for your users or customers?",
		placeholder:
			"Describe the friction points your community faces. Is it access to resources, lack of coordination, or a need for shared accountability?",
		hint: "Focus on the human element",
	},
	{
		key: "solution",
		label: "How will your application solve that problem?",
		placeholder: "Describe the core capability and how people participate together.",
		hint: "Name the contribution loop",
	},
	{
		key: "success",
		label: "What does success look like — for your users and your business?",
		placeholder: "Describe the measurable outcomes that show the community is healthier.",
		hint: "Make the impact visible",
	},
];

function summarize(value: string, fallback: string): string {
	return value.trim() || fallback;
}

/**
 * Ideation step (FLOW-002): refine the business idea through problem → solution
 * → success before producing the Smart App.
 */
export function IdeationForm({
	value,
	onChange,
}: {
	value: IdeaBrief;
	onChange: (brief: IdeaBrief) => void;
}) {
	const completedCount = PROMPTS.filter((prompt) => value[prompt.key].trim()).length;
	const isComplete = completedCount === PROMPTS.length;
	const progress = `${completedCount}/${PROMPTS.length}`;

	return (
		<section aria-labelledby="ideation-heading" className="space-y-10">
			<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
				<div>
					<span className="inline-flex rounded-full bg-[#9ef7a6] px-4 py-2 text-sm font-semibold text-refi-900">
						✣ Phase 1: Foundation
					</span>
					<h2
						id="ideation-heading"
						className="mt-6 max-w-3xl font-display text-5xl font-black leading-tight text-[#1b1c19] lg:text-6xl"
					>
						Let's bring your community <span className="italic text-refi-700">idea to life.</span>
					</h2>
					<p className="mt-6 max-w-3xl text-xl leading-9 text-[#3f493e]">
						Every regenerative project starts with a single seed. Define the soil where your
						community will grow: problem, solution, and success.
					</p>
				</div>

				<aside className="rounded-[2rem] border border-[#e4e2dd] bg-white p-8 text-center shadow-[0_24px_80px_-48px_rgba(47,53,47,0.35)]">
					<div
						className="mx-auto flex h-28 w-28 items-center justify-center rounded-full"
						style={{
							background: `conic-gradient(#0b6b2c ${(completedCount / PROMPTS.length) * 360}deg, #e4e2dd 0deg)`,
						}}
					>
						<div className="flex h-20 w-20 items-center justify-center rounded-full bg-white font-display text-3xl font-bold text-refi-700">
							{progress}
						</div>
					</div>
					<h3 className="mt-6 font-display text-2xl font-bold text-[#1b1c19]">Ideation Progress</h3>
					<p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#707a6e]">
						Step 1 of 6 overall
					</p>
				</aside>
			</div>

			<div className="space-y-6">
				{PROMPTS.map((prompt, index) => (
					<div key={prompt.key} className="mx-auto max-w-4xl">
						<label
							htmlFor={prompt.key}
							className="flex flex-wrap items-center gap-4 font-display text-2xl font-bold text-[#1b1c19] lg:text-3xl"
						>
							<span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffdbd1] text-lg text-[#641700]">
								{index + 1}
							</span>
							{prompt.label}
						</label>
						<div className="mt-5 rounded-[2rem] border-2 border-[#bfcabb] bg-white p-5 shadow-[0_24px_80px_-54px_rgba(47,53,47,0.4)] focus-within:border-refi-600">
							<textarea
								id={prompt.key}
								rows={index === 0 ? 5 : 3}
								value={value[prompt.key]}
								placeholder={prompt.placeholder}
								onChange={(e) => onChange({ ...value, [prompt.key]: e.target.value })}
								className="w-full resize-y border-0 bg-transparent p-2 text-lg leading-8 text-[#1b1c19] placeholder:text-slate-500 focus:outline-none focus:ring-0"
							/>
							<p className="mt-2 text-right text-sm text-[#707a6e]">⌁ {prompt.hint}</p>
						</div>
					</div>
				))}
			</div>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
				<article className="rounded-[2rem] border border-[#e4e2dd] bg-white p-6 shadow-[0_20px_70px_-50px_rgba(47,53,47,0.3)]">
					<h3 className="font-display text-2xl font-bold text-[#1b1c19]">Idea brief preview</h3>
					<dl className="mt-5 grid gap-4 text-sm lg:grid-cols-3">
						<div>
							<dt className="font-semibold text-[#3f493e]">Problem</dt>
							<dd className="mt-1 text-[#707a6e]">
								{summarize(value.problem, "Who is struggling, and why now?")}
							</dd>
						</div>
						<div>
							<dt className="font-semibold text-[#3f493e]">Solution</dt>
							<dd className="mt-1 text-[#707a6e]">
								{summarize(value.solution, "How the app helps people participate.")}
							</dd>
						</div>
						<div>
							<dt className="font-semibold text-[#3f493e]">Success</dt>
							<dd className="mt-1 text-[#707a6e]">
								{summarize(value.success, "The user and community outcome.")}
							</dd>
						</div>
					</dl>
					<p
						className={`mt-6 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
							isComplete ? "bg-refi-50 text-refi-700" : "bg-[#ffdbd1] text-[#641700]"
						}`}
					>
						{isComplete
							? "Ready for Market Validation"
							: "Complete all fields to unlock Market Validation"}
					</p>
				</article>

				<aside className="overflow-hidden rounded-[2rem] border border-[#e4e2dd] bg-[#f0eee9] shadow-sm">
					<div className="h-32 bg-[radial-gradient(circle_at_50%_10%,#fff7a8,transparent_22%),linear-gradient(135deg,#406455,#9ef7a6)]" />
					<div className="p-6">
						<p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ad3309]">
							Design Tip
						</p>
						<h3 className="mt-3 font-display text-2xl font-bold">Start with the Why</h3>
						<p className="mt-3 text-sm leading-6 text-[#3f493e]">
							The most compelling regenerative communities are built on shared purpose, not
							features. Make the human problem clear first.
						</p>
					</div>
				</aside>
			</div>
		</section>
	);
}
