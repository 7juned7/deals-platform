'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/deals");
    } catch {
      // error handled in context
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          w-full max-w-md
          rounded-2xl
          border border-white/10
          bg-[#111113]
          p-8
          shadow-[0_30px_80px_rgba(0,0,0,0.8)]
        "
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue exploring deals
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="
              mb-5 rounded-lg
              border border-red-500/20
              bg-red-500/10
              px-4 py-3
              text-sm text-red-400
              text-center
            "
          >
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full rounded-xl
              border border-white/5
              bg-[#0B0B0C]
              px-4 py-3
              text-sm text-white
              placeholder-gray-500
              outline-none
              transition
              focus:border-white/20
              focus:ring-1 focus:ring-white/20
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full rounded-xl
              border border-white/5
              bg-[#0B0B0C]
              px-4 py-3
              text-sm text-white
              placeholder-gray-500
              outline-none
              transition
              focus:border-white/20
              focus:ring-1 focus:ring-white/20
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              mt-2 w-full rounded-xl
              bg-white py-3
              text-sm font-medium text-black
              hover:bg-gray-200
              transition
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-white hover:underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
