import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const EmailVerificationPage = () => {
  const { backendUrl } = useContext(ShopContext);
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Get token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    console.log('Email verification started with token:', token ? 'present' : 'missing');
    console.log('Backend URL:', backendUrl);
    
    if (token) {
      verifyEmail(token);
    } else {
      setStatus('error');
      setMessage('Invalid verification link. No token provided.');
    }
  }, [backendUrl]);

  // Countdown timer for redirect
  useEffect(() => {
    if (status === 'success' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (status === 'success' && countdown === 0) {
      window.location.href = '/';
    }
  }, [status, countdown]);

  const verifyEmail = async (token) => {
    try {
      console.log('Attempting to verify email with backend URL:', backendUrl);
      
      const apiUrl = `${backendUrl}/api/user/verify-email`;
      console.log('Making request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON:', contentType);
        const textResponse = await response.text();
        console.error('Raw response:', textResponse);
        throw new Error(`Server returned non-JSON response: ${response.status}`);
      }

      const data = await response.json();
      console.log('Parsed response data:', data);
      
      if (data.success) {
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        
        // Save token for auto-login
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        
        toast.success('Email verified successfully!');
      } else {
        setStatus('error');
        setMessage(data.message || 'Email verification failed');
        toast.error(data.message || 'Verification failed');
      }
    } catch (error) {
      console.error('Verification error details:', error);
      setStatus('error');
      
      if (error.message.includes('404')) {
        setMessage('Email verification service not found. Please check if the backend is running.');
      } else if (error.message.includes('Failed to fetch')) {
        setMessage('Cannot connect to server. Please check your connection.');
      } else {
        setMessage(error.message || 'Network error occurred during verification');
      }
      
      toast.error(error.message || 'Verification failed');
    }
  };

  const handleResendVerification = async () => {
    const email = prompt('Please enter your email address to resend verification:');
    if (!email) return;

    try {
      const response = await fetch(`${backendUrl}/api/user/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('New verification email sent! Please check your inbox.');
      } else {
        toast.error(data.message || 'Failed to resend verification email');
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Failed to resend verification email');
    }
  };

  // Debug info for development
  const debugInfo = (
    <div className="bg-gray-100 p-4 rounded mb-4 text-xs">
      <p><strong>Debug Info:</strong></p>
      <p>Backend URL: {backendUrl || 'Not set'}</p>
      <p>Status: {status}</p>
      <p>Current URL: {window.location.href}</p>
      <p>Token present: {new URLSearchParams(window.location.search).get('token') ? 'Yes' : 'No'}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Show debug info in development */}
        {process.env.NODE_ENV === 'development' && debugInfo}
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Verifying State */}
          

          {status === 'success' && (
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-6">✓</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Email Verified Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  You can now place orders and receive important notifications.
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  Redirecting to homepage in {countdown} seconds...
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => window.location.href = '/'}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go to Homepage
                  </button>
                  <button
                    onClick={() => window.location.href = '/collection'}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="text-center">
              <div className="text-red-600 text-6xl mb-6">✗</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-6">
                {message}
              </p>

              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-red-800 mb-2">
                  Common reasons for verification failure:
                </h3>
                <ul className="text-sm text-red-700 text-left space-y-1">
                  <li>• The verification link has expired (valid for 24 hours)</li>
                  <li>• The link has already been used</li>
                  <li>• The backend server is not running</li>
                  <li>• Network connection issues</li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleResendVerification}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Request New Verification Email
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => window.location.href = '/login'}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Homepage
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;