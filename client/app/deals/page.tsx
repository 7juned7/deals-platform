'use client';

import { motion } from "framer-motion";
import { useDealsContext } from "@/context/DealsContext";
import DealsToolbar from "./components/DealsToolbar";
import DealCard from "./components/DealCard";

export default function DealsPage() {
  const {
    deals = [],
    loading,
    error,
    search,
    setSearch,
    accessFilter,
    setAccessFilter,
    claimDeal,
    isDealClaimed,
  } = useDealsContext();

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
          Available Deals
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Exclusive offers curated for you
        </p>
      </div>

      {/* TOOLBAR */}
      <DealsToolbar
        search={search}
        onSearchChange={setSearch}
        accessFilter={accessFilter}
        onAccessChange={setAccessFilter}
      />

      {/* ERROR STATE */}
      {error && !loading && (
        <div
          className="
            mt-6 mb-8 rounded-lg
            border border-red-500/20
            bg-red-500/10
            px-4 py-3 text-sm text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* LOADING STATE */}
      {loading && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="
                h-64 rounded-2xl
                bg-[#111113]
                border border-white/5
                animate-pulse
              "
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && deals.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-sm text-gray-400">
            No deals match your filters.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Try adjusting search or access level
          </p>
        </div>
      )}

      {/* DEALS GRID */}
      {!loading && !error && deals.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <DealCard
              key={deal._id}
              deal={deal}
              isClaimed={isDealClaimed(deal._id)}
              onClaim={claimDeal}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
