"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, BookOpen, Compass, Code, Brain } from "lucide-react";

type Mode = "concept" | "code" | "plan";

export default function ChatDemo() {
  const [activeMode, setActiveMode] = useState<Mode>("concept");

  return (
    <div id="tutor-demo" className="w-full max-w-lg glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col relative z-20">
      {/* Window Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-slate-900/50">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium tracking-wide">
          <Brain className="w-3.5 h-3.5 text-blue-400" />
          <span>InterneeAI Learning Coach</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="p-5 flex flex-col gap-4 text-sm max-h-[460px] overflow-y-auto">
        {/* User Message */}
        <div className="flex justify-end">
          <div className="bg-blue-600/90 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-md border border-blue-500/20 text-xs sm:text-sm">
            I scored low in Python loops. Can you help me improve?
          </div>
        </div>

        {/* AI Response */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-md">
            IA
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-slate-200 text-xs sm:text-sm">
              No worries! Based on your quiz results, you scored 40% in control flow. I've flagged Python loops as a weak area in your profile. Let's rebuild your understanding with a custom study plan:
            </div>

            {/* Personalized Content Card */}
            <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-4.5 flex flex-col gap-3 transition-all duration-300">
              <AnimatePresence mode="wait">
                {activeMode === "concept" && (
                  <motion.div
                    key="concept"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      Weakness Review: Loops
                    </span>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-[13px]">
                      Think of a loop like <strong className="text-white font-medium">checking in attendees at a conference</strong>. Instead of writing a manual ticket check for 100 individuals individually, you write a single rule: <span className="font-mono text-cyan-400 bg-slate-900 px-1 py-0.5 rounded text-[11px]">for guest in list: check(guest)</span>. The code iterates automatically.
                    </p>
                  </motion.div>
                )}

                {activeMode === "code" && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5" />
                      Practice Exercise
                    </span>
                    <div className="bg-slate-900 border border-white/5 rounded-lg p-2.5 font-mono text-[10px] sm:text-xs text-slate-300 overflow-x-auto leading-relaxed">
                      <span className="text-slate-500"># Iterate list index automatically</span><br />
                      failed_modules = ["Loops", "Nested Scopes"]<br />
                      {"for idx, item in enumerate(failed_modules):"}<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;{"print(f\"Revision {idx+1}: Study {item}!\")"}
                    </div>
                  </motion.div>
                )}

                {activeMode === "plan" && (
                  <motion.div
                    key="plan"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      Adaptive Study Plan
                    </span>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-[13px]">
                      I have updated your roadmap and inserted a revision milestone <strong className="text-white font-medium">"Control Flow Refresher"</strong> (approx 2.5 hours) before you proceed. Complete the practice quiz afterwards to clear the warning flag.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interaction Mode Switchers */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => setActiveMode("concept")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                    activeMode === "concept"
                      ? "bg-cyan-600/20 border-cyan-500/50 text-cyan-300"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                  }`}
                >
                  Analogy Explanation
                </button>
                <button
                  onClick={() => setActiveMode("code")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                    activeMode === "code"
                      ? "bg-emerald-600/20 border-emerald-500/50 text-emerald-300"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                  }`}
                >
                  Practice Code
                </button>
                <button
                  onClick={() => setActiveMode("plan")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                    activeMode === "plan"
                      ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
                      : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                  }`}
                >
                  Adaptive Plan
                </button>
              </div>
            </div>

            {/* Bottom response content */}
            <div className="text-slate-300 text-xs">
              {activeMode === "code" ? (
                <span>Let's try updating this code dynamically to check for loop boundaries!</span>
              ) : activeMode === "plan" ? (
                <span>By clearing the revision course, your streak levels and profile XP will gain +30 points.</span>
              ) : (
                <span>Try clicking the tabs to check code examples or review your adaptive plan study modules.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Pill Badges */}
      <div className="px-5 py-3.5 border-t border-white/5 bg-slate-900/40 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          Tailored to your progress
        </span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          Powered by Internee.pk
        </span>
      </div>
    </div>
  );
}
