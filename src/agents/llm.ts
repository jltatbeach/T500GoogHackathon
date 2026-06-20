import { ChatAnthropic } from "@langchain/anthropic";
import { ChatBedrockConverse } from "@langchain/aws";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatXAI } from "@langchain/xai";

/**
 * Provider factory.
 *
 * Env var names and default model IDs intentionally match the smart-assets.io
 * /multi-review provider wiring so a single set of credentials works across
 * tools. SERVER-ONLY — never import from client/React code (it reads secrets
 * from process.env).
 */

export type ProviderName = "anthropic" | "openai" | "xai" | "google" | "bedrock";

const PROVIDERS: readonly ProviderName[] = ["anthropic", "openai", "xai", "google", "bedrock"];

const DEFAULT_MODELS: Record<ProviderName, string> = {
	anthropic: "claude-opus-4-5-20251101",
	openai: "gpt-4-turbo",
	xai: "grok-4-fast-non-reasoning",
	google: "gemini-2.5-pro",
	bedrock: "us.amazon.nova-pro-v1:0",
};

export function resolveProvider(): ProviderName {
	const raw = (process.env.LLM_PROVIDER ?? "google").toLowerCase();
	return (PROVIDERS as readonly string[]).includes(raw) ? (raw as ProviderName) : "google";
}

/** Whether the credentials required by `provider` are present in the environment. */
export function providerCredentialsPresent(provider: ProviderName = resolveProvider()): boolean {
	switch (provider) {
		case "anthropic":
			return Boolean(process.env.ANTHROPIC_API_KEY);
		case "openai":
			return Boolean(process.env.OPENAI_API_KEY);
		case "xai":
			return Boolean(process.env.XAI_API_KEY || process.env.GROK_API_KEY);
		case "google":
			return Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
		case "bedrock":
			return Boolean(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY);
	}
}

export function createChatModel(provider: ProviderName = resolveProvider()): BaseChatModel {
	switch (provider) {
		case "anthropic":
			return new ChatAnthropic({
				model: process.env.ANTHROPIC_MODEL ?? DEFAULT_MODELS.anthropic,
				apiKey: process.env.ANTHROPIC_API_KEY,
				maxTokens: Number(process.env.ANTHROPIC_MAX_TOKENS ?? 16384),
				// @langchain/anthropic always sends temperature AND top_p for opus-4-5
				// (it only omits the top_p=-1 sentinel for opus-4-1/sonnet-4-5/haiku-4-5).
				// opus-4-5 rejects top_p=-1 and rejects temperature+top_p together, so we
				// send a valid top_p (1 = no nucleus filtering) and omit temperature (null).
				topP: 1,
				temperature: null,
			});
		case "openai":
			return new ChatOpenAI({
				model: process.env.OPENAI_MODEL ?? DEFAULT_MODELS.openai,
				apiKey: process.env.OPENAI_API_KEY,
			});
		case "xai":
			return new ChatXAI({
				model: process.env.XAI_MODEL ?? DEFAULT_MODELS.xai,
				apiKey: process.env.XAI_API_KEY ?? process.env.GROK_API_KEY,
			});
		case "google":
			return new ChatGoogleGenerativeAI({
				model: process.env.GEMINI_MODEL ?? process.env.GOOGLE_MODEL ?? DEFAULT_MODELS.google,
				apiKey: process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY,
			});
		case "bedrock":
			return new ChatBedrockConverse({
				model: process.env.BEDROCK_MODEL ?? DEFAULT_MODELS.bedrock,
				region: process.env.AWS_REGION ?? process.env.AWS_DEFAULT_REGION ?? "us-east-1",
			});
	}
}
