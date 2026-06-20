import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { createChatModel } from "./llm";
import {
	type StoryEngine,
	type StoryNarrative,
	type VoiceProfile,
	type VoiceStoryOutput,
	VoiceStoryOutputSchema,
} from "./schema";
import { FRAMEWORK_ATTRIBUTION, STORY_FRAMEWORKS } from "./storyFrameworks";

/**
 * Voice & Story Agent — the first node in the Smart App generation workflow.
 *
 * A LangGraph StateGraph drives the flow. This starter wires the single
 * VoiceStoryAgent node; downstream Design / Review / Preview agents attach to
 * the same graph as they are built (see docs/SmartAppPlan.md).
 */

const SmartAppState = Annotation.Root({
	userInput: Annotation<string>(),
	voiceProfile: Annotation<VoiceProfile | null>({
		reducer: (_prev, next) => next,
		default: () => null,
	}),
	storyNarrative: Annotation<StoryNarrative | null>({
		reducer: (_prev, next) => next,
		default: () => null,
	}),
	storyEngine: Annotation<StoryEngine | null>({
		reducer: (_prev, next) => next,
		default: () => null,
	}),
	targetCommunity: Annotation<string>({
		reducer: (_prev, next) => next,
		default: () => "",
	}),
});

const SYSTEM_PROMPT = `You are an expert ReFi storytelling coach and AI workflow facilitator, following the smart-assets.io development approach.

Create the Voice and Story as the first step of an agent-orchestrated Smart App generation workflow. Produce:
1. Brand Voice (tone, personality, core values)
2. Core Story / Narrative (mission, problem, vision, call to action, evangelization angles)
3. A Story Engine built on these proven storytelling frameworks:

${STORY_FRAMEWORKS}

Emphasize a regenerative, community-powered, contribution-reward philosophy. This story guides all subsequent AI agents and future contributor reviews. Keep the metaphor's vocabulary consistent with the brand voice.

(${FRAMEWORK_ATTRIBUTION})`;

async function voiceStoryNode(
	state: typeof SmartAppState.State,
): Promise<Partial<typeof SmartAppState.State>> {
	const model = createChatModel();
	const structured = model.withStructuredOutput(VoiceStoryOutputSchema, { name: "voice_story" });

	const result = (await structured.invoke([
		{ role: "system", content: SYSTEM_PROMPT },
		{
			role: "user",
			content: `User goal: ${state.userInput}\n\nProduce the Voice Profile, Story Narrative, and target community.`,
		},
	])) as VoiceStoryOutput;

	return {
		voiceProfile: result.voiceProfile,
		storyNarrative: result.storyNarrative,
		storyEngine: result.storyEngine,
		targetCommunity: result.targetCommunity,
	};
}

const graph = new StateGraph(SmartAppState)
	.addNode("voiceStory", voiceStoryNode)
	.addEdge(START, "voiceStory")
	.addEdge("voiceStory", END)
	.compile();

/** Run the workflow and return the Voice & Story Agent's structured output. */
export async function runVoiceStory(userInput: string): Promise<VoiceStoryOutput> {
	const final = await graph.invoke({ userInput });
	return VoiceStoryOutputSchema.parse({
		voiceProfile: final.voiceProfile,
		storyNarrative: final.storyNarrative,
		storyEngine: final.storyEngine,
		targetCommunity: final.targetCommunity,
	});
}
