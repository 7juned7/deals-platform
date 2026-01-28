'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthContext } from "@/context/AuthContext";
import { getMyClaimsApi, Claim } from "@/api/claims.api";

export default function MyClaimsPage() {
  /* -------------------- HOOKS -------------------- */
  const { user, authLoading } = useAuthContext();
  const router = useRouter();

  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  /* -------------------- PROTECT ROUTE -------------------- */
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  /* -------------------- FETCH CLAIMS -------------------- */
  useEffect(() => {
    if (!user) return;

    setLoading(true);
    getMyClaimsApi()
      .then((data) => setClaims(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [user]);

  /* -------------------- STATES -------------------- */
  if (authLoading || loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-sm text-gray-400">Loading your dashboard…</p>
      </div>
    );
  }

  if (!user) return null;

  /* -------------------- UI -------------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-10"
    >
      {/* PAGE HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight text-white">
          My Claims
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Track your claimed deals and their approval status
        </p>
      </div>

      {/* PROFILE CARD */}
      <div
        className="
          mb-10 rounded-2xl border border-white/5
          bg-[#111113] p-6
        "
      >
        <h2 className="text-lg font-medium text-white mb-3">
          Profile
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-sm text-white">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Verification</p>
            <span
              className={`inline-block mt-1 text-xs px-2 py-1 rounded-md ${
                user.isVerified
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {user.isVerified ? "Verified" : "Not verified"}
            </span>
          </div>
        </div>
      </div>

      {/* CLAIMS LIST */}
      {claims.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-gray-400">
            You haven’t claimed any deals yet.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Browse deals and claim one to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {claims.map((claim) => (
            <div
              key={claim._id}
              className="
                rounded-2xl border border-white/5
                bg-[#111113] p-6
                hover:border-white/10 transition
              "
            >
              <h3 className="text-lg font-medium text-white">
                {claim.deal.title}
              </h3>

              {/* ✅ FIXED FIELD */}
              <p className="mt-2 text-sm text-gray-400">
                {claim.deal.shortDescription}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    claim.status === "approved"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {claim.status === "approved"
                    ? "Approved"
                    : "Pending approval"}
                </span>

                {claim.deal.accessLevel === "locked" && !user.isVerified && (
                  <span className="text-xs text-amber-400">
                    🔒 Verification required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
