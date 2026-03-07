"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  GraduationCap, Building2, Briefcase, ArrowLeft, 
  X, Loader2, Mail, Lock, User, CheckCircle2, AlertCircle,
  KeyRound
} from "lucide-react";

export default function AuthDrawer({ isOpen, onClose }) {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [authMode, setAuthMode] = useState("login");
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState(null);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [branch, setBranch] = useState("");

  // Re-use for OTP
  const [otp, setOtp] = useState("");

  const resetState = () => {
    setAuthMode("login");
    setStep(1);
    setSelectedRole(null);
    setIsLoading(false);
    setError("");
    setLoadingText("");
    setEmail("");
    setPassword("");
    setName("");
    setCgpa("");
    setBranch("");
    setOtp("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep(2);
  };

  // ── ROUTING BASED ON ROLE ───────────────────────────────
  const routeToDashboard = (role) => {
    if (role === "STUDENT") router.push("/dashboard/student");
    else if (role === "RECRUITER") router.push("/dashboard/company");
    else if (role === "TNP") router.push("/dashboard/tnp");
    else if (role === "ADMIN") router.push("/dashboard/tnp"); // Fallback
    else router.push("/");
  };

  // ── LOGIN ──────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Ensure AuthContext picks it up
      await refreshUser();

      // Fetch profile to know the role
      const { data: profileData } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const userRole = profileData?.role || selectedRole?.toUpperCase() || "STUDENT";

      handleClose();
      routeToDashboard(userRole);
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── NEXT STEP ──────────────────────────────────────────
  const handleNextStep = async (e) => {
    e.preventDefault();
    if (authMode === "login") {
      await handleLogin(e);
      return;
    }

    if (step === 2 && selectedRole === "student") {
      if (!name || !email || !password || !cgpa || !branch) {
        setError("Please fill all fields.");
        return;
      }
      await handleSendOtp();
    } else if (step === 3) {
      await handleVerifyOtp(e);
    }
  };

  // ── STUDENT REGISTER: SignUp (which sends confirmation) ─
  const handleSendOtp = async () => {
    setError("");
    setIsLoading(true);

    try {
      // For Supabase, signUp with email/password handles verification implicitly if enabled.
      // But we will pass user_metadata so the trigger can create the profile properly!
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            role: "STUDENT"
          }
        }
      });

      if (signUpError) throw signUpError;

      // If email confirmation is enabled, they need OTP.
      // If auto-confirm is on in local dev, this might just log them in directly.
      if (data?.session) {
        // Auto-confirmed! Update the profile with extra fields
        await supabase.from("profiles").update({
          cgpa: parseFloat(cgpa) || null,
          branch: branch
        }).eq("id", data.user.id);

        await refreshUser();
        handleClose();
        routeToDashboard("STUDENT");
      } else {
        // Requires OTP verification
        setStep(3);
      }
    } catch (err) {
      setError(err.message || "Failed to register.");
    } finally {
      setIsLoading(false);
    }
  };

  // ── STUDENT REGISTER: verify-otp ───────────────────────
  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    setError("");
    setIsLoading(true);
    setStep("loading");
    setLoadingText("Verifying your email...");

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup"
      });

      if (verifyError) throw verifyError;

      // Update custom profile fields
      if (data?.user) {
         await supabase.from("profiles").update({
            cgpa: parseFloat(cgpa) || null,
            branch: branch
         }).eq("id", data.user.id);
      }

      await refreshUser();

      setLoadingText("Setting up your dashboard...");
      setTimeout(() => {
        handleClose();
        routeToDashboard("STUDENT");
      }, 1000);

    } catch (err) {
      setError(err.message || "Invalid or expired code.");
      setStep(3); // Go back to OTP input
    } finally {
      setIsLoading(false);
    }
  };


  // ── RENDER: Role Selection ─────────────────────────────
  const renderRoleSelection = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <p className="text-sm text-gray-500 mb-6">Select how you want to use the platform</p>

      {[
        { id: "student", label: "Student", desc: "Find and apply for placements", icon: GraduationCap },
        { id: "company", label: "Company / Recruiter", desc: "Hire top talent", icon: Building2 },
        { id: "tnp", label: "T&P Cell", desc: "Manage campus placements", icon: Briefcase }
      ].map((role) => (
        <button
          key={role.id}
          onClick={() => handleRoleSelect(role.id)}
          className="w-full flex items-center p-4 border border-gray-100 rounded-sm hover:border-[#2C6E8F] hover:bg-[#f4f8f9] transition-all group text-left"
        >
          <div className="w-10 h-10 rounded-sm bg-gray-50 flex items-center justify-center group-hover:bg-[#2C6E8F] transition-colors mr-4">
            <role.icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#2C6E8F]">{role.label}</div>
            <div className="text-xs text-gray-400">{role.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );

  // ── RENDER: Login Form ─────────────────────────────────
  const renderLoginForm = () => (
    <form onSubmit={handleNextStep} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500 capitalize">Sign in as {selectedRole || "Student"}</p>
        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100">
          <span className="flex w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span className="text-[10px] text-gray-500 uppercase font-medium tracking-wider">System Operational</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 pl-10 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="block text-xs font-medium text-gray-600">Password</label>
          <button type="button" className="text-xs text-[#2C6E8F] hover:underline">Forgot password?</button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 pl-10 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
            placeholder="••••••••"
          />
        </div>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-sm">
          <AlertCircle size={14} />{error}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1A1A1A] text-white p-3 text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
      </button>

      {selectedRole === "student" && (
        <p className="text-center text-xs text-gray-400 mt-3">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={() => { setAuthMode("register"); setStep(2); setError(""); }} className="text-[#2C6E8F] hover:underline font-medium">Register</button>
        </p>
      )}
    </form>
  );

  // ── RENDER: Student Registration (Basic Info + Email) ──
  const renderStudentRegistration = () => (
    <form onSubmit={handleNextStep} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <p className="text-sm text-gray-500 mb-4">Create your student account</p>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 pl-10 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
            placeholder="Your full name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">CGPA</label>
          <input
            required
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
            placeholder="e.g. 8.5"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Branch</label>
          <input
            required
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
            placeholder="e.g. CSE"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">College Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 pl-10 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
            placeholder="you@college.edu"
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-1.5">Use your official college email address</p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 pl-10 text-sm focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
            placeholder="At least 6 characters"
          />
        </div>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-sm">
          <AlertCircle size={14} />{error}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1A1A1A] text-white p-3 text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Verify Email"}
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        Already have an account?{" "}
        <button type="button" onClick={() => { setAuthMode("login"); setStep(2); setError(""); }} className="text-[#2C6E8F] hover:underline font-medium">Sign in</button>
      </p>
    </form>
  );

  // ── RENDER: OTP Verification ───────────────────────────
  const renderOtpStep = () => (
    <form onSubmit={handleNextStep} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-4">
        <div className="w-12 h-12 bg-[#f4f8f9] rounded-full flex items-center justify-center mx-auto mb-3">
          <KeyRound size={22} className="text-[#2C6E8F]" />
        </div>
        <p className="text-sm text-gray-600">
          We sent a verification code to <br />
          <span className="font-semibold text-[#1A1A1A]">{email}</span>
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1.5">Verification Code</label>
        <input
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 p-3 text-sm text-center tracking-[0.3em] font-mono focus:outline-none focus:border-[#2C6E8F] focus:ring-1 focus:ring-[#2C6E8F]/20 transition-all"
          placeholder="000000"
          maxLength={6}
        />
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-sm">
          <AlertCircle size={14} />{error}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#1A1A1A] text-white p-3 text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Verify & Create Account"}
      </button>

      <p className="text-center text-xs text-gray-400 mt-3">
        Didn&apos;t receive the code?{" "}
        <button type="button" onClick={handleSendOtp} className="text-[#2C6E8F] hover:underline font-medium">Resend</button>
      </p>
    </form>
  );

  // ── RENDER: Loading State ──────────────────────────────
  const renderLoadingState = () => (
    <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-500">
      <Loader2 size={36} className="text-[#2C6E8F] animate-spin mb-4" />
      <p className="text-sm text-gray-600 font-medium">{loadingText}</p>
    </div>
  );

  // ── Determine which content to show ────────────────────
  const renderContent = () => {
    if (step === "loading") return renderLoadingState();

    if (step === 1) return renderRoleSelection();

    if (authMode === "login" && step === 2) return renderLoginForm();

    if (authMode === "register") {
      if (step === 2) return renderStudentRegistration();
      if (step === 3) return renderOtpStep();
    }

    return renderLoginForm();
  };

  const getTitle = () => {
    if (step === "loading") return "Please wait";
    if (step === 1) return "Get Started";
    if (authMode === "login") return "Welcome Back";
    if (step === 3) return "Verify Email";
    return "Create Account";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col border-l border-[#2C6E8F]/20"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {step !== 1 && step !== "loading" && (
                  <button
                    onClick={() => {
                      setError("");
                      if (authMode === "register" && step === 3) {
                        setStep(2);
                      } else if (step === 2) {
                        setStep(1);
                        setSelectedRole(null);
                        setAuthMode("login");
                      }
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <h2 className="text-lg font-medium text-[#1A1A1A]">{getTitle()}</h2>
              </div>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {renderContent()}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 text-center">
              <p className="text-[11px] text-gray-400">
                By continuing, you agree to PlaceMe&apos;s Terms of Service
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
