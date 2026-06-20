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
export function VoiceStoryForm({ idea }: { idea?: IdeaBrief }) {
	const [userInput, setUserInput] = useState(() => seedFromIdea(idea));

	const mutation = useMutation<VoiceStoryOutput, Error, string>({
		mutationFn: generateVoiceStory,
	});

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (userInput.trim()) mutation.mutate(userInput.trim());
	}

	return (
		<section aria-labelledby="voice-story-heading" className="max-w-2xl">
			<h2 id="voice-story-heading" className="text-2xl font-semibold text-refi-900">
				Voice &amp; Story
			</h2>
			<p className="mt-1 text-sm text-gray-600">
				Describe the community app you want to build. This first agent sets the voice for the entire
				generation workflow.
			</p>

			<form onSubmit={onSubmit} className="mt-4 space-y-3">
				<label htmlFor="userInput" className="block text-sm font-medium text-gray-800">
					What community are you serving?
				</label>
				<textarea
					id="userInput"
					name="userInput"
					rows={4}
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					placeholder="e.g. A healthy-living community app that rewards members for sharing clean-eating habits"
					className="w-full rounded-md border border-gray-300 p-3 focus:border-refi-500 focus:outline-none focus:ring-1 focus:ring-refi-500"
				/>
				<button
					type="submit"
					disabled={mutation.isPending || !userInput.trim()}
					className="rounded-md bg-refi-600 px-4 py-2 font-medium text-white hover:bg-refi-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{mutation.isPending ? "Generating…" : "Generate Story"}
				</button>
			</form>

			{mutation.isError && (
				<p role="alert" className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
					{mutation.error.message}
				</p>
			)}

			{mutation.data && (
				<div className="mt-6">
					<StoryResult result={mutation.data} />
				</div>
			)}
		</section>
	);
}
