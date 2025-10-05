


// ==========================================
// FILE: src/admin/pages/Analytics.jsx
// ==========================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { 
  Users, TrendingUp, ShoppingCart, XCircle, 
  Calendar, DollarSign, Package, BarChart3,
  TrendingDown, ArrowUpRight, ArrowDownRight,
  ShoppingBag, Target, Award, RefreshCw
} from 'lucide-react';

const Analytics = ({ token }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedChannel, setSelectedChannel] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/analytics/dashboard`,
        {
          params: { 
            startDate, 
            endDate, 
            channel: selectedChannel || undefined 
          },
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setAnalytics(response.data.data);
        toast.success('Analytics loaded successfully');
      } else {
        toast.error('Failed to load analytics');
      }
    } catch (error) {
      console.error('Analytics error:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`text-${color}-600`} size={24} />
        </div>
      </div>
      <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-500">{subtitle}</p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <BarChart3 className="mx-auto mb-4 text-gray-400" size={64} />
          <p className="text-gray-600 text-lg mb-4">No analytics data available</p>
          <button
            onClick={loadAnalytics}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const channelData = Object.entries(analytics.channelBreakdown || {}).map(([name, value]) => ({
    name,
    value
  }));

  const categoryData = Object.entries(analytics.categoryInterest || {}).map(([name, value]) => ({
    name,
    value
  }));

  const channelPerformanceData = Object.entries(analytics.channelPerformance || {}).map(([name, data]) => ({
    name,
    customers: data.customers,
    orders: data.orders,
    revenue: Number(data.revenue) || 0,
    conversion: Number(data.conversionRate) || 0,
    avgOrder: Number(data.avgOrderValue) || 0
  }));

  const COLORS = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6', '#ef4444', '#f97316', '#06b6d4'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 className="text-amber-600" size={32} />
                  <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
                </div>
                <p className="text-gray-600">Track customer acquisition, sales performance, and revenue metrics</p>
              </div>
              <button
                onClick={loadAnalytics}
                className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition shadow-md"
              >
                <RefreshCw size={18} />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Target className="inline mr-2" size={16} />
                  Filter by Channel
                </label>
                <select
                  value={selectedChannel}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">All Channels</option>
                  {channelData.map(ch => (
                    <option key={ch.name} value={ch.name}>{ch.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={loadAnalytics}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2 rounded-lg transition shadow-md hover:shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards - Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Customers"
              value={analytics.totalCustomers?.toLocaleString() || '0'}
              icon={Users}
              color="amber"
              subtitle="New customers acquired"
            />
            <StatCard
              title="Orders Placed"
              value={analytics.ordersPlaced?.toLocaleString() || '0'}
              icon={ShoppingCart}
              color="green"
              subtitle="Successfully completed"
            />
            <StatCard
              title="Total Revenue"
              value={`PKR ${Number(analytics.totalRevenue || 0).toLocaleString()}`}
              icon={DollarSign}
              color="blue"
              subtitle="Gross sales"
            />
            <StatCard
              title="Avg Order Value"
              value={`PKR ${Number(analytics.averageOrderValue || 0).toLocaleString()}`}
              icon={TrendingUp}
              color="purple"
              subtitle="Per transaction"
            />
          </div>

          {/* Secondary Metrics - Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Award className="text-green-600" size={20} />
                <p className="text-gray-600 text-sm font-medium">Conversion Rate</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{analytics.conversionRate || 0}%</p>
              <p className="text-xs text-gray-500 mt-1">Customers to orders</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="text-red-600" size={20} />
                <p className="text-gray-600 text-sm font-medium">Orders Cancelled</p>
              </div>
              <p className="text-2xl font-bold text-red-600">{analytics.ordersCancelled || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Refunded or cancelled</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <TrendingDown className="text-orange-600" size={20} />
                <p className="text-gray-600 text-sm font-medium">Cancellation Rate</p>
              </div>
              <p className="text-2xl font-bold text-orange-600">{analytics.cancellationRate || 0}%</p>
              <p className="text-xs text-gray-500 mt-1">Of total orders</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <ShoppingBag className="text-indigo-600" size={20} />
                <p className="text-gray-600 text-sm font-medium">Returning Rate</p>
              </div>
              <p className="text-2xl font-bold text-indigo-600">{analytics.returningCustomerRate || 0}%</p>
              <p className="text-xs text-gray-500 mt-1">Repeat purchases</p>
            </div>
          </div>

          {/* Channel Performance Table */}
          {channelPerformanceData.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 overflow-hidden">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target size={24} className="text-amber-600" />
                Channel Performance Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Channel</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Customers</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Orders</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Revenue (PKR)</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Conversion</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelPerformanceData.map((channel, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-medium text-gray-900">{channel.name}</td>
                        <td className="text-right py-3 px-4 text-gray-700">{channel.customers}</td>
                        <td className="text-right py-3 px-4 text-gray-700">{channel.orders}</td>
                        <td className="text-right py-3 px-4 font-semibold text-blue-600">
                          {channel.revenue.toLocaleString()}
                        </td>
                        <td className="text-right py-3 px-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            {channel.conversion}%
                          </span>
                        </td>
                        <td className="text-right py-3 px-4 text-gray-700">
                          {channel.avgOrder.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Channel Distribution Pie Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users size={24} className="text-amber-600" />
                Customer Acquisition Channels
              </h2>
              {channelData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={110}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[320px] flex items-center justify-center text-gray-500">
                  No channel data available
                </div>
              )}
            </div>

            {/* Category Interest Bar Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={24} className="text-purple-600" />
                Product Category Interest
              </h2>
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={90} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[320px] flex items-center justify-center text-gray-500">
                  No category data available
                </div>
              )}
            </div>
          </div>

          {/* Daily Sales Trend */}
          {analytics.dailyTrend && analytics.dailyTrend.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp size={24} className="text-blue-600" />
                Daily Sales Trend (Last 30 Days)
              </h2>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={analytics.dailyTrend}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    name="Revenue (PKR)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Monthly Growth Trend */}
          {analytics.monthlyTrend && analytics.monthlyTrend.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 size={24} className="text-green-600" />
                Monthly Growth Trend
              </h2>
              <ResponsiveContainer width="100%" height={380}>
                <LineChart data={analytics.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthLabel" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    name="New Customers"
                    dot={{ r: 5 }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="#10b981" 
                    strokeWidth={3} 
                    name="Orders"
                    dot={{ r: 5 }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    name="Revenue (PKR)"
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Channel Revenue Comparison */}
          {channelPerformanceData.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign size={24} className="text-amber-600" />
                Revenue & Orders by Channel
              </h2>
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={channelPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="customers" fill="#f59e0b" name="Customers" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="orders" fill="#10b981" name="Orders" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;