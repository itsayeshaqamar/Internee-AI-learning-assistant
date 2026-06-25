"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "How does the AI personalize my learning path?",
    answer: "Our engine uses your inputted background knowledge (e.g. 'I know basic Python') to build custom explanations. It translates complex topics into analogies matching your baseline, skipping concepts you have already mastered.",
  },
  {
    question: "Can I sync the coach with my university syllabus or bootcamp?",
    answer: "Absolutely! You can upload syllabus PDFs or screenshot images. The coach maps your curriculum, creating matching reviews, schedules, and quizzes that align with your university exam dates.",
  },
  {
    question: "Are mock interviews graded based on actual corporate criteria?",
    answer: "Yes. The AI evaluator rates responses on syntax precision, computational complexity (Big O), and structural logic, mirroring grading schemas utilized by actual engineering hiring managers.",
  },
  {
    question: "Is there a fee after the 30-day free trial?",
    answer: "Our basic learning features remain 100% free for active students doing virtual internships on Internee.pk. For non-interns or advanced paths (ML / cloud tracks), subscription plans start at $9/month.",
  },
  {
    question: "Can I write and compile code inside the tutor sandbox?",
    answer: "Yes, our chat simulator contains inline execution sandboxes. You can render interactive React blocks, execute Python operations, or test SQL query schemas and see visual outputs directly.",
  },
];

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-950/20 border-b border-white/5 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4.5 h-4.5 text-cyan-400" />
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Got questions? We've got answers.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about InterneeAI Learning Coach, features, pricing, and sync options.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={faq.question}
                className="glass-panel border border-white/5 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-200 hover:text-white">
                    {faq.question}
                  </span>
                  <span className="p-1 rounded-lg bg-slate-900 border border-white/10 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 bg-slate-950/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
