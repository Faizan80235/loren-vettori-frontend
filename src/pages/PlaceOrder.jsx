
// import React, { useContext, useState, useCallback } from 'react';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';
// import { ShopContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const PlaceOrder = () => {
//   const navigate = useNavigate();
//   const { backendUrl = 'http://localhost:5000', token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
//   const [method, setMethod] = useState('cod');
//   const [paypalProcessing, setPaypalProcessing] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: ''
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   // PayPal configuration
//   const paypalOptions = {
//     "client-id": "AW3ys3NMSkuGe-hiY4QCkY53kpqseDJIzsVF1OeFINXJe9vE0U1MQzFc4tvj00E-uE20H6cI_w_BQm4B",
//     currency: "USD",
//     intent: "capture"
//   };

//   // Validate form data
//   const validateForm = () => {
//     const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
//     for (let field of required) {
//       if (!formData[field]?.trim()) {
//         return false;
//       }
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       return false;
//     }
    
//     return true;
//   };

//   // Get order items with detailed logging
//   const getOrderItems = useCallback(() => {
//     console.log('=== GETTING ORDER ITEMS ===');
//     console.log('Cart items:', cartItems);
//     console.log('Products available:', products?.length || 0);
    
//     let orderItems = [];
//     Object.keys(cartItems).forEach((itemId) => {
//       console.log(`Processing item ID: ${itemId}`);
//       const product = products.find(product => product._id === itemId);
      
//       if (!product) {
//         console.error(`âŒ Product not found for ID: ${itemId}`);
//         return;
//       }
      
//       console.log(`âœ… Found product:`, {
//         id: product._id,
//         name: product.name,
//         price: product.price,
//         effectivePrice: product.effectivePrice
//       });

//       Object.keys(cartItems[itemId]).forEach((size) => {
//         if (cartItems[itemId][size] > 0) {
//           // Calculate price with detailed logging
//           let price = 0;
//           console.log(`Calculating price for ${product.name}:`);
          
//           if (product.effectivePrice) {
//             price = product.effectivePrice;
//             console.log(`  Using effectivePrice: ${price}`);
//           } else if (product.price && typeof product.price === 'object') {
//             if (product.price.discount > 0) {
//               price = product.price.discount;
//               console.log(`  Using discount price: ${price}`);
//             } else {
//               price = product.price.base || 0;
//               console.log(`  Using base price: ${price}`);
//             }
//           } else {
//             price = product.price || 0;
//             console.log(`  Using simple price: ${price}`);
//           }

//           const itemInfo = {
//             _id: itemId,
//             name: product.name,
//             price: price,
//             quantity: cartItems[itemId][size],
//             size: size,
//             image: product.images || product.image || [],
//             productId: itemId,
//             category: product.category || 'General',
//             brand: product.brand || '',
//             subcategory: product.subcategory || ''
//           };
          
//           console.log(`  Final item:`, itemInfo);
//           orderItems.push(itemInfo);
//         }
//       });
//     });
    
//     console.log('=== ORDER ITEMS COMPLETE ===');
//     console.log('Total items:', orderItems.length);
//     console.log('All items:', orderItems);
//     return orderItems;
//   }, [cartItems, products]);

//   // Enhanced PayPal create order with extensive debugging
//   const createPayPalOrder = async (data, actions) => {
//     console.log('ðŸš€ðŸš€ðŸš€ PAYPAL CREATE ORDER STARTED ðŸš€ðŸš€ðŸš€');
//     console.log('PayPal data:', data);
//     console.log('PayPal actions:', actions);
    
//     try {
//       // Form validation with detailed feedback
//       console.log('=== FORM VALIDATION ===');
//       const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
//       for (let field of required) {
//         console.log(`Checking ${field}:`, formData[field]);
//         if (!formData[field]?.trim()) {
//           console.error(`âŒ Missing field: ${field}`);
//           toast.error(`Please fill in ${field}`);
//           throw new Error(`Form validation failed: missing ${field}`);
//         }
//       }
//       console.log('âœ… Form validation passed');

//       // Token validation
//       console.log('=== TOKEN VALIDATION ===');
//       console.log('Token exists:', !!token);
//       console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'null');
//       if (!token) {
//         console.error('âŒ No authentication token');
//         toast.error('Please login to continue');
//         throw new Error('No authentication token');
//       }
//       console.log('âœ… Token validation passed');

//       setPaypalProcessing(true);
      
//       // Get order items with full debugging
//       console.log('=== ORDER ITEMS CALCULATION ===');
//       const orderItems = getOrderItems();
      
//       if (orderItems.length === 0) {
//         console.error('âŒ No order items found');
//         toast.error('Your cart is empty');
//         throw new Error('Cart is empty');
//       }

//       // Calculate amounts with detailed logging
//       console.log('=== AMOUNT CALCULATIONS ===');
//       const cartAmount = getCartAmount();
//       const deliveryFee = delivery_fee || 10;
//       const totalAmount = cartAmount + deliveryFee;
      
//       // Calculate from items for verification
//       const itemsSubtotal = orderItems.reduce((sum, item) => {
//         const itemTotal = item.price * item.quantity;
//         console.log(`Item: ${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}`);
//         return sum + itemTotal;
//       }, 0);
//       const itemsTotalWithDelivery = itemsSubtotal + deliveryFee;

//       console.log('ðŸ’° Cart amount (from getCartAmount):', cartAmount);
//       console.log('ðŸ’° Items subtotal (calculated):', itemsSubtotal);
//       console.log('ðŸ’° Delivery fee:', deliveryFee);
//       console.log('ðŸ’° Total (cart + delivery):', totalAmount);
//       console.log('ðŸ’° Total (items + delivery):', itemsTotalWithDelivery);
//       console.log('ðŸ’° Difference:', Math.abs(totalAmount - itemsTotalWithDelivery));

//       // Prepare request data
//       const requestData = {
//         items: orderItems,
//         amount: totalAmount,
//         address: formData
//       };

//       console.log('=== API REQUEST ===');
//       console.log('Backend URL:', backendUrl);
//       console.log('Request data:', JSON.stringify(requestData, null, 2));
//       console.log('Request headers:', {
//         'token': token ? token.substring(0, 20) + '...' : 'null',
//         'Content-Type': 'application/json'
//       });

//       // Make API call with full error logging
//       const response = await axios.post(`${backendUrl}/api/order/paypal/create`, requestData, { 
//         headers: { 
//           'token': token,
//           'Content-Type': 'application/json'
//         } 
//       });

//       console.log('=== API RESPONSE ===');
//       console.log('Response status:', response.status);
//       console.log('Response data:', response.data);

//       if (response.data && response.data.success) {
//         console.log('âœ…âœ…âœ… ORDER CREATED SUCCESSFULLY âœ…âœ…âœ…');
//         console.log('PayPal Order ID:', response.data.orderId);
//         toast.success('PayPal order created successfully!');
//         return response.data.orderId;
//       } else {
//         console.error('âŒâŒâŒ SERVER RETURNED ERROR âŒâŒâŒ');
//         console.error('Error message:', response.data?.message);
//         console.error('Full response:', response.data);
//         const errorMsg = response.data?.message || 'Server returned unsuccessful response';
//         toast.error(errorMsg);
//         throw new Error(errorMsg);
//       }

//     } catch (error) {
//       console.error('âŒâŒâŒ PAYPAL CREATE ORDER FAILED âŒâŒâŒ');
//       console.error('Error type:', error.constructor.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
      
//       if (error.response) {
//         console.error('=== HTTP ERROR RESPONSE ===');
//         console.error('Status:', error.response.status);
//         console.error('Status text:', error.response.statusText);
//         console.error('Headers:', error.response.headers);
//         console.error('Data:', error.response.data);
        
//         // Handle specific HTTP errors
//         if (error.response.status === 401) {
//           console.log('ðŸ” Authentication error - redirecting to login');
//           toast.error('Please login again');
//           localStorage.removeItem('token');
//           navigate('/login');
//         } else if (error.response.status === 400) {
//           const message = error.response.data?.message || 'Invalid request data';
//           toast.error(message);
//         } else if (error.response.status === 500) {
//           toast.error('Server error - please check backend logs');
//         } else {
//           toast.error(`HTTP ${error.response.status}: ${error.response.statusText}`);
//         }
//       } else if (error.request) {
//         console.error('=== NETWORK ERROR ===');
//         console.error('Request made but no response received');
//         console.error('Request:', error.request);
//         toast.error('Network error - cannot reach server');
//       } else {
//         console.error('=== OTHER ERROR ===');
//         toast.error(error.message || 'Unknown error occurred');
//       }
      
//       throw new Error(error.message || 'Failed to create PayPal order');
//     } finally {
//       console.log('ðŸ”„ Cleaning up PayPal processing state');
//       setPaypalProcessing(false);
//     }
//   };

//   // Other handlers remain the same but with better logging
//   const onPayPalApprove = useCallback(async (data, actions) => {
//     console.log('ðŸ’³ PayPal payment approved:', data);
//     try {
//       setPaypalProcessing(true);
//       const response = await axios.post(`${backendUrl}/api/order/paypal/capture`, {
//         orderId: data.orderID
//       }, { 
//         headers: { 
//           'token': token,
//           'Content-Type': 'application/json'
//         } 
//       });

//       console.log('Capture response:', response.data);
//       if (response.data.success) {
//         setCartItems({});
//         toast.success('Payment successful! Your order has been placed.');
//         navigate('/orders');
//       } else {
//         throw new Error(response.data.message || 'Payment capture failed');
//       }
//     } catch (error) {
//       console.error('PayPal capture error:', error);
//       toast.error(error.response?.data?.message || error.message || 'Payment failed');
//     } finally {
//       setPaypalProcessing(false);
//     }
//   }, [backendUrl, token, setCartItems, navigate]);

//   const onPayPalError = useCallback((error) => {
//     console.error('PayPal SDK error:', error);
//     toast.error('PayPal payment error occurred');
//     setPaypalProcessing(false);
//   }, []);

//   const onPayPalCancel = useCallback(async (data) => {
//     console.log('PayPal payment cancelled:', data);
//     toast.info('PayPal payment was cancelled');
//     setPaypalProcessing(false);
//   }, []);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     try {
//       const orderItems = getOrderItems();
//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee
//       };

//       switch (method) {
//         case 'cod':
//           const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { 
//             headers: { 'token': token }
//           });
//           if (response.data.success) {
//             setCartItems({});
//             navigate('/orders');
//             toast.success('Order placed successfully!');
//           } else {
//             toast.error(response.data.message);
//           }
//           break;
//         case 'paypal':
//           toast.info('Please use the PayPal button below');
//           break;
//         default:
//           toast.error('Please select a payment method');
//           break;
//       }
//     } catch (error) {
//       console.error('Order placement error:', error);
//       toast.error(error.response?.data?.message || error.message || 'Order placement failed');
//     }
//   };

//   const isFormValid = validateForm();



//   return (
//     <div className="p-4">
     

//       <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//         <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//           <div className='text-xl sm:text-2xl my-3'>
//             <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//           </div>
//           <div className='flex gap-3'>
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='firstName' 
//               value={formData.firstName} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='First name' 
//             />
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='lastName' 
//               value={formData.lastName} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='Last name' 
//             />
//           </div>
//           <input 
//             required 
//             onChange={onChangeHandler} 
//             name='email' 
//             value={formData.email} 
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//             type="email" 
//             placeholder='Email address' 
//           />
//           <input 
//             required 
//             onChange={onChangeHandler} 
//             name='street' 
//             value={formData.street} 
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//             type="text" 
//             placeholder='Street' 
//           />
//           <div className='flex gap-3'>
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='city' 
//               value={formData.city} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='City' 
//             />
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='state' 
//               value={formData.state} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='State' 
//             />
//           </div>
//           <div className='flex gap-3'>
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='zipcode' 
//               value={formData.zipcode} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='Zipcode' 
//             />
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='country' 
//               value={formData.country} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='Country' 
//             />
//           </div>
//           <input 
//             required 
//             onChange={onChangeHandler} 
//             name='phone' 
//             value={formData.phone} 
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//             type="tel" 
//             placeholder='Phone' 
//           />
//         </div>
        
//         <div className='mt-8'>
//           <div className='mt-8 min-w-80'>
//             <CartTotal />
//           </div>
//           <div className='mt-12'>
//             <Title text1={'PAYMENT'} text2={'METHOD'} />
//             <div className='flex gap-3 flex-col lg:flex-row'>
//               <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                 <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//                 <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//               </div>
//               <div onClick={() => setMethod('paypal')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                 <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''}`}></p>
//                 <p className='text-gray-500 text-sm font-medium mx-4'>PAYPAL</p>
//               </div>
//             </div>
            
//             <div className='w-full text-end mt-8'>
//               {method === 'paypal' ? (
//                 <div className="paypal-button-container">
//                   {!token && (
//                     <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
//                       <p className="text-red-600 text-sm">Please login to continue with PayPal payment</p>
//                     </div>
//                   )}
//                   {token && !isFormValid && (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
//                       <p className="text-yellow-600 text-sm">Please fill in all delivery information before proceeding with PayPal</p>
//                     </div>
//                   )}
                  
//                   {token && isFormValid && (
//                     <div className="border rounded p-4">
//                       <PayPalScriptProvider options={paypalOptions}>
//                         <PayPalButtons
//                           style={{
//                             layout: 'horizontal',
//                             color: 'blue',
//                             shape: 'rect',
//                             label: 'paypal',
//                             height: 45
//                           }}
//                           createOrder={createPayPalOrder}
//                           onApprove={onPayPalApprove}
//                           onError={onPayPalError}
//                           onCancel={onPayPalCancel}
//                           disabled={paypalProcessing}
//                         />
//                       </PayPalScriptProvider>
//                     </div>
//                   )}
                  
//                   {paypalProcessing && (
//                     <div className="text-center mt-2 p-2 bg-blue-50 rounded">
//                       <div className="text-blue-600 text-sm">
//                         Processing payment, please wait...
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <button 
//                   type='submit' 
//                   className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors'
//                   disabled={!isFormValid}
//                 >
//                   PLACE ORDER
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PlaceOrder

// import React, { useContext, useState, useCallback } from 'react';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import { assets } from '../assets/assets';
// import { ShopContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const PlaceOrder = () => {
//   const navigate = useNavigate();
  
//   // FIXED: Changed setCartItems to clearCart
//   const { 
//     backendUrl = 'http://localhost:5000', 
//     token, 
//     cartItems, 
//     clearCart,  // ⬅️ Use clearCart instead of setCartItems
//     getCartAmount, 
//     delivery_fee, 
//     products 
//   } = useContext(ShopContext);
  
//   const [method, setMethod] = useState('cod');
//   const [paypalProcessing, setPaypalProcessing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: ''
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setFormData((data) => ({ ...data, [name]: value }));
//   };

//   // PayPal configuration
//   const paypalOptions = {
//     "client-id": "Ac-DWF-bxBr4xAgc9FiO0RjKmTxngvQZU54FTGKTuCSsqF19uXL5pkrDm3mURB6r7qZb86R7My5FdC_J",
//     currency: "USD",
//     intent: "capture"
//   };

//   // Validate form data
//   const validateForm = () => {
//     const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
//     for (let field of required) {
//       if (!formData[field]?.trim()) {
//         return false;
//       }
//     }
    
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       return false;
//     }
    
//     return true;
//   };

//   // Get order items with detailed logging
//   const getOrderItems = useCallback(() => {
//     console.log('=== GETTING ORDER ITEMS ===');
//     console.log('Cart items:', cartItems);
//     console.log('Products available:', products?.length || 0);
    
//     let orderItems = [];
//     Object.keys(cartItems).forEach((itemId) => {
//       console.log(`Processing item ID: ${itemId}`);
//       const product = products.find(product => product._id === itemId);
      
//       if (!product) {
//         console.error(`❌ Product not found for ID: ${itemId}`);
//         return;
//       }
      
//       console.log(`✅ Found product:`, {
//         id: product._id,
//         name: product.name,
//         price: product.price,
//         effectivePrice: product.effectivePrice
//       });

//       Object.keys(cartItems[itemId]).forEach((size) => {
//         if (cartItems[itemId][size] > 0) {
//           // Calculate price with detailed logging
//           let price = 0;
//           console.log(`Calculating price for ${product.name}:`);
          
//           if (product.effectivePrice) {
//             price = product.effectivePrice;
//             console.log(`  Using effectivePrice: ${price}`);
//           } else if (product.price && typeof product.price === 'object') {
//             if (product.price.discount > 0) {
//               price = product.price.discount;
//               console.log(`  Using discount price: ${price}`);
//             } else {
//               price = product.price.base || 0;
//               console.log(`  Using base price: ${price}`);
//             }
//           } else {
//             price = product.price || 0;
//             console.log(`  Using simple price: ${price}`);
//           }

//           const itemInfo = {
//             _id: itemId,
//             name: product.name,
//             price: price,
//             quantity: cartItems[itemId][size],
//             size: size,
//             image: product.images || product.image || [],
//             productId: itemId,
//             category: product.category || 'General',
//             brand: product.brand || '',
//             subcategory: product.subcategory || ''
//           };
          
//           console.log(`  Final item:`, itemInfo);
//           orderItems.push(itemInfo);
//         }
//       });
//     });
    
//     console.log('=== ORDER ITEMS COMPLETE ===');
//     console.log('Total items:', orderItems.length);
//     console.log('All items:', orderItems);
//     return orderItems;
//   }, [cartItems, products]);

//   // Enhanced PayPal create order with extensive debugging
//   const createPayPalOrder = async (data, actions) => {
//     console.log('🚀🚀🚀 PAYPAL CREATE ORDER STARTED 🚀🚀🚀');
//     console.log('PayPal data:', data);
//     console.log('PayPal actions:', actions);
    
//     try {
//       // Form validation with detailed feedback
//       console.log('=== FORM VALIDATION ===');
//       const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
//       for (let field of required) {
//         console.log(`Checking ${field}:`, formData[field]);
//         if (!formData[field]?.trim()) {
//           console.error(`❌ Missing field: ${field}`);
//           toast.error(`Please fill in ${field}`);
//           throw new Error(`Form validation failed: missing ${field}`);
//         }
//       }
//       console.log('✅ Form validation passed');

//       // Token validation
//       console.log('=== TOKEN VALIDATION ===');
//       console.log('Token exists:', !!token);
//       console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'null');
//       if (!token) {
//         console.error('❌ No authentication token');
//         toast.error('Please login to continue');
//         throw new Error('No authentication token');
//       }
//       console.log('✅ Token validation passed');

//       setPaypalProcessing(true);
      
//       // Get order items with full debugging
//       console.log('=== ORDER ITEMS CALCULATION ===');
//       const orderItems = getOrderItems();
      
//       if (orderItems.length === 0) {
//         console.error('❌ No order items found');
//         toast.error('Your cart is empty');
//         throw new Error('Cart is empty');
//       }

//       // Calculate amounts with detailed logging
//       console.log('=== AMOUNT CALCULATIONS ===');
//       const cartAmount = getCartAmount();
//       const deliveryFee = delivery_fee || 10;
//       const totalAmount = cartAmount + deliveryFee;
      
//       // Calculate from items for verification
//       const itemsSubtotal = orderItems.reduce((sum, item) => {
//         const itemTotal = item.price * item.quantity;
//         console.log(`Item: ${item.name} - $${item.price} x ${item.quantity} = $${itemTotal}`);
//         return sum + itemTotal;
//       }, 0);
//       const itemsTotalWithDelivery = itemsSubtotal + deliveryFee;

//       console.log('💰 Cart amount (from getCartAmount):', cartAmount);
//       console.log('💰 Items subtotal (calculated):', itemsSubtotal);
//       console.log('💰 Delivery fee:', deliveryFee);
//       console.log('💰 Total (cart + delivery):', totalAmount);
//       console.log('💰 Total (items + delivery):', itemsTotalWithDelivery);
//       console.log('💰 Difference:', Math.abs(totalAmount - itemsTotalWithDelivery));

//       // Prepare request data
//       const requestData = {
//         items: orderItems,
//         amount: totalAmount,
//         address: formData
//       };

//       console.log('=== API REQUEST ===');
//       console.log('Backend URL:', backendUrl);
//       console.log('Request data:', JSON.stringify(requestData, null, 2));
//       console.log('Request headers:', {
//         'token': token ? token.substring(0, 20) + '...' : 'null',
//         'Content-Type': 'application/json'
//       });

//       // Make API call with full error logging
//       const response = await axios.post(`${backendUrl}/api/order/paypal/create`, requestData, { 
//         headers: { 
//           'token': token,
//           'Content-Type': 'application/json'
//         } 
//       });

//       console.log('=== API RESPONSE ===');
//       console.log('Response status:', response.status);
//       console.log('Response data:', response.data);

//       if (response.data && response.data.success) {
//         console.log('✅✅✅ ORDER CREATED SUCCESSFULLY ✅✅✅');
//         console.log('PayPal Order ID:', response.data.orderId);
//         toast.success('PayPal order created successfully!');
//         return response.data.orderId;
//       } else {
//         console.error('❌❌❌ SERVER RETURNED ERROR ❌❌❌');
//         console.error('Error message:', response.data?.message);
//         console.error('Full response:', response.data);
//         const errorMsg = response.data?.message || 'Server returned unsuccessful response';
//         toast.error(errorMsg);
//         throw new Error(errorMsg);
//       }
//     } catch (error) {
//       console.error('❌❌❌ PAYPAL CREATE ORDER FAILED ❌❌❌');
//       console.error('Error type:', error.constructor.name);
//       console.error('Error message:', error.message);
//       console.error('Error stack:', error.stack);
      
//       if (error.response) {
//         console.error('=== HTTP ERROR RESPONSE ===');
//         console.error('Status:', error.response.status);
//         console.error('Status text:', error.response.statusText);
//         console.error('Headers:', error.response.headers);
//         console.error('Data:', error.response.data);
        
//         // Handle specific HTTP errors
//         if (error.response.status === 401) {
//           console.log('🔒 Authentication error - redirecting to login');
//           toast.error('Please login again');
//           localStorage.removeItem('token');
//           navigate('/login');
//         } else if (error.response.status === 400) {
//           const message = error.response.data?.message || 'Invalid request data';
//           toast.error(message);
//         } else if (error.response.status === 500) {
//           toast.error('Server error - please check backend logs');
//         } else {
//           toast.error(`HTTP ${error.response.status}: ${error.response.statusText}`);
//         }
//       } else if (error.request) {
//         console.error('=== NETWORK ERROR ===');
//         console.error('Request made but no response received');
//         console.error('Request:', error.request);
//         toast.error('Network error - cannot reach server');
//       } else {
//         console.error('=== OTHER ERROR ===');
//         toast.error(error.message || 'Unknown error occurred');
//       }
      
//       throw new Error(error.message || 'Failed to create PayPal order');
//     } finally {
//       console.log('🔄 Cleaning up PayPal processing state');
//       setPaypalProcessing(false);
//     }
//   };

//   // FIXED: Updated to use clearCart
//   const onPayPalApprove = useCallback(async (data, actions) => {
//     console.log('💳 PayPal payment approved:', data);
//     try {
//       setPaypalProcessing(true);
//       const response = await axios.post(`${backendUrl}/api/order/paypal/capture`, {
//         orderId: data.orderID
//       }, { 
//         headers: { 
//           'token': token,
//           'Content-Type': 'application/json'
//         } 
//       });
      
//       console.log('Capture response:', response.data);
      
//       if (response.data.success) {
//         clearCart();  // ⬅️ FIXED: Use clearCart() instead of setCartItems({})
//         toast.success('Payment successful! Your order has been placed.');
//         navigate('/orders');
//       } else {
//         throw new Error(response.data.message || 'Payment capture failed');
//       }
//     } catch (error) {
//       console.error('PayPal capture error:', error);
//       toast.error(error.response?.data?.message || error.message || 'Payment failed');
//     } finally {
//       setPaypalProcessing(false);
//     }
//   }, [backendUrl, token, clearCart, navigate]);  // ⬅️ FIXED: Updated dependency

//   const onPayPalError = useCallback((error) => {
//     console.error('PayPal SDK error:', error);
//     toast.error('PayPal payment error occurred');
//     setPaypalProcessing(false);
//   }, []);

//   const onPayPalCancel = useCallback(async (data) => {
//     console.log('PayPal payment cancelled:', data);
//     toast.info('PayPal payment was cancelled');
//     setPaypalProcessing(false);
//   }, []);

//   // FIXED: Updated to use clearCart
//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
    
//     if (!validateForm()) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     try {
//       const orderItems = getOrderItems();
//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: getCartAmount() + delivery_fee
//       };

//       switch (method) {
//         case 'cod':
//           const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { 
//             headers: { 'token': token }
//           });
//           if (response.data.success) {
//             clearCart();  // ⬅️ FIXED: Use clearCart() instead of setCartItems({})
//             navigate('/orders');
//             toast.success('Order placed successfully!');
//           } else {
//             toast.error(response.data.message);
//           }
//           break;

//         case 'paypal':
//           toast.info('Please use the PayPal button below');
//           break;

//         default:
//           toast.error('Please select a payment method');
//           break;
//       }
//     } catch (error) {
//       console.error('Order placement error:', error);
//       toast.error(error.response?.data?.message || error.message || 'Order placement failed');
//     }
//   };

//   const isFormValid = validateForm();

//   return (
//     <div className="p-4">
//       <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//         <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//           <div className='text-xl sm:text-2xl my-3'>
//             <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//           </div>
//           <div className='flex gap-3'>
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='firstName' 
//               value={formData.firstName} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='First name' 
//             />
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='lastName' 
//               value={formData.lastName} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='Last name' 
//             />
//           </div>
//           <input 
//             required 
//             onChange={onChangeHandler} 
//             name='email' 
//             value={formData.email} 
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//             type="email" 
//             placeholder='Email address' 
//           />
//           <input 
//             required 
//             onChange={onChangeHandler} 
//             name='street' 
//             value={formData.street} 
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//             type="text" 
//             placeholder='Street' 
//           />
//           <div className='flex gap-3'>
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='city' 
//               value={formData.city} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='City' 
//             />
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='state' 
//               value={formData.state} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='State' 
//             />
//           </div>
//           <div className='flex gap-3'>
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='zipcode' 
//               value={formData.zipcode} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='Zipcode' 
//             />
//             <input 
//               required 
//               onChange={onChangeHandler} 
//               name='country' 
//               value={formData.country} 
//               className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//               type="text" 
//               placeholder='Country' 
//             />
//           </div>
//           <input 
//             required 
//             onChange={onChangeHandler} 
//             name='phone' 
//             value={formData.phone} 
//             className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
//             type="tel" 
//             placeholder='Phone' 
//           />
//         </div>
        
//         <div className='mt-8'>
//           <div className='mt-8 min-w-80'>
//             <CartTotal />
//           </div>
//           <div className='mt-12'>
//             <Title text1={'PAYMENT'} text2={'METHOD'} />
//             <div className='flex gap-3 flex-col lg:flex-row'>
//               <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                 <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//                 <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//               </div>
//               <div onClick={() => setMethod('paypal')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                 <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''}`}></p>
//                 <p className='text-gray-500 text-sm font-medium mx-4'>PAYPAL</p>
//               </div>
//             </div>
            
//             <div className='w-full text-end mt-8'>
//               {method === 'paypal' ? (
//                 <div className="paypal-button-container">
//                   {!token && (
//                     <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
//                       <p className="text-red-600 text-sm">Please login to continue with PayPal payment</p>
//                     </div>
//                   )}
//                   {token && !isFormValid && (
//                     <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
//                       <p className="text-yellow-600 text-sm">Please fill in all delivery information before proceeding with PayPal</p>
//                     </div>
//                   )}
                  
//                   {token && isFormValid && (
//                     <div className="border rounded p-4">
//                       <PayPalScriptProvider options={paypalOptions}>
//                         <PayPalButtons
//                           style={{
//                             layout: 'horizontal',
//                             color: 'blue',
//                             shape: 'rect',
//                             label: 'paypal',
//                             height: 45
//                           }}
//                           createOrder={createPayPalOrder}
//                           onApprove={onPayPalApprove}
//                           onError={onPayPalError}
//                           onCancel={onPayPalCancel}
//                           disabled={paypalProcessing}
//                         />
//                       </PayPalScriptProvider>
//                     </div>
//                   )}
                  
//                   {paypalProcessing && (
//                     <div className="text-center mt-2 p-2 bg-blue-50 rounded">
//                       <div className="text-blue-600 text-sm">
//                         Processing payment, please wait...
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <button 
//                   type='submit' 
//                   className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors'
//                   disabled={!isFormValid}
//                 >
//                   PLACE ORDER
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useState, useCallback } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PlaceOrder = () => {
  const navigate = useNavigate();
  
  // FIXED: Changed setCartItems to clearCart
  const { 
    backendUrl = 'http://localhost:5000', 
    token, 
    cartItems, 
    clearCart,  // ⬅️ Use clearCart instead of setCartItems
    getCartAmount, 
    delivery_fee, 
    products 
  } = useContext(ShopContext);
  
  const [method, setMethod] = useState('cod');
  const [paypalProcessing, setPaypalProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // PayPal configuration - UPDATED CLIENT ID
  const paypalOptions = {
    "client-id": "Ac-DWF-bxBr4xAgc9FiO0RjKmTxngvQZU54FTGKTuCSsqF19uXL5pkrDm3mURB6r7qZb86R7My5FdC_J",
    currency: "USD",
    intent: "capture"
  };

  // Validate form data
  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
    for (let field of required) {
      if (!formData[field]?.trim()) {
        return false;
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }
    
    return true;
  };

  // Get order items with detailed logging
  const getOrderItems = useCallback(() => {
    console.log('=== GETTING ORDER ITEMS ===');
    console.log('Cart items:', cartItems);
    console.log('Products available:', products?.length || 0);
    
    let orderItems = [];
    Object.keys(cartItems).forEach((itemId) => {
      console.log(`Processing item ID: ${itemId}`);
      const product = products.find(product => product._id === itemId);
      
      if (!product) {
        console.error(`❌ Product not found for ID: ${itemId}`);
        return;
      }
      
      console.log(`✅ Found product:`, {
        id: product._id,
        name: product.name,
        price: product.price,
        effectivePrice: product.effectivePrice
      });

      Object.keys(cartItems[itemId]).forEach((size) => {
        if (cartItems[itemId][size] > 0) {
          // Calculate price with detailed logging
          let price = 0;
          console.log(`Calculating price for ${product.name}:`);
          
          if (product.effectivePrice) {
            price = product.effectivePrice;
            console.log(`  Using effectivePrice: ${price}`);
          } else if (product.price && typeof product.price === 'object') {
            if (product.price.discount > 0) {
              price = product.price.discount;
              console.log(`  Using discount price: ${price}`);
            } else {
              price = product.price.base || 0;
              console.log(`  Using base price: ${price}`);
            }
          } else {
            price = product.price || 0;
            console.log(`  Using simple price: ${price}`);
          }

          const itemInfo = {
            _id: itemId,
            name: product.name,
            price: price,
            quantity: cartItems[itemId][size],
            size: size,
            image: product.images || product.image || [],
            productId: itemId,
            category: product.category || 'General',
            brand: product.brand || '',
            subcategory: product.subcategory || ''
          };
          
          console.log(`  Final item:`, itemInfo);
          orderItems.push(itemInfo);
        }
      });
    });
    
    console.log('=== ORDER ITEMS COMPLETE ===');
    console.log('Total items:', orderItems.length);
    console.log('All items:', orderItems);
    return orderItems;
  }, [cartItems, products]);

  // Enhanced PayPal create order - USING PAYPAL SDK DIRECTLY
  const createPayPalOrder = async (data, actions) => {
    console.log('🚀🚀🚀 PAYPAL CREATE ORDER STARTED 🚀🚀🚀');
    
    try {
      // Form validation
      console.log('=== FORM VALIDATION ===');
      const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
      for (let field of required) {
        if (!formData[field]?.trim()) {
          console.error(`❌ Missing field: ${field}`);
          toast.error(`Please fill in ${field}`);
          throw new Error(`Form validation failed: missing ${field}`);
        }
      }
      console.log('✅ Form validation passed');

      // Token validation
      if (!token) {
        console.error('❌ No authentication token');
        toast.error('Please login to continue');
        throw new Error('No authentication token');
      }

      setPaypalProcessing(true);
      
      // Get order items
      const orderItems = getOrderItems();
      
      if (orderItems.length === 0) {
        console.error('❌ No order items found');
        toast.error('Your cart is empty');
        throw new Error('Cart is empty');
      }

      // Calculate amounts
      const cartAmount = getCartAmount();
      const deliveryFee = delivery_fee || 10;
      const totalAmount = cartAmount + deliveryFee;

      console.log('💰 Total amount:', totalAmount);

      // Create PayPal order using PayPal SDK actions
      // This creates a REAL PayPal order ID
      const paypalOrderId = await actions.order.create({
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: totalAmount.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: cartAmount.toFixed(2)
              },
              shipping: {
                currency_code: 'USD',
                value: deliveryFee.toFixed(2)
              }
            }
          },
          items: orderItems.map(item => ({
            name: item.name.substring(0, 127),
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2)
            },
            quantity: item.quantity.toString(),
            category: 'PHYSICAL_GOODS'
          }))
        }]
      });

      console.log('✅ PayPal SDK Order Created:', paypalOrderId);

      // Now save to backend with REAL PayPal order ID
      try {
        const requestData = {
          items: orderItems,
          amount: totalAmount,
          address: formData,
          paypalOrderId: paypalOrderId  // Send real PayPal ID
        };

        const response = await axios.post(
          `${backendUrl}/api/order/paypal/save`, 
          requestData, 
          { 
            headers: { 
              'token': token,
              'Content-Type': 'application/json'
            } 
          }
        );

        if (response.data && response.data.success) {
          console.log('✅ Order saved to database');
        } else {
          console.warn('⚠️ Failed to save order to database:', response.data?.message);
        }
      } catch (saveError) {
        console.error('❌ Error saving to database:', saveError);
        // Don't throw - PayPal order is already created
      }

      toast.success('PayPal order created successfully!');
      return paypalOrderId;  // Return REAL PayPal order ID

    } catch (error) {
      console.error('❌ PAYPAL CREATE ORDER FAILED:', error);
      toast.error(error.message || 'Failed to create PayPal order');
      throw error;
    } finally {
      setPaypalProcessing(false);
    }
  };

  // FIXED: Updated to use clearCart
  const onPayPalApprove = useCallback(async (data, actions) => {
    console.log('💳 PayPal payment approved:', data);
    try {
      setPaypalProcessing(true);
      const response = await axios.post(`${backendUrl}/api/order/paypal/capture`, {
        orderId: data.orderID
      }, { 
        headers: { 
          'token': token,
          'Content-Type': 'application/json'
        } 
      });
      
      console.log('Capture response:', response.data);
      
      if (response.data.success) {
        clearCart();  // ⬅️ FIXED: Use clearCart() instead of setCartItems({})
        toast.success('Payment successful! Your order has been placed.');
        navigate('/orders');
      } else {
        throw new Error(response.data.message || 'Payment capture failed');
      }
    } catch (error) {
      console.error('PayPal capture error:', error);
      toast.error(error.response?.data?.message || error.message || 'Payment failed');
    } finally {
      setPaypalProcessing(false);
    }
  }, [backendUrl, token, clearCart, navigate]);  // ⬅️ FIXED: Updated dependency

  const onPayPalError = useCallback((error) => {
    console.error('PayPal SDK error:', error);
    toast.error('PayPal payment error occurred');
    setPaypalProcessing(false);
  }, []);

  const onPayPalCancel = useCallback(async (data) => {
    console.log('PayPal payment cancelled:', data);
    toast.info('PayPal payment was cancelled');
    setPaypalProcessing(false);
  }, []);

  // FIXED: Updated to use clearCart
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const orderItems = getOrderItems();
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod':
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { 
            headers: { 'token': token }
          });
          if (response.data.success) {
            clearCart();  // ⬅️ FIXED: Use clearCart() instead of setCartItems({})
            navigate('/orders');
            toast.success('Order placed successfully!');
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'paypal':
          toast.info('Please use the PayPal button below');
          break;

        default:
          toast.error('Please select a payment method');
          break;
      }
    } catch (error) {
      console.error('Order placement error:', error);
      toast.error(error.response?.data?.message || error.message || 'Order placement failed');
    }
  };

  const isFormValid = validateForm();

  return (
    <div className="p-4">
      <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
        <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>
          <div className='flex gap-3'>
            <input 
              required 
              onChange={onChangeHandler} 
              name='firstName' 
              value={formData.firstName} 
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
              type="text" 
              placeholder='First name' 
            />
            <input 
              required 
              onChange={onChangeHandler} 
              name='lastName' 
              value={formData.lastName} 
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
              type="text" 
              placeholder='Last name' 
            />
          </div>
          <input 
            required 
            onChange={onChangeHandler} 
            name='email' 
            value={formData.email} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="email" 
            placeholder='Email address' 
          />
          <input 
            required 
            onChange={onChangeHandler} 
            name='street' 
            value={formData.street} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Street' 
          />
          <div className='flex gap-3'>
            <input 
              required 
              onChange={onChangeHandler} 
              name='city' 
              value={formData.city} 
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
              type="text" 
              placeholder='City' 
            />
            <input 
              required 
              onChange={onChangeHandler} 
              name='state' 
              value={formData.state} 
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
              type="text" 
              placeholder='State' 
            />
          </div>
          <div className='flex gap-3'>
            <input 
              required 
              onChange={onChangeHandler} 
              name='zipcode' 
              value={formData.zipcode} 
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
              type="text" 
              placeholder='Zipcode' 
            />
            <input 
              required 
              onChange={onChangeHandler} 
              name='country' 
              value={formData.country} 
              className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
              type="text" 
              placeholder='Country' 
            />
          </div>
          <input 
            required 
            onChange={onChangeHandler} 
            name='phone' 
            value={formData.phone} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="tel" 
            placeholder='Phone' 
          />
        </div>
        
        <div className='mt-8'>
          <div className='mt-8 min-w-80'>
            <CartTotal />
          </div>
          <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className='flex gap-3 flex-col lg:flex-row'>
              <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
              </div>
              <div onClick={() => setMethod('paypal')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''}`}></p>
                <p className='text-gray-500 text-sm font-medium mx-4'>PAYPAL</p>
              </div>
            </div>
            
            <div className='w-full text-end mt-8'>
              {method === 'paypal' ? (
                <div className="paypal-button-container">
                  {!token && (
                    <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                      <p className="text-red-600 text-sm">Please login to continue with PayPal payment</p>
                    </div>
                  )}
                  {token && !isFormValid && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                      <p className="text-yellow-600 text-sm">Please fill in all delivery information before proceeding with PayPal</p>
                    </div>
                  )}
                  
                  {token && isFormValid && (
                    <div className="border rounded p-4">
                      <PayPalScriptProvider options={paypalOptions}>
                        <PayPalButtons
                          style={{
                            layout: 'horizontal',
                            color: 'blue',
                            shape: 'rect',
                            label: 'paypal',
                            height: 45
                          }}
                          createOrder={createPayPalOrder}
                          onApprove={onPayPalApprove}
                          onError={onPayPalError}
                          onCancel={onPayPalCancel}
                          disabled={paypalProcessing}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                  
                  {paypalProcessing && (
                    <div className="text-center mt-2 p-2 bg-blue-50 rounded">
                      <div className="text-blue-600 text-sm">
                        Processing payment, please wait...
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  type='submit' 
                  className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors'
                  disabled={!isFormValid}
                >
                  PLACE ORDER
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;