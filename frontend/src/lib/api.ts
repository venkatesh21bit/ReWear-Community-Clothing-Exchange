import axios from 'axios';

/**
 * API Configuration for ReWear Frontend
 * Handles communication with Django backend
 */

// Base URL for the Django backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage (in browser only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        window.location.href = '/auth/login';
      }
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API endpoints configuration
export const endpoints = {
  // Authentication
  auth: {
    login: '/api/auth/login/',
    register: '/api/auth/register/',
    logout: '/api/auth/logout/',
    profile: '/api/auth/profile/',
    refreshToken: '/api/auth/refresh/',
  },
  
  // Users
  users: {
    list: '/api/users/',
    detail: (id: number) => `/api/users/${id}/`,
    profile: '/api/users/profile/',
    updateProfile: '/api/users/profile/update/',
  },
  
  // Items
  items: {
    list: '/api/items/',
    detail: (id: number) => `/api/items/${id}/`,
    create: '/api/items/create/',
    update: (id: number) => `/api/items/${id}/update/`,
    delete: (id: number) => `/api/items/${id}/delete/`,
    search: '/api/items/search/',
    categories: '/api/items/categories/',
    featured: '/api/items/featured/',
    myItems: '/api/items/my-items/',
  },
  
  // Swaps
  swaps: {
    list: '/api/swaps/',
    detail: (id: number) => `/api/swaps/${id}/`,
    create: '/api/swaps/create/',
    respond: (id: number) => `/api/swaps/${id}/respond/`,
    complete: (id: number) => `/api/swaps/${id}/complete/`,
    mySwaps: '/api/swaps/my-swaps/',
  },
  
  // Admin
  admin: {
    pendingItems: '/api/admin/items/pending/',
    approveItem: (id: number) => `/api/admin/items/${id}/approve/`,
    rejectItem: (id: number) => `/api/admin/items/${id}/reject/`,
    users: '/api/admin/users/',
    analytics: '/api/admin/analytics/',
  },
  
  // Health check
  health: '/api/health/',
};

// Helper functions for common API operations
export const apiHelpers = {
  /**
   * Set authentication token
   */
  setAuthToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },
  
  /**
   * Remove authentication token
   */
  removeAuthToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  },
  
  /**
   * Get current auth token
   */
  getAuthToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!apiHelpers.getAuthToken();
  },
  
  /**
   * Upload file with progress tracking
   */
  uploadFile: async (
    file: File,
    endpoint: string,
    onProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...(onProgress && {
        onUploadProgress: (progressEvent: any) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(progress);
          }
        },
      }),
    });
  },
};

// Environment configuration
export const config = {
  apiUrl: BASE_URL,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export default api;
