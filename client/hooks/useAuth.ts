'use client';

import { useEffect, useState } from "react";
import { getMeApi, loginApi, registerApi } from "@/api/auth.api";

interface User {
  _id: string;
  email: string;
  isVerified: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
const [authLoading, setAuthLoading] = useState(true);
  // 🔹 LOGIN
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await loginApi({ email, password });
console.log(data.token)
      localStorage.setItem("token", data.token);
      setUser(data.user);

      return data.user;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 REGISTER
  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const data = await registerApi({ name, email, password });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      return data.user;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setAuthLoading(false);
    return;
  }

  getMeApi()
    .then((u) => setUser(u))
    .finally(() => setAuthLoading(false));
}, []);
 return {
  user,
  loading,
  error,
  authLoading,
  login,
  register,
  logout,
};
};
