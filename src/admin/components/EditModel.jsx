// // // File: src/components/EditProductModal.jsx

// // import React, { useState, useEffect } from 'react'
// // import axios from 'axios'
// // import { toast } from 'react-toastify'
// // import { backendUrl } from '../App'

// // const EditProductModal = ({ 
// //   product, 
// //   isOpen, 
// //   onClose, 
// //   onProductUpdated, 
// //   token 
// // }) => {
// //   const [editForm, setEditForm] = useState({})
// //   const [updating, setUpdating] = useState(false)
// //   const [validationErrors, setValidationErrors] = useState({})

// //   // Initialize form data when product changes
// //   useEffect(() => {
// //     if (product && isOpen) {
// //       setEditForm({
// //         name: product.name || '',
// //         brand: product.brand || '',
// //         category: product.category || '',
// //         subcategory: product.subcategory || '',
// //         status: product.status || 'Active',
// //         stockQuantity: product.stockQuantity || 0,
// //         sku: product.sku || '',
// //         price: {
// //           base: product.price?.base || 0,
// //           discount: product.price?.discount || 0
// //         },
// //         description: product.description || '',
// //         tags: product.tags || [],
// //         // Shoe-specific details matching the schema
// //         shoeDetails: product.shoeDetails || {
// //           style: 'Other',
// //           sizes: [],
// //           materials: []
// //         },
// //         // Jacket-specific details matching the schema
// //         jacketDetails: product.jacketDetails || {
// //           material: '',
// //           season: '',
// //           sizes: []
// //         }
// //       })
// //       setValidationErrors({})
// //     }
// //   }, [product, isOpen])

// //   const handleFormChange = (field, value, nested = null) => {
// //     if (nested) {
// //       setEditForm(prev => ({
// //         ...prev,
// //         [nested]: {
// //           ...prev[nested],
// //           [field]: value
// //         }
// //       }))
// //     } else {
// //       setEditForm(prev => ({
// //         ...prev,
// //         [field]: value
// //       }))
// //     }

// //     // Clear validation error when user starts typing
// //     if (validationErrors[field]) {
// //       setValidationErrors(prev => ({
// //         ...prev,
// //         [field]: ''
// //       }))
// //     }
// //   }

// //   const validateForm = () => {
// //     const errors = {}

// //     if (!editForm.name?.trim()) {
// //       errors.name = 'Product name is required'
// //     }

// //     if (!editForm.category) {
// //       errors.category = 'Category is required'
// //     }

// //     if (!editForm.subcategory) {
// //       errors.subcategory = 'Subcategory is required'
// //     }

// //     if (!editForm.price?.base || editForm.price.base <= 0) {
// //       errors.basePrice = 'Base price must be greater than 0'
// //     }

// //     if (editForm.stockQuantity < 0) {
// //       errors.stockQuantity = 'Stock quantity cannot be negative'
// //     }

// //     setValidationErrors(errors)
// //     return Object.keys(errors).length === 0
// //   }

// //   const updateProduct = async () => {
// //     if (!token) {
// //       toast.error('Authentication token not found')
// //       return
// //     }

// //     if (!validateForm()) {
// //       toast.error('Please fix the validation errors')
// //       return
// //     }

// //     try {
// //       setUpdating(true)
      
// //       // Prepare form data
// //       const formData = new FormData()
      
// //       // Add basic fields
// //       formData.append('name', editForm.name.trim())
// //       formData.append('brand', editForm.brand.trim())
// //       formData.append('category', editForm.category)
// //       formData.append('subcategory', editForm.subcategory)
// //       formData.append('status', editForm.status)
// //       formData.append('stockQuantity', editForm.stockQuantity.toString())
// //       formData.append('sku', editForm.sku.trim())
// //       formData.append('description', editForm.description.trim())
      
// //       // Add tags
// //       if (editForm.tags && editForm.tags.length > 0) {
// //         editForm.tags.forEach((tag, index) => {
// //           formData.append(`tags[${index}]`, tag)
// //         })
// //       }
      
// //       // Add price data
// //       formData.append('price[base]', editForm.price.base.toString())
// //       formData.append('price[discount]', editForm.price.discount.toString())
      
// //       // Add subcategory-specific details
// //       if (editForm.subcategory === 'Shoes' && editForm.shoeDetails) {
// //         // Add style
// //         if (editForm.shoeDetails.style) {
// //           formData.append('shoeDetails[style]', editForm.shoeDetails.style)
// //         }
        
// //         // Add sizes with correct schema structure
// //         if (editForm.shoeDetails.sizes && editForm.shoeDetails.sizes.length > 0) {
// //           editForm.shoeDetails.sizes.forEach((size, index) => {
// //             formData.append(`shoeDetails[sizes][${index}][sizeLabel]`, size.sizeLabel || size.size)
// //             formData.append(`shoeDetails[sizes][${index}][available]`, size.available.toString())
// //             formData.append(`shoeDetails[sizes][${index}][stock]`, size.stock.toString())
// //           })
// //         }
        
// //         // Add materials if they exist
// //         if (editForm.shoeDetails.materials && editForm.shoeDetails.materials.length > 0) {
// //           editForm.shoeDetails.materials.forEach((material, index) => {
// //             if (material.leatherType) formData.append(`shoeDetails[materials][${index}][leatherType]`, material.leatherType)
// //             if (material.soleMaterial) formData.append(`shoeDetails[materials][${index}][soleMaterial]`, material.soleMaterial)
// //             if (material.colorName) formData.append(`shoeDetails[materials][${index}][colorName]`, material.colorName)
// //             if (material.colorCode) formData.append(`shoeDetails[materials][${index}][colorCode]`, material.colorCode)
// //           })
// //         }
// //       }
      
// //       if (editForm.subcategory === 'Jackets' && editForm.jacketDetails) {
// //         // Add jacket material and season
// //         if (editForm.jacketDetails.material) {
// //           formData.append('jacketDetails[material]', editForm.jacketDetails.material)
// //         }
// //         if (editForm.jacketDetails.season) {
// //           formData.append('jacketDetails[season]', editForm.jacketDetails.season)
// //         }
        
// //         // Add jacket sizes with correct schema structure
// //         if (editForm.jacketDetails.sizes && editForm.jacketDetails.sizes.length > 0) {
// //           editForm.jacketDetails.sizes.forEach((size, index) => {
// //             formData.append(`jacketDetails[sizes][${index}][sizeLabel]`, size.sizeLabel || size.size)
// //             formData.append(`jacketDetails[sizes][${index}][available]`, size.available.toString())
// //             formData.append(`jacketDetails[sizes][${index}][stock]`, size.stock.toString())
// //           })
// //         }
// //       }

// //       const response = await axios.put(`${backendUrl}/api/product/${product._id}`, formData, {
// //         headers: { 
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'multipart/form-data'
// //         }
// //       })

// //       if (response.data.success) {
// //         toast.success('Product updated successfully')
// //         onProductUpdated()
// //         onClose()
// //       } else {
// //         toast.error(response.data.message || 'Failed to update product')
// //       }
// //     } catch (error) {
// //       console.error('Update product error:', error)
// //       if (error.response?.status === 401) {
// //         toast.error('Session expired. Please login again.')
// //       } else if (error.response?.status === 403) {
// //         toast.error('Access denied. Admin privileges required.')
// //       } else {
// //         toast.error(error.response?.data?.message || 'Failed to update product')
// //       }
// //     } finally {
// //       setUpdating(false)
// //     }
// //   }

// //   const handleSizeChange = (sizeIndex, field, value, detailType) => {
// //     setEditForm(prev => ({
// //       ...prev,
// //       [detailType]: {
// //         ...prev[detailType],
// //         sizes: prev[detailType].sizes.map((size, index) => {
// //           if (index === sizeIndex) {
// //             // Handle field name mapping for schema compatibility
// //             if (field === 'size') {
// //               return { ...size, sizeLabel: value }
// //             }
// //             return { ...size, [field]: value }
// //           }
// //           return size
// //         })
// //       }
// //     }))
// //   }

// //   const addSize = (detailType) => {
// //     const newSize = {
// //       sizeLabel: '',
// //       available: true,
// //       stock: 0
// //     }

// //     setEditForm(prev => ({
// //       ...prev,
// //       [detailType]: {
// //         ...prev[detailType],
// //         sizes: [...(prev[detailType].sizes || []), newSize]
// //       }
// //     }))
// //   }

// //   const handleMaterialChange = (materialIndex, field, value) => {
// //     setEditForm(prev => ({
// //       ...prev,
// //       shoeDetails: {
// //         ...prev.shoeDetails,
// //         materials: prev.shoeDetails.materials.map((material, index) => 
// //           index === materialIndex ? { ...material, [field]: value } : material
// //         )
// //       }
// //     }))
// //   }

// //   const addMaterial = () => {
// //     const newMaterial = {
// //       leatherType: '',
// //       soleMaterial: '',
// //       colorName: '',
// //       colorCode: ''
// //     }

// //     setEditForm(prev => ({
// //       ...prev,
// //       shoeDetails: {
// //         ...prev.shoeDetails,
// //         materials: [...(prev.shoeDetails.materials || []), newMaterial]
// //       }
// //     }))
// //   }

// //   const removeMaterial = (materialIndex) => {
// //     setEditForm(prev => ({
// //       ...prev,
// //       shoeDetails: {
// //         ...prev.shoeDetails,
// //         materials: prev.shoeDetails.materials.filter((_, index) => index !== materialIndex)
// //       }
// //     }))
// //   }

// //   const handleTagsChange = (value) => {
// //     const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag)
// //     handleFormChange('tags', tags)
// //   }

// //   const removeSize = (sizeIndex, detailType) => {
// //     setEditForm(prev => ({
// //       ...prev,
// //       [detailType]: {
// //         ...prev[detailType],
// //         sizes: prev[detailType].sizes.filter((_, index) => index !== sizeIndex)
// //       }
// //     }))
// //   }

// //   if (!isOpen || !product) return null

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
// //         <div className="flex justify-between items-center mb-6">
// //           <h3 className="text-xl font-bold text-gray-800">Edit Product</h3>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
// //           >
// //             ×
// //           </button>
// //         </div>
        
// //         {/* Basic Information */}
// //         <div className="mb-6">
// //           <h4 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h4>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Product Name *</label>
// //               <input
// //                 type="text"
// //                 value={editForm.name || ''}
// //                 onChange={(e) => handleFormChange('name', e.target.value)}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   validationErrors.name ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //                 placeholder="Enter product name"
// //               />
// //               {validationErrors.name && (
// //                 <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
// //               )}
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Brand</label>
// //               <input
// //                 type="text"
// //                 value={editForm.brand || ''}
// //                 onChange={(e) => handleFormChange('brand', e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Enter brand name"
// //               />
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Category *</label>
// //               <select
// //                 value={editForm.category || ''}
// //                 onChange={(e) => handleFormChange('category', e.target.value)}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   validationErrors.category ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               >
// //                 <option value="">Select Category</option>
// //                 <option value="Men">Men</option>
// //                 <option value="Women">Women</option>
// //               </select>
// //               {validationErrors.category && (
// //                 <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
// //               )}
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Subcategory *</label>
// //               <select
// //                 value={editForm.subcategory || ''}
// //                 onChange={(e) => handleFormChange('subcategory', e.target.value)}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   validationErrors.subcategory ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //               >
// //                 <option value="">Select Subcategory</option>
// //                 <option value="Shoes">Shoes</option>
// //                 <option value="Jackets">Jackets</option>
// //               </select>
// //               {validationErrors.subcategory && (
// //                 <p className="text-red-500 text-xs mt-1">{validationErrors.subcategory}</p>
// //               )}
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Status</label>
// //               <select
// //                 value={editForm.status || 'Active'}
// //                 onChange={(e) => handleFormChange('status', e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="Active">Active</option>
// //                 <option value="Inactive">Inactive</option>
// //                 <option value="Draft">Draft</option>
// //               </select>
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">SKU</label>
// //               <input
// //                 type="text"
// //                 value={editForm.sku || ''}
// //                 onChange={(e) => handleFormChange('sku', e.target.value)}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 placeholder="Enter SKU"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Inventory & Pricing */}
// //         <div className="mb-6">
// //           <h4 className="text-lg font-semibold mb-4 text-gray-700">Inventory & Pricing</h4>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Stock Quantity</label>
// //               <input
// //                 type="number"
// //                 value={editForm.stockQuantity || 0}
// //                 onChange={(e) => handleFormChange('stockQuantity', parseInt(e.target.value) || 0)}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   validationErrors.stockQuantity ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //                 min="0"
// //                 placeholder="0"
// //               />
// //               {validationErrors.stockQuantity && (
// //                 <p className="text-red-500 text-xs mt-1">{validationErrors.stockQuantity}</p>
// //               )}
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Base Price *</label>
// //               <input
// //                 type="number"
// //                 step="0.01"
// //                 value={editForm.price?.base || 0}
// //                 onChange={(e) => handleFormChange('base', parseFloat(e.target.value) || 0, 'price')}
// //                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
// //                   validationErrors.basePrice ? 'border-red-500' : 'border-gray-300'
// //                 }`}
// //                 min="0"
// //                 placeholder="0.00"
// //               />
// //               {validationErrors.basePrice && (
// //                 <p className="text-red-500 text-xs mt-1">{validationErrors.basePrice}</p>
// //               )}
// //             </div>
            
// //             <div>
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Discount Price</label>
// //               <input
// //                 type="number"
// //                 step="0.01"
// //                 value={editForm.price?.discount || 0}
// //                 onChange={(e) => handleFormChange('discount', parseFloat(e.target.value) || 0, 'price')}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 min="0"
// //                 placeholder="0.00"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Description */}
// //         <div className="mb-6">
// //           <label className="block text-sm font-medium mb-2 text-gray-600">Description</label>
// //           <textarea
// //             value={editForm.description || ''}
// //             onChange={(e) => handleFormChange('description', e.target.value)}
// //             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             rows="4"
// //             placeholder="Enter product description"
// //           />
// //         </div>

// //         {/* Category-specific details */}
// //         {editForm.subcategory === 'Shoes' && (
// //           <div className="mb-6">
// //             <h4 className="text-lg font-semibold mb-4 text-gray-700">Shoe Details</h4>
            
// //             {/* Style Selection */}
// //             <div className="mb-4">
// //               <label className="block text-sm font-medium mb-2 text-gray-600">Style</label>
// //               <select
// //                 value={editForm.shoeDetails?.style || 'Other'}
// //                 onChange={(e) => handleFormChange('style', e.target.value, 'shoeDetails')}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               >
// //                 <option value="Formal">Formal</option>
// //                 <option value="Casual">Casual</option>
// //                 <option value="Boots">Boots</option>
// //                 <option value="Sports">Sports</option>
// //                 <option value="Sandals">Sandals</option>
// //                 <option value="Other">Other</option>
// //               </select>
// //             </div>

// //             {/* Materials Section */}
// //             <div className="mb-4">
// //               <div className="flex justify-between items-center mb-2">
// //                 <label className="block text-sm font-medium text-gray-600">Materials</label>
// //                 <button
// //                   type="button"
// //                   onClick={addMaterial}
// //                   className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
// //                 >
// //                   Add Material
// //                 </button>
// //               </div>
// //               {editForm.shoeDetails?.materials?.map((material, index) => (
// //                 <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3 p-3 border border-gray-200 rounded-lg">
// //                   <input
// //                     type="text"
// //                     value={material.leatherType || ''}
// //                     onChange={(e) => handleMaterialChange(index, 'leatherType', e.target.value)}
// //                     className="px-2 py-1 border border-gray-300 rounded text-sm"
// //                     placeholder="Leather Type (e.g., Full-grain)"
// //                   />
// //                   <input
// //                     type="text"
// //                     value={material.soleMaterial || ''}
// //                     onChange={(e) => handleMaterialChange(index, 'soleMaterial', e.target.value)}
// //                     className="px-2 py-1 border border-gray-300 rounded text-sm"
// //                     placeholder="Sole Material (e.g., Rubber)"
// //                   />
// //                   <input
// //                     type="text"
// //                     value={material.colorName || ''}
// //                     onChange={(e) => handleMaterialChange(index, 'colorName', e.target.value)}
// //                     className="px-2 py-1 border border-gray-300 rounded text-sm"
// //                     placeholder="Color Name (e.g., Black)"
// //                   />
// //                   <div className="flex items-center space-x-2">
// //                     <input
// //                       type="color"
// //                       value={material.colorCode || '#000000'}
// //                       onChange={(e) => handleMaterialChange(index, 'colorCode', e.target.value)}
// //                       className="w-10 h-8 border border-gray-300 rounded"
// //                     />
// //                     <button
// //                       type="button"
// //                       onClick={() => removeMaterial(index)}
// //                       className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
// //                     >
// //                       Remove
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
            
// //             {/* Shoe Sizes */}
// //             <div>
// //               <div className="flex justify-between items-center mb-2">
// //                 <label className="block text-sm font-medium text-gray-600">Available Sizes</label>
// //                 <button
// //                   type="button"
// //                   onClick={() => addSize('shoeDetails')}
// //                   className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
// //                 >
// //                   Add Size
// //                 </button>
// //               </div>
// //               {editForm.shoeDetails?.sizes?.map((size, index) => (
// //                 <div key={index} className="grid grid-cols-4 gap-2 mb-2 items-end">
// //                   <input
// //                     type="text"
// //                     value={size.sizeLabel || size.size || ''}
// //                     onChange={(e) => handleSizeChange(index, 'size', e.target.value, 'shoeDetails')}
// //                     className="px-2 py-1 border border-gray-300 rounded text-sm"
// //                     placeholder="Size (e.g., EU 42, US 9)"
// //                   />
// //                   <input
// //                     type="number"
// //                     value={size.stock || 0}
// //                     onChange={(e) => handleSizeChange(index, 'stock', parseInt(e.target.value) || 0, 'shoeDetails')}
// //                     className="px-2 py-1 border border-gray-300 rounded text-sm"
// //                     placeholder="Stock"
// //                     min="0"
// //                   />
// //                   <label className="flex items-center text-sm">
// //                     <input
// //                       type="checkbox"
// //                       checked={size.available !== false}
// //                       onChange={(e) => handleSizeChange(index, 'available', e.target.checked, 'shoeDetails')}
// //                       className="mr-1"
// //                     />
// //                     Available
// //                   </label>
// //                   <button
// //                     type="button"
// //                     onClick={() => removeSize(index, 'shoeDetails')}
// //                     className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
// //                   >
// //                     Remove
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {editForm.subcategory === 'Jackets' && (
// //           <div className="mb-6">
// //             <h4 className="text-lg font-semibold mb-4 text-gray-700">Jacket Details</h4>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //               <div>
// //                 <label className="block text-sm font-medium mb-2 text-gray-600">Material</label>
// //                 <input
// //                   type="text"
// //                   value={editForm.jacketDetails?.material || ''}
// //                   onChange={(e) => handleFormChange('material', e.target.value, 'jacketDetails')}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   placeholder="e.g., Leather, Denim, Cotton"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium mb-2 text-gray-600">Season</label>
// //                 <select
// //                   value={editForm.jacketDetails?.season || ''}
// //                   onChange={(e) => handleFormChange('season', e.target.value, 'jacketDetails')}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 >
// //                   <option value="">Select Season</option>
// //                   <option value="Spring">Spring</option>
// //                   <option value="Summer">Summer</option>
// //                   <option value="Fall">Fall</option>
// //                   <option value="Winter">Winter</option>
// //                   <option value="All Season">All Season</option>
// //                 </select>
// //               </div>
// //             </div>
            
// //             {/* Jacket Sizes */}
// //             <div>
// //               <div className="flex justify-between items-center mb-2">
// //                 <label className="block text-sm font-medium text-gray-600">Available Sizes</label>
// //                 <button
// //                   type="button"
// //                   onClick={() => addSize('jacketDetails')}
// //                   className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
// //                 >
// //                   Add Size
// //                 </button>
// //               </div>
// //               {editForm.jacketDetails?.sizes?.map((size, index) => (
// //                 <div key={index} className="grid grid-cols-4 gap-2 mb-2 items-end">
// //                   <select
// //                     value={size.sizeLabel || size.size || ''}
// //                     onChange={(e) => handleSizeChange(index, 'size', e.target.value, 'jacketDetails')}
// //                     className="px-2 py-1 border border-gray-300 rounded text-sm"
// //                   >
// //                     <option value="">Select Size</option>
// //                     <option value="XS">XS</option>
// //                     <option value="S">S</option>
// //                     <option value="M">M</option>
// //                     <option value="L">L</option>
// //                     <option value="XL">XL</option>
// //                     <option value="XXL">XXL</option>
// //                   </select>
// //                   <input
// //                     type="number"
// //                     value={size.stock || 0}
// //                     onChange={(e) => handleSizeChange(index, 'stock', parseInt(e.target.value) || 0, 'jacketDetails')}
// //                     className="px-2 py-1 border border-gray-300 rounded text-sm"
// //                     placeholder="Stock"
// //                     min="0"
// //                   />
// //                   <label className="flex items-center text-sm">
// //                     <input
// //                       type="checkbox"
// //                       checked={size.available !== false}
// //                       onChange={(e) => handleSizeChange(index, 'available', e.target.checked, 'jacketDetails')}
// //                       className="mr-1"
// //                     />
// //                     Available
// //                   </label>
// //                   <button
// //                     type="button"
// //                     onClick={() => removeSize(index, 'jacketDetails')}
// //                     className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
// //                   >
// //                     Remove
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Action Buttons */}
// //         <div className="flex justify-end space-x-3 pt-4 border-t">
// //           <button
// //             onClick={onClose}
// //             disabled={updating}
// //             className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={updateProduct}
// //             disabled={updating}
// //             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
// //           >
// //             {updating ? 'Updating...' : 'Update Product'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default EditProductModal







// // File: src/components/EditProductModal.jsx

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { backendUrl } from '../App'

// const EditProductModal = ({ 
//   product, 
//   isOpen, 
//   onClose, 
//   onProductUpdated, 
//   token 
// }) => {
//   const [editForm, setEditForm] = useState({})
//   const [updating, setUpdating] = useState(false)
//   const [validationErrors, setValidationErrors] = useState({})
//   const [newImages, setNewImages] = useState([])
//   const [existingImages, setExistingImages] = useState([])
//   const [imagesToDelete, setImagesToDelete] = useState([])

//   // Initialize form data when product changes
//   useEffect(() => {
//     if (product && isOpen) {
//       setEditForm({
//         name: product.name || '',
//         brand: product.brand || '',
//         category: product.category || '',
//         subcategory: product.subcategory || '',
//         status: product.status || 'Active',
//         stockQuantity: product.stockQuantity || 0,
//         sku: product.sku || '',
//         price: {
//           base: product.price?.base || 0,
//           discount: product.price?.discount || 0
//         },
//         description: product.description || '',
//         tags: product.tags || [],
//         // Shoe-specific details matching the schema
//         shoeDetails: product.shoeDetails || {
//           style: 'Other',
//           sizes: [],
//           materials: []
//         },
//         // Jacket-specific details matching the schema
//         jacketDetails: product.jacketDetails || {
//           material: '',
//           season: '',
//           sizes: []
//         }
//       })
//       setExistingImages(product.images || [])
//       setNewImages([])
//       setImagesToDelete([])
//       setValidationErrors({})
//     }
//   }, [product, isOpen])

//   // Helper function to get proper image URL
//   const getImageUrl = (image) => {
//     if (!image || !image.url) return null
    
//     let imageUrl = image.url
//     // Convert /upload/ to /uploads/ if needed since files are in uploads folder
//     if (imageUrl.startsWith('/upload/')) {
//       imageUrl = imageUrl.replace('/upload/', '/uploads/')
//     }
    
//     // Construct full URL if it's a relative path
//     if (imageUrl.startsWith('/uploads/')) {
//       const baseUrl = backendUrl.replace(/\/$/, '')
//       imageUrl = `${baseUrl}${imageUrl}`
//     }
    
//     return imageUrl
//   }

//   const handleFormChange = (field, value, nested = null) => {
//     if (nested) {
//       setEditForm(prev => ({
//         ...prev,
//         [nested]: {
//           ...prev[nested],
//           [field]: value
//         }
//       }))
//     } else {
//       setEditForm(prev => ({
//         ...prev,
//         [field]: value
//       }))
//     }

//     // Clear validation error when user starts typing
//     if (validationErrors[field]) {
//       setValidationErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }))
//     }
//   }

//   // Handle new image selection
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files)
    
//     // Validate file types
//     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
//     const invalidFiles = files.filter(file => !validTypes.includes(file.type))
    
//     if (invalidFiles.length > 0) {
//       toast.error('Please select only JPEG, PNG, or WEBP images')
//       return
//     }

//     // Check file sizes (5MB limit per file)
//     const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024)
//     if (oversizedFiles.length > 0) {
//       toast.error('Each image must be smaller than 5MB')
//       return
//     }

//     // Add preview URLs for new images
//     const imagePromises = files.map(file => {
//       return new Promise((resolve) => {
//         const reader = new FileReader()
//         reader.onload = (e) => {
//           resolve({
//             file: file,
//             preview: e.target.result,
//             name: file.name
//           })
//         }
//         reader.readAsDataURL(file)
//       })
//     })

//     Promise.all(imagePromises).then(imageData => {
//       setNewImages(prev => [...prev, ...imageData])
//     })
//   }

//   // Remove new image before upload
//   const removeNewImage = (index) => {
//     setNewImages(prev => prev.filter((_, i) => i !== index))
//   }

//   // Mark existing image for deletion
//   const markImageForDeletion = (imageId) => {
//     setImagesToDelete(prev => [...prev, imageId])
//     setExistingImages(prev => prev.filter(img => img._id !== imageId))
//   }

//   // Set image as primary
//   const setPrimaryImage = (imageId, isExisting = true) => {
//     if (isExisting) {
//       setExistingImages(prev => prev.map(img => ({
//         ...img,
//         isPrimary: img._id === imageId
//       })))
//     } else {
//       // For new images, we'll handle primary selection after upload
//       toast.info('Primary image will be set after upload')
//     }
//   }

//   // Delete existing images from server
//   const deleteExistingImages = async () => {
//     for (const imageId of imagesToDelete) {
//       try {
//         await axios.delete(`${backendUrl}/api/product/${product._id}/images/${imageId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       } catch (error) {
//         console.error(`Failed to delete image ${imageId}:`, error)
//       }
//     }
//   }

//   const validateForm = () => {
//     const errors = {}

//     if (!editForm.name?.trim()) {
//       errors.name = 'Product name is required'
//     }

//     if (!editForm.category) {
//       errors.category = 'Category is required'
//     }

//     if (!editForm.subcategory) {
//       errors.subcategory = 'Subcategory is required'
//     }

//     if (!editForm.price?.base || editForm.price.base <= 0) {
//       errors.basePrice = 'Base price must be greater than 0'
//     }

//     if (editForm.stockQuantity < 0) {
//       errors.stockQuantity = 'Stock quantity cannot be negative'
//     }

//     setValidationErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   const updateProduct = async () => {
//     if (!token) {
//       toast.error('Authentication token not found')
//       return
//     }

//     if (!validateForm()) {
//       toast.error('Please fix the validation errors')
//       return
//     }

//     try {
//       setUpdating(true)
      
//       // First, delete marked images
//       if (imagesToDelete.length > 0) {
//         await deleteExistingImages()
//       }
      
//       // Prepare form data
//       const formData = new FormData()
      
//       // Add new image files
//       newImages.forEach(imageData => {
//         formData.append('images', imageData.file)
//       })
      
//       // Add basic fields
//       formData.append('name', editForm.name.trim())
//       formData.append('brand', editForm.brand.trim())
//       formData.append('category', editForm.category)
//       formData.append('subcategory', editForm.subcategory)
//       formData.append('status', editForm.status)
//       formData.append('stockQuantity', editForm.stockQuantity.toString())
//       formData.append('sku', editForm.sku.trim())
//       formData.append('description', editForm.description.trim())
      
//       // Add tags
//       if (editForm.tags && editForm.tags.length > 0) {
//         editForm.tags.forEach((tag, index) => {
//           formData.append(`tags[${index}]`, tag)
//         })
//       }
      
//       // Add price data
//       formData.append('price[base]', editForm.price.base.toString())
//       formData.append('price[discount]', editForm.price.discount.toString())
      
//       // Add subcategory-specific details
//       if (editForm.subcategory === 'Shoes' && editForm.shoeDetails) {
//         // Add style
//         if (editForm.shoeDetails.style) {
//           formData.append('shoeDetails[style]', editForm.shoeDetails.style)
//         }
        
//         // Add sizes with correct schema structure
//         if (editForm.shoeDetails.sizes && editForm.shoeDetails.sizes.length > 0) {
//           editForm.shoeDetails.sizes.forEach((size, index) => {
//             formData.append(`shoeDetails[sizes][${index}][sizeLabel]`, size.sizeLabel || size.size)
//             formData.append(`shoeDetails[sizes][${index}][available]`, size.available.toString())
//             formData.append(`shoeDetails[sizes][${index}][stock]`, size.stock.toString())
//           })
//         }
        
//         // Add materials if they exist
//         if (editForm.shoeDetails.materials && editForm.shoeDetails.materials.length > 0) {
//           editForm.shoeDetails.materials.forEach((material, index) => {
//             if (material.leatherType) formData.append(`shoeDetails[materials][${index}][leatherType]`, material.leatherType)
//             if (material.soleMaterial) formData.append(`shoeDetails[materials][${index}][soleMaterial]`, material.soleMaterial)
//             if (material.colorName) formData.append(`shoeDetails[materials][${index}][colorName]`, material.colorName)
//             if (material.colorCode) formData.append(`shoeDetails[materials][${index}][colorCode]`, material.colorCode)
//           })
//         }
//       }
      
//       if (editForm.subcategory === 'Jackets' && editForm.jacketDetails) {
//         // Add jacket material and season
//         if (editForm.jacketDetails.material) {
//           formData.append('jacketDetails[material]', editForm.jacketDetails.material)
//         }
//         if (editForm.jacketDetails.season) {
//           formData.append('jacketDetails[season]', editForm.jacketDetails.season)
//         }
        
//         // Add jacket sizes with correct schema structure
//         if (editForm.jacketDetails.sizes && editForm.jacketDetails.sizes.length > 0) {
//           editForm.jacketDetails.sizes.forEach((size, index) => {
//             formData.append(`jacketDetails[sizes][${index}][sizeLabel]`, size.sizeLabel || size.size)
//             formData.append(`jacketDetails[sizes][${index}][available]`, size.available.toString())
//             formData.append(`jacketDetails[sizes][${index}][stock]`, size.stock.toString())
//           })
//         }
//       }

//       const response = await axios.put(`${backendUrl}/api/product/${product._id}`, formData, {
//         headers: { 
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       })

//       if (response.data.success) {
//         toast.success('Product updated successfully')
//         onProductUpdated()
//         onClose()
//       } else {
//         toast.error(response.data.message || 'Failed to update product')
//       }
//     } catch (error) {
//       console.error('Update product error:', error)
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.')
//       } else if (error.response?.status === 403) {
//         toast.error('Access denied. Admin privileges required.')
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to update product')
//       }
//     } finally {
//       setUpdating(false)
//     }
//   }

//   const handleSizeChange = (sizeIndex, field, value, detailType) => {
//     setEditForm(prev => ({
//       ...prev,
//       [detailType]: {
//         ...prev[detailType],
//         sizes: prev[detailType].sizes.map((size, index) => {
//           if (index === sizeIndex) {
//             // Handle field name mapping for schema compatibility
//             if (field === 'size') {
//               return { ...size, sizeLabel: value }
//             }
//             return { ...size, [field]: value }
//           }
//           return size
//         })
//       }
//     }))
//   }

//   const addSize = (detailType) => {
//     const newSize = {
//       sizeLabel: '',
//       available: true,
//       stock: 0
//     }

//     setEditForm(prev => ({
//       ...prev,
//       [detailType]: {
//         ...prev[detailType],
//         sizes: [...(prev[detailType].sizes || []), newSize]
//       }
//     }))
//   }

//   const handleMaterialChange = (materialIndex, field, value) => {
//     setEditForm(prev => ({
//       ...prev,
//       shoeDetails: {
//         ...prev.shoeDetails,
//         materials: prev.shoeDetails.materials.map((material, index) => 
//           index === materialIndex ? { ...material, [field]: value } : material
//         )
//       }
//     }))
//   }

//   const addMaterial = () => {
//     const newMaterial = {
//       leatherType: '',
//       soleMaterial: '',
//       colorName: '',
//       colorCode: ''
//     }

//     setEditForm(prev => ({
//       ...prev,
//       shoeDetails: {
//         ...prev.shoeDetails,
//         materials: [...(prev.shoeDetails.materials || []), newMaterial]
//       }
//     }))
//   }

//   const removeMaterial = (materialIndex) => {
//     setEditForm(prev => ({
//       ...prev,
//       shoeDetails: {
//         ...prev.shoeDetails,
//         materials: prev.shoeDetails.materials.filter((_, index) => index !== materialIndex)
//       }
//     }))
//   }

//   const handleTagsChange = (value) => {
//     const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag)
//     handleFormChange('tags', tags)
//   }

//   const removeSize = (sizeIndex, detailType) => {
//     setEditForm(prev => ({
//       ...prev,
//       [detailType]: {
//         ...prev[detailType],
//         sizes: prev[detailType].sizes.filter((_, index) => index !== sizeIndex)
//       }
//     }))
//   }

//   if (!isOpen || !product) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-bold text-gray-800">Edit Product</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
//           >
//             ×
//           </button>
//         </div>

//         {/* Images Section */}
//         <div className="mb-6">
//           <h4 className="text-lg font-semibold mb-4 text-gray-700">Product Images</h4>
          
//           {/* Existing Images */}
//           {existingImages.length > 0 && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2 text-gray-600">Current Images</label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {existingImages.map((image, index) => (
//                   <div key={image._id || index} className="relative group">
//                     <div className="w-full h-32 border-2 border-gray-200 rounded-lg overflow-hidden">
//                       <img 
//                         src={getImageUrl(image)} 
//                         alt={`Product ${index + 1}`}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyMEwyOCAyNEgzMlYyOEgzNlYzMkgzMlYzNkgyOFYzMkgyNFYyOEgyMFYyNEgyNFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
//                         }}
//                       />
//                     </div>
                    
//                     {/* Image controls */}
//                     <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-center items-center space-y-2">
//                       {!image.isPrimary && (
//                         <button
//                           type="button"
//                           onClick={() => setPrimaryImage(image._id, true)}
//                           className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
//                         >
//                           Set Primary
//                         </button>
//                       )}
//                       <button
//                         type="button"
//                         onClick={() => markImageForDeletion(image._id)}
//                         className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
//                       >
//                         Delete
//                       </button>
//                     </div>
                    
//                     {/* Primary badge */}
//                     {image.isPrimary && (
//                       <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
//                         Primary
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* New Images Preview */}
//           {newImages.length > 0 && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2 text-gray-600">New Images (will be uploaded)</label>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {newImages.map((imageData, index) => (
//                   <div key={index} className="relative group">
//                     <div className="w-full h-32 border-2 border-dashed border-blue-300 rounded-lg overflow-hidden">
//                       <img 
//                         src={imageData.preview} 
//                         alt={`New ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center items-center">
//                       <button
//                         type="button"
//                         onClick={() => removeNewImage(index)}
//                         className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                     <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
//                       New
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Add New Images */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-600">Add More Images</label>
//             <input
//               type="file"
//               multiple
//               accept="image/jpeg,image/jpg,image/png,image/webp"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               Select JPEG, PNG, or WEBP images. Max 5MB per image.
//             </p>
//           </div>
//         </div>
        
//         {/* Basic Information */}
//         <div className="mb-6">
//           <h4 className="text-lg font-semibold mb-4 text-gray-700">Basic Information</h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">Product Name *</label>
//               <input
//                 type="text"
//                 value={editForm.name || ''}
//                 onChange={(e) => handleFormChange('name', e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   validationErrors.name ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Enter product name"
//               />
//               {validationErrors.name && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">Brand</label>
//               <input
//                 type="text"
//                 value={editForm.brand || ''}
//                 onChange={(e) => handleFormChange('brand', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter brand name"
//               />
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">Category *</label>
//               <select
//                 value={editForm.category || ''}
//                 onChange={(e) => handleFormChange('category', e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   validationErrors.category ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               >
//                 <option value="">Select Category</option>
//                 <option value="Men">Men</option>
//                 <option value="Women">Women</option>
//               </select>
//               {validationErrors.category && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">Subcategory *</label>
//               <select
//                 value={editForm.subcategory || ''}
//                 onChange={(e) => handleFormChange('subcategory', e.target.value)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   validationErrors.subcategory ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               >
//                 <option value="">Select Subcategory</option>
//                 <option value="Shoes">Shoes</option>
//                 <option value="Jackets">Jackets</option>
//               </select>
//               {validationErrors.subcategory && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.subcategory}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">Status</label>
//               <select
//                 value={editForm.status || 'Active'}
//                 onChange={(e) => handleFormChange('status', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//                 <option value="Draft">Draft</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">SKU</label>
//               <input
//                 type="text"
//                 value={editForm.sku || ''}
//                 onChange={(e) => handleFormChange('sku', e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter SKU"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Inventory & Pricing */}
//         <div className="mb-6">
//           <h4 className="text-lg font-semibold mb-4 text-gray-700">Inventory & Pricing</h4>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">Stock Quantity</label>
//               <input
//                 type="number"
//                 value={editForm.stockQuantity || 0}
//                 onChange={(e) => handleFormChange('stockQuantity', parseInt(e.target.value) || 0)}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   validationErrors.stockQuantity ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 min="0"
//                 placeholder="0"
//               />
//               {validationErrors.stockQuantity && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.stockQuantity}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">Base Price *</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={editForm.price?.base || 0}
//                 onChange={(e) => handleFormChange('base', parseFloat(e.target.value) || 0, 'price')}
//                 className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   validationErrors.basePrice ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 min="0"
//                 placeholder="0.00"
//               />
//               {validationErrors.basePrice && (
//                 <p className="text-red-500 text-xs mt-1">{validationErrors.basePrice}</p>
//               )}
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-600">Discount Price</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 value={editForm.price?.discount || 0}
//                 onChange={(e) => handleFormChange('discount', parseFloat(e.target.value) || 0, 'price')}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 min="0"
//                 placeholder="0.00"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2 text-gray-600">Description</label>
//           <textarea
//             value={editForm.description || ''}
//             onChange={(e) => handleFormChange('description', e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//             placeholder="Enter product description"
//           />
//         </div>

//         {/* Tags */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2 text-gray-600">Tags</label>
//           <input
//             type="text"
//             value={editForm.tags?.join(', ') || ''}
//             onChange={(e) => handleTagsChange(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter tags separated by commas"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Separate tags with commas (e.g., leather, formal, comfortable)
//           </p>
//         </div>

//         {/* Category-specific details */}
//         {editForm.subcategory === 'Shoes' && (
//           <div className="mb-6">
//             <h4 className="text-lg font-semibold mb-4 text-gray-700">Shoe Details</h4>
            
//             {/* Style Selection */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2 text-gray-600">Style</label>
//               <select
//                 value={editForm.shoeDetails?.style || 'Other'}
//                 onChange={(e) => handleFormChange('style', e.target.value, 'shoeDetails')}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="Formal">Formal</option>
//                 <option value="Casual">Casual</option>
//                 <option value="Boots">Boots</option>
//                 <option value="Sports">Sports</option>
//                 <option value="Sandals">Sandals</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             {/* Materials Section */}
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <label className="block text-sm font-medium text-gray-600">Materials</label>
//                 <button
//                   type="button"
//                   onClick={addMaterial}
//                   className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
//                 >
//                   Add Material
//                 </button>
//               </div>
//               {editForm.shoeDetails?.materials?.map((material, index) => (
//                 <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3 p-3 border border-gray-200 rounded-lg">
//                   <input
//                     type="text"
//                     placeholder="Leather Type"
//                     value={material.leatherType || ''}
//                     onChange={(e) => handleMaterialChange(index, 'leatherType', e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Sole Material"
//                     value={material.soleMaterial || ''}
//                     onChange={(e) => handleMaterialChange(index, 'soleMaterial', e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Color Name"
//                     value={material.colorName || ''}
//                     onChange={(e) => handleMaterialChange(index, 'colorName', e.target.value)}
//                     className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <div className="flex gap-2">
//                     <input
//                       type="color"
//                       value={material.colorCode || '#000000'}
//                       onChange={(e) => handleMaterialChange(index, 'colorCode', e.target.value)}
//                       className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
//                       title="Color Code"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeMaterial(index)}
//                       className="px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex-1"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//               {(!editForm.shoeDetails?.materials || editForm.shoeDetails.materials.length === 0) && (
//                 <p className="text-gray-500 text-sm italic">No materials added yet. Click "Add Material" to get started.</p>
//               )}
//             </div>

//             {/* Sizes Section */}
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <label className="block text-sm font-medium text-gray-600">Available Sizes</label>
//                 <button
//                   type="button"
//                   onClick={() => addSize('shoeDetails')}
//                   className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
//                 >
//                   Add Size
//                 </button>
//               </div>
//               {editForm.shoeDetails?.sizes?.map((size, index) => (
//                 <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3 p-3 border border-gray-200 rounded-lg">
//                   <input
//                     type="text"
//                     placeholder="Size (e.g., 8, 9.5, M, L)"
//                     value={size.sizeLabel || size.size || ''}
//                     onChange={(e) => handleSizeChange(index, 'size', e.target.value, 'shoeDetails')}
//                     className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Stock Quantity"
//                     value={size.stock || 0}
//                     onChange={(e) => handleSizeChange(index, 'stock', parseInt(e.target.value) || 0, 'shoeDetails')}
//                     className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     min="0"
//                   />
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={size.available !== false}
//                       onChange={(e) => handleSizeChange(index, 'available', e.target.checked, 'shoeDetails')}
//                       className="mr-2"
//                     />
//                     <label className="text-sm text-gray-600">Available</label>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeSize(index, 'shoeDetails')}
//                     className="px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//                   >
//                     Remove Size
//                   </button>
//                 </div>
//               ))}
//               {(!editForm.shoeDetails?.sizes || editForm.shoeDetails.sizes.length === 0) && (
//                 <p className="text-gray-500 text-sm italic">No sizes added yet. Click "Add Size" to get started.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Jacket Details */}
//         {editForm.subcategory === 'Jackets' && (
//           <div className="mb-6">
//             <h4 className="text-lg font-semibold mb-4 text-gray-700">Jacket Details</h4>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-600">Material</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., Cotton, Leather, Polyester"
//                   value={editForm.jacketDetails?.material || ''}
//                   onChange={(e) => handleFormChange('material', e.target.value, 'jacketDetails')}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-600">Season</label>
//                 <select
//                   value={editForm.jacketDetails?.season || ''}
//                   onChange={(e) => handleFormChange('season', e.target.value, 'jacketDetails')}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Season</option>
//                   <option value="Spring">Spring</option>
//                   <option value="Summer">Summer</option>
//                   <option value="Fall">Fall</option>
//                   <option value="Winter">Winter</option>
//                   <option value="All Season">All Season</option>
//                 </select>
//               </div>
//             </div>

//             {/* Jacket Sizes */}
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <label className="block text-sm font-medium text-gray-600">Available Sizes</label>
//                 <button
//                   type="button"
//                   onClick={() => addSize('jacketDetails')}
//                   className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
//                 >
//                   Add Size
//                 </button>
//               </div>
//               {editForm.jacketDetails?.sizes?.map((size, index) => (
//                 <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3 p-3 border border-gray-200 rounded-lg">
//                   <input
//                     type="text"
//                     placeholder="Size (e.g., XS, S, M, L, XL)"
//                     value={size.sizeLabel || size.size || ''}
//                     onChange={(e) => handleSizeChange(index, 'size', e.target.value, 'jacketDetails')}
//                     className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                   <input
//                     type="number"
//                     placeholder="Stock Quantity"
//                     value={size.stock || 0}
//                     onChange={(e) => handleSizeChange(index, 'stock', parseInt(e.target.value) || 0, 'jacketDetails')}
//                     className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     min="0"
//                   />
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={size.available !== false}
//                       onChange={(e) => handleSizeChange(index, 'available', e.target.checked, 'jacketDetails')}
//                       className="mr-2"
//                     />
//                     <label className="text-sm text-gray-600">Available</label>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => removeSize(index, 'jacketDetails')}
//                     className="px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//                   >
//                     Remove Size
//                   </button>
//                 </div>
//               ))}
//               {(!editForm.jacketDetails?.sizes || editForm.jacketDetails.sizes.length === 0) && (
//                 <p className="text-gray-500 text-sm italic">No sizes added yet. Click "Add Size" to get started.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Modal Footer */}
//         <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
//           <button
//             onClick={onClose}
//             disabled={updating}
//             className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={updateProduct}
//             disabled={updating}
//             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//           >
//             {updating && (
//               <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//             )}
//             {updating ? 'Updating...' : 'Update Product'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EditProductModal



// File: src/components/EditProductModal.jsx

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../Config'

const EditProductModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onProductUpdated, 
  token 
}) => {
  const [editForm, setEditForm] = useState({})
  const [updating, setUpdating] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [newImages, setNewImages] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])

  // Size options matching Add.jsx
  const shoeSizeOptions = ['EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45', 'EU 46', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12']
  const jacketSizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  // Initialize form data when product changes
  useEffect(() => {
    if (product && isOpen) {
      setEditForm({
        name: product.name || '',
        brand: product.brand || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        status: product.status || 'Active',
        sku: product.sku || '',
        price: {
          base: product.price?.base || 0,
          discount: product.price?.discount || 0
        },
        description: product.description || '',
        // Shoe-specific details
        shoeDetails: product.shoeDetails || {
          style: 'Casual',
          sizes: [],
          materials: [{
            leatherType: "",
            soleMaterial: "",
            colorName: "",
            colorCode: "#000000"
          }]
        },
        // Jacket-specific details
        jacketDetails: product.jacketDetails || {
          material: '',
          season: 'All Season',
          sizes: []
        }
      })
      setExistingImages(product.images || [])
      setNewImages([])
      setImagesToDelete([])
      setValidationErrors({})
    }
  }, [product, isOpen])

  // Helper function to get proper image URL
  const getImageUrl = (image) => {
    if (!image || !image.url) return null
    
    let imageUrl = image.url
    if (imageUrl.startsWith('/upload/')) {
      imageUrl = imageUrl.replace('/upload/', '/uploads/')
    }
    
    if (imageUrl.startsWith('/uploads/')) {
      const baseUrl = backendUrl.replace(/\/$/, '')
      imageUrl = `${baseUrl}${imageUrl}`
    }
    
    return imageUrl
  }

  const handleFormChange = (field, value, nested = null) => {
    if (nested) {
      setEditForm(prev => ({
        ...prev,
        [nested]: {
          ...prev[nested],
          [field]: value
        }
      }))
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: value
      }))
    }

    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  // Handle new image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length + newImages.length > 10) {
      toast.error("Maximum 10 images allowed")
      return
    }
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB
    
    const invalidFiles = files.filter(file => !validTypes.includes(file.type))
    if (invalidFiles.length > 0) {
      toast.error('Please select only JPEG, PNG, or WEBP images')
      return
    }

    const oversizedFiles = files.filter(file => file.size > maxSize)
    if (oversizedFiles.length > 0) {
      toast.error('Each image must be smaller than 5MB')
      return
    }

    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          resolve({
            file: file,
            preview: e.target.result,
            name: file.name
          })
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(imagePromises).then(imageData => {
      setNewImages(prev => [...prev, ...imageData])
    })
  }

  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index))
  }

  const markImageForDeletion = (imageId) => {
    setImagesToDelete(prev => [...prev, imageId])
    setExistingImages(prev => prev.filter(img => img._id !== imageId))
  }

  const setPrimaryImage = (imageId, isExisting = true) => {
    if (isExisting) {
      setExistingImages(prev => prev.map(img => ({
        ...img,
        isPrimary: img._id === imageId
      })))
    }
  }

  const deleteExistingImages = async () => {
    for (const imageId of imagesToDelete) {
      try {
        await axios.delete(`${backendUrl}/api/product/${product._id}/images/${imageId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } catch (error) {
        console.error(`Failed to delete image ${imageId}:`, error)
      }
    }
  }

  // Handle shoe size selection (matching Add.jsx style)
  const handleShoeSizeToggle = (size) => {
    const currentSizes = editForm.shoeDetails?.sizes || []
    const sizeExists = currentSizes.find(s => s.sizeLabel === size)
    
    if (sizeExists) {
      // Remove size
      setEditForm(prev => ({
        ...prev,
        shoeDetails: {
          ...prev.shoeDetails,
          sizes: prev.shoeDetails.sizes.filter(s => s.sizeLabel !== size)
        }
      }))
    } else {
      // Add size
      setEditForm(prev => ({
        ...prev,
        shoeDetails: {
          ...prev.shoeDetails,
          sizes: [...(prev.shoeDetails.sizes || []), {
            sizeLabel: size,
            stock: 0,
            available: true
          }]
        }
      }))
    }
  }

  // Handle jacket size selection (matching Add.jsx style)
  const handleJacketSizeToggle = (size) => {
    const currentSizes = editForm.jacketDetails?.sizes || []
    const sizeExists = currentSizes.find(s => s.sizeLabel === size)
    
    if (sizeExists) {
      // Remove size
      setEditForm(prev => ({
        ...prev,
        jacketDetails: {
          ...prev.jacketDetails,
          sizes: prev.jacketDetails.sizes.filter(s => s.sizeLabel !== size)
        }
      }))
    } else {
      // Add size
      setEditForm(prev => ({
        ...prev,
        jacketDetails: {
          ...prev.jacketDetails,
          sizes: [...(prev.jacketDetails.sizes || []), {
            sizeLabel: size,
            stock: 0,
            available: true
          }]
        }
      }))
    }
  }

  // Handle shoe stock change
  const handleShoeStockChange = (size, stock) => {
    setEditForm(prev => ({
      ...prev,
      shoeDetails: {
        ...prev.shoeDetails,
        sizes: prev.shoeDetails.sizes.map(s => 
          s.sizeLabel === size ? { ...s, stock: parseInt(stock) || 0 } : s
        )
      }
    }))
  }

  // Handle jacket stock change
  const handleJacketStockChange = (size, stock) => {
    setEditForm(prev => ({
      ...prev,
      jacketDetails: {
        ...prev.jacketDetails,
        sizes: prev.jacketDetails.sizes.map(s => 
          s.sizeLabel === size ? { ...s, stock: parseInt(stock) || 0 } : s
        )
      }
    }))
  }

  // Handle material changes (matching Add.jsx)
  const updateMaterial = (index, field, value) => {
    setEditForm(prev => ({
      ...prev,
      shoeDetails: {
        ...prev.shoeDetails,
        materials: prev.shoeDetails.materials.map((material, i) => 
          i === index ? { ...material, [field]: value } : material
        )
      }
    }))
  }

  const addMaterial = () => {
    setEditForm(prev => ({
      ...prev,
      shoeDetails: {
        ...prev.shoeDetails,
        materials: [...(prev.shoeDetails.materials || []), {
          leatherType: "",
          soleMaterial: "",
          colorName: "",
          colorCode: "#000000"
        }]
      }
    }))
  }

  const removeMaterial = (index) => {
    if (editForm.shoeDetails?.materials?.length > 1) {
      setEditForm(prev => ({
        ...prev,
        shoeDetails: {
          ...prev.shoeDetails,
          materials: prev.shoeDetails.materials.filter((_, i) => i !== index)
        }
      }))
    }
  }

  // Reset form when subcategory changes
  const handleSubcategoryChange = (newSubcategory) => {
    setEditForm(prev => ({
      ...prev,
      subcategory: newSubcategory,
      shoeDetails: {
        style: 'Casual',
        sizes: [],
        materials: [{
          leatherType: "",
          soleMaterial: "",
          colorName: "",
          colorCode: "#000000"
        }]
      },
      jacketDetails: {
        material: '',
        season: 'All Season',
        sizes: []
      }
    }))
  }

  const validateForm = () => {
    const errors = {}

    if (!editForm.name?.trim()) {
      errors.name = 'Product name is required'
    }
    if (!editForm.description?.trim()) {
      errors.description = 'Product description is required'
    }
    if (!editForm.price?.base || editForm.price.base <= 0) {
      errors.basePrice = 'Valid base price is required'
    }
    if (editForm.price?.discount && editForm.price.discount >= editForm.price.base) {
      errors.discountPrice = 'Discount price must be less than base price'
    }
    if (editForm.subcategory === 'Shoes' && (!editForm.shoeDetails?.sizes || editForm.shoeDetails.sizes.length === 0)) {
      errors.shoeSizes = 'At least one shoe size must be selected'
    }
    if (editForm.subcategory === 'Jackets' && (!editForm.jacketDetails?.sizes || editForm.jacketDetails.sizes.length === 0)) {
      errors.jacketSizes = 'At least one jacket size must be selected'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const updateProduct = async () => {
    if (!token) {
      toast.error('Authentication token not found')
      return
    }

    if (!validateForm()) {
      toast.error('Please fix the validation errors')
      return
    }

    try {
      setUpdating(true)
      
      if (imagesToDelete.length > 0) {
        await deleteExistingImages()
      }
      
      const formData = new FormData()
      
      newImages.forEach(imageData => {
        formData.append('images', imageData.file)
      })
      
      if (editForm.sku?.trim()) formData.append("sku", editForm.sku.trim().toUpperCase())
      formData.append('name', editForm.name.trim())
      formData.append('brand', editForm.brand?.trim() || '')
      formData.append('category', editForm.category)
      formData.append('subcategory', editForm.subcategory)
      formData.append('status', editForm.status)
      formData.append('description', editForm.description.trim())
      
      formData.append("price", JSON.stringify({
        base: parseFloat(editForm.price.base),
        discount: editForm.price.discount ? parseFloat(editForm.price.discount) : 0
      }))
      
      if (editForm.subcategory === "Shoes") {
        const shoeSizesData = editForm.shoeDetails.sizes.map(size => ({
          sizeLabel: size.sizeLabel,
          stock: size.stock || 0,
          available: true
        }))
        
        const shoeDetailsData = {
          sizes: shoeSizesData,
          style: editForm.shoeDetails.style,
          materials: editForm.shoeDetails.materials.filter(m => m.leatherType || m.soleMaterial || m.colorName)
        }
        
        formData.append("shoeDetails", JSON.stringify(shoeDetailsData))
      } else if (editForm.subcategory === "Jackets") {
        const jacketSizesData = editForm.jacketDetails.sizes.map(size => ({
          sizeLabel: size.sizeLabel,
          stock: size.stock || 0,
          available: true
        }))
        
        const jacketDetailsData = {
          sizes: jacketSizesData,
          material: editForm.jacketDetails.material,
          season: editForm.jacketDetails.season
        }
        
        formData.append("jacketDetails", JSON.stringify(jacketDetailsData))
      }

      const response = await axios.put(`${backendUrl}/api/product/${product._id}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        toast.success('Product updated successfully')
        onProductUpdated()
        onClose()
      } else {
        toast.error(response.data.message || 'Failed to update product')
      }
    } catch (error) {
      console.error('Update product error:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
      } else if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.')
      } else {
        toast.error(error.response?.data?.message || 'Failed to update product')
      }
    } finally {
      setUpdating(false)
    }
  }

  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <form className='flex flex-col w-full items-start gap-6'>
          {/* Image Upload Section */}
          <div className='w-full'>
            <p className='mb-2 font-semibold'>Product Images * <span className="text-sm text-gray-500">(Max 10, 5MB each)</span></p>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Images</p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4'>
                  {existingImages.map((image, index) => (
                    <div key={image._id || index} className='relative group'>
                      <img 
                        className='w-20 h-20 object-cover rounded border' 
                        src={getImageUrl(image)} 
                        alt={`Current ${index + 1}`}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyMEwyOCAyNEgzMlYyOEgzNlYzMkgzMlYzNkgyOFYzMkgyNFYyOEgyMFYyNEgyNFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => markImageForDeletion(image._id)}
                        className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        ×
                      </button>
                      {!image.isPrimary && (
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(image._id, true)}
                          className="absolute -bottom-2 left-0 right-0 bg-blue-500 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Set Primary
                        </button>
                      )}
                      {image.isPrimary && (
                        <div className="absolute -bottom-2 left-0 right-0 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                          Primary
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4'>
              {newImages.map((imageData, index) => (
                <div key={index} className='relative group'>
                  <img 
                    className='w-20 h-20 object-cover rounded border border-dashed border-blue-300' 
                    src={imageData.preview} 
                    alt={`New ${index + 1}`} 
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    ×
                  </button>
                  <div className="absolute -bottom-2 left-0 right-0 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                    New
                  </div>
                </div>
              ))}
              {(existingImages.length + newImages.length) < 10 && (
                <label className='cursor-pointer hover:opacity-80'>
                  <div className='w-20 h-20 border-2 border-dashed border-gray-400 hover:border-gray-600 rounded flex items-center justify-center bg-gray-50'>
                    <span className='text-xs text-gray-500'>Add Image</span>
                  </div>
                  <input 
                    onChange={handleImageChange} 
                    type="file" 
                    multiple 
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className='hidden' 
                    disabled={updating}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Basic Product Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            <div>
              <p className='mb-2 font-semibold'>Product Name *</p>
              <input 
                onChange={(e) => handleFormChange('name', e.target.value)} 
                value={editForm.name || ''} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                type="text" 
                placeholder='Enter product name' 
                required
                maxLength={100}
                disabled={updating}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
              )}
            </div>
            
            <div>
              <p className='mb-2 font-semibold'>SKU <span className="text-sm text-gray-500">(Optional)</span></p>
              <input 
                onChange={(e) => handleFormChange('sku', e.target.value)} 
                value={editForm.sku || ''} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                type="text" 
                placeholder='e.g., MSHO123456' 
                maxLength={20}
                disabled={updating}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            <div>
              <p className='mb-2 font-semibold'>Brand</p>
              <input 
                onChange={(e) => handleFormChange('brand', e.target.value)} 
                value={editForm.brand || ''} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                type="text" 
                placeholder='Enter brand name' 
                disabled={updating}
              />
            </div>
            
            <div>
              <p className='mb-2 font-semibold'>Status</p>
              <select 
                onChange={(e) => handleFormChange('status', e.target.value)} 
                value={editForm.status || 'Active'} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={updating}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <p className='mb-2 font-semibold'>Product Description *</p>
            <textarea 
              onChange={(e) => handleFormChange('description', e.target.value)} 
              value={editForm.description || ''} 
              className='w-full px-3 py-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='Write detailed product description' 
              required
              maxLength={2000}
              disabled={updating}
            />
            {validationErrors.description && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
            )}
            <p className='text-xs text-gray-500 mt-1'>{(editForm.description || '').length}/2000 characters</p>
          </div>

          {/* Categories */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            <div>
              <p className='mb-2 font-semibold'>Category *</p>
              <select 
                onChange={(e) => handleFormChange('category', e.target.value)} 
                value={editForm.category || ''} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={updating}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>

            <div>
              <p className='mb-2 font-semibold'>Subcategory *</p>
              <select 
                onChange={(e) => handleSubcategoryChange(e.target.value)} 
                value={editForm.subcategory || ''} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={updating}
              >
                <option value="Shoes">Shoes</option>
                <option value="Jackets">Jackets</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
            <div>
              <p className='mb-2 font-semibold'>Base Price *</p>
              <input 
                onChange={(e) => handleFormChange('base', e.target.value, 'price')} 
                value={editForm.price?.base || ''} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                type="number" 
                placeholder="99.99" 
                step="0.01"
                min="0"
                required
                disabled={updating}
              />
              {validationErrors.basePrice && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.basePrice}</p>
              )}
            </div>
            
            <div>
              <p className='mb-2 font-semibold'>Discount Price <span className="text-sm text-gray-500">(Optional)</span></p>
              <input 
                onChange={(e) => handleFormChange('discount', e.target.value, 'price')} 
                value={editForm.price?.discount || ''} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                type="number" 
                placeholder="79.99" 
                step="0.01"
                min="0"
                disabled={updating}
              />
              {validationErrors.discountPrice && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.discountPrice}</p>
              )}
            </div>
          </div>

          {/* Shoe-specific sections */}
          {editForm.subcategory === "Shoes" && (
            <>
              {/* Shoe Sizes and Stock */}
              <div className='w-full'>
                <p className='mb-2 font-semibold'>Available Shoe Sizes and Stock *</p>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4'>
                  {shoeSizeOptions.map((size) => {
                    const sizeData = editForm.shoeDetails?.sizes?.find(s => s.sizeLabel === size)
                    const isSelected = !!sizeData
                    return (
                      <div key={size} className='text-center'>
                        <div 
                          onClick={() => !updating && handleShoeSizeToggle(size)}
                          className={`${isSelected ? "bg-blue-100 border-blue-300" : "bg-slate-200 border-gray-300"} px-3 py-1 cursor-pointer border rounded mb-2 hover:bg-blue-50 transition-colors ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <p className='text-sm'>{size}</p>
                        </div>
                        {isSelected && (
                          <input
                            type="number"
                            placeholder="Stock"
                            className='w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                            value={sizeData.stock || ''}
                            onChange={(e) => handleShoeStockChange(size, e.target.value)}
                            min="0"
                            disabled={updating}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                {validationErrors.shoeSizes && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.shoeSizes}</p>
                )}
              </div>

              {/* Shoe Style */}
              <div className='w-full md:w-1/2'>
                <p className='mb-2 font-semibold'>Shoe Style</p>
                <select 
                  onChange={(e) => handleFormChange('style', e.target.value, 'shoeDetails')} 
                  value={editForm.shoeDetails?.style || 'Casual'} 
                  className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                  disabled={updating}
                >
                  <option value="Casual">Casual</option>
                  <option value="Formal">Formal</option>
                  <option value="Boots">Boots</option>
                  <option value="Sports">Sports</option>
                  <option value="Sandals">Sandals</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Materials */}
              <div className='w-full border p-4 rounded'>
                <div className="flex justify-between items-center mb-3">
                  <p className='font-semibold'>Materials and Colors</p>
                  <button 
                    type="button" 
                    onClick={addMaterial} 
                    className='px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600'
                    disabled={updating}
                  >
                    Add Material
                  </button>
                </div>
                {editForm.shoeDetails?.materials?.map((material, index) => (
                  <div key={index} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-3 p-3 border rounded'>
                    <input
                      type="text"
                      placeholder="Leather type"
                      value={material.leatherType || ''}
                      onChange={(e) => updateMaterial(index, 'leatherType', e.target.value)}
                      className='px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                      disabled={updating}
                    />
                    <input
                      type="text"
                      placeholder="Sole material"
                      value={material.soleMaterial || ''}
                      onChange={(e) => updateMaterial(index, 'soleMaterial', e.target.value)}
                      className='px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                      disabled={updating}
                    />
                    <input
                      type="text"
                      placeholder="Color name"
                      value={material.colorName || ''}
                      onChange={(e) => updateMaterial(index, 'colorName', e.target.value)}
                      className='px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                      disabled={updating}
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={material.colorCode || '#000000'}
                        onChange={(e) => updateMaterial(index, 'colorCode', e.target.value)}
                        className='w-12 h-10 border rounded cursor-pointer'
                        disabled={updating}
                      />
                      <span className="text-xs text-gray-500">{material.colorCode || '#000000'}</span>
                    </div>
                    {editForm.shoeDetails?.materials?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMaterial(index)}
                        className='px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600'
                        disabled={updating}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Jacket-specific sections */}
          {editForm.subcategory === "Jackets" && (
            <>
              {/* Jacket Sizes and Stock */}
              <div className='w-full'>
                <p className='mb-2 font-semibold'>Available Jacket Sizes and Stock *</p>
                <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-4'>
                  {jacketSizeOptions.map((size) => {
                    const sizeData = editForm.jacketDetails?.sizes?.find(s => s.sizeLabel === size)
                    const isSelected = !!sizeData
                    return (
                      <div key={size} className='text-center'>
                        <div 
                          onClick={() => !updating && handleJacketSizeToggle(size)}
                          className={`${isSelected ? "bg-purple-100 border-purple-300" : "bg-slate-200 border-gray-300"} px-3 py-1 cursor-pointer border rounded mb-2 hover:bg-purple-50 transition-colors ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <p className='text-sm'>{size}</p>
                        </div>
                        {isSelected && (
                          <input
                            type="number"
                            placeholder="Stock"
                            className='w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                            value={sizeData.stock || ''}
                            onChange={(e) => handleJacketStockChange(size, e.target.value)}
                            min="0"
                            disabled={updating}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                {validationErrors.jacketSizes && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.jacketSizes}</p>
                )}
              </div>

              {/* Jacket Details */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                <div>
                  <p className='mb-2 font-semibold'>Jacket Material</p>
                  <input 
                    onChange={(e) => handleFormChange('material', e.target.value, 'jacketDetails')} 
                    value={editForm.jacketDetails?.material || ''} 
                    className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                    type="text" 
                    placeholder='e.g., Leather, Denim, Cotton' 
                    disabled={updating}
                  />
                </div>
                
                <div>
                  <p className='mb-2 font-semibold'>Season</p>
                  <select 
                    onChange={(e) => handleFormChange('season', e.target.value, 'jacketDetails')} 
                    value={editForm.jacketDetails?.season || 'All Season'} 
                    className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                    disabled={updating}
                  >
                    <option value="All Season">All Season</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 w-full">
            <button
              type="button"
              onClick={onClose}
              disabled={updating}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={updateProduct}
              className={`px-6 py-2 mt-4 rounded font-medium transition-colors ${
                updating 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              disabled={updating || !token}
            >
              {updating ? "UPDATING PRODUCT..." : "UPDATE PRODUCT"}
            </button>
          </div>
          
          {!token && (
            <p className="text-red-500 text-sm">Please login to update products</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default EditProductModal