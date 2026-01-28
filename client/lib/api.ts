import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL
const api = axios.create({
    baseURL: `${baseURL}/api`
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;

