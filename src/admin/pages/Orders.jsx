import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, adminCurrency } from '../Config'
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

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

  const fetchAllOrders = async (page = 1, currentFilters = filters) => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString()
      });

      if (currentFilters.status) {
        params.append('status', currentFilters.status);
      }
      if (currentFilters.paymentMethod) {
        params.append('paymentMethod', currentFilters.paymentMethod);
      }

      // Fixed: Use GET method and correct Authorization header
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
        setPagination(response.data.pagination || {
          page: 1,
          pages: 1,
          total: 0,
          limit: 10
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

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    
    try {
      // Fixed: Use correct Authorization header
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
        // Update the local state instead of refetching all orders
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

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    fetchAllOrders(1, newFilters); // Reset to page 1 when filtering
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchAllOrders(newPage);
    }
  };

  const clearFilters = () => {
    const clearedFilters = { status: '', paymentMethod: '' };
    setFilters(clearedFilters);
    fetchAllOrders(1, clearedFilters);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  if (!token) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please login to view orders</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="text-sm text-gray-600">
          Total: {pagination.total} orders
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Order Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Order Placed">Order Placed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={filters.paymentMethod}
              onChange={(e) => handleFilterChange('paymentMethod', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Methods</option>
              <option value="COD">COD</option>
              <option value="Stripe">Stripe</option>
              <option value="Razorpay">Razorpay</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-600">Loading orders...</div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No orders found
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

                  {/* Order Items and Address */}
                  <div className="space-y-2">
                    <div className="border-b pb-2">
                      <h4 className="font-medium text-gray-800 mb-1">Items:</h4>
                      {order.items && order.items.map((item, idx) => (
                        <p className="py-0.5 text-sm text-gray-700" key={idx}>
                          <span className="font-medium">{item.name}</span> x {item.quantity}
                          {item.size && <span className="text-gray-500"> (Size: {item.size})</span>}
                          {idx < order.items.length - 1 && <span className="text-gray-400">, </span>}
                        </p>
                      ))}
                    </div>

                    {/* Customer Information */}
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Customer:</h4>
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
                      <span className="font-medium">Items:</span> {order.items?.length || 0}
                    </div>
                    <div>
                      <span className="font-medium">Payment:</span> {order.paymentMethod || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Paid:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        order.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.payment ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {formatDate(order.date)}
                    </div>
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
                      className="p-2 border rounded font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    
                    {/* Current Status Badge */}
                    <div className="mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Cancelled'
                          ? 'bg-red-100 text-red-800'
                          : order.status === 'Shipped' || order.status === 'Out for Delivery'
                          ? 'bg-blue-100 text-blue-800'
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
                className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    className={`px-3 py-2 border rounded ${
                      pagination.page === page 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {/* Page Info */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Showing {orders.length} of {pagination.total} orders (Page {pagination.page} of {pagination.pages})
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
