"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "./supabaseClient";

interface User {
  id: string;
  name?: string;
  email: string;
  role: string;
  // Student Specific
  college_id?: string;
  cgpa?: number;
  branch?: string;
  graduation_year?: number;
  student_state?: string;
  verified_by?: string;
  verified_at?: string;
  // Recruiter Specific
  company_id?: string;
  recruiter_verified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  refreshUser: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (authUserId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUserId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      } else if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: data.email || email,
          role: data.role,
          college_id: data.college_id,
          cgpa: data.cgpa,
          branch: data.branch,
          graduation_year: data.graduation_year,
          student_state: data.student_state,
          verified_by: data.verified_by,
          verified_at: data.verified_at,
          company_id: data.company_id,
          recruiter_verified: data.recruiter_verified
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const refreshUser = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await fetchProfile(session.user.id, session.user.email!);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Initial fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refreshUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          fetchProfile(session.user.id, session.user.email!);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
