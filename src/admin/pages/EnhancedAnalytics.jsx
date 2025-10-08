import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../../context/Analyticscontext';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Users, UserPlus, ShoppingCart, TrendingUp, Globe, Activity,
  Instagram, Facebook, Youtube, Twitter, RefreshCw, DollarSign,
  Package, RotateCcw, MapPin, Smartphone, Monitor, Calendar, Clock
} from 'lucide-react';

const EnhancedAnalyticsDashboard = () => {
  const { trackPageView, trackCustomEvent } = useAnalytics();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30daysAgo-today');
  const [activeTab, setActiveTab] = useState('overview');
  const [realtimeFilter, setRealtimeFilter] = useState('7d'); // NEW: Time filter for real-time data
  
  const [realtimeData, setRealtimeData] = useState({
    activeUsers: 0,
    activeUsersList: [],
    locations: [],
    trafficSources: [],
    recentRegistrations: [],
    recentLogins: [],
    summary: null
  });

  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    trackPageView('/admin/analytics', 'Analytics Dashboard');
  }, [trackPageView]);

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  useEffect(() => {
    fetchRealtimeData();
    const interval = setInterval(fetchRealtimeData, 30000);
    return () => clearInterval(interval);
  }, [realtimeFilter]); // Re-fetch when filter changes

  // ✅ NEW: Track user session on dashboard
  useEffect(() => {
    const trackDashboardSession = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      if (userId && token) {
        try {
          // Track page view activity in MongoDB
          await fetch(`${backendUrl}/api/realtime-analytics/track`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId,
              email: localStorage.getItem('userEmail') || 'admin@example.com',
              activityType: 'page_view',
              trafficSource: {
                source: 'direct',
                medium: 'none',
                campaign: 'admin_dashboard',
                type: 'direct'
              },
              device: {
                type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
                browser: getBrowserName(),
                os: getOSName()
              },
              metadata: {
                page: 'analytics_dashboard',
                activeTab: activeTab
              }
            })
          });
          
          console.log('✅ Dashboard session tracked in MongoDB');
        } catch (error) {
          console.error('⚠️ Session tracking error:', error);
        }
      }
    };
    
    trackDashboardSession();
  }, [activeTab]);

  // Helper functions for device detection
  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  const getOSName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Win')) return 'Windows';
    if (userAgent.includes('Mac')) return 'MacOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    return 'Unknown';
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    
    trackCustomEvent('admin_fetch_analytics', {
      date_range: dateRange,
      timestamp: new Date().toISOString()
    });

    try {
      const token = localStorage.getItem('token');
      const [start, end] = dateRange.split('-');
      
      const response = await fetch(
        `${backendUrl}/api/analytics/combined?startDate=${start}&endDate=${end}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const result = await response.json();
      if (result.success) {
        setData(result.data);
        
        trackCustomEvent('analytics_data_loaded', {
          total_users: result.data.overview?.totalUsers,
          total_revenue: result.data.conversions?.revenue
        });
      }
    } catch (error) {
      console.error('Error:', error);
      
      trackCustomEvent('analytics_fetch_error', {
        error_message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRealtimeData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('🔄 Fetching real-time data...');
      
      // Track dashboard view in GA4
      trackCustomEvent('admin_dashboard_view', {
        timestamp: new Date().toISOString()
      });
      
      const [activeUsers, locations, sources, registrations, logins, summary] = await Promise.all([
        fetch(`${backendUrl}/api/realtime-analytics/active-users`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json()).catch(e => {
          console.error('Active users fetch error:', e);
          return { success: false, count: 0, users: [] };
        }),
        
        fetch(`${backendUrl}/api/realtime-analytics/locations?timeRange=${realtimeFilter}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json()).catch(e => {
          console.error('Locations fetch error:', e);
          return { success: false, data: [] };
        }),
        
        fetch(`${backendUrl}/api/realtime-analytics/traffic-sources?timeRange=${realtimeFilter}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json()).catch(e => {
          console.error('Traffic sources fetch error:', e);
          return { success: false, data: [] };
        }),
        
        fetch(`${backendUrl}/api/realtime-analytics/recent-registrations?limit=20`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json()).catch(e => {
          console.error('Registrations fetch error:', e);
          return { success: false, data: [] };
        }),
        
        fetch(`${backendUrl}/api/realtime-analytics/recent-logins?limit=20`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json()).catch(e => {
          console.error('Logins fetch error:', e);
          return { success: false, data: [] };
        }),
        
        fetch(`${backendUrl}/api/realtime-analytics/summary`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json()).catch(e => {
          console.error('Summary fetch error:', e);
          return { success: false, data: null };
        })
      ]);
      
      setRealtimeData({
        activeUsers: activeUsers.count || 0,
        activeUsersList: activeUsers.users || [],
        locations: locations.data || [],
        trafficSources: sources.data || [],
        recentRegistrations: registrations.data || [],
        recentLogins: logins.data || [],
        summary: summary.data || null
      });
      
      console.log('✅ Real-time data updated:', {
        activeUsers: activeUsers.count,
        locations: locations.data?.length,
        sources: sources.data?.length,
        registrations: registrations.data?.length,
        logins: logins.data?.length
      });
      
      // Track data fetch success in GA4
      trackCustomEvent('realtime_data_loaded', {
        active_users: activeUsers.count,
        total_locations: locations.data?.length || 0,
        total_sources: sources.data?.length || 0,
        recent_registrations: registrations.data?.length || 0
      });
    } catch (error) {
      console.error('❌ Realtime data error:', error);
      
      // Track error in GA4
      trackCustomEvent('realtime_data_error', {
        error_message: error.message
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Track tab change in both MongoDB and GA4
    trackCustomEvent('analytics_tab_change', {
      tab_name: tab,
      previous_tab: activeTab,
      timestamp: new Date().toISOString()
    });
    
    console.log('📊 Tab changed to:', tab);
  };

  // const handleRealtimeFilterChange = (filter) => {
  //   setRealtimeFilter(filter);
    
  //   // Track filter change in GA4
  //   trackCustomEvent('realtime_filter_change', {
  //     filter: filter,
  //     previous_filter: realtimeFilter,
  //     timestamp: new Date().toISOString()
  //   });
    
  //   console.log('⏰ Realtime filter changed to:', filter);
  // };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    
    // Track date range change in GA4
    trackCustomEvent('analytics_date_range_change', {
      date_range: range,
      previous_range: dateRange,
      timestamp: new Date().toISOString()
    });
    
    console.log('📅 Date range changed to:', range);
  };

  const handleRealtimeFilterChange = (filter) => {
    setRealtimeFilter(filter);
    
    // Track filter change in GA4
    trackCustomEvent('realtime_filter_change', {
      filter: filter,
      previous_filter: realtimeFilter,
      timestamp: new Date().toISOString()
    });
    
    // console.log('⏰ Realtime filter changed to:', filter);
  };

  const getFilterLabel = (filter) => {
    const labels = {
      '24h': 'Last 24 Hours',
      '3d': 'Last 3 Days',
      '7d': 'Last 7 Days',
      '30d': 'Last 30 Days'
    };
    return labels[filter] || filter;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600 text-xl">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const overview = data?.overview || {};
  const realtime = data?.realtime || {};
  const trafficSources = data?.trafficSources || [];
  const geographic = data?.geographic || [];
  const conversions = data?.conversions || {};

  const socialSources = trafficSources.filter(s => 
    ['instagram', 'facebook', 'tiktok', 'twitter', 'youtube', 'linkedin'].some(social => 
      s.source.toLowerCase().includes(social)
    )
  );

  const searchSources = trafficSources.filter(s => 
    ['google', 'bing', 'yahoo', 'duckduckgo'].some(search => 
      s.source.toLowerCase().includes(search)
    )
  );

  const getSocialIcon = (source) => {
    const s = source.toLowerCase();
    if (s.includes('instagram')) return <Instagram className="w-5 h-5" />;
    if (s.includes('facebook')) return <Facebook className="w-5 h-5" />;
    if (s.includes('tiktok')) return <div className="w-5 h-5 font-bold">TT</div>;
    if (s.includes('twitter')) return <Twitter className="w-5 h-5" />;
    if (s.includes('youtube')) return <Youtube className="w-5 h-5" />;
    return <Globe className="w-5 h-5" />;
  };

  const getSocialColor = (source) => {
    const s = source.toLowerCase();
    if (s.includes('instagram')) return 'from-purple-500 to-pink-500';
    if (s.includes('facebook')) return 'from-blue-600 to-blue-400';
    if (s.includes('tiktok')) return 'from-black to-gray-700';
    if (s.includes('twitter')) return 'from-blue-400 to-blue-300';
    if (s.includes('youtube')) return 'from-red-600 to-red-400';
    return 'from-gray-500 to-gray-400';
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600">Track users, orders, and traffic sources in real-time</p>
          </div>
          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="7daysAgo-today">Last 7 Days (GA4)</option>
              <option value="30daysAgo-today">Last 30 Days (GA4)</option>
              <option value="90daysAgo-today">Last 90 Days (GA4)</option>
            </select>
            <button
              onClick={() => {
                fetchAnalytics();
                fetchRealtimeData();
              }}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between items-center border-b border-gray-200">
          <div className="flex gap-4">
            {['overview', 'live', 'social', 'registrations'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-3 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Time Filter - Only show on specific tabs */}
          {['live', 'registrations'].includes(activeTab) && (
            <div className="flex items-center gap-2 pb-2">
              <span className="text-sm text-gray-600">Time Range:</span>
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {['24h', '3d', '7d', '30d'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleRealtimeFilterChange(filter)}
                    className={`px-3 py-1 text-xs font-medium rounded transition ${
                      realtimeFilter === filter
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filter === '24h' ? '24h' : filter === '3d' ? '3d' : filter === '7d' ? '7d' : '30d'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ UPDATED: Banner with dynamic time range */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm mb-1 flex items-center gap-2">
              <span className="animate-pulse">🟢</span> Active Users ({getFilterLabel(realtimeFilter)})
            </p>
            <p className="text-5xl font-bold">{realtimeData.activeUsers}</p>
            <p className="text-green-100 text-sm mt-2">
              Users who were active in the {getFilterLabel(realtimeFilter).toLowerCase()}
            </p>
            <p className="text-green-100 text-xs mt-1">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          <Activity className="w-20 h-20 text-green-100 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div 
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
          onClick={() => trackCustomEvent('stat_card_clicked', { card: 'total_users' })}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold">+12%</span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{overview.totalUsers?.toLocaleString() || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Unique visitors</p>
        </div>

        <div 
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
          onClick={() => trackCustomEvent('stat_card_clicked', { card: 'new_registrations' })}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <UserPlus className="w-8 h-8 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold">Live</span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Today's Registrations</h3>
          <p className="text-3xl font-bold text-gray-900">
            {realtimeData.summary?.todayRegistrations || 0}
          </p>
          <p className="text-xs text-gray-500 mt-2">New user signups today</p>
        </div>

        <div 
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
          onClick={() => trackCustomEvent('stat_card_clicked', { card: 'orders' })}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-purple-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold">+8%</span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Orders Placed</h3>
          <p className="text-3xl font-bold text-gray-900">{conversions.transactions?.toLocaleString() || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Total transactions</p>
        </div>

        <div 
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
          onClick={() => trackCustomEvent('stat_card_clicked', { card: 'revenue' })}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <DollarSign className="w-8 h-8 text-orange-600" />
            </div>
            <span className="text-green-600 text-sm font-semibold">+22%</span>
          </div>
          <h3 className="text-gray-500 text-sm mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">${conversions.revenue?.toLocaleString() || 0}</p>
          <p className="text-xs text-gray-500 mt-2">Total sales value</p>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-600" />
              Traffic Sources
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficSources.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3B82F6" name="Users" />
                <Bar dataKey="sessions" fill="#10B981" name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Search vs Social Traffic</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Search Engines', value: searchSources.reduce((sum, s) => sum + s.users, 0) },
                    { name: 'Social Media', value: socialSources.reduce((sum, s) => sum + s.users, 0) },
                    { name: 'Direct', value: trafficSources.filter(s => s.source === '(direct)').reduce((sum, s) => sum + s.users, 0) }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ✅ UPDATED: Live Tab title changed to 24 Hours */}
      {activeTab === 'live' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-600" />
              Active Users ({getFilterLabel(realtimeFilter)})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {realtimeData.activeUsersList.length > 0 ? (
                realtimeData.activeUsersList.map((user, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{user.email}</p>
                      <span className="text-xs text-gray-500">{formatTime(user.lastActivity)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {user.location?.city || 'Unknown'}, {user.location?.country || 'Unknown'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {user.trafficSource?.source || 'direct'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Activity className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-semibold mb-1">No Active Users</p>
                  <p className="text-sm">No users have been active in {getFilterLabel(realtimeFilter).toLowerCase()}</p>
                  <p className="text-xs mt-2 text-gray-400">Data updates every 30 seconds</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-red-600" />
              User Locations ({getFilterLabel(realtimeFilter)})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {realtimeData.locations.length > 0 ? (
                realtimeData.locations.map((location, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{location.country}</p>
                        <p className="text-sm text-gray-500">{location.city}</p>
                      </div>
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Users</p>
                        <p className="text-lg font-bold text-gray-900">{location.uniqueUsers}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Activities</p>
                        <p className="text-lg font-bold text-gray-900">{location.totalActivities}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-semibold mb-1">No Location Data</p>
                  <p className="text-sm">Location tracking will appear here once users visit</p>
                  <p className="text-xs mt-2 text-gray-400">Time Range: {getFilterLabel(realtimeFilter)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-green-600" />
              Recent Registrations
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {realtimeData.recentRegistrations.length > 0 ? (
                realtimeData.recentRegistrations.map((reg, index) => (
                  <div key={index} className="border-l-4 border-green-500 bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{reg.email}</p>
                      <span className="text-xs text-gray-500">{formatTime(reg.timestamp)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        {getSocialIcon(reg.trafficSource?.source || 'direct')}
                        <span className="capitalize">{reg.trafficSource?.source || 'direct'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {reg.location?.country || 'Unknown'}
                      </div>
                      <div className="flex items-center gap-1">
                        {reg.device?.type === 'mobile' ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                        {reg.device?.type || 'desktop'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <UserPlus className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-semibold mb-1">No Registrations Yet</p>
                  <p className="text-sm">New user registrations will appear here</p>
                  <p className="text-xs mt-2 text-gray-400">Showing recent 20 registrations</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Traffic Sources ({getFilterLabel(realtimeFilter)})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {realtimeData.trafficSources.length > 0 ? (
                realtimeData.trafficSources.map((source, index) => {
                  const bgColor = getSocialColor(source.source);
                  return (
                    <div key={index} className={`bg-gradient-to-r ${bgColor} rounded-lg p-4 text-white`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getSocialIcon(source.source)}
                          <div>
                            <p className="font-semibold capitalize">{source.source}</p>
                            <p className="text-xs opacity-75">{source.medium}</p>
                          </div>
                        </div>
                        <span className="text-xs opacity-75">{source.type}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs opacity-75">Users</p>
                          <p className="text-xl font-bold">{source.uniqueUsers}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75">Registrations</p>
                          <p className="text-xl font-bold">{source.registrations}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75">Logins</p>
                          <p className="text-xl font-bold">{source.logins}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Globe className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="text-lg font-semibold mb-1">No Traffic Data</p>
                  <p className="text-sm">Traffic source analytics will appear here</p>
                  <p className="text-xs mt-2 text-gray-400">Time Range: {getFilterLabel(realtimeFilter)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'social' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Social Media Traffic</h3>
            <div className="space-y-4">
              {socialSources.length > 0 ? socialSources.map((source, index) => (
                <div key={index} className={`bg-gradient-to-r ${getSocialColor(source.source)} rounded-lg p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getSocialIcon(source.source)}
                      <span className="font-semibold capitalize">{source.source}</span>
                    </div>
                    <span className="text-sm opacity-90">{source.medium}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-xs opacity-75">Users</p>
                      <p className="text-xl font-bold">{source.users.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Sessions</p>
                      <p className="text-xl font-bold">{source.sessions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Orders</p>
                      <p className="text-xl font-bold">{source.conversions}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <Globe className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No social media traffic yet</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Search Engine Traffic</h3>
            <div className="space-y-4">
              {searchSources.map((source, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold capitalize">{source.source}</p>
                        <p className="text-xs text-gray-500">{source.medium}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Users</p>
                      <p className="text-lg font-bold text-gray-900">{source.users.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sessions</p>
                      <p className="text-lg font-bold text-gray-900">{source.sessions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Orders</p>
                      <p className="text-lg font-bold text-gray-900">{source.conversions}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-red-600" />
          Geographic Distribution
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geographic.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#3B82F6" name="Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {geographic.slice(0, 15).map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-semibold">{location.country}</p>
                    <p className="text-xs text-gray-500">{location.city}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{location.users.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">users</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 bg-white rounded-xl p-4 shadow">
        <p className="font-semibold">Last updated: {new Date().toLocaleString()}</p>
        <p className="mt-1">Real-time data refreshes automatically every 30 seconds</p>
        <p className="mt-1 text-xs">
          Active Users (24h): {realtimeData.activeUsers} | 
          Today's Registrations: {realtimeData.summary?.todayRegistrations || 0} | 
          Today's Logins: {realtimeData.summary?.todayLogins || 0}
        </p>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsDashboard;