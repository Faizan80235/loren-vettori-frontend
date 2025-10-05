
// import React, { useContext, useState, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [currentState, setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
//  const navigateHook = useNavigate()

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

// const onSubmitHandler = async (event) => {
//   event.preventDefault();
//   setLoading(true);

//   try {
//     if (currentState === 'Sign Up') {
//       // ------------------  Sign Up  ------------------
//       const response = await axios.post(`${backendUrl}/api/user/register`, {
//         name,
//         email,
//         password,
//       });

//       if (response.data.success) {
//         toast.success(
//           response.data.message ||
//             'Registration successful! Please check your email to verify your account.'
//         );
//         setCurrentState('Login');
//         setName('');
//         setEmail('');
//         setPassword('');

//         if (response.data.emailSent) {
//           toast.info(
//             'A verification email has been sent to your inbox. Please verify your email before logging in.'
//           );
//         }
//       } else {
//         toast.error(response.data.message || 'Registration failed');
//       }
//     } else {
// // ------------------  Admin Login Check  ------------------
// try {
//   const adminResp = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

//   if (adminResp.data?.success && adminResp.data?.isAdmin) {
//     localStorage.setItem('token', adminResp.data.token);
//     toast.success('Admin login successful!');
//     navigateHook('/admin/dashboard'); // or your actual path
//     return;
//   }
// } catch (adminErr) {
//   if (adminErr.response?.status !== 401) {
//     console.error('Admin login check error:', adminErr);
//   }
// }


//       // ------------------  Normal User Login  ------------------
//       const response = await axios.post(`${backendUrl}/api/user/login`, {
//         email,
//         password,
//       });

//       if (response.data.success) {
//         localStorage.setItem('token', response.data.token);
//         toast.success('Login successful!');
//         navigateHook('/');
//       } else {
//         if (response.data.emailVerified === false) {
//           toast.error(response.data.message);
//           const shouldResend = window.confirm(
//             'Your email is not verified. Would you like to resend the verification email?'
//           );
//           if (shouldResend) {
//             await resendVerification(response.data.email || email);
//           }
//         } else {
//           toast.error(response.data.message || 'Login failed');
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Auth error:', error);
//     if (error.response) {
//       const errorMessage =
//         error.response.data?.message || 'Authentication failed';
//       toast.error(errorMessage);

//       if (error.response.data?.emailVerified === false) {
//         const shouldResend = window.confirm(
//           'Your email is not verified. Would you like to resend the verification email?'
//         );
//         if (shouldResend) {
//           await resendVerification(error.response.data.email || email);
//         }
//       }
//     } else if (error.request) {
//       toast.error('Network error. Please check your connection and try again.');
//     } else {
//       toast.error('An unexpected error occurred. Please try again.');
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//   // Resend verification email function
//   const resendVerification = async (userEmail) => {
//     try {
//       const response = await axios.post(`${backendUrl}/api/user/resend-verification`, {
//         email: userEmail
//       });

//       if (response.data.success) {
//         toast.success('Verification email sent! Please check your inbox.');
//       } else {
//         toast.error(response.data.message || 'Failed to send verification email');
//       }
//     } catch (error) {
//       console.error('Resend verification error:', error);
//       toast.error('Failed to resend verification email');
//     }
//   };

//   // Redirect if already logged in
//   useEffect(() => {
//     if (token) {
//       navigateHook('/');
//     }
//   }, [token, navigateHook]);

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//       </div>

//       {/* Show email verification status */}
//       <div className='w-full'>
//         {currentState === 'Sign Up' && (
//           <div className='bg-blue-50 border border-blue-200 rounded p-3 mb-4'>
//             <p className='text-blue-800 text-sm'>
//               After registration, you'll need to verify your email address before you can log in.
//             </p>
//           </div>
//         )}
        
//         {currentState === 'Login' && (
//           <div className='bg-yellow-50 border border-yellow-200 rounded p-3 mb-4'>
//             <p className='text-yellow-800 text-sm'>
//               Make sure your email is verified before logging in. Check your inbox for the verification link.
//             </p>
//           </div>
//         )}
//       </div>

//       {currentState === 'Login' ? '' : 
//         <input 
//           onChange={(e) => setName(e.target.value)} 
//           value={name} 
//           type="text" 
//           className='w-full px-3 py-2 border border-gray-800' 
//           placeholder='Name' 
//           required 
//         />
//       }
      
//       <input 
//         onChange={(e) => setEmail(e.target.value)} 
//         value={email} 
//         type="email" 
//         className='w-full px-3 py-2 border border-gray-800' 
//         placeholder='Email' 
//         required 
//       />
      
//       <input 
//         onChange={(e) => setPassword(e.target.value)} 
//         value={password} 
//         type="password" 
//         className='w-full px-3 py-2 border border-gray-800' 
//         placeholder='Password' 
//         required 
//       />

//       <div className='w-full flex justify-between text-sm mt-[-8px]'>
//         {currentState === 'Login' ? (
//           <p className='cursor-pointer text-blue-600 hover:underline'>Forgot your password?</p>
//         ) : (
//           <p className='text-gray-600'>Password must be at least 8 characters with letters and numbers</p>
//         )}
//       </div>

//       <button 
//         type="submit"
//         className={`bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={loading}
//       >
//         {loading ? (
//           <span className='flex items-center gap-2'>
//             <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
//             {currentState === 'Login' ? 'Logging in...' : 'Creating Account...'}
//           </span>
//         ) : (
//           currentState === 'Login' ? 'Sign In' : 'Sign Up'
//         )}
//       </button>

//       {currentState === 'Login' ? 
//         <p>Don't have an account? 
//           <span 
//             onClick={() => setCurrentState('Sign Up')} 
//             className='text-blue-600 cursor-pointer hover:underline ml-1'
//           >
//             Create here
//           </span>
//         </p> 
//         : 
//         <p>Already have an account? 
//           <span 
//             onClick={() => setCurrentState('Login')} 
//             className='text-blue-600 cursor-pointer hover:underline ml-1'
//           >
//             Login here
//           </span>
//         </p>
//       }

//       {/* Resend verification section */}
//       {currentState === 'Login' && (
//         <div className='w-full mt-4 pt-4 border-t border-gray-200'>
//           <p className='text-center text-sm text-gray-600 mb-2'>
//             Didn't receive verification email?
//           </p>
//           <button 
//             type="button"
//             onClick={() => {
//               const userEmail = prompt('Enter your email address:');
//               if (userEmail) {
//                 resendVerification(userEmail);
//               }
//             }}
//             className='w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors text-sm'
//           >
//             Resend Verification Email
//           </button>
//         </div>
//       )}
//     </form>
//   );
// };

// export default Login;
// import React, { useContext, useState, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { useSurvey } from '../context/Surveycontext'; // Add this import
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [currentState, setCurrentState] = useState('Login');
//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
//   const { triggerSurveyCheck } = useSurvey(); // Add this hook
//   const navigateHook = useNavigate();

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       if (currentState === 'Sign Up') {
//         // ------------------  Sign Up  ------------------
//         const response = await axios.post(`${backendUrl}/api/user/register`, {
//           name,
//           email,
//           password,
//         });

//         if (response.data.success) {
//           toast.success(
//             response.data.message ||
//               'Registration successful! Please check your email to verify your account.'
//           );
//           setCurrentState('Login');
//           setName('');
//           setEmail('');
//           setPassword('');

//           if (response.data.emailSent) {
//             toast.info(
//               'A verification email has been sent to your inbox. Please verify your email before logging in.'
//             );
//           }
//         } else {
//           toast.error(response.data.message || 'Registration failed');
//         }
//       } else {
//         // ------------------  Admin Login Check  ------------------
//         try {
//           const adminResp = await axios.post(`${backendUrl}/api/user/admin`, { 
//             email, 
//             password 
//           });

//           if (adminResp.data?.success && adminResp.data?.token) {
//             localStorage.setItem('token', adminResp.data.token);
//             setToken(adminResp.data.token);
//             toast.success('Admin login successful!');
//             navigateHook('/admin/dashboard');
//             return; // Exit early for admin
//           }
//         } catch (adminErr) {
//           if (adminErr.response?.status !== 401) {
//             console.error('Admin login check error:', adminErr);
//           }
//           // Continue to normal login if admin check fails
//         }

//         // ------------------  Normal User Login  ------------------
//         const response = await axios.post(`${backendUrl}/api/user/login`, {
//           email,
//           password,
//         });

//         if (response.data.success) {
//           const userToken = response.data.token;
          
//           // Save token
//           localStorage.setItem('token', userToken);
//           setToken(userToken);
          
//           toast.success('Login successful!');
          
//           // 🔥 TRIGGER SURVEY CHECK - This is the key addition
//           setTimeout(() => {
//             triggerSurveyCheck();
//           }, 500); // Small delay to ensure token is set
          
//           navigateHook('/');
//         } else {
//           if (response.data.emailVerified === false) {
//             toast.error(response.data.message);
//             const shouldResend = window.confirm(
//               'Your email is not verified. Would you like to resend the verification email?'
//             );
//             if (shouldResend) {
//               await resendVerification(response.data.email || email);
//             }
//           } else {
//             toast.error(response.data.message || 'Login failed');
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Auth error:', error);
//       if (error.response) {
//         const errorMessage =
//           error.response.data?.message || 'Authentication failed';
//         toast.error(errorMessage);

//         if (error.response.data?.emailVerified === false) {
//           const shouldResend = window.confirm(
//             'Your email is not verified. Would you like to resend the verification email?'
//           );
//           if (shouldResend) {
//             await resendVerification(error.response.data.email || email);
//           }
//         }
//       } else if (error.request) {
//         toast.error('Network error. Please check your connection and try again.');
//       } else {
//         toast.error('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Resend verification email function
//   const resendVerification = async (userEmail) => {
//     try {
//       const response = await axios.post(`${backendUrl}/api/user/resend-verification`, {
//         email: userEmail
//       });

//       if (response.data.success) {
//         toast.success('Verification email sent! Please check your inbox.');
//       } else {
//         toast.error(response.data.message || 'Failed to send verification email');
//       }
//     } catch (error) {
//       console.error('Resend verification error:', error);
//       toast.error('Failed to resend verification email');
//     }
//   };

//   // Redirect if already logged in
//   useEffect(() => {
//     if (token) {
//       navigateHook('/');
//     }
//   }, [token, navigateHook]);

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//       </div>

//       {/* Show email verification status */}
//       <div className='w-full'>
//         {currentState === 'Sign Up' && (
//           <div className='bg-blue-50 border border-blue-200 rounded p-3 mb-4'>
//             <p className='text-blue-800 text-sm'>
//               After registration, you'll need to verify your email address before you can log in.
//             </p>
//           </div>
//         )}
        
//         {currentState === 'Login' && (
//           <div className='bg-yellow-50 border border-yellow-200 rounded p-3 mb-4'>
//             <p className='text-yellow-800 text-sm'>
//               Make sure your email is verified before logging in. Check your inbox for the verification link.
//             </p>
//           </div>
//         )}
//       </div>

//       {currentState === 'Login' ? '' : 
//         <input 
//           onChange={(e) => setName(e.target.value)} 
//           value={name} 
//           type="text" 
//           className='w-full px-3 py-2 border border-gray-800' 
//           placeholder='Name' 
//           required 
//         />
//       }
      
//       <input 
//         onChange={(e) => setEmail(e.target.value)} 
//         value={email} 
//         type="email" 
//         className='w-full px-3 py-2 border border-gray-800' 
//         placeholder='Email' 
//         required 
//       />
      
//       <input 
//         onChange={(e) => setPassword(e.target.value)} 
//         value={password} 
//         type="password" 
//         className='w-full px-3 py-2 border border-gray-800' 
//         placeholder='Password' 
//         required 
//       />

//       <div className='w-full flex justify-between text-sm mt-[-8px]'>
//         {currentState === 'Login' ? (
//           <p className='cursor-pointer text-blue-600 hover:underline'>Forgot your password?</p>
//         ) : (
//           <p className='text-gray-600'>Password must be at least 8 characters with letters and numbers</p>
//         )}
//       </div>

//       <button 
//         type="submit"
//         className={`bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         disabled={loading}
//       >
//         {loading ? (
//           <span className='flex items-center gap-2'>
//             <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
//             {currentState === 'Login' ? 'Logging in...' : 'Creating Account...'}
//           </span>
//         ) : (
//           currentState === 'Login' ? 'Sign In' : 'Sign Up'
//         )}
//       </button>

//       {currentState === 'Login' ? 
//         <p>Don't have an account? 
//           <span 
//             onClick={() => setCurrentState('Sign Up')} 
//             className='text-blue-600 cursor-pointer hover:underline ml-1'
//           >
//             Create here
//           </span>
//         </p> 
//         : 
//         <p>Already have an account? 
//           <span 
//             onClick={() => setCurrentState('Login')} 
//             className='text-blue-600 cursor-pointer hover:underline ml-1'
//           >
//             Login here
//           </span>
//         </p>
//       }

//       {/* Resend verification section */}
//       {currentState === 'Login' && (
//         <div className='w-full mt-4 pt-4 border-t border-gray-200'>
//           <p className='text-center text-sm text-gray-600 mb-2'>
//             Didn't receive verification email?
//           </p>
//           <button 
//             type="button"
//             onClick={() => {
//               const userEmail = prompt('Enter your email address:');
//               if (userEmail) {
//                 resendVerification(userEmail);
//               }
//             }}
//             className='w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors text-sm'
//           >
//             Resend Verification Email
//           </button>
//         </div>
//       )}
//     </form>
//   );
// };

// export default Login;
import React, { useState, useEffect } from 'react';
import { useSurvey } from '../context/Surveycontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { triggerSurveyCheck } = useSurvey();
  const navigate = useNavigate();
  
  // Form states
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Token state - separate variable
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  
  // Backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState === 'Sign Up') {
        // ------------------  Sign Up  ------------------
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success(
            response.data.message ||
              'Registration successful! Please check your email to verify your account.'
          );
          setCurrentState('Login');
          setName('');
          setEmail('');
          setPassword('');

          if (response.data.emailSent) {
            toast.info(
              'A verification email has been sent to your inbox. Please verify your email before logging in.'
            );
          }
        } else {
          toast.error(response.data.message || 'Registration failed');
        }
      } else {
        // ------------------  Admin Login Check  ------------------
        try {
          const adminResp = await axios.post(`${backendUrl}/api/user/admin`, { 
            email, 
            password 
          });

          if (adminResp.data?.success && adminResp.data?.token) {
            // Get admin token in separate variable
            const adminToken = adminResp.data.token;
            
            // Save to localStorage
            localStorage.setItem('token', adminToken);
            
            // Update state
            setAuthToken(adminToken);
            
            toast.success('Admin login successful!');
            navigate('/admin/dashboard');
            setLoading(false);
            return;
          }
        } catch (adminErr) {
          if (adminErr.response?.status !== 401) {
            console.error('Admin login check error:', adminErr);
          }
          // Continue to normal login if admin check fails
        }

        // ------------------  Normal User Login  ------------------
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          // Get user token in separate variable
          const userToken = response.data.token;
          
          // Save to localStorage
          localStorage.setItem('token', userToken);
          
          // Update state
          setAuthToken(userToken);
          
          toast.success('Login successful!');
          
          // Trigger survey check after token is set
          setTimeout(() => {
            triggerSurveyCheck();
          }, 500);
          
          navigate('/');
        } else {
          if (response.data.emailVerified === false) {
            toast.error(response.data.message);
            const shouldResend = window.confirm(
              'Your email is not verified. Would you like to resend the verification email?'
            );
            if (shouldResend) {
              await resendVerification(response.data.email || email);
            }
          } else {
            toast.error(response.data.message || 'Login failed');
          }
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      if (error.response) {
        const errorMessage =
          error.response.data?.message || 'Authentication failed';
        toast.error(errorMessage);

        if (error.response.data?.emailVerified === false) {
          const shouldResend = window.confirm(
            'Your email is not verified. Would you like to resend the verification email?'
          );
          if (shouldResend) {
            await resendVerification(error.response.data.email || email);
          }
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Resend verification email function
  const resendVerification = async (userEmail) => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/resend-verification`, {
        email: userEmail
      });

      if (response.data.success) {
        toast.success('Verification email sent! Please check your inbox.');
      } else {
        toast.error(response.data.message || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Resend verification error:', error);
      toast.error('Failed to resend verification email');
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Email verification status */}
      <div className='w-full'>
        {currentState === 'Sign Up' && (
          <div className='bg-blue-50 border border-blue-200 rounded p-3 mb-4'>
            <p className='text-blue-800 text-sm'>
              After registration, you'll need to verify your email address before you can log in.
            </p>
          </div>
        )}
        
        {currentState === 'Login' && (
          <div className='bg-yellow-50 border border-yellow-200 rounded p-3 mb-4'>
            <p className='text-yellow-800 text-sm'>
              Make sure your email is verified before logging in. Check your inbox for the verification link.
            </p>
          </div>
        )}
      </div>

      {currentState === 'Login' ? '' : 
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          type="text" 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name' 
          required 
        />
      }
      
      <input 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
        type="email" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required 
      />
      
      <input 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
        type="password" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required 
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState === 'Login' ? (
          <p className='cursor-pointer text-blue-600 hover:underline'>Forgot your password?</p>
        ) : (
          <p className='text-gray-600'>Password must be at least 8 characters with letters and numbers</p>
        )}
      </div>

      <button 
        type="submit"
        className={`bg-black text-white font-light px-8 py-2 mt-4 hover:bg-gray-800 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? (
          <span className='flex items-center gap-2'>
            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            {currentState === 'Login' ? 'Logging in...' : 'Creating Account...'}
          </span>
        ) : (
          currentState === 'Login' ? 'Sign In' : 'Sign Up'
        )}
      </button>

      {currentState === 'Login' ? 
        <p>Don't have an account? 
          <span 
            onClick={() => setCurrentState('Sign Up')} 
            className='text-blue-600 cursor-pointer hover:underline ml-1'
          >
            Create here
          </span>
        </p> 
        : 
        <p>Already have an account? 
          <span 
            onClick={() => setCurrentState('Login')} 
            className='text-blue-600 cursor-pointer hover:underline ml-1'
          >
            Login here
          </span>
        </p>
      }

      {/* Resend verification section */}
      {currentState === 'Login' && (
        <div className='w-full mt-4 pt-4 border-t border-gray-200'>
          <p className='text-center text-sm text-gray-600 mb-2'>
            Didn't receive verification email?
          </p>
          <button 
            type="button"
            onClick={() => {
              const userEmail = prompt('Enter your email address:');
              if (userEmail) {
                resendVerification(userEmail);
              }
            }}
            className='w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors text-sm'
          >
            Resend Verification Email
          </button>
        </div>
      )}
    </form>
  );
};

export default Login;