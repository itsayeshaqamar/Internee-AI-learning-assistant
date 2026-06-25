"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { isMock } from "@/lib/firebase";
import { isOpenAIConfigured } from "@/lib/openai";
import { Settings, Save, CheckCircle, ShieldAlert, Cpu } from "lucide-react";

export default function StudentSettings() {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!user) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || submitting) return;
    setSubmitting(true);
    try {
      await updateUserProfile({ name });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest block mb-1">System Profile</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Settings</h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">Manage display name, check API connections, and toggle database configurations.</p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Profile */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col gap-5">
            <h3 className="font-bold text-base text-slate-100 flex items-center gap-1.5">
              <Settings className="w-5 h-5 text-blue-400" />
              Edit Student Details
            </h3>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name-input" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Display Name</label>
                <input
                  id="name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Student Name"
                  required
                  className="w-full bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 opacity-55">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email (Locked)</label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full bg-slate-950/40 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                {success ? (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Profile Updated
                  </span>
                ) : (
                  <span></span>
                )}

                <button
                  type="submit"
                  disabled={submitting || name === user.name}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-blue-500/10 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right API Status panel */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          <div className="glass-panel border border-white/10 rounded-3xl p-5 shadow-md flex flex-col gap-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-5 h-5 text-cyan-400" />
              API & Cloud Status
            </h3>

            <div className="flex flex-col gap-3">
              {/* Firebase status */}
              <div className={`p-4 rounded-2xl border flex gap-3 ${
                isMock 
                  ? "bg-amber-950/20 border-amber-500/20 text-amber-300"
                  : "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
              }`}>
                {isMock ? (
                  <>
                    <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="text-xs text-left">
                      <span className="font-bold block mb-0.5">Firebase Auth & Firestore</span>
                      Running in mock browser storage mode. Add your credentials in `.env` files to sync to remote Google Cloud instances.
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-xs text-left">
                      <span className="font-bold block mb-0.5">Firebase Live Database</span>
                      Connected to Firestore server. User profiles, roadmaps, and chat updates sync in real-time.
                    </div>
                  </>
                )}
              </div>

              {/* OpenAI Status */}
              <div className={`p-4 rounded-2xl border flex gap-3 ${
                !isOpenAIConfigured 
                  ? "bg-amber-950/20 border-amber-500/20 text-amber-300"
                  : "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
              }`}>
                {!isOpenAIConfigured ? (
                  <>
                    <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="text-xs text-left">
                      <span className="font-bold block mb-0.5">OpenAI Engine Connection</span>
                      Running in local prompt simulation fallback mode. Provide `OPENAI_API_KEY` to query GPT models live.
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="text-xs text-left">
                      <span className="font-bold block mb-0.5">OpenAI GPT Active</span>
                      OpenAI key is verified. Interactive roadmaps, chats, and evaluations query OpenAI servers live.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
