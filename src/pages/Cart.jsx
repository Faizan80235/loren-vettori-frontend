
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import { assets } from '../assets/assets';
// import CartTotal from '../components/CartTotal';
// import { toast } from 'react-toastify';

// const Cart = () => {
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const navigate = useNavigate();
//   const { products, currency, cartItems, updateQuantity, getImageUrl, token } = useContext(ShopContext);
//   const [cartData, setCartData] = useState([]);

//   // Check authentication on component mount
//   useEffect(() => {
//     const checkAuth = () => {
//       const storedToken = localStorage.getItem('token');
//       if (!storedToken && !token) {
//         toast.error('Please login to view your cart');
//         navigate('/login');
//         return;
//       }
//       setIsLoading(false);
//     };
    
//     checkAuth();
//   }, [navigate, token]);

//   // Build cart data from context whenever cartItems/products change
//   useEffect(() => {
//     if (isLoading) return;
    
//     const tempData = [];
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         if (cartItems[itemId][size] > 0) {
//           tempData.push({
//             _id: itemId,
//             size,
//             quantity: cartItems[itemId][size],
//           });
//         }
//       }
//     }
//     setCartData(tempData);
//   }, [cartItems, products, isLoading]);

//   // Show loading while checking authentication
//   if (isLoading) {
//     return (
//       <div className="border-t pt-14 mt-10 flex justify-center items-center min-h-[60vh]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading cart...</p>
//         </div>
//       </div>
//     );
//   }

//   // Safely get a product price
//   const getProductPrice = (product) => {
//     if (!product) return 0;
//     if (product.effectivePrice) return product.effectivePrice;
//     if (product.price?.discount > 0) return product.price.discount;
//     if (product.price?.base) return product.price.base;
//     if (typeof product.price === 'number') return product.price;
//     return 0;
//   };

//   // Safely get a product image
//   const getProductImage = (product) => {
//     if (!product) return 'https://via.placeholder.com/300x300?text=No+Image';

//     if (Array.isArray(product.images) && product.images.length > 0) {
//       const first = product.images[0];
//       if (typeof first === 'object' && first.url) return first.url;
//       if (typeof first === 'string') return getImageUrl ? getImageUrl(first) : first;
//     }

//     if (Array.isArray(product.image) && product.image.length > 0) {
//       return getImageUrl ? getImageUrl(product.image[0]) : product.image[0];
//     }

//     return 'https://via.placeholder.com/300x300?text=No+Image';
//   };

//   // Handle checkout button click with authentication check
//   const handleCheckout = () => {
//     const currentToken = localStorage.getItem('token') || token;
//     if (!currentToken) {
//       toast.error('Please login to proceed with checkout');
//       navigate('/login');
//       return;
//     }
    
//     if (cartData.length === 0) {
//       toast.error('Your cart is empty');
//       return;
//     }
    
//     navigate('/place-order');
//   };

//   // Empty cart UI
//   if (cartData.length === 0) {
//     return (
//       <div className="border-t pt-14 mt-10">
//         <div className="text-2xl mb-3">
//           <br />
//           <Title text1="YOUR" text2="CART" />
//         </div>
//         <div className="text-center py-16">
//           <div className="mb-4">
//             <img
//               src={assets.cart_icon || 'https://via.placeholder.com/100x100?text=Cart'}
//               alt="Empty Cart"
//               className="w-20 h-20 mx-auto opacity-50 mb-4"
//             />
//           </div>
//           <h3 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h3>
//           <p className="text-gray-500 mb-6">Add some products to get started!</p>
//           <button
//             onClick={() => navigate('/collection')}
//             className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors rounded"
//           >
//             CONTINUE SHOPPING
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Cart with items
//   return (
//     <div className="border-t pt-14">
//       <div className="text-2xl mb-3">
//         <br />
//         <Title text1="YOUR" text2="CART" />
//       </div>

//       <div className="mb-8">
//         {cartData.map((item, index) => {
//           const productData = products.find((p) => p._id === item._id);

//           if (!productData) {
//             console.warn(`Product not found for ID: ${item._id}`);
//             return null;
//           }

//           const productPrice = getProductPrice(productData);
//           const productImage = getProductImage(productData);
//           const itemTotal = productPrice * item.quantity;

//           return (
//             <div
//               key={index}
//               className="py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
//             >
//               <div className="flex items-start gap-6">
//                 <img
//                   src={productImage}
//                   className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
//                   alt={productData.name || 'Product'}
//                   onClick={() => navigate(`/product/${productData._id}`)}
//                   onError={(e) => {
//                     e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image+Error';
//                   }}
//                 />
//                 <div className="flex-1">
//                   <p 
//                     className="text-sm sm:text-lg font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors"
//                     onClick={() => navigate(`/product/${productData._id}`)}
//                   >
//                     {productData.name}
//                   </p>
//                   <div className="flex items-center gap-5 mb-2">
//                     <p className="font-medium">
//                       {currency}
//                       {productPrice}
//                     </p>
//                     <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-sm rounded">
//                       {item.size}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-3 text-xs text-gray-500">
//                     {productData.brand && (
//                       <span className="uppercase tracking-wider">{productData.brand}</span>
//                     )}
//                     {productData.category && (
//                       <span className="capitalize">{productData.category}</span>
//                     )}
//                   </div>

//                   <div className="mt-2 text-sm font-semibold text-gray-800">
//                     Subtotal: {currency}
//                     {itemTotal}
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col items-center gap-2">
//                 <label className="text-xs text-gray-500 hidden sm:block">Qty</label>
//                 <input
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (value === '' || value === '0') {
//                       updateQuantity(item._id, item.size, 0);
//                     } else {
//                       const quantity = Number(value);
//                       if (quantity > 0 && quantity <= 99) {
//                         updateQuantity(item._id, item.size, quantity);
//                       }
//                     }
//                   }}
//                   className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center rounded"
//                   type="number"
//                   min="1"
//                   max="99"
//                   value={item.quantity}
//                 />
//               </div>

//               <div className="flex justify-center">
//                 <img
//                   onClick={() => {
//                     setDeleteTarget({ _id: item._id, size: item.size });
//                     setIsDeleteModalOpen(true);
//                   }}
//                   src={assets.bin_icon}
//                   className="w-4 sm:w-5 cursor-pointer hover:opacity-70 transition-opacity"
//                   alt="Remove item"
//                   title="Remove from cart"
//                 />
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Login prompt for unauthenticated users */}
//       {(!token && !localStorage.getItem('token')) && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
//           <div className="flex items-center gap-3">
//             <div className="text-yellow-600">
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div>
//               <p className="text-yellow-800 font-medium">Login Required</p>
//               <p className="text-yellow-700 text-sm">Please login to proceed with checkout</p>
//             </div>
//             <button
//               onClick={() => navigate('/login')}
//               className="ml-auto bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 transition-colors"
//             >
//               Login Now
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//           <div className="w-full text-end mt-6">
//             <button
//               onClick={handleCheckout}
//               className="bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition-colors rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={cartData.length === 0}
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && deleteTarget && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white rounded-lg shadow-lg w-80 p-6">
//             <h3 className="text-lg font-bold mb-4">Remove Item</h3>
//             <p className="mb-6 text-gray-700">Are you sure you want to remove this item from your cart?</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setIsDeleteModalOpen(false);
//                   setDeleteTarget(null);
//                 }}
//                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => {
//                   if (deleteTarget) {
//                     updateQuantity(deleteTarget._id, deleteTarget.size, 0);
//                   }
//                   setIsDeleteModalOpen(false);
//                   setDeleteTarget(null);
//                 }}
//                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { toast } from 'react-toastify';

const Cart = () => {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userMeasurements, setUserMeasurements] = useState(null);

  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity, getImageUrl, token, backendUrl } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Fetch user measurements
  useEffect(() => {
    const fetchMeasurements = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${backendUrl}/api/measurements`, {
          headers: { 'token': token }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setUserMeasurements(data.data);
          }
        }
      } catch (error) {
        console.log('No measurements found');
      }
    };

    fetchMeasurements();
  }, [token, backendUrl]);

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken && !token) {
        toast.error('Please login to view your cart');
        navigate('/login');
        return;
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate, token]);

  useEffect(() => {
    if (isLoading) return;
    
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products, isLoading]);

  if (isLoading) {
    return (
      <div className="border-t pt-14 mt-10 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  const getProductPrice = (product) => {
    if (!product) return 0;
    if (product.effectivePrice) return product.effectivePrice;
    if (product.price?.discount > 0) return product.price.discount;
    if (product.price?.base) return product.price.base;
    if (typeof product.price === 'number') return product.price;
    return 0;
  };

  const getProductImage = (product) => {
    if (!product) return 'https://via.placeholder.com/300x300?text=No+Image';

    if (Array.isArray(product.images) && product.images.length > 0) {
      const first = product.images[0];
      if (typeof first === 'object' && first.url) return first.url;
      if (typeof first === 'string') return getImageUrl ? getImageUrl(first) : first;
    }

    if (Array.isArray(product.image) && product.image.length > 0) {
      return getImageUrl ? getImageUrl(product.image[0]) : product.image[0];
    }

    return 'https://via.placeholder.com/300x300?text=No+Image';
  };

  const handleCheckout = () => {
    const currentToken = localStorage.getItem('token') || token;
    if (!currentToken) {
      toast.error('Please login to proceed with checkout');
      navigate('/login');
      return;
    }
    
    if (cartData.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    navigate('/place-order');
  };

  // Check if product requires measurements
  const requiresMeasurements = (product) => {
    return product?.subcategory === 'Shoes' || product?.subcategory === 'Jackets';
  };

  if (cartData.length === 0) {
    return (
      <div className="border-t pt-14 mt-10">
        <div className="text-2xl mb-3">
          <Title text1="YOUR" text2="CART" />
        </div>
        <div className="text-center py-16">
          <div className="mb-4">
            <img
              src={assets.cart_icon || 'https://via.placeholder.com/100x100?text=Cart'}
              alt="Empty Cart"
              className="w-20 h-20 mx-auto opacity-50 mb-4"
            />
          </div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some products to get started!</p>
          <button
            onClick={() => navigate('/collection')}
            className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition-colors rounded"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>



      <div className="mb-8">
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);

          if (!productData) {
            return null;
          }

          const productPrice = getProductPrice(productData);
          const productImage = getProductImage(productData);
          const itemTotal = productPrice * item.quantity;
          const needsMeasurements = requiresMeasurements(productData);

          return (
            <div
              key={index}
              className="py-4 border-b text-gray-700"
            >
              <div className="grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img
                    src={productImage}
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                    alt={productData.name || 'Product'}
                    onClick={() => navigate(`/product/${productData._id}`)}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image+Error';
                    }}
                  />
                  <div className="flex-1">
                    <p 
                      className="text-sm sm:text-lg font-medium mb-2 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => navigate(`/product/${productData._id}`)}
                    >
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mb-2">
                      <p className="font-medium">{currency}{productPrice}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-sm rounded">
                        {item.size}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {productData.brand && (
                        <span className="uppercase tracking-wider">{productData.brand}</span>
                      )}
                      {productData.category && (
                        <span className="capitalize">{productData.category}</span>
                      )}
                    </div>

                    {/* Show measurement indicator */}
                    {/* {needsMeasurements && userMeasurements && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                        </svg>
                        Measurements recorded
                      </div>
                    )} */}

                    <div className="mt-2 text-sm font-semibold text-gray-800">
                      Subtotal: {currency}{itemTotal}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <label className="text-xs text-gray-500 hidden sm:block">Qty</label>
                  <input
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '' || value === '0') {
                        updateQuantity(item._id, item.size, 0);
                      } else {
                        const quantity = Number(value);
                        if (quantity > 0 && quantity <= 99) {
                          updateQuantity(item._id, item.size, quantity);
                        }
                      }
                    }}
                    className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center rounded"
                    type="number"
                    min="1"
                    max="99"
                    value={item.quantity}
                  />
                </div>

                <div className="flex justify-center">
                  <img
                    onClick={() => {
                      setDeleteTarget({ _id: item._id, size: item.size });
                      setIsDeleteModalOpen(true);
                    }}
                    src={assets.bin_icon}
                    className="w-4 sm:w-5 cursor-pointer hover:opacity-70 transition-opacity"
                    alt="Remove item"
                    title="Remove from cart"
                  />
                </div>
              </div>

              {/* Detailed measurements for this product type */}
              {needsMeasurements && userMeasurements && (
                <div className="mt-3 ml-24 p-3 bg-gray-50 rounded text-xs">
                  <p className="font-medium text-gray-700 mb-2">Your measurements ({userMeasurements.unit}):</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-600">
                    {productData.subcategory === 'Shoes' ? (
                      <>
                        {userMeasurements.footLength && (
                          <div>Foot Length: <span className="font-medium">{userMeasurements.footLength}</span></div>
                        )}
                        {userMeasurements.footWidth && (
                          <div>Foot Width: <span className="font-medium">{userMeasurements.footWidth}</span></div>
                        )}
                      </>
                    ) : productData.subcategory === 'Jackets' ? (
                      <>
                        {userMeasurements.chest && (
                          <div>Chest: <span className="font-medium">{userMeasurements.chest}</span></div>
                        )}
                        {userMeasurements.shoulder && (
                          <div>Shoulder: <span className="font-medium">{userMeasurements.shoulder}</span></div>
                        )}
                        {userMeasurements.armLength && (
                          <div>Arm: <span className="font-medium">{userMeasurements.armLength}</span></div>
                        )}
                        {userMeasurements.waist && (
                          <div>Waist: <span className="font-medium">{userMeasurements.waist}</span></div>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(!token && !localStorage.getItem('token')) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="text-yellow-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-yellow-800 font-medium">Login Required</p>
              <p className="text-yellow-700 text-sm">Please login to proceed with checkout</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              className="ml-auto bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 transition-colors"
            >
              Login Now
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end mt-6">
            <button
              onClick={handleCheckout}
              className="bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition-colors rounded w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cartData.length === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h3 className="text-lg font-bold mb-4">Remove Item</h3>
            <p className="mb-6 text-gray-700">Are you sure you want to remove this item from your cart?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteTarget) {
                    updateQuantity(deleteTarget._id, deleteTarget.size, 0);
                  }
                  setIsDeleteModalOpen(false);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;