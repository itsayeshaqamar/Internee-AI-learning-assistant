"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Library, Check, RefreshCw, ChevronLeft, ChevronRight, HelpCircle, Sparkles } from "lucide-react";

interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
}

const CARDS: Flashcard[] = [
  // Frontend
  { id: 1, category: "frontend", front: "What is Reconciliation in React?", back: "Reconciliation is React's algorithm to diff the virtual DOM with the real DOM, updating only the changed nodes to maintain high performance." },
  { id: 2, category: "frontend", front: "State vs. Props", back: "State represents mutable local variables initialized and managed within the component. Props are immutable parameters passed down from a parent component." },
  { id: 3, category: "frontend", front: "What are React Server Components (RSC)?", back: "RSC allows components to render on the server, sending pre-compiled HTML to the client, reducing bundle size and improving load speed." },
  // ML
  { id: 4, category: "ml", front: "Gradient Descent", back: "An optimization algorithm used to minimize the cost function by iteratively adjusting model parameters (weights) in the direction of the steepest descent." },
  { id: 5, category: "ml", front: "Overfitting vs. Underfitting", back: "Overfitting is when a model learns training data noise too well, failing on test sets. Underfitting is when it is too simple to capture patterns in either." },
  { id: 6, category: "ml", front: "What is a Transformer model?", back: "A neural net architecture utilizing self-attention mechanisms to process input tokens in parallel, widely used in NLP models like GPT." },
  // Backend
  { id: 7, category: "backend", front: "Database Indexing", back: "A data structure (often B-Trees) that speeds up retrieve operations on columns at the cost of slower writes and additional storage." },
  { id: 8, category: "backend", front: "REST vs. gRPC", back: "REST is an API architecture using HTTP methods with JSON. gRPC is a high-performance framework using HTTP/2 protocol and Protocol Buffers." },
  { id: 9, category: "backend", front: "What is JWT?", back: "JSON Web Token is an open standard (RFC 7519) defining a compact, self-contained way to securely transmit session metadata between client and server." },
];

export default function Flashcards() {
  const { user, updateUserProfile } = useAuth();
  const [category, setCategory] = useState<"frontend" | "ml" | "backend">("frontend");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<number[]>([]);

  if (!user) return null;

  const deck = CARDS.filter((c) => c.category === category);
  const activeCard = deck[currentIdx];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev < deck.length - 1 ? prev + 1 : 0));
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev > 0 ? prev - 1 : deck.length - 1));
    }, 150);
  };

  const handleMastered = async () => {
    if (!masteredIds.includes(activeCard.id)) {
      setMasteredIds([...masteredIds, activeCard.id]);
      
      // Award XP
      await updateUserProfile({
        totalXP: user.totalXP + 5,
      });
      
      import("canvas-confetti").then((module) => {
        module.default({ particleCount: 30, spread: 40 });
      });
    }
    handleNext();
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">Active Memory Recall</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Flashcards</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Review core terminologies using flipping flashcards to master interview definitions.</p>
      </div>

      {/* Category selector */}
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            setCategory("frontend");
            setCurrentIdx(0);
            setIsFlipped(false);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            category === "frontend"
              ? "bg-blue-600/20 border-blue-500/50 text-blue-300"
              : "bg-slate-950/40 border-white/5 text-slate-400"
          }`}
        >
          React Frontend
        </button>
        <button
          onClick={() => {
            setCategory("ml");
            setCurrentIdx(0);
            setIsFlipped(false);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            category === "ml"
              ? "bg-emerald-600/20 border-emerald-500/50 text-emerald-300"
              : "bg-slate-950/40 border-white/5 text-slate-400"
          }`}
        >
          Machine Learning
        </button>
        <button
          onClick={() => {
            setCategory("backend");
            setCurrentIdx(0);
            setIsFlipped(false);
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
            category === "backend"
              ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-300"
              : "bg-slate-950/40 border-white/5 text-slate-400"
          }`}
        >
          Python API Backend
        </button>
      </div>

      {/* Card Carousel deck */}
      {activeCard ? (
        <div className="max-w-md mx-auto w-full flex flex-col gap-6 items-center">
          
          {/* 3D FLIP CONTAINER */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-64 cursor-pointer relative group [perspective:1000px]"
          >
            {/* Card inner */}
            <div className={`w-full h-full duration-500 [transform-style:preserve-3d] relative rounded-3xl border border-white/10 shadow-2xl ${
              isFlipped ? "[transform:rotateY(180deg)]" : ""
            }`}>
              
              {/* FRONT SIDE */}
              <div className="absolute inset-0 bg-slate-900 flex flex-col justify-between p-6 rounded-3xl [backface-visibility:hidden] text-center items-center">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Question card • Click to Reveal</span>
                <p className="text-base sm:text-lg font-bold text-slate-100 px-4 flex-1 flex items-center justify-center">
                  {activeCard.front}
                </p>
                <span className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                  Tap Card to Flip
                </span>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 bg-slate-950 border border-blue-500/30 flex flex-col justify-between p-6 rounded-3xl [transform:rotateY(180deg)] [backface-visibility:hidden] text-center items-center">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">AI Tutor explanation</span>
                <p className="text-xs sm:text-sm text-slate-300 px-4 leading-relaxed flex-1 flex items-center justify-center">
                  {activeCard.back}
                </p>
                {masteredIds.includes(activeCard.id) ? (
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Mastered (+5 XP)
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-bold">Tap Card to return</span>
                )}
              </div>

            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center w-full px-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleMastered}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-lg shadow-emerald-500/10"
              >
                <Check className="w-3.5 h-3.5" />
                I Know This (+5 XP)
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-semibold active:scale-95 transition-all"
              >
                Skip Card
              </button>
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Cards count tracker */}
          <span className="text-[10px] text-slate-500 font-bold font-mono tracking-wider">
            CARD {currentIdx + 1} OF {deck.length} • {masteredIds.filter(id => deck.some(card => card.id === id)).length} MASTERED
          </span>

        </div>
      ) : (
        <span className="text-xs text-slate-500">No cards in rotation.</span>
      )}

    </div>
  );
}
