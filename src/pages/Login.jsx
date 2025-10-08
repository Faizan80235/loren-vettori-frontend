// import React, { useState, useEffect } from 'react';
// import { useSurvey } from '../context/Surveycontext';
// import { useAnalytics } from '../context/Analyticscontext'; // ADD THIS
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [currentState, setCurrentState] = useState('Login');
//   const { triggerSurveyCheck } = useSurvey();
//   const { trackLogin, trackRegistration } = useAnalytics(); // ADD THIS
//   const navigate = useNavigate();
  
//   // Form states
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
  
//   // Token state - separate variable
//   const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  
//   // Backend URL
//   const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

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

//           // 🔥 TRACK REGISTRATION - ADD THIS
//           if (response.data.user) {
//             trackRegistration(
//               response.data.user._id || response.data.user.id || 'new-user',
//               email,
//               'email'
//             );
//             console.log('✅ Registration tracked for:', email);
//           }

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
//             // Get admin token in separate variable
//             const adminToken = adminResp.data.token;
            
//             // Save to localStorage
//             localStorage.setItem('token', adminToken);
            
//             // Update state
//             setAuthToken(adminToken);

//             // 🔥 TRACK ADMIN LOGIN - ADD THIS
//             if (adminResp.data.user) {
//               trackLogin(
//                 adminResp.data.user._id || adminResp.data.user.id || 'admin',
//                 email,
//                 'admin_login'
//               );
//               console.log('✅ Admin login tracked for:', email);
//             }
            
//             toast.success('Admin login successful!');
//             navigate('/admin/dashboard');
//             setLoading(false);
//             return;
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
//           // Get user token in separate variable
//           const userToken = response.data.token;
          
//           // Save to localStorage
//           localStorage.setItem('token', userToken);
          
//           // Update state
//           setAuthToken(userToken);

//           // 🔥 TRACK USER LOGIN - ADD THIS
//           if (response.data.user) {
//             trackLogin(
//               response.data.user._id || response.data.user.id || 'user',
//               email,
//               'email'
//             );
//             console.log('✅ User login tracked for:', email);
//           }
          
//           toast.success('Login successful!');
          
//           // Trigger survey check after token is set
//           setTimeout(() => {
//             triggerSurveyCheck();
//           }, 500);
          
//           navigate('/');
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
//     if (authToken) {
//       navigate('/');
//     }
//   }, [authToken, navigate]);

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//       </div>

//       {/* Email verification status */}
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
import { useAnalytics } from '../context/Analyticscontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { triggerSurveyCheck } = useSurvey();
  const { trackLogin, trackRegistration, trackCustomEvent } = useAnalytics();
  const navigate = useNavigate();
  
  // Form states
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Token state
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || '');
  
  // Backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // ==========================================
  // TRAFFIC SOURCE DETECTION
  // ==========================================
  const getTrafficSource = () => {
    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    
    console.log('🔍 Detecting traffic source...');
    console.log('Referrer:', referrer);
    console.log('URL params:', params.toString());
    
    // Check URL parameters first (for campaign tracking)
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    
    if (utmSource) {
      console.log('✅ Campaign detected:', utmSource);
      return {
        source: utmSource,
        medium: utmMedium || 'unknown',
        campaign: utmCampaign || 'none',
        type: 'campaign'
      };
    }
    
    // Check referrer
    if (referrer) {
      try {
        const referrerUrl = new URL(referrer);
        const hostname = referrerUrl.hostname.toLowerCase();
        
        console.log('🌐 Checking referrer hostname:', hostname);
        
        // Social media detection
        if (hostname.includes('instagram.com')) {
          console.log('✅ Instagram detected');
          return { source: 'instagram', medium: 'social', campaign: 'organic', type: 'social' };
        }
        if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
          console.log('✅ Facebook detected');
          return { source: 'facebook', medium: 'social', campaign: 'organic', type: 'social' };
        }
        if (hostname.includes('twitter.com') || hostname.includes('t.co')) {
          console.log('✅ Twitter detected');
          return { source: 'twitter', medium: 'social', campaign: 'organic', type: 'social' };
        }
        if (hostname.includes('tiktok.com')) {
          console.log('✅ TikTok detected');
          return { source: 'tiktok', medium: 'social', campaign: 'organic', type: 'social' };
        }
        if (hostname.includes('youtube.com')) {
          console.log('✅ YouTube detected');
          return { source: 'youtube', medium: 'social', campaign: 'organic', type: 'social' };
        }
        if (hostname.includes('linkedin.com')) {
          console.log('✅ LinkedIn detected');
          return { source: 'linkedin', medium: 'social', campaign: 'organic', type: 'social' };
        }
        if (hostname.includes('pinterest.com')) {
          console.log('✅ Pinterest detected');
          return { source: 'pinterest', medium: 'social', campaign: 'organic', type: 'social' };
        }
        
        // Search engines
        if (hostname.includes('google.com')) {
          console.log('✅ Google search detected');
          return { source: 'google', medium: 'organic', campaign: 'seo', type: 'search' };
        }
        if (hostname.includes('bing.com')) {
          console.log('✅ Bing search detected');
          return { source: 'bing', medium: 'organic', campaign: 'seo', type: 'search' };
        }
        if (hostname.includes('yahoo.com')) {
          console.log('✅ Yahoo search detected');
          return { source: 'yahoo', medium: 'organic', campaign: 'seo', type: 'search' };
        }
        if (hostname.includes('duckduckgo.com')) {
          console.log('✅ DuckDuckGo detected');
          return { source: 'duckduckgo', medium: 'organic', campaign: 'seo', type: 'search' };
        }
        
        // Other referrer
        console.log('✅ External referral detected:', hostname);
        return { source: hostname, medium: 'referral', campaign: 'external', type: 'referral' };
      } catch (e) {
        console.error('Error parsing referrer:', e);
      }
    }
    
    // Direct traffic (no referrer)
    console.log('✅ Direct traffic detected');
    return { source: 'direct', medium: 'none', campaign: 'direct', type: 'direct' };
  };

  // ==========================================
  // GET DEVICE INFO
  // ==========================================
  const getDeviceInfo = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    let deviceType = 'desktop';
    if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      deviceType = 'tablet';
    }
    
    // Detect browser
    let browser = 'Unknown';
    if (userAgent.includes('chrome')) browser = 'Chrome';
    else if (userAgent.includes('safari')) browser = 'Safari';
    else if (userAgent.includes('firefox')) browser = 'Firefox';
    else if (userAgent.includes('edge')) browser = 'Edge';
    else if (userAgent.includes('opera')) browser = 'Opera';
    
    // Detect OS
    let os = 'Unknown';
    if (userAgent.includes('windows')) os = 'Windows';
    else if (userAgent.includes('mac')) os = 'MacOS';
    else if (userAgent.includes('linux')) os = 'Linux';
    else if (userAgent.includes('android')) os = 'Android';
    else if (userAgent.includes('ios') || userAgent.includes('iphone')) os = 'iOS';
    
    return {
      type: deviceType,
      browser: browser,
      os: os
    };
  };

  // ==========================================
  // TRACK ACTIVITY IN BACKEND DATABASE
  // ==========================================
  const trackActivityInBackend = async (userId, email, activityType) => {
    try {
      const trafficSource = getTrafficSource();
      const device = getDeviceInfo();
      
      console.log('📊 Tracking activity in backend:', {
        userId,
        email,
        activityType,
        source: trafficSource.source
      });
      
      await axios.post(`${backendUrl}/api/realtime-analytics/track`, {
        userId,
        email,
        activityType,
        trafficSource,
        device,
        metadata: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          screen: `${window.screen.width}x${window.screen.height}`
        }
      });
      
      console.log('✅ Activity tracked in backend database');
    } catch (error) {
      console.error('❌ Failed to track activity in backend:', error);
      // Don't throw error - tracking failure shouldn't stop login/registration
    }
  };

  // ==========================================
  // FORM SUBMIT HANDLER
  // ==========================================
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (currentState === 'Sign Up') {
        // ==========================================
        // REGISTRATION FLOW
        // ==========================================
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

          // Get traffic source
          const trafficSource = getTrafficSource();

          // Track in GA4
          if (response.data.user) {
            const userId = response.data.user._id || response.data.user.id || 'new-user';
            
            trackRegistration(userId, email, 'email');
            
            // Track custom event with source
            trackCustomEvent('user_registered', {
              user_id: userId,
              email: email,
              traffic_source: trafficSource.source,
              traffic_medium: trafficSource.medium,
              traffic_campaign: trafficSource.campaign,
              traffic_type: trafficSource.type,
              timestamp: new Date().toISOString()
            });
            
            // Track in backend database for immediate dashboard update
            await trackActivityInBackend(userId, email, 'registration');
            
            console.log('✅ Registration tracked everywhere');
          }

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
        // ==========================================
        // LOGIN FLOW - Check Admin First
        // ==========================================
        try {
          const adminResp = await axios.post(`${backendUrl}/api/user/admin`, { 
            email, 
            password 
          });

          if (adminResp.data?.success && adminResp.data?.token) {
            const adminToken = adminResp.data.token;
            
            localStorage.setItem('token', adminToken);
            setAuthToken(adminToken);

            // Get traffic source
            const trafficSource = getTrafficSource();

            // Track admin login
            if (adminResp.data.user) {
              const userId = adminResp.data.user._id || adminResp.data.user.id || 'admin';
              
              trackLogin(userId, email, 'admin_login');
              
              trackCustomEvent('admin_logged_in', {
                user_id: userId,
                email: email,
                traffic_source: trafficSource.source,
                traffic_medium: trafficSource.medium,
                timestamp: new Date().toISOString()
              });
              
              // Track in backend
              await trackActivityInBackend(userId, email, 'login');
              
              console.log('✅ Admin login tracked');
            }
            
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

        // ==========================================
        // NORMAL USER LOGIN
        // ==========================================
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          const userToken = response.data.token;
          
          localStorage.setItem('token', userToken);
          setAuthToken(userToken);

          // Get traffic source
          const trafficSource = getTrafficSource();

          // Track user login
          if (response.data.user) {
            const userId = response.data.user._id || response.data.user.id || 'user';
            
            trackLogin(userId, email, 'email');
            
            trackCustomEvent('user_logged_in', {
              user_id: userId,
              email: email,
              traffic_source: trafficSource.source,
              traffic_medium: trafficSource.medium,
              traffic_campaign: trafficSource.campaign,
              traffic_type: trafficSource.type,
              timestamp: new Date().toISOString()
            });
            
            // Track in backend database
            await trackActivityInBackend(userId, email, 'login');
            
            console.log('✅ User login tracked everywhere');
          }
          
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

  // ==========================================
  // RESEND VERIFICATION EMAIL
  // ==========================================
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

  // ==========================================
  // REDIRECT IF ALREADY LOGGED IN
  // ==========================================
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