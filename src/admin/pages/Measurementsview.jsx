import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../Config';
import { toast } from 'react-toastify';
import { Ruler, User, Search, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

const Measurements = ({ token }) => {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    subcategory: ''
  });

  // Fetch all measurements
  const fetchMeasurements = async (page = 1) => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });

      if (filters.category) {
        params.append('category', filters.category);
      }
      if (filters.subcategory) {
        params.append('subcategory', filters.subcategory);
      }

      const response = await axios.get(
        `${backendUrl}/api/measurements/all?${params.toString()}`,
        { 
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setMeasurements(response.data.data || []);
        setPagination(response.data.pagination || {
          page: 1,
          pages: 1,
          total: 0
        });
      } else {
        toast.error(response.data.message || 'Failed to fetch measurements');
      }
    } catch (error) {
      console.error('Fetch measurements error:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
      } else if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to fetch measurements');
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle row expansion
  const toggleRow = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchMeasurements(newPage);
    }
  };

  // Filter measurements by search
  const filteredMeasurements = measurements.filter(measurement => {
    const searchLower = searchTerm.toLowerCase();
    const userName = measurement.userId?.name?.toLowerCase() || '';
    const userEmail = measurement.userId?.email?.toLowerCase() || '';
    return userName.includes(searchLower) || userEmail.includes(searchLower);
  });

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

  // Initial fetch
  useEffect(() => {
    fetchMeasurements();
  }, [token]);

  // Measurement fields configuration
  const measurementFields = [
    { key: 'chest', label: 'Chest', icon: '👔' },
    { key: 'height', label: 'Height', icon: '📏' },
    { key: 'naturalWaist', label: 'Natural Waist', icon: '⭕' },
    { key: 'weight', label: 'Weight', icon: '⚖️' },
    { key: 'lowerWaist', label: 'Lower Waist', icon: '⭕' },
    { key: 'shoulder', label: 'Shoulder', icon: '👐' },
    { key: 'hips', label: 'Hips', icon: '👖' },
    { key: 'sleeves', label: 'Sleeves', icon: '👕' }
  ];

  if (!token) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please login to view measurements</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Ruler className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Customer Measurements</h2>
            <p className="text-sm text-gray-600">View and manage customer measurements</p>
          </div>
        </div>
        <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
          Total: <span className="font-semibold text-gray-800">{pagination.total}</span> measurements
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
            <select
              value={filters.category}
              onChange={(e) => {
                setFilters({ ...filters, category: e.target.value });
                fetchMeasurements(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Subcategory</label>
            <select
              value={filters.subcategory}
              onChange={(e) => {
                setFilters({ ...filters, subcategory: e.target.value });
                fetchMeasurements(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subcategories</option>
              <option value="Shirts">Shirts</option>
              <option value="Pants">Pants</option>
              <option value="Suits">Suits</option>
              <option value="Dresses">Dresses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Measurements List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-600">Loading measurements...</div>
        </div>
      ) : (
        <>
          {filteredMeasurements.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <Ruler className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No measurements found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMeasurements.map((measurement) => (
                <div
                  key={measurement._id}
                  className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Header Row */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleRow(measurement._id)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-full">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {measurement.userId?.name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {measurement.userId?.email || 'No email'}
                          </p>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="hidden md:flex gap-4 ml-auto mr-4">
                        {measurement.category && (
                          <div className="text-sm">
                            <span className="text-gray-500">Category:</span>
                            <span className="ml-1 font-medium text-gray-700">
                              {measurement.category}
                            </span>
                          </div>
                        )}
                        <div className="text-sm">
                          <span className="text-gray-500">Unit:</span>
                          <span className="ml-1 font-medium text-gray-700">
                            {measurement.unit || 'cm'}
                          </span>
                        </div>
                        <div className="text-sm flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {formatDate(measurement.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expand Icon */}
                    <button className="p-1 hover:bg-gray-100 rounded">
                      {expandedRows.includes(measurement._id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Expanded Details */}
                  {expandedRows.includes(measurement._id) && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      {/* Measurements Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {measurementFields.map(field => (
                          measurement[field.key] && (
                            <div 
                              key={field.key} 
                              className="p-3 bg-white rounded border border-gray-200"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-lg">{field.icon}</span>
                                <p className="text-xs text-gray-500 font-medium">{field.label}</p>
                              </div>
                              <p className="font-semibold text-gray-900">
                                {measurement[field.key]}{' '}
                                {field.key === 'weight' ? 'kg' : (measurement.unit || 'cm')}
                              </p>
                            </div>
                          )
                        ))}
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-2">
                        {measurement.subcategory && (
                          <div className="p-3 bg-blue-50 rounded border border-blue-200">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Subcategory:</span>{' '}
                              {measurement.subcategory}
                            </p>
                          </div>
                        )}

                        {measurement.notes && (
                          <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                            <p className="text-xs text-gray-500 font-medium mb-1">Notes:</p>
                            <p className="text-sm text-gray-700">{measurement.notes}</p>
                          </div>
                        )}

                        {measurement.madeToMeasure && (
                          <div className="p-3 bg-green-50 rounded border border-green-200">
                            <p className="text-sm text-green-800 font-medium">
                              ✓ Made-to-Measure Enabled
                            </p>
                          </div>
                        )}

                        {/* Timestamps */}
                        <div className="flex gap-4 text-xs text-gray-500 pt-2 border-t border-gray-200">
                          <div>
                            <span className="font-medium">Created:</span>{' '}
                            {formatDate(measurement.createdAt)}
                          </div>
                          {measurement.updatedAt && measurement.updatedAt !== measurement.createdAt && (
                            <div>
                              <span className="font-medium">Updated:</span>{' '}
                              {formatDate(measurement.updatedAt)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

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
            Showing {filteredMeasurements.length} of {pagination.total} measurements 
            (Page {pagination.page} of {pagination.pages})
          </div>
        </>
      )}
    </div>
  );
};

export default Measurements;