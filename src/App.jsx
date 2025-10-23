// // ============================================
// // FILE: src/App.jsx - FIXED WITH ANALYTICS
// // ============================================

// import React, { useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Import GTM utilities
// import { initializeGTM, trackPageView, saveLandingPageData } from './utils/gtm';

// // Import SurveyProvider and SurveyModal
// import { SurveyProvider, useSurvey } from "./context/Surveycontext";
// import SurveyModal from "./components/SurveyModal";

// // 🔥 ADD THIS - Import AnalyticsProvider
// import { AnalyticsProvider } from './context/Analyticscontext';

// const token = localStorage.getItem('token');

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Product from "./pages/Product";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import PlaceOrder from "./pages/PlaceOrder";
// import Orders from "./pages/Orders";
// import Collection from "./pages/Collection";
// import EmailVerificationPage from "./components/EmailVerfifcation";

// import Add from "./admin/pages/Add";
// import AdminLayout from "./admin/AdminLayout";
// import PublicLayout from "./layouts/Publiclayout";
// import List from "./admin/pages/List";
// import AdminRoute from "./admin/AdminRoute";
// import Adminorder from "./admin/pages/Orders";
// import TopBanner from './components/TopBanner';
// import FAQPage from "./components/Faq";
// import ShippingReturns from "./components/Shippingandreturns";
// import Analytics from "./admin/pages/Analytics";
// import Customers from "./admin/pages/Customers";
// import EnhancedAnalytics from "./admin/pages/EnhancedAnalytics";

// // Page tracker component
// function PageTracker() {
//   const location = useLocation();
  
//   useEffect(() => {
//     trackPageView(
//       window.location.href,
//       document.title
//     );
//   }, [location]);
  
//   return null;
// }

// // Survey wrapper component
// const SurveyWrapper = () => {
//   const { showSurvey, handleSurveyComplete, handleSurveyClose } = useSurvey();

//   if (!showSurvey) return null;

//   return (
//     <SurveyModal 
//       onComplete={handleSurveyComplete}
//       onClose={handleSurveyClose}
//     />
//   );
// };

// const App = () => {
//   useEffect(() => {
//     // Initialize GTM once when app loads
//     initializeGTM();
    
//     // Save landing page data for attribution
//     saveLandingPageData();
    
//     console.log('🚀 App initialized with GTM tracking');
//   }, []);

//   return (
//     // 🔥 WRAP WITH AnalyticsProvider FIRST (before SurveyProvider)
//     <AnalyticsProvider>
//       <SurveyProvider>
//         <TopBanner />
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
        
//         {/* Survey Modal - Shows globally when needed */}
//         <SurveyWrapper />
        
//         {/* Page Tracker - Tracks all route changes */}
//         <PageTracker />

//         <Routes>
//           {/* ---------- Public routes with NavBar + Footer ---------- */}
//           <Route element={<PublicLayout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/collection" element={<Collection />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/product/:productId" element={<Product />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/place-order" element={<PlaceOrder />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/verify-email" element={<EmailVerificationPage />} />
//             <Route path="/faq" element={<FAQPage />} />
//             <Route path="/shipping" element={<ShippingReturns />} />
//           </Route>

//           {/* ---------- Admin routes with sidebar only ---------- */}
//           <Route path="/admin" element={<AdminRoute />}>
//             <Route element={<AdminLayout />}>
//               <Route path="dashboard" element={<Add token={token} />} />
//               <Route path="add" element={<Add token={token} />} />
//               <Route path="list" element={<List token={token} />} />
//               <Route path="order" element={<Adminorder token={token} />} />
//               <Route path="analytics" element={<EnhancedAnalytics token={token} />} />
//               <Route path="customers" element={<Customers token={token} />} />
//             </Route>
//           </Route>

//           {/* 404 fallback */}
//           <Route
//             path="*"
//             element={
//               <div className="text-center py-20">
//                 <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
//                 <p className="text-gray-600 mb-4">
//                   The page you're looking for doesn't exist.
//                 </p>
//                 <button
//                   onClick={() => window.history.back()}
//                   className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
//                 >
//                   Go Back
//                 </button>
//               </div>
//             }
//           />
//         </Routes>
//       </SurveyProvider>
//     </AnalyticsProvider>
//   );
// };

// export default App;


// ============================================
// FILE: src/App.jsx - WITH CHATBOT INTEGRATION
// ============================================

import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import GTM utilities
import { initializeGTM, trackPageView, saveLandingPageData } from './utils/gtm';

// Import SurveyProvider and SurveyModal
import { SurveyProvider, useSurvey } from "./context/Surveycontext";
import SurveyModal from "./components/SurveyModal";

// Import AnalyticsProvider
import { AnalyticsProvider } from './context/Analyticscontext';

// 🤖 Import Chatbot Component
import Chatbot from './components/Chatbot';

const token = localStorage.getItem('token');

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Collection from "./pages/Collection";
import EmailVerificationPage from "./components/EmailVerfifcation";

import Add from "./admin/pages/Add";
import AdminLayout from "./admin/AdminLayout";
import PublicLayout from "./layouts/Publiclayout";
import List from "./admin/pages/List";
import AdminRoute from "./admin/AdminRoute";
import Adminorder from "./admin/pages/Orders";
import TopBanner from './components/TopBanner';
import FAQPage from "./components/Faq";
import ShippingReturns from "./components/Shippingandreturns";
import Analytics from "./admin/pages/Analytics";
import Customers from "./admin/pages/Customers";
import EnhancedAnalytics from "./admin/pages/EnhancedAnalytics";
import Measurements from "./admin/pages/Measurementsview";

// Page tracker component
function PageTracker() {
  const location = useLocation();
  
  useEffect(() => {
    trackPageView(
      window.location.href,
      document.title
    );
  }, [location]);
  
  return null;
}

// Survey wrapper component
const SurveyWrapper = () => {
  const { showSurvey, handleSurveyComplete, handleSurveyClose } = useSurvey();

  if (!showSurvey) return null;

  return (
    <SurveyModal 
      onComplete={handleSurveyComplete}
      onClose={handleSurveyClose}
    />
  );
};

const App = () => {
  const location = useLocation();
  
  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    // Initialize GTM once when app loads
    initializeGTM();
    
    // Save landing page data for attribution
    saveLandingPageData();
    
    console.log('🚀 App initialized with GTM tracking');
  }, []);

  return (
    <AnalyticsProvider>
      <SurveyProvider>
        <TopBanner />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        {/* Survey Modal - Shows globally when needed */}
        <SurveyWrapper />
        
        {/* Page Tracker - Tracks all route changes */}
        <PageTracker />

        {/* 🤖 Chatbot - Only show on public pages (not admin) */}
        {!isAdminRoute && <Chatbot />}

        <Routes>
          {/* ---------- Public routes with NavBar + Footer ---------- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping" element={<ShippingReturns />} />
          </Route>

          {/* ---------- Admin routes with sidebar only ---------- */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Add token={token} />} />
              <Route path="add" element={<Add token={token} />} />
              <Route path="list" element={<List token={token} />} />
              <Route path="order" element={<Adminorder token={token} />} />
              <Route path="analytics" element={<EnhancedAnalytics token={token} />} />
              <Route path="customers" element={<Customers token={token} />} />
              <Route path="measurements" element={<Measurements token={token} />} />
            </Route>
          </Route>

          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-4">
                  The page you're looking for doesn't exist.
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
                >
                  Go Back
                </button>
              </div>
            }
          />
        </Routes>
      </SurveyProvider>
    </AnalyticsProvider>
  );
};

export default App;