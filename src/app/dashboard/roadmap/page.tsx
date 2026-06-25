"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getDocument, setDocument, updateDocument } from "@/lib/firebase";
import { Check, Clock, Compass, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface Milestone {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  topics: string[];
}

interface RoadmapData {
  trackName: string;
  progress: number;
  milestones: Milestone[];
}

export default function StudentRoadmap() {
  const { user, updateUserProfile } = useAuth();
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid && user?.careerTrack) {
      getDocument(`users/${user.uid}/roadmaps`, user.careerTrack)
        .then((data) => {
          if (data) setRoadmap(data as RoadmapData);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  const toggleMilestone = async (milestoneId: number) => {
    if (!roadmap || !user) return;

    let xpReward = 0;
    const updatedMilestones = roadmap.milestones.map((m) => {
      if (m.id === milestoneId) {
        const nextState = !m.completed;
        xpReward = nextState ? 30 : -30;
        return { ...m, completed: nextState };
      }
      return m;
    });

    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const progressPct = Math.round((completedCount / updatedMilestones.length) * 100);

    const updatedRoadmap = {
      ...roadmap,
      progress: progressPct,
      milestones: updatedMilestones,
    };

    setRoadmap(updatedRoadmap);

    // Save to Firestore
    await setDocument(`users/${user.uid}/roadmaps`, user.careerTrack!, updatedRoadmap);

    // Update User Profile XP & Streak
    await updateUserProfile({
      totalXP: Math.max(0, user.totalXP + xpReward),
    });

    // Confetti effect on milestone completion!
    if (xpReward > 0) {
      import("canvas-confetti").then((module) => {
        module.default({
          particleCount: 80,
          spread: 60,
          colors: ["#3B82F6", "#06B6D4", "#10B981"],
        });
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 border border-white/5 rounded-3xl bg-slate-900/10">
        <AlertCircle className="w-12 h-12 text-slate-500 mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No Active Roadmap</h3>
        <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-6">
          You don't have a learning roadmap generated yet. Head over to Onboarding or click below to build one!
        </p>
        <a
          href="/onboarding"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
        >
          Go to Setup Wizard
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header with progress */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-white/5">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">Interactive Syllabus</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white capitalize">
            {roadmap.trackName.replace("-", " ")}
          </h1>
        </div>

        {/* Progress gauge */}
        <div className="flex items-center gap-3 w-full sm:w-auto bg-slate-950 px-5 py-3 rounded-2xl border border-white/5 shrink-0">
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-slate-500 font-bold uppercase">Completion</span>
            <span className="text-sm font-black text-cyan-400">{roadmap.progress}% Completed</span>
          </div>
          <div className="w-28 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
              style={{ width: `${roadmap.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Grid container layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Milestones chain vertical timeline */}
        <div className="lg:col-span-8 flex flex-col gap-6 relative pl-8">
          {/* Connection vertical line */}
          <div className="absolute top-8 bottom-8 left-[17px] w-0.5 bg-slate-800"></div>

          {roadmap.milestones.map((milestone, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              key={milestone.id}
              className="relative flex gap-4"
            >
              {/* Checkbox node absolute */}
              <button
                onClick={() => toggleMilestone(milestone.id)}
                className={`absolute -left-[32px] top-1 w-7.5 h-7.5 rounded-full border flex items-center justify-center z-10 transition-all ${
                  milestone.completed
                    ? "bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500"
                }`}
              >
                {milestone.completed ? (
                  <Check className="w-4 h-4 stroke-[3px]" />
                ) : (
                  <span className="text-xs font-bold font-mono">{milestone.id}</span>
                )}
              </button>

              {/* Core card information */}
              <div className="flex-1 bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all">
                <div className="flex flex-col gap-2">
                  <h3 className={`font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2 ${
                    milestone.completed ? "line-through text-slate-500" : ""
                  }`}>
                    {milestone.title}
                    {milestone.completed && (
                      <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-400 font-bold uppercase tracking-wider">
                        +30 XP Earned
                      </span>
                    )}
                  </h3>

                  {/* Topics badges */}
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {milestone.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] bg-slate-950 px-2.5 py-0.5 rounded-md text-slate-400 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>{milestone.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel border border-white/10 rounded-3xl p-5 shadow-md flex flex-col gap-3.5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              How it works
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Check off completed milestones to reward yourself with **30 XP** each. When you reach **100%**, you unlock certification assessments.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
