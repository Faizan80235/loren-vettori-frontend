// ==========================================
// FILE: src/admin/pages/Customers.jsx
// ==========================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Users, Mail, Calendar, ShoppingBag, DollarSign, 
  CheckCircle, XCircle, Search, Eye, Filter, Download,
  UserCheck, UserX, TrendingUp, Package, AlertCircle
} from 'lucide-react';

const Customers = ({ token }) => {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const limit = 10;

  useEffect(() => {
    loadCustomers();
    loadStats();
  }, [currentPage, sortBy, sortOrder]);

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/customers/list`,
        {
          params: {
            page: currentPage,
            limit,
            search: searchTerm,
            sortBy,
            sortOrder
          },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setCustomers(response.data.data.customers);
        setTotalPages(response.data.data.pagination.pages);
      } else {
        toast.error('Failed to load customers');
      }
    } catch (error) {
      console.error('Load customers error:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/customers/stats`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Load stats error:', error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadCustomers();
  };

  const viewCustomerDetails = async (customerId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/customers/${customerId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setSelectedCustomer(response.data.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error('View customer error:', error);
      toast.error('Failed to load customer details');
    }
  };

  const exportCustomers = () => {
    const csvData = customers.map(customer => ({
      Name: customer.name,
      Email: customer.email,
      'Email Verified': customer.isEmailVerified ? 'Yes' : 'No',
      'Registration Date': new Date(customer.createdAt).toLocaleDateString(),
      'Total Orders': customer.stats.totalOrders,
      'Total Spent': customer.stats.totalSpent,
      'Source': customer.survey?.source || 'N/A',
      'Categories': customer.survey?.categories.join(', ') || 'N/A'
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`text-${color}-600`} size={24} />
        </div>
      </div>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  if (loading && customers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="text-blue-600" size={32} />
                Customer Management
              </h1>
              <p className="text-gray-600 mt-1">View and manage all your customers</p>
            </div>
            <button
              onClick={exportCustomers}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={Users}
              title="Total Customers"
              value={stats.totalCustomers}
              color="blue"
              subtitle="Registered users"
            />
            <StatCard
              icon={UserCheck}
              title="Verified Customers"
              value={stats.verifiedCustomers}
              color="green"
              subtitle={`${((stats.verifiedCustomers / stats.totalCustomers) * 100).toFixed(0)}% verified`}
            />
            <StatCard
              icon={ShoppingBag}
              title="Active Buyers"
              value={stats.customersWithOrders}
              color="amber"
              subtitle={`${stats.conversionRate}% conversion`}
            />
            <StatCard
              icon={TrendingUp}
              title="Returning Customers"
              value={stats.returningCustomers}
              color="purple"
              subtitle="Repeat purchases"
            />
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Registration Date</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Customer</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Email Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Source</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Registered</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Orders</th>
                  <th className="text-right py-4 px-6 font-semibold text-gray-700">Total Spent</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {customer.isEmailVerified ? (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <CheckCircle size={16} />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600 text-sm">
                          <XCircle size={16} />
                          Not Verified
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {customer.survey ? (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {customer.survey.source}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">No survey</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-gray-900">{customer.stats.totalOrders}</span>
                        <span className="text-xs text-gray-500">
                          {customer.stats.completedOrders} completed
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-gray-900">
                      PKR {customer.stats.totalSpent.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => viewCustomerDetails(customer._id)}
                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Customer Detail Modal */}
        {showModal && selectedCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{selectedCustomer.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email Status</p>
                      <p className={`font-medium ${selectedCustomer.customer.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedCustomer.customer.isEmailVerified ? 'Verified' : 'Not Verified'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Registration Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(selectedCustomer.customer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Survey Data */}
                {selectedCustomer.customer.survey && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Survey Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Source</p>
                        <p className="font-medium text-gray-900">{selectedCustomer.customer.survey.source}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Referrer</p>
                        <p className="font-medium text-gray-900">
                          {selectedCustomer.customer.survey.referrer || 'None'}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 mb-2">Interested Categories</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedCustomer.customer.survey.categories.map((cat, idx) => (
                            <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Purchase Statistics</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{selectedCustomer.stats.totalOrders}</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{selectedCustomer.stats.completedOrders}</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-2xl font-bold text-red-600">{selectedCustomer.stats.cancelledOrders}</p>
                      <p className="text-sm text-gray-600">Cancelled</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">PKR {selectedCustomer.stats.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Orders</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedCustomer.orders.slice(0, 5).map((order) => (
                      <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Order #{order._id.slice(-8)}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">PKR {order.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;