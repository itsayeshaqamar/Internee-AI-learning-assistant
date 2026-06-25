"use client";

import { useAuth } from "@/context/AuthContext";
import { 
  Flame, Star, Award, Compass, MessageSquareCode, 
  HelpCircle, UserCheck, AlertTriangle, CheckCircle2, 
  Calendar, ArrowRight, BookOpen, BrainCircuit 
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDocument } from "@/lib/firebase";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function DashboardOverview() {
  const { user } = useAuth();
  const [roadmapProgress, setRoadmapProgress] = useState(0);

  useEffect(() => {
    if (user?.uid && user?.careerTrack) {
      // Fetch progress from roadmaps collection
      getDocument(`users/${user.uid}/roadmaps`, user.careerTrack).then((roadmap) => {
        if (roadmap) {
          const milestones = roadmap.milestones || [];
          const completedCount = milestones.filter((m: any) => m.completed).length;
          const pct = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;
          setRoadmapProgress(pct);
        }
      });
    }
  }, [user]);

  if (!user) return null;

  const currentLevel = Math.floor(user.totalXP / 100) + 1;
  const xpInCurrentLevel = user.totalXP % 100;

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Welcome Hero Grid Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 border border-white/5 p-6 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full radial-glow-blue pointer-events-none"></div>
        
        <div className="flex flex-col gap-1.5 relative z-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Current Goal: <span className="font-semibold text-cyan-400 capitalize">{user.careerTrack?.replace("-", " ") || "Not Configured"}</span> • Keep studying to maintain your streak!
          </p>
        </div>

        <Link
          href="/dashboard/roadmap"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 z-10 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          Resume Studies
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid: 4 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Active Streak */}
        <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Streak</span>
            <Flame className="w-5 h-5 text-orange-400 fill-current animate-pulse" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">{user.streakCount} Days</span>
            <span className="text-[10px] text-orange-400 block font-semibold mt-1">+1 streak point awarded today</span>
          </div>
        </div>

        {/* Level & XP progression */}
        <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Student Level</span>
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">Level {currentLevel}</span>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5 mt-1.5">
              <div className="h-full bg-yellow-400" style={{ width: `${xpInCurrentLevel}%` }}></div>
            </div>
            <span className="text-[9px] text-slate-500 block mt-1">{xpInCurrentLevel}/100 XP to next level</span>
          </div>
        </div>

        {/* Roadmap Progress completion */}
        <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Path Progress</span>
            <Compass className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">{roadmapProgress}%</span>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5 mt-1.5">
              <div className="h-full bg-cyan-400" style={{ width: `${roadmapProgress}%` }}></div>
            </div>
            <span className="text-[9px] text-slate-500 block mt-1">Calculated from checkable milestones</span>
          </div>
        </div>

        {/* Total Mastered badging */}
        <div className="bg-slate-900/50 border border-white/5 p-5 rounded-2xl flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total XP Score</span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white">{user.totalXP} Total</span>
            <span className="text-[10px] text-purple-400 block font-semibold mt-1">Accumulated from activities</span>
          </div>
        </div>

      </div>

      {/* Grid: Weakness Detection warning card & Weekly streaks map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Weak-Area Detection Warning Card */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {user.weakAreas && user.weakAreas.length > 0 ? (
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-3xl p-5 flex gap-4 text-amber-300">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-400 border border-amber-500/20">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1 flex flex-col gap-1.5 text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">Weak Area Detected</span>
                <h4 className="font-bold text-sm text-slate-100">
                  We noticed you struggled with: <span className="text-amber-400 capitalize">{user.weakAreas.join(", ")}</span>
                </h4>
                <p className="text-xs text-slate-400 leading-normal">
                  Our models suggest taking an adaptive review quiz. Practicing resolves conceptual gaps.
                </p>
                <Link
                  href="/dashboard/quiz"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-bold hover:underline"
                >
                  Launch Refresher Quiz
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/10 border border-emerald-500/25 rounded-3xl p-5 flex gap-4 text-emerald-300">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1 flex flex-col gap-1 text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">Skill Rating Clear</span>
                <h4 className="font-bold text-sm text-slate-100">All concept modules are green!</h4>
                <p className="text-xs text-slate-400 leading-normal">
                  No weak spots identified yet. Go to the Quiz Center to test your knowledge limit on advanced topics!
                </p>
              </div>
            </div>
          )}

          {/* Quick Study shortcuts */}
          <div className="glass-panel border border-white/10 rounded-3xl p-6 flex flex-col gap-4 shadow-md">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Jump back in</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/dashboard/chat" className="p-3.5 rounded-2xl bg-slate-950/50 border border-white/5 hover:bg-slate-900/80 hover:border-blue-500/30 flex flex-col gap-2 transition-all">
                <MessageSquareCode className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-xs text-white">AI Tutor Chat</span>
                <span className="text-[10px] text-slate-500 leading-normal">Ask doubts instantly</span>
              </Link>

              <Link href="/dashboard/quiz" className="p-3.5 rounded-2xl bg-slate-950/50 border border-white/5 hover:bg-slate-900/80 hover:border-cyan-500/30 flex flex-col gap-2 transition-all">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                <span className="font-bold text-xs text-white">Quiz Center</span>
                <span className="text-[10px] text-slate-500 leading-normal">Generate custom tests</span>
              </Link>

              <Link href="/dashboard/interviews" className="p-3.5 rounded-2xl bg-slate-950/50 border border-white/5 hover:bg-slate-900/80 hover:border-purple-500/30 flex flex-col gap-2 transition-all">
                <UserCheck className="w-5 h-5 text-purple-400" />
                <span className="font-bold text-xs text-white">Mock Mocks</span>
                <span className="text-[10px] text-slate-500 leading-normal">Simulate coding rounds</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Daily Streaks Calender & SVG hours chart */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Calendar tracker widget */}
          <div className="glass-panel border border-white/10 rounded-3xl p-5 shadow-md flex flex-col gap-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Weekly Streak Calendar</span>
            </div>

            <div className="flex justify-between items-center gap-1.5 pt-2">
              {WEEKDAYS.map((day, idx) => {
                // Mock: Mark Mon, Tue, Wed checked if user has streak count.
                const isActive = idx < user.streakCount;
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 font-mono">{day}</span>
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs transition-all ${
                      isActive 
                        ? "bg-orange-500/10 border-orange-500/40 text-orange-400 font-extrabold shadow-md shadow-orange-500/5" 
                        : "bg-slate-950 border-slate-800 text-slate-600"
                    }`}>
                      {isActive ? "🔥" : idx + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Core dynamic progress statistics info */}
          <div className="glass-panel border border-white/10 rounded-3xl p-5 shadow-md flex flex-col gap-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <span>Adaptive learning Engine</span>
            </div>
            
            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-white/5 text-[11px] leading-relaxed text-slate-400">
              Our engines calculate your responses. Complete milestone nodes or answer AI quizzes to update your statistics dashboard.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
