// utils/api.js - Centralized API utility functions
import axios from 'axios';
import { toast } from 'react-toastify';

// Get backend URL from environment or fallback
const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      toast.error('Session expired. Please login again.');
      // Redirect to login page if not already there
      if (!window.location.pathname.includes('login')) {
        window.location.href = '/login';
      }
    } else if (error.response?.status === 403) {
      toast.error('Access denied. Insufficient privileges.');
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Request timeout. Please check your connection.');
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Admin API functions
export const adminAPI = {
  // Admin login
  login: async (credentials) => {
    const response = await api.post('/api/user/admin', credentials);
    return response.data;
  },

  // Product management
  createProduct: async (formData) => {
    const response = await api.post('/api/product/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams({
      admin: 'true', // Important: allows fetching inactive products
      ...params
    }).toString();
    const response = await api.get(`/api/product/?${queryString}`);
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/api/product/${id}`);
    return response.data;
  },

  updateProduct: async (id, formData) => {
    const response = await api.put(`/api/product/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/api/product/${id}`);
    return response.data;
  },

  deleteProductImage: async (productId, imageId) => {
    const response = await api.delete(`/api/product/${productId}/images/${imageId}`);
    return response.data;
  },

  getProductStats: async () => {
    const response = await api.get('/api/product/admin/stats');
    return response.data;
  },

  // Order management
  getOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/api/order/list?${queryString}`);
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.post('/api/order/status', { orderId, status });
    return response.data;
  },

  getOrderStats: async () => {
    const response = await api.get('/api/order/stats');
    return response.data;
  },
};

// User API functions
export const userAPI = {
  // Authentication
  register: async (userData) => {
    const response = await api.post('/api/user/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/api/user/login', credentials);
    return response.data;
  },

  // Cart management
  getCart: async () => {
    const response = await api.post('/api/cart/get');
    return response.data;
  },

  addToCart: async (itemId, size) => {
    const response = await api.post('/api/cart/add', { itemId, size });
    return response.data;
  },

  updateCart: async (itemId, size, quantity) => {
    const response = await api.post('/api/cart/update', { itemId, size, quantity });
    return response.data;
  },

  removeFromCart: async (itemId, size) => {
    const response = await api.post('/api/cart/remove', { itemId, size });
    return response.data;
  },

  clearCart: async () => {
    const response = await api.post('/api/cart/clear');
    return response.data;
  },

  getCartCount: async () => {
    const response = await api.post('/api/cart/count');
    return response.data;
  },

  // Order management
  placeOrder: async (orderData) => {
    const response = await api.post('/api/order/place', orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get('/api/order/userorders');
    return response.data;
  },
};

// Public API functions (no auth required)
export const publicAPI = {
  // Product browsing
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get(`/api/product/?${queryString}`);
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/api/product/${id}`);
    return response.data;
  },
};

// Utility functions
export const apiUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get stored token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Store token
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  // Remove token
  removeToken: () => {
    localStorage.removeItem('token');
  },

  // Handle API errors consistently
  handleApiError: (error, defaultMessage = 'An error occurred') => {
    let message = defaultMessage;
    
    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data?.errors?.length > 0) {
      message = error.response.data.errors[0].msg || error.response.data.errors[0].message;
    } else if (error.message) {
      message = error.message;
    }
    
    console.error('API Error:', error);
    toast.error(message);
    return message;
  },

  // Validate file before upload
  validateImageFile: (file, maxSizeMB = 5) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      throw new Error('Only JPEG, JPG, PNG, and WebP files are allowed');
    }

    if (file.size > maxSizeBytes) {
      throw new Error(`File size must be less than ${maxSizeMB}MB`);
    }

    return true;
  },

  // Format currency - FIXED: Added missing $ symbol
  formatCurrency: (amount, currency = '$') => {
    return `${currency}${parseFloat(amount || 0).toFixed(2)}`;
  },

  // Format date
  formatDate: (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Debounce function for search inputs
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Generate slug from text
  generateSlug: (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/-+/g, '-') // Replace multiple - with single -
      .trim('-'); // Remove leading/trailing -
  },

  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
};

export default api;