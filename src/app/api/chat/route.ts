import { NextResponse } from "next/server";
import { openai, isOpenAIConfigured } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    if (isOpenAIConfigured && openai) {
      // Structure system prompt to tell it to be an elite coding coach
      const formattedMessages = [
        { 
          role: "system" as const, 
          content: "You are InterneeAI Coding Coach, an encouraging, high-fidelity technical tutor. Explain complex concepts using intuitive analogies based on the student's background, and provide compact code examples when helpful. Focus on core parameters." 
        },
        ...messages
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: formattedMessages,
      });

      const responseText = completion.choices[0]?.message?.content || "I'm having trouble formulating an answer right now.";
      return NextResponse.json({ role: "assistant", content: responseText });
    } else {
      // Mock chat tutor response based on last message query content
      const lastMessage = messages[messages.length - 1]?.content || "";
      const lowercaseMsg = lastMessage.toLowerCase();
      
      let replyContent = "That's an interesting question! As your AI tutor, let's break it down. In engineering, it's helpful to first understand the foundational components of the system before building further.";
      
      if (lowercaseMsg.includes("recursion")) {
        replyContent = "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. Think of it like nested Russian Matryoshka dolls: to reach the tiny doll in the center (the base case), you must open each outer doll one by one (recursive steps). Without a base case, you'll get a Stack Overflow error (an infinite loop of dolls)! Let me know if you want to see a Python code snippet.";
      } else if (lowercaseMsg.includes("state") || lowercaseMsg.includes("react")) {
        replyContent = "In React, 'state' represents a component's memory. Imagine a smart bulb: its state is a boolean (on/off). When you click the switch (trigger setStatus), React re-renders the component to show the light shining. Unlike local variables, state persists across renders. Would you like to practice writing a useState counter hook?";
      } else if (lowercaseMsg.includes("sql") || lowercaseMsg.includes("join")) {
        replyContent = "SQL Joins are used to combine rows from multiple tables based on a related column. A LEFT JOIN fetches everything from the primary (left) table and matches from the secondary. Think of it as a guest list: you want to print all guests names, along with their assigned table number. If they don't have a table assigned, they still show on the list, but table columns display NULL. Let's try writing a join query.";
      } else if (lowercaseMsg.includes("code") || lowercaseMsg.includes("python")) {
        replyContent = "Python is designed for high readability. Here is a simple example implementing a loop:\n\n```python\n# Iterating list\ntopics = ['HTML', 'CSS', 'React']\nfor index, item in enumerate(topics):\n    print(f'{index + 1}: Mastering {item}!')\n```\nTry modifying this loop to add condition variables!";
      }

      return NextResponse.json({ role: "assistant", content: replyContent });
    }
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
