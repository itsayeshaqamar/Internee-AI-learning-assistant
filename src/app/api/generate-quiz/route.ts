import { NextResponse } from "next/server";
import { openai, isOpenAIConfigured } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (isOpenAIConfigured && openai) {
      const prompt = `You are a technical examiner. Create a multiple choice quiz about the topic: "${topic}".
      Provide exactly 5 multiple choice questions.
      
      Respond ONLY with a valid JSON object matching the following structure:
      {
        "topic": "Topic Name",
        "questions": [
          {
            "id": 1,
            "questionText": "Question description?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctOptionIndex": 0 // 0-indexed index of correct option
          }
        ]
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
      // Mock Quiz Data
      const mockQuiz = getMockQuiz(topic);
      return NextResponse.json(mockQuiz);
    }
  } catch (error: any) {
    console.error("Quiz generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getMockQuiz(topic: string) {
  const lowercaseTopic = topic.toLowerCase();
  
  if (lowercaseTopic.includes("react") || lowercaseTopic.includes("front")) {
    return {
      topic: "React UI Development",
      questions: [
        {
          id: 1,
          questionText: "Which hook should be used to memoize the computation result of an expensive function in React?",
          options: ["useMemo", "useCallback", "useState", "useRef"],
          correctOptionIndex: 0
        },
        {
          id: 2,
          questionText: "What is the primary difference between useEffect and useLayoutEffect?",
          options: ["useLayoutEffect runs asynchronously after paint", "useLayoutEffect runs synchronously after DOM mutations but before paint", "useEffect is only for class components", "useLayoutEffect has no dependency array"],
          correctOptionIndex: 1
        },
        {
          id: 3,
          questionText: "How can you prevent a component from re-rendering when parent state changes in React?",
          options: ["Wrap the component in React.memo()", "Use the useRef hook on variables", "Declare elements outside the file", "Set values in sessionStorage"],
          correctOptionIndex: 0
        },
        {
          id: 4,
          questionText: "Which key is crucial to add when rendering lists in React to assist the reconciliation engine?",
          options: ["id attribute", "index key", "unique 'key' prop", "className key"],
          correctOptionIndex: 2
        },
        {
          id: 5,
          questionText: "What does the children prop do in React components?",
          options: ["It lists the child class names", "It renders nested elements enclosed inside the component tags", "It counts state changes", "It represents database connections"],
          correctOptionIndex: 1
        }
      ]
    };
  } else if (lowercaseTopic.includes("sql") || lowercaseTopic.includes("database")) {
    return {
      topic: "SQL Relational Operations",
      questions: [
        {
          id: 1,
          questionText: "Which SQL join returns all records from the left table and matching records from the right table, with nulls for unmatched right side items?",
          options: ["INNER JOIN", "FULL OUTER JOIN", "LEFT JOIN", "RIGHT JOIN"],
          correctOptionIndex: 2
        },
        {
          id: 2,
          questionText: "What is the purpose of adding an Index to a column in a relational table?",
          options: ["It enforces unique keys constraints", "It increases database storage size to prevent data losses", "It speeds up read querying lookups at the expense of write operations speed", "It automatically backs up tables"],
          correctOptionIndex: 2
        },
        {
          id: 3,
          questionText: "Which SQL keyword is used to group row aggregates, similar to a pivot table?",
          options: ["GROUP BY", "ORDER BY", "WHERE GROUP", "HAVING"],
          correctOptionIndex: 0
        },
        {
          id: 4,
          questionText: "What is the difference between WHERE and HAVING clauses?",
          options: ["WHERE filters groups; HAVING filters single rows", "WHERE filters single rows; HAVING filters aggregates after GROUP BY", "WHERE is only for numbers; HAVING is for strings", "They are identical in performance"],
          correctOptionIndex: 1
        },
        {
          id: 5,
          questionText: "What is Database Normalization designed to prevent?",
          options: ["Data redundancy and consistency anomalies", "Table access blocks", "Syntax formatting errors", "Server memory overflows"],
          correctOptionIndex: 0
        }
      ]
    };
  } else {
    return {
      topic: `${topic} Concepts`,
      questions: [
        {
          id: 1,
          questionText: `Which of the following is a core concept of ${topic}?`,
          options: ["Dynamic parsing loops", "Class inheritances", "Structural encapsulation", "All of the above"],
          correctOptionIndex: 3
        },
        {
          id: 2,
          questionText: `What is the primary tool used for testing ${topic}?`,
          options: ["Unit checkers", "Linter logs", "Browser inspectors", "Varies by framework"],
          correctOptionIndex: 3
        },
        {
          id: 3,
          questionText: "What is the main benefit of modular design?",
          options: ["Increases compilation files count", "Enhances code reusability and maintainability", "Makes code run twice as fast", "Ensures data can never be deleted"],
          correctOptionIndex: 1
        },
        {
          id: 4,
          questionText: "What does the term 'runtime complexity' refer to?",
          options: ["The number of lines of code in a file", "The execution time of an algorithm relative to input size", "The difficulty of writing code", "The styling rendering speed"],
          correctOptionIndex: 1
        },
        {
          id: 5,
          questionText: "Which HTTP status code represents a successful REST request?",
          options: ["404 Not Found", "500 Internal Server", "200 OK", "301 Redirect"],
          correctOptionIndex: 2
        }
      ]
    };
  }
}
