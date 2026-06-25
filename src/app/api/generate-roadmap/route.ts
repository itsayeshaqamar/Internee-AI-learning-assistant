import { NextResponse } from "next/server";
import { openai, isOpenAIConfigured } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { track, experience, timeline } = await req.json();

    if (isOpenAIConfigured && openai) {
      const prompt = `You are a professional educational planner. Generate a highly structured learning roadmap for a student.
      Career Track: ${track}
      Prior Experience: ${experience}
      Time Commitment: ${timeline}
      
      Respond ONLY with a valid JSON object matching the following TypeScript interface:
      interface Roadmap {
        trackName: string;
        progress: number; // set to 0
        milestones: Array<{
          id: number;
          title: string;
          duration: string;
          completed: boolean; // set to false
          topics: string[];
        }>;
      }
      Do not include markdown tags like \`\`\`json. Just raw text JSON.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const text = completion.choices[0]?.message?.content || "{}";
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } else {
      // Mock Fallback Data
      const mockMilestones = getMockMilestones(track, experience, timeline);
      return NextResponse.json({
        trackName: `${track.toUpperCase()} Learning Roadmap`,
        progress: 0,
        milestones: mockMilestones,
      });
    }
  } catch (error: any) {
    console.error("Roadmap generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function getMockMilestones(track: string, exp: string, time: string) {
  const durationUnit = time === "2weeks" ? "3 days" : time === "1month" ? "1 week" : "3 weeks";
  
  if (track === "frontend") {
    return [
      { id: 1, title: "Modern Styling & Tailwind Integration", duration: durationUnit, completed: false, topics: ["Flexbox / Grid layouts", "Custom themes config", "Dark mode toggling"] },
      { id: 2, title: "Advanced JavaScript ES6+ & Fetch APIs", duration: durationUnit, completed: false, topics: ["Async/await requests", "Array manipulations (reduce, map)", "LocalStorage tokens"] },
      { id: 3, title: "React State & Hooks Lifecycles", duration: durationUnit, completed: false, topics: ["useState & useEffect synchronization", "Ref hooks (useRef)", "React portal nodes"] },
      { id: 4, title: "Next.js App Router & Server Components", duration: durationUnit, completed: false, topics: ["File routing layouts", "Server Action submissions", "Incremental static regenerations"] },
    ];
  } else if (track === "ml") {
    return [
      { id: 1, title: "Python Libraries & Data Loading", duration: durationUnit, completed: false, topics: ["NumPy matrix operations", "Pandas CSV merges", "Matplotlib charts plotting"] },
      { id: 2, title: "Core Math & Relational Statistics", duration: durationUnit, completed: false, topics: ["Vectors & dot projections", "Eigenvalues calculation", "Z-tests & p-values testing"] },
      { id: 3, title: "Supervised Classification Models", duration: durationUnit, completed: false, topics: ["Logistic classifications", "Decision trees splits", "Confusion matrices checks"] },
      { id: 4, title: "PyTorch Layers & Training Loops", duration: durationUnit, completed: false, topics: ["Tensor backpropagations", "Loss optimizer functions", "Convolutions kernels parameters"] },
    ];
  } else if (track === "backend") {
    return [
      { id: 1, title: "Python Scripting & Class Inheritance", duration: durationUnit, completed: false, topics: ["OOP Class methods", "Custom error exceptions", "Generators & decorators wrappers"] },
      { id: 2, title: "SQL Schema & Joins Calculations", duration: durationUnit, completed: false, topics: ["Query layouts & outer joins", "Database table indexes", "Transaction locks modes"] },
      { id: 3, title: "FastAPI Routing & JWT Authorization", duration: durationUnit, completed: false, topics: ["Endpoint routers", "Pydantic validator schemas", "Secret keys hash tokenizing"] },
      { id: 4, title: "Docker Containerization & Deployment", duration: durationUnit, completed: false, topics: ["Dockerfiles configurations", "Container port allocations", "Staging environment setups"] },
    ];
  } else {
    return [
      { id: 1, title: "SQL Queries & Aggregations Basics", duration: durationUnit, completed: false, topics: ["Groupings & subqueries", "Window row operations", "Schema updates scripts"] },
      { id: 2, title: "Pandas Exploratory Data Analysis", duration: durationUnit, completed: false, topics: ["Pivot aggregations tables", "Correlation matrices", "Missing data calculations"] },
      { id: 3, title: "Interactive Tableau Dashboards Mapping", duration: durationUnit, completed: false, topics: ["Data unions blends", "Calculation attributes", "Action filter panels"] },
      { id: 4, title: "Business Statistics & hypothesis checks", duration: durationUnit, completed: false, topics: ["Sample size bounds", "Null hypothesis testing", "A/B testing runs"] },
    ];
  }
}
