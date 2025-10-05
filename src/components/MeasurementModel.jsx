// import React, { useState } from 'react';
// import { X, Ruler, User, Save } from 'lucide-react';

// const MeasurementModal = ({ 
//   isOpen, 
//   onClose, 
//   onSave, 
//   productCategory,
//   productSubcategory,
//   loading = false,
//   existingMeasurements = null
// }) => {
//   const [measurements, setMeasurements] = useState({
//     // Universal measurements
//     height: existingMeasurements?.height || '',
//     weight: existingMeasurements?.weight || '',
    
//     // Upper body
//     chest: existingMeasurements?.chest || '',
//     waist: existingMeasurements?.waist || '',
//     shoulder: existingMeasurements?.shoulder || '',
//     armLength: existingMeasurements?.armLength || '',
//     neck: existingMeasurements?.neck || '',
    
//     // Lower body
//     hip: existingMeasurements?.hip || '',
//     inseam: existingMeasurements?.inseam || '',
//     thigh: existingMeasurements?.thigh || '',
    
//     // Foot measurements (for shoes)
//     footLength: existingMeasurements?.footLength || '',
//     footWidth: existingMeasurements?.footWidth || '',
    
//     // Additional notes
//     notes: existingMeasurements?.notes || ''
//   });

//   const [errors, setErrors] = useState({});
//   const [unit, setUnit] = useState(existingMeasurements?.unit || 'cm');

//   // Define which measurements are relevant for each category/subcategory
//   const getRelevantMeasurements = () => {
//     const subcategory = productSubcategory?.toLowerCase();
//     const category = productCategory?.toLowerCase();

//     if (subcategory === 'shoes') {
//       return {
//         universal: ['height', 'weight'],
//         specific: ['footLength', 'footWidth'],
//         labels: {
//           footLength: 'Foot Length',
//           footWidth: 'Foot Width'
//         }
//       };
//     } else if (subcategory === 'jackets') {
//       return {
//         universal: ['height', 'weight'],
//         specific: ['chest', 'waist', 'shoulder', 'armLength'],
//         labels: {
//           chest: 'Chest',
//           waist: 'Waist',
//           shoulder: 'Shoulder Width',
//           armLength: 'Arm Length'
//         }
//       };
//     }

//     // Default measurements for other categories
//     return {
//       universal: ['height', 'weight'],
//       specific: ['chest', 'waist', 'hip'],
//       labels: {
//         chest: 'Chest',
//         waist: 'Waist',
//         hip: 'Hip'
//       }
//     };
//   };

//   const relevantMeasurements = getRelevantMeasurements();

//   const handleInputChange = (field, value) => {
//     setMeasurements(prev => ({
//       ...prev,
//       [field]: value
//     }));
    
//     // Clear error when user starts typing
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: null
//       }));
//     }
//   };

//   const validateMeasurements = () => {
//     const newErrors = {};
    
//     // Validate universal measurements
//     relevantMeasurements.universal.forEach(field => {
//       if (!measurements[field] || measurements[field].trim() === '') {
//         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
//       } else if (isNaN(measurements[field]) || parseFloat(measurements[field]) <= 0) {
//         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be a positive number`;
//       }
//     });

//     // Validate specific measurements
//     relevantMeasurements.specific.forEach(field => {
//       if (!measurements[field] || measurements[field].trim() === '') {
//         const label = relevantMeasurements.labels[field] || field;
//         newErrors[field] = `${label} is required`;
//       } else if (isNaN(measurements[field]) || parseFloat(measurements[field]) <= 0) {
//         const label = relevantMeasurements.labels[field] || field;
//         newErrors[field] = `${label} must be a positive number`;
//       }
//     });

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSave = () => {
//     if (validateMeasurements()) {
//       const measurementData = {
//         ...measurements,
//         unit,
//         category: productCategory,
//         subcategory: productSubcategory,
//         timestamp: new Date().toISOString()
//       };
      
//       onSave(measurementData);
//     }
//   };

//   const handleClose = () => {
//     setErrors({});
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//       <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <div className="flex items-center gap-2">
//             <Ruler className="w-5 h-5 text-blue-600" />
//             <h2 className="text-xl font-semibold">Body Measurements</h2>
//           </div>
//           <button
//             onClick={handleClose}
//             className="p-1 hover:bg-gray-100 rounded-full transition-colors"
//             disabled={loading}
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Info Message */}
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//             <div className="flex items-start gap-2">
//               <User className="w-5 h-5 text-blue-600 mt-0.5" />
//               <div>
//                 <h3 className="font-medium text-blue-900">Why do we need your measurements?</h3>
//                 <p className="text-sm text-blue-700 mt-1">
//                   To ensure the best fit for your {productSubcategory?.toLowerCase() || 'item'}, 
//                   we need your body measurements. This helps us recommend the right size and 
//                   reduces the likelihood of returns.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Unit Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Measurement Unit
//             </label>
//             <div className="flex gap-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="cm"
//                   checked={unit === 'cm'}
//                   onChange={(e) => setUnit(e.target.value)}
//                   className="mr-2"
//                 />
//                 Centimeters (cm)
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="in"
//                   checked={unit === 'in'}
//                   onChange={(e) => setUnit(e.target.value)}
//                   className="mr-2"
//                 />
//                 Inches (in)
//               </label>
//             </div>
//           </div>

//           {/* Universal Measurements */}
//           <div>
//             <h3 className="text-lg font-medium mb-4">Basic Information</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {relevantMeasurements.universal.map(field => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {field.charAt(0).toUpperCase() + field.slice(1)} 
//                     {field === 'height' ? ` (${unit})` : field === 'weight' ? ' (kg)' : ''}
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     value={measurements[field]}
//                     onChange={(e) => handleInputChange(field, e.target.value)}
//                     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                       errors[field] ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder={field === 'height' ? '170' : field === 'weight' ? '70' : ''}
//                     step="0.1"
//                   />
//                   {errors[field] && (
//                     <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Specific Measurements */}
//           <div>
//             <h3 className="text-lg font-medium mb-4">
//               {productSubcategory} Measurements
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {relevantMeasurements.specific.map(field => (
//                 <div key={field}>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {relevantMeasurements.labels[field]} ({unit})
//                     <span className="text-red-500 ml-1">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     value={measurements[field]}
//                     onChange={(e) => handleInputChange(field, e.target.value)}
//                     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                       errors[field] ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter measurement"
//                     step="0.1"
//                   />
//                   {errors[field] && (
//                     <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Notes */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Additional Notes (Optional)
//             </label>
//             <textarea
//               value={measurements.notes}
//               onChange={(e) => handleInputChange('notes', e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Any additional information about your measurements or fit preferences..."
//               rows={3}
//             />
//           </div>

//           {/* Measurement Guide */}
//           <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//             <h4 className="font-medium text-gray-900 mb-2">How to Measure:</h4>
//             <div className="text-sm text-gray-600 space-y-1">
//               {productSubcategory?.toLowerCase() === 'shoes' ? (
//                 <>
//                   <p>• Foot Length: Measure from heel to longest toe</p>
//                   <p>• Foot Width: Measure across the widest part of your foot</p>
//                 </>
//               ) : productSubcategory?.toLowerCase() === 'jackets' ? (
//                 <>
//                   <p>• Chest: Measure around the fullest part of your chest</p>
//                   <p>• Waist: Measure around your natural waistline</p>
//                   <p>• Shoulder: Measure across your shoulders from seam to seam</p>
//                   <p>• Arm Length: Measure from shoulder to wrist</p>
//                 </>
//               ) : (
//                 <>
//                   <p>• Chest: Measure around the fullest part of your chest</p>
//                   <p>• Waist: Measure around your natural waistline</p>
//                   <p>• Hip: Measure around the fullest part of your hips</p>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
//           <button
//             onClick={handleClose}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4" />
//                 Save & Add to Cart
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeasurementModal;
import React, { useState, useEffect } from 'react';
import { X, Ruler, CheckCircle, AlertCircle, Info } from 'lucide-react';

const MeasurementModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  productCategory, 
  productSubcategory,
  loading = false,
  existingMeasurements = null
}) => {
  const [unit, setUnit] = useState('cm');
  const [measurements, setMeasurements] = useState({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    shoulder: '',
    armLength: '',
    neck: '',
    hip: '',
    inseam: '',
    thigh: '',
    footLength: '',
    footWidth: ''
  });
  
  const [recommendedSize, setRecommendedSize] = useState(null);
  const [alternativeSize, setAlternativeSize] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Load existing measurements if available
  useEffect(() => {
    if (existingMeasurements) {
      setMeasurements({
        height: existingMeasurements.height || '',
        weight: existingMeasurements.weight || '',
        chest: existingMeasurements.chest || '',
        waist: existingMeasurements.waist || '',
        shoulder: existingMeasurements.shoulder || '',
        armLength: existingMeasurements.armLength || '',
        neck: existingMeasurements.neck || '',
        hip: existingMeasurements.hip || '',
        inseam: existingMeasurements.inseam || '',
        thigh: existingMeasurements.thigh || '',
        footLength: existingMeasurements.footLength || '',
        footWidth: existingMeasurements.footWidth || ''
      });
      setUnit(existingMeasurements.unit || 'cm');
    }
  }, [existingMeasurements]);

  // Size charts for different product types
  const sizeCharts = {
    Jackets: {
      XS: { chest: [81, 86], shoulder: [40, 42], armLength: [60, 62], waist: [66, 71] },
      S: { chest: [86, 91], shoulder: [42, 44], armLength: [62, 64], waist: [71, 76] },
      M: { chest: [91, 97], shoulder: [44, 46], armLength: [64, 66], waist: [76, 81] },
      L: { chest: [97, 102], shoulder: [46, 48], armLength: [66, 68], waist: [81, 86] },
      XL: { chest: [102, 109], shoulder: [48, 51], armLength: [68, 70], waist: [86, 94] },
      XXL: { chest: [109, 117], shoulder: [51, 54], armLength: [70, 72], waist: [94, 102] }
    },
    Shoes: {
      '6': { footLength: [23, 23.5], footWidth: [8, 8.5] },
      '7': { footLength: [23.5, 24.1], footWidth: [8.5, 9] },
      '8': { footLength: [24.1, 24.8], footWidth: [9, 9.5] },
      '9': { footLength: [24.8, 25.4], footWidth: [9.5, 10] },
      '10': { footLength: [25.4, 26], footWidth: [10, 10.5] },
      '11': { footLength: [26, 26.7], footWidth: [10.5, 11] },
      '12': { footLength: [26.7, 27.3], footWidth: [11, 11.5] }
    }
  };

  // Get required fields based on product type
  const getRequiredFields = () => {
    if (productSubcategory === 'Shoes') {
      return ['footLength', 'footWidth'];
    } else if (productSubcategory === 'Jackets') {
      return ['chest', 'shoulder', 'armLength', 'waist'];
    }
    return ['height', 'weight'];
  };

  // Convert measurements if needed
  const convertToSize = (value, type) => {
    if (unit === 'in') {
      return value * 2.54; // Convert inches to cm for comparison
    }
    return value;
  };

  // Calculate size recommendation
  const calculateSizeRecommendation = () => {
    const requiredFields = getRequiredFields();
    const hasAllRequired = requiredFields.every(field => measurements[field]);

    if (!hasAllRequired) {
      return null;
    }

    const sizeChart = sizeCharts[productSubcategory];
    if (!sizeChart) return null;

    let bestSize = null;
    let bestScore = -1;
    let secondBestSize = null;

    Object.entries(sizeChart).forEach(([size, ranges]) => {
      let matchScore = 0;
      let totalFields = 0;

      Object.entries(ranges).forEach(([measurement, [min, max]]) => {
        if (measurements[measurement]) {
          totalFields++;
          const value = convertToSize(parseFloat(measurements[measurement]), measurement);
          
          if (value >= min && value <= max) {
            matchScore += 2; // Perfect match
          } else if (value < min && value >= min - 3) {
            matchScore += 1; // Close below
          } else if (value > max && value <= max + 3) {
            matchScore += 1; // Close above
          }
        }
      });

      const normalizedScore = totalFields > 0 ? matchScore / (totalFields * 2) : 0;

      if (normalizedScore > bestScore) {
        secondBestSize = bestSize;
        bestSize = size;
        bestScore = normalizedScore;
      }
    });

    return { bestSize, secondBestSize, confidence: bestScore };
  };

  // Handle measurement change
  const handleChange = (field, value) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: value
    }));
    setShowRecommendation(false);
  };

  // Get size recommendation
  const handleGetRecommendation = () => {
    const recommendation = calculateSizeRecommendation();
    
    if (recommendation && recommendation.bestSize) {
      setRecommendedSize(recommendation.bestSize);
      setAlternativeSize(recommendation.secondBestSize);
      setShowRecommendation(true);
    } else {
      setShowRecommendation(false);
    }
  };

  // Handle save
  const handleSave = () => {
    const requiredFields = getRequiredFields();
    const hasAllRequired = requiredFields.every(field => measurements[field]);

    if (!hasAllRequired) {
      return;
    }

    const measurementData = {
      ...measurements,
      unit,
      category: productCategory,
      subcategory: productSubcategory
    };

    onSave(measurementData);
  };

  // Render measurement input field
  const renderField = (field, label, placeholder) => {
    const requiredFields = getRequiredFields();
    const isRequired = requiredFields.includes(field);

    return (
      <div key={field} className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <input
            type="number"
            step="0.1"
            value={measurements[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute right-3 top-2 text-gray-500 text-sm">
            {unit}
          </span>
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  const requiredFields = getRequiredFields();
  const hasAllRequired = requiredFields.every(field => measurements[field]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                {existingMeasurements ? 'Update Measurements' : 'Enter Your Measurements'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {/* Info banner */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Why we need your measurements</p>
                <p>
                  {productSubcategory === 'Shoes' 
                    ? 'To recommend the perfect shoe size that fits comfortably.'
                    : 'To recommend the best size for your body type and ensure a perfect fit.'}
                </p>
              </div>
            </div>

            {/* Unit selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Measurement Unit
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-4 py-2 rounded-md border-2 transition-all ${
                    unit === 'cm'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Centimeters (cm)
                </button>
                <button
                  onClick={() => setUnit('in')}
                  className={`px-4 py-2 rounded-md border-2 transition-all ${
                    unit === 'in'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Inches (in)
                </button>
              </div>
            </div>

            {/* Measurement fields based on product type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {productSubcategory === 'Shoes' ? (
                <>
                  {renderField('footLength', 'Foot Length', 'e.g., 25.5')}
                  {renderField('footWidth', 'Foot Width', 'e.g., 9.5')}
                </>
              ) : productSubcategory === 'Jackets' ? (
                <>
                  {renderField('chest', 'Chest', 'e.g., 95')}
                  {renderField('shoulder', 'Shoulder Width', 'e.g., 45')}
                  {renderField('armLength', 'Arm Length', 'e.g., 65')}
                  {renderField('waist', 'Waist', 'e.g., 80')}
                  {renderField('neck', 'Neck', 'e.g., 38')}
                  {renderField('height', 'Height', 'e.g., 175')}
                </>
              ) : (
                <>
                  {renderField('height', 'Height', 'e.g., 175')}
                  {renderField('weight', 'Weight (kg)', 'e.g., 70')}
                  {renderField('chest', 'Chest', 'e.g., 95')}
                  {renderField('waist', 'Waist', 'e.g., 80')}
                </>
              )}
            </div>

            {/* Get recommendation button */}
            {hasAllRequired && (
              <button
                onClick={handleGetRecommendation}
                className="w-full mb-4 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Ruler className="w-4 h-4" />
                Get Size Recommendation
              </button>
            )}

            {/* Size recommendation display */}
            {showRecommendation && recommendedSize && (
              <div className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900 text-lg mb-2">
                      Recommended Size: <span className="text-2xl">{recommendedSize}</span>
                    </p>
                    <p className="text-sm text-green-800 mb-2">
                      Based on your measurements, we recommend <strong>{recommendedSize}</strong> for the best fit.
                    </p>
                    {alternativeSize && (
                      <p className="text-sm text-green-700">
                        You may also consider <strong>{alternativeSize}</strong> if you prefer a {
                          productSubcategory === 'Shoes' ? 'snugger or roomier' : 'looser or tighter'
                        } fit.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Measurement tips */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Measurement Tips:</h4>
              <ul className="text-xs text-gray-700 space-y-1">
                {productSubcategory === 'Shoes' ? (
                  <>
                    <li>• Measure your foot length from heel to longest toe</li>
                    <li>• Measure foot width at the widest part</li>
                    <li>• Measure in the evening when feet are slightly larger</li>
                  </>
                ) : (
                  <>
                    <li>• Measure over light clothing for accuracy</li>
                    <li>• Keep the tape measure parallel to the floor</li>
                    <li>• Don't pull the tape too tight or too loose</li>
                    <li>• Chest: Measure around the fullest part</li>
                    <li>• Waist: Measure around the narrowest part</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasAllRequired || loading}
              className={`px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${
                hasAllRequired && !loading
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Save & Continue
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeasurementModal;