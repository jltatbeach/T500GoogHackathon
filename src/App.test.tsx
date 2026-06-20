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

describe("App wizard navigation", () => {
	it("starts on the Voice & Story step with its form visible", () => {
		renderApp();
		expect(screen.getByRole("button", { name: /voice & story/i })).toHaveAttribute(
			"aria-current",
			"step",
		);
		expect(screen.getByLabelText(/what community are you serving/i)).toBeInTheDocument();
	});

	it("switches the active step when a sidebar item is clicked", async () => {
		renderApp();
		await userEvent.click(screen.getByRole("button", { name: /generate app/i }));

		expect(screen.getByRole("button", { name: /generate app/i })).toHaveAttribute(
			"aria-current",
			"step",
		);
		// The Voice & Story form is no longer rendered once another step is active.
		expect(screen.queryByLabelText(/what community are you serving/i)).not.toBeInTheDocument();
	});
});
