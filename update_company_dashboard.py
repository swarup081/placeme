import re

with open('frontend/components/CompanyDashboard.jsx', 'r') as f:
    content = f.read()

# 1. Update imports
imports_replace = """import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { apiFetch } from "@/lib/api";
import {
  LayoutDashboard, PlusCircle, Users, Bell,
  Search, CheckCircle2, ChevronRight, Star,
  TrendingUp, Filter, MapPin, X, Calendar, Clock, Link as LinkIcon, FileText, Menu,
  Loader2, Building, Globe, LogOut, AlertCircle
} from "lucide-react";"""

content = re.sub(r'import { useState } from "react";.*?from "lucide-react";', imports_replace, content, flags=re.DOTALL)

# 2. Add setup state and functions
setup_state = """export default function CompanyDashboard() {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Company setup state
  const [needsSetup, setNeedsSetup] = useState(false);
  const [setupLoading, setSetupLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [companyDomain, setCompanyDomain] = useState("");
  const [setupSubmitting, setSetupSubmitting] = useState(false);
  const [setupError, setSetupError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/recruiter/profile");
        const data = await res.json();

        if (!res.ok) {
          setSetupLoading(false);
          return;
        }

        if (!data.profile?.companyId) {
          setNeedsSetup(true);
        } else {
          setNeedsSetup(false);
        }
      } catch {
        // Fallback
      }
      setSetupLoading(false);
    })();
  }, []);

  const handleCompanySetup = async (e) => {
    e.preventDefault();
    setSetupError("");
    setSetupSubmitting(true);

    try {
      const res = await apiFetch("/recruiter/setup-company", {
        method: "POST",
        body: JSON.stringify({ companyName, domains: [companyDomain] }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSetupError(data.error || "Setup failed.");
        setSetupSubmitting(false);
        return;
      }

      setNeedsSetup(false);
    } catch {
      setSetupError("Failed to connect to server.");
    }
    setSetupSubmitting(false);
  };
"""

content = re.sub(r'export default function CompanyDashboard\(\) \{.*?const \[isMobileMenuOpen, setIsMobileMenuOpen\] = useState\(false\);', setup_state, content, flags=re.DOTALL)

# 3. Add loading and setup UI right before return (
setup_ui = """
  // Loading state
  if (setupLoading) {
    return (
      <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2C6E8F] animate-spin" />
      </div>
    );
  }

  // Company Setup Flow
  if (needsSetup) {
    return (
      <div className="min-h-screen bg-[#f3f7f6] flex items-center justify-center px-4">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-br from-[#71a2b6] to-transparent opacity-20" style={{ clipPath: "polygon(0 0, 40% 0, 10% 100%, 0 100%)" }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-lg">
          <div className="text-center mb-8">
            <span className="text-xl font-bold tracking-widest text-[#1A1A1A] uppercase">PlaceMe</span>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Building size={20} className="text-[#2C6E8F]" />
              <h1 className="text-2xl font-medium text-[#1A1A1A]">
                Set Up Your <span className="font-serif italic text-[#2C6E8F]">Company</span>
              </h1>
            </div>
            <p className="text-sm text-gray-500 mt-2">Complete your company setup to start recruiting.</p>
          </div>

          <form onSubmit={handleCompanySetup} className="bg-white border border-gray-200 p-8 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Company Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full border border-gray-300 p-3 pl-10 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
                  placeholder="e.g. Acme Corp"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Domain</label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  required
                  value={companyDomain}
                  onChange={(e) => setCompanyDomain(e.target.value)}
                  className="w-full border border-gray-300 p-3 pl-10 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
                  placeholder="e.g. acme.com"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">Recruiters with this email domain will be verified.</p>
            </div>

            {setupError && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-sm">
                <AlertCircle size={14} />
                {setupError}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={setupSubmitting}
              className="w-full bg-[#1A1A1A] text-white p-3.5 text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {setupSubmitting ? <Loader2 size={16} className="animate-spin" /> : <>Set Up Company <ChevronRight size={16} /></>}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return ("""

content = content.replace('  return (\n    <div className="min-h-screen bg-[#fafbfc] flex font-sans relative">', setup_ui + '\n    <div className="min-h-screen bg-[#fafbfc] flex font-sans relative">')

# 4. Add logout button in sidebars
desktop_logout = """<div className="p-4 border-t border-gray-100">
          <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-[12px] text-gray-500 hover:text-red-600 transition-colors font-medium w-full">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>"""
content = re.sub(r'</button>\n        </div>\n      </div>\n\n      \{\/\* Mobile Sidebar Overlay \*\/\}', '</button>\n        </div>\n        ' + desktop_logout + '\n\n      {/* Mobile Sidebar Overlay */}', content)

mobile_logout = """<div className="p-4 border-t border-gray-100">
                <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-[12px] text-gray-500 hover:text-red-600 transition-colors font-medium w-full">
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            </motion.div>"""
content = re.sub(r'</button>\n              </div>\n            </motion\.div>', '</button>\n              </div>\n              ' + mobile_logout, content)

# 5. Add user.email header
header_update = """<div className="flex items-center gap-3">
            {user && <span className="text-xs text-gray-500 hidden sm:block">{user.email}</span>}
            <button className="p-2 text-gray-400 hover:text-[#1A1A1A] transition-colors"><Bell size={18} /></button>
          </div>"""
content = re.sub(r'<div className="flex items-center gap-3">\n\s*<button className="p-2 text-gray-400 hover:text-\[#1A1A1A\] transition-colors"><Bell size=\{18\} /></button>\n\s*</div>', header_update, content)


with open('frontend/components/CompanyDashboard.jsx', 'w') as f:
    f.write(content)
