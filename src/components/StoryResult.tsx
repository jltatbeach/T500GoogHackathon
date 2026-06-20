import type { VoiceStoryOutput } from "../agents/schema";

/** Live preview of the generated Voice Profile + Story Narrative. */
export function StoryResult({ result }: { result: VoiceStoryOutput }) {
	const { voiceProfile, storyNarrative, targetCommunity } = result;

	return (
		<article aria-label="Generated voice and story" className="space-y-4">
			<div className="rounded-lg border border-refi-100 bg-refi-50 p-4">
				<h3 className="font-semibold text-refi-900">Voice Profile</h3>
				<dl className="mt-2 space-y-1 text-sm">
					<div className="flex gap-2">
						<dt className="font-medium text-gray-700">Tone:</dt>
						<dd>{voiceProfile.tone}</dd>
					</div>
					<div className="flex gap-2">
						<dt className="font-medium text-gray-700">Personality:</dt>
						<dd>{voiceProfile.personality}</dd>
					</div>
					<div className="flex flex-wrap gap-2">
						<dt className="font-medium text-gray-700">Core values:</dt>
						<dd>{voiceProfile.coreValues.join(", ")}</dd>
					</div>
				</dl>
			</div>

			<div className="rounded-lg border border-earth-300 bg-earth-100 p-4">
				<h3 className="font-semibold text-earth-600">Story Narrative</h3>
				<dl className="mt-2 space-y-2 text-sm">
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

			<p className="text-sm text-gray-600">
				<span className="font-medium">Target community:</span> {targetCommunity}
			</p>
		</article>
	);
}
