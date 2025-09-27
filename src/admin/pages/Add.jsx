import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../Config'; // or another config file

const PRODUCT_API_PATH = 'http://localhost:5000';

const Add = ({ token }) => {
  // Basic product information
  const [images, setImages] = useState([]);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("Shoes");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);

  // Pricing
  const [basePrice, setBasePrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [status, setStatus] = useState("Active");

  // Shoe-specific details
  const [shoeSizes, setShoeSizes] = useState([]);
  const [shoeSizeStock, setShoeSizeStock] = useState({});
  const [shoeStyle, setShoeStyle] = useState("Casual");
  const [materials, setMaterials] = useState([{
    leatherType: "",
    soleMaterial: "",
    colorName: "",
    colorCode: "#000000"
  }]);

  // Jacket-specific details
  const [jacketSizes, setJacketSizes] = useState([]);
  const [jacketSizeStock, setJacketSizeStock] = useState({});
  const [jacketMaterial, setJacketMaterial] = useState("");
  const [jacketSeason, setJacketSeason] = useState("All Season");

  const shoeSizeOptions = ['EU 39','EU 40','EU 41','EU 42','EU 43','EU 44','EU 45','EU 46','US 6','US 7','US 8','US 9','US 10','US 11','US 12'];
  const jacketSizeOptions = ['XS','S','M','L','XL','XXL','XXXL'];

  const validateForm = () => {
    if (!name.trim()) { toast.error("Product name is required"); return false; }
    if (!description.trim()) { toast.error("Product description is required"); return false; }
    if (!basePrice || basePrice <= 0) { toast.error("Valid base price is required"); return false; }
    if (discountPrice && discountPrice >= basePrice) { toast.error("Discount price must be less than base price"); return false; }
    if (subcategory === "Shoes" && shoeSizes.length === 0) { toast.error("At least one shoe size must be selected"); return false; }
    if (subcategory === "Jackets" && jacketSizes.length === 0) { toast.error("At least one jacket size must be selected"); return false; }
    if (images.length === 0) { toast.error("At least one product image is required"); return false; }
    return true;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) { toast.error("Maximum 10 images allowed"); return; }
    const validTypes = ['image/jpeg','image/jpg','image/png','image/webp'];
    const maxSize = 5 * 1024 * 1024;
    for (let file of files) {
      if (!validTypes.includes(file.type)) { toast.error("Only JPEG, JPG, PNG, and WebP files are allowed"); return; }
      if (file.size > maxSize) { toast.error("Each image must be less than 5MB"); return; }
    }
    setImages(prev => [...prev, ...files]);
  };

  const removeImage = (index) => setImages(prev => prev.filter((_, i) => i !== index));

  const handleShoeSizeToggle = (size) => {
    setShoeSizes(prev => {
      if (prev.includes(size)) {
        const newSizes = prev.filter(item => item !== size);
        const newStock = { ...shoeSizeStock };
        delete newStock[size];
        setShoeSizeStock(newStock);
        return newSizes;
      } else {
        setShoeSizeStock(prev => ({ ...prev, [size]: 0 }));
        return [...prev, size];
      }
    });
  };

  const handleJacketSizeToggle = (size) => {
    setJacketSizes(prev => {
      if (prev.includes(size)) {
        const newSizes = prev.filter(item => item !== size);
        const newStock = { ...jacketSizeStock };
        delete newStock[size];
        setJacketSizeStock(newStock);
        return newSizes;
      } else {
        setJacketSizeStock(prev => ({ ...prev, [size]: 0 }));
        return [...prev, size];
      }
    });
  };

  const handleShoeStockChange = (size, stock) =>
    setShoeSizeStock(prev => ({ ...prev, [size]: parseInt(stock) || 0 }));

  const handleJacketStockChange = (size, stock) =>
    setJacketSizeStock(prev => ({ ...prev, [size]: parseInt(stock) || 0 }));

  const updateMaterial = (index, field, value) =>
    setMaterials(prev => prev.map((m, i) => i === index ? { ...m, [field]: value } : m));

  const addMaterial = () =>
    setMaterials(prev => [...prev, { leatherType:"", soleMaterial:"", colorName:"", colorCode:"#000000" }]);

  const removeMaterial = (index) => {
    if (materials.length > 1) setMaterials(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubcategoryChange = (newSub) => {
    setSubcategory(newSub);
    setShoeSizes([]); setShoeSizeStock({});
    setJacketSizes([]); setJacketSizeStock({});
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!token) { toast.error("Authentication token not found."); return; }

    setLoading(true);
    try {
      const formData = new FormData();
      if (sku.trim()) formData.append("sku", sku.trim().toUpperCase());
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      if (brand.trim()) formData.append("brand", brand.trim());
      formData.append("status", status);
      formData.append("price", JSON.stringify({
        base: parseFloat(basePrice),
        discount: discountPrice ? parseFloat(discountPrice) : 0
      }));

      if (subcategory === "Shoes") {
        const shoeSizesData = shoeSizes.map(size => ({
          sizeLabel: size, stock: shoeSizeStock[size] || 0, available: true
        }));
        const shoeDetails = {
          sizes: shoeSizesData,
          style: shoeStyle,
          materials: materials.filter(m => m.leatherType || m.soleMaterial || m.colorName)
        };
        formData.append("shoeDetails", JSON.stringify(shoeDetails));
      } else if (subcategory === "Jackets") {
        const jacketSizesData = jacketSizes.map(size => ({
          sizeLabel: size, stock: jacketSizeStock[size] || 0, available: true
        }));
        const jacketDetails = {
          sizes: jacketSizesData,
          material: jacketMaterial,
          season: jacketSeason
        };
        formData.append("jacketDetails", JSON.stringify(jacketDetails));
      }

      images.forEach(img => formData.append("images", img));

      // ✅ API call with single constant path
    const response = await axios.post(`${backendUrl}/api/product`, formData, {
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
  timeout: 30000
});

      if (response.data.success) {
        toast.success(response.data.message || "Product added successfully");
        resetForm();
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem('token');
        window.location.reload();
      } else if (err.response?.data?.errors) {
        err.response.data.errors.forEach(er => toast.error(er.msg || er.message));
      } else {
        toast.error(err.response?.data?.message || "Failed to add product");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSku(''); setName(''); setDescription(''); setBrand('');
    setImages([]); setBasePrice(''); setDiscountPrice('');
    setShoeSizes([]); setShoeSizeStock({});
    setJacketSizes([]); setJacketSizeStock({});
    setMaterials([{ leatherType:"", soleMaterial:"", colorName:"", colorCode:"#000000" }]);
    setShoeStyle('Casual'); setJacketMaterial(''); setJacketSeason('All Season'); setStatus('Active');
  };
  return (
    <div className='w-full max-w-4xl mx-auto'>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6 p-6 bg-white rounded-lg shadow-lg'>
        <div className="flex justify-between items-center w-full">
          <h1 className='text-2xl font-bold text-gray-800'>Add New Product</h1>
          {loading && <div className="text-blue-600">Processing...</div>}
        </div>
        
        {/* Image Upload Section */}
        <div className='w-full'>
          <p className='mb-2 font-semibold'>Product Images * <span className="text-sm text-gray-500">(Max 10, 5MB each)</span></p>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4'>
            {images.map((image, index) => (
              <div key={index} className='relative group'>
                <img 
                  className='w-20 h-20 object-cover rounded border' 
                  src={URL.createObjectURL(image)} 
                  alt={`Preview ${index + 1}`} 
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  ×
                </button>
                {index === 0 && (
                  <div className="absolute -bottom-2 left-0 right-0 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                    Primary
                  </div>
                )}
              </div>
            ))}
            {images.length < 10 && (
              <label className='cursor-pointer hover:opacity-80'>
                <img 
                  className='w-20 h-20 object-cover rounded border border-dashed border-gray-400 hover:border-gray-600' 
                  src={assets.upload_area} 
                  alt="Upload" 
                />
                <input 
                  onChange={handleImageChange} 
                  type="file" 
                  multiple 
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className='hidden' 
                  disabled={loading}
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
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
              type="text" 
              placeholder='Enter product name' 
              required
              maxLength={100}
              disabled={loading}
            />
          </div>
          
          <div>
            <p className='mb-2 font-semibold'>SKU <span className="text-sm text-gray-500">(Optional - auto-generated if empty)</span></p>
            <input 
              onChange={(e) => setSku(e.target.value)} 
              value={sku} 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
              type="text" 
              placeholder='e.g., MSHO123456' 
              maxLength={20}
              disabled={loading}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <div>
            <p className='mb-2 font-semibold'>Brand</p>
            <input 
              onChange={(e) => setBrand(e.target.value)} 
              value={brand} 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
              type="text" 
              placeholder='Enter brand name' 
              disabled={loading}
            />
          </div>
          
          <div>
            <p className='mb-2 font-semibold'>Status</p>
            <select 
              onChange={(e) => setStatus(e.target.value)} 
              value={status} 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={loading}
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
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
            className='w-full px-3 py-2 border rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500' 
            placeholder='Write detailed product description' 
            required
            maxLength={2000}
            disabled={loading}
          />
          <p className='text-xs text-gray-500 mt-1'>{description.length}/2000 characters</p>
        </div>

        {/* Categories */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
          <div>
            <p className='mb-2 font-semibold'>Category *</p>
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              value={category} 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={loading}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>

          <div>
            <p className='mb-2 font-semibold'>Subcategory *</p>
            <select 
              onChange={(e) => handleSubcategoryChange(e.target.value)} 
              value={subcategory} 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              disabled={loading}
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
              onChange={(e) => setBasePrice(e.target.value)} 
              value={basePrice} 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
              type="number" 
              placeholder="99.99" 
              step="0.01"
              min="0"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <p className='mb-2 font-semibold'>Discount Price <span className="text-sm text-gray-500">(Optional)</span></p>
            <input 
              onChange={(e) => setDiscountPrice(e.target.value)} 
              value={discountPrice} 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
              type="number" 
              placeholder="79.99" 
              step="0.01"
              min="0"
              disabled={loading}
            />
          </div>
        </div>

        {/* Shoe-specific sections */}
        {subcategory === "Shoes" && (
          <>
            {/* Shoe Sizes and Stock */}
            <div className='w-full'>
              <p className='mb-2 font-semibold'>Available Shoe Sizes and Stock *</p>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4'>
                {shoeSizeOptions.map((size) => (
                  <div key={size} className='text-center'>
                    <div 
                      onClick={() => !loading && handleShoeSizeToggle(size)}
                      className={`${shoeSizes.includes(size) ? "bg-blue-100 border-blue-300" : "bg-slate-200 border-gray-300"} px-3 py-1 cursor-pointer border rounded mb-2 hover:bg-blue-50 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <p className='text-sm'>{size}</p>
                    </div>
                    {shoeSizes.includes(size) && (
                      <input
                        type="number"
                        placeholder="Stock"
                        className='w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                        value={shoeSizeStock[size] || ''}
                        onChange={(e) => handleShoeStockChange(size, e.target.value)}
                        min="0"
                        disabled={loading}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Shoe Style */}
            <div className='w-full md:w-1/2'>
              <p className='mb-2 font-semibold'>Shoe Style</p>
              <select 
                onChange={(e) => setShoeStyle(e.target.value)} 
                value={shoeStyle} 
                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                disabled={loading}
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
                  disabled={loading}
                >
                  Add Material
                </button>
              </div>
              {materials.map((material, index) => (
                <div key={index} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-3 p-3 border rounded'>
                  <input
                    type="text"
                    placeholder="Leather type"
                    value={material.leatherType}
                    onChange={(e) => updateMaterial(index, 'leatherType', e.target.value)}
                    className='px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Sole material"
                    value={material.soleMaterial}
                    onChange={(e) => updateMaterial(index, 'soleMaterial', e.target.value)}
                    className='px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Color name"
                    value={material.colorName}
                    onChange={(e) => updateMaterial(index, 'colorName', e.target.value)}
                    className='px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                    disabled={loading}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={material.colorCode}
                      onChange={(e) => updateMaterial(index, 'colorCode', e.target.value)}
                      className='w-12 h-10 border rounded cursor-pointer'
                      disabled={loading}
                    />
                    <span className="text-xs text-gray-500">{material.colorCode}</span>
                  </div>
                  {materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className='px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600'
                      disabled={loading}
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
        {subcategory === "Jackets" && (
          <>
            {/* Jacket Sizes and Stock */}
            <div className='w-full'>
              <p className='mb-2 font-semibold'>Available Jacket Sizes and Stock *</p>
              <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-4'>
                {jacketSizeOptions.map((size) => (
                  <div key={size} className='text-center'>
                    <div 
                      onClick={() => !loading && handleJacketSizeToggle(size)}
                      className={`${jacketSizes.includes(size) ? "bg-purple-100 border-purple-300" : "bg-slate-200 border-gray-300"} px-3 py-1 cursor-pointer border rounded mb-2 hover:bg-purple-50 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <p className='text-sm'>{size}</p>
                    </div>
                    {jacketSizes.includes(size) && (
                      <input
                        type="number"
                        placeholder="Stock"
                        className='w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                        value={jacketSizeStock[size] || ''}
                        onChange={(e) => handleJacketStockChange(size, e.target.value)}
                        min="0"
                        disabled={loading}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Jacket Details */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
              <div>
                <p className='mb-2 font-semibold'>Jacket Material</p>
                <input 
                  onChange={(e) => setJacketMaterial(e.target.value)} 
                  value={jacketMaterial} 
                  className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  type="text" 
                  placeholder='e.g., Leather, Denim, Cotton' 
                  disabled={loading}
                />
              </div>
              
              <div>
                <p className='mb-2 font-semibold'>Season</p>
                <select 
                  onChange={(e) => setJacketSeason(e.target.value)} 
                  value={jacketSeason} 
                  className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                  disabled={loading}
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

        <button 
          type="submit" 
          className={`w-full sm:w-48 py-3 mt-4 rounded font-medium transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          disabled={loading || !token}
        >
          {loading ? "ADDING PRODUCT..." : "ADD PRODUCT"}
        </button>
        
        {!token && (
          <p className="text-red-500 text-sm">Please login to add products</p>
        )}
      </form>
    </div>
  );
};

export default Add;