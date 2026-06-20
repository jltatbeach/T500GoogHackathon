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
	return (
		<section aria-labelledby="ideation-heading" className="max-w-2xl">
			<h2 id="ideation-heading" className="text-2xl font-semibold text-refi-900">
				Ideation
			</h2>
			<p className="mt-1 text-sm text-gray-600">
				Let's refine your idea before we build. Answer these three questions; you can revise them
				before moving on.
			</p>

			<div className="mt-4 space-y-4">
				{PROMPTS.map((prompt) => (
					<div key={prompt.key}>
						<label htmlFor={prompt.key} className="block text-sm font-medium text-gray-800">
							{prompt.label}
						</label>
						<textarea
							id={prompt.key}
							rows={3}
							value={value[prompt.key]}
							placeholder={prompt.placeholder}
							onChange={(e) => onChange({ ...value, [prompt.key]: e.target.value })}
							className="mt-1 w-full rounded-md border border-gray-300 p-3 focus:border-refi-500 focus:outline-none focus:ring-1 focus:ring-refi-500"
						/>
					</div>
				))}
			</div>
		</section>
	);
}
