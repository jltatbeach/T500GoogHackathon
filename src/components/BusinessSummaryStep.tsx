import type { VoiceStoryOutput } from "../agents/schema";
import type { IdeaBrief } from "./IdeationForm";

function textOrFallback(value: string | undefined, fallback: string): string {
	return value?.trim() || fallback;
}

/** Story, research, and idea synthesis before the generation step. */
export function BusinessSummaryStep({
	brief,
	story,
}: {
	brief: IdeaBrief;
	story: VoiceStoryOutput | null;
}) {
	const mission = textOrFallback(
		story?.storyNarrative.mission,
		"Help neighbors turn clean-health habits into shared community momentum.",
	);
	const problem = textOrFallback(
		story?.storyNarrative.problemStatement || brief.problem,
		"Healthy habits fade when people lack trusted local examples and visible community support.",
	);
	const solution = textOrFallback(
		story?.storyNarrative.solutionVision || brief.solution,
		"A Clean Health community app that turns shared reviews and habit swaps into impact points.",
	);
	const callToAction = textOrFallback(
		story?.storyNarrative.callToAction,
		"Share one clean-eating review and help the community learn together.",
	);
	const tone = textOrFallback(story?.voiceProfile.tone, "Nurturing, practical, and transparent");

	return (
		<section aria-labelledby="summary-heading" className="space-y-8">
			<div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-700">
						Step 4 of 6
					</p>
					<h2 id="summary-heading" className="mt-2 font-display text-4xl font-black text-[#1b1c19]">
						Business Summary
					</h2>
					<p className="mt-3 max-w-2xl text-lg leading-8 text-[#3f493e]">
						A concise blueprint for Clean Health before the app-generation agents build the preview.
					</p>
				</div>
				<div className="rounded-2xl border border-[#bfcabb] bg-white p-5 shadow-[0_20px_60px_-40px_rgba(47,53,47,0.45)]">
					<div className="flex items-center gap-4">
						<span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9ef7a6] text-2xl text-refi-700">
							◉
						</span>
						<div>
							<p className="text-xs uppercase tracking-[0.16em] text-[#707a6e]">App name</p>
							<p className="font-display text-xl font-bold">Clean Health</p>
						</div>
						<div className="border-l border-[#e4e2dd] pl-4">
							<p className="text-xs uppercase tracking-[0.16em] text-[#707a6e]">Demo fit</p>
							<p className="font-display text-xl font-bold text-refi-700">94%</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(17rem,1fr)]">
				<article className="rounded-3xl border border-[#d8c7a3]/70 bg-white p-7 shadow-[0_20px_60px_-44px_rgba(47,53,47,0.35)]">
					<p className="text-sm font-semibold text-refi-700">◎ Mission Statement</p>
					<blockquote className="mt-5 font-display text-2xl font-bold italic leading-snug text-[#1b1c19] lg:text-3xl">
						“{mission}”
					</blockquote>
					<div className="mt-6 flex flex-wrap gap-2">
						{["Clean Health", "Impact Points", "Community Learning"].map((tag) => (
							<span
								key={tag}
								className="rounded-full bg-[#e4e2dd] px-3 py-1 text-sm text-[#3f493e]"
							>
								{tag}
							</span>
						))}
					</div>
				</article>

				<aside className="rounded-3xl border border-[#d8c7a3]/70 bg-white p-7 shadow-[0_20px_60px_-44px_rgba(47,53,47,0.35)]">
					<p className="text-sm font-semibold text-[#ad3309]">Target Community</p>
					<h3 className="mt-4 font-display text-2xl font-bold">
						{textOrFallback(story?.targetCommunity, "Health-minded neighbors")}
					</h3>
					<p className="mt-3 text-sm leading-6 text-[#3f493e]">
						People who want simple, credible ways to share healthy habits, discover local resources,
						and see visible impact from community participation.
					</p>
					<div className="mt-5 h-28 rounded-2xl bg-[radial-gradient(circle_at_20%_20%,#9ef7a6,transparent_30%),linear-gradient(135deg,#406455,#0b6b2c)]" />
				</aside>
			</div>

			<div className="grid gap-5 lg:grid-cols-2">
				<article className="rounded-3xl border border-[#d8c7a3]/70 bg-white p-7">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ad3309]">
						The problem
					</p>
					<p className="mt-4 text-lg leading-8 text-[#1b1c19]">{problem}</p>
				</article>
				<article className="rounded-3xl border border-[#d8c7a3]/70 bg-white p-7">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-700">
						Solution vision
					</p>
					<p className="mt-4 text-lg leading-8 text-[#1b1c19]">{solution}</p>
				</article>
			</div>

			<div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
				<article className="rounded-3xl border border-[#d8c7a3]/70 bg-[#f0eee9] p-7">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<h3 className="font-display text-2xl font-bold">Market Verdict</h3>
						<span className="rounded-full bg-refi-600 px-3 py-1 text-sm font-semibold text-white">
							High Demo Potential
						</span>
					</div>
					<div className="mt-6 space-y-4">
						{[
							["Product-story fit", "88%"],
							["Contribution-loop clarity", "92%"],
						].map(([label, value]) => (
							<div key={label}>
								<div className="flex justify-between text-sm">
									<span>{label}</span>
									<span>{value}</span>
								</div>
								<div className="mt-2 h-2 rounded-full bg-[#dbdad5]">
									<div className="h-2 rounded-full bg-refi-600" style={{ width: value }} />
								</div>
							</div>
						))}
					</div>
					<p className="mt-6 text-sm leading-6 text-[#3f493e]">
						The story, validation, and contribution mechanics are coherent enough to move into the
						generated preview without introducing token or claimable-asset language.
					</p>
				</article>

				<article className="rounded-3xl bg-refi-700 p-7 text-white">
					<h3 className="font-display text-2xl font-bold">Brand Story Highlights</h3>
					<ul className="mt-6 space-y-4 text-sm leading-6">
						<li>✓ Tone: {tone}</li>
						<li>✓ Ask: {callToAction}</li>
						<li>✓ Reward: impact points only</li>
					</ul>
					<div className="mt-6 rounded-2xl border border-white/25 bg-white/10 p-5 text-center text-sm">
						Clean Health identity preview
					</div>
				</article>
			</div>

			<div className="rounded-[2rem] border border-[#bfcabb] bg-[#e4e2dd] p-8 text-center shadow-[0_24px_80px_-54px_rgba(47,53,47,0.5)]">
				<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#9ef7a6] text-3xl text-refi-700">
					ϟ
				</div>
				<h3 className="mt-6 font-display text-3xl font-bold">Ready to generate Clean Health?</h3>
				<p className="mx-auto mt-3 max-w-2xl text-[#3f493e]">
					The product brief is synthesized. The next step can assemble the preview shell,
					contribution loop, and impact-point rules.
				</p>
			</div>
		</section>
	);
}
