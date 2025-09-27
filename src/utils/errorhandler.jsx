import { toast } from 'react-toastify';

// Centralized error handling utility
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  let message = defaultMessage;
  
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        message = 'Session expired. Please login again.';
        // Clear token and redirect to login
        localStorage.removeItem('token');
        setTimeout(() => window.location.reload(), 1000);
        break;
        
      case 403:
        message = 'Access denied. Admin privileges required.';
        break;
        
      case 404:
        message = 'Resource not found.';
        break;
        
      case 413:
        message = 'File too large. Please choose smaller files.';
        break;
        
      case 422:
        // Validation errors
        if (data.errors && Array.isArray(data.errors)) {
          message = data.errors.map(err => err.msg || err.message).join(', ');
        } else {
          message = data.message || 'Validation failed';
        }
        break;
        
      case 429:
        message = 'Too many requests. Please try again later.';
        break;
        
      case 500:
        message = 'Server error. Please try again later.';
        break;
        
      default:
        message = data.message || `Server error (${status})`;
    }
  } else if (error.request) {
    // Network error
    message = 'Cannot connect to server. Please check your internet connection.';
  } else if (error.code === 'ECONNABORTED') {
    // Timeout error
    message = 'Request timeout. Please try again.';
  } else {
    // Other errors
    message = error.message || defaultMessage;
  }
  
  toast.error(message);
  return message;
};

// Validate file before upload
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    minSize = 0
  } = options;
  
  const errors = [];
  
  if (!allowedTypes.includes(file.type)) {
    const allowedExtensions = allowedTypes.map(type => 
      type.split('/')[1].toUpperCase()
    ).join(', ');
    errors.push(`Only ${allowedExtensions} files are allowed`);
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    errors.push(`File size must be less than ${maxSizeMB}MB`);
  }
  
  if (file.size < minSize) {
    errors.push(`File is too small`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp < currentTime;
  } catch {
    return true;
  }
};

// Format currency
export const formatCurrency = (amount, currency = '$') => {
  return `${currency}${parseFloat(amount || 0).toFixed(2)}`;
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate unique filename
export const generateUniqueFilename = (originalName) => {
  const extension = originalName.split('.').pop();
  const name = originalName.replace(`.${extension}`, '');
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${name}-${timestamp}-${random}.${extension}`;
};