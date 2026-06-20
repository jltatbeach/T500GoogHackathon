export interface WizardStep {
	key: string;
	label: string;
}

/**
 * Horizontal progress stepper for the top-level wizard.
 * Completed/current steps are navigable; upcoming steps are disabled.
 */
export function WizardStepper({
	steps,
	current,
	onSelect,
}: {
	steps: readonly WizardStep[];
	current: number;
	onSelect: (index: number) => void;
}) {
	return (
		<ol aria-label="Progress" className="flex flex-wrap items-center gap-x-2 gap-y-1">
			{steps.map((step, index) => {
				const status = index < current ? "done" : index === current ? "current" : "upcoming";
				return (
					<li key={step.key} className="flex items-center">
						<button
							type="button"
							onClick={() => onSelect(index)}
							disabled={index > current}
							aria-current={status === "current" ? "step" : undefined}
							className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
								status === "current"
									? "bg-refi-600 font-medium text-white"
									: status === "done"
										? "text-refi-700 hover:bg-refi-50"
										: "cursor-not-allowed text-gray-400"
							}`}
						>
							<span
								aria-hidden="true"
								className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
									status === "upcoming" ? "bg-gray-200 text-gray-500" : "bg-refi-100 text-refi-700"
								}`}
							>
								{status === "done" ? "✓" : index + 1}
							</span>
							{step.label}
						</button>
						{index < steps.length - 1 && (
							<span aria-hidden="true" className="mx-1 text-gray-300">
								→
							</span>
						)}
					</li>
				);
			})}
		</ol>
	);
}
