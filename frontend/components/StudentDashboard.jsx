"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Briefcase, FileText, User, Bell, 
  Search, UploadCloud, CheckCircle2, ChevronRight, 
  Clock, Star, AlertCircle, MapPin, Edit2, Github, Linkedin, Code2, Calendar, TrendingUp, X, Menu, Loader2
} from "lucide-react";
import { Building2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading, logout, refreshUser } = useAuth();

  const [activeTab, setActiveTab] = useState("overview"); 
  const [jobCategory, setJobCategory] = useState("All");
  
  // Interactive States
  const [toast, setToast] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Data States
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Profile Form States
  const [cgpa, setCgpa] = useState("");
  const [branch, setBranch] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/?auth=true");
    } else if (user) {
      setCgpa(user.cgpa || "");
      setBranch(user.branch || "");
      fetchData();
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      // Fetch Published Jobs
      const { data: jobsData } = await supabase
        .from("jobs")
        .select(`*, recruiter:profiles!recruiter_id(name, company_id), company:companies!jobs_company_id_fkey(name)`)
        .eq("state", "PUBLISHED"); // Or you can omit if you just want to see all viewable
        // Note: I will use a simple view or direct fetch for jobs for now

      const { data: rawJobs } = await supabase.from("jobs").select("*");
      if (rawJobs) setJobs(rawJobs);

      // Fetch Applications
      if (user?.id) {
        const { data: appsData } = await supabase
          .from("applications")
          .select("*, job:jobs(*)")
          .eq("student_id", user.id);
        if (appsData) setApplications(appsData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  // Handlers
  const handleApply = async (jobId) => {
    const isApplied = applications.some(a => a.job_id === jobId);
    if (!isApplied) {
      try {
        const { error } = await supabase.from("applications").insert({
          job_id: jobId,
          student_id: user.id,
          state: "APPLIED"
        });

        if (error) throw error;

        showToast("Application submitted successfully!");
        fetchData(); // refresh apps
      } catch (err) {
        showToast("Failed to apply: " + err.message);
      }
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    try {
      const { error } = await supabase.from("profiles").update({
        cgpa: parseFloat(cgpa) || null,
        branch: branch
      }).eq("id", user.id);

      if (error) throw error;

      await refreshUser();
      showToast("Profile updated!");
    } catch (err) {
      showToast("Error updating profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const categories = ["All", "Engineering", "Marketing", "HR & Operations", "Business Development"];
  // For demo, if branches array is used we map it
  const filteredJobs = jobCategory === "All" ? jobs : jobs.filter(job => job.title?.includes(jobCategory) || job.branches?.includes(jobCategory));

  if (authLoading || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-[#2C6E8F]" size={40} />
      </div>
    );
  }

  // ================= RENDER TABS =================

  const renderOverview = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-[#6B99A8]/40 transition-colors">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">ATS Score</p>
          <div className="flex items-end gap-3">
            <span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">82%</span>
            <span className="text-[10px] sm:text-xs text-green-600 font-medium mb-1">Excellent</span>
          </div>
          <div className="w-full bg-gray-100 h-1 mt-4 rounded-full overflow-hidden">
            <div className="bg-[#6B99A8] h-full" style={{ width: '82%' }}></div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-[#6B99A8]/40 transition-colors">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Active Apps</p>
          <div className="flex items-end gap-3">
            <span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">{applications.length}</span>
            <span className="text-[10px] sm:text-xs text-gray-400 font-medium mb-1">submitted</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-[#1A1A1A] uppercase tracking-wide">Recent Applications</h3>
            <button onClick={() => handleTabChange('applications')} className="text-[#6B99A8] text-xs font-medium hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {applications.slice(0, 3).length === 0 ? (
               <div className="p-6 bg-white border border-gray-200 text-center text-sm text-gray-500">No applications yet.</div>
            ) : applications.slice(0, 3).map((app) => (
              <div key={app.id} className="bg-white border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#6B99A8]/40 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 border border-gray-100 rounded-sm flex items-center justify-center shrink-0">
                    <Building2 size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-[13px] sm:text-sm font-semibold text-[#1A1A1A]">{app.job?.title || "Job Title"}</h4>
                    <p className="text-[11px] sm:text-xs text-gray-500 mt-1">{new Date(app.applied_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-[#f4f8f9] px-3 py-1.5 rounded-sm w-fit self-start sm:self-auto">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6B99A8]"></div>
                  <span className="text-[11px] sm:text-xs font-medium text-[#5B8D9E]">{app.state}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
           {/* Info banner or tasks */}
           <div className="bg-[#f4f8f9] border border-[#6B99A8]/20 p-5 rounded-sm">
            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-2 flex items-center gap-2">
              <Star size={16} className="text-[#6B99A8]" fill="currentColor" /> Profile Action Required
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-600 mb-4 leading-relaxed">
              Ensure your CGPA and branch are accurately filled out so T&P cell can verify you quickly.
            </p>
            <button onClick={() => handleTabChange('profile')} className="w-full bg-[#1A1A1A] text-white text-[11px] sm:text-xs font-medium py-2.5 hover:bg-black transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderJobs = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] tracking-tight">Open <span className="font-serif italic text-[#6B99A8]">Roles</span></h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {filteredJobs.length === 0 ? (
           <p className="text-sm text-gray-500">No jobs found.</p>
        ) : filteredJobs.map((job) => {
          const isApplied = applications.some(a => a.job_id === job.id);
          
          return (
            <div key={job.id} className="bg-white border border-gray-200 p-5 sm:p-8 flex flex-col justify-between hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">
              <div>
                <div className="flex flex-wrap justify-between items-start gap-2 mb-4 sm:mb-5">
                  <span className="inline-block px-2 sm:px-3 py-1 rounded-full bg-[#f4f8f9] text-[#5B8D9E] text-[10px] sm:text-[11px] font-medium tracking-wide">
                    {job.branches?.join(", ") || "Engineering"}
                  </span>
                  {job.min_cgpa && (
                    <span className="text-[10px] sm:text-[11px] font-medium text-gray-500 flex items-center gap-1">
                      Min CGPA: {job.min_cgpa}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-1.5 sm:mb-2 leading-tight">
                  {job.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs text-gray-500 mb-5 sm:mb-6 font-medium mt-3">
                  <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400" /> {job.location || "Remote"}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} className="text-gray-400" /> Full Time</span>
                </div>

                <p className="text-[12px] sm:text-[13px] text-gray-600 leading-relaxed mb-6 sm:mb-8 line-clamp-3">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button 
                  onClick={() => handleApply(job.id)}
                  disabled={isApplied}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isApplied 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1A1A1A] text-white hover:bg-[#6B99A8]'
                  }`}
                >
                  {isApplied ? 'Applied' : 'Apply Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full">
      <h2 className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] tracking-tight mb-6 sm:mb-8">Your <span className="font-serif italic text-[#6B99A8]">Profile</span></h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <form onSubmit={handleUpdateProfile} className="bg-white border border-gray-200 p-5 sm:p-8">
            <h3 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-5 sm:mb-6 flex items-center gap-2">
              <User size={16} /> Academic Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5">Full Name</label>
                <input type="text" readOnly defaultValue={user?.name || ""} className="w-full border border-gray-200 bg-gray-50 p-2.5 sm:p-3 text-[12px] sm:text-[13px] text-gray-600 outline-none rounded-sm" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5">Email</label>
                <input type="text" readOnly defaultValue={user?.email || ""} className="w-full border border-gray-200 bg-gray-50 p-2.5 sm:p-3 text-[12px] sm:text-[13px] text-gray-600 outline-none rounded-sm" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5">Branch</label>
                <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder="e.g. Computer Science" className="w-full border border-gray-300 p-2.5 sm:p-3 text-[12px] sm:text-[13px] text-gray-900 outline-none focus:border-[#6B99A8] rounded-sm transition-colors" />
              </div>
              <div>
                <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5">Current CGPA</label>
                <input type="number" step="0.01" min="0" max="10" value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="e.g. 8.5" className="w-full border border-gray-300 p-2.5 sm:p-3 text-[12px] sm:text-[13px] text-gray-900 outline-none focus:border-[#6B99A8] rounded-sm transition-colors" />
              </div>
            </div>
            <div className="flex justify-end pt-4 border-t border-gray-100">
               <button type="submit" disabled={profileSaving} className="px-5 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#6B99A8] transition-colors rounded-sm uppercase tracking-wider flex items-center gap-2">
                 {profileSaving ? <Loader2 size={14} className="animate-spin" /> : "Save Profile"}
               </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );

  const renderApplications = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full">
      <h2 className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] tracking-tight mb-6 sm:mb-8">Application <span className="font-serif italic text-[#6B99A8]">Tracker</span></h2>
      <div className="bg-white border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Role & Company</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Date Applied</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.length === 0 ? (
               <tr><td colSpan="3" className="px-6 py-8 text-center text-sm text-gray-500">No applications found.</td></tr>
            ) : applications.map((app) => (
              <tr key={app.id} className="hover:bg-[#f4f8f9]/50 transition-colors">
                <td className="px-4 sm:px-6 py-4 sm:py-5">
                  <div className="font-semibold text-[#1A1A1A] text-[13px] sm:text-sm">{app.job?.title || "Job"}</div>
                  <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5">{app.job?.location || "Remote"}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 sm:py-5 text-[12px] sm:text-[13px] text-gray-600">
                  {new Date(app.applied_at).toLocaleDateString()}
                </td>
                <td className="px-4 sm:px-6 py-4 sm:py-5">
                  <span className={`inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-sm text-[10px] sm:text-[11px] font-medium tracking-wide ${
                    app.state === 'OFFERED' ? 'bg-green-50 text-green-700 border border-green-200' :
                    app.state === 'REJECTED' ? 'bg-red-50 text-red-700 border border-red-200' :
                    'bg-[#f4f8f9] text-[#5B8D9E] border border-[#6B99A8]/20'
                  }`}>
                    {app.state}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-[#6B99A8]/20 selection:text-[#1A1A1A]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-sm shadow-2xl flex items-center gap-3 text-[13px] sm:text-sm font-medium">
            <CheckCircle2 size={18} className="text-[#6B99A8]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen overflow-hidden">
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] sm:w-[280px] bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:transform-none ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-5 sm:p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold tracking-tighter text-[#1A1A1A]">
              Place<span className="font-serif italic text-[#6B99A8] font-normal">Me</span>.
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-900">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-4 mt-2">Menu</p>
            <button onClick={() => handleTabChange('overview')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'overview' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <LayoutDashboard size={16} /> Overview
            </button>
            <button onClick={() => handleTabChange('jobs')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'jobs' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <Briefcase size={16} /> Job Listings
            </button>
            <button onClick={() => handleTabChange('applications')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'applications' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <Clock size={16} /> App Tracking
            </button>
            <button onClick={() => handleTabChange('profile')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'profile' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <User size={16} /> Profile
            </button>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 shrink-0 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white text-[11px] font-bold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{user?.name || "Student User"}</p>
                <p className="text-[11px] text-[#6B99A8] font-medium">Student</p>
              </div>
            </div>
            <button onClick={() => { logout(); router.push("/"); }} className="w-full mt-4 flex items-center gap-2 px-3 py-2 text-xs text-red-600 font-medium hover:bg-red-50 rounded-sm transition-colors justify-center">
              Log Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#fafafa]">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 h-16 shrink-0 flex items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-900">
                <Menu size={20} />
              </button>
              <h1 className="text-base sm:text-lg font-medium text-[#1A1A1A] capitalize hidden sm:block">
                {activeTab.replace('-', ' ')}
              </h1>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#f4f8f9] border border-[#6B99A8]/20 rounded-sm text-[11px] font-medium text-[#5B8D9E]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Open for Placement
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 no-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'jobs' && renderJobs()}
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'applications' && renderApplications()}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
