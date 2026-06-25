"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, RefreshCw, KeyRound, Mail, User, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Signup() {
  const { user, signup, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.isOnboarded) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup(email, password, name);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please check inputs.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full radial-glow-blue pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full radial-glow-cyan pointer-events-none translate-x-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Brand Logo */}
        <div className="flex flex-col items-center gap-3 mb-8 text-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white flex items-center">
              Internee
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-0.5">
                AI
              </span>
            </span>
          </Link>
          <p className="text-slate-400 text-xs mt-1 max-w-xs">
            Start your hyper-personalized AI study path today.
          </p>
        </div>

        {/* Signup Panel */}
        <div className="glass-panel border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Create Account</h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3.5 flex gap-2.5 text-xs text-red-400 mb-5 items-start">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-500">
                  <User className="w-4.5 h-4.5" />
                </span>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  required
                  className="w-full bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-500">
                  <Mail className="w-4.5 h-4.5" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  required
                  className="w-full bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="pass" className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-500">
                  <KeyRound className="w-4.5 h-4.5" />
                </span>
                <input
                  id="pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  className="w-full bg-slate-950 border border-white/5 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-all disabled:opacity-55"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Register
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Prompt Mock database hint */}
          <div className="mt-5 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 text-[10px] leading-normal text-cyan-300">
            <strong>Development Note:</strong> Registering will save your mock profile details locally in your browser storage.
          </div>
        </div>

        {/* Bottom links */}
        <p className="text-center text-xs text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
