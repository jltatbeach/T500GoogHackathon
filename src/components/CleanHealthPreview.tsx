import { useState } from "react";

type PreviewTab = "home" | "contribute" | "rewards" | "community";

const TABS: { key: PreviewTab; label: string; icon: string }[] = [
	{ key: "home", label: "Home", icon: "⌂" },
	{ key: "contribute", label: "Contribute", icon: "✍" },
	{ key: "rewards", label: "Rewards", icon: "◇" },
	{ key: "community", label: "Community", icon: "♧" },
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
		setTab("rewards");
	}

	const impactPoints = submitted ? 1265 : 1240;

	return (
		<section aria-labelledby="preview-heading" className="space-y-10">
			<div className="text-center">
				<span className="inline-flex rounded-full bg-[#9ef7a6] px-4 py-2 text-sm font-semibold text-refi-900">
					✣ Generation Complete
				</span>
				<h2
					id="preview-heading"
					className="mx-auto mt-6 max-w-4xl font-display text-5xl font-black leading-tight text-[#1b1c19] lg:text-6xl"
				>
					Your community is ready to bloom.
				</h2>
				<p className="mx-auto mt-5 max-w-3xl text-xl leading-9 text-[#3f493e]">
					The Clean Health app has been generated using your regenerative brand values and community
					contribution logic.
				</p>
			</div>

			<div className="grid gap-10 xl:grid-cols-[minmax(20rem,28rem)_minmax(0,1fr)] xl:items-start">
				<div className="mx-auto w-full max-w-[26rem] rounded-[3rem] border-[14px] border-[#171a17] bg-white shadow-[0_32px_90px_-48px_rgba(0,0,0,0.7)]">
					<div className="mx-auto h-8 w-36 rounded-b-3xl bg-[#171a17]" />
					<div className="p-6">
						<header className="flex items-start justify-between gap-3">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-700">
									Generated PWA
								</p>
								<h3 className="mt-8 font-display text-3xl font-bold text-[#1b1c19]">
									Clean Health
								</h3>
								<p className="text-sm text-[#3f493e]">
									Impact: {impactPoints.toLocaleString()} pts
								</p>
							</div>
							<span className="h-10 w-10 rounded-full bg-[#ffdbd1]" aria-hidden="true" />
						</header>

						<div className="mt-8 min-h-[21rem] rounded-3xl bg-[#fbf9f4] p-4">
							{tab === "home" && (
								<HomeTab onContribute={() => setTab("contribute")} submitted={submitted} />
							)}
							{tab === "contribute" && (
								<ContributeTab
									contribution={contribution}
									onContributionChange={setContribution}
									onSubmit={submitContribution}
								/>
							)}
							{tab === "rewards" && <RewardsTab submitted={submitted} />}
							{tab === "community" && <CommunityTab submitted={submitted} />}
						</div>

						<nav
							className="mt-5 grid grid-cols-4 gap-2 border-t border-[#e4e2dd] pt-4"
							aria-label="Clean Health tabs"
						>
							{TABS.map((item) => (
								<button
									key={item.key}
									type="button"
									role="tab"
									aria-selected={tab === item.key}
									onClick={() => setTab(item.key)}
									className={`min-h-11 rounded-2xl px-2 py-2 text-xs font-semibold transition ${
										tab === item.key
											? "bg-refi-50 text-refi-700"
											: "text-[#707a6e] hover:bg-[#f0eee9]"
									}`}
								>
									<span className="block text-lg">{item.icon}</span>
									{item.label}
								</button>
							))}
						</nav>
					</div>
				</div>

				<div className="space-y-6">
					<article className="rounded-[2rem] border border-[#bfcabb] bg-white p-8 shadow-[0_24px_80px_-52px_rgba(47,53,47,0.35)]">
						<h3 className="font-display text-3xl font-bold text-[#1b1c19]">App Metadata</h3>
						<div className="mt-7 grid gap-6 sm:grid-cols-2">
							<Metadata label="Project name" value="Clean Health" />
							<Metadata label="Network" value="Demo ledger" />
							<Metadata label="Reward unit" value="Impact points" />
							<Metadata label="Logic engine" value="Contribution scoring" />
						</div>
					</article>

					<article className="rounded-[2rem] border border-[#e4e2dd] bg-white p-8 shadow-sm">
						<div className="flex items-center gap-4">
							<span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ffdbd1] text-2xl text-[#ad3309]">
								↔
							</span>
							<h3 className="font-display text-2xl font-bold text-[#1b1c19]">
								Contribution → Impact Logic
							</h3>
						</div>
						<div className="mt-8 grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
							<div className="rounded-2xl border border-[#e4e2dd] p-5">
								<p className="text-sm text-[#3f493e]">Contribution</p>
								<p className="mt-2 font-display text-2xl font-bold">Clean-eating review</p>
							</div>
							<span className="text-3xl text-refi-700">→</span>
							<div className="rounded-2xl border border-refi-100 bg-refi-50 p-5">
								<p className="text-sm text-refi-700">Reward</p>
								<p className="mt-2 font-display text-2xl font-bold text-refi-700">
									25 impact points
								</p>
							</div>
						</div>
						<p className="mt-6 text-sm italic text-[#3f493e]">
							Impact points are credited in a local demo ledger. Future proof-based verification can
							be added without presenting live tokens or claimable assets.
						</p>
					</article>

					<button
						type="button"
						className="min-h-14 w-full rounded-full bg-refi-600 px-6 py-4 font-display text-2xl font-bold text-white shadow-lg shadow-refi-900/10 hover:bg-refi-700"
					>
						⚑ Deploy App
					</button>
					<div className="flex flex-wrap justify-center gap-4">
						<button
							type="button"
							className="min-h-11 rounded-full border-2 border-[#bfcabb] px-8 py-3 font-semibold"
						>
							↻ Iterate
						</button>
						<button
							type="button"
							className="min-h-11 rounded-full border-2 border-[#bfcabb] px-8 py-3 font-semibold"
						>
							⌯ Share link
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

function Metadata({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#707a6e]">{label}</p>
			<p className="mt-2 font-display text-xl font-bold text-[#1b1c19]">{value}</p>
		</div>
	);
}

function HomeTab({ onContribute, submitted }: { onContribute: () => void; submitted: boolean }) {
	return (
		<div className="space-y-4">
			<div className="rounded-2xl bg-white p-4 shadow-sm">
				<div className="h-28 rounded-2xl bg-[linear-gradient(135deg,#9ef7a6,#406455)]" />
				<h4 className="mt-4 font-display text-xl font-bold text-[#1b1c19]">
					Saturday clean-health circle
				</h4>
				<p className="mt-2 text-sm leading-6 text-[#3f493e]">
					Share a practical clean-eating habit and help neighbors learn what works.
				</p>
			</div>
			<div className="rounded-2xl bg-refi-700 p-4 text-white">
				<p className="font-semibold">Reward available</p>
				<p className="mt-1 text-sm">
					Earn {submitted ? "another" : "25"} impact points for a useful review.
				</p>
			</div>
			<button
				type="button"
				onClick={onContribute}
				className="min-h-11 w-full rounded-full bg-refi-600 px-4 py-2 text-sm font-bold text-white"
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
}: {
	contribution: string;
	onContributionChange: (value: string) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<p className="rounded-full bg-refi-50 px-3 py-2 text-sm font-bold text-refi-700">
				Simulated community member view
			</p>
			<div>
				<label htmlFor="contributionType" className="block text-sm font-semibold text-[#1b1c19]">
					Contribution type
				</label>
				<select
					id="contributionType"
					className="mt-2 min-h-11 w-full rounded-2xl border border-[#bfcabb] bg-white p-3 text-sm"
					defaultValue="clean-eating-review"
				>
					<option value="clean-eating-review">Clean eating review</option>
				</select>
			</div>
			<div>
				<label htmlFor="contribution" className="block text-sm font-semibold text-[#1b1c19]">
					What did you learn or share?
				</label>
				<textarea
					id="contribution"
					rows={5}
					value={contribution}
					onChange={(event) => onContributionChange(event.target.value)}
					placeholder="I swapped sugary snacks for fruit bowls and shared prep steps."
					className="mt-2 w-full rounded-2xl border border-[#bfcabb] bg-white p-3 text-sm focus:border-refi-600 focus:outline-none"
				/>
			</div>
			<div className="rounded-2xl bg-refi-50 p-3 text-sm text-refi-900">
				<span className="font-semibold">Reward preview:</span> +25 impact points | pending
			</div>
			<button
				type="submit"
				disabled={!contribution.trim()}
				className="min-h-11 w-full rounded-full bg-refi-600 px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
			>
				Submit Contribution
			</button>
		</form>
	);
}

function RewardsTab({ submitted }: { submitted: boolean }) {
	return (
		<div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
			<h4 className="font-display text-2xl font-bold text-[#1b1c19]">My impact points</h4>
			<p className="font-display text-5xl font-black text-refi-700">{submitted ? "+25" : "0"}</p>
			<p className="text-sm leading-6 text-[#3f493e]">
				{submitted
					? "Contribution received. +25 impact points credited to the demo ledger."
					: "Submit a contribution to see impact points appear here."}
			</p>
		</div>
	);
}

function CommunityTab({ submitted }: { submitted: boolean }) {
	return (
		<div className="grid gap-3">
			{[
				[submitted ? "43" : "42", "total contributions"],
				[submitted ? "1,265" : "1,240", "impact points issued"],
				[submitted ? "19" : "18", "healthy actions logged"],
			].map(([value, label]) => (
				<div key={label} className="rounded-2xl bg-white p-4 text-center shadow-sm">
					<p className="font-display text-3xl font-black text-refi-700">{value}</p>
					<p className="mt-1 text-xs text-[#707a6e]">{label}</p>
				</div>
			))}
		</div>
	);
}
