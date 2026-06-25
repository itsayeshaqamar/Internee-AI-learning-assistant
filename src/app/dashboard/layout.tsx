"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { 
  GraduationCap, Menu, X, LogOut, Flame, Star, 
  LayoutDashboard, Compass, MessageSquareCode, 
  HelpCircle, Library, BookOpen, UserCheck, 
  BarChart3, Settings, Briefcase, Award 
} from "lucide-react";
import Link from "next/link";

interface SidebarLink {
  label: string;
  href: string;
  icon: any;
}

const SIDEBAR_LINKS: SidebarLink[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Roadmap", href: "/dashboard/roadmap", icon: Compass },
  { label: "AI Tutor Chat", href: "/dashboard/chat", icon: MessageSquareCode },
  { label: "Quiz Center", href: "/dashboard/quiz", icon: HelpCircle },
  { label: "Flashcards", href: "/dashboard/flashcards", icon: Library },
  { label: "Notes Generator", href: "/dashboard/notes", icon: BookOpen },
  { label: "Mock Interviews", href: "/dashboard/interviews", icon: UserCheck },
  { label: "Career Guidance", href: "/dashboard/career", icon: Briefcase },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication Guards
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!user.isOnboarded) {
        router.push("/onboarding");
      }
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Verifying Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark flex text-slate-100 relative">
      
      {/* MOBILE SIDEBAR DRAWERS / OVERLAY */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR NAVIGATION SHELL */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 bottom-0 z-50 w-64 bg-slate-950 border-r border-white/5 flex flex-col justify-between py-6 px-4 transition-transform duration-300 transform lg:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Logo block */}
          <div className="flex items-center justify-between px-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-md">
                <GraduationCap className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight flex items-center">
                Internee
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-0.5">
                  AI
                </span>
              </span>
            </Link>
            
            {/* Close button mobile */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links Grid */}
          <nav className="flex flex-col gap-1">
            {SIDEBAR_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600/15 border-l-2 border-blue-500 text-blue-400 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile / Logout section */}
        <div className="flex flex-col gap-4 border-t border-white/5 pt-6 px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center font-bold text-xs uppercase text-cyan-400">
              {user.name.substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-xs sm:text-sm text-slate-200 block truncate">{user.name}</span>
              <span className="text-[10px] text-slate-500 block truncate uppercase tracking-wider">{user.careerTrack || "Onboarding"}</span>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all text-left font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* DASHBOARD INNER CORE VIEWPORTS */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP STATUS SUBBAR BAR */}
        <header className="sticky top-0 bg-brand-dark/85 backdrop-blur-md border-b border-white/5 z-30 py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle hamburger on mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Path indicator */}
            <h2 className="font-bold text-sm sm:text-base capitalize tracking-wide text-white">
              {pathname === "/dashboard" ? "Dashboard Overview" : pathname.split("/").pop()?.replace("-", " ")}
            </h2>
          </div>

          {/* Gamification indicators */}
          <div className="flex items-center gap-4">
            {/* Streak Flame */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400" title="Daily Streak">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span className="text-xs font-bold">{user.streakCount} Day Streak</span>
            </div>

            {/* Total Experience XP star */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400" title="Experience Points">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xs font-bold">{user.totalXP} XP</span>
            </div>
          </div>
        </header>

        {/* Dashboard Child routes views container */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
