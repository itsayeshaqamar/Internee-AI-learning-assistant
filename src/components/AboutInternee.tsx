"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowUpRight, Award, Briefcase, Users, Target } from "lucide-react";

const STATS = [
  { label: "Interns Upskilled", value: "15,000+", icon: Users, color: "text-blue-400 bg-blue-500/10" },
  { label: "Partner Employers", value: "250+", icon: Briefcase, color: "text-cyan-400 bg-cyan-500/10" },
  { label: "Job Placement Rate", value: "85%", icon: Target, color: "text-emerald-400 bg-emerald-500/10" },
  { label: "Specialized Paths", value: "30+", icon: Award, color: "text-purple-400 bg-purple-500/10" },
];

export default function AboutInternee() {
  return (
    <section id="about" className="py-24 bg-slate-950/40 relative border-b border-white/5">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full radial-glow-blue pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-35"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mission Description */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-4.5 h-4.5 text-blue-400" />
              Powered by Internee.pk
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6">
              Bridging the Gap Between Learning & Careers
            </h2>
            
            <p className="text-slate-300 leading-relaxed mb-6">
              InterneeAI Learning Coach is an extension of <a href="https://internee.pk" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-semibold">Internee.pk</a>, Pakistan's leading virtual internship portal. Our mission is to democratize tech education and hands-on professional experiences.
            </p>
            
            <p className="text-slate-400 leading-relaxed mb-8">
              By merging our AI-guided personal tutors with actual industry internship programs, we provide candidates a complete pipeline: learn concepts in record time, practice on actual client mocks, and receive virtual internship credentials that companies trust.
            </p>

            <a
              href="https://internee.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold border border-white/10 hover:border-white/20 transition-all group"
            >
              Visit Internee.pk Parent Portal
              <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  key={stat.label}
                  className="glass-panel border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`w-11 h-11 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold text-white tracking-tight block">
                      {stat.value}
                    </span>
                    <span className="text-sm font-medium text-slate-400 block mt-1">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
