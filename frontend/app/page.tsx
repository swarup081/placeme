import {
  ArrowRight,
  Briefcase,
  FileText,
  LayoutDashboard,
  Users,
  Search
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight">SmartPlace</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
            <a href="#problem" className="hover:text-black transition-colors">The Problem</a>
            <a href="#features" className="hover:text-black transition-colors">Features</a>
            <a href="#solution" className="hover:text-black transition-colors">Ecosystem</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium hover:text-black/70 transition-colors">
              Log in
            </button>
            <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 transition-all active:scale-95 flex items-center gap-2">
              Get Started
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative px-6 pt-24 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            Modernizing College Placements
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6 leading-[1.1]">
            A smarter way to manage <span className="text-black/50">placements & internships.</span>
          </h1>
          <p className="text-xl text-black/60 max-w-2xl mb-10 leading-relaxed">
            A centralized, intelligent web platform connecting students, placement cells, and recruiters in one unified ecosystem. Never miss a career opportunity again.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
            <button className="bg-black text-white px-8 py-4 rounded-full text-base font-medium hover:bg-black/80 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
              Request Demo
            </button>
            <button className="bg-white text-black border border-black/10 px-8 py-4 rounded-full text-base font-medium hover:bg-black/5 transition-all w-full sm:w-auto justify-center">
              Learn More
            </button>
          </div>

          <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 bg-gray-50 aspect-video relative flex items-center justify-center">
            {/* Placeholder Image for Hero */}
            <div className="absolute inset-0 bg-[#f8f9fa] flex flex-col items-center justify-center text-black/40 border-2 border-dashed border-black/10 m-4 rounded-xl">
              <LayoutDashboard size={48} className="mb-4 opacity-50" />
              <p className="font-medium">Dashboard Interface Placeholder</p>
              <p className="text-sm mt-1">1920 x 1080</p>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="problem" className="px-6 py-24 bg-[#fafafa] border-y border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">The Fragmented Campus</h2>
                <p className="text-lg text-black/60 mb-8 leading-relaxed">
                  In many educational institutions, crucial placement information is scattered across emails, spreadsheets, messaging groups, and physical notice boards.
                </p>
                <ul className="space-y-4">
                  {[
                    "Missed job opportunities for students",
                    "Delayed communication between stakeholders",
                    "Manual, error-prone tracking of applications",
                    "Lack of transparency in the shortlisting process",
                    "Inefficient data management"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/80">
                      <div className="mt-1.5 w-4 h-4 rounded-full bg-black/10 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-black/5 bg-white flex items-center justify-center">
                {/* Placeholder Image for Problem */}
                <div className="absolute inset-0 bg-[#f8f9fa] flex flex-col items-center justify-center text-black/40 border-2 border-dashed border-black/10 m-4 rounded-xl">
                  <Search size={48} className="mb-4 opacity-50" />
                  <p className="font-medium">Scattered Information Visual</p>
                  <p className="text-sm mt-1">800 x 800</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Requirements Section */}
        <section id="features" className="px-6 py-32 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Everything you need in one place</h2>
            <p className="text-xl text-black/60 max-w-2xl mx-auto">
              An innovative yet practical solution designed to modernize the recruitment workflow and improve coordination.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-6">
                <LayoutDashboard size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">User-Friendly Interface</h3>
              <p className="text-black/60 leading-relaxed">
                An intuitive, responsive, and accessible interface tailored specifically for students, placement officers, and recruiters.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Student Profiles</h3>
              <p className="text-black/60 leading-relaxed">
                Create comprehensive profiles showcasing academic records, specialized skills, certifications, projects, and work experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-white border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Resume Generator</h3>
              <p className="text-black/60 leading-relaxed">
                Seamless resume uploads and a powerful built-in resume builder that translates profiles into structured, professional documents.
              </p>
            </div>
          </div>
        </section>

        {/* Unified Ecosystem Section (Flowchart placeholder area) */}
        <section id="solution" className="px-6 py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">The Unified Ecosystem</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                Connecting all stakeholders efficiently to reduce administrative workload and enhance transparency.
              </p>
            </div>

            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[21/9] relative flex items-center justify-center">
              {/* Placeholder Image for Flowchart */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 border-2 border-dashed border-white/20 m-4 rounded-xl">
                <Briefcase size={48} className="mb-4 opacity-50" />
                <p className="font-medium">System Architecture & Flowchart Placeholder</p>
                <p className="text-sm mt-1">Connects Students, Admins, and Recruiters</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-lg font-bold tracking-tight">SmartPlace</span>
          </div>
          <p className="text-sm text-black/50">
            &copy; {new Date().getFullYear()} Smart Placement Portal. Designed for modern colleges.
          </p>
          <div className="flex gap-6 text-sm font-medium text-black/60">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
