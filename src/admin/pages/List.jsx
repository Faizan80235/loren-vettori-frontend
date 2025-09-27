// // File: src/admin/pages/List.jsx

// import axios from 'axios'
// import React from 'react'
// import { backendUrl, adminCurrency, isAvailable } from '../Config'
// import { toast } from 'react-toastify'
// import { useState, useEffect } from 'react'
// import EditProductModal from '../components/EditModel'

// const List = () => {
//   const token = localStorage.getItem('token');

//   const [list, setList] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [imageLoadErrors, setImageLoadErrors] = useState({})
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [pagination, setPagination] = useState({
//     page: 1,
//     pages: 1,
//     total: 0,
//     limit: 10
//   })
//   const [filters, setFilters] = useState({
//     category: '',
//     subcategory: '',
//     status: '',
//     search: ''
//   })
  
//   const fetchList = async (page = 1, currentFilters = filters) => {
//     try {
//       setLoading(true)
      
//       const params = new URLSearchParams({
//         page: page.toString(),
//         limit: pagination.limit.toString(),
//         admin: 'true'
//       })
      
//       if (currentFilters.category) {
//         params.append('category', currentFilters.category)
//       }
//       if (currentFilters.subcategory) {
//         params.append('subcategory', currentFilters.subcategory)
//       }
//       if (currentFilters.status) {
//         params.append('status', currentFilters.status)
//       }
//       if (currentFilters.search) {
//         params.append('search', currentFilters.search)
//       }

//       const response = await axios.get(`${backendUrl}/api/product/?${params.toString()}`)
      
//       console.log('Admin API Response:', response.data)
      
//       if (response.data.success) {
//         const products = response.data.data || []
//         console.log('Products with images:', products.map(p => ({ 
//           id: p._id, 
//           name: p.name, 
//           images: p.images,
//           firstImageUrl: p.images?.[0]?.url 
//         })))
        
//         setList(products)
//         setPagination(response.data.pagination || {
//           page: 1,
//           pages: 1,
//           total: 0,
//           limit: 10
//         })
        
//         setImageLoadErrors({})
//       } else {
//         toast.error(response.data.message || 'Failed to fetch products')
//       }
//     } catch (error) {
//       console.error('Fetch products error:', error)
//       toast.error(error.response?.data?.message || 'Failed to fetch products')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchList()
//   }, [])

//   const removeProduct = async (id) => {
//     if (!token) {
//       toast.error('Authentication token not found')
//       return
//     }

//     if (!window.confirm('Are you sure you want to delete this product?')) {
//       return
//     }
  
//     try {
//       const response = await axios.delete(`${backendUrl}/api/product/${id}`, {
//         headers: { 
//           Authorization: `Bearer ${token}`
//         }
//       })

//       if (response.data.success) {
//         toast.success(response.data.message || 'Product deleted successfully')
//         await fetchList(pagination.page)
//       } else {
//         toast.error(response.data.message || 'Failed to delete product')
//       }
//     } catch (error) {
//       console.error('Delete product error:', error)
//       if (error.response?.status === 401) {
//         toast.error('Session expired. Please login again.')
//       } else if (error.response?.status === 403) {
//         toast.error('Access denied. Admin privileges required.')
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to delete product')
//       }
//     }
//   }

//   const handleEditProduct = (product) => {
//     setEditingProduct(product)
//     setIsModalOpen(true)
//   }

//   const handleCloseModal = () => {
//     setIsModalOpen(false)
//     setEditingProduct(null)
//   }

//   const handleProductUpdated = () => {
//     fetchList(pagination.page)
//   }

//   const handleFilterChange = (filterType, value) => {
//     const newFilters = { ...filters, [filterType]: value }
//     setFilters(newFilters)
//     fetchList(1, newFilters)
//   }

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.pages) {
//       fetchList(newPage)
//     }
//   }

//   const clearFilters = () => {
//     const clearedFilters = { category: '', subcategory: '', status: '', search: '' }
//     setFilters(clearedFilters)
//     fetchList(1, clearedFilters)
//   }

//   const getEffectivePrice = (item) => {
//     if (item.effectivePrice) return item.effectivePrice;
//     if (item.price?.discount > 0) return item.price.discount;
//     return item.price?.base || item.price || 0;
//   }

//   const getStockInfo = (item) => {
//     return item.stockQuantity || 0;
//   }

//   const getAvailableSizes = (item) => {
//     if (item.subcategory === 'Shoes' && item.shoeDetails?.sizes) {
//       return item.shoeDetails.sizes.filter(size => size.available && size.stock > 0).length;
//     }
//     if (item.subcategory === 'Jackets' && item.jacketDetails?.sizes) {
//       return item.jacketDetails.sizes.filter(size => size.available && size.stock > 0).length;
//     }
//     return 0;
//   }

//   // Image URL construction for uploads folder - using admin backend URL
//   const getImageUrl = (item) => {
//     if (!item.images || !Array.isArray(item.images) || item.images.length === 0) {
//       console.log(`No images found for product ${item.name}`)
//       return null
//     }
    
//     // Find primary image first
//     const primaryImage = item.images.find(img => img.isPrimary)
//     const imageToUse = primaryImage || item.images[0]
    
//     if (!imageToUse || !imageToUse.url) {
//       console.log(`No valid image URL found for product ${item.name}`)
//       return null
//     }
    
//     let imageUrl = imageToUse.url
    
//     // Handle both /upload/ and /uploads/ paths and construct full URL
//     if (imageUrl.startsWith('/upload/') || imageUrl.startsWith('/uploads/')) {
//       const baseUrl = backendUrl.replace(/\/$/, '')
//       // Convert /upload/ to /uploads/ if needed since files are in uploads folder
//       if (imageUrl.startsWith('/upload/')) {
//         imageUrl = imageUrl.replace('/upload/', '/uploads/')
//       }
//       imageUrl = `${baseUrl}${imageUrl}`
//     }
    
//     console.log(`Image URL for ${item.name}:`, imageUrl)
//     return imageUrl
//   }

//   const ProductImage = ({ item }) => {
//     const imageUrl = getImageUrl(item)
//     const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl)
//     const [hasError, setHasError] = useState(false)
    
//     useEffect(() => {
//       setCurrentImageUrl(imageUrl)
//       setHasError(false)
//     }, [imageUrl])
    
//     const handleError = (e) => {
//       console.error(`Failed to load image for ${item.name}:`, currentImageUrl)
//       setHasError(true)
//       setImageLoadErrors(prev => ({ ...prev, [item._id]: true }))
      
//       // Try alternative URL constructions if the first one fails
//       if (currentImageUrl && !hasError) {
//         let filename;
//         if (currentImageUrl.includes('/uploads/')) {
//           filename = currentImageUrl.split('/uploads/')[1];
//         } else if (currentImageUrl.includes('/upload/')) {
//           filename = currentImageUrl.split('/upload/')[1];
//         }
        
//         if (filename) {
//           const alternativeUrl = `${backendUrl}/uploads/${filename}`;
//           console.log('Trying alternative URL:', alternativeUrl);
//           setCurrentImageUrl(alternativeUrl);
//           return;
//         }
//       }
      
//       // Fallback to placeholder
//       e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyMEwyOCAyNEgzMlYyOEgzNlYzMkgzMlYzNkgyOFYzMkgyNFYyOEgyMFYyNEgyNFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
//     }
    
//     const handleLoad = () => {
//       console.log(`Image loaded successfully for ${item.name}`)
//       setHasError(false)
//     }
    
//     if (!currentImageUrl) {
//       return (
//         <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
//           <span className="text-gray-400 text-xs">No Image</span>
//         </div>
//       )
//     }
    
//     return (
//       <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
//         <img 
//           className="w-full h-full object-cover" 
//           src={currentImageUrl}
//           alt={item.name || 'Product image'}
//           onError={handleError}
//           onLoad={handleLoad}
//           loading="lazy"
//         />
//       </div>
//     )
//   }

//   return (
//     <div className="w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">All Products List</h2>
//         <div className="text-sm text-gray-600">
//           Total: {pagination.total} products | 
//           Status: {isAvailable ? ' Available' : ' Unavailable'}
//         </div>
//       </div>

//       {/* Enhanced Debug Info */}
//       {process.env.NODE_ENV === 'development' && (
//         <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
//           <details>
//             <summary className="cursor-pointer">Debug Info (click to expand)</summary>
//             <div className="mt-2">
//               <p>Admin Backend URL: {backendUrl}</p>
//               <p>Admin Currency: {adminCurrency}</p>
//               <p>Is Available: {isAvailable ? 'Yes' : 'No'}</p>
//               <p>Products loaded: {list.length}</p>
//               <p>Products with images: {list.filter(item => item.images && item.images.length > 0).length}</p>
//               <p>Image load errors: {Object.keys(imageLoadErrors).length}</p>
//               <div className="mt-2">
//                 <p className="font-medium">Sample Image URLs:</p>
//                 {list.slice(0, 3).map(item => (
//                   <div key={item._id} className="ml-2">
//                     <strong>{item.name}:</strong> {getImageUrl(item) || 'No image'}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </details>
//         </div>
//       )}

//       {/* System Status Banner */}
//       {!isAvailable && (
//         <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
//           <div className="flex items-center">
//             <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//             <span className="text-red-700 font-medium">System is currently unavailable for customers</span>
//           </div>
//         </div>
//       )}

//       {/* Filters */}
//       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Search</label>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={filters.search}
//               onChange={(e) => handleFilterChange('search', e.target.value)}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Category</label>
//             <select
//               value={filters.category}
//               onChange={(e) => handleFilterChange('category', e.target.value)}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Categories</option>
//               <option value="Men">Men</option>
//               <option value="Women">Women</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Subcategory</label>
//             <select
//               value={filters.subcategory}
//               onChange={(e) => handleFilterChange('subcategory', e.target.value)}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Subcategories</option>
//               <option value="Shoes">Shoes</option>
//               <option value="Jackets">Jackets</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Status</label>
//             <select
//               value={filters.status}
//               onChange={(e) => handleFilterChange('status', e.target.value)}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="">All Status</option>
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//               <option value="Draft">Draft</option>
//             </select>
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={clearFilters}
//               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center py-8">
//           <div className="text-gray-600">Loading products...</div>
//         </div>
//       ) : (
//         <>
//           {/* Products Table */}
//           <div className='flex flex-col gap-2'>
//             <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-100 text-sm font-medium'>
//               <span>Image</span>
//               <span>Product</span>
//               <span>SKU</span>
//               <span>Category</span>
//               <span>Stock</span>
//               <span>Sizes</span>
//               <span>Price ({adminCurrency})</span>
//               <span className='text-center'>Actions</span>
//             </div>

//             {list.length === 0 ? (
//               <div className="text-center py-8 text-gray-500">
//                 No products found
//               </div>
//             ) : (
//               list.map((item, index) => (
//                 <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-3 px-4 border text-sm hover:bg-gray-50' key={item._id || index}>
//                   <ProductImage item={item} />
                  
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-gray-500 text-xs">
//                       {item.brand && `${item.brand} • `}
//                       {item.subcategory === 'Shoes' && item.shoeDetails?.style && `${item.shoeDetails.style} • `}
//                       {item.subcategory}
//                     </p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         item.status === 'Active' 
//                           ? 'bg-green-100 text-green-800' 
//                           : item.status === 'Inactive' 
//                           ? 'bg-red-100 text-red-800' 
//                           : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {item.status}
//                       </span>
//                       {!isAvailable && (
//                         <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
//                           System Down
//                         </span>
//                       )}
//                     </div>
//                   </div>
                  
//                   <p className="hidden md:block text-xs font-mono">{item.sku || 'N/A'}</p>
//                   <p className="hidden md:block">{item.category}</p>
                  
//                   <div className="hidden md:block">
//                     <span className={`${getStockInfo(item) > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                       {getStockInfo(item)}
//                     </span>
//                   </div>
                  
//                   <div className="hidden md:block">
//                     <span className="text-blue-600">
//                       {getAvailableSizes(item)} sizes
//                     </span>
//                   </div>
                  
//                   <div className="hidden md:block">
//                     <div className="flex flex-col">
//                       <span className="font-medium">
//                         {adminCurrency}{getEffectivePrice(item).toFixed(2)}
//                       </span>
//                       {item.price?.discount > 0 && (
//                         <span className="text-xs text-gray-500 line-through">
//                           {adminCurrency}{item.price.base.toFixed(2)}
//                         </span>
//                       )}
//                       {item.discountPercent > 0 && (
//                         <span className="text-xs text-green-600">
//                           -{item.discountPercent}%
//                         </span>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div className='text-right md:text-center'>
//                     <div className="flex items-center justify-center space-x-2">
//                       <button
//                         onClick={() => handleEditProduct(item)}
//                         className='text-blue-600 hover:text-blue-800 cursor-pointer px-2 py-1 hover:bg-blue-50 rounded transition-colors'
//                         title="Edit product"
//                         disabled={!isAvailable}
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => removeProduct(item._id)}
//                         className='text-red-600 hover:text-red-800 cursor-pointer px-2 py-1 hover:bg-red-50 rounded transition-colors'
//                         title="Delete product"
//                         disabled={!isAvailable}
//                       >
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Pagination */}
//           {pagination.pages > 1 && (
//             <div className="flex justify-center items-center mt-6 space-x-2">
//               <button
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1 || !isAvailable}
//                 className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
              
//               {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   disabled={!isAvailable}
//                   className={`px-3 py-1 border rounded ${
//                     pagination.page === page 
//                       ? 'bg-blue-500 text-white border-blue-500' 
//                       : 'hover:bg-gray-50'
//                   } disabled:opacity-50 disabled:cursor-not-allowed`}
//                 >
//                   {page}
//                 </button>
//               ))}
              
//               <button
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.pages || !isAvailable}
//                 className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           )}

//           <div className="text-center text-sm text-gray-600 mt-4">
//             Showing {list.length} of {pagination.total} products (Page {pagination.page} of {pagination.pages})
//             <br />
//             <span className="text-xs">
//               Backend: {backendUrl} | Currency: {adminCurrency} | Available: {isAvailable ? 'Yes' : 'No'}
//             </span>
//           </div>
//         </>
//       )}

//       {/* Edit Product Modal */}
//       <EditProductModal
//         product={editingProduct}
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onProductUpdated={handleProductUpdated}
//         token={token}
//       />
//     </div>
//   )
// }

// export default List

// File: src/admin/pages/List.jsx

import axios from 'axios'
import React from 'react'
import { backendUrl, adminCurrency, isAvailable } from '../Config'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import EditProductModal from '../components/EditModel'

const List = () => {
  const token = localStorage.getItem('token');

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageLoadErrors, setImageLoadErrors] = useState({})
  const [editingProduct, setEditingProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Delete confirmation modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    limit: 10
  })
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    status: '',
    search: ''
  })
  
  const fetchList = async (page = 1, currentFilters = filters) => {
    try {
      setLoading(true)
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        admin: 'true'
      })
      
      if (currentFilters.category) {
        params.append('category', currentFilters.category)
      }
      if (currentFilters.subcategory) {
        params.append('subcategory', currentFilters.subcategory)
      }
      if (currentFilters.status) {
        params.append('status', currentFilters.status)
      }
      if (currentFilters.search) {
        params.append('search', currentFilters.search)
      }

      const response = await axios.get(`${backendUrl}/api/product/?${params.toString()}`)
      
      console.log('Admin API Response:', response.data)
      
      if (response.data.success) {
        const products = response.data.data || []
        console.log('Products with images:', products.map(p => ({ 
          id: p._id, 
          name: p.name, 
          images: p.images,
          firstImageUrl: p.images?.[0]?.url 
        })))
        
        setList(products)
        setPagination(response.data.pagination || {
          page: 1,
          pages: 1,
          total: 0,
          limit: 10
        })
        
        setImageLoadErrors({})
      } else {
        toast.error(response.data.message || 'Failed to fetch products')
      }
    } catch (error) {
      console.error('Fetch products error:', error)
      toast.error(error.response?.data?.message || 'Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  // Show delete confirmation modal
  const handleDeleteClick = (product) => {
    setProductToDelete(product)
    setShowDeleteModal(true)
  }

  // Close delete confirmation modal
  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setProductToDelete(null)
  }

  // Confirm and execute delete
  const confirmDelete = async () => {
    if (!productToDelete || !token) {
      toast.error('Authentication token not found')
      return
    }

    setIsDeleting(true)
  
    try {
      const response = await axios.delete(`${backendUrl}/api/product/${productToDelete._id}`, {
        headers: { 
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.success) {
        toast.success(response.data.message || 'Product deleted successfully')
        await fetchList(pagination.page)
        setShowDeleteModal(false)
        setProductToDelete(null)
      } else {
        toast.error(response.data.message || 'Failed to delete product')
      }
    } catch (error) {
      console.error('Delete product error:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
      } else if (error.response?.status === 403) {
        toast.error('Access denied. Admin privileges required.')
      } else {
        toast.error(error.response?.data?.message || 'Failed to delete product')
      }
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }

  const handleProductUpdated = () => {
    fetchList(pagination.page)
  }

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    fetchList(1, newFilters)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchList(newPage)
    }
  }

  const clearFilters = () => {
    const clearedFilters = { category: '', subcategory: '', status: '', search: '' }
    setFilters(clearedFilters)
    fetchList(1, clearedFilters)
  }

  const getEffectivePrice = (item) => {
    if (item.effectivePrice) return item.effectivePrice;
    if (item.price?.discount > 0) return item.price.discount;
    return item.price?.base || item.price || 0;
  }

  const getStockInfo = (item) => {
    return item.stockQuantity || 0;
  }

  const getAvailableSizes = (item) => {
    if (item.subcategory === 'Shoes' && item.shoeDetails?.sizes) {
      return item.shoeDetails.sizes.filter(size => size.available && size.stock > 0).length;
    }
    if (item.subcategory === 'Jackets' && item.jacketDetails?.sizes) {
      return item.jacketDetails.sizes.filter(size => size.available && size.stock > 0).length;
    }
    return 0;
  }

  // Image URL construction for uploads folder - using admin backend URL
  const getImageUrl = (item) => {
    if (!item.images || !Array.isArray(item.images) || item.images.length === 0) {
      console.log(`No images found for product ${item.name}`)
      return null
    }
    
    // Find primary image first
    const primaryImage = item.images.find(img => img.isPrimary)
    const imageToUse = primaryImage || item.images[0]
    
    if (!imageToUse || !imageToUse.url) {
      console.log(`No valid image URL found for product ${item.name}`)
      return null
    }
    
    let imageUrl = imageToUse.url
    
    // Handle both /upload/ and /uploads/ paths and construct full URL
    if (imageUrl.startsWith('/upload/') || imageUrl.startsWith('/uploads/')) {
      const baseUrl = backendUrl.replace(/\/$/, '')
      // Convert /upload/ to /uploads/ if needed since files are in uploads folder
      if (imageUrl.startsWith('/upload/')) {
        imageUrl = imageUrl.replace('/upload/', '/uploads/')
      }
      imageUrl = `${baseUrl}${imageUrl}`
    }
    
    console.log(`Image URL for ${item.name}:`, imageUrl)
    return imageUrl
  }

  const ProductImage = ({ item }) => {
    const imageUrl = getImageUrl(item)
    const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl)
    const [hasError, setHasError] = useState(false)
    
    useEffect(() => {
      setCurrentImageUrl(imageUrl)
      setHasError(false)
    }, [imageUrl])
    
    const handleError = (e) => {
      console.error(`Failed to load image for ${item.name}:`, currentImageUrl)
      setHasError(true)
      setImageLoadErrors(prev => ({ ...prev, [item._id]: true }))
      
      // Try alternative URL constructions if the first one fails
      if (currentImageUrl && !hasError) {
        let filename;
        if (currentImageUrl.includes('/uploads/')) {
          filename = currentImageUrl.split('/uploads/')[1];
        } else if (currentImageUrl.includes('/upload/')) {
          filename = currentImageUrl.split('/upload/')[1];
        }
        
        if (filename) {
          const alternativeUrl = `${backendUrl}/uploads/${filename}`;
          console.log('Trying alternative URL:', alternativeUrl);
          setCurrentImageUrl(alternativeUrl);
          return;
        }
      }
      
      // Fallback to placeholder
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyMEwyOCAyNEgzMlYyOEgzNlYzMkgzMlYzNkgyOFYzMkgyNFYyOEgyMFYyNEgyNFYyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
    }
    
    const handleLoad = () => {
      console.log(`Image loaded successfully for ${item.name}`)
      setHasError(false)
    }
    
    if (!currentImageUrl) {
      return (
        <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-xs">No Image</span>
        </div>
      )
    }
    
    return (
      <div className="w-12 h-12 rounded overflow-hidden bg-gray-200 flex items-center justify-center">
        <img 
          className="w-full h-full object-cover" 
          src={currentImageUrl}
          alt={item.name || 'Product image'}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
        />
      </div>
    )
  }

  // Delete Confirmation Modal Component
  const DeleteConfirmationModal = () => {
    if (!showDeleteModal || !productToDelete) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all">
          {/* Modal Header */}
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-3 rounded-full mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
              <p className="text-sm text-gray-500">This action cannot be undone</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <ProductImage item={productToDelete} />
              <div>
                <p className="font-medium text-gray-900">{productToDelete.name}</p>
                <p className="text-sm text-gray-500">
                  {productToDelete.brand && `${productToDelete.brand} • `}
                  {productToDelete.category} • {productToDelete.subcategory}
                </p>
                <p className="text-sm text-gray-500">SKU: {productToDelete.sku || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-red-800">Are you sure you want to delete this product?</h4>
                <p className="text-sm text-red-700 mt-1">
                  This will permanently remove the product from your inventory. All product data, images, and related information will be lost.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Products List</h2>
        <div className="text-sm text-gray-600">
          Total: {pagination.total} products | 
          Status: {isAvailable ? ' Available' : ' Unavailable'}
        </div>
      </div>

      
      {/* System Status Banner */}
      {!isAvailable && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 font-medium">System is currently unavailable for customers</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subcategory</label>
            <select
              value={filters.subcategory}
              onChange={(e) => handleFilterChange('subcategory', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subcategories</option>
              <option value="Shoes">Shoes</option>
              <option value="Jackets">Jackets</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Draft">Draft</option>
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
          <div className="text-gray-600">Loading products...</div>
        </div>
      ) : (
        <>
          {/* Products Table */}
          <div className='flex flex-col gap-2'>
            <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-100 text-sm font-medium'>
              <span>Image</span>
              <span>Product</span>
              <span>SKU</span>
              <span>Category</span>
              <span>Stock</span>
              <span>Sizes</span>
              <span>Price ({adminCurrency})</span>
              <span className='text-center'>Actions</span>
            </div>

            {list.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No products found
              </div>
            ) : (
              list.map((item, index) => (
                <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-3 px-4 border text-sm hover:bg-gray-50' key={item._id || index}>
                  <ProductImage item={item} />
                  
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-xs">
                      {item.brand && `${item.brand} • `}
                      {item.subcategory === 'Shoes' && item.shoeDetails?.style && `${item.shoeDetails.style} • `}
                      {item.subcategory}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : item.status === 'Inactive' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                      {!isAvailable && (
                        <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                          System Down
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="hidden md:block text-xs font-mono">{item.sku || 'N/A'}</p>
                  <p className="hidden md:block">{item.category}</p>
                  
                  <div className="hidden md:block">
                    <span className={`${getStockInfo(item) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {getStockInfo(item)}
                    </span>
                  </div>
                  
                  <div className="hidden md:block">
                    <span className="text-blue-600">
                      {getAvailableSizes(item)} sizes
                    </span>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {adminCurrency}{getEffectivePrice(item).toFixed(2)}
                      </span>
                      {item.price?.discount > 0 && (
                        <span className="text-xs text-gray-500 line-through">
                          {adminCurrency}{item.price.base.toFixed(2)}
                        </span>
                      )}
                      {item.discountPercent > 0 && (
                        <span className="text-xs text-green-600">
                          -{item.discountPercent}%
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className='text-right md:text-center'>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditProduct(item)}
                        className='text-blue-600 hover:text-blue-800 cursor-pointer px-2 py-1 hover:bg-blue-50 rounded transition-colors'
                        title="Edit product"
                        disabled={!isAvailable}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className='text-red-600 hover:text-red-800 cursor-pointer px-2 py-1 hover:bg-red-50 rounded transition-colors'
                        title="Delete product"
                        disabled={!isAvailable}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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
                disabled={pagination.page === 1 || !isAvailable}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  disabled={!isAvailable}
                  className={`px-3 py-1 border rounded ${
                    pagination.page === page 
                      ? 'bg-blue-500 text-white border-blue-500' 
                      : 'hover:bg-gray-50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages || !isAvailable}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

     
        </>
      )}

      {/* Edit Product Modal */}
      <EditProductModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onProductUpdated={handleProductUpdated}
        token={token}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal />
    </div>
  )
}

export default List