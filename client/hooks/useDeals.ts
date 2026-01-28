'use client';

import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { Deal } from "@/types/deals";
import { Claim, getMyClaimsApi } from "@/api/claims.api";
import {
  claimDealApi,
  fetchAllDealsAPi,
  getDealApi,
} from "@/api/deals.api";

type AccessFilter = "all" | "locked" | "public";

export const useDeals = () => {
  const { user } = useAuthContext();

  const [deals, setDeals] = useState<Deal[]>([]);
  const [deal, setDeal] = useState<Deal | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [accessFilter, setAccessFilter] =
    useState<AccessFilter>("all");

  /* ---------------- FETCH ALL DEALS ---------------- */
 const fetchDeals = async () => {
  try {
    setLoading(true);
    setError(null);

    const data = await fetchAllDealsAPi();
    setDeals(data); // ✅ always array now
  } catch (err: any) {
    setError(err?.message || "Failed to fetch deals");
    setDeals([]);
  } finally {
    setLoading(false);
  }
};


  /* ---------------- FETCH CLAIMS ---------------- */
  const fetchClaims = async () => {
    try {
      const data = await getMyClaimsApi();
      setClaims(Array.isArray(data) ? data : []);
    } catch {
      setClaims([]);
    }
  };

  /* ---------------- CLAIM DEAL (OPTIMISTIC) ---------------- */
  const claimDeal = async (id: string) => {
    try {
      setError(null);

      await claimDealApi(id);

      const claimedDeal = deals.find((d) => d._id === id);
      if (!claimedDeal) return;

      setClaims((prev) => [
        ...prev,
        {
          _id: `temp-${id}`,
          deal: claimedDeal,
          status: "pending",
        },
      ]);
    } catch (err: any) {
      setError(err?.message || "Failed to claim deal");
      throw err;
    }
  };

  /* ---------------- FETCH SINGLE DEAL ---------------- */
  const getDealById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getDealApi(id);
setDeal(data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch deal");
      setDeal(null);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- IS DEAL CLAIMED ---------------- */
  const isDealClaimed = (dealId: string) => {
    return claims.some(
      (c) => c?.deal?._id === dealId
    );
  };

  /* ---------------- SEARCH + FILTER ---------------- */
  const filteredDeals = useMemo(() => {
    const searchLower = search.toLowerCase();

    return deals.filter((d) => {
      const matchesSearch =
        d.title?.toLowerCase().includes(searchLower);

      const matchesAccess =
        accessFilter === "all" ||
        d.accessLevel === accessFilter;

      return matchesSearch && matchesAccess;
    });
  }, [deals, search, accessFilter]);

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchDeals();

    if (user) {
      fetchClaims();      // login → load claims
    } else {
      setClaims([]);      // logout → reset
    }
  }, [user]);

  return {
    deals: filteredDeals,
    deal,
    claims,
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
  };
};
