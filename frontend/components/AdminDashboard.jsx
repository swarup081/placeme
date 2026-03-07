"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Users, LayoutDashboard, UserPlus,
  CheckCircle2, X, Mail, Loader2
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState(null);

  // Data States
  const [profiles, setProfiles] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Invite states
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("TNP");
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/?auth=true");
    } else if (user) {
      fetchData();
    }
  }, [user, authLoading, router]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const { data: profData } = await supabase
        .from("profiles")
        .select("*");
      if (profData) setProfiles(profData);
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

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to invite user");

      showToast(`${inviteRole} invite sent to ${inviteEmail}!`);
      setInviteEmail("");
      fetchData(); // Refresh to show new user
    } catch (err) {
      showToast("Error: " + err.message);
    } finally {
      setInviting(false);
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
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Total Users</p>
          <div className="flex items-end gap-3"><span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">{profiles.length}</span></div>
        </div>
        <div className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-[#6B99A8]/40 transition-colors">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Students</p>
          <div className="flex items-end gap-3"><span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">{profiles.filter(p => p.role === 'STUDENT').length}</span></div>
        </div>
        <div className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-[#6B99A8]/40 transition-colors">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">T&P Cells</p>
          <div className="flex items-end gap-3"><span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">{profiles.filter(p => p.role === 'TNP').length}</span></div>
        </div>
        <div className="bg-white border border-gray-200 p-5 sm:p-6 hover:border-[#6B99A8]/40 transition-colors">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Recruiters</p>
          <div className="flex items-end gap-3"><span className="text-2xl sm:text-3xl font-medium text-[#1A1A1A]">{profiles.filter(p => p.role === 'RECRUITER').length}</span></div>
        </div>
      </div>
    </motion.div>
  );

  const renderUsers = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full">
      <h2 className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] tracking-tight mb-6 sm:mb-8">Manage <span className="font-serif italic text-[#6B99A8]">System Users</span></h2>
      <div className="bg-white border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 sm:px-6 py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Name / Email</th>
              <th className="px-4 sm:px-6 py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-4 sm:px-6 py-4 text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status (Student)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.map((profile) => (
              <tr key={profile.id} className="hover:bg-[#f4f8f9]/50 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <div className="font-semibold text-[#1A1A1A] text-[13px] sm:text-sm">{profile.name || "Unknown"}</div>
                  <div className="text-[11px] sm:text-xs text-gray-500 mt-1">{profile.email}</div>
                </td>
                <td className="px-4 sm:px-6 py-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-sm text-[10px] sm:text-[11px] font-medium tracking-wide border ${
                    profile.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    profile.role === 'TNP' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                    profile.role === 'RECRUITER' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {profile.role}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 text-[12px] sm:text-[13px] font-medium text-[#4A5560]">
                  {profile.role === 'STUDENT' ? profile.student_state : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderInvites = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-xl">
      <h2 className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] tracking-tight mb-6 sm:mb-8">Admin <span className="font-serif italic text-[#6B99A8]">Invite</span></h2>
      <form onSubmit={handleInvite} className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
          <input required type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="tnp@college.edu" className="w-full border border-gray-300 p-3 text-[13px] text-gray-900 outline-none focus:border-[#6B99A8] rounded-sm transition-colors" />
        </div>
        <div>
          <label className="block text-[11px] sm:text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wider">Role</label>
          <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)} className="w-full border border-gray-300 p-3 text-[13px] text-gray-900 outline-none focus:border-[#6B99A8] rounded-sm transition-colors bg-white">
            <option value="TNP">T&P Cell</option>
            <option value="ADMIN">System Admin</option>
          </select>
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button type="submit" disabled={inviting} className="px-6 py-3 bg-[#1A1A1A] text-white text-[11px] sm:text-xs font-semibold hover:bg-[#6B99A8] transition-colors rounded-sm uppercase tracking-wider flex items-center gap-2">
            {inviting ? <Loader2 size={16} className="animate-spin" /> : <><Mail size={16} /> Send Invite</>}
          </button>
        </div>
      </form>
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
              <Shield size={16} className="text-white" />
            </div>
            <div className="text-xl font-bold tracking-tighter text-[#1A1A1A]">
              System<span className="font-serif italic text-[#6B99A8] font-normal">Admin</span>.
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'overview' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <LayoutDashboard size={16} /> Overview
            </button>
            <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'users' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <Users size={16} /> Manage Users
            </button>
            <button onClick={() => setActiveTab('invites')} className={`w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium transition-all rounded-sm ${activeTab === 'invites' ? 'bg-[#f4f8f9] text-[#5B8D9E]' : 'text-[#4A5560] hover:bg-gray-50 hover:text-gray-900'}`}>
              <UserPlus size={16} /> Send Invites
            </button>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-900 flex items-center justify-center text-white text-[11px] font-bold">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[#1A1A1A] truncate">{user?.name || "Admin Officer"}</p>
                <p className="text-[11px] text-gray-500 font-medium">System Role</p>
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
              {activeTab === "invites" ? "Admin Invites" : activeTab}
            </h1>
          </header>

          <div className="flex-1 overflow-y-auto p-8 lg:p-10 no-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'users' && renderUsers()}
              {activeTab === 'invites' && renderInvites()}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
