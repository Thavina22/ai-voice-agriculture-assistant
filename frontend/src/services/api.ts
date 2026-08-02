import axios from "axios";

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '' && !envUrl.includes('undefined')) {
    return envUrl.replace(/\/+$/, '');
  }
  // Default fallback to live production Render backend
  return "https://krishi-mitra-ai-backend.onrender.com";
};

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 15000,
});

export const apiClient = api;
export default api;