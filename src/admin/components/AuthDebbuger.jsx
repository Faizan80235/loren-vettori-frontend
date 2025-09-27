// Debug component to check authentication status
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthDebugger = ({ token }) => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      
      // Try to decode JWT token (basic decode, not verification)
      let decodedToken = null;
      if (storedToken) {
        try {
          const payload = storedToken.split('.')[1];
          decodedToken = JSON.parse(atob(payload));
        } catch (error) {
          console.error('Token decode error:', error);
        }
      }

      setDebugInfo({
        propToken: token,
        storedToken: storedToken,
        backendUrl: backendUrl,
        decodedToken: decodedToken,
        tokenExists: !!storedToken,
        tokensMatch: token === storedToken,
        currentTime: Math.floor(Date.now() / 1000)
      });
    };

    checkAuth();
  }, [token]);

  const testAdminLogin = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      const response = await fetch(`${backendUrl}/api/user/admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: process.env.REACT_APP_ADMIN_EMAIL || 'admin@example.com',
          password: process.env.REACT_APP_ADMIN_PASSWORD || 'admin123'
        })
      });

      const data = await response.json();
      console.log('Admin login test response:', data);
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        toast.success('Test login successful');
        // Refresh debug info
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Test login error:', error);
      toast.error('Test login failed');
    }
  };

  const testTokenValidation = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        toast.error('No token found');
        return;
      }

      const response = await fetch(`${backendUrl}/api/product/admin/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log('Token validation test:', response.status, data);

      if (response.status === 200) {
        toast.success('Token is valid');
      } else {
        toast.error(`Token validation failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Token validation error:', error);
      toast.error('Token validation failed');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">Authentication Debug Info</h3>
      
      <div className="space-y-2 text-sm">
        <div><strong>Backend URL:</strong> {debugInfo.backendUrl}</div>
        <div><strong>Token from props:</strong> {debugInfo.propToken ? 'Present' : 'Missing'}</div>
        <div><strong>Token in localStorage:</strong> {debugInfo.tokenExists ? 'Present' : 'Missing'}</div>
        <div><strong>Tokens match:</strong> {debugInfo.tokensMatch ? 'Yes' : 'No'}</div>
        <div><strong>Current time:</strong> {debugInfo.currentTime}</div>
        
        {debugInfo.decodedToken && (
          <div>
            <strong>Decoded token:</strong>
            <pre className="bg-white p-2 rounded text-xs mt-2">
              {JSON.stringify(debugInfo.decodedToken, null, 2)}
            </pre>
          </div>
        )}
        
        {debugInfo.storedToken && (
          <div>
            <strong>Raw token (first 50 chars):</strong>
            <div className="bg-white p-2 rounded text-xs mt-1 font-mono">
              {debugInfo.storedToken.substring(0, 50)}...
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-x-2">
        <button
          onClick={testAdminLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Admin Login
        </button>
        <button
          onClick={testTokenValidation}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Token Validation
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Token
        </button>
      </div>
    </div>
  );
};

export default AuthDebugger;