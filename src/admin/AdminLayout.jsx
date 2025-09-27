import React from 'react';
import NavBar from './components/NavBar'; 
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ Modern import syntax

const AdminLayout = () => {
  const token = localStorage.getItem('token');
  let adminName = "Admin";
  
  try {
    if (token) {
      const decoded = jwtDecode(token); // ✅ Use jwtDecode instead of jwt_decode
      adminName = decoded.name || decoded.username || "Admin";
    }
  } catch (err) {
    console.error("Token decode error:", err);
    // Optional: Clear invalid token
    // localStorage.removeItem('token');
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="p-6">
          <h1 className="text-xl font-bold mb-4">Welcome, {adminName}</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;