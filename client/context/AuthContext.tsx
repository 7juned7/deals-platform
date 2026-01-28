'use client';

import { createContext, useContext } from "react";

export interface AuthUser {
  _id: string;
  email: string;
  isVerified: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;

  loading: boolean;        // login/register loading
  authLoading: boolean;    // 🔥 auth restore loading

  error: string | null;

  login: (email: string, password: string) => Promise<AuthUser>;
  register: (name: string, email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return ctx;
};

export default AuthContext;
