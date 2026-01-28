'use client';

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDealsContext } from "@/context/DealsContext";
import { useAuthContext } from "@/context/AuthContext";

export default function DealDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { user, authLoading } = useAuthContext();
  const {
    deal,
    loading,
    getDealById,
    claimDeal,
    isDealClaimed,
  } = useDealsContext();

  const isLoggedIn = Boolean(user);
  const isVerified = Boolean(user?.isVerified);
  const isLocked = deal?.accessLevel === "locked";
  const claimed = deal ? isDealClaimed(deal._id) : false;

  /* ---------------- FETCH FROM HOOK ---------------- */
  useEffect(() => {
    if (id) {
      getDealById(id);
    }
  }, [id]);

  /* ---------------- CLAIM HANDLER ---------------- */
  const handleClaim = async () => {
    if (!deal) return;

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (isLocked && !isVerified) {
      router.push("/verify");
      return;
    }

    await claimDeal(deal._id);
  };

  /* ---------------- STATES ---------------- */
  if (loading || authLoading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-gray-400">Loading deal details…</p>
      </div>
    );
  }

  if (!deal) {
    return (
      <p className="text-center text-red-400 py-20">
        Deal not found
      </p>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-white">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">{deal.title}</h1>
        <p className="mt-3 text-gray-400 max-w-3xl">
          {deal.shortDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-medium mb-3">About this deal</h2>
            <p className="text-gray-300 leading-relaxed">
              {deal.fullDescription}
            </p>
          </section>

          {Array.isArray(deal.eligibility) && deal.eligibility.length > 0 && (
            <section>
              <h2 className="text-xl font-medium mb-3">Eligibility</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {deal.eligibility.map((rule, i) => (
                  <li key={i}>{rule}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="rounded-xl border border-white/5 bg-[#111113] p-5">
            {isLocked && !isVerified && (
              <p className="text-sm text-amber-400 mb-3">
                🔒 Verify your account to unlock this deal
              </p>
            )}

            {!isLoggedIn && (
              <p className="text-sm text-blue-400 mb-3">
                Login required to claim
              </p>
            )}

            <button
              onClick={handleClaim}
              disabled={claimed || (isLocked && !isVerified)}
              className={`
                w-full rounded-lg py-2.5 text-sm font-medium transition
                ${
                  claimed || (isLocked && !isVerified)
                    ? "bg-white/5 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-200"
                }
              `}
            >
              {claimed
                ? "Already claimed"
                : isLocked && !isVerified
                ? "Verify to unlock"
                : "Claim deal"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
