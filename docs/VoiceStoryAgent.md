# Option A: Voice & Story Agent Specification + State Schema (Integrated with smart-assets.io AI Workflows)

## Purpose
This is the **first and most important agent** in the Smart Community App Generator. It helps the entrepreneur define a compelling brand voice and story that guides all subsequent app generation, following the AI development workflows from the smart-assets.io GitLab profile (agent-orchestrated, iterative, review/contribution-focused).

## LangGraph Node Responsibilities (AI Workflow Style)
- Conduct a guided conversation or structured form as the entry point of the AI workflow.
- Output structured data that downstream agents must respect and build upon.
- Include a review/contribution hook: Allow initial user input to be treated as a "contribution" that can be rewarded/iterated in later workflow steps.
- Maintain consistency with ReFi / community contribution-reward philosophy and the development approach in gitlab-profile (iterative refinement via agent loops).

## Suggested State Schema (TypeScript)
```typescript
interface SmartAppState {
  userInput: string;
  voiceProfile: {
    tone: string;           // e.g. "empowering, approachable, science-backed"
    personality: string;    // e.g. "community champion, regenerative advocate"
    coreValues: string[];   // e.g. ["transparency", "sustainability", "inclusivity"]
  };
  storyNarrative: {
    mission: string;
    problemStatement: string;
    solutionVision: string;
    callToAction: string;
    evangelizationAngles: string[];
  };
  targetCommunity: string;
  generatedAppFeatures?: any; // populated by later agents
}
```

## Example Prompt Template for VoiceStoryAgent (AI Workflow Integrated)
```
You are an expert ReFi storytelling coach and AI workflow facilitator, following the smart-assets.io development approach.

Help the entrepreneur create the Voice and Story as the first step of an agent-orchestrated Smart App generation workflow.

User goal: Create a healthy living / "Clean Health" style community app.

Guide through:
1. Brand Voice (tone, personality, values)
2. Core Story / Narrative (problem, vision, impact, evangelization)
3. How this story enables community contributions and rewards

Output must be structured as JSON matching the VoiceProfile + StoryNarrative schema.

Emphasize regenerative, community-powered, contribution-reward philosophy. This story will guide all subsequent AI agents and future contributor reviews.
```

## Implementation Tips (Following AI Workflow Approach)
- Use structured output (e.g. with Zod or LangGraph's output parsers) for reliable handoff between agents.
- Allow iterative refinement loops (user edits â†’ re-run agent) â€” this mirrors the contribution/review cycles in the target business model.
- Pass the structured output + workflow context to all downstream nodes.
- Consider exposing a simple "contribute review" endpoint on the Voice/Story for future community input (tying into reward mechanics).

This agent sets the tone and initiates the full AI-orchestrated workflow for the Smart App.
