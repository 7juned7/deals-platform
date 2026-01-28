'use client';

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, authLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        sticky top-0 z-50
        border-b border-white/5
        bg-[#0B0B0C]/80
        backdrop-blur-xl
      "
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-semibold text-white tracking-tight"
          >
            DealsApp
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/deals"
              className={`text-sm transition ${
                isActive("/deals")
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Explore Deals
            </Link>

            {user && (
              <Link
                href="/my-claims"
                className={`text-sm transition ${
                  isActive("/my-claims")
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                My Claims
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {authLoading ? (
            <span className="text-xs text-gray-500">
              Checking session…
            </span>
          ) : !user ? (
            <>
              <Link
                href="/login"
                className="
                  text-sm text-gray-400
                  hover:text-white transition
                "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  rounded-xl bg-white px-4 py-2
                  text-sm font-medium text-black
                  hover:bg-gray-200 transition
                "
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm text-gray-300">
                  {user.email}
                </p>
                {!user.isVerified && (
                  <p className="text-xs text-amber-400">
                    Unverified account
                  </p>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="
                  text-sm text-red-400
                  hover:text-red-300 transition
                "
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
