"use client";

import { motion } from "framer-motion";
import { Search, GraduationCap, Briefcase, CheckCircle, FileText, Lock, Database } from "lucide-react";

export default function ProblemStatement() {
  return (
    <section className="py-24 bg-white relative font-sans">
      {/* Structural borders: Darkened and added a bottom border that only spans the grid width */}
      <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
        <div className="w-full max-w-[85rem] border-l border-r border-b border-black/20 h-full"></div>
      </div>

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-[#1A1A1A]"
          >
            Too Many Placement Processes. <br />
            Not Enough <span className="font-serif italic text-[#6B99A8]">Opportunities</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[15px] text-[#4A5560] max-w-3xl mx-auto"
          >
            Student data is scattered across spreadsheets, emails, and portals, making campus placements slow, unorganized, and difficult to manage for students, placement cells, and recruiters.
          </motion.p>
        </div>

        {/* 3-Column Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1 - Left */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col border border-gray-200 bg-white"
          >
            <div className="p-8 pb-6 border-b border-gray-100">
              <h3 className="text-2xl font-serif italic text-[#6B99A8] mb-4">No More Placement Chaos</h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">
                Recruiters and placement cells can instantly access structured student profiles with verified skills, projects, and academic information in one place.
              </p>
            </div>
            {/* Concentric Circle Diagram */}
            <div className="relative h-[500px] overflow-hidden flex items-end justify-end p-6 bg-white">
              <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full border border-gray-100"></div>
              <div className="absolute -bottom-10 -right-10 w-[400px] h-[400px] rounded-full border border-gray-200"></div>
              <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full border border-gray-300"></div>
              <div className="absolute bottom-10 right-10 w-[200px] h-[200px] rounded-full border border-gray-200"></div>
              
              <div className="absolute top-[35%] left-[25%] w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm text-[#6B99A8]">
                <Search size={16} />
              </div>
              <div className="absolute top-[50%] left-[10%] w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm text-[#6B99A8]">
                <GraduationCap size={20} />
              </div>
              <div className="absolute bottom-[10%] left-[20%] w-10 h-10 bg-[#6B99A8] rounded-xl flex items-center justify-center shadow-sm text-white">
                <Briefcase size={18} />
              </div>
              
              {/* Main Hub with "P" Icon */}
              <div className="relative z-10 bottom-10 right-10 w-24 h-24 bg-[#6B99A8] rounded-full flex items-center justify-center shadow-lg mb-8 mr-8">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 4H14C17.3137 4 20 6.68629 20 10C20 13.3137 17.3137 16 14 16H10V20H7V4ZM10 7V13H14C15.6569 13 17 11.6569 17 10C17 8.34315 15.6569 7 14 7H10Z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Column 2 - Middle */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col border border-gray-200 bg-white flex-grow"
            >
              <div className="p-8 pb-6 border-b border-gray-100">
                <h3 className="text-2xl font-serif italic text-[#6B99A8] mb-4">One Unified Ecosystem</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  The platform connects resumes, GitHub profiles, assessments, and student achievements into a single trusted system for campus recruitment.
                </p>
              </div>
              {/* Flow Diagram */}
              <div className="relative p-8 py-12 flex items-center justify-between bg-white h-full">
                <div className="flex flex-col gap-3 relative z-10">
                  {['Resumes', 'GitHub', 'Scores', 'Projects'].map((item) => (
                     <div key={item} className="text-[11px] font-medium text-[#6B99A8] border border-gray-200 px-3 py-1.5 rounded bg-white w-20 text-center z-10 relative">
                       {item}
                     </div>
                  ))}
                </div>
                
                {/* Connecting Lines */}
                <div className="absolute left-[80px] right-[80px] top-15 bottom-0 pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <path d="M 0,40 C 50,40 50,110 100,110" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
                    <path d="M 0,80 C 50,80 50,110 100,110" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
                    <path d="M 0,140 C 50,140 50,110 100,110" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
                    <path d="M 0,180 C 50,180 50,110 100,110" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
                    <path d="M 150,110 C 200,110 200,40 250,40" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
                    <path d="M 150,110 C 200,110 200,80 250,80" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
                    <path d="M 150,110 C 200,110 200,140 250,140" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
                    <path d="M 150,110 C 200,110 200,180 250,180" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>

                {/* Center Logo with "P" Icon */}
                <div className="relative z-10 w-12 right-7 top-2 h-12 bg-[#2C6E8F] rounded flex items-center justify-center shadow-md">
                   <svg width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 4H14C17.3137 4 20 6.68629 20 10C20 13.3137 17.3137 16 14 16H10V20H7V4ZM10 7V13H14C15.6569 13 17 11.6569 17 10C17 8.34315 15.6569 7 14 7H10Z" />
                  </svg>
                </div>

                <div className="flex flex-col gap-4 -left-5 relative z-10">
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-400"><Database size={12} /></div>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-400"><CheckCircle size={12} /></div>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-400"><Lock size={12} /></div>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center bg-white text-gray-400"><FileText size={12} /></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col border border-gray-200 bg-white p-8"
            >
               <h3 className="text-2xl font-serif italic text-[#6B99A8] mb-4">Smarter Recruiter Matching</h3>
               <p className="text-[14px] text-gray-600 leading-relaxed m-0">
                  Intelligent matching helps recruiters discover the right students while helping students find relevant internship and placement opportunities.
               </p>
            </motion.div>
          </div>

          {/* Column 3 - Right */}
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col border border-gray-200 bg-white"
            >
              <div className="p-8 pb-6 border-b border-gray-100">
                <h3 className="text-2xl font-serif italic text-[#6B99A8] mb-4">Transparent Student Profiles</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">
                  Student profiles include verified skills, projects, academic scores, and assessments so recruiters can trust the information.
                </p>
              </div>
              <div className="relative p-10 h-[220px] flex items-center justify-center bg-white">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                   <div className="flex justify-between w-full px-4 absolute top-4">
                     <span className="bg-[#6ca4b8] text-white text-[10px] font-medium px-3 py-1 rounded-sm">Tested</span>
                     <span className="bg-[#6ca4b8] text-white text-[10px] font-medium px-3 py-1 rounded-sm">Governed</span>
                   </div>
                   <div className="w-32 h-16 rounded-full border border-gray-200 flex items-center justify-center bg-white shadow-[0_0_30px_rgba(107,153,168,0.15)] z-20">
                     <span className="text-[11px] font-medium text-[#6B99A8]">Smart Match AI</span>
                   </div>
                   <div className="flex justify-between w-full px-4 absolute bottom-4">
                     <span className="bg-[#6ca4b8] text-white text-[10px] font-medium px-3 py-1 rounded-sm">Transparent</span>
                     <span className="bg-[#6ca4b8] text-white text-[10px] font-medium px-3 py-1 rounded-sm">Verifiable</span>
                   </div>
                   <div className="absolute inset-0 m-auto w-40 h-40 bg-[radial-gradient(circle,rgba(107,153,168,0.1)_0%,transparent_70%)] -z-10"></div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col border border-gray-200 bg-white p-8 flex-grow"
            >
               <h3 className="text-2xl font-serif italic text-[#6B99A8] mb-4">Streamlined Placement Drives</h3>
               <p className="text-[14px] text-gray-600 leading-relaxed mb-8">
                  Placement cells can manage drives, shortlist students, and coordinate recruiters with automated workflows and real‑time updates.
               </p>
               
               {/* IMPROVED SHORTLISTED METRIC CARD */}
  <div className="mt-auto w-[90%] mx-auto bg-white border border-gray-200  p-6 flex flex-col items-center text-center shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_14px_45px_rgba(0,0,0,0.10)] hover:border-[#6B99A8]/40">
    <span className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-semibold mb-3">Shortlisted</span>
    <div className="flex items-center gap-3">
      <span className="text-2xl font-semibold text-[#1A1A1A]/60 leading-none">142+</span>
      <span className="flex items-center text-[11px] font-semibold text-green-600  px-2.5 py-1 rounded-full">
        ↑ 12%
      </span>
    </div>
  </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}