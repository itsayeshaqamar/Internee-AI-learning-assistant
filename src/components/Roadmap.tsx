"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Compass, ChevronRight, Play, Lock, BookOpen, Clock, Sparkles } from "lucide-react";

type Milestone = {
  id: number;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
};

type Track = {
  name: string;
  icon: string;
  description: string;
  milestones: Milestone[];
};

const TRACKS: Track[] = [
  {
    name: "Frontend React Developer",
    icon: "⚛️",
    description: "Master modern user interfaces, component design, responsive styling, and Server Components in Next.js.",
    milestones: [
      {
        id: 1,
        title: "Web Essentials & Tailwind CSS",
        duration: "4 hours",
        difficulty: "Beginner",
        topics: ["HTML5 Semantic Structure", "Tailwind Box Model & Flexbox", "Responsive CSS Media Queries"],
      },
      {
        id: 2,
        title: "JavaScript ES6+ & DOM Operations",
        duration: "8 hours",
        difficulty: "Beginner",
        topics: ["Promises & Fetch APIs", "Destructuring & Map/Reduce", "Event Handlers & LocalStorage"],
      },
      {
        id: 3,
        title: "React Core & Custom Hooks",
        duration: "12 hours",
        difficulty: "Intermediate",
        topics: ["useState & useEffect cycles", "Custom hooks creation", "Performance optimizations (useMemo)"],
      },
      {
        id: 4,
        title: "Next.js App Routing & Server Components",
        duration: "15 hours",
        difficulty: "Intermediate",
        topics: ["Layouts & Routing", "React Server Components (RSC)", "Dynamic Fetching & Cache Options"],
      },
      {
        id: 5,
        title: "Global State & API Integration",
        duration: "10 hours",
        difficulty: "Advanced",
        topics: ["Zustand / Redux Toolkit", "Server Actions integration", "JWT token-based authentications"],
      },
    ],
  },
  {
    name: "Machine Learning Engineer",
    icon: "🧠",
    description: "Build, evaluate, and deploy intelligent models from linear equations to deep neural networks.",
    milestones: [
      {
        id: 1,
        title: "Python Foundation & OOP Principles",
        duration: "6 hours",
        difficulty: "Beginner",
        topics: ["Iterators & Generator Yields", "Classes & Inheritances", "Virtual Environment Managers"],
      },
      {
        id: 2,
        title: "Data Manipulation (NumPy & Pandas)",
        duration: "10 hours",
        difficulty: "Beginner",
        topics: ["Array slices & dot products", "DataFrame merges & filters", "Handling missing values"],
      },
      {
        id: 3,
        title: "Applied Linear Algebra & Statistics",
        duration: "8 hours",
        difficulty: "Intermediate",
        topics: ["Vectors, eigenvalues, gradients", "Probability densities", "Hypothesis testing & p-values"],
      },
      {
        id: 4,
        title: "Supervised Models (Scikit-Learn)",
        duration: "15 hours",
        difficulty: "Intermediate",
        topics: ["Linear/Logistic Regression", "Random Forest ensembles", "Cross-validation & F1 scores"],
      },
      {
        id: 5,
        title: "PyTorch & Deep Learning Models",
        duration: "20 hours",
        difficulty: "Advanced",
        topics: ["Tensors & backpropagations", "Convolutional Neural Nets (CNN)", "Transformer attention layers"],
      },
    ],
  },
  {
    name: "Data Analyst",
    icon: "📊",
    description: "Analyze datasets, build interactive dashboards, write advanced database queries, and report insights.",
    milestones: [
      {
        id: 1,
        title: "SQL Querying & Database Basics",
        duration: "6 hours",
        difficulty: "Beginner",
        topics: ["Joins, groupings, subqueries", "Window functions", "Indexing & query planner reviews"],
      },
      {
        id: 2,
        title: "Pandas Wrangling & Visualizations",
        duration: "8 hours",
        difficulty: "Beginner",
        topics: ["Matplotlib & Seaborn plots", "Pivot tables", "Time-series index calculations"],
      },
      {
        id: 3,
        title: "Interactive Dashboards (Tableau/BI)",
        duration: "12 hours",
        difficulty: "Intermediate",
        topics: ["Data blending & unions", "Calculated metrics", "Dynamic action filters"],
      },
      {
        id: 4,
        title: "Exploratory Data Analysis (EDA)",
        duration: "10 hours",
        difficulty: "Intermediate",
        topics: ["Correlation checks", "Outlier removals", "Feature correlation heatmaps"],
      },
      {
        id: 5,
        title: "A/B Testing & Business Analytics",
        duration: "12 hours",
        difficulty: "Advanced",
        topics: ["Sample size calculations", "Z-tests and T-tests", "Presenting dashboard conclusions"],
      },
    ],
  },
];

export default function Roadmap() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [completedNodes, setCompletedNodes] = useState<{ [trackIdx: number]: number[] }>({
    0: [1],
    1: [],
    2: [],
  });

  const activeTrack = TRACKS[activeTrackIndex];
  const completedList = completedNodes[activeTrackIndex] || [];
  const percentComplete = Math.round((completedList.length / activeTrack.milestones.length) * 100);

  const toggleNode = (nodeId: number) => {
    const prevList = completedNodes[activeTrackIndex] || [];
    let newList;
    if (prevList.includes(nodeId)) {
      newList = prevList.filter((id) => id !== nodeId);
    } else {
      newList = [...prevList, nodeId];
    }

    const updated = { ...completedNodes, [activeTrackIndex]: newList };
    setCompletedNodes(updated);

    // If reaching 100%, launch confetti dynamically
    if (newList.length === activeTrack.milestones.length) {
      import("canvas-confetti").then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#3B82F6", "#06B6D4", "#10B981"],
        });
      });
    }
  };

  return (
    <section id="roadmaps" className="py-24 bg-slate-950/20 relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full radial-glow-blue pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-60"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-blue-400 animate-spin-slow" />
            Curriculum Map
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Interactive Learning Roadmaps
          </h2>
          <p className="text-slate-400">
            Select a specialized career path below. Interactive nodes reflect real-time progress calculations. Complete nodes to test your knowledge!
          </p>
        </div>

        {/* Outer Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Tracks Selection List */}
          <div className="lg:col-span-4 flex flex-col gap-3.5">
            {TRACKS.map((track, idx) => (
              <button
                key={track.name}
                onClick={() => setActiveTrackIndex(idx)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                  activeTrackIndex === idx
                    ? "bg-blue-950/45 border-blue-500/50 shadow-md shadow-blue-500/10 text-white"
                    : "glass-panel border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-3.5 mb-2">
                  <span className="text-2xl">{track.icon}</span>
                  <h3 className="font-bold text-base text-white">{track.name}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-9">
                  {track.description}
                </p>
              </button>
            ))}

            {/* Simulated locked track */}
            <div className="relative overflow-hidden p-5 rounded-2xl border border-white/5 bg-slate-950/40 text-slate-500 flex items-center justify-between group">
              <div className="flex items-center gap-3.5">
                <span className="text-2xl grayscale">🛡️</span>
                <div>
                  <h3 className="font-bold text-base text-slate-500">Security Engineer</h3>
                  <p className="text-xs text-slate-600">Locked inside trial version</p>
                </div>
              </div>
              <Lock className="w-4 h-4 text-slate-600" />
            </div>
          </div>

          {/* Right: Detailed Roadmap Nodes */}
          <div className="lg:col-span-8 glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-8 shadow-xl">
            {/* Roadmap Track Header with Progress Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>{activeTrack.name} Path</span>
                  <span className="text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-lg">
                    Level Up
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">Check circles below as you finish topics to simulate mastery updates.</p>
              </div>

              {/* Progress Ring / Bar */}
              <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                <div className="flex-1 sm:w-32 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentComplete}%` }}
                    transition={{ duration: 0.4 }}
                  ></motion.div>
                </div>
                <span className="text-sm font-bold text-cyan-400 shrink-0 w-10 text-right">
                  {percentComplete}%
                </span>
              </div>
            </div>

            {/* Nodes Chain List */}
            <div className="flex flex-col gap-6 relative pl-6 sm:pl-8">
              {/* Central Connection Line */}
              <div className="absolute top-8 bottom-8 left-[17px] sm:left-[21px] w-0.5 bg-slate-800"></div>

              {activeTrack.milestones.map((milestone, mIdx) => {
                const isCompleted = completedList.includes(milestone.id);
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: mIdx * 0.08 }}
                    key={milestone.id}
                    className="relative flex gap-4 group"
                  >
                    {/* Node Interactive Checkbox Indicator */}
                    <button
                      onClick={() => toggleNode(milestone.id)}
                      className={`absolute -left-[30px] sm:-left-[34px] top-1 w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                        isCompleted
                          ? "bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/25"
                          : "bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500 group-hover:scale-105"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      ) : (
                        <span className="text-xs font-bold">{milestone.id}</span>
                      )}
                    </button>

                    {/* Content Block */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-white/10 rounded-2xl p-4.5 transition-all duration-200">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                          <span className={isCompleted ? "line-through text-slate-400" : ""}>
                            {milestone.title}
                          </span>
                          {isCompleted && (
                            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-semibold">
                              Mastered
                            </span>
                          )}
                        </h4>

                        {/* Topics List */}
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {milestone.topics.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] bg-slate-950 px-2 py-0.5 rounded-md text-slate-400 border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Meta (Time, Level, Play Icon) */}
                      <div className="flex items-center gap-4 justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0 shrink-0">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{milestone.duration}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                          milestone.difficulty === "Beginner"
                            ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                            : milestone.difficulty === "Intermediate"
                            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                            : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                        }`}>
                          {milestone.difficulty}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Celebrations display */}
            {percentComplete === 100 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between text-emerald-400 gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Path Complete!</h5>
                    <p className="text-xs text-emerald-500/80">You unlocked the certification exam for this course track.</p>
                  </div>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors shrink-0 shadow-lg shadow-emerald-500/25">
                  Claim Certificate
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
