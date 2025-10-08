// ============================================
// FILE: src/utils/gtm.js - Create this file
// ============================================

import TagManager from 'react-gtm-module';

// Initialize GTM
export const initializeGTM = () => {
  const tagManagerArgs = {
    gtmId: 'GTM-MJLKZRVQ',
    dataLayer: {
      platform: 'web',
      environment: import.meta.env.MODE
    }
  };
  
  TagManager.initialize(tagManagerArgs);
  console.log('✅ GTM Initialized with ID: GTM-MJLKZRVQ');
};

// Track page views
export const trackPageView = (url, title) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'pageview',
      page: {
        url: url,
        title: title,
        path: window.location.pathname
      }
    }
  });
};

// Track product view
export const trackProductView = (product) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'view_item',
      ecommerce: {
        currency: 'PKR',
        value: product.effectivePrice || product.price?.base || product.price,
        items: [{
          item_id: product._id,
          item_name: product.name,
          item_brand: product.brand || 'Unknown',
          item_category: product.category,
          item_category2: product.subcategory,
          price: product.effectivePrice || product.price?.base || product.price,
          quantity: 1
        }]
      }
    }
  });
  console.log('📦 Product View Tracked:', product.name);
};

// Track add to cart
export const trackAddToCart = (product, size, quantity = 1) => {
  const price = product.effectivePrice || product.price?.base || product.price;
  
  TagManager.dataLayer({
    dataLayer: {
      event: 'add_to_cart',
      ecommerce: {
        currency: 'PKR',
        value: price * quantity,
        items: [{
          item_id: product._id,
          item_name: product.name,
          item_brand: product.brand || 'Unknown',
          item_category: product.category,
          item_category2: product.subcategory,
          item_variant: size,
          price: price,
          quantity: quantity
        }]
      }
    }
  });
  console.log('🛒 Add to Cart Tracked:', product.name, 'Size:', size, 'Qty:', quantity);
};

// Track remove from cart
export const trackRemoveFromCart = (product, size, quantity = 1) => {
  const price = product.effectivePrice || product.price?.base || product.price;
  
  TagManager.dataLayer({
    dataLayer: {
      event: 'remove_from_cart',
      ecommerce: {
        currency: 'PKR',
        value: price * quantity,
        items: [{
          item_id: product._id,
          item_name: product.name,
          item_brand: product.brand || 'Unknown',
          item_category: product.category,
          item_category2: product.subcategory,
          item_variant: size,
          price: price,
          quantity: quantity
        }]
      }
    }
  });
};

// Track begin checkout
export const trackBeginCheckout = (cartItems, totalValue) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'begin_checkout',
      ecommerce: {
        currency: 'PKR',
        value: totalValue,
        items: cartItems.map(item => ({
          item_id: item._id,
          item_name: item.name,
          item_brand: item.brand || 'Unknown',
          item_category: item.category || 'Unknown',
          item_variant: item.size,
          price: item.price,
          quantity: item.quantity
        }))
      }
    }
  });
  console.log('🛍️ Begin Checkout Tracked:', totalValue);
};

// Track purchase (MOST IMPORTANT)
export const trackPurchase = (order) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'purchase',
      ecommerce: {
        transaction_id: order._id || order.orderId,
        value: order.amount,
        currency: 'PKR',
        tax: 0,
        shipping: 0,
        items: order.items.map(item => ({
          item_id: item._id || item.productId,
          item_name: item.name,
          item_brand: item.brand || 'Unknown',
          item_category: item.category || 'Unknown',
          item_variant: item.size,
          price: item.price,
          quantity: item.quantity
        }))
      },
      // Additional data for analytics
      user_data: {
        customer_id: order.userId
      }
    }
  });
  console.log('💰 Purchase Tracked:', order._id, 'Amount:', order.amount);
};

// Track user signup
export const trackSignup = (method = 'email') => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'sign_up',
      method: method
    }
  });
  console.log('👤 Signup Tracked');
};

// Track user login
export const trackLogin = (method = 'email') => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'login',
      method: method
    }
  });
  console.log('🔐 Login Tracked');
};

// Track search
export const trackSearch = (searchTerm) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'search',
      search_term: searchTerm
    }
  });
  console.log('🔍 Search Tracked:', searchTerm);
};

// Track measurement modal (custom event)
export const trackMeasurementModal = (action, productCategory) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'measurement_interaction',
      action: action, // 'opened', 'saved', 'closed'
      product_category: productCategory
    }
  });
};

// Track survey completion (custom event)
export const trackSurveyComplete = (source, categories) => {
  TagManager.dataLayer({
    dataLayer: {
      event: 'survey_complete',
      survey_source: source,
      survey_categories: categories.join(',')
    }
  });
  console.log('📋 Survey Completed:', source);
};

// Save UTM parameters and landing page
export const saveLandingPageData = () => {
  if (!sessionStorage.getItem('landingPage')) {
    const urlParams = new URLSearchParams(window.location.search);
    
    const landingData = {
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer,
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      utm_content: urlParams.get('utm_content'),
      utm_term: urlParams.get('utm_term'),
      timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('landingPage', JSON.stringify(landingData));
    
    // Track the landing page data
    TagManager.dataLayer({
      dataLayer: {
        event: 'landing_page_data',
        ...landingData
      }
    });
  }
};

// Get landing page data for order attribution
export const getLandingPageData = () => {
  const stored = sessionStorage.getItem('landingPage');
  return stored ? JSON.parse(stored) : null;
};