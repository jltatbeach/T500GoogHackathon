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
 * Brand Story creation — generates the brand voice and Story Engine.
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
		mutationFn: (input) => generateVoiceStory(input),
		onSuccess: (result) => onGenerated?.(result),
	});

	function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (userInput.trim()) mutation.mutate(userInput.trim());
	}

	return (
		<section aria-labelledby="voice-story-heading" className="space-y-8">
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-refi-700">
					Step 3 of 6 / Nurturing Growth
				</p>
				<h2
					id="voice-story-heading"
					className="mt-3 font-display text-4xl font-black text-[#1b1c19] lg:text-5xl"
				>
					Crafting Your Brand Story
				</h2>
				<p className="mt-4 max-w-3xl text-lg leading-8 text-[#3f493e]">
					Every regenerative project needs a soul. This story will guide generated screens,
					contribution asks, and impact-point language.
				</p>
			</div>

			<form
				onSubmit={onSubmit}
				className="grid gap-6 rounded-[2rem] border border-[#d8c7a3]/70 bg-white p-6 shadow-[0_24px_80px_-52px_rgba(47,53,47,0.38)] lg:grid-cols-[minmax(0,1fr)_16rem]"
			>
				<div>
					<label
						htmlFor="userInput"
						className="block text-sm font-bold uppercase tracking-[0.18em] text-refi-700"
					>
						What community are you serving?
					</label>
					<textarea
						id="userInput"
						name="userInput"
						rows={8}
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						placeholder="e.g. A healthy-living community app that rewards members with impact points for sharing clean-eating habits"
						className="mt-4 w-full resize-y rounded-3xl border-2 border-[#bfcabb] bg-[#fbf9f4] p-5 text-base leading-8 text-[#1b1c19] placeholder:text-slate-500 focus:border-refi-600 focus:outline-none"
					/>
					<div className="mt-5 flex flex-wrap items-center gap-3">
						<button
							type="submit"
							disabled={mutation.isPending || !userInput.trim()}
							className="min-h-11 rounded-full bg-refi-600 px-6 py-3 font-bold text-white shadow-lg shadow-refi-900/10 hover:bg-refi-700 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{mutation.isPending ? "Generating…" : "Generate Story"}
						</button>
						<p className="text-sm text-[#707a6e]">
							Server-side LLM only; keys never reach the client.
						</p>
					</div>
				</div>

				<aside className="rounded-3xl border border-[#e4e2dd] bg-[#f5f3ee] p-5">
					<h3 className="font-display text-xl font-bold text-[#1b1c19]">Voice Profile Preview</h3>
					<ul className="mt-5 space-y-3 text-sm">
						{["Regenerative", "Supportive", "Transparent"].map((item) => (
							<li key={item} className="rounded-2xl border border-[#e4e2dd] bg-white px-4 py-3">
								{item}
							</li>
						))}
					</ul>
					<p className="mt-5 rounded-2xl border border-dashed border-[#707a6e] p-4 text-center text-sm italic text-[#3f493e]">
						“Like a conversation over tea in a thriving community garden.”
					</p>
				</aside>
			</form>

			{mutation.isError && (
				<p role="alert" className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">
					{mutation.error.message}
				</p>
			)}

			{mutation.data && <StoryResult result={mutation.data} />}
		</section>
	);
}
