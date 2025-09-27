// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
//      const token = localStorage.getItem('token');

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Product from "./pages/Product";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import PlaceOrder from "./pages/PlaceOrder";
// import Orders from "./pages/Orders";
// import Collection from "./pages/Collection";

// import Add from "./admin/pages/Add";
// import AdminLayout from "./admin/AdminLayout";
// import PublicLayout from "./layouts/Publiclayout"; // ✅ new
// import List from "././admin/pages/List"
// import AdminRoute from "./admin/AdminRoute";
// import Adminorder from "./admin/pages/Orders"
// const App = () => {
//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />
//       <Routes>
//         {/* ---------- Public routes with NavBar + Footer ---------- */}
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/collection" element={<Collection />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/product/:productId" element={<Product />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/place-order" element={<PlaceOrder />} />
//           <Route path="/orders" element={<Orders />} />
//         </Route>

//         {/* ---------- Admin routes with sidebar only ---------- */}


// <Route path="/admin" element={<AdminRoute />}>
//   <Route element={<AdminLayout />}>
//     <Route path="dashboard" element={<Add token={token} />} />
//     <Route path="add" element={<Add token={token} />} />
//     <Route path="list" element={<List token={token} />} />
//     <Route path="order" element={<Adminorder token={token} />} />
//   </Route>
// </Route>


//         {/* 404 fallback */}
//         <Route
//           path="*"
//           element={
//             <div className="text-center py-20">
//               <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
//               <p className="text-gray-600 mb-4">
//                 The page you're looking for doesn't exist.
//               </p>
//               <button
//                 onClick={() => window.history.back()}
//                 className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
//               >
//                 Go Back
//               </button>
//             </div>
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import EmailVerificationPage from "./components/EmailVerfifcation"; // Add this import

import Add from "./admin/pages/Add";
import AdminLayout from "./admin/AdminLayout";
import PublicLayout from "./layouts/Publiclayout";
import List from "./admin/pages/List";
import AdminRoute from "./admin/AdminRoute";
import Adminorder from "./admin/pages/Orders";
import TopBanner from './components/TopBanner'
const App = () => {
  return (

    <>


    <TopBanner></TopBanner>
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
          <Route path="/verify-email" element={<EmailVerificationPage />} /> {/* Add this route */}
        </Route>

        {/* ---------- Admin routes with sidebar only ---------- */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Add token={token} />} />
            <Route path="add" element={<Add token={token} />} />
            <Route path="list" element={<List token={token} />} />
            <Route path="order" element={<Adminorder token={token} />} />
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
    </>
  );
};

export default App;