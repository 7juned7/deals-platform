import api from "@/lib/api";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    isVerified: boolean;
  };
}

// 🔹 LOGIN
export const loginApi = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", payload);
  return res.data;
};

// 🔹 REGISTER
export const registerApi = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};
export const getMeApi = async () => {
  const res = await api.get("/auth/me");
  console.log(res.data)
  return res.data;
};