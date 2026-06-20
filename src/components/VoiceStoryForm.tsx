import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { VoiceStoryOutput } from "../agents/schema";
import { generateVoiceStory } from "../lib/api";
import type { IdeaBrief } from "./IdeationForm";
import { StoryResult } from "./StoryResult";

/** Compose a seed description from the Ideation brief, if provided. */
function seedFromIdea(idea?: IdeaBrief): string {
	if (!idea || (!idea.problem && !idea.solution && !idea.success)) return "";
	return [
		idea.problem && `Problem: ${idea.problem.trim()}`,
		idea.solution && `Solution: ${idea.solution.trim()}`,
		idea.success && `Success: ${idea.success.trim()}`,
	]
		.filter(Boolean)
		.join("\n");
}

/**
 * Voice & Story creation — generates the brand voice and Story Engine.
 * When reached via the wizard, it is seeded by the Ideation brief.
 */
export function VoiceStoryForm({
	idea,
	onGenerated,
}: {
	idea?: IdeaBrief;
	onGenerated?: (result: VoiceStoryOutput) => void;
}) {
	const [userInput, setUserInput] = useState(() => seedFromIdea(idea));

	const mutation = useMutation<VoiceStoryOutput, Error, string>({
		mutationFn: generateVoiceStory,
		onSuccess: (result) => onGenerated?.(result),
	});

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (userInput.trim()) mutation.mutate(userInput.trim());
	}

	return (
		<section aria-labelledby="voice-story-heading" className="space-y-6">
			<div>
				<h2 id="voice-story-heading" className="text-2xl font-semibold text-refi-900">
					Voice &amp; Story
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-gray-600">
					This story will guide every generated screen and contribution ask. The prompt is seeded
					from Ideation and can later include emulated research findings.
				</p>
			</div>

			<form
				onSubmit={onSubmit}
				className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
			>
				<label htmlFor="userInput" className="block text-sm font-semibold text-gray-800">
					What community are you serving?
				</label>
				<textarea
					id="userInput"
					name="userInput"
					rows={6}
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					placeholder="e.g. A healthy-living community app that rewards members for sharing clean-eating habits"
					className="mt-2 w-full rounded-md border border-gray-300 p-3 focus:border-refi-500 focus:outline-none focus:ring-1 focus:ring-refi-500"
				/>
				<div className="mt-4 flex flex-wrap items-center gap-3">
					<button
						type="submit"
						disabled={mutation.isPending || !userInput.trim()}
						className="min-h-11 rounded-md bg-refi-600 px-4 py-2 font-medium text-white hover:bg-refi-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{mutation.isPending ? "Generating…" : "Generate Story"}
					</button>
					<p className="text-sm text-gray-500">
						Server-side LLM only; keys never reach the client.
					</p>
				</div>
			</form>

			{mutation.isError && (
				<p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
					{mutation.error.message}
				</p>
			)}

			{mutation.data && <StoryResult result={mutation.data} />}
		</section>
	);
}
