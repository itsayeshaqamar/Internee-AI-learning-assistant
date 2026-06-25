import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export const isOpenAIConfigured = apiKey && apiKey !== "undefined" && !apiKey.startsWith("YOUR_");

let openai: OpenAI | null = null;

if (isOpenAIConfigured) {
  openai = new OpenAI({
    apiKey: apiKey,
  });
}

export { openai };
