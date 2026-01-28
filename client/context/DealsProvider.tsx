'use client';

import { ReactNode } from "react";
import DealsContext from "./DealsContext";
import { useDeals } from "@/hooks/useDeals";

interface Props {
  children: ReactNode;
}

export default function DealsProvider({ children }: Props) {
  const {
    deals,
    deal,
    claims,          // ✅ REQUIRED
    loading,
    error,
    search,
    setSearch,
    accessFilter,
    setAccessFilter,
    fetchDeals,
    getDealById,
    claimDeal,
    isDealClaimed,
  } = useDeals();

  return (
    <DealsContext.Provider
      value={{
        deals,
        deal,
        claims,       // ✅ REQUIRED
        loading,
        error,
        search,
        setSearch,
        accessFilter,
        setAccessFilter,
        fetchDeals,
        getDealById,
        claimDeal,
        isDealClaimed,
      }}
    >
      {children}
    </DealsContext.Provider>
  );
}
