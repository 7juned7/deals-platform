'use client';

import { ReactNode, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useAuth } from "@/hooks/useAuth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  // optional: restore auth from token (basic version)
  useEffect(() => {
    // later we can add /me API here
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
