"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { addToCollection } from "@/lib/firebase";
import { Users, Send, CheckCircle2, AlertTriangle, RefreshCw, Star, Info, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionData {
  tech: string;
  question: string;
  preFilledResponse: string;
}

const QUESTIONS: { [key: string]: QuestionData } = {
  react: {
    tech: "React Frontend Hooks",
    question: "What is the primary difference between useEffect and useLayoutEffect, and when should you use the latter?",
    preFilledResponse: "useEffect is asynchronous and runs after the browser paints the screen, so it doesn't block the UI. useLayoutEffect runs synchronously after DOM mutations but before paint. You should use useLayoutEffect when you need to read layout measurements from the DOM and make changes that alter the layout before the user sees it, avoiding layout flicker.",
  },
  python: {
    tech: "Python Core & OOP",
    question: "What are *args and **kwargs in Python, and how are they used in function wrapper decorators?",
    preFilledResponse: "*args allows a function to accept any number of positional arguments (passed as a tuple), and **kwargs allows it to accept any number of keyword arguments (passed as a dictionary). In decorators, they are used in the wrapper function to pass whatever arguments the original function received without having to hardcode them, preserving signature flexibility.",
  },
  sql: {
    tech: "SQL Relational Databases",
    question: "Explain the difference between a LEFT JOIN and a FULL OUTER JOIN, detailing how they handle unmatched rows.",
    preFilledResponse: "A LEFT JOIN returns all rows from the left table, and matching rows from the right table. If there's no match, it returns NULL for the right table columns. A FULL OUTER JOIN returns all records when there is a match in either left or right table records. Unmatched rows in either table will be filled with NULLs in the final output dataset.",
  },
};

export default function MockInterviews() {
  const { user, updateUserProfile } = useAuth();
  const [selectedTech, setSelectedTech] = useState<"react" | "python" | "sql">("react");
  const [answer, setAnswer] = useState(QUESTIONS.react.preFilledResponse);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluated, setEvaluated] = useState(false);
  const [report, setReport] = useState<{
    score: string;
    strengths: string;
    improvements: string;
    detailedFeedback: string;
  } | null>(null);

  if (!user) return null;

  const activeQuestion = QUESTIONS[selectedTech];

  const handleTechChange = (tech: "react" | "python" | "sql") => {
    setSelectedTech(tech);
    setAnswer(QUESTIONS[tech].preFilledResponse);
    setEvaluated(false);
    setReport(null);
  };

  const handleEvaluate = async () => {
    if (!answer.trim()) return;
    setIsEvaluating(true);
    setEvaluated(false);
    setReport(null);
    try {
      const res = await fetch("/api/evaluate-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: activeQuestion.question, response: answer }),
      });
      if (res.ok) {
        const data = await res.json();
        setReport(data);
        setEvaluated(true);

        // Save evaluation to Firestore logs
        await addToCollection(`users/${user.uid}/interviews`, {
          tech: activeQuestion.tech,
          question: activeQuestion.question,
          answer: answer,
          score: data.score,
          date: new Date().toISOString(),
        });

        // Award XP
        await updateUserProfile({
          totalXP: user.totalXP + 25,
        });

        import("canvas-confetti").then((module) => {
          module.default({ particleCount: 40, spread: 35 });
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">Career Preparation</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Mock Interviews</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Simulate corporate technical rounds. Submit detailed responses to get immediate AI evaluations and scorecards.</p>
      </div>

      <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
        
        {/* Simulator block */}
        <div className="glass-panel border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          
          {/* Top panel Header */}
          <div className="bg-slate-900/60 px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Users className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>AI Evaluation Board</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[9px] text-red-400 font-bold tracking-wider uppercase animate-pulse">
              Live Mock session
            </div>
          </div>

          {/* Technology filter */}
          <div className="bg-slate-950/65 px-5 py-3 border-b border-white/5 flex gap-2">
            <button
              onClick={() => handleTechChange("react")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedTech === "react"
                  ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                  : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              React Hooks
            </button>
            <button
              onClick={() => handleTechChange("python")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedTech === "python"
                  ? "bg-emerald-600/20 border-emerald-500/50 text-emerald-300"
                  : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              Python Core & OOP
            </button>
            <button
              onClick={() => handleTechChange("sql")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                selectedTech === "sql"
                  ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-300"
                  : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
              }`}
            >
              SQL Databases
            </button>
          </div>

          {/* Simulator viewport */}
          <div className="p-5 sm:p-6 flex flex-col gap-4.5 bg-slate-900/15">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Interviewer prompt</span>
              <p className="text-slate-100 text-sm font-semibold leading-relaxed">
                {activeQuestion.question}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ans-area" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your response</label>
              <textarea
                id="ans-area"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={5}
                placeholder="Type or modify your technical response here..."
                className="w-full bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-xl p-3.5 text-xs sm:text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 leading-relaxed font-mono"
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-1">
              <button
                onClick={() => {
                  setAnswer("");
                  setEvaluated(false);
                  setReport(null);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Clear
              </button>

              <button
                onClick={handleEvaluate}
                disabled={isEvaluating || !answer}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white disabled:opacity-55 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Checking Answer...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Answer (+25 XP)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results card */}
          <AnimatePresence>
            {evaluated && report && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/10 bg-slate-950/80 p-5 flex flex-col gap-4 text-left"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    AI Score report
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400 font-semibold">Score:</span>
                    <span className="text-sm font-black text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded">
                      {report.score}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 flex gap-2 text-emerald-300">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">Key Strengths</span>
                      {report.strengths}
                    </div>
                  </div>

                  <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 flex gap-2 text-amber-300">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">Areas to Improve</span>
                      {report.improvements}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-white/5 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold block text-white mb-1 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    Evaluator Feedback Summary
                  </span>
                  {report.detailedFeedback}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
}
