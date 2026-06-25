"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Briefcase, MapPin, Award, CheckCircle2, ArrowRight, Building2, HelpCircle } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  matchingScore: number;
  minXpRequired: number;
}

const JOBS: Job[] = [
  { id: 1, title: "Junior React Developer Intern", company: "Systems Limited (Partner)", location: "Lahore / Hybrid", type: "Virtual Internship", matchingScore: 95, minXpRequired: 100 },
  { id: 2, title: "Associate Frontend Engineer", company: "VentureDive (Partner)", location: "Karachi / Remote", type: "Full-Time Job", matchingScore: 88, minXpRequired: 200 },
  { id: 3, title: "Machine Learning Intern", company: "10Pearls (Partner)", location: "Islamabad / Hybrid", type: "Virtual Internship", matchingScore: 92, minXpRequired: 150 },
  { id: 4, title: "Python API Backend Intern", company: "Internee.pk Studio", location: "Remote", type: "Virtual Internship", matchingScore: 90, minXpRequired: 100 },
  { id: 5, title: "Associate Data Analyst", company: "Devsinc (Partner)", location: "Lahore / Hybrid", type: "Full-Time Job", matchingScore: 85, minXpRequired: 250 },
];

export default function CareerGuidance() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<{ [jId: number]: string }>({});

  if (!user) return null;

  const currentTrackCategory = 
    user.careerTrack === "frontend" ? "React" : user.careerTrack === "ml" ? "Machine" : "Python";

  // Filter jobs based on matching terms in track
  const matchingJobs = JOBS.filter(j => 
    j.title.includes(currentTrackCategory) || j.title.includes("Data")
  );

  const handleApply = (jobId: number) => {
    setApplications({ ...applications, [jobId]: "Submitted" });
    // Animate status update
    setTimeout(() => {
      setApplications(prev => ({ ...prev, [jobId]: "Under Evaluation" }));
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">Career Pathways</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Career Guidance</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Explore virtual internship vacancies at Internee.pk partner employers tailored to your roadmap progress.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Job Match Matches list */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-5 h-5 text-blue-400" />
            Recommended Partner Internships
          </h3>

          <div className="flex flex-col gap-4">
            {matchingJobs.map((job) => {
              const appliedStatus = applications[job.id];
              const isXpLocked = user.totalXP < job.minXpRequired;

              return (
                <div 
                  key={job.id}
                  className={`glass-panel border rounded-3xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all ${
                    isXpLocked ? "border-white/5 opacity-60" : "border-white/10 hover:bg-slate-900/40"
                  }`}
                >
                  <div className="flex flex-col gap-2.5 text-left">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm sm:text-base text-slate-100">{job.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 uppercase tracking-wider">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  {/* Matching & Action block */}
                  <div className="flex items-center gap-4.5 justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-2.5 sm:pt-0 shrink-0">
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] text-slate-500 font-bold uppercase">Match Rate</span>
                      <span className="text-sm font-black text-cyan-400">{job.matchingScore}%</span>
                    </div>

                    {isXpLocked ? (
                      <div className="flex flex-col text-right items-end">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">XP Required</span>
                        <span className="text-xs text-slate-400 font-bold">{job.minXpRequired} XP</span>
                      </div>
                    ) : appliedStatus ? (
                      <span className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                        appliedStatus === "Submitted" 
                          ? "bg-blue-600/10 border-blue-500/20 text-blue-400"
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 animate-pulse"
                      }`}>
                        {appliedStatus}
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 active:scale-95 transition-all"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Career Guidance guidelines */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel border border-white/10 rounded-3xl p-5 shadow-md flex flex-col gap-3.5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-blue-400" />
              XP Threshold Lock
            </h3>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              Employers require a minimum **XP threshold** to apply. This ensures you have completed the prerequisite roadmap topics and mock evaluations before client screening starts. Keep learning to unlock premium full-time roles!
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
