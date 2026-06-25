"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { getDocument, setDocument } from "@/lib/firebase";
import { MessageSquareCode, Send, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function TutorChat() {
  const { user, updateUserProfile } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user?.uid) {
      getDocument(`users/${user.uid}/chats`, "current")
        .then((doc) => {
          if (doc && doc.messages) {
            setMessages(doc.messages);
          } else {
            // Default opening message
            const initial: Message = {
              role: "assistant",
              content: `Hello ${user.name}! I am your InterneeAI Learning Coach. Ask me any technical question, request code optimizations, or ask for analogies. What would you like to explore today?`
            };
            setMessages([initial]);
            setDocument(`users/${user.uid}/chats`, "current", { messages: [initial] });
          }
        })
        .finally(() => setLoadingHistory(false));
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading || !user) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (res.ok) {
        const reply = await res.json();
        const finalMessages = [...updatedMessages, { role: "assistant" as const, content: reply.content }];
        setMessages(finalMessages);
        
        // Save to Firestore
        await setDocument(`users/${user.uid}/chats`, "current", { messages: finalMessages });
        
        // Award XP
        await updateUserProfile({
          totalXP: user.totalXP + 5,
        });
      } else {
        throw new Error("Failed to contact chatbot API.");
      }
    } catch (e) {
      console.error(e);
      setMessages([...updatedMessages, { role: "assistant", content: "I encountered an error trying to process that prompt. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (loadingHistory) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-4">
      {/* Messages Window */}
      <div className="flex-1 bg-slate-950/40 border border-white/5 rounded-3xl p-5 overflow-y-auto flex flex-col gap-4.5">
        {messages.map((msg, idx) => {
          const isAI = msg.role === "assistant";
          return (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${isAI ? "self-start" : "self-end flex-row-reverse"}`}
            >
              {/* Profile Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-md ${
                isAI ? "bg-gradient-to-tr from-blue-600 to-cyan-400" : "bg-slate-800 border border-white/10"
              }`}>
                {isAI ? "IA" : user.name.substring(0, 2).toUpperCase()}
              </div>

              {/* Message Bubble */}
              <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed border ${
                isAI
                  ? "bg-slate-900/50 border-white/5 text-slate-100"
                  : "bg-blue-600 border-blue-500/25 text-white"
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 self-start max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white shrink-0 animate-pulse">
              IA
            </div>
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 text-xs sm:text-sm text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Learning Coach is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Box */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question (e.g. Explain SQL Outer Joins using a party guest analogy...)"
          required
          disabled={loading}
          className="flex-1 bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-2xl px-5 py-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-2xl font-bold flex items-center justify-center shadow-lg disabled:opacity-50 transition-all active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
