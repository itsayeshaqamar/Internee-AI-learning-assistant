"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Send, CheckCircle2, AlertTriangle, Play, RefreshCw, Star, Info } from "lucide-react";

type Question = {
  tech: string;
  question: string;
  preFilledResponse: string;
  evaluation: {
    score: string;
    strengths: string;
    improvements: string;
    detailedFeedback: string;
  };
};

const INTERVIEWS: { [key: string]: Question } = {
  react: {
    tech: "React & Frontend Hooks",
    question: "What is the primary difference between useEffect and useLayoutEffect, and when should you use the latter?",
    preFilledResponse: "useEffect is asynchronous and runs after the browser paints the screen, so it doesn't block the UI. useLayoutEffect runs synchronously after DOM mutations but before paint. You should use useLayoutEffect when you need to read layout measurements from the DOM and make changes that alter the layout before the user sees it, avoiding layout flicker.",
    evaluation: {
      score: "9.2 / 10",
      strengths: "Excellent explanation of synchronization vs. synchronization paint. Correctly highlights prevention of layout flickers.",
      improvements: "Could briefly mention that React recommends using useEffect by default to prevent blocking render performance.",
      detailedFeedback: "Outstanding answer! Your understanding of the browser paint lifecycle relative to React hooks is highly accurate. Keep using useEffect by default and reserve useLayoutEffect for layout measurement calculations.",
    },
  },
  python: {
    tech: "Python Core & Scripting",
    question: "What are *args and **kwargs in Python, and how are they used in decorator wrappers?",
    preFilledResponse: "*args allows a function to accept any number of positional arguments (passed as a tuple), and **kwargs allows it to accept any number of keyword arguments (passed as a dictionary). In decorators, they are used in the wrapper function to pass whatever arguments the original function received without having to hardcode them, preserving signature flexibility.",
    evaluation: {
      score: "8.8 / 10",
      strengths: "Clear distinction between positional tuple (*args) and keyword dictionary (**kwargs) mapping. Correct wrapper context usage.",
      improvements: "Could add that *args and **kwargs must appear in that specific order in the function signature.",
      detailedFeedback: "Very solid explanation. You clearly understand positional vs keyword packing. Explaining decorators using these wrappers is a classical senior developer interview topic and you aced it.",
    },
  },
  sql: {
    tech: "Relational SQL Queries",
    question: "Explain the difference between a LEFT JOIN and a FULL OUTER JOIN in SQL.",
    preFilledResponse: "A LEFT JOIN returns all rows from the left table, and matching rows from the right table. If there's no match, it returns NULL for the right table columns. A FULL OUTER JOIN returns all records when there is a match in either left or right table records. Unmatched rows in either table will be filled with NULLs in the final output dataset.",
    evaluation: {
      score: "8.5 / 10",
      strengths: "Accurate explanation of unmatched rows behavior and NULL filling. Clear database relational models description.",
      improvements: "Could add a quick tip about performance implications or indexes on key columns.",
      detailedFeedback: "Great work! Relational joins are fundamental. Your description of the Venn diagram equivalent of these joins is precise and demonstrates solid database knowledge.",
    },
  },
};

export default function MockInterview() {
  const [selectedTech, setSelectedTech] = useState<"react" | "python" | "sql">("react");
  const [answer, setAnswer] = useState(INTERVIEWS.react.preFilledResponse);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const activeQuestion = INTERVIEWS[selectedTech];

  const handleTechChange = (tech: "react" | "python" | "sql") => {
    setSelectedTech(tech);
    setAnswer(INTERVIEWS[tech].preFilledResponse);
    setEvaluated(false);
  };

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluated(true);
    }, 1500);
  };

  const handleReset = () => {
    setAnswer("");
    setEvaluated(false);
  };

  return (
    <section id="interviews" className="py-24 bg-slate-950/20 border-b border-white/5 relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full radial-glow-purple pointer-events-none opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Simulator Display */}
          <div className="lg:col-span-7 w-full flex flex-col gap-6">
            <div className="glass-panel border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
              {/* Simulator Top Bar */}
              <div className="bg-slate-900/60 px-5 py-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>AI Mock Interview Simulator</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded text-[10px] text-red-400 font-bold tracking-wider uppercase animate-pulse">
                  Recording
                </div>
              </div>

              {/* Selection Switches */}
              <div className="bg-slate-950/80 px-5 py-3 border-b border-white/5 flex flex-wrap gap-2">
                <button
                  onClick={() => handleTechChange("react")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedTech === "react"
                      ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  React Frontend
                </button>
                <button
                  onClick={() => handleTechChange("python")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedTech === "python"
                      ? "bg-emerald-600/20 border-emerald-500/50 text-emerald-300"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Python Core
                </button>
                <button
                  onClick={() => handleTechChange("sql")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedTech === "sql"
                      ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-300"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  SQL Databases
                </button>
              </div>

              {/* Question Screen */}
              <div className="p-5 sm:p-6 flex flex-col gap-4 bg-slate-900/30">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Interviewer Prompt</span>
                  <p className="text-slate-100 text-sm font-semibold leading-relaxed">
                    {activeQuestion.question}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-answer" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Answer</label>
                  <textarea
                    id="user-answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={4}
                    placeholder="Type or customize your response here..."
                    className="w-full bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-xl p-3.5 text-xs sm:text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 leading-relaxed font-mono"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-semibold"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Clear Response
                  </button>

                  <button
                    onClick={handleEvaluate}
                    disabled={isEvaluating || !answer}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white disabled:opacity-55 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Answer
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Evaluation Results Card */}
              <AnimatePresence>
                {evaluated && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-white/10 bg-slate-950/80 p-5 flex flex-col gap-4"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        AI Feedback Summary
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-400 font-semibold">Overall Score:</span>
                        <span className="text-sm font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                          {activeQuestion.evaluation.score}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-3 flex gap-2 text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block mb-0.5">Key Strengths</span>
                          {activeQuestion.evaluation.strengths}
                        </div>
                      </div>

                      <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-3 flex gap-2 text-amber-300">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold block mb-0.5">Areas to Improve</span>
                          {activeQuestion.evaluation.improvements}
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 border border-white/5 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold block text-white mb-1 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-blue-400" />
                        Detailed Evaluation Report
                      </span>
                      {activeQuestion.evaluation.detailedFeedback}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Copy Description */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              AI Mock Assessments
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Ace Your Technical Tech Interviews
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Our simulated interview panels put you in the hot seat with real tech questions. Receive an instant score breakdown based on accuracy, structure, best practices, and runtime complexity tips.
            </p>
            <div className="flex flex-col gap-3 text-sm text-slate-300 text-left w-full">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Tailored to React, Node, Python, and SQL.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Real-time code analysis and scoring metrics.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Constructive feedback for instant optimization.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
