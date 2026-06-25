"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Play, CheckCircle2 } from "lucide-react";
import ChatDemo from "./ChatDemo";

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-blue pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full radial-glow-cyan pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Introducing InterneeAI Coach v2.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
          >
            Your Personal <br />
            AI Learning Coach for <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent text-glow-blue">
              Internee.pk
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed mb-8"
          >
            Built specifically to help interns complete learning modules, generate personalized study plans, track progress, identify weak areas, create quizzes, and receive intelligent tutoring recommendations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8"
          >
            <a
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              Explore Learning Modules
            </a>
          </motion.div>

          {/* Trust Indicators badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs sm:text-sm text-slate-400 font-semibold w-full max-w-md text-left"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              Personalized Roadmaps
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              AI Tutor Support
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              Progress Tracking
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              Weak Area Detection
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              Adaptive Learning
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5 text-cyan-400 shrink-0" />
              Quiz Generation
            </span>
          </motion.div>
        </div>

        {/* Right Chat Demo */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
