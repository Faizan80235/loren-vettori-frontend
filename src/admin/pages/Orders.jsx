// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { backendUrl, adminCurrency } from '../Config'
// // import { toast } from 'react-toastify';
// // import { assets } from '../assets/assets';

// // const Orders = ({ token }) => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [pagination, setPagination] = useState({
// //     page: 1,
// //     pages: 1,
// //     total: 0,
// //     limit: 10
// //   });
// //   const [filters, setFilters] = useState({
// //     status: '',
// //     paymentMethod: ''
// //   });

// //   const fetchAllOrders = async (page = 1, currentFilters = filters) => {
// //     if (!token) {
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       // Build query parameters
// //       const params = new URLSearchParams({
// //         page: page.toString(),
// //         limit: pagination.limit.toString()
// //       });

// //       if (currentFilters.status) {
// //         params.append('status', currentFilters.status);
// //       }
// //       if (currentFilters.paymentMethod) {
// //         params.append('paymentMethod', currentFilters.paymentMethod);
// //       }

// //       // Fixed: Use GET method and correct Authorization header
// //       const response = await axios.get(
// //         `${backendUrl}/api/order/list?${params.toString()}`,
// //         { 
// //           headers: { 
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       if (response.data.success) {
// //         setOrders(response.data.orders || []);
// //         setPagination(response.data.pagination || {
// //           page: 1,
// //           pages: 1,
// //           total: 0,
// //           limit: 10
// //         });
// //       } else {
// //         toast.error(response.data.message || 'Failed to fetch orders');
// //       }
// //     } catch (error) {
// //       console.error('Fetch orders error:', error);
// //       if (error.response?.status === 401) {
// //         toast.error('Session expired. Please login again.');
// //       } else if (error.response?.status === 403) {
// //         toast.error('Access denied. Admin privileges required.');
// //       } else {
// //         toast.error(error.response?.data?.message || 'Failed to fetch orders');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const statusHandler = async (event, orderId) => {
// //     const newStatus = event.target.value;
    
// //     try {
// //       // Fixed: Use correct Authorization header
// //       const response = await axios.post(
// //         `${backendUrl}/api/order/status`,
// //         { orderId, status: newStatus },
// //         { 
// //           headers: { 
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       if (response.data.success) {
// //         toast.success('Order status updated successfully');
// //         // Update the local state instead of refetching all orders
// //         setOrders(prevOrders => 
// //           prevOrders.map(order => 
// //             order._id === orderId 
// //               ? { ...order, status: newStatus }
// //               : order
// //           )
// //         );
// //       } else {
// //         toast.error(response.data.message || 'Failed to update order status');
// //       }
// //     } catch (error) {
// //       console.error('Update status error:', error);
// //       if (error.response?.status === 401) {
// //         toast.error('Session expired. Please login again.');
// //       } else if (error.response?.status === 403) {
// //         toast.error('Access denied. Admin privileges required.');
// //       } else {
// //         toast.error(error.response?.data?.message || 'Failed to update status');
// //       }
// //     }
// //   };

// //   const handleFilterChange = (filterType, value) => {
// //     const newFilters = { ...filters, [filterType]: value };
// //     setFilters(newFilters);
// //     fetchAllOrders(1, newFilters); // Reset to page 1 when filtering
// //   };

// //   const handlePageChange = (newPage) => {
// //     if (newPage >= 1 && newPage <= pagination.pages) {
// //       fetchAllOrders(newPage);
// //     }
// //   };

// //   const clearFilters = () => {
// //     const clearedFilters = { status: '', paymentMethod: '' };
// //     setFilters(clearedFilters);
// //     fetchAllOrders(1, clearedFilters);
// //   };

// //   const formatDate = (dateString) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   useEffect(() => {
// //     fetchAllOrders();
// //   }, [token]);

// //   if (!token) {
// //     return (
// //       <div className="text-center py-8">
// //         <p className="text-gray-600">Please login to view orders</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-full">
// //       <div className="flex justify-between items-center mb-4">
// //         <h2 className="text-2xl font-bold">Orders Management</h2>
// //         <div className="text-sm text-gray-600">
// //           Total: {pagination.total} orders
// //         </div>
// //       </div>

// //       {/* Filters */}
// //       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-1">Order Status</label>
// //             <select
// //               value={filters.status}
// //               onChange={(e) => handleFilterChange('status', e.target.value)}
// //               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             >
// //               <option value="">All Status</option>
// //               <option value="Order Placed">Order Placed</option>
// //               <option value="Processing">Processing</option>
// //               <option value="Shipped">Shipped</option>
// //               <option value="Out for Delivery">Out for Delivery</option>
// //               <option value="Delivered">Delivered</option>
// //               <option value="Cancelled">Cancelled</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium mb-1">Payment Method</label>
// //             <select
// //               value={filters.paymentMethod}
// //               onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
// //               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             >
// //               <option value="">All Methods</option>
// //               <option value="COD">COD</option>
// //               <option value="Stripe">Stripe</option>
// //               <option value="Razorpay">Razorpay</option>
// //             </select>
// //           </div>
// //           <div className="flex items-end">
// //             <button
// //               onClick={clearFilters}
// //               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
// //             >
// //               Clear Filters
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {loading ? (
// //         <div className="flex justify-center items-center py-8">
// //           <div className="text-gray-600">Loading orders...</div>
// //         </div>
// //       ) : (
// //         <>
// //           <div className="space-y-4">
// //             {orders.length === 0 ? (
// //               <div className="text-center py-8 text-gray-500">
// //                 No orders found
// //               </div>
// //             ) : (
// //               orders.map((order, index) => (
// //                 <div
// //                   key={order._id || index}
// //                   className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-6 rounded-lg bg-white hover:shadow-md transition-shadow"
// //                 >
// //                   {/* Order Icon */}
// //                   <div className="flex justify-center">
// //                     <img className="w-12 h-12" src={assets.parcel_icon} alt="Order Icon" />
// //                   </div>

// //                   {/* Order Items and Address */}
// //                   <div className="space-y-2">
// //                     <div className="border-b pb-2">
// //                       <h4 className="font-medium text-gray-800 mb-1">Items:</h4>
// //                       {order.items && order.items.map((item, idx) => (
// //                         <p className="py-0.5 text-sm text-gray-700" key={idx}>
// //                           <span className="font-medium">{item.name}</span> x {item.quantity}
// //                           {item.size && <span className="text-gray-500"> (Size: {item.size})</span>}
// //                           {idx < order.items.length - 1 && <span className="text-gray-400">, </span>}
// //                         </p>
// //                       ))}
// //                     </div>

// //                     {/* Customer Information */}
// //                     <div>
// //                       <h4 className="font-medium text-gray-800 mb-1">Customer:</h4>
// //                       <p className="font-medium text-sm">
// //                         {order.address?.firstName || 'N/A'} {order.address?.lastName || ''}
// //                       </p>
// //                       <div className="text-sm text-gray-600 space-y-1">
// //                         <p>{order.address?.street || 'Address not available'}</p>
// //                         <p>
// //                           {[
// //                             order.address?.city,
// //                             order.address?.state,
// //                             order.address?.country,
// //                             order.address?.zipcode
// //                           ].filter(Boolean).join(', ') || 'Location not available'}
// //                         </p>
// //                         {order.address?.phone && <p>Phone: {order.address.phone}</p>}
// //                         {order.address?.email && <p>Email: {order.address.email}</p>}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Order Details */}
// //                   <div className="space-y-2 text-sm">
// //                     <div>
// //                       <span className="font-medium">Items:</span> {order.items?.length || 0}
// //                     </div>
// //                     <div>
// //                       <span className="font-medium">Payment:</span> {order.paymentMethod || 'N/A'}
// //                     </div>
// //                     <div>
// //                       <span className="font-medium">Paid:</span> 
// //                       <span className={`ml-1 px-2 py-1 rounded text-xs ${
// //                         order.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
// //                       }`}>
// //                         {order.payment ? 'Yes' : 'No'}
// //                       </span>
// //                     </div>
// //                     <div>
// //                       <span className="font-medium">Date:</span> {formatDate(order.date)}
// //                     </div>
// //                   </div>

// //                   {/* Order Amount */}
// //                   <div className="text-center lg:text-left">
// //                     <div className="text-lg font-bold text-gray-800">
// //                       {adminCurrency}{order.amount?.toFixed(2) || '0.00'}
// //                     </div>
// //                   </div>

// //                   {/* Status Selector */}
// //                   <div className="flex flex-col items-stretch lg:items-center">
// //                     <select
// //                       onChange={(event) => statusHandler(event, order._id)}
// //                       value={order.status || 'Order Placed'}
// //                       className="p-2 border rounded font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
// //                     >
// //                       <option value="Order Placed">Order Placed</option>
// //                       <option value="Processing">Processing</option>
// //                       <option value="Shipped">Shipped</option>
// //                       <option value="Out for Delivery">Out for Delivery</option>
// //                       <option value="Delivered">Delivered</option>
// //                       <option value="Cancelled">Cancelled</option>
// //                     </select>
                    
// //                     {/* Current Status Badge */}
// //                     <div className="mt-2">
// //                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                         order.status === 'Delivered' 
// //                           ? 'bg-green-100 text-green-800'
// //                           : order.status === 'Cancelled'
// //                           ? 'bg-red-100 text-red-800'
// //                           : order.status === 'Shipped' || order.status === 'Out for Delivery'
// //                           ? 'bg-blue-100 text-blue-800'
// //                           : 'bg-yellow-100 text-yellow-800'
// //                       }`}>
// //                         {order.status || 'Order Placed'}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))
// //             )}
// //           </div>

// //           {/* Pagination */}
// //           {pagination.pages > 1 && (
// //             <div className="flex justify-center items-center mt-6 space-x-2">
// //               <button
// //                 onClick={() => handlePageChange(pagination.page - 1)}
// //                 disabled={pagination.page === 1}
// //                 className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 Previous
// //               </button>
              
// //               {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
// //                 const page = pagination.page <= 3 ? i + 1 : pagination.page - 2 + i;
// //                 if (page > pagination.pages) return null;
// //                 return (
// //                   <button
// //                     key={page}
// //                     onClick={() => handlePageChange(page)}
// //                     className={`px-3 py-2 border rounded ${
// //                       pagination.page === page 
// //                         ? 'bg-blue-500 text-white border-blue-500' 
// //                         : 'hover:bg-gray-50'
// //                     }`}
// //                   >
// //                     {page}
// //                   </button>
// //                 );
// //               })}
              
// //               <button
// //                 onClick={() => handlePageChange(pagination.page + 1)}
// //                 disabled={pagination.page === pagination.pages}
// //                 className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 Next
// //               </button>
// //             </div>
// //           )}

// //           {/* Page Info */}
// //           <div className="text-center text-sm text-gray-600 mt-4">
// //             Showing {orders.length} of {pagination.total} orders (Page {pagination.page} of {pagination.pages})
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Orders;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { backendUrl, adminCurrency } from '../Config'
// import { toast } from 'react-toastify';
// import { assets } from '../assets/assets';
// import { Eye, X, Ruler } from 'lucide-react';

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     pages: 1,
//     total: 0,
//     limit: 10
//   });
//   const [filters, setFilters] = useState({
//     status: '',
//     paymentMethod: ''
//   });
//   const [selectedMeasurement, setSelectedMeasurement] = useState(null);
//   const [showMeasurementModal, setShowMeasurementModal] = useState(false);

//   const fetchAllOrders = async (page = 1, currentFilters = filters) => {
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);

//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: pagination.limit.toString()
//       });

//       if (currentFilters.status) {
//         params.append('status', currentFilters.status);
//       }
//       if (currentFilters.paymentMethod) {
//         params.append('paymentMethod', currentFilters.paymentMethod);
//       }

//       const response = await axios.get(
//         `${backendUrl}/api/order/list?${params.toString()}`,
//         { 
//           headers: { 
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         setOrders(response.data.orders || []);
//         setPagination(response.data.pagination || {
//           page: 1,
//           pages: 1,
//           total: 0,
//           limit: 10
//         });
//       } else {
//         toast.error(response.data.message || 'Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Fetch orders error:', error);
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//       } else if (error.response?.status === 403) {
//         toast.error('Access denied. Admin privileges required.');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to fetch orders');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMeasurements = async (userId) => {
//     try {
//       const response = await axios.get(
//         `${backendUrl}/api/measurements/${userId}`,
//         { 
//           headers: { 
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success && response.data.data) {
//         setSelectedMeasurement(response.data.data);
//         setShowMeasurementModal(true);
//       } else {
//         toast.info('No measurements found for this user');
//       }
//     } catch (error) {
//       console.error('Fetch measurements error:', error);
//       toast.error('Failed to fetch measurements');
//     }
//   };

//   const statusHandler = async (event, orderId) => {
//     const newStatus = event.target.value;
    
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/order/status`,
//         { orderId, status: newStatus },
//         { 
//           headers: { 
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         toast.success('Order status updated successfully');
//         setOrders(prevOrders => 
//           prevOrders.map(order => 
//             order._id === orderId 
//               ? { ...order, status: newStatus }
//               : order
//           )
//         );
//       } else {
//         toast.error(response.data.message || 'Failed to update order status');
//       }
//     } catch (error) {
//       console.error('Update status error:', error);
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.');
//       } else if (error.response?.status === 403) {
//         toast.error('Access denied. Admin privileges required.');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to update status');
//       }
//     }
//   };

//   const handleFilterChange = (filterType, value) => {
//     const newFilters = { ...filters, [filterType]: value };
//     setFilters(newFilters);
//     fetchAllOrders(1, newFilters);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.pages) {
//       fetchAllOrders(newPage);
//     }
//   };

//   const clearFilters = () => {
//     const clearedFilters = { status: '', paymentMethod: '' };
//     setFilters(clearedFilters);
//     fetchAllOrders(1, clearedFilters);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   // Measurement Modal Component
//   const MeasurementModal = ({ measurement, onClose }) => {
//     if (!measurement) return null;

//     return (
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//           <div 
//             className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
//             onClick={onClose}
//           ></div>

//           <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
//             <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//               <div className="flex items-center gap-2">
//                 <Ruler className="w-5 h-5 text-blue-600" />
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Customer Measurements
//                 </h3>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <div className="px-6 py-4">
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {measurement.chest && (
//                   <div className="p-3 bg-gray-50 rounded">
//                     <p className="text-xs text-gray-500 mb-1">Chest</p>
//                     <p className="font-medium">{measurement.chest} {measurement.unit || 'cm'}</p>
//                   </div>
//                 )}
//                 {measurement.height && (
//                   <div className="p-3 bg-gray-50 rounded">
//                     <p className="text-xs text-gray-500 mb-1">Height</p>
//                     <p className="font-medium">{measurement.height} {measurement.unit || 'cm'}</p>
//                   </div>
//                 )}
//                 {measurement.naturalWaist && (
//                   <div className="p-3 bg-gray-50 rounded">
//                     <p className="text-xs text-gray-500 mb-1">Natural Waist</p>
//                     <p className="font-medium">{measurement.naturalWaist} {measurement.unit || 'cm'}</p>
//                   </div>
//                 )}
//                 {measurement.weight && (
//                   <div className="p-3 bg-gray-50 rounded">
//                     <p className="text-xs text-gray-500 mb-1">Weight</p>
//                     <p className="font-medium">{measurement.weight} kg</p>
//                   </div>
//                 )}
//                 {measurement.lowerWaist && (
//                   <div className="p-3 bg-gray-50 rounded">
//                     <p className="text-xs text-gray-500 mb-1">Lower Waist</p>
//                     <p className="font-medium">{measurement.lowerWaist} {measurement.unit || 'cm'}</p>
//                   </div>
//                 )}
//                 {measurement.shoulder && (
//                   <div className="p-3 bg-gray-50 rounded">
//                     <p className="text-xs text-gray-500 mb-1">Shoulder</p>
//                     <p className="font-medium">{measurement.shoulder} {measurement.unit || 'cm'}</p>
//                   </div>
//                 )}
//                 {measurement.hips && (
//                   <div className="p-3 bg-gray-50 rounded">
//                     <p className="text-xs text-gray-500 mb-1">Hips</p>
//                     <p className="font-medium">{measurement.hips} {measurement.unit || 'cm'}</p>
//                   </div>
//                 )}
//                 {measurement.sleeves && (
//                   <div className="p-3 bg-gray-50 rounded">
//                     <p className="text-xs text-gray-500 mb-1">Sleeves</p>
//                     <p className="font-medium">{measurement.sleeves} {measurement.unit || 'cm'}</p>
//                   </div>
//                 )}
//               </div>

//               {measurement.category && (
//                 <div className="mt-4 p-3 bg-blue-50 rounded">
//                   <p className="text-sm text-gray-600">
//                     <span className="font-medium">Category:</span> {measurement.category}
//                     {measurement.subcategory && ` / ${measurement.subcategory}`}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
//               <button
//                 onClick={onClose}
//                 className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (!token) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-gray-600">Please login to view orders</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       {showMeasurementModal && (
//         <MeasurementModal 
//           measurement={selectedMeasurement} 
//           onClose={() => {
//             setShowMeasurementModal(false);
//             setSelectedMeasurement(null);
//           }} 
//         />
//       )}

//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Orders Management</h2>
//         <div className="text-sm text-gray-600">
//           Total: {pagination.total} orders
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Order Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => handleFilterChange('status', e.target.value)}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Status</option>
//               <option value="Order Placed">Order Placed</option>
//               <option value="Processing">Processing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for Delivery">Out for Delivery</option>
//               <option value="Delivered">Delivered</option>
//               <option value="Cancelled">Cancelled</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Payment Method</label>
//             <select
//               value={filters.paymentMethod}
//               onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Methods</option>
//               <option value="COD">COD</option>
//               <option value="Stripe">Stripe</option>
//               <option value="Razorpay">Razorpay</option>
//             </select>
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={clearFilters}
//               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-gray-600">Loading orders...</div>
//         </div>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {orders.length === 0 ? (
//               <div className="text-center py-8 text-gray-500">
//                 No orders found
//               </div>
//             ) : (
//               orders.map((order, index) => (
//                 <div
//                   key={order._id || index}
//                   className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-6 rounded-lg bg-white hover:shadow-md transition-shadow"
//                 >
//                   {/* Order Icon */}
//                   <div className="flex justify-center">
//                     <img className="w-12 h-12" src={assets.parcel_icon} alt="Order Icon" />
//                   </div>

//                   {/* Order Items and Address */}
//                   <div className="space-y-2">
//                     <div className="border-b pb-2">
//                       <h4 className="font-medium text-gray-800 mb-1">Items:</h4>
//                       {order.items && order.items.map((item, idx) => (
//                         <p className="py-0.5 text-sm text-gray-700" key={idx}>
//                           <span className="font-medium">{item.name}</span> x {item.quantity}
//                           {item.size && <span className="text-gray-500"> (Size: {item.size})</span>}
//                           {item.madeToMeasure && (
//                             <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
//                               Made-to-Measure
//                             </span>
//                           )}
//                           {idx < order.items.length - 1 && <span className="text-gray-400">, </span>}
//                         </p>
//                       ))}
//                     </div>

//                     {/* Customer Information */}
//                     <div>
//                       <div className="flex items-center justify-between mb-1">
//                         <h4 className="font-medium text-gray-800">Customer:</h4>
//                         {order.userId && (
//                           <button
//                             onClick={() => fetchMeasurements(order.userId)}
//                             className="flex items-center gap-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
//                           >
//                             <Ruler className="w-3 h-3" />
//                             View Measurements
//                           </button>
//                         )}
//                       </div>
//                       <p className="font-medium text-sm">
//                         {order.address?.firstName || 'N/A'} {order.address?.lastName || ''}
//                       </p>
//                       <div className="text-sm text-gray-600 space-y-1">
//                         <p>{order.address?.street || 'Address not available'}</p>
//                         <p>
//                           {[
//                             order.address?.city,
//                             order.address?.state,
//                             order.address?.country,
//                             order.address?.zipcode
//                           ].filter(Boolean).join(', ') || 'Location not available'}
//                         </p>
//                         {order.address?.phone && <p>Phone: {order.address.phone}</p>}
//                         {order.address?.email && <p>Email: {order.address.email}</p>}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Order Details */}
//                   <div className="space-y-2 text-sm">
//                     <div>
//                       <span className="font-medium">Items:</span> {order.items?.length || 0}
//                     </div>
//                     <div>
//                       <span className="font-medium">Payment:</span> {order.paymentMethod || 'N/A'}
//                     </div>
//                     <div>
//                       <span className="font-medium">Paid:</span> 
//                       <span className={`ml-1 px-2 py-1 rounded text-xs ${
//                         order.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                       }`}>
//                         {order.payment ? 'Yes' : 'No'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="font-medium">Date:</span> {formatDate(order.date)}
//                     </div>
//                   </div>

//                   {/* Order Amount */}
//                   <div className="text-center lg:text-left">
//                     <div className="text-lg font-bold text-gray-800">
//                       {adminCurrency}{order.amount?.toFixed(2) || '0.00'}
//                     </div>
//                   </div>

//                   {/* Status Selector */}
//                   <div className="flex flex-col items-stretch lg:items-center">
//                     <select
//                       onChange={(event) => statusHandler(event, order._id)}
//                       value={order.status || 'Order Placed'}
//                       className="p-2 border rounded font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
//                     >
//                       <option value="Order Placed">Order Placed</option>
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Out for Delivery">Out for Delivery</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
                    
//                     {/* Current Status Badge */}
//                     <div className="mt-2">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         order.status === 'Delivered' 
//                           ? 'bg-green-100 text-green-800'
//                           : order.status === 'Cancelled'
//                           ? 'bg-red-100 text-red-800'
//                           : order.status === 'Shipped' || order.status === 'Out for Delivery'
//                           ? 'bg-blue-100 text-blue-800'
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {order.status || 'Order Placed'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Pagination */}
//           {pagination.pages > 1 && (
//             <div className="flex justify-center items-center mt-6 space-x-2">
//               <button
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//                 className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
              
//               {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
//                 const page = pagination.page <= 3 ? i + 1 : pagination.page - 2 + i;
//                 if (page > pagination.pages) return null;
//                 return (
//                   <button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     className={`px-3 py-2 border rounded ${
//                       pagination.page === page 
//                         ? 'bg-blue-500 text-white border-blue-500' 
//                         : 'hover:bg-gray-50'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 );
//               })}
              
//               <button
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.pages}
//                 className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           )}

//           {/* Page Info */}
//           <div className="text-center text-sm text-gray-600 mt-4">
//             Showing {orders.length} of {pagination.total} orders (Page {pagination.page} of {pagination.pages})
//           </div>
//         </>
//       )}
//     </div> 
//   );
// };

// export default Orders;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, adminCurrency } from '../Config';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { Ruler, X } from 'lucide-react';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 10
  });
  const [filters, setFilters] = useState({
    status: '',
    paymentMethod: ''
  });
  const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
  const [loadingMeasurements, setLoadingMeasurements] = useState(false);

  // Fetch all orders with pagination and filters
  const fetchAllOrders = async (page = 1, currentFilters = filters) => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Use current limit or default to 10
      const currentLimit = pagination.limit || 10;

      const params = new URLSearchParams({
        page: page.toString(),
        limit: currentLimit.toString()
      });

      if (currentFilters.status) {
        params.append('status', currentFilters.status);
      }
      if (currentFilters.paymentMethod) {
        params.append('paymentMethod', currentFilters.paymentMethod);
      }

      const response = await axios.get(
        `${backendUrl}/api/order/list?${params.toString()}`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
        
        // Update pagination with proper defaults
        const newPagination = response.data.pagination || {};
        setPagination({
          page: parseInt(newPagination.page) || 1,
          pages: parseInt(newPagination.pages) || 1,
          total: parseInt(newPagination.total) || 0,
          limit: parseInt(newPagination.limit) || 10
        });
      } else {
        toast.error(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
      } else if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch orders');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch measurements for a specific user
  const fetchMeasurements = async (userId) => {
    if (!userId) {
      toast.error('User ID not available');
      return;
    }

    try {
      setLoadingMeasurements(true);
      
      // Use the existing measurements route
      const response = await axios.get(
        `${backendUrl}/api/measurements/${userId}`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success && response.data.data) {
        setSelectedMeasurement(response.data.data);
        setShowMeasurementModal(true);
      } else {
        toast.info('No measurements found for this user');
      }
    } catch (error) {
      console.error('Fetch measurements error:', error);
      if (error.response?.status === 404) {
        toast.info('No measurements found for this user');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch measurements');
      }
    } finally {
      setLoadingMeasurements(false);
    }
  };

  // Update order status
  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { 
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Order status updated successfully');
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId 
              ? { ...order, status: newStatus }
              : order
          )
        );
      } else {
        toast.error(response.data.message || 'Failed to update order status');
      }
    } catch (error) {
      console.error('Update status error:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
      } else if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to update status');
      }
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    fetchAllOrders(1, newFilters);
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination.pages || 1)) {
      fetchAllOrders(newPage, filters);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = { status: '', paymentMethod: '' };
    setFilters(clearedFilters);
    fetchAllOrders(1, clearedFilters);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if order has made-to-measure items
  const hasMadeToMeasureItems = (order) => {
    return order.items?.some(item => item.madeToMeasure) || order.hasMadeToMeasure;
  };

  // Initial fetch
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Measurement Modal Component
  const MeasurementModal = ({ measurement, onClose }) => {
    if (!measurement) return null;

    const measurementFields = [
      { key: 'chest', label: 'Chest' },
      { key: 'height', label: 'Height' },
      { key: 'naturalWaist', label: 'Natural Waist' },
      { key: 'weight', label: 'Weight' },
      { key: 'lowerWaist', label: 'Lower Waist' },
      { key: 'shoulder', label: 'Shoulder' },
      { key: 'hips', label: 'Hips' },
      { key: 'sleeves', label: 'Sleeves' }
    ];

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
            onClick={onClose}
          ></div>

          {/* Modal content */}
          <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Customer Measurements
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {measurementFields.map(field => (
                  measurement[field.key] && (
                    <div key={field.key} className="p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-500 mb-1 font-medium">{field.label}</p>
                      <p className="font-semibold text-gray-900">
                        {measurement[field.key]} {field.key === 'weight' ? 'kg' : (measurement.unit || 'cm')}
                      </p>
                    </div>
                  )
                ))}
              </div>

              {/* Category info */}
              {measurement.category && (
                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Category:</span> {measurement.category}
                    {measurement.subcategory && ` / ${measurement.subcategory}`}
                  </p>
                </div>
              )}

              {/* Notes */}
              {measurement.notes && (
                <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-xs text-gray-500 mb-1 font-medium">Notes</p>
                  <p className="text-sm text-gray-700">{measurement.notes}</p>
                </div>
              )}

              {/* Additional info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <span className="ml-2 font-medium">{formatDate(measurement.createdAt)}</span>
                  </div>
                  {measurement.updatedAt && (
                    <div>
                      <span className="text-gray-500">Updated:</span>
                      <span className="ml-2 font-medium">{formatDate(measurement.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (!token) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please login to view orders</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Measurement Modal */}
      {showMeasurementModal && (
        <MeasurementModal 
          measurement={selectedMeasurement} 
          onClose={() => {
            setShowMeasurementModal(false);
            setSelectedMeasurement(null);
          }} 
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
          Total: <span className="font-semibold">{pagination.total}</span> orders
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Order Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>

          {/* Payment Method Filter */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Payment Method</label>
            <select
              value={filters.paymentMethod}
              onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Methods</option>
              <option value="COD">COD</option>
              <option value="PayPal">PayPal</option>
              <option value="Stripe">Stripe</option>
              <option value="Razorpay">Razorpay</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading orders...</div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              orders.map((order, index) => (
                <div
                  key={order._id || index}
                  className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-6 rounded-lg bg-white hover:shadow-md transition-shadow"
                >
                  {/* Order Icon */}
                  <div className="flex justify-center">
                    <img className="w-12 h-12" src={assets.parcel_icon} alt="Order Icon" />
                  </div>

                  {/* Order Items and Customer Info */}
                  <div className="space-y-3">
                    {/* Items List */}
                    <div className="border-b pb-3">
                      <h4 className="font-medium text-gray-800 mb-2">Items:</h4>
                      {order.items && order.items.map((item, idx) => (
                        <div key={idx} className="py-1 text-sm text-gray-700 flex items-center justify-between">
                          <div>
                            <span className="font-medium">{item.name}</span> x {item.quantity}
                            {item.size && <span className="text-gray-500"> (Size: {item.size})</span>}
                          </div>
                          {item.madeToMeasure && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded flex items-center gap-1">
                              <Ruler className="w-3 h-3" />
                              Made-to-Measure
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Customer Information */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-800">Customer:</h4>
                        {/* Show button only if order has made-to-measure items */}
                        {order.userId && hasMadeToMeasureItems(order) && (
                          <button
                            onClick={() => fetchMeasurements(order.userId)}
                            disabled={loadingMeasurements}
                            className="flex items-center gap-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="View customer measurements for made-to-measure items"
                          >
                            <Ruler className="w-3 h-3" />
                            {loadingMeasurements ? 'Loading...' : 'View Measurements'}
                          </button>
                        )}
                      </div>
                      <p className="font-medium text-sm">
                        {order.address?.firstName || 'N/A'} {order.address?.lastName || ''}
                      </p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.address?.street || 'Address not available'}</p>
                        <p>
                          {[
                            order.address?.city,
                            order.address?.state,
                            order.address?.country,
                            order.address?.zipcode
                          ].filter(Boolean).join(', ') || 'Location not available'}
                        </p>
                        {order.address?.phone && <p>Phone: {order.address.phone}</p>}
                        {order.address?.email && <p>Email: {order.address.email}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Items:</span> 
                      <span className="ml-1">{order.items?.length || 0}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Payment:</span> 
                      <span className="ml-1">{order.paymentMethod || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Paid:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        order.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.payment ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Date:</span> 
                      <span className="ml-1 text-xs">{formatDate(order.date)}</span>
                    </div>
                    {hasMadeToMeasureItems(order) && (
                      <div>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded flex items-center gap-1 w-fit">
                          <Ruler className="w-3 h-3" />
                          Has M2M Items
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Order Amount */}
                  <div className="text-center lg:text-left">
                    <div className="text-lg font-bold text-gray-800">
                      {adminCurrency}{order.amount?.toFixed(2) || '0.00'}
                    </div>
                  </div>

                  {/* Status Selector */}
                  <div className="flex flex-col items-stretch lg:items-center">
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status || 'Order Placed'}
                      className="p-2 border border-gray-300 rounded font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px] bg-white"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                    
                    {/* Current Status Badge */}
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Cancelled' || order.status === 'Refunded'
                          ? 'bg-red-100 text-red-800'
                          : order.status === 'Shipped' || order.status === 'Out for delivery'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Processing' || order.status === 'Confirmed'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status || 'Order Placed'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                const page = pagination.page <= 3 ? i + 1 : pagination.page - 2 + i;
                if (page > pagination.pages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded transition-colors ${
                      pagination.page === page 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Page Info */}
          <div className="text-center text-sm text-gray-600 mt-4 bg-gray-50 py-2 rounded">
            Showing {orders.length} of {pagination.total} orders (Page {pagination.page} of {pagination.pages})
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;