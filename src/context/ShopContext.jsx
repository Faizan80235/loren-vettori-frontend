

import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const currency = '$';
  const delivery_fee = 10;
  
  // Backend API URL - Change this to your actual backend URL
  const backendUrl = 'http://localhost:5000';

  // FIXED: Get token from localStorage with better error handling
  const getToken = () => {
    const storedToken = localStorage.getItem('token');
    console.log('Getting token:', storedToken ? 'Token exists' : 'No token found');
    return storedToken;
  };

  // FIXED: Set token and update localStorage
  const setAuthToken = (newToken) => {
    console.log('Setting new token:', newToken ? 'Token provided' : 'Clearing token');
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('token');
      setToken('');
    }
  };

  console.log('ShopContext initialized with URL:', backendUrl);

  // Helper function to construct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x300?text=No+Image';

    // If full URL, just return it
    if (imagePath.startsWith('http')) return imagePath;

    // If begins with /uploads or /upload, prepend backendUrl
    if (imagePath.startsWith('/upload')) {
      // normalize singular/plural
      return `${backendUrl}${imagePath.replace('/upload', '/uploads')}`;
    }
    if (imagePath.startsWith('/uploads')) {
      return `${backendUrl}${imagePath}`;
    }

    // Otherwise treat as a filename
    return `${backendUrl}/uploads/${imagePath}`;
  };

  const processProductImages = (products) =>
    products.map((product) => {
      if (product.images && Array.isArray(product.images)) {
        product.images = product.images.map((img) => {
          if (typeof img === 'string') {
            return { url: getImageUrl(img), isPrimary: false };
          }
          if (img && typeof img === 'object') {
            return { ...img, url: getImageUrl(img.url || img.path || '') };
          }
          return img;
        });

        // ensure at least one primary
        if (product.images.length > 0 && !product.images.some((i) => i.isPrimary)) {
          product.images[0].isPrimary = true;
        }
      }
      return product;
    });

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      console.log('Fetching products from:', `${backendUrl}/api/product`);
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${backendUrl}/api/product`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Products data received:', data);
      
      if (data.success && Array.isArray(data.data)) {
        // Process images before setting products
        const processedProducts = processProductImages(data.data);
        setProducts(processedProducts);
        console.log('Products loaded successfully:', processedProducts.length, 'items');
        
        // Show success message only if products are loaded
        if (processedProducts.length > 0) {
          // toast.success(`${processedProducts.length} products loaded successfully`);
        }
      } else {
        throw new Error(data.message || 'Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      
      let errorMessage = 'Failed to load products';
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = `Cannot connect to server at ${backendUrl}. Please check if backend is running.`;
      } else if (error.message.includes('HTTP 404')) {
        errorMessage = 'Products API endpoint not found. Check your backend routes.';
      } else if (error.message.includes('HTTP 500')) {
        errorMessage = 'Server error. Check your backend logs.';
      } else {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single product
  const fetchProduct = async (productId) => {
    try {
      console.log('Fetching single product:', productId);
      const response = await fetch(`${backendUrl}/api/product/${productId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        console.log('Product fetched successfully:', data.data.name);
        // Process single product images
        const processedProduct = processProductImages([data.data])[0];
        return processedProduct;
      } else {
        throw new Error(data.message || 'Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      return null;
    }
  };

  // Add to cart function
  const addToCart = async (itemId, size) => {
    if (!itemId) {
      toast.error('Invalid product');
      return;
    }

    if (!size) {
      toast.error('Please select a size');
      return;
    }

    let cartData = structuredClone(cartItems);
    
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    
    setCartItems(cartData);
    
    // Find product name for success message
    const product = products.find(p => p._id === itemId);
    const productName = product?.name || 'Product';
    
    toast.success(`${productName} (${size}) added to cart`);
    
    // Save to localStorage
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  // Remove from cart
  const removeFromCart = (itemId, size) => {
    let cartData = structuredClone(cartItems);
    
    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];
      
      // If no sizes left for this item, remove the item completely
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    
    setCartItems(cartData);
    
    // Find product name for success message
    const product = products.find(p => p._id === itemId);
    const productName = product?.name || 'Product';
    
    toast.success(`${productName} (${size}) removed from cart`);
    
    // Save to localStorage
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  // Update cart quantity
  const updateQuantity = async (itemId, size, quantity) => {
    if (!itemId || !size) return;
    
    let cartData = structuredClone(cartItems);
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      removeFromCart(itemId, size);
      return;
    }
    
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }
    
    setCartItems(cartData);
    
    // Save to localStorage
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  // Get cart count
  // Count unique items in cart (not total quantity)
  const getCartCount = () => {
    // If user not logged in, show 0
    if (!token) return 0;

    let uniqueCount = 0;
    try {
      for (const productId in cartItems) {
        for (const variantId in cartItems[productId]) {
          // count 1 for each variant that has at least 1 quantity
          if (cartItems[productId][variantId] > 0) {
            uniqueCount += 1;
          }
        }
      }
    } catch (error) {
      console.error("Error counting unique cart items:", error);
    }
    return uniqueCount;
  };

  // Get cart amount - FIXED VERSION with consistent price logic
  const getCartAmount = () => {
    let totalAmount = 0;
    try {
      for (const itemId in cartItems) {
        const itemInfo = products.find((product) => product._id === itemId);
        if (itemInfo) {
          for (const size in cartItems[itemId]) {
            if (cartItems[itemId][size] > 0) {
              // CRITICAL: Use the SAME price calculation logic as backend
              let price = 0;
              if (itemInfo.effectivePrice) {
                price = itemInfo.effectivePrice;
              } else if (itemInfo.price && typeof itemInfo.price === 'object') {
                // If discount exists and is greater than 0, use discount, otherwise use base
                price = itemInfo.price.discount > 0 ? itemInfo.price.discount : itemInfo.price.base;
              } else {
                // Simple number price
                price = itemInfo.price || 0;
              }
              
              totalAmount += price * cartItems[itemId][size];
            }
          }
        }
      }
    } catch (error) {
      console.error('Error calculating cart amount:', error);
    }
    return totalAmount;
  };

  // Clear cart
  const clearCart = () => {
    setCartItems({});
    try {
      localStorage.removeItem('cartItems');
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
    toast.success('Cart cleared');
  };

  // Get cart data for checkout
  const getCartData = () => {
    const cartData = [];
    try {
      for (const itemId in cartItems) {
        const itemInfo = products.find((product) => product._id === itemId);
        if (itemInfo) {
          for (const size in cartItems[itemId]) {
            if (cartItems[itemId][size] > 0) {
              const price = itemInfo.effectivePrice || 
                           (itemInfo.price?.discount > 0 ? itemInfo.price.discount : itemInfo.price?.base) || 
                           itemInfo.price || 0;
              
              // Get the primary image or first image
              let imageUrl = '';
              if (itemInfo.images && itemInfo.images.length > 0) {
                const primaryImage = itemInfo.images.find(img => img.isPrimary) || itemInfo.images[0];
                imageUrl = primaryImage.url || primaryImage;
              } else if (itemInfo.image && itemInfo.image.length > 0) {
                imageUrl = itemInfo.image[0];
              }
              
              cartData.push({
                _id: itemInfo._id,
                name: itemInfo.name,
                size: size,
                quantity: cartItems[itemId][size],
                price: price,
                image: imageUrl,
                brand: itemInfo.brand || '',
                category: itemInfo.category || '',
                subcategory: itemInfo.subcategory || '',
                total: price * cartItems[itemId][size]
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error getting cart data:', error);
    }
    return cartData;
  };

  // PayPal Payment Functions
  const createPayPalOrder = async (orderData) => {
    try {
      const userToken = getToken();
      if (!userToken) {
        throw new Error('Please login to continue');
      }

      const response = await axios.post(`${backendUrl}/api/order/paypal/create`, orderData, {
        headers: { token: userToken }
      });

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to create PayPal order');
      }
    } catch (error) {
      console.error('Create PayPal order error:', error);
      toast.error(error.message || 'Failed to create PayPal order');
      throw error;
    }
  };

  const capturePayPalPayment = async (orderId) => {
    try {
      const userToken = getToken();
      if (!userToken) {
        throw new Error('Please login to continue');
      }

      const response = await axios.post(`${backendUrl}/api/order/paypal/capture`, {
        orderId
      }, {
        headers: { token: userToken }
      });

      if (response.data.success) {
        setCartItems({});
        toast.success('Payment successful!');
        return response.data;
      } else {
        throw new Error(response.data.message || 'Payment capture failed');
      }
    } catch (error) {
      console.error('Capture PayPal payment error:', error);
      toast.error(error.message || 'Payment failed');
      throw error;
    }
  };

  const cancelPayPalOrder = async (orderId) => {
    try {
      const userToken = getToken();
      if (!userToken) {
        return;
      }

      await axios.post(`${backendUrl}/api/order/paypal/cancel`, {
        orderId
      }, {
        headers: { token: userToken }
      });

      toast.info('Payment cancelled');
    } catch (error) {
      console.error('Cancel PayPal order error:', error);
    }
  };

  // Fetch user orders
  const fetchUserOrders = async () => {
    try {
      const userToken = getToken();
      if (!userToken) {
        throw new Error('Please login to view orders');
      }

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
        headers: { token: userToken }
      });

      if (response.data.success) {
        return response.data.orders;
      } else {
        throw new Error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error(error.message || 'Failed to fetch orders');
      return [];
    }
  };

  // Search products (using backend search endpoint)
  const searchProducts = async (query, filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (filters.category) params.append('category', filters.category);
      if (filters.subcategory) params.append('subcategory', filters.subcategory);
      if (filters.brand) params.append('brand', filters.brand);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.page) params.append('page', filters.page);
      if (filters.limit) params.append('limit', filters.limit);
      
      console.log('Searching products with params:', params.toString());
      
      const response = await fetch(`${backendUrl}/api/product/search?${params}`);
      const data = await response.json();
      
      if (data.success) {
        console.log('Search completed:', data.data.length, 'results');
        // Process search results images too
        const processedResults = processProductImages(data.data);
        return {
          products: processedResults,
          pagination: data.pagination,
          total: data.pagination?.total || data.data.length
        };
      } else {
        throw new Error(data.message || 'Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed. Please try again.');
      return {
        products: [],
        pagination: null,
        total: 0
      };
    }
  };

  // FIXED: Measurement Functions with better authentication handling
 // Add this debug function to your ShopContext.jsx - TEMPORARY for debugging
const saveMeasurements = async (measurementData) => {
  try {
    const userToken = getToken();
    
    // EXTENSIVE DEBUG LOGGING
    console.log('=== MEASUREMENT SAVE DEBUG ===');
    console.log('1. Token from getToken():', userToken);
    console.log('2. Token exists:', !!userToken);
    console.log('3. Token length:', userToken?.length || 0);
    console.log('4. Token first 20 chars:', userToken?.substring(0, 20));
    console.log('5. localStorage token:', localStorage.getItem('token'));
    console.log('6. Measurement data:', measurementData);
    
    if (!userToken) {
      toast.error('Please login to save measurements');
      throw new Error('Please login to save measurements');
    }

    // Try to decode the token to see what's inside (if it's JWT)
    try {
      if (userToken.includes('.')) {
        const payload = JSON.parse(atob(userToken.split('.')[1]));
        console.log('7. Decoded token payload:', payload);
        console.log('8. User ID in token:', payload.id || payload.userId || payload._id);
      }
    } catch (decodeError) {
      console.log('7. Token decode failed:', decodeError.message);
    }

    console.log('9. Making request to:', `${backendUrl}/api/measurements`);
    console.log('10. Request headers:', {
      'token': userToken,
      'Content-Type': 'application/json'
    });

    const response = await axios.post(`${backendUrl}/api/measurements`, measurementData, {
      headers: { 
        'token': userToken,
        'Content-Type': 'application/json'
      }
    });

    console.log('11. Response:', response.data);

    if (response.data.success) {
      toast.success('Measurements saved successfully!');
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to save measurements');
    }
  } catch (error) {
    console.error('=== SAVE MEASUREMENTS ERROR ===');
    console.error('Error object:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    console.error('Error headers:', error.response?.headers);
    
    // Better error handling
    if (error.response) {
      const message = error.response.data?.message || 'Server error occurred';
      console.error('Server error message:', message);
      toast.error(message);
      throw new Error(message);
    } else if (error.request) {
      console.error('Network error - no response received');
      toast.error('Unable to connect to server');
      throw new Error('Network error - please check your connection');
    } else {
      console.error('Other error:', error.message);
      toast.error(error.message || 'Failed to save measurements');
      throw error;
    }
  }
};
  const getMeasurements = async () => {
    try {
      const userToken = getToken();
      if (!userToken) {
        console.log('No token available for getting measurements');
        return null;
      }

      const response = await axios.get(`${backendUrl}/api/measurements`, {
        headers: { 
          'token': userToken 
        }
      });

      if (response.data.success) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Get measurements error:', error);
      // Don't show error toast for missing measurements - it's normal
      if (error.response && error.response.status === 404) {
        console.log('No existing measurements found');
      }
      return null;
    }
  };

  const updateMeasurements = async (measurementData) => {
    try {
      const userToken = getToken();
      if (!userToken) {
        throw new Error('Please login to update measurements');
      }

      const response = await axios.put(`${backendUrl}/api/measurements`, measurementData, {
        headers: { 
          'token': userToken,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('Measurements updated successfully!');
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update measurements');
      }
    } catch (error) {
      console.error('Update measurements error:', error);
      const message = error.response?.data?.message || error.message || 'Failed to update measurements';
      toast.error(message);
      throw new Error(message);
    }
  };

  const deleteMeasurements = async () => {
    try {
      const userToken = getToken();
      if (!userToken) {
        throw new Error('Please login to delete measurements');
      }

      const response = await axios.delete(`${backendUrl}/api/measurements`, {
        headers: { 
          'token': userToken 
        }
      });

      if (response.data.success) {
        toast.success('Measurements deleted successfully!');
        return true;
      } else {
        throw new Error(response.data.message || 'Failed to delete measurements');
      }
    } catch (error) {
      console.error('Delete measurements error:', error);
      const message = error.response?.data?.message || error.message || 'Failed to delete measurements';
      toast.error(message);
      throw new Error(message);
    }
  };

  // Retry connection
  const retryConnection = () => {
    console.log('Retrying connection...');
    toast.info('Retrying connection...');
    fetchProducts();
  };

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        console.log('Cart loaded from localStorage:', Object.keys(parsedCart).length, 'items');
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // FIXED: Update token state when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token') || '';
      if (newToken !== token) {
        console.log('Token changed in localStorage, updating state');
        setToken(newToken);
      }
    };

    // Listen for localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Check for token changes periodically (in case of same-tab changes)
    const tokenCheckInterval = setInterval(() => {
      handleStorageChange();
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(tokenCheckInterval);
    };
  }, [token]);

  // Fetch products on component mount
  useEffect(() => {
    console.log('Component mounted, fetching products...');
    fetchProducts();
  }, []);

  // Auto-save cart to localStorage whenever cartItems changes (but not on initial load)
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      try {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Cart saved to localStorage');
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems]);

  // Log state changes for debugging
  useEffect(() => {
    console.log('State update:', {
      productsCount: products?.length || 0,
      loading,
      error: error || 'None',
      cartItemsCount: Object.keys(cartItems).length,
      tokenExists: !!token
    });
  }, [products, loading, error, cartItems, token]);

  const value = {
    // Data
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    cartItems,
    loading,
    error,
    
    // Settings
    backendUrl,
    token,
    
    // Functions
    setSearch,
    setShowSearch,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    clearCart,
    getCartData,
    fetchProduct,
    fetchProducts,
    searchProducts,
    retryConnection,
    refreshProducts: fetchProducts,
    
    // Auth functions
    setAuthToken,
    getToken,
    
    // PayPal Functions
    createPayPalOrder,
    capturePayPalPayment,
    cancelPayPalOrder,
    
    // Order Functions
    fetchUserOrders,
    
    // Measurement Functions
    saveMeasurements,
    getMeasurements,
    updateMeasurements,
    deleteMeasurements,
    
    // Helper functions
    getImageUrl
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;