import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { getCategories } from '../../api/categories';
import DashboardLayout from './DashboardLayout';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '', description: '', basePrice: '', category: '', origin: 'China',
    flavor: 'Mint', caffeineLevel: 'Medium', stock: 0, images: [], isFeatured: false
  });
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, categoryFilter, featuredFilter]);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products?limit=100'),
        getCategories()
      ]);
      
      // Handle different response structures
      const productsData = productsRes?.data?.data?.items || productsRes?.data?.items || productsRes?.data || [];
      const categoriesData = categoriesRes?.data?.data || categoriesRes?.data || [];
      
      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.description || !formData.basePrice) {
      alert('Please fill in all required fields (Name, Description, Price)');
      return;
    }
    
    try {
      const payload = {
        ...formData,
        basePrice: Number(formData.basePrice),
        stock: Number(formData.stock),
        images: formData.images && formData.images.length > 0 ? formData.images : [
          { url: `data:image/svg+xml;base64,${btoa(`
            <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="300" fill="#f3f4f6"/>
              <circle cx="150" cy="120" r="30" fill="#d1d5db"/>
              <path d="M120 180h60l-15 45h-30l-15-45z" fill="#92400e"/>
              <text x="150" y="240" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="12">Tea</text>
              <text x="150" y="255" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="10">${formData.name || 'New Product'}</text>
            </svg>
          `)}`, alt: formData.name, isPrimary: true }
        ],
        isActive: true
      };

      let response;
      if (editingId) {
        response = await api.put(`/products/${editingId}`, payload);
        alert('Product updated successfully!');
      } else {
        response = await api.post('/products', payload);
        alert('Product created successfully!');
      }
      
      // Reset form
      setShowForm(false);
      setEditingId(null);
      setFormData({ 
        name: '', 
        description: '', 
        basePrice: '', 
        category: '', 
        origin: 'China', 
        flavor: 'Mint', 
        caffeineLevel: 'Medium', 
        stock: 0, 
        images: [], 
        isFeatured: false 
      });
      setImageUrl('');
      setImageFile(null);
      
      // Refresh data
      fetchData();
    } catch (error) {
      console.error('Submit error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error saving product';
      alert(errorMessage);
    }
  };

  const handleEdit = (product) => {
    const imageUrl = product.images?.[0]?.url || '';
    const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${imageUrl}`;
    setFormData({
      name: product.name,
      description: product.description,
      basePrice: product.basePrice,
      category: product.category?._id || '',
      origin: product.origin || 'China',
      flavor: product.flavor || 'Mint',
      caffeineLevel: product.caffeineLevel || 'Medium',
      stock: product.stock || 0,
      images: product.images?.map(img => ({
        ...img,
        url: img.url.startsWith('http') ? img.url : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${img.url}`
      })) || [],
      isFeatured: product.isFeatured || false
    });
    setImageUrl(fullImageUrl);
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this product? This action cannot be undone.')) return;
    try {
      await api.delete(`/products/${id}`);
      alert('Product permanently deleted!');
      fetchData();
    } catch (error) {
      alert('Error deleting product: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('image', file);

      const response = await api.post('/products/upload-image', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Handle different response structures
      const imageUrl = response?.data?.imageUrl || response?.imageUrl || response?.data?.data?.imageUrl;
      
      if (!imageUrl) {
        throw new Error('No image URL received from server');
      }
      
      const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${imageUrl}`;
      
      setImageUrl(fullImageUrl);
      setFormData(prev => ({
        ...prev, 
        images: [{ 
          url: fullImageUrl, 
          alt: prev.name || 'Product Image', 
          isPrimary: true 
        }]
      }));
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image: ' + (error.response?.data?.message || error.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.origin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.flavor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product =>
        product.category?._id === categoryFilter || product.category === categoryFilter
      );
    }

    if (featuredFilter !== 'all') {
      const isFeatured = featuredFilter === 'featured';
      filtered = filtered.filter(product => product.isFeatured === isFeatured);
    }

    setFilteredProducts(filtered);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleFileUpload(file);
    }
  };

  if (loading) return <DashboardLayout><div className="p-8">Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout title="Manage Products">
      <div className="space-y-6">
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', description: '', basePrice: '', category: '', origin: 'China', flavor: 'Mint', caffeineLevel: 'Medium', stock: 0, images: [], isFeatured: false }); setImageUrl(''); setImageFile(null); setUploading(false); }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add New Product'}
        </button>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <input
                type="text"
                placeholder="Search by name, description, origin, or flavor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
              <select
                value={featuredFilter}
                onChange={(e) => setFeaturedFilter(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Products</option>
                <option value="featured">Featured Only</option>
                <option value="regular">Regular Only</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setFeaturedFilter('all'); }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                rows="3"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.basePrice}
                  onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="China">China</option>
                  <option value="India">India</option>
                  <option value="Japan">Japan</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Nepal">Nepal</option>
                </select>
                <select
                  value={formData.flavor}
                  onChange={(e) => setFormData({...formData, flavor: e.target.value})}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="Mint">Mint</option>
                  <option value="Lemon">Lemon</option>
                  <option value="Jasmine">Jasmine</option>
                  <option value="Earl Grey">Earl Grey</option>
                  <option value="Chamomile">Chamomile</option>
                  <option value="Vanilla">Vanilla</option>
                  <option value="Bergamot">Bergamot</option>
                </select>
              </div>
              <select
                value={formData.caffeineLevel}
                onChange={(e) => setFormData({...formData, caffeineLevel: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="None">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select Category (Optional)</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>

                {/* File Upload Section */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">Upload from Local Storage</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                </div>

                {/* URL Input Section */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Or enter Image URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setFormData({...formData, images: e.target.value ? [{ url: e.target.value, alt: formData.name || 'Product Image', isPrimary: true }] : []});
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                {imageUrl && (
                  <div className="mt-2">
                    <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover rounded" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                  Featured Product (will appear on homepage and featured sections)
                </label>
              </div>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                {editingId ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900">
              Products ({filteredProducts.length}{filteredProducts.length !== products.length ? ` of ${products.length}` : ''})
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((p) => (
                  <tr key={p._id}>
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">${p.basePrice?.toFixed(2) || '0.00'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${p.stock > 10 ? 'bg-green-100 text-green-800' : p.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">{p.origin || 'N/A'}</td>
                    <td className="px-6 py-4">
                      {p.isFeatured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Regular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
                {(searchTerm || categoryFilter !== 'all' || featuredFilter !== 'all') && (
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageProducts;
