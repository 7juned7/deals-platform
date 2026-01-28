import api from "@/lib/api";
import { Deal } from "@/types/deals";

// fetch all deals
export const fetchAllDealsAPi = async (): Promise<Deal[]> => {
  const res = await api.get("/deal/all");

  const data = res.data;

  // normalize response
  return data.deals ?? data ?? [];
};

// fetch single deal
export const getDealApi = async (id: string): Promise<Deal> => {
  const res = await api.get(`/deal/${id}`);
console.log(res)
  const data = res.data;

  // normalize response
  return data.deal ?? data;
};

// claim deal
export const claimDealApi = async (id: string): Promise<void> => {
  await api.post(`/claims/${id}`);
};
