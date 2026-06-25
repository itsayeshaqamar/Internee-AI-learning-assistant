"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Roadmap from "@/components/Roadmap";
import Analytics from "@/components/Analytics";
import MockInterview from "@/components/MockInterview";
import AboutInternee from "@/components/AboutInternee";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-brand-dark min-h-screen text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section (hosts the AI Tutor Chat Demo) */}
        <Hero />

        {/* Core Value Features Grid */}
        <Features />

        {/* Interactive Custom Roadmaps Track */}
        <Roadmap />

        {/* Dashboard Analytics progress tracking */}
        <Analytics />

        {/* AI Mock Technical Interviews rounded sandbox */}
        <MockInterview />

        {/* Partnership & Internship connector */}
        <AboutInternee />

        {/* Student Reviews & Testimonials slider */}
        <Testimonials />

        {/* Custom Collapsible Accordion FAQs */}
        <FAQ />
      </main>

      {/* footer section */}
      <Footer />
    </div>
  );
}
