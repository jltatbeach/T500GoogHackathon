import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { createChatModel } from "./llm";
import { type IdeaBriefInput, type ResearchBrief, ResearchBriefSchema } from "./schema";

/**
 * Emulated Agentic Research (FLOW-003) — the second node in the pipeline.
 *
 * "Emulated" means there is no live web-search/retrieval tool yet: the LLM
 * reasons from the confirmed idea brief to produce a demo-grade research brief.
 * A real search tool can be added later behind the same `runResearch` contract.
 * Mirrors the Voice & Story slice (src/agents/voiceStory.ts). SERVER-ONLY.
 */

const ResearchState = Annotation.Root({
	idea: Annotation<IdeaBriefInput>(),
	research: Annotation<ResearchBrief | null>({
		reducer: (_prev, next) => next,
		default: () => null,
	}),
});

const SYSTEM_PROMPT = `You are a startup research analyst for the Ticket 500 incubator.

Given an entrepreneur's idea brief (problem, solution, success), produce a concise, demo-grade research brief that validates and enriches the idea. You do NOT have live web access — reason from the brief and well-known patterns; keep claims general rather than inventing specific statistics or named sources.

Produce:
- audience: the primary users/customers and a signal they need this
- marketGap: the gap or comparable pattern in the market
- comparables: 2-4 comparable products or approaches
- rewardOpportunities: 2-4 ways community contributions could earn impact points (never tokens or claimable assets)
- assumptions: 2-4 key assumptions the entrepreneur should validate

Be crisp and specific to the idea.`;

async function researchNode(
	state: typeof ResearchState.State,
): Promise<Partial<typeof ResearchState.State>> {
	const model = createChatModel();
	const structured = model.withStructuredOutput(ResearchBriefSchema, { name: "research_brief" });

	const research = (await structured.invoke([
		{ role: "system", content: SYSTEM_PROMPT },
		{
			role: "user",
			content: `Idea brief:\nProblem: ${state.idea.problem}\nSolution: ${state.idea.solution}\nSuccess: ${state.idea.success}`,
		},
	])) as ResearchBrief;

	return { research };
}

const graph = new StateGraph(ResearchState)
	.addNode("research", researchNode)
	.addEdge(START, "research")
	.addEdge("research", END)
	.compile();

/** Run the emulated research agent and return its structured brief. */
export async function runResearch(idea: IdeaBriefInput): Promise<ResearchBrief> {
	const final = await graph.invoke({ idea });
	return ResearchBriefSchema.parse(final.research);
}
