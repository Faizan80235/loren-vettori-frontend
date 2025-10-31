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

//   useEffect(() => {
//     const handleStorage = () => {
//       setLocalToken(localStorage.getItem("token") || "");
//     };
//     window.addEventListener("storage", handleStorage);
//     return () => window.removeEventListener("storage", handleStorage);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setLocalToken("");
//     setCartItems({});
//     navigate("/login", { replace: true });
//   };

//   // Filter products for Men's Shoes
//   const menShoes = useMemo(() => {
//     if (!products || products.length === 0) return [];
    
//     const filtered = products.filter(product => 
//       product.category === "Men" && product.subcategory === "Shoes"
//     );
    
//     const uniqueMap = new Map();
//     filtered.forEach(product => {
//       const name = product.name.trim();
//       if (!uniqueMap.has(name)) {
//         uniqueMap.set(name, {
//           id: product._id,
//           name: name
//         });
//       }
//     });
    
//     return Array.from(uniqueMap.values()).slice(0, 20);
//   }, [products]);

//   // Filter products for Women Jackets
//   const womenJackets = useMemo(() => {
//     if (!products || products.length === 0) return [];
    
//     const filtered = products.filter(product => 
//       product.category === "Women" && product.subcategory === "Jackets"
//     );
    
//     const uniqueMap = new Map();
//     filtered.forEach(product => {
//       const name = product.name.trim();
//       if (!uniqueMap.has(name)) {
//         uniqueMap.set(name, {
//           id: product._id,
//           name: name
//         });
//       }
//     });
    
//     return Array.from(uniqueMap.values()).slice(0, 20);
//   }, [products]);

//   // Filter products for Men Leather Jackets
//   const menLeatherJackets = useMemo(() => {
//     if (!products || products.length === 0) return [];
    
//     const filtered = products.filter(product => 
//       product.category === "Men" && 
//       product.subcategory === "Jackets" &&
//       (product.name.toLowerCase().includes("leather") || 
//        product.description?.toLowerCase().includes("leather"))
//     );
    
//     const uniqueMap = new Map();
//     filtered.forEach(product => {
//       const name = product.name.trim();
//       if (!uniqueMap.has(name)) {
//         uniqueMap.set(name, {
//           id: product._id,
//           name: name
//         });
//       }
//     });
    
//     return Array.from(uniqueMap.values()).slice(0, 20);
//   }, [products]);

//   // All products for main collection
//   const dropdownProducts = useMemo(() => {
//     if (!products || products.length === 0) return [];
    
//     const uniqueProductsMap = new Map();
    
//     products.forEach(product => {
//       const productName = product.name.trim();
//       const subcategory = product.subcategory || 'Other';
      
//       if (!uniqueProductsMap.has(productName)) {
//         uniqueProductsMap.set(productName, {
//           id: product._id,
//           name: productName,
//           subcategory: subcategory
//         });
//       }
//     });
    
//     const uniqueProducts = Array.from(uniqueProductsMap.values());
    
//     uniqueProducts.sort((a, b) => {
//       const order = { 'Shoes': 1, 'Jackets': 2 };
//       const aOrder = order[a.subcategory] || 999;
//       const bOrder = order[b.subcategory] || 999;
      
//       if (aOrder !== bOrder) {
//         return aOrder - bOrder;
//       }
      
//       return a.name.localeCompare(b.name);
//     });
    
//     return uniqueProducts.slice(0, 25);
//   }, [products]);

//   const handleMouseEnter = (menu) =>
//     window.innerWidth >= 1024 && setDropdownOpen(menu);
//   const handleMouseLeave = () =>
//     window.innerWidth >= 1024 && setDropdownOpen(null);

//   const handleDropdownClick = (menu) =>
//     setDropdownOpen(dropdownOpen === menu ? null : menu);

//   const handleProductClick = (productId) => {
//     setDropdownOpen(null);
//     setVisible(false);
//     navigate(`/product/${productId}`);
//     window.scrollTo(0, 0);
//   };

//   const handleCategoryNavigate = (category, subcategory) => {
//     setDropdownOpen(null);
//     setVisible(false);
//     // Navigate to collection page with filters
//     navigate(`/collection?category=${category}&subcategory=${subcategory}`);
//     window.scrollTo(0, 0);
//   };

//   // Simple dropdown for Women Jackets & Men Leather Jackets
//   const SimpleDropdown = ({ products: items, title }) => (
//     <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
//       <div className="max-w-7xl mx-auto px-8 py-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
//           {title}
//         </h3>
//         <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {items.map((product) => (
//             <button
//               key={product.id}
//               onClick={() => handleProductClick(product.id)}
//               className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
//             >
//               <div className="font-medium text-sm text-gray-900 truncate">
//                 {product.name}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );

//   // Desktop Full-Width Mega Dropdown for Collection
//   const DesktopDropdown = () => {
//     const groupedProducts = dropdownProducts.reduce((acc, product) => {
//       const category = product.subcategory;
//       if (!acc[category]) {
//         acc[category] = [];
//       }
//       acc[category].push(product);
//       return acc;
//     }, {});

//     return (
//       <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
//         <div className="max-w-7xl mx-auto px-8 py-6">
//           {Object.entries(groupedProducts).map(([category, items]) => (
//             <div key={category} className="mb-6 last:mb-0">
//               <h3 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
//                 {category}
//               </h3>
//               <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                 {items.map((product) => (
//                   <button
//                     key={product.id}
//                     onClick={() => handleProductClick(product.id)}
//                     className="text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
//                   >
//                     <div className="font-medium text-sm text-gray-900 truncate">
//                       {product.name}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Mobile Dropdown
//   const MobileDropdown = ({ products: items, title }) => (
//     <div className="bg-gray-50 mt-2 py-2 max-h-80 overflow-y-auto">
//       {items.length > 0 ? (
//         items.map((product) => (
//           <button
//             key={product.id}
//             onClick={() => handleProductClick(product.id)}
//             className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
//           >
//             <div className="font-medium text-sm text-gray-900">
//               {product.name}
//             </div>
//           </button>
//         ))
//       ) : (
//         <div className="px-4 py-3 text-sm text-gray-500">
//           No products available
//         </div>
//       )}
//     </div>
//   );

//   const getDropdownComponent = (type) => {
//     if (typeof window === 'undefined') return null;
    
//     if (type === 'men-shoes') {
//       return <SimpleDropdown products={menShoes} title="Men's Shoes" />;
//     } else if (type === 'women-jackets') {
//       return <SimpleDropdown products={womenJackets} title="Women's Jackets" />;
//     } else if (type === 'men-leather') {
//       return <SimpleDropdown products={menLeatherJackets} title="Men's Leather Jackets" />;
//     }
//     return null;
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
//           {/* Mobile Layout */}
//           <div className="flex md:hidden justify-between items-center h-16">
//             <button onClick={() => setVisible(true)} className="p-2">
//               <img src={assets.menu_icon} alt="menu" className="w-5 h-5" />
//             </button>

//             <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
//               <img src={assets.logo} alt="logo" className="h-10 sm:h-12" />
//             </Link>

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

//           {/* Desktop Layout */}
//           <div className="hidden md:flex justify-between h-16 sm:h-20 items-center">
//             <Link to="/">
//               <img src={assets.logo} alt="logo" className="h-8 sm:h-12" />
//             </Link>

//             {/* Desktop Links */}
//             <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 relative">
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

//               {/* Men's Shoes Dropdown */}
//               {menShoes.length > 0 && (
//                 <div
//                   onMouseEnter={() => handleMouseEnter("men-shoes")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div
//                     className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
//                   >
//                     MEN'S SHOES
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         dropdownOpen === "men-shoes" ? "rotate-180" : ""
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
//                   </div>
//                   {dropdownOpen === "men-shoes" && getDropdownComponent("men-shoes")}
//                 </div>
//               )}

//               {/* Men's Leather Jackets Dropdown */}
//               {menLeatherJackets.length > 0 && (
//                 <div
//                   onMouseEnter={() => handleMouseEnter("men-leather")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div
//                     className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
//                   >
//                     MEN'S LEATHER JACKETS
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         dropdownOpen === "men-leather" ? "rotate-180" : ""
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
//                   </div>
//                   {dropdownOpen === "men-leather" && getDropdownComponent("men-leather")}
//                 </div>
//               )}

//               {/* Women's Jackets Dropdown */}
//               {womenJackets.length > 0 && (
//                 <div
//                   onMouseEnter={() => handleMouseEnter("women-jackets")}
//                   onMouseLeave={handleMouseLeave}
//                   className="relative"
//                 >
//                   <div
//                     className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
//                   >
//                     WOMEN'S JACKETS
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         dropdownOpen === "women-jackets" ? "rotate-180" : ""
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
//                   </div>
//                   {dropdownOpen === "women-jackets" && getDropdownComponent("women-jackets")}
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
//             <div className="hidden md:flex lg:hidden items-center space-x-3 relative text-xs">
//               <NavLink to="/" className="font-semibold text-gray-600 hover:text-gray-900">
//                 HOME
//               </NavLink>
//               <div className="font-semibold text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap">
//                 MEN'S SHOES
//               </div>
//               <div className="font-semibold text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap">
//                 MEN'S JACKETS
//               </div>
//               <div className="font-semibold text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap">
//                 WOMEN'S
//               </div>
//               <NavLink to="/about" className="font-semibold text-gray-600 hover:text-gray-900">
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

//           <div className="flex flex-col h-full overflow-y-auto pb-20">
//             <div className="px-4 sm:px-6 py-4 space-y-4">
//               <NavLink
//                 to="/"
//                 onClick={() => setVisible(false)}
//                 className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
//               >
//                 Home
//               </NavLink>

//               {/* Men's Shoes Mobile */}
//               {menShoes.length > 0 && (
//                 <div>
//                   <button
//                     onClick={() => handleDropdownClick("men-shoes")}
//                     className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
//                   >
//                     Men's Shoes
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         dropdownOpen === "men-shoes" ? "rotate-180" : ""
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
//                   {dropdownOpen === "men-shoes" && <MobileDropdown products={menShoes} title="Men's Shoes" />}
//                 </div>
//               )}

//               {/* Men's Leather Jackets Mobile */}
//               {menLeatherJackets.length > 0 && (
//                 <div>
//                   <button
//                     onClick={() => handleDropdownClick("men-leather")}
//                     className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
//                   >
//                     Men's Leather Jackets
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         dropdownOpen === "men-leather" ? "rotate-180" : ""
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
//                   {dropdownOpen === "men-leather" && <MobileDropdown products={menLeatherJackets} title="Men's Leather Jackets" />}
//                 </div>
//               )}

//               {/* Women's Jackets Mobile */}
//               {womenJackets.length > 0 && (
//                 <div>
//                   <button
//                     onClick={() => handleDropdownClick("women-jackets")}
//                     className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
//                   >
//                     Women's Jackets
//                     <svg
//                       className={`w-4 h-4 transition-transform duration-300 ${
//                         dropdownOpen === "women-jackets" ? "rotate-180" : ""
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
//                   {dropdownOpen === "women-jackets" && <MobileDropdown products={womenJackets} title="Women's Jackets" />}
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

  useEffect(() => {
    const handleStorage = () => {
      setLocalToken(localStorage.getItem("token") || "");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLocalToken("");
    setCartItems({});
    navigate("/login", { replace: true });
  };

  // Filter products for Men's Shoes
  const menShoes = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const filtered = products.filter(product => 
      product.category === "Men" && product.subcategory === "Shoes"
    );
    
    const uniqueMap = new Map();
    filtered.forEach(product => {
      const name = product.name.trim();
      if (!uniqueMap.has(name)) {
        uniqueMap.set(name, {
          id: product._id,
          name: name
        });
      }
    });
    
    return Array.from(uniqueMap.values()).slice(0, 20);
  }, [products]);

  // Filter products for Women Jackets
  const womenJackets = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const filtered = products.filter(product => 
      product.category === "Women" && product.subcategory === "Jackets"
    );
    
    const uniqueMap = new Map();
    filtered.forEach(product => {
      const name = product.name.trim();
      if (!uniqueMap.has(name)) {
        uniqueMap.set(name, {
          id: product._id,
          name: name
        });
      }
    });
    
    return Array.from(uniqueMap.values()).slice(0, 20);
  }, [products]);

  // Filter products for Men Leather Jackets
  const menLeatherJackets = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const filtered = products.filter(product => 
      product.category === "Men" && 
      product.subcategory === "Jackets" &&
      (product.name.toLowerCase().includes("leather") || 
       product.description?.toLowerCase().includes("leather"))
    );
    
    const uniqueMap = new Map();
    filtered.forEach(product => {
      const name = product.name.trim();
      if (!uniqueMap.has(name)) {
        uniqueMap.set(name, {
          id: product._id,
          name: name
        });
      }
    });
    
    return Array.from(uniqueMap.values()).slice(0, 20);
  }, [products]);

  const handleMouseEnter = (menu) =>
    window.innerWidth >= 1024 && setDropdownOpen(menu);
  const handleMouseLeave = () =>
    window.innerWidth >= 1024 && setDropdownOpen(null);

  const handleDropdownClick = (menu) =>
    setDropdownOpen(dropdownOpen === menu ? null : menu);

  const handleProductClick = (productId) => {
    setDropdownOpen(null);
    setVisible(false);
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  // 🔥 NEW: Navigate to collection with category filter
  const handleCategoryNavigate = (category, subcategory) => {
    setDropdownOpen(null);
    setVisible(false);
    navigate(`/collection?category=${category}&subcategory=${subcategory}`);
    window.scrollTo(0, 0);
  };

  // Simple dropdown for Women Jackets & Men Leather Jackets
  const SimpleDropdown = ({ products: items, title, category, subcategory }) => (
    <div className="fixed top-20 left-0 w-screen max-h-[70vh] overflow-y-auto bg-white z-50 shadow-xl border border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-gray-900">
          <h3 className="text-lg font-bold text-gray-900">
            {title}
          </h3>
          {/* View All Button */}
          <button
            onClick={() => handleCategoryNavigate(category, subcategory)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
          >
            View All {title} →
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
    </div>
  );

  // Mobile Dropdown
  const MobileDropdown = ({ products: items, category, subcategory }) => (
    <div className="bg-gray-50 mt-2 py-2 max-h-80 overflow-y-auto">
      {/* View All Button for Mobile */}
      <button
        onClick={() => handleCategoryNavigate(category, subcategory)}
        className="w-full text-left px-4 py-3 font-semibold text-blue-600 hover:bg-gray-100 transition-colors border-b-2 border-blue-200"
      >
        View All →
      </button>
      
      {items.length > 0 ? (
        items.map((product) => (
          <button
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
          >
            <div className="font-medium text-sm text-gray-900">
              {product.name}
            </div>
          </button>
        ))
      ) : (
        <div className="px-4 py-3 text-sm text-gray-500">
          No products available
        </div>
      )}
    </div>
  );

  const getDropdownComponent = (type) => {
    if (typeof window === 'undefined') return null;
    
    if (type === 'men-shoes') {
      return <SimpleDropdown 
        products={menShoes} 
        title="Men's Shoes" 
        category="Men" 
        subcategory="Shoes" 
      />;
    } else if (type === 'women-jackets') {
      return <SimpleDropdown 
        products={womenJackets} 
        title="Women's Jackets" 
        category="Women" 
        subcategory="Jackets" 
      />;
    } else if (type === 'men-leather') {
      return <SimpleDropdown 
        products={menLeatherJackets} 
        title="Men's Leather Jackets" 
        category="Men" 
        subcategory="Jackets" 
      />;
    }
    return null;
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
          {/* Mobile Layout */}
          <div className="flex md:hidden justify-between items-center h-16">
            <button onClick={() => setVisible(true)} className="p-2">
              <img src={assets.menu_icon} alt="menu" className="w-5 h-5" />
            </button>

            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
              <img src={assets.logo} alt="logo" className="h-10 sm:h-12" />
            </Link>

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

          {/* Desktop Layout */}
          <div className="hidden md:flex justify-between h-16 sm:h-20 items-center">
            <Link to="/">
              <img src={assets.logo} alt="logo" className="h-8 sm:h-12" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 relative">
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

              {/* Men's Shoes Dropdown */}
              {menShoes.length > 0 && (
                <div
                  onMouseEnter={() => handleMouseEnter("men-shoes")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <div
                    className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                  >
                    MEN'S SHOES
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen === "men-shoes" ? "rotate-180" : ""
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
                  </div>
                  {dropdownOpen === "men-shoes" && getDropdownComponent("men-shoes")}
                </div>
              )}

              {/* Men's Leather Jackets Dropdown */}
              {menLeatherJackets.length > 0 && (
                <div
                  onMouseEnter={() => handleMouseEnter("men-leather")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <div
                    className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                  >
                    MEN'S LEATHER JACKETS
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen === "men-leather" ? "rotate-180" : ""
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
                  </div>
                  {dropdownOpen === "men-leather" && getDropdownComponent("men-leather")}
                </div>
              )}

              {/* Women's Jackets Dropdown */}
              {womenJackets.length > 0 && (
                <div
                  onMouseEnter={() => handleMouseEnter("women-jackets")}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <div
                    className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                  >
                    WOMEN'S JACKETS
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen === "women-jackets" ? "rotate-180" : ""
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
                  </div>
                  {dropdownOpen === "women-jackets" && getDropdownComponent("women-jackets")}
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
            <div className="hidden md:flex lg:hidden items-center space-x-3 relative text-xs">
              <NavLink to="/" className="font-semibold text-gray-600 hover:text-gray-900">
                HOME
              </NavLink>
              <button 
                onClick={() => handleCategoryNavigate("Men", "Shoes")}
                className="font-semibold text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap"
              >
                MEN'S SHOES
              </button>
              <button 
                onClick={() => handleCategoryNavigate("Men", "Jackets")}
                className="font-semibold text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap"
              >
                MEN'S JACKETS
              </button>
              <button 
                onClick={() => handleCategoryNavigate("Women", "Jackets")}
                className="font-semibold text-gray-600 hover:text-gray-900 cursor-pointer whitespace-nowrap"
              >
                WOMEN'S
              </button>
              <NavLink to="/about" className="font-semibold text-gray-600 hover:text-gray-900">
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

          <div className="flex flex-col h-full overflow-y-auto pb-20">
            <div className="px-4 sm:px-6 py-4 space-y-4">
              <NavLink
                to="/"
                onClick={() => setVisible(false)}
                className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </NavLink>

              {/* Men's Shoes Mobile */}
              {menShoes.length > 0 && (
                <div>
                  <button
                    onClick={() => handleDropdownClick("men-shoes")}
                    className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Men's Shoes
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen === "men-shoes" ? "rotate-180" : ""
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
                  {dropdownOpen === "men-shoes" && (
                    <MobileDropdown 
                      products={menShoes} 
                      category="Men" 
                      subcategory="Shoes" 
                    />
                  )}
                </div>
              )}

              {/* Men's Leather Jackets Mobile */}
              {menLeatherJackets.length > 0 && (
                <div>
                  <button
                    onClick={() => handleDropdownClick("men-leather")}
                    className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Men's Leather Jackets
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen === "men-leather" ? "rotate-180" : ""
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
                  {dropdownOpen === "men-leather" && (
                    <MobileDropdown 
                      products={menLeatherJackets} 
                      category="Men" 
                      subcategory="Jackets" 
                    />
                  )}
                </div>
              )}

              {/* Women's Jackets Mobile */}
              {womenJackets.length > 0 && (
                <div>
                  <button
                    onClick={() => handleDropdownClick("women-jackets")}
                    className="flex justify-between items-center w-full text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Women's Jackets
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        dropdownOpen === "women-jackets" ? "rotate-180" : ""
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
                  {dropdownOpen === "women-jackets" && (
                    <MobileDropdown 
                      products={womenJackets} 
                      category="Women" 
                      subcategory="Jackets" 
                    />
                  )}
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