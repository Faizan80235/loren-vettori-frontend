// ==========================================
// FILE: src/utils/tracking.js
// Complete Tracking System with Meta Pixel + GA4 + Backend
// ==========================================

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Send tracking data to backend for real-time dashboard
 */
const trackInBackend = async (eventType, eventData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('⚠️ No token - skipping backend tracking');
      return;
    }

    const response = await fetch(`${backendUrl}/api/realtime-analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({
        eventType,
        eventData,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId()
      })
    });

    if (response.ok) {
      console.log('✅ Backend tracking success:', eventType);
    }
  } catch (error) {
    console.error('❌ Backend tracking error:', error);
  }
};

/**
 * Get or create session ID
 */
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

/**
 * Track any event in GTM, Meta Pixel, and Backend
 */
export const trackEvent = (eventName, eventData = {}) => {
  try {
    console.log('📊 Tracking event:', eventName, eventData);

    // 1. GTM Data Layer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventData,
        timestamp: new Date().toISOString()
      });
      console.log('✅ GTM tracked:', eventName);
    }
    
    // 2. Meta Pixel Custom Event
    if (typeof window.fbq !== 'undefined') {
      window.fbq('trackCustom', eventName, eventData);
      console.log('✅ Meta Pixel tracked:', eventName);
    }

    // 3. Backend tracking
    trackInBackend(eventName, eventData);
    
  } catch (error) {
    console.error('❌ Tracking error:', error);
  }
};

/**
 * Track page views
 */
export const trackPageView = (pagePath, pageTitle) => {
  try {
    const path = pagePath || window.location.pathname;
    const title = pageTitle || document.title;

    console.log('📄 Page view:', path);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        pagePath: path,
        pageTitle: title,
        timestamp: new Date().toISOString()
      });
    }
    
    // Meta Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'PageView');
    }

    // Backend
    trackInBackend('page_view', {
      pagePath: path,
      pageTitle: title
    });
    
  } catch (error) {
    console.error('❌ Page view error:', error);
  }
};

/**
 * Track product views with COMPLETE data
 */
export const trackViewContent = (productData) => {
  try {
    const data = {
      content_ids: [productData.id || productData._id],
      content_name: productData.name,
      content_type: 'product',
      content_category: productData.category,
      value: parseFloat(productData.price) || 0,
      currency: 'PKR',
      brand: productData.brand || '',
      productId: productData.id || productData._id
    };
    
    console.log('👁️ Product view:', productData.name);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'view_content',
        ecommerce: {
          items: [{
            item_id: productData.id || productData._id,
            item_name: productData.name,
            item_category: productData.category,
            item_brand: productData.brand,
            price: parseFloat(productData.price) || 0
          }]
        },
        timestamp: new Date().toISOString()
      });
    }
    
    // Meta Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'ViewContent', data);
    }

    // Backend - CRITICAL for dashboard
    trackInBackend('view_content', {
      productId: productData.id || productData._id,
      productName: productData.name,
      productCategory: productData.category,
      productPrice: parseFloat(productData.price) || 0,
      productBrand: productData.brand || ''
    });
    
  } catch (error) {
    console.error('❌ View content error:', error);
  }
};

/**
 * Track add to cart with quantity
 */
export const trackAddToCart = (productData) => {
  try {
    const quantity = productData.quantity || 1;
    const data = {
      content_ids: [productData.id || productData._id],
      content_name: productData.name,
      content_type: 'product',
      value: (parseFloat(productData.price) || 0) * quantity,
      currency: 'PKR',
      quantity: quantity
    };
    
    console.log('🛒 Add to cart:', productData.name, 'Qty:', quantity);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
          items: [{
            item_id: productData.id || productData._id,
            item_name: productData.name,
            item_category: productData.category,
            price: parseFloat(productData.price) || 0,
            quantity: quantity
          }]
        },
        timestamp: new Date().toISOString()
      });
    }
    
    // Meta Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'AddToCart', data);
    }

    // Backend
    trackInBackend('add_to_cart', {
      productId: productData.id || productData._id,
      productName: productData.name,
      productPrice: parseFloat(productData.price) || 0,
      quantity: quantity,
      totalValue: (parseFloat(productData.price) || 0) * quantity
    });
    
  } catch (error) {
    console.error('❌ Add to cart error:', error);
  }
};

/**
 * Track checkout initiation
 */
export const trackInitiateCheckout = (checkoutData) => {
  try {
    const value = parseFloat(checkoutData.value) || 0;
    const data = {
      value: value,
      currency: 'PKR',
      content_ids: checkoutData.productIds || [],
      num_items: checkoutData.numItems || 0
    };
    
    console.log('🛍️ Checkout initiated:', value);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'begin_checkout',
        ecommerce: {
          value: value,
          currency: 'PKR',
          items: checkoutData.items || []
        },
        timestamp: new Date().toISOString()
      });
    }
    
    // Meta Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', data);
    }

    // Backend
    trackInBackend('initiate_checkout', {
      cartValue: value,
      productIds: checkoutData.productIds || [],
      numItems: checkoutData.numItems || 0
    });
    
  } catch (error) {
    console.error('❌ Checkout tracking error:', error);
  }
};

/**
 * Track purchase completion
 */
export const trackPurchase = (orderData) => {
  try {
    const value = parseFloat(orderData.totalAmount) || 0;
    const data = {
      value: value,
      currency: 'PKR',
      transaction_id: orderData.orderId || '',
      content_ids: orderData.productIds || [],
      content_type: 'product',
      num_items: orderData.numItems || 1
    };
    
    console.log('💰 Purchase:', orderData.orderId, 'Value:', value);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'purchase',
        ecommerce: {
          transaction_id: orderData.orderId || '',
          value: value,
          currency: 'PKR',
          items: orderData.items || []
        },
        timestamp: new Date().toISOString()
      });
    }
    
    // Meta Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Purchase', data);
    }

    // Backend - CRITICAL for revenue tracking
    trackInBackend('purchase', {
      orderId: orderData.orderId,
      totalAmount: value,
      productIds: orderData.productIds || [],
      numItems: orderData.numItems || 1,
      items: orderData.items || []
    });
    
  } catch (error) {
    console.error('❌ Purchase tracking error:', error);
  }
};

/**
 * Track user registration
 */
export const trackCompleteRegistration = (userData) => {
  try {
    const data = {
      content_name: 'user_registration',
      status: 'completed',
      method: 'email'
    };
    
    console.log('✅ Registration:', userData.email);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'sign_up',
        method: 'email',
        timestamp: new Date().toISOString()
      });
    }
    
    // Meta Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'CompleteRegistration', data);
    }

    // Backend
    trackInBackend('registration', {
      email: userData.email,
      userId: userData.userId
    });
    
  } catch (error) {
    console.error('❌ Registration tracking error:', error);
  }
};

/**
 * Track user login
 */
export const trackLogin = (userId, email, method = 'email') => {
  try {
    console.log('🔐 Login:', email);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'login',
        method: method,
        user_id: userId,
        timestamp: new Date().toISOString()
      });
    }
    
    // Meta Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('trackCustom', 'UserLogin', { 
        method: method,
        user_id: userId 
      });
    }

    // Backend
    trackInBackend('login', {
      userId: userId,
      email: email,
      method: method
    });
    
  } catch (error) {
    console.error('❌ Login tracking error:', error);
  }
};

/**
 * Track search
 */
export const trackSearch = (searchQuery, resultsCount = 0) => {
  try {
    const data = {
      search_string: searchQuery,
      results_count: resultsCount
    };
    
    console.log('🔍 Search:', searchQuery, 'Results:', resultsCount);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'search',
        search_term: searchQuery,
        results_count: resultsCount,
        timestamp: new Date().toISOString()
      });
    }
    
    // Meta Pixel
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Search', data);
    }

    // Backend
    trackInBackend('search', {
      searchQuery: searchQuery,
      resultsCount: resultsCount
    });
    
  } catch (error) {
    console.error('❌ Search tracking error:', error);
  }
};

/**
 * Track product click from list
 */
export const trackProductClick = (productData, listName = 'product_list') => {
  try {
    console.log('🖱️ Product click:', productData.name);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'select_item',
        ecommerce: {
          item_list_name: listName,
          items: [{
            item_id: productData.id || productData._id,
            item_name: productData.name,
            item_category: productData.category,
            price: parseFloat(productData.price) || 0
          }]
        },
        timestamp: new Date().toISOString()
      });
    }

    // Backend
    trackInBackend('product_click', {
      productId: productData.id || productData._id,
      productName: productData.name,
      listName: listName
    });
    
  } catch (error) {
    console.error('❌ Product click error:', error);
  }
};

/**
 * Track remove from cart
 */
export const trackRemoveFromCart = (productData) => {
  try {
    console.log('🗑️ Remove from cart:', productData.name);

    // GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'remove_from_cart',
        ecommerce: {
          items: [{
            item_id: productData.id || productData._id,
            item_name: productData.name,
            price: parseFloat(productData.price) || 0
          }]
        },
        timestamp: new Date().toISOString()
      });
    }

    // Backend
    trackInBackend('remove_from_cart', {
      productId: productData.id || productData._id,
      productName: productData.name
    });
    
  } catch (error) {
    console.error('❌ Remove from cart error:', error);
  }
};

// Export all functions
export default {
  trackEvent,
  trackPageView,
  trackViewContent,
  trackAddToCart,
  trackInitiateCheckout,
  trackPurchase,
  trackCompleteRegistration,
  trackLogin,
  trackSearch,
  trackProductClick,
  trackRemoveFromCart
};