"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // 獲取初始 Session
    const getInitialSession = async () => {
      // 安全保險：8秒後無論如何都結束 loading
      const safetyTimeout = setTimeout(() => {
        if (mounted && loading) {
          console.warn("Auth: Safety timeout triggered");
          setLoading(false);
        }
      }, 8000);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        }
      } catch (err) {
        console.error("Error in getInitialSession:", err);
      } finally {
        clearTimeout(safetyTimeout);
        if (mounted) setLoading(false);
      }
    };

    getInitialSession();

    // 監聽 Auth 狀態變化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        console.log("Auth Event:", event);
        
        // 每次事件都給一個 5 秒強制結束 loading 的保險
        const eventTimeout = setTimeout(() => {
          if (mounted) setLoading(false);
        }, 5000);

        const currentUser = session?.user ?? null;
        
        try {
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            setUser(currentUser);
            if (currentUser) {
              await fetchProfile(currentUser.id);
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            setProfile(null);
          } else if (event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
            setUser(currentUser);
            if (currentUser) {
              await fetchProfile(currentUser.id);
            }
          }
        } finally {
          clearTimeout(eventTimeout);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 縮短為 5 秒超時

    try {
      // 修正：移除不支援的 .abortSignal() 鏈式調用，改用標準查詢
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.warn("fetchProfile aborted due to timeout");
      } else {
        console.error("Unexpected error in fetchProfile:", err);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


