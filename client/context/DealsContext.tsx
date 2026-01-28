import { Claim } from "@/api/claims.api";
import { Deal } from "@/types/deals";
import { useContext, createContext } from "react";

export interface DealsContextType {
  deals: Deal[];
  deal: Deal | null;
  claims: Claim[];              // ✅ ADD
  loading: boolean;
  error: string | null;

  search: string;
  setSearch: (v: string) => void;

  accessFilter: "all" | "public" | "locked";
  setAccessFilter: (v: "all" | "public" | "locked") => void;

  fetchDeals: () => Promise<void>;
  getDealById: (id: string) => Promise<void>;
  claimDeal: (id: string) => Promise<void>;

  isDealClaimed: (dealId: string) => boolean;
}


const DealsContext = createContext<DealsContextType | undefined>(undefined);

export const useDealsContext = () => {
  const ctx = useContext(DealsContext);
  if (!ctx) {
    throw new Error("useDealsContext must be used inside DealsProvider");
  }
  return ctx;
};

export default DealsContext;
