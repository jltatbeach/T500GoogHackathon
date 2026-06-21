import type { VoiceStoryOutput } from "../agents/schema";

/** Live preview of the generated Voice Profile + Story Narrative + Story Engine. */
export function StoryResult({ result }: { result: VoiceStoryOutput }) {
	const { voiceProfile, storyNarrative, storyEngine, targetCommunity } = result;

	return (
		<article aria-label="Generated voice and story" className="space-y-6">
			<div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
				<section className="rounded-[2rem] border border-[#d8c7a3]/70 bg-white p-7 shadow-[0_24px_80px_-52px_rgba(47,53,47,0.35)]">
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-refi-700">
						The ABT Pitch
					</p>
					<p className="mt-5 font-display text-2xl font-bold italic leading-relaxed text-[#1b1c19]">
						“{storyEngine.abt.combined}”
					</p>
					<div className="mt-8 border-t border-[#e4e2dd] pt-5">
						<p className="text-sm font-semibold text-refi-700">⌁ Refine Pitch</p>
					</div>
				</section>

				<aside className="rounded-[2rem] border border-[#bfcabb] bg-[#f5f3ee] p-7">
					<h3 className="font-display text-2xl font-bold text-[#1b1c19]">Voice Profile</h3>
					<dl className="mt-5 space-y-3 text-sm">
						<div className="rounded-2xl border border-[#e4e2dd] bg-white px-4 py-3">
							<dt className="text-xs uppercase tracking-[0.16em] text-[#707a6e]">Tone</dt>
							<dd className="mt-1 font-semibold text-[#1b1c19]">{voiceProfile.tone}</dd>
						</div>
						<div className="rounded-2xl border border-[#e4e2dd] bg-white px-4 py-3">
							<dt className="text-xs uppercase tracking-[0.16em] text-[#707a6e]">Personality</dt>
							<dd className="mt-1 font-semibold text-[#1b1c19]">{voiceProfile.personality}</dd>
						</div>
						<div className="rounded-2xl border border-[#e4e2dd] bg-white px-4 py-3">
							<dt className="text-xs uppercase tracking-[0.16em] text-[#707a6e]">Values</dt>
							<dd className="mt-1 font-semibold text-[#1b1c19]">
								{voiceProfile.coreValues.join(", ")}
							</dd>
						</div>
					</dl>
				</aside>
			</div>

			<section className="rounded-[2rem] border border-[#d8c7a3]/70 bg-white p-7 shadow-sm">
				<p className="text-sm font-bold uppercase tracking-[0.18em] text-refi-700">Story Spine</p>
				<p className="mt-5 text-lg leading-9 text-[#1b1c19]">{storyEngine.storySpine.narrative}</p>
				<p className="mt-3 text-sm text-[#707a6e]">
					<span className="font-semibold text-[#3f493e]">Until one day:</span>{" "}
					{storyEngine.storySpine.butOneDay}
				</p>
			</section>

			<div className="grid gap-5 lg:grid-cols-2">
				<div className="rounded-[2rem] bg-refi-700 p-8 text-white shadow-[0_24px_80px_-52px_rgba(47,53,47,0.42)]">
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-100">
						The narrative hook
					</p>
					<p className="mt-5 font-display text-2xl font-bold leading-snug">
						“{storyEngine.storyStatement}”
					</p>
				</div>
				<div className="rounded-[2rem] border border-[#ffb5a0] bg-[#ffdbd1] p-8 text-[#3b0a00]">
					<p className="text-xs font-semibold uppercase tracking-[0.2em]">Core proverb</p>
					<p className="mt-5 font-display text-2xl font-bold italic leading-snug">
						“{storyEngine.proverb}”
					</p>
				</div>
			</div>

			<section className="overflow-hidden rounded-[2rem] border border-[#d8c7a3]/70 bg-white shadow-sm">
				<div className="grid lg:grid-cols-[18rem_minmax(0,1fr)]">
					<div className="flex flex-col items-center justify-center bg-[#e4e2dd] p-8 text-center">
						<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#9ef7a6] text-4xl text-refi-700">
							♧
						</div>
						<h3 className="mt-5 font-display text-2xl font-bold text-[#1b1c19]">
							Central Metaphor
						</h3>
						<p className="mt-2 text-sm text-[#3f493e]">{storyEngine.metaphor.statement}</p>
					</div>
					<div className="grid gap-5 p-8 md:grid-cols-2">
						<div>
							<p className="text-sm font-semibold text-refi-700">Relevance</p>
							<p className="mt-2 text-sm leading-6 text-[#3f493e]">
								{storyEngine.metaphor.relevance}
							</p>
						</div>
						<div>
							<p className="text-sm font-semibold text-[#ad3309]">Implication</p>
							<p className="mt-2 text-sm leading-6 text-[#3f493e]">
								{storyEngine.metaphor.implication}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="rounded-[2rem] border border-refi-100 bg-refi-50 p-6 shadow-sm">
				<h3 className="font-display text-2xl font-bold text-refi-900">
					Handoff to Business Summary
				</h3>
				<div className="mt-5 grid gap-4 text-sm md:grid-cols-3">
					<p>
						<span className="block font-semibold text-[#3f493e]">Mission</span>
						{storyNarrative.mission}
					</p>
					<p>
						<span className="block font-semibold text-[#3f493e]">Contribution ask</span>
						{storyNarrative.callToAction}
					</p>
					<p>
						<span className="block font-semibold text-[#3f493e]">Impact-point promise</span>
						Useful contributions earn visible impact points.
					</p>
				</div>
				<p className="mt-5 text-sm text-[#3f493e]">
					<span className="font-semibold">Target community:</span> {targetCommunity}
				</p>
			</section>
		</article>
	);
}
