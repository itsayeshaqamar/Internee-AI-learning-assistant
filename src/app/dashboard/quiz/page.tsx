"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { HelpCircle, RefreshCw, Star, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { addToCollection } from "@/lib/firebase";

interface Question {
  id: number;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
}

interface Quiz {
  topic: string;
  questions: Question[];
}

export default function QuizCenter() {
  const { user, updateUserProfile } = useAuth();
  const [topicInput, setTopicInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<{
    score: number;
    total: number;
    passed: boolean;
    graded: boolean;
  } | null>(null);

  if (!user) return null;

  // Suggested topics based on track
  const suggestions = 
    user.careerTrack === "frontend" 
      ? ["React Hooks State", "Next.js App Routing", "CSS Tailwind layouts"]
      : user.careerTrack === "ml"
      ? ["NumPy Matrices operations", "Supervised Classifications", "PyTorch backpropagation"]
      : ["SQL Table Joins", "FastAPI Endpoints", "Python decorators functions"];

  const handleGenerate = async (topic: string) => {
    setGenerating(true);
    setQuiz(null);
    setResults(null);
    setUserAnswers({});
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (res.ok) {
        const data = await res.json();
        setQuiz(data);
      } else {
        throw new Error("Failed to contact quiz generator API.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleOptionSelect = (qId: number, optionIdx: number) => {
    if (results?.graded) return;
    setUserAnswers({ ...userAnswers, [qId]: optionIdx });
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    setSubmitting(true);

    let score = 0;
    quiz.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        score += 1;
      }
    });

    const total = quiz.questions.length;
    const passed = score >= 4; // 80% to pass

    setResults({
      score,
      total,
      passed,
      graded: true,
    });

    // --- ADAPTIVE ENGINE UPDATES ---
    let updatedWeakAreas = [...(user.weakAreas || [])];
    const normalizedTopic = quiz.topic.toLowerCase();

    if (!passed) {
      // If failed, add to weakAreas if not already there
      if (!updatedWeakAreas.includes(normalizedTopic)) {
        updatedWeakAreas.push(normalizedTopic);
      }
    } else {
      // If passed, remove from weakAreas if present
      updatedWeakAreas = updatedWeakAreas.filter((w) => w !== normalizedTopic);
    }

    // Award XP
    const xpEarned = passed ? 50 : 10;

    await updateUserProfile({
      totalXP: user.totalXP + xpEarned,
      weakAreas: updatedWeakAreas,
    });

    // Save quiz to Firestore logs
    await addToCollection(`users/${user.uid}/quizzes`, {
      topic: quiz.topic,
      score,
      totalQuestions: total,
      passed,
      date: new Date().toISOString(),
    });

    setSubmitting(false);

    // Launch confetti on pass!
    if (passed) {
      import("canvas-confetti").then((module) => {
        module.default({ particleCount: 60, spread: 50 });
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">Testing Assessment</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Quiz Center</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Generate AI quizzes on any topic to identify weak spots and earn XP.</p>
      </div>

      {!quiz && !generating ? (
        /* Quiz Topic Input view */
        <div className="max-w-xl mx-auto w-full flex flex-col gap-6 pt-10">
          <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              What topic would you like to test?
            </h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                placeholder="e.g. Binary Search, React Context, SQL Groupings"
                className="flex-1 bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
              />
              <button
                onClick={() => handleGenerate(topicInput)}
                disabled={!topicInput.trim()}
                className="px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center disabled:opacity-50"
              >
                Generate Quiz
              </button>
            </div>
            
            {/* Suggested topics block */}
            <div className="mt-4 border-t border-white/5 pt-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2.5">Suggested Topics</span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setTopicInput(s);
                      handleGenerate(s);
                    }}
                    className="text-xs bg-slate-950 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : generating ? (
        /* Loader screen */
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-lg font-bold text-white mb-1">Generating AI Questions</h3>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xs">Creating 5 customized multiple-choice questions...</p>
        </div>
      ) : (
        /* Quiz questions view */
        quiz && (
          <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
            <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <h3 className="font-extrabold text-lg text-white">Quiz: {quiz.topic}</h3>
                {results && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${
                    results.passed 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                  }`}>
                    {results.passed ? "Passed (+50 XP)" : "Review Needed (+10 XP)"}
                  </span>
                )}
              </div>

              {/* Questions list */}
              <div className="flex flex-col gap-8">
                {quiz.questions.map((q, qIdx) => {
                  const isCorrect = userAnswers[q.id] === q.correctOptionIndex;
                  return (
                    <div key={q.id} className="flex flex-col gap-3 text-left">
                      <h4 className="font-bold text-sm sm:text-base text-slate-200">
                        {qIdx + 1}. {q.questionText}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = userAnswers[q.id] === optIdx;
                          const showCorrect = results?.graded && optIdx === q.correctOptionIndex;
                          const showIncorrect = results?.graded && isSelected && !isCorrect;

                          return (
                            <button
                              key={optIdx}
                              disabled={results?.graded}
                              onClick={() => handleOptionSelect(q.id, optIdx)}
                              className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-all ${
                                showCorrect
                                  ? "bg-emerald-950/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/5"
                                  : showIncorrect
                                  ? "bg-red-950/20 border-red-500/50 text-red-300"
                                  : isSelected
                                  ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold"
                                  : "bg-slate-950/50 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Results assessment details */}
              {results && (
                <div className="mt-4 border-t border-white/5 pt-5 flex flex-col gap-4 text-xs sm:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300">Total Score:</span>
                    <span className="font-black text-cyan-400 text-base">{results.score} / {results.total} Correct</span>
                  </div>
                  
                  {results.passed ? (
                    <div className="bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 p-3.5 rounded-xl flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <p>
                        <strong>Excellent work!</strong> You have demonstrated solid knowledge in this topic module. Keep up the high score standard.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-amber-950/20 border border-amber-500/20 text-amber-300 p-3.5 rounded-xl flex gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p>
                        <strong>Review Suggested.</strong> Topics with scores below 80% are flagged as weak areas. Take review study sheets in the Notes Generator or ask your AI Tutor Chat for help!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-6 border-t border-white/5 pt-5">
                <button
                  onClick={() => {
                    setQuiz(null);
                    setResults(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-300 font-bold flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try another topic
                </button>

                {!results?.graded ? (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={submitting || Object.keys(userAnswers).length < quiz.questions.length}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs sm:text-sm font-bold disabled:opacity-50 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {submitting ? "Grading..." : "Submit Quiz"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleGenerate(quiz.topic)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/20 transition-all"
                  >
                    Retake Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      )}

    </div>
  );
}
