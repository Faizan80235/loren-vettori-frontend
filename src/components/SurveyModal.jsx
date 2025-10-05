// src/components/SurveyModal.jsx
import React, { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { toast } from 'react-toastify';

const SurveyModal = ({ onClose, onComplete }) => {
  const [source, setSource] = useState('');
  const [referrer, setReferrer] = useState('');
  const [interestedProducts, setInterestedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const sources = ['TikTok', 'Facebook', 'Instagram', 'Friend/Family', 'Search Engine', 'Other'];
  const productCategories = ['Bags', 'Wallets', 'Jackets', 'Belts', 'Accessories'];

  const toggleProduct = (product) => {
    setInterestedProducts(prev => 
      prev.includes(product) 
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const handleSubmit = async () => {
    if (!source) {
      toast.error('Please select how you heard about us');
      return;
    }
    
    if (interestedProducts.length === 0) {
      toast.error('Please select at least one product');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      
      const response = await fetch(`${backendUrl}/api/analytics/survey`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          source, 
          referrer, 
          categories: interestedProducts 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Thank you for completing the survey!');
        localStorage.setItem('surveyCompleted', 'true');
        onComplete();
      } else {
        toast.error(data.message || 'Failed to save survey');
      }
    } catch (error) {
      console.error('Survey error:', error);
      toast.error('Failed to save survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-amber-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Welcome!</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-gray-600">Help us personalize your shopping experience</p>

          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              How did you hear about us? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {sources.map(s => (
                <label key={s} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition">
                  <input
                    type="radio"
                    name="source"
                    value={s}
                    checked={source === s}
                    onChange={(e) => setSource(e.target.value)}
                    className="mr-3 w-4 h-4 text-amber-600"
                  />
                  <span className="text-gray-700">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Who referred you? (Optional)
            </label>
            <input
              type="text"
              value={referrer}
              onChange={(e) => setReferrer(e.target.value)}
              placeholder="Enter referrer name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              What are you interested in buying? <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Select all products that interest you
            </p>
            <div className="space-y-2">
              {productCategories.map(product => (
                <label 
                  key={product} 
                  className={`flex items-center cursor-pointer p-3 rounded-lg border-2 transition ${
                    interestedProducts.includes(product) 
                      ? 'bg-amber-50 border-amber-500' 
                      : 'bg-white border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={interestedProducts.includes(product)}
                    onChange={() => toggleProduct(product)}
                    className="mr-3 w-5 h-5 text-amber-600 rounded"
                  />
                  <span className="text-gray-800 font-medium">{product}</span>
                  {interestedProducts.includes(product) && (
                    <span className="ml-auto text-amber-600 text-sm font-semibold">✓</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-md transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Continue Shopping'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            This helps us personalize your experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal;