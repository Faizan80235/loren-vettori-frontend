
import React, { useContext, useState ,useEffect} from "react";
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
    // 1. Remove token from storage
    localStorage.removeItem("token");

    // 2. Clear local state
    setLocalToken("");
    setCartItems({});

    // 3. Navigate to login page
    navigate("/login", { replace: true });
  };

  // ----- Product sampler -----
  const getCategoryProducts = (category, limit = 3) =>
    (products || [])
      .filter((p) => p.category?.toLowerCase().includes(category.toLowerCase()))
      .slice(0, limit);

  // ----- Categories -----
  const dropdownCategories = [
    { name: "Boots", key: "boots", subcategories: ["Lace Ups", "Chelsea", "Cowboy", "Chukkas", "Jodhpur"] },
    { name: "Shoes", key: "shoes", subcategories: ["Captoe", "Derbies", "Monk Straps", "Oxfords", "Wingtip"] },
    { name: "Sneakers", key: "sneakers", subcategories: ["Casual", "Sports", "Designer"] },
    { name: "Loafers", key: "loafers", subcategories: ["Penny", "Tassel", "Horsebit"] },
    { name: "Slippers", key: "slippers", subcategories: ["Mules", "Slides", "Flip-flops"] },
  ];

  // ----- Hover handlers -----
  const handleMouseEnter = (menu) =>
    window.innerWidth >= 1024 && setDropdownOpen(menu);
  const handleMouseLeave = () =>
    window.innerWidth >= 1024 && setDropdownOpen(null);

  // ----- Mobile dropdown toggle -----
  const handleDropdownClick = (menu) =>
    setDropdownOpen(dropdownOpen === menu ? null : menu);

  const MiniProductCard = ({ product }) => {
    const img = (() => {
      if (!product.images || product.images.length === 0)
        return "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=150&h=150&fit=crop";
      const p = product.images.find((x) => x.isPrimary) || product.images[0];
      return typeof p === "string" ? p : p?.url || "";
    })();
    const price =
      product.effectivePrice ??
      (product.price?.discount > 0
        ? product.price.discount
        : product.price?.base) ??
      product.price ??
      0;

    return (
      <Link
        to={`/product/${product._id}`}
        onClick={() => setDropdownOpen(null)}
        className="group block bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
      >
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-3">
          <h4 className="text-sm font-semibold text-gray-900 truncate">
            {product.name}
          </h4>
          <p className="text-sm text-gray-600 font-bold">
            Rs.{Number(price).toFixed(2)}
          </p>
        </div>
      </Link>
    );
  };

  // ----- Desktop Full-Width Mega Dropdown -----
const DesktopDropdown = () => (
<div
  className="fixed top-20 left-0 w-screen h-[calc(100vh-20rem)] 
             bg-white z-50 overflow-y-auto shadow-xl border border-gray-200 "
>


    <div className="max-w-7xl mx-auto px-8 py-10 ">
      {/* Dropdown content grid */}
      <div className="grid grid-cols-5 gap-8">
        {dropdownCategories.map((cat) => {
          const items = getCategoryProducts(cat.key, 1);
          return (
            <div key={cat.key} className="space-y-4">
              <h3 className="font-bold text-lg border-b mt-0">{cat.name}</h3>
              <div className="space-y-1 ">
                {cat.subcategories.map((s) => (
                  <Link
                    key={s}
                    to={`/collection?category=${cat.key}&subcategory=${s.toLowerCase()}`}
                    className="block text-sm text-gray-600 hover:text-gray-900 hover:pl-1 transition"
                    onClick={() => setDropdownOpen(null)}
                  >
                    {s}
                  </Link>
                ))}
                <Link
                  to={`/collection?category=${cat.key}`}
                  className="block text-sm text-blue-600 font-semibold mt-2"
                  onClick={() => setDropdownOpen(null)}
                >
                  View All
                </Link>
              </div>
              {items[0] && <MiniProductCard product={items[0]} />}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

  // ----- Mobile Dropdown -----
  const MobileDropdown = () => (
    <div className="bg-gray-50">
      {dropdownCategories.map((cat) => (
        <div key={cat.key} className="px-6 py-4 border-b">
          <h3 className="font-bold mb-2">{cat.name}</h3>
          {cat.subcategories.map((s) => (
            <Link
              key={s}
              to={`/collection?category=${cat.key}&subcategory=${s.toLowerCase()}`}
              className="block text-sm text-gray-600 hover:text-gray-900 py-1"
              onClick={() => {
                setDropdownOpen(null);
                setVisible(false);
              }}
            >
              {s}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Navbar */}
    <nav
      className={`fixed left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200
                  transition-all duration-300
                  ${scrolled ? "top-0" : "top-6"}`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <Link to="/">
              <img src={assets.logo} alt="logo" className="h-12" />
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-10 relative">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-semibold ${
                    isActive ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-600"
                  }`
                }
              >
                HOME
              </NavLink>

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
                {dropdownOpen === "collection" && <DesktopDropdown />}
              </div>

              <NavLink to="/about" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                ABOUT
              </NavLink>
              <NavLink to="/contact" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                CONTACT
              </NavLink>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              <button onClick={() => setShowSearch(true)}>
                <img src={assets.search_icon} alt="search" className="w-5 h-5" />
              </button>
              <div className="relative group">
                <button
                  onClick={() => (token ? null : navigate("/login"))}
                  className="p-2"
                >
                  <img src={assets.profile_icon} alt="profile" className="w-5 h-5" />
                </button>
                {token && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <button onClick={() => navigate("/cart")} className="relative p-2">
                <img src={assets.cart_icon} alt="cart" className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getCartCount()}
                  </span>
                )}
              </button>
              <button onClick={() => setVisible(true)} className="lg:hidden p-2">
                <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 lg:hidden transition ${
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setVisible(false)}
      >
        <div
          className={`fixed top-0 left-0 w-80 bg-white h-full transform transition ${
            visible ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b">
            <Link to="/" onClick={() => setVisible(false)}>
              <img src={assets.logo} alt="logo" className="h-10" />
            </Link>
            <button onClick={() => setVisible(false)}>
              <img src={assets.cross_icon} alt="close" className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-4">
            <NavLink
              to="/"
              onClick={() => setVisible(false)}
              className="block text-lg font-semibold text-gray-700"
            >
              Home
            </NavLink>

            {/* Mobile Collection Dropdown */}
            <div>
              <button
                onClick={() => handleDropdownClick("collection")}
                className="flex justify-between w-full text-lg font-semibold text-gray-700"
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

            <NavLink to="/about" onClick={() => setVisible(false)} className="block text-lg font-semibold">
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setVisible(false)} className="block text-lg font-semibold">
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;

