"use client";

import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-12 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full radial-glow-blue pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/5">
        {/* Brand Block */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-md">
              <GraduationCap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="font-bold text-lg text-white flex items-center">
              Internee
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-0.5">
                AI
              </span>
            </span>
          </a>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Hyper-personalized learning experiences powered by intelligence. Synchronize your bootcamp, mock your technical rounds, and claim your verified virtual internship credentials.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3.5 mt-2">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all" aria-label="GitHub">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Product Columns */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
          <nav className="flex flex-col gap-2">
            <a href="#features" className="text-xs text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#tutor-demo" className="text-xs text-slate-400 hover:text-white transition-colors">AI Chat Demo</a>
            <a href="#roadmaps" className="text-xs text-slate-400 hover:text-white transition-colors">Interactive Tracks</a>
            <a href="#interviews" className="text-xs text-slate-400 hover:text-white transition-colors">Mock Simulator</a>
          </nav>
        </div>

        {/* Resources Columns */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
          <nav className="flex flex-col gap-2">
            <a href="#about" className="text-xs text-slate-400 hover:text-white transition-colors">About Us</a>
            <a href="#faq" className="text-xs text-slate-400 hover:text-white transition-colors">FAQ Support</a>
            <a href="https://internee.pk" target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white transition-colors">Virtual Internships</a>
            <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">Curriculum Syncer</a>
          </nav>
        </div>

        {/* Newsletter subscription */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            Get learning updates
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Subscribe to receive new roadmaps, mock interview schedules, and engineering guides directly to your inbox.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-3.5 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold flex items-center justify-center shadow-md active:scale-95 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copy footer */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500 font-medium">
        <span>© {new Date().getFullYear()} InterneeAI. All rights reserved. Powered by Internee.pk</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
