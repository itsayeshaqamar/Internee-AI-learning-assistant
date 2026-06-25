import { NextResponse } from "next/server";
import { openai, isOpenAIConfigured } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (isOpenAIConfigured && openai) {
      const prompt = `You are a technical documentation engineer. Create complete, detailed study notes about: "${topic}".
      Include headings, subheadings, explanations, simple analogies, and code snippets when relevant.
      Structure it nicely using standard Markdown syntax. Output only the Markdown content.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const mdContent = completion.choices[0]?.message?.content || "# Study Notes\n\nNotes failed to generate.";
      return NextResponse.json({ topic, content: mdContent });
    } else {
      // Mock Notes generator
      const mockContent = getMockNotes(topic);
      return NextResponse.json({ topic, content: mockContent });
    }
  } catch (error: any) {
    console.error("Notes generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getMockNotes(topic: string) {
  return `# Comprehensive Guide to ${topic}

## Introduction
Understanding **${topic}** is critical for technical interviews and day-to-day engineering. Let's break down its core characteristics.

## Core Analogy
Think of this concept like an **efficient library index card system**:
- Rather than searching through every shelf in the building (Full Table Scan / Linear Search), you check the alphabetized index cards to find the exact aisle and shelf location (Index Lookup).
- This drops query complexity from $O(N)$ to $O(\\log N)$ or $O(1)$!

## Key Implementation Parameters
1. **Instantiation Lifecycle:** Setting up structures cleanly.
2. **Caching Options:** Storing session updates to prevent database roundtrips.
3. **Validation Guards:** Asserting inputs match expected formats before compiling.

## Practical Code Example (Python/JavaScript)
Here is a standard implementation snippet:

\`\`\`javascript
// Standard encapsulation structure
function calculateOptimization(dataset, filterKey) {
  if (!dataset || dataset.length === 0) return [];
  
  // Memoizing indices
  const indexMap = new Map();
  
  return dataset.filter(item => {
    const value = item[filterKey];
    if (indexMap.has(value)) {
      return false; // prevent duplication
    }
    indexMap.set(value, true);
    return true;
  });
}
\`\`\`

## Edge Cases to Remember
* **Null Pointer Errors:** Always initialize fallbacks for empty arrays or empty strings.
* **Redundant Triggers:** Ensure useEffect hooks include proper dependency arrays to prevent infinite loops.
`;
}
