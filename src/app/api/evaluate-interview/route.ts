import { NextResponse } from "next/server";
import { openai, isOpenAIConfigured } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { question, response } = await req.json();

    if (isOpenAIConfigured && openai) {
      const prompt = `You are a technical hiring manager. Evaluate the candidate's answer to the following technical question:
      Question: "${question}"
      Candidate Answer: "${response}"
      
      Respond ONLY with a valid JSON object matching the following structure:
      {
        "score": "X.X / 10",
        "strengths": "Brief summary of what they explained well.",
        "improvements": "Brief summary of what they missed or could optimize.",
        "detailedFeedback": "Detailed constructive explanation of their response relative to industry standards."
      }
      Do not include markdown tags. Raw JSON text only.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const text = completion.choices[0]?.message?.content || "{}";
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } else {
      // Mock Evaluation based on text length
      const wordsCount = response.split(/\s+/).filter(Boolean).length;
      let scoreVal = 6.0;
      let detailed = "Your response is a bit too brief. In a technical interview, it's beneficial to outline definitions, provide examples, and detail any edge cases or performance implications.";

      if (wordsCount > 40) {
        scoreVal = 8.8;
        detailed = "Great job outlining the core components. You clearly articulated the main distinction. For a complete answer, consider detailing a short coding application showing it in action.";
      } else if (wordsCount > 15) {
        scoreVal = 7.5;
        detailed = "Solid start. You hit the key vocabulary, but your answer could use more structured explanations. Mentioning browser painted phases or database tables keys index helps show deep knowledge.";
      }

      return NextResponse.json({
        score: `${scoreVal} / 10`,
        strengths: "Hits core terms and concepts accurately.",
        improvements: "Could explain runtime differences or performance trade-offs in greater depth.",
        detailedFeedback: detailed
      });
    }
  } catch (error: any) {
    console.error("Interview evaluation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
