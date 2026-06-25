"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Clock, Award, CheckCircle2, TrendingUp, Calendar, Zap, Sparkles } from "lucide-react";

type DataPoint = {
  label: string;
  hours: number;
};

const WEEKLY_DATA: DataPoint[] = [
  { label: "Mon", hours: 2.5 },
  { label: "Tue", hours: 4.2 },
  { label: "Wed", hours: 1.8 },
  { label: "Thu", hours: 5.5 },
  { label: "Fri", hours: 3.0 },
  { label: "Sat", hours: 6.2 },
  { label: "Sun", hours: 4.5 },
];

const MONTHLY_DATA: DataPoint[] = [
  { label: "Week 1", hours: 12.5 },
  { label: "Week 2", hours: 18.2 },
  { label: "Week 3", hours: 15.8 },
  { label: "Week 4", hours: 22.4 },
];

const STATS = [
  { label: "Learning Hours", value: "27.7 hrs", change: "+12.4%", icon: Clock, color: "text-blue-400" },
  { label: "Topics Mastered", value: "14 topics", change: "+2 this week", icon: CheckCircle2, color: "text-cyan-400" },
  { label: "Success Rating", value: "92.5%", change: "+3.2% gain", icon: TrendingUp, color: "text-emerald-400" },
  { label: "Achievements", value: "6 Badges", change: "1 Pending", icon: Award, color: "text-purple-400" },
];

const ACHIEVEMENTS = [
  { title: "Recursion Master", desc: "Successfully resolved 5 structural binary tree challenges.", date: "Today" },
  { title: "SQL Joins Certified", desc: "Perfect score on database window operations assessment.", date: "2 days ago" },
  { title: "React State Guru", desc: "Implemented state management with custom hooks and storage.", date: "1 week ago" },
];

export default function Analytics() {
  const [viewMode, setViewMode] = useState<"weekly" | "monthly">("weekly");
  const data = viewMode === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;
  const maxHours = Math.max(...data.map((d) => d.hours));

  return (
    <section id="analytics" className="py-24 bg-slate-950/40 relative border-b border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-cyan pointer-events-none opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
              <BarChart className="w-4 h-4 text-blue-400" />
              Advanced Progress tracking
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Unlock Deep Learning Insights
            </h2>
            <p className="text-slate-400 leading-relaxed max-w-lg">
              Never wonder where you stand. InterneeAI tracks every key press, concept mastery, and quiz response, showing you clear pathways to target your weak spots.
            </p>

            <div className="mt-8 flex flex-col gap-4 w-full max-w-md">
              {ACHIEVEMENTS.map((ach) => (
                <div key={ach.title} className="flex gap-3 bg-slate-900/50 border border-white/5 rounded-xl p-3.5 hover:bg-slate-900/80 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-4.5 h-4.5 text-blue-400" />
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5 text-left">
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm font-semibold text-white">{ach.title}</span>
                      <span className="text-[10px] text-slate-500">{ach.date}</span>
                    </div>
                    <p className="text-xs text-slate-400">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="lg:col-span-6 glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-yellow-400" />
                  Performance Overview
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Last updated: 3 mins ago</p>
              </div>

              {/* View Toggle */}
              <div className="bg-slate-950 p-1 rounded-xl border border-white/5 flex gap-1.5">
                <button
                  onClick={() => setViewMode("weekly")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "weekly"
                      ? "bg-blue-600/20 text-blue-300 border border-blue-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setViewMode("monthly")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    viewMode === "monthly"
                      ? "bg-blue-600/20 text-blue-300 border border-blue-500/20"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-slate-950/60 border border-white/5 p-4 rounded-2xl flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">{stat.label}</span>
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-white">{stat.value}</span>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1 rounded">
                        {stat.change}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chart Block */}
            <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  Study Sessions Consistency
                </span>
                <span className="text-[11px] text-slate-400">Target: 4.0h / day</span>
              </div>

              {/* Custom SVG Bar Chart */}
              <div className="h-44 flex items-end justify-between gap-2.5 pt-4 pl-1">
                {data.map((d, index) => {
                  const percent = maxHours > 0 ? (d.hours / maxHours) * 100 : 0;
                  return (
                    <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      {/* Bar Container */}
                      <div className="w-full bg-slate-900/60 rounded-t-lg h-full relative flex items-end overflow-hidden border border-white/5">
                        {/* Interactive Hover Hours Tooltip */}
                        <div className="absolute top-1 left-0 right-0 text-center opacity-0 hover:opacity-100 transition-opacity z-10 pointer-events-none">
                          <span className="text-[9px] bg-slate-950 px-1 py-0.5 rounded text-white font-mono font-bold">
                            {d.hours}h
                          </span>
                        </div>
                        
                        {/* Actual Bar Graph Filled */}
                        <motion.div
                          className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 origin-bottom"
                          initial={{ height: 0 }}
                          animate={{ height: `${percent}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                        ></motion.div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-400 font-mono shrink-0">
                        {d.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
