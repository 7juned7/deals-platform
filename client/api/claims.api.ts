import api from "@/lib/api";
import { Deal } from "@/types/deals";

export interface Claim {
  _id: string;
  deal: Deal;
  status: "pending" | "approved";
}

export const getMyClaimsApi = async (): Promise<Claim[]> => {
  const res = await api.get("/claims/me");
  return res.data; // backend returns array directly
};
