import axios from 'axios';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';
import { loadingService } from '../utils/loadingService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token (support both legacy and new storage keys)
api.interceptors.request.use(
  (config) => {
    const tokenFromTeaKey = getStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    const tokenFromLegacy = localStorage.getItem('accessToken');
    const token = tokenFromTeaKey || tokenFromLegacy || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData (let axios set it automatically)
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    // start global loader for network requests
    try { loadingService.start(); } catch (e) {}
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    try { loadingService.stop(); } catch (e) {}
    return response.data;
  },
  async (error) => {
    try { loadingService.stop(); } catch (e) {}
    return Promise.reject(error);
  }
);

export default api;
