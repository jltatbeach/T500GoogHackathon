import { useState } from "react";

type PreviewTab = "home" | "contribute" | "rewards" | "community";

const TABS: { key: PreviewTab; label: string }[] = [
	{ key: "home", label: "Home" },
	{ key: "contribute", label: "Contribute" },
	{ key: "rewards", label: "Rewards" },
	{ key: "community", label: "Community" },
];

/** Generated Clean Health app preview with a simulated contribution loop. */
export function CleanHealthPreview() {
	const [tab, setTab] = useState<PreviewTab>("home");
	const [contribution, setContribution] = useState("");
	const [submitted, setSubmitted] = useState(false);

	function submitContribution(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!contribution.trim()) return;
		setSubmitted(true);
	}

	const impactPoints = submitted ? 1265 : 1240;

	return (
		<section aria-labelledby="preview-heading" className="space-y-6">
			<div>
				<h2 id="preview-heading" className="text-2xl font-semibold text-refi-900">
					Preview: Clean Health
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-gray-600">
					A community-powered app where healthy contributions earn impact points. The contribution
					flow below is a simulated community member view.
				</p>
			</div>

			<div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
				<div className="rounded-[2rem] border border-refi-100 bg-refi-900 p-3 shadow-xl">
					<div className="rounded-[1.5rem] bg-white p-4">
						<header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-600">
									Generated app
								</p>
								<h3 className="text-xl font-bold text-refi-900">Clean Health</h3>
							</div>
							<p className="rounded-full bg-refi-50 px-3 py-1 text-sm font-semibold text-refi-700">
								Impact: {impactPoints.toLocaleString()}
							</p>
						</header>

						<div
							className="mt-4 flex flex-wrap gap-2"
							role="tablist"
							aria-label="Clean Health tabs"
						>
							{TABS.map((item) => (
								<button
									key={item.key}
									type="button"
									role="tab"
									aria-selected={tab === item.key}
									onClick={() => setTab(item.key)}
									className={`min-h-11 rounded-full px-3 py-2 text-sm font-medium ${
										tab === item.key
											? "bg-refi-600 text-white"
											: "bg-gray-100 text-gray-700 hover:bg-refi-50"
									}`}
								>
									{item.label}
								</button>
							))}
						</div>

						<div className="mt-5 min-h-[20rem] rounded-2xl bg-gray-50 p-4">
							{tab === "home" && <HomeTab onContribute={() => setTab("contribute")} />}
							{tab === "contribute" && (
								<ContributeTab
									contribution={contribution}
									onContributionChange={setContribution}
									onSubmit={submitContribution}
									submitted={submitted}
								/>
							)}
							{tab === "rewards" && <RewardsTab submitted={submitted} />}
							{tab === "community" && <CommunityTab submitted={submitted} />}
						</div>
					</div>
				</div>

				<aside className="space-y-4">
					<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
						<h3 className="font-semibold text-refi-900">Demo cue</h3>
						<p className="mt-2 text-sm text-gray-600">
							Open Contribute, submit a clean-eating review, then show impact points and community
							metrics update.
						</p>
						<button
							type="button"
							onClick={() => setTab("contribute")}
							className="mt-3 min-h-11 rounded-md bg-refi-600 px-4 py-2 text-sm font-medium text-white hover:bg-refi-700"
						>
							Open Contribute Tab
						</button>
					</div>
					<div className="rounded-xl border border-earth-300 bg-earth-100 p-4 shadow-sm">
						<h3 className="font-semibold text-earth-600">Future verification</h3>
						<p className="mt-2 text-sm text-gray-700">
							Subtle future note: proof-based verification can back impact points later. No live
							token claim in this demo.
						</p>
					</div>
				</aside>
			</div>
		</section>
	);
}

function HomeTab({ onContribute }: { onContribute: () => void }) {
	return (
		<div className="space-y-4">
			<div className="rounded-xl bg-white p-4 shadow-sm">
				<p className="text-xs font-semibold uppercase tracking-wide text-refi-600">Today</p>
				<h4 className="mt-1 font-semibold text-refi-900">Share one clean-eating swap</h4>
				<p className="mt-2 text-sm text-gray-600">
					Help neighbors discover practical habits and earn impact points for useful reviews.
				</p>
			</div>
			<div className="grid gap-3 sm:grid-cols-3">
				{[
					["42", "member contributions"],
					["1,240", "impact points"],
					["18", "healthy actions logged"],
				].map(([value, label]) => (
					<div key={label} className="rounded-xl bg-white p-4 text-center shadow-sm">
						<p className="text-2xl font-bold text-refi-700">{value}</p>
						<p className="mt-1 text-xs text-gray-500">{label}</p>
					</div>
				))}
			</div>
			<button
				type="button"
				onClick={onContribute}
				className="min-h-11 rounded-md bg-refi-600 px-4 py-2 text-sm font-medium text-white hover:bg-refi-700"
			>
				Submit a contribution
			</button>
		</div>
	);
}

function ContributeTab({
	contribution,
	onContributionChange,
	onSubmit,
	submitted,
}: {
	contribution: string;
	onContributionChange: (value: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	submitted: boolean;
}) {
	return (
		<div className="space-y-4">
			<p className="rounded-full bg-refi-50 px-3 py-2 text-sm font-medium text-refi-700">
				Simulated community member view
			</p>
			<form onSubmit={onSubmit} className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
				<div>
					<label htmlFor="contributionType" className="block text-sm font-medium text-gray-800">
						Contribution type
					</label>
					<select
						id="contributionType"
						className="mt-1 min-h-11 w-full rounded-md border border-gray-300 p-2 text-sm"
						defaultValue="clean-eating-review"
					>
						<option value="clean-eating-review">Clean eating review</option>
					</select>
				</div>
				<div>
					<label htmlFor="contribution" className="block text-sm font-medium text-gray-800">
						What did you learn or share?
					</label>
					<textarea
						id="contribution"
						rows={4}
						value={contribution}
						onChange={(event) => onContributionChange(event.target.value)}
						placeholder="I swapped sugary snacks for fruit bowls and shared the prep steps."
						className="mt-1 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-refi-500 focus:outline-none focus:ring-1 focus:ring-refi-500"
					/>
				</div>
				<div className="rounded-lg bg-refi-50 p-3 text-sm text-refi-900">
					<span className="font-semibold">Reward preview:</span> +25 impact points | pending
				</div>
				<button
					type="submit"
					disabled={!contribution.trim()}
					className="min-h-11 rounded-md bg-refi-600 px-4 py-2 text-sm font-medium text-white hover:bg-refi-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Submit Contribution
				</button>
			</form>
			{submitted && (
				<div className="rounded-xl border border-refi-100 bg-refi-50 p-4 text-sm text-refi-900">
					<p className="font-semibold">Contribution received.</p>
					<p className="mt-1">+25 impact points credited to the demo ledger.</p>
				</div>
			)}
		</div>
	);
}

function RewardsTab({ submitted }: { submitted: boolean }) {
	return (
		<div className="rounded-xl bg-white p-4 shadow-sm">
			<h4 className="font-semibold text-refi-900">My impact points</h4>
			<p className="mt-2 text-3xl font-bold text-refi-700">{submitted ? "+25" : "0"}</p>
			<p className="mt-2 text-sm text-gray-600">
				{submitted
					? "Your simulated contribution was rewarded in the demo ledger."
					: "Submit a contribution to see impact points appear here."}
			</p>
		</div>
	);
}

function CommunityTab({ submitted }: { submitted: boolean }) {
	return (
		<div className="grid gap-3 sm:grid-cols-3">
			{[
				[submitted ? "43" : "42", "total contributions"],
				[submitted ? "1,265" : "1,240", "impact points issued"],
				[submitted ? "19" : "18", "healthy actions logged"],
			].map(([value, label]) => (
				<div key={label} className="rounded-xl bg-white p-4 text-center shadow-sm">
					<p className="text-2xl font-bold text-refi-700">{value}</p>
					<p className="mt-1 text-xs text-gray-500">{label}</p>
				</div>
			))}
		</div>
	);
}
