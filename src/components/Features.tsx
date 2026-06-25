"use client";

import { motion } from "framer-motion";
import { Brain, Map, Code, Users, BarChart3, RotateCw, Lightbulb, ShieldAlert, Cpu } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "AI Concept Demystifier",
    description: "Translates high-level technical definitions into simple, personalized analogies based on what you already know.",
    color: "text-blue-400 border-blue-500/10 hover:border-blue-500/30",
    bgColor: "bg-blue-500/5",
  },
  {
    icon: Map,
    title: "Smart Roadmap Builder",
    description: "Generates custom visual tracks with step-by-step milestones, estimating time-to-mastery and coding exercises.",
    color: "text-cyan-400 border-cyan-500/10 hover:border-cyan-500/30",
    bgColor: "bg-cyan-500/5",
  },
  {
    icon: Code,
    title: "Interactive Code Sandboxes",
    description: "Practice coding directly in your conversation page. Get instant line-by-line syntax optimization and code reviews.",
    color: "text-indigo-400 border-indigo-500/10 hover:border-indigo-500/30",
    bgColor: "bg-indigo-500/5",
  },
  {
    icon: Users,
    title: "AI Mock Interviews",
    description: "Simulates actual technical rounds tailored to React, Python, or systems engineering. Receives grades and direct feedbacks.",
    color: "text-purple-400 border-purple-500/10 hover:border-purple-500/30",
    bgColor: "bg-purple-500/5",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track visual metrics representing learning hours, master topics, roadmap gaps, and estimated readiness scores.",
    color: "text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30",
    bgColor: "bg-emerald-500/5",
  },
  {
    icon: RotateCw,
    title: "Curriculum Syncing",
    description: "Upload any university syllabus or bootcamp curriculum. The AI maps it automatically to provide helpful context guides.",
    color: "text-rose-400 border-rose-500/10 hover:border-rose-500/30",
    bgColor: "bg-rose-500/5",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950/50 border-y border-white/5 relative">
      {/* Background Lights */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full radial-glow-purple pointer-events-none translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Cutting-Edge Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Everything you need to master tech skills in record time.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Standard learning platforms offer generic tutorials. InterneeAI adapts in real-time, functioning as a dedicated 1-on-1 private tutor.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={cardVariants}
                className={`glass-panel border p-7 rounded-2xl flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group hover:bg-slate-900/80 ${feat.color}`}
              >
                <div className={`w-12 h-12 rounded-xl ${feat.bgColor} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white transition-colors duration-200">
                    {feat.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
