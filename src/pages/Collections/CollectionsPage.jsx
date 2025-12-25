import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDownIcon, FunnelIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import api from '../../api/api';
import { useFilter } from '../../context/FilterContext';
import ProductCard from '../../components/product/ProductCard';
import MobileFilterSidebar from '../../components/filters/MobileFilterSidebar';
import { SORT_OPTIONS, TEA_CATEGORIES, TEA_ORIGINS, TEA_FLAVORS, TEA_QUALITIES, CAFFEINE_LEVELS, ALLERGENS } from '../../utils/constants';
import heroImg from '../../assets/images/tea collection.jpg';
import img1 from '../../assets/images/107c02d9996dfe83fb8bdd868196319fa864018f.jpg';
import img2 from '../../assets/images/4469b82376e6d6e4dd6477a7a98cf42a45a38a05.jpg';
import img3 from '../../assets/images/45d4af846a0c593ecfde4bf49b9637f4ae8a63f2.jpg';
import img4 from '../../assets/images/4d22ce807689d07a2d316c9b9bd21294008059d1.jpg';
import img5 from '../../assets/images/4ed1bd594c5d611a95d9efd892f14ba62c6c68c4.jpg';
import img6 from '../../assets/images/a7b47e9ba4ca5788c18b5bb669f80c10404bf9ca.jpg';
import img7 from '../../assets/images/c3915d82a0f798034b1306ab0f3cec5d43cb46ce.jpg';

const CollectionsPage = () => {
  const { category } = useParams();
  const { filters, setSortBy } = useFilter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    collections: true,
    origin: false,
    flavor: false,
    qualities: false,
    caffeine: false,
    allergens: false
  });
  const [selectedFilters, setSelectedFilters] = useState({
    collections: [],
    origin: [],
    flavor: [],
    qualities: [],
    caffeine: [],
    allergens: [],
    organic: false
  });

  const [allProducts, setAllProducts] = useState([]);
  
  // Fallback products data in case API fails
  const fallbackProducts = [
    {
      _id: 'fallback-1',
      name: 'Earl Grey Premium',
      basePrice: 25.99,
      origin: 'Sri Lanka',
      flavor: 'Earl Grey',
      images: [{ url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400', alt: 'Earl Grey Tea' }]
    },
    {
      _id: 'fallback-2',
      name: 'Green Dragon Well',
      basePrice: 32.50,
      origin: 'China',
      flavor: 'Jasmine',
      images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', alt: 'Green Tea' }]
    },
    {
      _id: 'fallback-3',
      name: 'Himalayan Gold',
      basePrice: 28.75,
      origin: 'Nepal',
      flavor: 'Bergamot',
      images: [{ url: 'https://images.unsplash.com/photo-1597318281675-d05b6f6d4e8d?w=400', alt: 'Black Tea' }]
    },
    {
      _id: 'fallback-4',
      name: 'Chamomile Dreams',
      basePrice: 18.99,
      origin: 'India',
      flavor: 'Chamomile',
      images: [{ url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400', alt: 'Chamomile Tea' }]
    },
    {
      _id: 'fallback-5',
      name: 'Mint Fresh Blend',
      basePrice: 22.50,
      origin: 'India',
      flavor: 'Mint',
      images: [{ url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', alt: 'Mint Tea' }]
    },
    {
      _id: 'fallback-6',
      name: 'Vanilla Spice Chai',
      basePrice: 26.75,
      origin: 'India',
      flavor: 'Vanilla',
      images: [{ url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400', alt: 'Chai Tea' }]
    }
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products?limit=50');
        const productsData = response?.data?.data?.items || response?.data || [];
        const products = Array.isArray(productsData) ? productsData : [];
        
        // If no products from API, use fallback products
        if (products.length === 0) {
          console.log('No products from API, using fallback products');
          setAllProducts(fallbackProducts);
        } else {
          setAllProducts(products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        console.log('API failed, using fallback products');
        setAllProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      try {
        let productList = [...allProducts];
        
        // Apply filters
        productList = productList.filter(product => {
          if (selectedFilters.collections.length > 0) {
            const matchesCollection = selectedFilters.collections.some(col => 
              product.name.toLowerCase().includes(col.toLowerCase()) ||
              product.flavor?.toLowerCase().includes(col.toLowerCase()) ||
              product.origin?.toLowerCase().includes(col.toLowerCase())
            );
            if (!matchesCollection) return false;
          }
          
          if (selectedFilters.origin.length > 0) {
            const matchesOrigin = selectedFilters.origin.includes(product.origin);
            if (!matchesOrigin) return false;
          }
          
          if (selectedFilters.flavor.length > 0) {
            const matchesFlavor = selectedFilters.flavor.includes(product.flavor);
            if (!matchesFlavor) return false;
          }
          
          if (selectedFilters.caffeine.length > 0) {
            const matchesCaffeine = selectedFilters.caffeine.includes(product.caffeineLevel);
            if (!matchesCaffeine) return false;
          }
          
          return true;
        });
        
        // Sort products
        if (filters.sortBy === 'price-low') {
          productList = [...productList].sort((a, b) => a.basePrice - b.basePrice);
        } else if (filters.sortBy === 'price-high') {
          productList = [...productList].sort((a, b) => b.basePrice - a.basePrice);
        } else if (filters.sortBy === 'name') {
          productList = [...productList].sort((a, b) => a.name.localeCompare(b.name));
        }
        
        setProducts(productList);
      } catch (error) {
        console.error('Error applying filters:', error);
        setProducts(allProducts);
      }
    };

    if (allProducts.length > 0) {
      applyFilters();
    }
  }, [filters.sortBy, selectedFilters, allProducts]);



  const toggleFilter = (section) => {
    setExpandedFilters(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (section, value) => {
    setLoading(true);
    setSelectedFilters(prev => {
      const current = prev[section];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [section]: updated };
    });
    setTimeout(() => setLoading(false), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const FilterSection = ({ title, items, section, isExpanded }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleFilter(section)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">{title}</span>
        <span className="text-gray-900 text-lg font-light">{isExpanded ? '−' : '+'}</span>
      </button>
      {isExpanded && items && (
        <div className="space-y-2.5 mb-4">
          {items.map((item) => (
            <label key={item} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFilters[section].includes(item)}
                onChange={() => handleCheckboxChange(section, item)}
                className="w-4 h-4 border-2 border-gray-400 rounded-sm focus:ring-0 focus:ring-offset-0 text-gray-900 cursor-pointer mr-2.5"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{item}</span>
            </label>
          ))}
        </div>
      )}
      <div className="border-b border-gray-300"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header with Back Button */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="p-2">
            <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
          </Link>
          <h1 className="text-lg font-medium text-gray-900">{category || 'Chai'}</h1>
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center space-x-1 text-sm font-medium text-gray-900"
          >
            <span>FILTER</span>
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Banner - Desktop Only */}
      <div className="hidden md:block max-w-[1280px] mx-auto px-8">
        <div className="relative h-[200px] bg-cover bg-center rounded-lg overflow-hidden" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        </div>
      </div>

      {/* Mobile Hero Banner */}
      <div className="md:hidden relative h-[180px] bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      {/* Breadcrumbs - Desktop Only */}
      <div className="hidden md:block max-w-[1280px] mx-auto px-8 py-4">
        <nav className="text-xs text-gray-600 tracking-wide">
          HOME/COLLECTIONS/{category ? category.toUpperCase() : 'CHAI'}
        </nav>
      </div>

      {/* Mobile Breadcrumbs */}
      <div className="md:hidden px-4 py-3">
        <nav className="text-xs text-gray-600 tracking-wide">
          HOME/COLLECTIONS/{category ? category.toUpperCase() : 'CHAI'}
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pb-16">
        <div className="flex gap-6 md:gap-12">
          {/* Filters Sidebar - Desktop Only */}
          <div className="hidden md:block w-[192px] flex-shrink-0">
            <FilterSection
              title="COLLECTIONS"
              items={TEA_CATEGORIES}
              section="collections"
              isExpanded={expandedFilters.collections}
            />
            <FilterSection
              title="ORIGIN"
              items={TEA_ORIGINS}
              section="origin"
              isExpanded={expandedFilters.origin}
            />
            <FilterSection
              title="FLAVOR"
              items={TEA_FLAVORS}
              section="flavor"
              isExpanded={expandedFilters.flavor}
            />
            <FilterSection
              title="QUALITIES"
              items={TEA_QUALITIES}
              section="qualities"
              isExpanded={expandedFilters.qualities}
            />
            <FilterSection
              title="CAFFEINE"
              items={CAFFEINE_LEVELS}
              section="caffeine"
              isExpanded={expandedFilters.caffeine}
            />
            <FilterSection
              title="ALLERGENS"
              items={ALLERGENS}
              section="allergens"
              isExpanded={expandedFilters.allergens}
            />
            
            {/* Organic Toggle */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">ORGANIC</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters.organic}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, organic: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-[22px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
              </label>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown - Desktop Only */}
            <div className="hidden md:flex justify-end mb-6">
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-sm px-4 py-2 pr-10 text-sm font-medium uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
                >
                  <option value="">SORT BY</option>
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label.toUpperCase()}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 md:gap-x-8 md:gap-y-10">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                
                {/* Show More Button - Mobile */}
                <div className="mt-8 text-center">
                  <button className="w-full md:w-auto px-8 py-3 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                    SHOW MORE (1) PRODUCT
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
                {allProducts.length === 0 && (
                  <p className="text-sm text-gray-400 mt-2">Try refreshing the page or check back later.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <MobileFilterSidebar
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedFilters={selectedFilters}
        onFilterChange={handleCheckboxChange}
        onOrganicToggle={(value) => setSelectedFilters(prev => ({ ...prev, organic: value }))}
      />
    </div>
  );
};

export default CollectionsPage;
