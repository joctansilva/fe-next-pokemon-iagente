"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { getSession } from "@/auth";

type AuthContextType = {
  user: any;
  status: "loading" | "authenticated" | "unauthenticated";
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  status: "loading",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthContextType>({
    user: null,
    status: "loading",
  });

  useEffect(() => {
    const session = getSession();
    setAuthState({
      user: session?.user || null,
      status: session?.user ? "authenticated" : "unauthenticated",
    });
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);