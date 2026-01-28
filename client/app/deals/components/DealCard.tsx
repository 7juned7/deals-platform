'use client';

import { Deal } from "@/types/deals";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface Props {
  deal: Deal;
  isClaimed: boolean;
  onClaim: (id: string) => void;
}

export default function DealCard({ deal, isClaimed, onClaim }: Props) {
  const { user, authLoading } = useAuthContext();
  const router = useRouter();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  if (authLoading) return null;

  const isLoggedIn = Boolean(user);
  const isVerified = Boolean(user?.isVerified);
  const isLocked = deal.accessLevel === "locked";

  const disabled = isClaimed || (isLocked && !isVerified);

  /* ---------------- HANDLERS ---------------- */
  const handleCardClick = () => {
    router.push(`/deals/${deal._id}`);
  };

  const handleClaimClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ IMPORTANT

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    if (isLocked && !isVerified) {
      router.push("/verify");
      return;
    }

    onClaim(deal._id);
  };

  return (
    <motion.div
      onClick={handleCardClick}   // ✅ CARD CLICK
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="relative cursor-pointer"
    >
      <div
        className="
          h-full rounded-2xl border border-white/5
          bg-[#111113]
          p-6
          shadow-[0_0_0_1px_rgba(255,255,255,0.03)]
          hover:shadow-[0_30px_80px_rgba(0,0,0,0.9)]
          transition
        "
      >
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-medium text-white leading-snug">
            {deal.title}
          </h3>

          {isClaimed && (
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-blue-400">
              Claimed
            </span>
          )}
        </div>

        {/* DESCRIPTION */}
        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
          {deal.shortDescription}
        </p>

        <div className="my-4 h-px bg-white/5" />

        {/* ACCESS INFO */}
        {isLocked && !isVerified && (
          <p className="text-xs text-amber-400">
            🔒 Verify account to unlock
          </p>
        )}

        {!isLoggedIn && (
          <p className="text-xs text-blue-400">
            Login required to claim
          </p>
        )}

        {/* CTA */}
        <button
          onClick={handleClaimClick} // ✅ stopPropagation inside
          disabled={disabled}
          className={`
            mt-5 w-full rounded-lg py-2.5 text-sm font-medium
            transition
            ${
              disabled
                ? "bg-white/5 text-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200"
            }
          `}
        >
          {isClaimed
            ? "Already claimed"
            : isLocked && !isVerified
            ? "Verify to unlock"
            : "Claim now"}
        </button>
      </div>
    </motion.div>
  );
}
