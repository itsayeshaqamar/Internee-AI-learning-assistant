"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { getCollection, addToCollection } from "@/lib/firebase";
import { BookOpen, RefreshCw, Save, Plus, ArrowRight, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SavedNote {
  id: string;
  topic: string;
  content: string;
  timestamp: number;
}

export default function NotesGenerator() {
  const { user, updateUserProfile } = useAuth();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeNote, setActiveNote] = useState<{ topic: string; content: string } | null>(null);
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      getCollection(`users/${user.uid}/notes`).then((data) => {
        setSavedNotes(data as SavedNote[]);
      });
    }
  }, [user]);

  if (!user) return null;

  const handleGenerate = async (topicName: string) => {
    if (!topicName.trim()) return;
    setLoading(true);
    setSavedSuccess(false);
    try {
      const res = await fetch("/api/generate-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicName }),
      });
      if (res.ok) {
        const data = await res.json();
        setActiveNote(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!activeNote || !user) return;
    setSaving(true);
    try {
      const newNote = {
        topic: activeNote.topic,
        content: activeNote.content,
        timestamp: Date.now(),
      };
      
      const docId = await addToCollection(`users/${user.uid}/notes`, newNote);
      
      // Update local state list
      setSavedNotes([...savedNotes, { id: docId, ...newNote }]);
      setSavedSuccess(true);

      // Award XP
      await updateUserProfile({
        totalXP: user.totalXP + 10,
      });

      // Clear success notification after 3s
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">Study Guide Generator</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Notes Generator</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Input any concept or algorithm. Our AI will compile formatted guides to save to your personal notebook.</p>
      </div>

      {/* Grid: Saved Notes Sidebar + Main Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Saved Notebook Library */}
        <div className="lg:col-span-4 flex flex-col gap-4.5 w-full">
          <div className="glass-panel border border-white/10 rounded-3xl p-5 flex flex-col gap-4 shadow-md">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                Saved Notes ({savedNotes.length})
              </span>
              <button
                onClick={() => {
                  setActiveNote(null);
                  setTopic("");
                }}
                className="p-1 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
                title="Create New Study Guide"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
              {savedNotes.length === 0 ? (
                <span className="text-xs text-slate-500 py-6 text-center">Your notebook is currently empty.</span>
              ) : (
                savedNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => {
                      setActiveNote({ topic: note.topic, content: note.content });
                      setTopic(note.topic);
                    }}
                    className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all truncate block ${
                      activeNote?.topic === note.topic
                        ? "bg-blue-600/15 border-blue-500/50 text-blue-400"
                        : "bg-slate-950/50 border-white/5 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {note.topic}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right: Notes Generator Creator / Viewer */}
        <div className="lg:col-span-8 w-full flex flex-col gap-6">
          {!activeNote && !loading ? (
            /* Input topic view */
            <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-xl">
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Select a topic to generate detailed notes
              </h3>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Recursion in Python, React Context API, SQL Indexing"
                  className="flex-1 bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
                />
                <button
                  onClick={() => handleGenerate(topic)}
                  disabled={!topic.trim()}
                  className="px-5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center disabled:opacity-50"
                >
                  Generate
                </button>
              </div>
            </div>
          ) : loading ? (
            /* Loader screen */
            <div className="min-h-[40vh] flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-bold text-white mb-1">Creating Technical Notes</h3>
              <p className="text-slate-500 text-xs sm:text-sm max-w-xs">AI is assembling code blocks, formatting summaries and writing definitions...</p>
            </div>
          ) : (
            /* Notes markdown viewer */
            activeNote && (
              <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <h3 className="font-extrabold text-lg text-white">Study Sheet: {activeNote.topic}</h3>
                  
                  <div className="flex gap-2 items-center">
                    {savedSuccess ? (
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Saved (+10 XP)
                      </span>
                    ) : (
                      <button
                        onClick={handleSaveNote}
                        disabled={saving}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save to Notebook
                      </button>
                    )}
                  </div>
                </div>

                {/* Render Notes Markdown summary */}
                <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-5 text-left text-xs sm:text-sm text-slate-300 leading-relaxed overflow-y-auto max-h-[500px]">
                  <pre className="whitespace-pre-wrap font-sans">{activeNote.content}</pre>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-4">
                  <button
                    onClick={() => {
                      setActiveNote(null);
                      setTopic("");
                    }}
                    className="text-xs text-slate-500 hover:text-slate-300 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Write another note
                  </button>
                </div>
              </div>
            )
          )}
        </div>

      </div>

    </div>
  );
}
