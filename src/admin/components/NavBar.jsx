import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  // token state (read once from localStorage)
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  // Whenever token changes, sync with localStorage
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    setToken('');                       // clear in state
    localStorage.removeItem('token');   // clear in storage
    toast.success('Logged out successfully');
    navigate('/login');                 // redirect to single login page
  };

  // ✅ If NO token → force to login page on page load/refresh
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  return (
    <div className="flex items-center py-3 px-[4%] justify-between bg-white border-b">
      <div className="flex items-center">
        <img className="w-[max(10%,80px)]" src={assets.logo} alt="Logo" />
        <h2 className="ml-4 text-xl font-semibold text-gray-800 hidden sm:block">
          Admin Panel
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm text-gray-600">Welcome, Admin</span>
          <span className="text-xs text-gray-400">Management Dashboard</span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2
                     sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm
                     font-medium transition-colors duration-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
