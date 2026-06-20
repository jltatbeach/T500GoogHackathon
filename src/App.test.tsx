import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

function renderApp() {
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	return render(
		<QueryClientProvider client={client}>
			<App />
		</QueryClientProvider>,
	);
}

async function fillIdeation() {
	await userEvent.type(screen.getByLabelText(/what problem are you solving/i), "habit drift");
	await userEvent.type(screen.getByLabelText(/how will your application solve/i), "rewards");
	await userEvent.type(screen.getByLabelText(/what does success look like/i), "retention");
}

describe("App wizard", () => {
	it("starts on the Ideation step with Back disabled", () => {
		renderApp();
		expect(screen.getByRole("button", { name: /ideation problem/i })).toHaveAttribute(
			"aria-current",
			"step",
		);
		expect(screen.getByRole("button", { name: /^back$/i })).toBeDisabled();
	});

	it("defaults the background switch to system", () => {
		renderApp();
		expect(screen.getByRole("button", { name: /^system$/i })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
	});

	it("gates Next until the problem/solution/success brief is complete", async () => {
		renderApp();
		const next = screen.getByRole("button", { name: /^next: research$/i });
		expect(next).toBeDisabled();

		await fillIdeation();
		expect(next).toBeEnabled();
	});

	it("advances to the next step and Back returns", async () => {
		renderApp();
		await fillIdeation();
		await userEvent.click(screen.getByRole("button", { name: /^next: research$/i }));

		expect(screen.getByRole("button", { name: /research emulated/i })).toHaveAttribute(
			"aria-current",
			"step",
		);

		await userEvent.click(screen.getByRole("button", { name: /^back$/i }));
		expect(screen.getByRole("button", { name: /ideation problem/i })).toHaveAttribute(
			"aria-current",
			"step",
		);
	});
});
