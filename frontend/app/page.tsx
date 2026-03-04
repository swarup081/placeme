"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Building2,
  Sparkles,
  BarChart,
  FileText,
  Users
} from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">P</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">PlacementPro</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#problem" className="text-black/60 hover:text-black transition-colors">The Problem</a>
            <a href="#solution" className="text-black/60 hover:text-black transition-colors">Our Solution</a>
            <a href="#workflow" className="text-black/60 hover:text-black transition-colors">Workflows</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-medium px-4 py-2 hover:bg-black/5 rounded-full transition-colors">
              Log in
            </button>
            <button className="text-sm font-medium bg-black text-white px-5 py-2 rounded-full hover:bg-black/80 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>The modern standard for campus placements</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
              Connecting talent with opportunity, seamlessly.
            </h1>
            <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              A cozy, professional, and unified platform for Students, Recruiters, and Training & Placement cells to manage the entire hiring lifecycle.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto h-12 px-8 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors flex items-center justify-center gap-2">
                Start for free <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto h-12 px-8 border border-black/10 rounded-full font-medium hover:bg-black/5 transition-colors">
                Book a demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-black/10 shadow-2xl bg-black/5"
          >
            {/* Aspect ratio container to prevent layout shift */}
            <div className="aspect-[16/9] relative">
              <Image
                src="https://placehold.co/1200x675/f5f5f5/000000?text=Dashboard+Interface"
                alt="Platform Dashboard Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>
        </section>

        {/* Problem Statement */}
        <section id="problem" className="py-24 bg-black/5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">The Campus Hiring Chaos</h2>
              <p className="text-lg text-black/60">
                Traditional placement processes are fragmented. Students miss updates, T&P cells drown in manual verification, and recruiters struggle to filter top talent efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <GraduationCap className="w-6 h-6" />,
                  title: "Student Friction",
                  desc: "Missed notifications, scattered resume versions, and zero visibility into application status."
                },
                {
                  icon: <Building2 className="w-6 h-6" />,
                  title: "T&P Cell Overload",
                  desc: "Manual student verification, tedious job posting on behalf of companies, and tracking placement stats by hand."
                },
                {
                  icon: <Briefcase className="w-6 h-6" />,
                  title: "Recruiter Inefficiency",
                  desc: "Sifting through unverified profiles, manual interview scheduling, and lack of actionable analytics."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm">
                  <div className="w-12 h-12 bg-black/5 rounded-xl flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflows / Solution */}
        <section id="workflow" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">One Platform. Three Workflows.</h2>
              <p className="text-xl text-black/60 max-w-2xl mx-auto">
                We&apos;ve mapped out the perfect unified flow to ensure everyone gets exactly what they need, exactly when they need it.
              </p>
            </div>

            <div className="space-y-32">
              {/* Student Workflow */}
              <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1 order-2 md:order-1 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-lg relative">
                    <Image
                      src="https://placehold.co/800x600/f5f5f5/000000?text=Student+Dashboard"
                      alt="Student Dashboard"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="flex-1 order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-sm font-medium mb-6">
                    <GraduationCap className="w-4 h-4" /> Student Portal
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Empowering the next generation.</h3>
                  <ul className="space-y-4">
                    {[
                      "College mail authentication & OTP verification",
                      "AI-powered resume builder & detailed onboarding",
                      "One-click applications to T&P approved jobs",
                      "Real-time tracking of application stages",
                      "Mock interviews & performance analytics"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                        <span className="text-lg text-black/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* T&P Cell Workflow */}
              <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-sm font-medium mb-6">
                    <Building2 className="w-4 h-4" /> Training & Placement
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Total control for the college.</h3>
                  <ul className="space-y-4">
                    {[
                      "Official T&P mail auth (SuperAdmin approved)",
                      "Seamless verification of student details",
                      "Post jobs on behalf of companies",
                      "Invite companies directly via system requests",
                      "Global visibility: only approved jobs are shown to students"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                        <span className="text-lg text-black/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-lg relative">
                    <Image
                      src="https://placehold.co/800x600/f5f5f5/000000?text=T%26P+Dashboard"
                      alt="T&P Dashboard"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Recruiter Workflow */}
              <div className="flex flex-col md:flex-row gap-16 items-center">
                <div className="flex-1 order-2 md:order-1 relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-lg relative">
                    <Image
                      src="https://placehold.co/800x600/f5f5f5/000000?text=Recruiter+Dashboard"
                      alt="Recruiter Dashboard"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="flex-1 order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-sm font-medium mb-6">
                    <Briefcase className="w-4 h-4" /> Recruiter Suite
                  </div>
                  <h3 className="text-3xl font-bold mb-6">Hire smarter, not harder.</h3>
                  <ul className="space-y-4">
                    {[
                      "Company mail authentication for security",
                      "Smart shortlisting by CGPA and skill relevance",
                      "Manage candidate stages (Resume, Interview, HR)",
                      "Automated interview scheduling & notifications",
                      "Comprehensive analytics & PDF report generation"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                        <span className="text-lg text-black/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid / Final Sell */}
        <section className="py-24 bg-black text-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Users className="w-6 h-6" />, title: "Unified Profiles", desc: "One source of truth for student data." },
                { icon: <BarChart className="w-6 h-6" />, title: "Deep Analytics", desc: "Understand placement metrics instantly." },
                { icon: <FileText className="w-6 h-6" />, title: "Smart Resumes", desc: "AI formatting for better readability." },
                { icon: <Sparkles className="w-6 h-6" />, title: "Automated Triggers", desc: "Emails and app alerts sent automatically." }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="mb-4 text-white/80">{feature.icon}</div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to transform your placement process?</h2>
            <p className="text-xl text-black/60 mb-10">
              Join leading colleges and top-tier recruiters on the platform built for modern hiring.
            </p>
            <button className="h-14 px-10 bg-black text-white rounded-full font-medium text-lg hover:bg-black/80 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs leading-none">P</span>
            </div>
            <span className="font-semibold tracking-tight">PlacementPro</span>
          </div>
          <div className="text-sm text-black/50">
            © {new Date().getFullYear()} PlacementPro. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="text-black/60 hover:text-black">Privacy</a>
            <a href="#" className="text-black/60 hover:text-black">Terms</a>
            <a href="#" className="text-black/60 hover:text-black">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
