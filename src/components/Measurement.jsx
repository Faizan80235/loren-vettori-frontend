import React, { useState } from 'react';
import { X, Ruler, User, Save } from 'lucide-react';

const MeasurementModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  productCategory,
  productSubcategory,
  loading = false,
  existingMeasurements = null
}) => {
  const [measurements, setMeasurements] = useState({
    // Universal measurements
    height: existingMeasurements?.height || '',
    weight: existingMeasurements?.weight || '',
    
    // Upper body
    chest: existingMeasurements?.chest || '',
    waist: existingMeasurements?.waist || '',
    shoulder: existingMeasurements?.shoulder || '',
    armLength: existingMeasurements?.armLength || '',
    neck: existingMeasurements?.neck || '',
    
    // Lower body
    hip: existingMeasurements?.hip || '',
    inseam: existingMeasurements?.inseam || '',
    thigh: existingMeasurements?.thigh || '',
    
    // Foot measurements (for shoes)
    footLength: existingMeasurements?.footLength || '',
    footWidth: existingMeasurements?.footWidth || '',
    
    // Additional notes
    notes: existingMeasurements?.notes || ''
  });

  const [errors, setErrors] = useState({});
  const [unit, setUnit] = useState(existingMeasurements?.unit || 'cm');

  // Define which measurements are relevant for each category/subcategory
  const getRelevantMeasurements = () => {
    const subcategory = productSubcategory?.toLowerCase();
    const category = productCategory?.toLowerCase();

    if (subcategory === 'shoes') {
      return {
        universal: ['height', 'weight'],
        specific: ['footLength', 'footWidth'],
        labels: {
          footLength: 'Foot Length',
          footWidth: 'Foot Width'
        }
      };
    } else if (subcategory === 'jackets') {
      return {
        universal: ['height', 'weight'],
        specific: ['chest', 'waist', 'shoulder', 'armLength'],
        labels: {
          chest: 'Chest',
          waist: 'Waist',
          shoulder: 'Shoulder Width',
          armLength: 'Arm Length'
        }
      };
    }

    // Default measurements for other categories
    return {
      universal: ['height', 'weight'],
      specific: ['chest', 'waist', 'hip'],
      labels: {
        chest: 'Chest',
        waist: 'Waist',
        hip: 'Hip'
      }
    };
  };

  const relevantMeasurements = getRelevantMeasurements();

  const handleInputChange = (field, value) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateMeasurements = () => {
    const newErrors = {};
    
    // Validate universal measurements
    relevantMeasurements.universal.forEach(field => {
      if (!measurements[field] || measurements[field].trim() === '') {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else if (isNaN(measurements[field]) || parseFloat(measurements[field]) <= 0) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be a positive number`;
      }
    });

    // Validate specific measurements
    relevantMeasurements.specific.forEach(field => {
      if (!measurements[field] || measurements[field].trim() === '') {
        const label = relevantMeasurements.labels[field] || field;
        newErrors[field] = `${label} is required`;
      } else if (isNaN(measurements[field]) || parseFloat(measurements[field]) <= 0) {
        const label = relevantMeasurements.labels[field] || field;
        newErrors[field] = `${label} must be a positive number`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateMeasurements()) {
      const measurementData = {
        ...measurements,
        unit,
        category: productCategory,
        subcategory: productSubcategory,
        timestamp: new Date().toISOString()
      };
      
      onSave(measurementData);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Body Measurements</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <User className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900">Why do we need your measurements?</h3>
                <p className="text-sm text-blue-700 mt-1">
                  To ensure the best fit for your {productSubcategory?.toLowerCase() || 'item'}, 
                  we need your body measurements. This helps us recommend the right size and 
                  reduces the likelihood of returns.
                </p>
              </div>
            </div>
          </div>

          {/* Unit Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Measurement Unit
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cm"
                  checked={unit === 'cm'}
                  onChange={(e) => setUnit(e.target.value)}
                  className="mr-2"
                />
                Centimeters (cm)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="in"
                  checked={unit === 'in'}
                  onChange={(e) => setUnit(e.target.value)}
                  className="mr-2"
                />
                Inches (in)
              </label>
            </div>
          </div>

          {/* Universal Measurements */}
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relevantMeasurements.universal.map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)} 
                    {field === 'height' ? ` (${unit})` : field === 'weight' ? ' (kg)' : ''}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={measurements[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={field === 'height' ? '170' : field === 'weight' ? '70' : ''}
                    step="0.1"
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Specific Measurements */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              {productSubcategory} Measurements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relevantMeasurements.specific.map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {relevantMeasurements.labels[field]} ({unit})
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={measurements[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter measurement"
                    step="0.1"
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes (Optional)
            </label>
            <textarea
              value={measurements.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information about your measurements or fit preferences..."
              rows={3}
            />
          </div>

          {/* Measurement Guide */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">How to Measure:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {productSubcategory?.toLowerCase() === 'shoes' ? (
                <>
                  <p>• Foot Length: Measure from heel to longest toe</p>
                  <p>• Foot Width: Measure across the widest part of your foot</p>
                </>
              ) : productSubcategory?.toLowerCase() === 'jackets' ? (
                <>
                  <p>• Chest: Measure around the fullest part of your chest</p>
                  <p>• Waist: Measure around your natural waistline</p>
                  <p>• Shoulder: Measure across your shoulders from seam to seam</p>
                  <p>• Arm Length: Measure from shoulder to wrist</p>
                </>
              ) : (
                <>
                  <p>• Chest: Measure around the fullest part of your chest</p>
                  <p>• Waist: Measure around your natural waistline</p>
                  <p>• Hip: Measure around the fullest part of your hips</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save & Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementModal;