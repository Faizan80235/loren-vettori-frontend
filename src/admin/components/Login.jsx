import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from '../../App'
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Attempting login with:", { email, backendUrl });
      
      // Fixed: Use the correct endpoint that matches your backend
      const response = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        const token = response.data.token || response.data.accessToken;
        
        if (token) {
          setToken(token);
          localStorage.setItem('token', token);
          toast.success("Login successful!");
          
          // Debug: Check token structure
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log("Token payload:", payload);
          } catch (e) {
            console.log("Token decode error:", e);
          }
        } else {
          toast.error("No token received from server");
        }
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || "Server error occurred";
        toast.error(errorMessage);
        
        if (error.response.status === 429) {
          toast.error("Too many login attempts. Please try again later.");
        }
      } else if (error.request) {
        // Network error
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg px-8 py-6 max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="email"
              placeholder="admin@example.com"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-6 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="password"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          <button
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-black hover:bg-gray-800'
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
            <p><strong>Backend URL:</strong> {backendUrl}</p>
            <p><strong>Endpoint:</strong> /api/admin/login</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;