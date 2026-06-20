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

const PROMPTS: { key: keyof IdeaBrief; label: string; placeholder: string }[] = [
	{
		key: "problem",
		label: "What problem are you solving for your users or customers?",
		placeholder: "Who is struggling, and with what?",
	},
	{
		key: "solution",
		label: "How will your application solve that problem?",
		placeholder: "The core capability and how people engage with it.",
	},
	{
		key: "success",
		label: "What does success look like — for your users and your business?",
		placeholder: "The outcomes that tell you it's working.",
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
	const isComplete = isBriefComplete(value);

	return (
		<section aria-labelledby="ideation-heading" className="space-y-6">
			<div>
				<p className="text-sm font-semibold uppercase tracking-wide text-refi-600">
					Problem -&gt; Solution -&gt; Success
				</p>
				<h2 id="ideation-heading" className="mt-1 text-2xl font-semibold text-refi-900">
					Ideation
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-gray-600">
					Start with the user problem. Define the problem once; every agent uses the same brief as
					the story and app are generated.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
				<div className="space-y-4">
					{PROMPTS.map((prompt, index) => (
						<div
							key={prompt.key}
							className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
						>
							<label htmlFor={prompt.key} className="block text-sm font-semibold text-gray-800">
								{index + 1}. {prompt.label}
							</label>
							<textarea
								id={prompt.key}
								rows={3}
								value={value[prompt.key]}
								placeholder={prompt.placeholder}
								onChange={(e) => onChange({ ...value, [prompt.key]: e.target.value })}
								className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-refi-500 focus:outline-none focus:ring-1 focus:ring-refi-500"
							/>
						</div>
					))}
				</div>

				<aside className="h-fit rounded-xl border border-refi-100 bg-refi-50 p-5 shadow-sm">
					<h3 className="font-semibold text-refi-900">Idea brief preview</h3>
					<dl className="mt-4 space-y-3 text-sm">
						<div>
							<dt className="font-medium text-gray-700">Problem</dt>
							<dd className="mt-1 text-gray-600">
								{summarize(value.problem, "Who is struggling, and why now?")}
							</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Solution</dt>
							<dd className="mt-1 text-gray-600">
								{summarize(value.solution, "How the app helps people participate.")}
							</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Success</dt>
							<dd className="mt-1 text-gray-600">
								{summarize(value.success, "The user and community outcome.")}
							</dd>
						</div>
					</dl>
					<p
						className={`mt-4 rounded-full px-3 py-2 text-sm font-medium ${
							isComplete ? "bg-white text-refi-700" : "bg-earth-100 text-earth-600"
						}`}
					>
						{isComplete ? "Ready for emulated research" : "Complete all fields to unlock Research"}
					</p>
				</aside>
			</div>
		</section>
	);
}
