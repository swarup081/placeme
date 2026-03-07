"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Users, FileText, Calendar, Bell, Search,
  CheckCircle2, ChevronRight, X, Clock, MapPin,
  Briefcase, Filter, ArrowUpRight, Plus, Download, LayoutDashboard, Loader2
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CompanyDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Data States
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Job Form States
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobBranches, setJobBranches] = useState("");
  const [jobCgpa, setJobCgpa] = useState("");

  useEffect(() => {
    if (!authLoading && (!user || (user.role !== "RECRUITER" && user.role !== "ADMIN"))) {
      router.push("/?auth=true");
    } else if (user) {
      fetchData();
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      // Fetch Recruiter's Jobs
      const { data: myJobs } = await supabase
        .from("jobs")
        .select("*")
        .eq("recruiter_id", user.id);

      if (myJobs) setJobs(myJobs);

      // Fetch Applications for these jobs
      const { data: appsData } = await supabase
        .from("applications")
        .select("*, job:jobs(*), student:profiles(*)")
        .in("job_id", myJobs?.map(j => j.id) || []);

      if (appsData) setApplicants(appsData);

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

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("jobs").insert({
        recruiter_id: user.id,
        title: jobTitle,
        description: jobDesc,
        branches: jobBranches.split(",").map(b => b.trim()),
        min_cgpa: parseFloat(jobCgpa) || null,
        state: "SUBMITTED" // Require T&P approval
      });

      if (error) throw error;

      showToast("Job successfully submitted for T&P Approval!");
      setJobTitle(""); setJobDesc(""); setJobBranches(""); setJobCgpa("");
      fetchData();
      setActiveTab("listings");
    } catch (err) {
      showToast("Error posting job: " + err.message);
    }
  };

  const updateApplicantState = async (appId, newState) => {
    try {
      const { error } = await supabase.from("applications").update({ state: newState }).eq("id", appId);
      if (error) throw error;
      showToast(`Applicant marked as ${newState}`);
      fetchData();
      setSelectedApplicant(null);
    } catch (err) {
      showToast("Error updating status: " + err.message);
    }
  };

  if (authLoading || loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-[#2C6E8F]" size={40} />
      </div>
    );
  }

  const renderOverview = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-[#6B99A8]/40 transition-colors">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Active Jobs</p>
          <div className="flex items-end gap-3"><span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">{jobs.length}</span></div>
        </div>
        <div className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-[#6B99A8]/40 transition-colors">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Total Applicants</p>
          <div className="flex items-end gap-3"><span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">{applicants.length}</span></div>
        </div>
        <div className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-[#6B99A8]/40 transition-colors">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Shortlisted</p>
          <div className="flex items-end gap-3"><span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">{applicants.filter(a => a.state === 'SHORTLISTED' || a.state === 'OFFERED').length}</span></div>
        </div>
      </div>
    </motion.div>
  );

  const renderPostJob = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl">
      <h2 className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] tracking-tight mb-6 sm:mb-8">Post <span className="font-serif italic text-[#6B99A8]">New Role</span></h2>
      <form onSubmit={handlePostJob} className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Job Title</label>
          <input required value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" placeholder="e.g. Software Development Engineer" className="w-full border border-gray-300 p-3 text-[13px] text-gray-900 outline-none focus:border-[#6B99A8] rounded-sm transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Eligible Branches (comma separated)</label>
          <input required value={jobBranches} onChange={(e) => setJobBranches(e.target.value)} type="text" placeholder="e.g. CSE, ECE, IT" className="w-full border border-gray-300 p-3 text-[13px] text-gray-900 outline-none focus:border-[#6B99A8] rounded-sm transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Minimum CGPA Requirement</label>
          <input required value={jobCgpa} onChange={(e) => setJobCgpa(e.target.value)} type="number" step="0.01" min="0" max="10" placeholder="e.g. 7.5" className="w-full border border-gray-300 p-3 text-[13px] text-gray-900 outline-none focus:border-[#6B99A8] rounded-sm transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Job Description</label>
          <textarea required value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} rows="5" placeholder="Describe the role, responsibilities, and requirements..." className="w-full border border-gray-300 p-3 text-[13px] text-gray-900 outline-none focus:border-[#6B99A8] rounded-sm transition-colors resize-none"></textarea>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button type="submit" className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] sm:text-xs font-semibold hover:bg-[#6B99A8] transition-colors rounded-sm uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 size={16} /> Submit for Approval
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderApplicants = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] tracking-tight">Manage <span className="font-serif italic text-[#6B99A8]">Applicants</span></h2>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 sm:px-6 py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-4 sm:px-6 py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Job Applied</th>
              <th className="px-4 sm:px-6 py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Branch / CGPA</th>
              <th className="px-4 sm:px-6 py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 sm:px-6 py-4 text-right text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applicants.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-[#f4f8f9]/50 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-xs">
                      {candidate.student?.name?.charAt(0) || "S"}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A] text-[13px] sm:text-sm">{candidate.student?.name || "Student"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-[12px] sm:text-[13px] font-medium text-[#4A5560]">
                  {candidate.job?.title || "Job"}
                </td>
                <td className="px-4 sm:px-6 py-4 text-[12px] sm:text-[13px] text-gray-600">
                  {candidate.student?.branch || "N/A"} • <span className="font-medium">{candidate.student?.cgpa || "N/A"}</span>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-sm text-[10px] sm:text-[11px] font-medium tracking-wide border ${
                    candidate.state === 'SHORTLISTED' ? 'bg-[#f4f8f9] text-[#5B8D9E] border-[#6B99A8]/20' :
                    candidate.state === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                    candidate.state === 'OFFERED' ? 'bg-green-50 text-green-700 border-green-200' :
                    'bg-gray-50 text-gray-600 border-gray-200'
                  }`}>
                    {candidate.state}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-right">
                  <button onClick={() => setSelectedApplicant(candidate)} className="text-[#6B99A8] hover:text-[#1A1A1A] text-[12px] sm:text-[13px] font-medium transition-colors">
                    Review
                  </button>
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
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-5 py-3.5 rounded-sm shadow-2xl flex items-center gap-3 text-sm font-medium">
            <CheckCircle2 size={18} className="text-[#6B99A8]" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen overflow-hidden">
        <aside className="hidden lg:flex inset-y-0 left-0 z-50 w-[260px] sm:w-[280px] bg-white border-r border-gray-200 flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A1A1A] flex items-center justify-center rounded-sm">
              <Building2 size={16} className="text-white" />
            </div>
            <div className="text-xl font-bold tracking-tighter text-[#1A1A1A]">
              Company<span className="font-serif italic text-[#6B99A8] font-normal">Portal</span>.
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'overview' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button onClick={() => setActiveTab('postJob')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'postJob' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <Plus size={16} /> Post a Job
            </button>
            <button onClick={() => setActiveTab('applicants')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'applicants' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <Users size={16} /> Manage Applicants
            </button>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 flex items-center justify-center text-white text-[11px] font-bold">
                {user?.name?.charAt(0).toUpperCase() || "R"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{user?.name || "Recruiter"}</p>
                <p className="text-[11px] text-gray-500 font-medium">Hiring Manager</p>
              </div>
            </div>
            <button onClick={() => { logout(); router.push("/"); }} className="w-full mt-4 flex items-center gap-2 px-3 py-2 text-xs text-red-600 font-medium hover:bg-red-50 rounded-sm transition-colors justify-center">
              Log Out
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#fafafa]">
          <header className="bg-white border-b border-gray-200 h-16 shrink-0 flex items-center justify-between px-8">
            <h1 className="text-lg font-medium text-[#1A1A1A] capitalize">
              {activeTab === "postJob" ? "Post a Job" : activeTab}
            </h1>
          </header>

          <div className="flex-1 overflow-y-auto p-8 lg:p-10 no-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'postJob' && renderPostJob()}
              {activeTab === 'applicants' && renderApplicants()}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Applicant Review Modal */}
      <AnimatePresence>
        {selectedApplicant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white max-w-lg w-full rounded-sm overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">Review Applicant</h3>
                <button onClick={() => setSelectedApplicant(null)} className="text-gray-400 hover:text-gray-900"><X size={18} /></button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-[#1A1A1A]">{selectedApplicant.student?.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{selectedApplicant.student?.email}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 rounded-sm">CGPA: {selectedApplicant.student?.cgpa}</span>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">Applied Role</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{selectedApplicant.job?.title}</p>
                </div>
                <div className="pt-4 flex gap-3">
                  <button onClick={() => updateApplicantState(selectedApplicant.id, 'SHORTLISTED')} className="flex-1 bg-[#1A1A1A] text-white text-xs font-semibold py-2.5 uppercase tracking-wide hover:bg-[#6B99A8] transition-colors rounded-sm">
                    Shortlist
                  </button>
                  <button onClick={() => updateApplicantState(selectedApplicant.id, 'OFFERED')} className="flex-1 bg-green-600 text-white text-xs font-semibold py-2.5 uppercase tracking-wide hover:bg-green-700 transition-colors rounded-sm">
                    Offer Role
                  </button>
                  <button onClick={() => updateApplicantState(selectedApplicant.id, 'REJECTED')} className="flex-1 border border-red-200 text-red-600 text-xs font-semibold py-2.5 uppercase tracking-wide hover:bg-red-50 transition-colors rounded-sm">
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
