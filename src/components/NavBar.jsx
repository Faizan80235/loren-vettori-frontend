
// // import React, { useContext, useState, useEffect, useMemo } from "react";
// // import { Link, NavLink, useNavigate } from "react-router-dom";
// // import { ShopContext } from "../context/ShopContext";
// // import { assets } from "../assets/assets";

// // const NavBar = () => {
// //   const [visible, setVisible] = useState(false);
// //   const [dropdownOpen, setDropdownOpen] = useState(null);
// //   const [scrolled, setScrolled] = useState(false);
  
// //   useEffect(() => {
// //     const onScroll = () => setScrolled(window.scrollY > 0);
// //     window.addEventListener("scroll", onScroll);
// //     return () => window.removeEventListener("scroll", onScroll);
// //   }, []);
  
// //   const {
// //     setShowSearch,
// //     getCartCount,
// //     token,
// //     setToken,
// //     setCartItems,
// //     products,
// //   } = useContext(ShopContext);
  
// //   const [localToken, setLocalToken] = useState(
// //     () => localStorage.getItem("token") || ""
// //   );
// //   const navigate = useNavigate();

// //   // Keep localToken in sync if it changes in localStorage (e.g., login)
// //   useEffect(() => {
// //     const handleStorage = () => {
// //       setLocalToken(localStorage.getItem("token") || "");
// //     };
// //     window.addEventListener("storage", handleStorage);
// //     return () => window.removeEventListener("storage", handleStorage);
// //   }, []);

// //   // ----- Logout -----
// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     setLocalToken("");
// //     setCartItems({});
// //     navigate("/login", { replace: true });
// //   };

// //   // ----- Get all products for dropdown -----
// //   const dropdownProducts = useMemo(() => {
// //     if (!products || products.length === 0) return [];
    
// //     // Return first 25 products with their details
// //     return products.slice(0, 25).map(product => ({
// //       id: product._id,
// //       name: product.name,
// //     }));
// //   }, [products]);

// //   // ----- Hover handlers -----
// //   const handleMouseEnter = (menu) =>
// //     window.innerWidth >= 1024 && setDropdownOpen(menu);
// //   const handleMouseLeave = () =>
// //     window.innerWidth >= 1024 && setDropdownOpen(null);

// //   // ----- Mobile dropdown toggle -----
// //   const handleDropdownClick = (menu) =>
// //     setDropdownOpen(dropdownOpen === menu ? null : menu);

// //   // ----- Handle product click -----
// //   const handleProductClick = (productId) => {
// //     setDropdownOpen(null);
// //     setVisible(false);
// //     navigate(`/product/${productId}`);
// //     window.scrollTo(0, 0);
// //   };

// //   // ----- Desktop Full-Width Mega Dropdown -----
// //   const DesktopDropdown = () => (
// //     <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
// //       <div className="max-w-7xl mx-auto px-8 py-6">
// //         <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
// //           {dropdownProducts.map((product) => (
// //             <button
// //               key={product.id}
// //               onClick={() => handleProductClick(product.id)}
// //               className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
// //             >
// //               <div className="font-semibold text-sm text-gray-900 truncate">
// //                 {product.name}
// //               </div>
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   // ----- Tablet Dropdown (Medium screens) -----
// //   const TabletDropdown = () => (
// //     <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
// //       <div className="max-w-4xl mx-auto px-6 py-5">
// //         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// //           {dropdownProducts.map((product) => (
// //             <button
// //               key={product.id}
// //               onClick={() => handleProductClick(product.id)}
// //               className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
// //             >
// //               <div className="font-semibold text-sm text-gray-900 truncate">
// //                 {product.name}
// //               </div>
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   // ----- Mobile Dropdown (Compact) -----
// //   const MobileDropdown = () => (
// //     <div className="bg-gray-50 mt-2 py-2 max-h-80 overflow-y-auto">
// //       {dropdownProducts.map((product) => (
// //         <button
// //           key={product.id}
// //           onClick={() => handleProductClick(product.id)}
// //           className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
// //         >
// //           <div className="font-semibold text-sm text-gray-900">
// //             {product.name}
// //           </div>
// //         </button>
// //       ))}
// //     </div>
// //   );

// //   // Choose appropriate dropdown based on screen size
// //   const getDropdownComponent = () => {
// //     if (typeof window === 'undefined') return null;
    
// //     if (window.innerWidth >= 1024) {
// //       return <DesktopDropdown />;
// //     } else if (window.innerWidth >= 768) {
// //       return <TabletDropdown />;
// //     }
// //     return null; // Mobile uses sidebar dropdown
// //   };

// //   return (
// //     <>
// //       {/* Navbar */}
// //       <nav
// //         className={`fixed left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200
// //                     transition-all duration-300
// //                     ${scrolled ? "top-0" : "top-6"}`}
// //       >
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           {/* Mobile Layout: Hamburger - Logo - Icons */}
// //           <div className="flex md:hidden justify-between items-center h-16">
// //             {/* Left: Hamburger */}
// //             <button onClick={() => setVisible(true)} className="p-2">
// //               <img src={assets.menu_icon} alt="menu" className="w-5 h-5" />
// //             </button>

// //             {/* Center: Logo */}
// //             <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
// //               <img src={assets.logo} alt="logo" className="h-8" />
// //             </Link>

// //             {/* Right: Icons */}
// //             <div className="flex items-center gap-2">
// //               <button onClick={() => setShowSearch(true)} className="p-2">
// //                 <img src={assets.search_icon} alt="search" className="w-4 h-4" />
// //               </button>
              
// //               <div className="relative group">
// //                 <button
// //                   onClick={() => (token ? null : navigate("/login"))}
// //                   className="p-2"
// //                 >
// //                   <img src={assets.profile_icon} alt="profile" className="w-4 h-4" />
// //                 </button>
// //               </div>
              
// //               <button onClick={() => navigate("/cart")} className="relative p-2">
// //                 <img src={assets.cart_icon} alt="cart" className="w-4 h-4" />
// //                 {getCartCount() > 0 && (
// //                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-medium">
// //                     {getCartCount()}
// //                   </span>
// //                 )}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Tablet & Desktop Layout */}
// //           <div className="hidden md:flex justify-between h-16 sm:h-20 items-center">
// //             {/* Logo */}
// //             <Link to="/">
// //               <img src={assets.logo} alt="logo" className="h-8 sm:h-12" />
// //             </Link>

// //             {/* Desktop Links */}
// //             <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 relative">
// //               <NavLink
// //                 to="/"
// //                 className={({ isActive }) =>
// //                   `text-sm font-semibold transition-colors duration-200 ${
// //                     isActive ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-600 hover:text-gray-900"
// //                   }`
// //                 }
// //               >
// //                 HOME
// //               </NavLink>

// //               {dropdownProducts.length > 0 && (
// //                 <div
// //                   onMouseEnter={() => handleMouseEnter("collection")}
// //                   onMouseLeave={handleMouseLeave}
// //                   className="relative"
// //                 >
// //                   <NavLink
// //                     to="/collection"
// //                     className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200"
// //                   >
// //                     COLLECTION
// //                     <svg
// //                       className={`w-4 h-4 transition-transform duration-300 ${
// //                         dropdownOpen === "collection" ? "rotate-180" : ""
// //                       }`}
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M19 9l-7 7-7-7"
// //                       />
// //                     </svg>
// //                   </NavLink>
// //                   {dropdownOpen === "collection" && getDropdownComponent()}
// //                 </div>
// //               )}

// //               <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200">
// //                 ABOUT
// //               </NavLink>
// //               <NavLink to="/contact" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200">
// //                 CONTACT
// //               </NavLink>
// //             </div>

// //             {/* Tablet Links */}
// //             <div className="hidden md:flex lg:hidden items-center space-x-6 relative">
// //               <NavLink to="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
// //                 HOME
// //               </NavLink>
              
// //               {dropdownProducts.length > 0 && (
// //                 <div
// //                   onMouseEnter={() => handleMouseEnter("collection")}
// //                   onMouseLeave={handleMouseLeave}
// //                   className="relative"
// //                 >
// //                   <NavLink
// //                     to="/collection"
// //                     className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
// //                   >
// //                     COLLECTION
// //                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //                     </svg>
// //                   </NavLink>
// //                   {dropdownOpen === "collection" && getDropdownComponent()}
// //                 </div>
// //               )}

// //               <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
// //                 ABOUT
// //               </NavLink>
// //             </div>

// //             {/* Right Icons */}
// //             <div className="flex items-center gap-3 sm:gap-6">
// //               <button onClick={() => setShowSearch(true)} className="p-2">
// //                 <img src={assets.search_icon} alt="search" className="w-4 h-4 sm:w-5 sm:h-5" />
// //               </button>
              
// //               <div className="relative group">
// //                 <button
// //                   onClick={() => (token ? null : navigate("/login"))}
// //                   className="p-2"
// //                 >
// //                   <img src={assets.profile_icon} alt="profile" className="w-4 h-4 sm:w-5 sm:h-5" />
// //                 </button>
// //                 {token && (
// //                   <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
// //                     <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
// //                       My Profile
// //                     </Link>
// //                     <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
// //                       Orders
// //                     </Link>
// //                     <button
// //                       onClick={logout}
// //                       className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors"
// //                     >
// //                       Logout
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
              
// //               <button onClick={() => navigate("/cart")} className="relative p-2">
// //                 <img src={assets.cart_icon} alt="cart" className="w-4 h-4 sm:w-5 sm:h-5" />
// //                 {getCartCount() > 0 && (
// //                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full font-medium">
// //                     {getCartCount()}
// //                   </span>
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Mobile Sidebar */}
// //       <div
// //         className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-all duration-300 ${
// //           visible ? "opacity-100 visible" : "opacity-0 invisible"
// //         }`}
// //         onClick={() => setVisible(false)}
// //       >
// //         <div
// //           className={`fixed top-0 left-0 w-80 max-w-[85vw] bg-white h-full transform transition-transform duration-300 ${
// //             visible ? "translate-x-0" : "-translate-x-full"
// //           }`}
// //           onClick={(e) => e.stopPropagation()}
// //         >
// //           {/* Sidebar Header */}
// //           <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
// //             <Link to="/" onClick={() => setVisible(false)}>
// //               <img src={assets.logo} alt="logo" className="h-8 sm:h-10" />
// //             </Link>
// //             <button 
// //               onClick={() => setVisible(false)}
// //               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //             >
// //               <img src={assets.cross_icon} alt="close" className="w-4 h-4 sm:w-5 sm:h-5" />
// //             </button>
// //           </div>

// //           {/* Sidebar Content */}
// //           <div className="flex flex-col h-full overflow-y-auto pb-20">
// //             <div className="px-4 sm:px-6 py-4 space-y-4">
// //               <NavLink
// //                 to="/"
// //                 onClick={() => setVisible(false)}
// //                 className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
// //               >
// //                 Home
// //               </NavLink>

// //               {/* Mobile Collection Dropdown - Only show if products exist */}
// //               {dropdownProducts.length > 0 && (
// //                 <div>
// //                   <button
// //                     onClick={() => handleDropdownClick("collection")}
// //                     className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
// //                   >
// //                     Collection
// //                     <svg
// //                       className={`w-4 h-4 transition-transform duration-300 ${
// //                         dropdownOpen === "collection" ? "rotate-180" : ""
// //                       }`}
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M19 9l-7 7-7-7"
// //                       />
// //                     </svg>
// //                   </button>
// //                   {dropdownOpen === "collection" && <MobileDropdown />}
// //                 </div>
// //               )}

// //               <NavLink 
// //                 to="/about" 
// //                 onClick={() => setVisible(false)} 
// //                 className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
// //               >
// //                 About
// //               </NavLink>
// //               <NavLink 
// //                 to="/contact" 
// //                 onClick={() => setVisible(false)} 
// //                 className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
// //               >
// //                 Contact
// //               </NavLink>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default NavBar;



// import React, { useContext, useState, useEffect, useMemo } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { ShopContext } from "../context/ShopContext";
// import { assets } from "../assets/assets";

// const NavBar = () => {
//   const [visible, setVisible] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const [scrolled, setScrolled] = useState(false);
  
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 0);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);
  
//   const {
//     setShowSearch,
//     getCartCount,
//     token,
//     setToken,
//     setCartItems,
//     products,
//   } = useContext(ShopContext);
  
//   const [localToken, setLocalToken] = useState(
//     () => localStorage.getItem("token") || ""
//   );
//   const navigate = useNavigate();

//   // Keep localToken in sync if it changes in localStorage (e.g., login)
//   useEffect(() => {
//     const handleStorage = () => {
//       setLocalToken(localStorage.getItem("token") || "");
//     };
//     window.addEventListener("storage", handleStorage);
//     return () => window.removeEventListener("storage", handleStorage);
//   }, []);

//   // ----- Logout -----
//   const logout = () => {
//     localStorage.removeItem("token");
//     setLocalToken("");
//     setCartItems({});
//     navigate("/login", { replace: true });
//   };

//   // ----- Get all products for dropdown -----
//   const dropdownProducts = useMemo(() => {
//     if (!products || products.length === 0) return [];
    
//     // Return first 25 products with their details
//     return products.slice(0, 25).map(product => ({
//       id: product._id,
//       name: product.name,
//     }));
//   }, [products]);

//   // ----- Hover handlers -----
//   const handleMouseEnter = (menu) =>
//     window.innerWidth >= 1024 && setDropdownOpen(menu);
//   const handleMouseLeave = () =>
//     window.innerWidth >= 1024 && setDropdownOpen(null);

//   // ----- Mobile dropdown toggle -----
//   const handleDropdownClick = (menu) =>
//     setDropdownOpen(dropdownOpen === menu ? null : menu);

//   // ----- Handle product click -----
//   const handleProductClick = (productId) => {
//     setDropdownOpen(null);
//     setVisible(false);
//     navigate(`/product/${productId}`);
//     window.scrollTo(0, 0);
//   };

//   // ----- Desktop Full-Width Mega Dropdown -----
//   const DesktopDropdown = () => (
//     <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
//       <div className="max-w-7xl mx-auto px-8 py-6">
//         <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {dropdownProducts.map((product) => (
//             <button
//               key={product.id}
//               onClick={() => handleProductClick(product.id)}
//               className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
//             >
//               <div className="font-semibold text-sm text-gray-900 truncate">
//                 {product.name}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // ----- Tablet Dropdown (Medium screens) -----
//   const TabletDropdown = () => (
//     <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
//       <div className="max-w-4xl mx-auto px-6 py-5">
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//           {dropdownProducts.map((product) => (
//             <button
//               key={product.id}
//               onClick={() => handleProductClick(product.id)}
//               className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
//             >
//               <div className="font-semibold text-sm text-gray-900 truncate">
//                 {product.name}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // ----- Mobile Dropdown (Compact) -----
//   const MobileDropdown = () => (
//     <div className="bg-gray-50 mt-2 py-2 max-h-80 overflow-y-auto">
//       {dropdownProducts.map((product) => (
//         <button
//           key={product.id}
//           onClick={() => handleProductClick(product.id)}
//           className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
//         >
//           <div className="font-semibold text-sm text-gray-900">
//             {product.name}
//           </div>
//         </button>
//       ))}
//     </div>
//   );

//   // Choose appropriate dropdown based on screen size
//   const getDropdownComponent = () => {
//     if (typeof window === 'undefined') return null;
    
//     if (window.innerWidth >= 1024) {
//       return <DesktopDropdown />;
//     } else if (window.innerWidth >= 768) {
//       return <TabletDropdown />;
//     }
//     return null; // Mobile uses sidebar dropdown
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav
//         className={`fixed left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200
//                     transition-all duration-300
//                     ${scrolled ? "top-0" : "top-6"}`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Mobile Layout: Hamburger - Logo - Icons */}
//           <div className="flex md:hidden justify-between items-center h-16">
//             {/* Left: Hamburger */}
//             <button onClick={() => setVisible(true)} className="p-2">
//               <img src={assets.menu_icon} alt="menu" className="w-5 h-5" />
//             </button>

//             {/* Center: Logo */}
//             <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
//               <img src={assets.logo} alt="logo" className="h-10 sm:h-12" />
//             </Link>

//             {/* Right: Icons */}
//             <div className="flex items-center gap-2">
//               <button onClick={() => setShowSearch(true)} className="p-2">
//                 <img src={assets.search_icon} alt="search" className="w-4 h-4" />
//               </button>
              
//               <div className="relative group">
//                 <button
//                   onClick={() => (token ? null : navigate("/login"))}
//                   className="p-2"
//                 >
//                   <img src={assets.profile_icon} alt="profile" className="w-4 h-4" />
//                 </button>
//               </div>
              
//               <button onClick={() => navigate("/cart")} className="relative p-2">
//                 <img src={assets.cart_icon} alt="cart" className="w-4 h-4" />
//                 {getCartCount() > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-medium">
//                     {getCartCount()}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Tablet & Desktop Layout */}
//           <div className="hidden md:flex justify-between h-16 sm:h-20 items-center">
//             {/* Logo */}
//             <Link to="/">
//               <img src={assets.logo} alt="logo" className="h-8 sm:h-12" />
//             </Link>

//             {/* Desktop Links */}
//             <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 relative">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `text-sm font-semibold transition-colors duration-200 ${
//                     isActive ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-600 hover:text-gray-900"
//                   }`
//                 }
//               >
//                 HOME
//               </NavLink>

//               {dropdownProducts.length > 0 && (
//                 <div
//                   onMouseEnter={() => handleMouseEnter("collection")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <NavLink
//                     to="/collection"
//                     className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200"
//                   >
//                     COLLECTION
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         dropdownOpen === "collection" ? "rotate-180" : ""
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </NavLink>
//                   {dropdownOpen === "collection" && getDropdownComponent()}
//                 </div>
//               )}

//               <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200">
//                 ABOUT
//               </NavLink>
//               <NavLink to="/contact" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200">
//                 CONTACT
//               </NavLink>
//             </div>

//             {/* Tablet Links */}
//             <div className="hidden md:flex lg:hidden items-center space-x-6 relative">
//               <NavLink to="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
//                 HOME
//               </NavLink>
              
//               {dropdownProducts.length > 0 && (
//                 <div
//                   onMouseEnter={() => handleMouseEnter("collection")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <NavLink
//                     to="/collection"
//                     className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
//                   >
//                     COLLECTION
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </NavLink>
//                   {dropdownOpen === "collection" && getDropdownComponent()}
//                 </div>
//               )}

//               <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
//                 ABOUT
//               </NavLink>
//             </div>

//             {/* Right Icons */}
//             <div className="flex items-center gap-3 sm:gap-6">
//               <button onClick={() => setShowSearch(true)} className="p-2">
//                 <img src={assets.search_icon} alt="search" className="w-4 h-4 sm:w-5 sm:h-5" />
//               </button>
              
//               <div className="relative group">
//                 <button
//                   onClick={() => (token ? null : navigate("/login"))}
//                   className="p-2"
//                 >
//                   <img src={assets.profile_icon} alt="profile" className="w-4 h-4 sm:w-5 sm:h-5" />
//                 </button>
//                 {token && (
//                   <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
//                     <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
//                       My Profile
//                     </Link>
//                     <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
//                       Orders
//                     </Link>
//                     <button
//                       onClick={logout}
//                       className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               <button onClick={() => navigate("/cart")} className="relative p-2">
//                 <img src={assets.cart_icon} alt="cart" className="w-4 h-4 sm:w-5 sm:h-5" />
//                 {getCartCount() > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full font-medium">
//                     {getCartCount()}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-all duration-300 ${
//           visible ? "opacity-100 visible" : "opacity-0 invisible"
//         }`}
//         onClick={() => setVisible(false)}
//       >
//         <div
//           className={`fixed top-0 left-0 w-80 max-w-[85vw] bg-white h-full transform transition-transform duration-300 ${
//             visible ? "translate-x-0" : "-translate-x-full"
//           }`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Sidebar Header */}
//           <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
//             <Link to="/" onClick={() => setVisible(false)}>
//               <img src={assets.logo} alt="logo" className="h-8 sm:h-10" />
//             </Link>
//             <button 
//               onClick={() => setVisible(false)}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <img src={assets.cross_icon} alt="close" className="w-4 h-4 sm:w-5 sm:h-5" />
//             </button>
//           </div>

//           {/* Sidebar Content */}
//           <div className="flex flex-col h-full overflow-y-auto pb-20">
//             <div className="px-4 sm:px-6 py-4 space-y-4">
//               <NavLink
//                 to="/"
//                 onClick={() => setVisible(false)}
//                 className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
//               >
//                 Home
//               </NavLink>

//               {/* Mobile Collection Dropdown - Only show if products exist */}
//               {dropdownProducts.length > 0 && (
//                 <div>
//                   <button
//                     onClick={() => handleDropdownClick("collection")}
//                     className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
//                   >
//                     Collection
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         dropdownOpen === "collection" ? "rotate-180" : ""
//                       }`}
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>
//                   {dropdownOpen === "collection" && <MobileDropdown />}
//                 </div>
//               )}

//               <NavLink 
//                 to="/about" 
//                 onClick={() => setVisible(false)} 
//                 className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
//               >
//                 About
//               </NavLink>
//               <NavLink 
//                 to="/contact" 
//                 onClick={() => setVisible(false)} 
//                 className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
//               >
//                 Contact
//               </NavLink>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NavBar;
import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItems,
    products,
  } = useContext(ShopContext);
  
  const [localToken, setLocalToken] = useState(
    () => localStorage.getItem("token") || ""
  );
  const navigate = useNavigate();

  // Keep localToken in sync if it changes in localStorage (e.g., login)
  useEffect(() => {
    const handleStorage = () => {
      setLocalToken(localStorage.getItem("token") || "");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ----- Logout -----
  const logout = () => {
    localStorage.removeItem("token");
    setLocalToken("");
    setCartItems({});
    navigate("/login", { replace: true });
  };

  // ----- Get unique product names grouped by category -----
  const dropdownProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // Create a map to store unique product names with their first occurrence
    const uniqueProductsMap = new Map();
    
    products.forEach(product => {
      const productName = product.name.trim();
      const subcategory = product.subcategory || 'Other';
      
      // Only add if name doesn't exist yet
      if (!uniqueProductsMap.has(productName)) {
        uniqueProductsMap.set(productName, {
          id: product._id,
          name: productName,
          subcategory: subcategory
        });
      }
    });
    
    // Convert map to array and sort by subcategory
    const uniqueProducts = Array.from(uniqueProductsMap.values());
    
    // Sort: Shoes first, then Jackets, then others
    uniqueProducts.sort((a, b) => {
      const order = { 'Shoes': 1, 'Jackets': 2 };
      const aOrder = order[a.subcategory] || 999;
      const bOrder = order[b.subcategory] || 999;
      
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      
      // If same category, sort alphabetically by name
      return a.name.localeCompare(b.name);
    });
    
    // Limit to 25 products
    return uniqueProducts.slice(0, 25);
  }, [products]);

  // ----- Hover handlers -----
  const handleMouseEnter = (menu) =>
    window.innerWidth >= 1024 && setDropdownOpen(menu);
  const handleMouseLeave = () =>
    window.innerWidth >= 1024 && setDropdownOpen(null);

  // ----- Mobile dropdown toggle -----
  const handleDropdownClick = (menu) =>
    setDropdownOpen(dropdownOpen === menu ? null : menu);

  // ----- Handle product click -----
  const handleProductClick = (productId) => {
    setDropdownOpen(null);
    setVisible(false);
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  // ----- Desktop Full-Width Mega Dropdown -----
  const DesktopDropdown = () => {
    // Group products by subcategory
    const groupedProducts = dropdownProducts.reduce((acc, product) => {
      const category = product.subcategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});

    return (
      <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                {category}
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {items.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {product.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ----- Tablet Dropdown (Medium screens) -----
  const TabletDropdown = () => {
    // Group products by subcategory
    const groupedProducts = dropdownProducts.reduce((acc, product) => {
      const category = product.subcategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});

    return (
      <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-5">
          {Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-5 last:mb-0">
              <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {items.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {product.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ----- Mobile Dropdown (Compact) -----
  const MobileDropdown = () => {
    // Group products by subcategory
    const groupedProducts = dropdownProducts.reduce((acc, product) => {
      const category = product.subcategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});

    return (
      <div className="bg-gray-50 mt-2 py-2 max-h-80 overflow-y-auto">
        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="mb-3 last:mb-0">
            <div className="px-4 py-2 bg-gray-200 font-bold text-xs text-gray-700 uppercase tracking-wide">
              {category}
            </div>
            {items.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
              >
                <div className="font-medium text-sm text-gray-900">
                  {product.name}
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Choose appropriate dropdown based on screen size
  const getDropdownComponent = () => {
    if (typeof window === 'undefined') return null;
    
    if (window.innerWidth >= 1024) {
      return <DesktopDropdown />;
    } else if (window.innerWidth >= 768) {
      return <TabletDropdown />;
    }
    return null; // Mobile uses sidebar dropdown
  };

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200
                    transition-all duration-300
                    ${scrolled ? "top-0" : "top-6"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout: Hamburger - Logo - Icons */}
          <div className="flex md:hidden justify-between items-center h-16">
            {/* Left: Hamburger */}
            <button onClick={() => setVisible(true)} className="p-2">
              <img src={assets.menu_icon} alt="menu" className="w-5 h-5" />
            </button>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
              <img src={assets.logo} alt="logo" className="h-10 sm:h-12" />
            </Link>

            {/* Right: Icons */}
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSearch(true)} className="p-2">
                <img src={assets.search_icon} alt="search" className="w-4 h-4" />
              </button>
              
              <div className="relative group">
                <button
                  onClick={() => (token ? null : navigate("/login"))}
                  className="p-2"
                >
                  <img src={assets.profile_icon} alt="profile" className="w-4 h-4" />
                </button>
              </div>
              
              <button onClick={() => navigate("/cart")} className="relative p-2">
                <img src={assets.cart_icon} alt="cart" className="w-4 h-4" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-medium">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Tablet & Desktop Layout */}
          <div className="hidden md:flex justify-between h-16 sm:h-20 items-center">
            {/* Logo */}
            <Link to="/">
              <img src={assets.logo} alt="logo" className="h-8 sm:h-12" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 relative">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors duration-200 ${
                    isActive ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                HOME
              </NavLink>

              {dropdownProducts.length > 0 && (
                <div
                  onMouseEnter={() => handleMouseEnter("collection")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <NavLink
                    to="/collection"
                    className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    COLLECTION
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen === "collection" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </NavLink>
                  {dropdownOpen === "collection" && getDropdownComponent()}
                </div>
              )}

              <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200">
                ABOUT
              </NavLink>
              <NavLink to="/contact" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200">
                CONTACT
              </NavLink>
            </div>

            {/* Tablet Links */}
            <div className="hidden md:flex lg:hidden items-center space-x-6 relative">
              <NavLink to="/" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                HOME
              </NavLink>
              
              {dropdownProducts.length > 0 && (
                <div
                  onMouseEnter={() => handleMouseEnter("collection")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <NavLink
                    to="/collection"
                    className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
                  >
                    COLLECTION
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </NavLink>
                  {dropdownOpen === "collection" && getDropdownComponent()}
                </div>
              )}

              <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                ABOUT
              </NavLink>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3 sm:gap-6">
              <button onClick={() => setShowSearch(true)} className="p-2">
                <img src={assets.search_icon} alt="search" className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <div className="relative group">
                <button
                  onClick={() => (token ? null : navigate("/login"))}
                  className="p-2"
                >
                  <img src={assets.profile_icon} alt="profile" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                {token && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              
              <button onClick={() => navigate("/cart")} className="relative p-2">
                <img src={assets.cart_icon} alt="cart" className="w-4 h-4 sm:w-5 sm:h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full font-medium">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-all duration-300 ${
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setVisible(false)}
      >
        <div
          className={`fixed top-0 left-0 w-80 max-w-[85vw] bg-white h-full transform transition-transform duration-300 ${
            visible ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
            <Link to="/" onClick={() => setVisible(false)}>
              <img src={assets.logo} alt="logo" className="h-8 sm:h-10" />
            </Link>
            <button 
              onClick={() => setVisible(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={assets.cross_icon} alt="close" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex flex-col h-full overflow-y-auto pb-20">
            <div className="px-4 sm:px-6 py-4 space-y-4">
              <NavLink
                to="/"
                onClick={() => setVisible(false)}
                className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </NavLink>

              {/* Mobile Collection Dropdown - Only show if products exist */}
              {dropdownProducts.length > 0 && (
                <div>
                  <button
                    onClick={() => handleDropdownClick("collection")}
                    className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Collection
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen === "collection" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {dropdownOpen === "collection" && <MobileDropdown />}
                </div>
              )}

              <NavLink 
                to="/about" 
                onClick={() => setVisible(false)} 
                className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                onClick={() => setVisible(false)} 
                className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;