import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { token, currency, backendUrl, getImageUrl } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setError('Please login to view orders');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { token },
      });

      if (response.data.success) {
        const allOrderItems = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrderItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
              orderId: order._id,
              paypalOrderId: order.paypalOrderId,
              paypalCaptureId: order.paypalCaptureId,
            });
          });
        });
        setOrderData(allOrderItems.reverse());
      } else {
        throw new Error(response.data.message || 'Failed to load orders');
      }
    } catch (err) {
      console.error('Error loading orders:', err);
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodDisplay = (method) =>
    ({
      PayPal: '💳 PayPal',
      Stripe: '💳 Stripe',
      Razorpay: '💳 Razorpay',
      COD: '💵 Cash on Delivery',
      'Cash on Delivery': '💵 Cash on Delivery',
    }[method] || method);

  const getStatusColor = (status) =>
    ({
      'Order Placed': 'bg-blue-500',
      Processing: 'bg-yellow-500',
      Shipped: 'bg-orange-500',
      Delivered: 'bg-green-500',
      Cancelled: 'bg-red-500',
      Refunded: 'bg-gray-500',
    }[status] || 'bg-gray-500');

  const getPaymentStatus = (payment, method) =>
    method === 'COD' || method === 'Cash on Delivery'
      ? '🔄 Pending'
      : payment
      ? '✅ Paid'
      : '❌ Failed';

  // Helper function to get the product image using context logic
const getProductImageUrl = (item) => {
  // The API always returns item.image as an array of string URLs
  if (Array.isArray(item.image) && item.image.length > 0 && item.image[0]) {
    return getImageUrl(item.image[0]);   // use the first valid string
  }

  // If you ever allow a single string instead of an array
  if (typeof item.image === 'string' && item.image.trim() !== '') {
    return getImageUrl(item.image);
  }

  // Fallback to a placeholder if nothing valid
  return getImageUrl('placeholder.png');
};


  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-4 text-gray-600">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>
        <div className="text-center py-16">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={loadOrderData}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orderData.length === 0) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>
        <div className="text-center py-16">
          <div className="text-gray-500 text-lg">No orders found</div>
          <p className="text-gray-400 mt-2">
            Start shopping to see your orders here!
          </p>
          <button
            onClick={() => (window.location.href = '/collection')}
            className="bg-black text-white px-6 py-2 rounded mt-4 hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="mb-4 text-gray-600">
        Total Orders: {orderData.length}
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gray-50 px-4 rounded-lg transition-colors"
          >
            <div className="flex items-start gap-6 text-sm">
      
              <div className="flex-1">
                <p className="sm:text-base font-medium mb-2">{item.name}</p>

                <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                  <span className="font-semibold text-green-600">
                    {currency}
                    {item.price}
                  </span>
                  <span>Qty: {item.quantity}</span>
                  <span>Size: {item.size}</span>
                </div>

                <div className="space-y-1 text-xs text-gray-500">
                  <p>
                    <span className="font-medium">Date:</span>
                    <span className="ml-2">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Payment:</span>
                    <span className="ml-2">
                      {getPaymentMethodDisplay(item.paymentMethod)}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span className="ml-2">
                      {getPaymentStatus(item.payment, item.paymentMethod)}
                    </span>
                  </p>

                  {item.paymentMethod === 'PayPal' && (
                    <div className="text-xs text-blue-600 mt-1">
                      {item.paypalCaptureId && (
                        <p>PayPal ID: {item.paypalCaptureId.slice(-8)}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:w-1/3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-3 h-3 rounded-full ${getStatusColor(
                    item.status
                  )}`}
                ></p>
                <p className="text-sm md:text-base font-medium">
                  {item.status}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={loadOrderData}
                  className="border border-gray-300 px-3 py-1 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                >
                  🔄 Refresh
                </button>

                {item.paymentMethod === 'PayPal' && item.paypalOrderId && (
                  <button
                    onClick={() => {
                      alert(`PayPal Order ID: ${item.paypalOrderId}`);
                    }}
                    className="border border-blue-300 px-3 py-1 text-xs font-medium rounded text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    💳 PayPal Info
                  </button>
                )}

                <button
                  className="border border-gray-300 px-3 py-1 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    alert(`Tracking order: ${item.orderId}`);
                  }}
                >
                  📦 Track
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={loadOrderData}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          🔄 Refresh Orders
        </button>
      </div>
    </div>
  );
};

export default Orders;