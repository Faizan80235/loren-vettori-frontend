// ==========================================
// FILE: src/context/AnalyticsContext.jsx
// Google Analytics 4 Tracking Integration
// ==========================================
import React, { createContext, useContext, useEffect } from 'react';

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  // ✅ FIXED: Removed extra space and using correct Measurement ID
  const GA4_MEASUREMENT_ID = 'G-WV4V5H4GTQ';

  useEffect(() => {
    // Only initialize if not already initialized
    if (!window.gtag) {
      initializeGA4();
    }
  }, []);

  const initializeGA4 = () => {
    // Add GA4 script
    const script1 = document.createElement('script');
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    // Wait for script to load before initializing
    script1.onload = () => {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', GA4_MEASUREMENT_ID, {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure',
        debug_mode: true // Enable debug mode to see events in console
      });
      
      console.log('✅ Google Analytics initialized with ID:', GA4_MEASUREMENT_ID);
    };
  };

  // Track page views
  const trackPageView = (path, title) => {
    if (window.gtag) {
      window.gtag('config', GA4_MEASUREMENT_ID, {
        page_path: path,
        page_title: title
      });
      console.log('📊 Page view tracked:', path);
    } else {
      console.warn('⚠️ GA4 not initialized yet');
    }
  };

  // Track user registration
  const trackRegistration = (userId, email, method = 'email') => {
    if (window.gtag) {
      window.gtag('event', 'sign_up', {
        method: method,
        user_id: userId,
        user_email: email
      });
      console.log('✅ Registration tracked:', email);
    }
  };

  // Track user login
  const trackLogin = (userId, email, method = 'email') => {
    if (window.gtag) {
      window.gtag('event', 'login', {
        method: method,
        user_id: userId,
        user_email: email
      });
      console.log('✅ Login tracked:', email);
    }
  };

  // Track add to cart
  const trackAddToCart = (product, quantity, size) => {
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: product.price * quantity,
        items: [{
          item_id: product._id,
          item_name: product.name,
          item_category: product.category,
          item_brand: product.brand,
          price: product.price,
          quantity: quantity,
          item_variant: size
        }]
      });
      console.log('🛒 Add to cart tracked:', product.name);
    }
  };

  // Track remove from cart
  const trackRemoveFromCart = (product, quantity, size) => {
    if (window.gtag) {
      window.gtag('event', 'remove_from_cart', {
        currency: 'USD',
        value: product.price * quantity,
        items: [{
          item_id: product._id,
          item_name: product.name,
          item_category: product.category,
          item_brand: product.brand,
          price: product.price,
          quantity: quantity,
          item_variant: size
        }]
      });
      console.log('❌ Remove from cart tracked:', product.name);
    }
  };

  // Track view item
  const trackViewItem = (product) => {
    if (window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'USD',
        value: product.price,
        items: [{
          item_id: product._id,
          item_name: product.name,
          item_category: product.category,
          item_brand: product.brand,
          price: product.price
        }]
      });
      console.log('👁️ View item tracked:', product.name);
    }
  };

  // Track begin checkout
  const trackBeginCheckout = (cartData, totalAmount) => {
    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: totalAmount,
        items: cartData.map(item => ({
          item_id: item._id,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          item_variant: item.size
        }))
      });
      console.log('💳 Begin checkout tracked, value:', totalAmount);
    }
  };

  // Track purchase (most important!)
  const trackPurchase = (orderId, orderData, totalAmount) => {
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        currency: 'USD',
        value: totalAmount,
        shipping: orderData.deliveryFee || 0,
        items: orderData.items.map(item => ({
          item_id: item._id,
          item_name: item.name,
          item_category: item.category,
          item_brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          item_variant: item.size
        }))
      });
      console.log('💰 Purchase tracked, Order ID:', orderId, 'Value:', totalAmount);
    }
  };

  // Track search
  const trackSearch = (searchTerm) => {
    if (window.gtag) {
      window.gtag('event', 'search', {
        search_term: searchTerm
      });
      console.log('🔍 Search tracked:', searchTerm);
    }
  };

  // Track custom event
  const trackCustomEvent = (eventName, eventParams = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, eventParams);
      console.log('📊 Custom event tracked:', eventName, eventParams);
    }
  };

  // Track user properties
  const setUserProperties = (userId, properties = {}) => {
    if (window.gtag) {
      window.gtag('set', 'user_properties', {
        user_id: userId,
        ...properties
      });
      console.log('👤 User properties set:', userId);
    }
  };

  const value = {
    trackPageView,
    trackRegistration,
    trackLogin,
    trackAddToCart,
    trackRemoveFromCart,
    trackViewItem,
    trackBeginCheckout,
    trackPurchase,
    trackSearch,
    trackCustomEvent,
    setUserProperties
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;