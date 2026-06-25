"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, Brain, Clock, ChevronRight, CheckCircle2, RefreshCw } from "lucide-react";
import { setDocument } from "@/lib/firebase";

const TRACKS = [
  { id: "frontend", name: "Frontend React Developer", icon: "⚛️", desc: "HTML/CSS, Tailwind, JavaScript ES6, React, Next.js" },
  { id: "ml", name: "Machine Learning Engineer", icon: "🧠", desc: "Python, NumPy, Pandas, Linear Algebra, Scikit-Learn, PyTorch" },
  { id: "backend", name: "Python Backend Developer", icon: "🐍", desc: "Python, Django, FastAPI, Databases, SQL, REST APIs" },
  { id: "analytics", name: "Data Analyst", icon: "📊", desc: "Excel, SQL, Tableau, PowerBI, Pandas, Statistics" },
];

const EXPERIENCE = [
  { id: "none", name: "Absolute Beginner", desc: "I have never written code before or am switching fields." },
  { id: "beginner", name: "Beginner", desc: "I know coding fundamentals but cannot build projects yet." },
  { id: "intermediate", name: "Intermediate", desc: "I can build projects but want to master architectures." },
];

const TIMELINES = [
  { id: "2weeks", name: "Fast Track", desc: "2 Weeks (approx 15-20 hours / week)" },
  { id: "1month", name: "Standard Track", desc: "1 Month (approx 8-10 hours / week)" },
  { id: "3months", name: "Comprehensive", desc: "3 Months (approx 3-5 hours / week)" },
];

export default function Onboarding() {
  const { user, updateUserProfile, loading } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [selectedExp, setSelectedExp] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user && user.isOnboarded) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const generationMessages = [
    "Analyzing target skillset parameters...",
    "Formulating optimal learning nodes sequence...",
    "Constructing customized core analogies...",
    "Drafting code sandbox templates...",
    "Structuring analytics progress gauges...",
    "Saving roadmap to student record...",
  ];

  const handleOnboard = async () => {
    setGenerating(true);
    
    // Cycle messages for visual aesthetic
    const interval = setInterval(() => {
      setGenerationStep((prev) => (prev < generationMessages.length - 1 ? prev + 1 : prev));
    }, 800);

    try {
      // 1. Call route API or run local fallback generator
      let roadmapData = null;
      try {
        const res = await fetch("/api/generate-roadmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ track: selectedTrack, experience: selectedExp, timeline: selectedTime }),
        });
        if (res.ok) {
          roadmapData = await res.json();
        }
      } catch (e) {
        console.warn("Roadmap API call failed. Using local mockup fallback.");
      }

      // If API failed or was empty, mock data
      if (!roadmapData) {
        // Generate mock milestones based on track
        const trackObj = TRACKS.find(t => t.id === selectedTrack);
        roadmapData = {
          trackName: trackObj?.name || "Custom Track",
          progress: 0,
          milestones: [
            { id: 1, title: "Fundamentals & Syntax Essentials", duration: "3-5 hrs", completed: false, topics: ["Basic constructs", "Keywords", "File setup"] },
            { id: 2, title: "Intermediate Libraries & Functions", duration: "6-8 hrs", completed: false, topics: ["Data models", "Arrays", "API parsing"] },
            { id: 3, title: "Architectural Workflows & Logic", duration: "10-12 hrs", completed: false, topics: ["Design systems", "Component structures", "Caching"] },
            { id: 4, title: "Capstone Mock Projects Practice", duration: "12-15 hrs", completed: false, topics: ["Integration runs", "Sandboxed reviews", "Unit checks"] },
          ]
        };
      }

      // 2. Save roadmap document
      const currentTrackId = selectedTrack;
      await setDocument(`users/${user?.uid}/roadmaps`, currentTrackId, roadmapData);

      // 3. Update User Profile
      await updateUserProfile({
        isOnboarded: true,
        careerTrack: selectedTrack,
        experience: selectedExp,
        timeline: selectedTime,
        streakCount: 1,
        totalXP: 50, // Onboarding bonus XP!
        lastActiveDate: new Date().toISOString().split("T")[0],
      });

      clearInterval(interval);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setGenerating(false);
      clearInterval(interval);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <RefreshSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] rounded-full radial-glow-blue pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-40"></div>

      <div className="w-full max-w-2xl relative z-10">
        
        {/* Onboarding Header */}
        <div className="flex flex-col items-center gap-3 mb-10 text-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-5.5 h-5.5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Configure Your AI Coach</h1>
          <p className="text-slate-400 text-xs sm:text-sm">Step {step} of 3 • Let's adapt the curriculum to your schedule and goals.</p>
        </div>

        {/* Step Cards panels */}
        <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[380px] flex flex-col justify-between">
          
          {generating ? (
            /* Roadmap AI Generation Screen */
            <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 animate-pulse">
                  <Brain className="w-8 h-8" />
                </div>
                <div className="absolute -inset-1.5 rounded-3xl border border-dashed border-cyan-400/50 animate-spin-slow"></div>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Generating Personalized Roadmap</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-6 max-w-sm">Please hold on. Our AI models are mapping your skillset, timeline, and topics...</p>
              
              {/* Message ticker */}
              <div className="bg-slate-950/80 border border-white/5 px-5 py-3.5 rounded-xl font-mono text-[11px] text-cyan-400 min-w-[280px]">
                {generationMessages[generationStep]}
              </div>
            </div>
          ) : (
            <>
              {/* Step 1: Track Selection */}
              {step === 1 && (
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-500/25 text-blue-400 text-xs flex items-center justify-center font-bold">1</span>
                    Select your career goal track
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {TRACKS.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => setSelectedTrack(track.id)}
                        className={`text-left p-4.5 rounded-2xl border transition-all duration-200 ${
                          selectedTrack === track.id
                            ? "bg-blue-950/40 border-blue-500 text-white"
                            : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-xl">{track.icon}</span>
                          <h4 className="font-bold text-sm text-white">{track.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal pl-8">{track.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Experience Selection */}
              {step === 2 && (
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-500/25 text-blue-400 text-xs flex items-center justify-center font-bold">2</span>
                    What is your experience level?
                  </h3>
                  <div className="flex flex-col gap-4">
                    {EXPERIENCE.map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => setSelectedExp(exp.id)}
                        className={`text-left p-4.5 rounded-2xl border transition-all duration-200 ${
                          selectedExp === exp.id
                            ? "bg-blue-950/40 border-blue-500 text-white"
                            : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                        }`}
                      >
                        <h4 className="font-bold text-sm text-white mb-1">{exp.name}</h4>
                        <p className="text-[11px] text-slate-400 leading-normal">{exp.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Timeline Selection */}
              {step === 3 && (
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-blue-500/25 text-blue-400 text-xs flex items-center justify-center font-bold">3</span>
                    Choose your target timeline
                  </h3>
                  <div className="flex flex-col gap-4">
                    {TIMELINES.map((time) => (
                      <button
                        key={time.id}
                        onClick={() => setSelectedTime(time.id)}
                        className={`text-left p-4.5 rounded-2xl border transition-all duration-200 ${
                          selectedTime === time.id
                            ? "bg-blue-950/40 border-blue-500 text-white"
                            : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <h4 className="font-bold text-sm text-white">{time.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal">{time.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div className="flex justify-between items-center mt-8 border-t border-white/5 pt-6">
                <button
                  disabled={step === 1}
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-slate-400 hover:text-white text-xs sm:text-sm font-semibold disabled:opacity-30"
                >
                  Back
                </button>

                {step < 3 ? (
                  <button
                    disabled={(step === 1 && !selectedTrack) || (step === 2 && !selectedExp)}
                    onClick={() => setStep(step + 1)}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 disabled:opacity-40"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled={!selectedTime}
                    onClick={handleOnboard}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20"
                  >
                    Generate AI Roadmap
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

function RefreshSpinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
      <span className="text-xs text-slate-500 font-semibold tracking-wide">Syncing profile sessions...</span>
    </div>
  );
}
