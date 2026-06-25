"use client";

import { motion } from "framer-motion";
import { MessageSquare, Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ayesha Khan",
    role: "Frontend Engineer at Systems Ltd",
    image: "👩‍💻",
    quote: "The personalized analogies saved me days of frustration. It explained React render cycles by comparing them to drawing frames in flipbooks. I cleared my interview in just 2 weeks!",
    rating: 5,
  },
  {
    name: "Bilal Ahmed",
    role: "Associate Data Analyst",
    image: "👨‍💻",
    quote: "Creating dynamic roadmaps on InterneeAI showed me exactly what was required for data entry and SQL analysis jobs. The mock interview feedback was exceptionally accurate.",
    rating: 5,
  },
  {
    name: "Zainab Fatima",
    role: "ML Intern at VentureDive",
    image: "👩‍🔬",
    quote: "Uploading my university syllabus synced my studies instantly. I could test myself on neural net forward runs and get grades instantly. Highly recommended!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-950/20 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
            <MessageSquare className="w-4.5 h-4.5 text-blue-400" />
            Student success stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Loved by thousands of students
          </h2>
          <p className="text-slate-400">
            Hear how graduates and interns from Internee.pk used our learning coach to level up their development skills.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              key={t.name}
              className="glass-panel border border-white/5 hover:border-white/10 rounded-3xl p-7 relative flex flex-col justify-between group transition-all"
            >
              <div className="absolute top-6 right-6 text-white/5 pointer-events-none group-hover:text-blue-500/10 transition-colors">
                <Quote className="w-16 h-16 transform rotate-180 fill-current" />
              </div>

              <div className="flex flex-col gap-4">
                {/* Rating */}
                <div className="flex items-center text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm leading-relaxed italic relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-3.5 mt-8 border-t border-white/5 pt-5">
                <div className="w-11 h-11 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xl">
                  {t.image}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{t.name}</h4>
                  <span className="text-xs text-slate-400 mt-0.5 block">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
