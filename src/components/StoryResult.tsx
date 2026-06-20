import type { VoiceStoryOutput } from "../agents/schema";

/** Live preview of the generated Voice Profile + Story Narrative + Story Engine. */
export function StoryResult({ result }: { result: VoiceStoryOutput }) {
	const { voiceProfile, storyNarrative, storyEngine, targetCommunity } = result;

	return (
		<article aria-label="Generated voice and story" className="space-y-5">
			<div>
				<h3 className="text-xl font-semibold text-refi-900">Voice &amp; Story Results</h3>
				<p className="mt-1 text-sm text-gray-600">
					Your app now has a voice, story, and contribution narrative.
				</p>
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<div className="rounded-xl border border-refi-100 bg-refi-50 p-4 shadow-sm">
					<h4 className="font-semibold text-refi-900">Voice Profile</h4>
					<dl className="mt-3 space-y-2 text-sm">
						<div>
							<dt className="font-medium text-gray-700">Tone</dt>
							<dd>{voiceProfile.tone}</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Personality</dt>
							<dd>{voiceProfile.personality}</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Core values</dt>
							<dd>{voiceProfile.coreValues.join(", ")}</dd>
						</div>
					</dl>
				</div>

				<div className="rounded-xl border border-earth-300 bg-earth-100 p-4 shadow-sm">
					<h4 className="font-semibold text-earth-600">Story Narrative</h4>
					<dl className="mt-3 space-y-2 text-sm">
						<div>
							<dt className="font-medium text-gray-700">Mission</dt>
							<dd>{storyNarrative.mission}</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Problem</dt>
							<dd>{storyNarrative.problemStatement}</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Solution vision</dt>
							<dd>{storyNarrative.solutionVision}</dd>
						</div>
						<div>
							<dt className="font-medium text-gray-700">Call to action</dt>
							<dd>{storyNarrative.callToAction}</dd>
						</div>
					</dl>
				</div>
			</div>

			<section
				aria-label="Story engine"
				className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
			>
				<h4 className="font-semibold text-refi-900">Story Engine</h4>

				<div className="rounded-lg border border-gray-200 p-4">
					<h5 className="text-sm font-semibold text-gray-800">ABT pitch</h5>
					<p className="mt-1 text-sm italic">{storyEngine.abt.combined}</p>
				</div>

				<div className="rounded-lg border border-gray-200 p-4">
					<h5 className="text-sm font-semibold text-gray-800">Story Spine</h5>
					<p className="mt-1 text-sm">{storyEngine.storySpine.narrative}</p>
					<p className="mt-2 text-xs text-gray-500">
						<span className="font-medium">But one day:</span> {storyEngine.storySpine.butOneDay}
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="rounded-lg border border-gray-200 p-4">
						<h5 className="text-sm font-semibold text-gray-800">Story Statement</h5>
						<p className="mt-1 text-sm italic">“{storyEngine.storyStatement}”</p>
					</div>
					<div className="rounded-lg border border-gray-200 p-4">
						<h5 className="text-sm font-semibold text-gray-800">Proverb</h5>
						<p className="mt-1 text-sm italic">“{storyEngine.proverb}”</p>
					</div>
				</div>

				<div className="rounded-lg border border-gray-200 p-4">
					<h5 className="text-sm font-semibold text-gray-800">Metaphor</h5>
					<p className="mt-1 text-sm italic">{storyEngine.metaphor.statement}</p>
				</div>
			</section>

			<section className="rounded-xl border border-refi-100 bg-refi-50 p-4 shadow-sm">
				<h4 className="font-semibold text-refi-900">Handoff to app generation</h4>
				<div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
					<p>
						<span className="block font-medium text-gray-700">Design tone</span>
						{voiceProfile.tone}
					</p>
					<p>
						<span className="block font-medium text-gray-700">Contribution ask</span>
						{storyNarrative.callToAction}
					</p>
					<p>
						<span className="block font-medium text-gray-700">Impact-point promise</span>
						Useful community contributions earn visible impact points.
					</p>
				</div>
			</section>

			<p className="text-sm text-gray-600">
				<span className="font-medium">Target community:</span> {targetCommunity}
			</p>
		</article>
	);
}
