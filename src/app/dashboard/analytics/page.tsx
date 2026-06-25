"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { getCollection } from "@/lib/firebase";
import { BarChart3, TrendingUp, Clock, BookOpen, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ChartData {
  day: string;
  hours: number;
}

const WEEKLY: ChartData[] = [
  { day: "Mon", hours: 2.0 },
  { day: "Tue", hours: 4.5 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 5.0 },
  { day: "Sat", hours: 6.8 },
  { day: "Sun", hours: 4.0 },
];

export default function AnalyticsDashboard() {
  const { user } = useAuth();
  const [quizzesCount, setQuizzesCount] = useState(0);
  const [interviewsCount, setInterviewsCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);

  useEffect(() => {
    if (user?.uid) {
      // Get counts from collections
      getCollection(`users/${user.uid}/quizzes`).then((q) => setQuizzesCount(q.length));
      getCollection(`users/${user.uid}/interviews`).then((i) => setInterviewsCount(i.length));
      getCollection(`users/${user.uid}/notes`).then((n) => setNotesCount(n.length));
    }
  }, [user]);

  if (!user) return null;

  const maxHours = Math.max(...WEEKLY.map((w) => w.hours));

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">Metrics Evaluation</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Analytics</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Review study metrics, quiz score trends, weak-area assessments, and aggregate session hours.</p>
      </div>

      {/* Grid: 3 Stats Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs text-slate-400 uppercase font-semibold">Assessments Taken</span>
          <span className="text-2xl font-black text-white">{quizzesCount} Quizzes</span>
          <span className="text-[10px] text-slate-500 mt-1">Logged from Quiz Center</span>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs text-slate-400 uppercase font-semibold">Mocks Answered</span>
          <span className="text-2xl font-black text-white">{interviewsCount} Interviews</span>
          <span className="text-[10px] text-slate-500 mt-1">Submitted for AI check</span>
        </div>

        <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl flex flex-col gap-1.5">
          <span className="text-xs text-slate-400 uppercase font-semibold">Guide Sheets Compiled</span>
          <span className="text-2xl font-black text-white">{notesCount} Note Sets</span>
          <span className="text-[10px] text-slate-500 mt-1">Stored in personal notebook</span>
        </div>
      </div>

      {/* Grid Layout Graphs & Weakness checklists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Study Consistency Chart */}
        <div className="lg:col-span-8 w-full flex flex-col gap-6">
          <div className="glass-panel border border-white/10 rounded-3xl p-5 shadow-md flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-blue-400" />
              Weekly Study Hours
            </h3>

            {/* Custom SVG Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-4 bg-slate-950/45 rounded-2xl border border-white/5">
              {WEEKLY.map((w, idx) => {
                const percent = maxHours > 0 ? (w.hours / maxHours) * 100 : 0;
                return (
                  <div key={w.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                    {/* Tooltip value */}
                    <div className="absolute -top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <span className="text-[9px] bg-slate-900 px-1 py-0.5 rounded text-white font-bold font-mono">
                        {w.hours}h
                      </span>
                    </div>

                    <div className="w-full bg-slate-900 rounded-t-lg h-full flex items-end overflow-hidden">
                      <motion.div
                        className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 origin-bottom"
                        initial={{ height: 0 }}
                        animate={{ height: `${percent}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.04 }}
                      ></motion.div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 font-mono mt-1 shrink-0">{w.day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Weakness index list */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          <div className="glass-panel border border-white/10 rounded-3xl p-5 shadow-md flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Adaptive review checklist
            </h3>

            <div className="flex flex-col gap-3">
              {user.weakAreas && user.weakAreas.length > 0 ? (
                user.weakAreas.map((w) => (
                  <div key={w} className="flex gap-2.5 bg-slate-950/60 border border-white/5 p-3 rounded-xl items-center text-xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    <span className="text-slate-300 capitalize truncate flex-1">{w}</span>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                      Needs check
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex gap-2.5 bg-emerald-500/5 border border-emerald-500/10 p-3.5 rounded-xl items-center text-xs text-emerald-400">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  <span>No weak areas reported. Keep up the clean streak!</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
