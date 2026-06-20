import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { VoiceStoryOutput } from "../agents/schema";
import { generateVoiceStory } from "../lib/api";
import { VoiceStoryForm } from "./VoiceStoryForm";

vi.mock("../lib/api", () => ({ generateVoiceStory: vi.fn() }));

const mockGenerate = vi.mocked(generateVoiceStory);

function renderWithClient(ui: ReactElement) {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

afterEach(() => {
	vi.clearAllMocks();
});

describe("VoiceStoryForm", () => {
	it("keeps the submit button disabled until the user types", async () => {
		renderWithClient(<VoiceStoryForm />);
		const button = screen.getByRole("button", { name: /generate story/i });
		expect(button).toBeDisabled();

		await userEvent.type(
			screen.getByLabelText(/what community are you serving/i),
			"A clean-eating community",
		);
		expect(button).toBeEnabled();
	});

	it("calls the workflow and renders the generated story region", async () => {
		const output: VoiceStoryOutput = {
			voiceProfile: { tone: "empowering", personality: "champion", coreValues: ["transparency"] },
			storyNarrative: {
				mission: "m",
				problemStatement: "p",
				solutionVision: "s",
				callToAction: "c",
				evangelizationAngles: ["a"],
			},
			targetCommunity: "Urban families",
		};
		mockGenerate.mockResolvedValueOnce(output);

		renderWithClient(<VoiceStoryForm />);
		await userEvent.type(screen.getByLabelText(/what community are you serving/i), "clean eating");
		await userEvent.click(screen.getByRole("button", { name: /generate story/i }));

		await waitFor(() =>
			expect(
				screen.getByRole("article", { name: /generated voice and story/i }),
			).toBeInTheDocument(),
		);
		expect(mockGenerate.mock.calls[0]?.[0]).toBe("clean eating");
	});
});
