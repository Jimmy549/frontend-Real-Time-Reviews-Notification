import React, { useState } from 'react';
import { ChevronDownIcon, MinusIcon } from '@heroicons/react/24/outline';
import ProductCard from '../../components/product/ProductCard';
import img1 from '../../assets/images/107c02d9996dfe83fb8bdd868196319fa864018f.jpg';
import img2 from '../../assets/images/4469b82376e6d6e4dd6477a7a98cf42a45a38a05.jpg';
import img3 from '../../assets/images/45d4af846a0c593ecfde4bf49b9637f4ae8a63f2.jpg';
import img4 from '../../assets/images/4d22ce807689d07a2d316c9b9bd21294008059d1.jpg';
import img5 from '../../assets/images/4ed1bd594c5d611a95d9efd892f14ba62c6c68c4.jpg';
import img6 from '../../assets/images/a7b47e9ba4ca5788c18b5bb669f80c10404bf9ca.jpg';
import img7 from '../../assets/images/c3915d82a0f798034b1306ab0f3cec5d43cb46ce.jpg';
import img8 from '../../assets/images/e488290fae054f73ee109d481150f5b34f3acb4c.jpg';
import hero from '../../assets/images/tea collection.jpg';

const ExpandedFiltersPage = () => {
  const [sortBy, setSortBy] = useState('featured');

  // Mock products for display - using exact images from design
  const mockProducts = [
    { id: 1, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img1 },
    { id: 2, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img2 },
    { id: 3, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img3 },
    { id: 4, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img4 },
    { id: 5, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img5 },
    { id: 6, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img6 },
    { id: 7, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img7 },
    { id: 8, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img2 },
    { id: 9, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: img1 }
  ];

  const FilterSection = ({ title, children, isExpanded = false }) => (
    <div className="border-b border-gray-200 py-4">
      <button className="flex items-center justify-between w-full text-left mb-3">
        <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">{title}</span>
        <MinusIcon className="w-4 h-4 text-gray-600" />
      </button>
      {isExpanded && children}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-64 bg-cover bg-center" style={{
        backgroundImage: `url(${hero})`
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-600">
          HOME/COLLECTIONS/CHAI
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex gap-8">
          {/* Expanded Filters Sidebar */}
          <div className="w-48 flex-shrink-0">
            {/* Collections */}
            <FilterSection title="COLLECTIONS" isExpanded={true}>
              <div className="space-y-2.5 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Black teas</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Green teas</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">White teas</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" checked className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Chai</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Matcha</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Herbal teas</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Oolong</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Rooibos</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Teaware</span>
                </label>
              </div>
            </FilterSection>

            {/* Origin */}
            <FilterSection title="ORIGIN" isExpanded={true}>
              <div className="space-y-2.5 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">India</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Japan</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Iran</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">South Africa</span>
                </label>
              </div>
            </FilterSection>

            {/* Flavor */}
            <FilterSection title="FLAVOR" isExpanded={true}>
              <div className="space-y-2.5 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Spicy</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Sweet</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Citrus</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Smooth</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Fruity</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Floral</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Grassy</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Minty</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Bitter</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Creamy</span>
                </label>
              </div>
            </FilterSection>

            {/* Qualities */}
            <FilterSection title="QUALITIES" isExpanded={true}>
              <div className="space-y-2.5 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Detox</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Energy</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Relax</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Digestion</span>
                </label>
              </div>
            </FilterSection>

            {/* Caffeine */}
            <FilterSection title="CAFFEINE" isExpanded={true}>
              <div className="space-y-2.5 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">No Caffeine</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Low Caffeine</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Medium Caffeine</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">High Caffeine</span>
                </label>
              </div>
            </FilterSection>

            {/* Allergens */}
            <FilterSection title="ALLERGENS" isExpanded={true}>
              <div className="space-y-2.5 text-sm text-gray-700">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Lactose-free</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Gluten-free</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Nuts-free</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                  <span className="ml-2">Soy-free</span>
                </label>
              </div>
            </FilterSection>

            {/* Organic Toggle */}
            <div className="flex items-center justify-between py-6">
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">ORGANIC</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
              </label>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort By */}
            <div className="flex justify-end mb-6">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="featured">SORT BY</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Sections */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collections */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">COLLECTIONS</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Black teas</a></li>
                <li><a href="#" className="hover:text-gray-900">Green teas</a></li>
                <li><a href="#" className="hover:text-gray-900">White teas</a></li>
                <li><a href="#" className="hover:text-gray-900">Herbal teas</a></li>
                <li><a href="#" className="hover:text-gray-900">Matcha</a></li>
                <li><a href="#" className="hover:text-gray-900">Chai</a></li>
                <li><a href="#" className="hover:text-gray-900">Oolong</a></li>
                <li><a href="#" className="hover:text-gray-900">Rooibos</a></li>
                <li><a href="#" className="hover:text-gray-900">Teaware</a></li>
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">LEARN</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About us</a></li>
                <li><a href="#" className="hover:text-gray-900">About our teas</a></li>
                <li><a href="#" className="hover:text-gray-900">Tea academy</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">CUSTOMER SERVICE</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Ordering and payment</a></li>
                <li><a href="#" className="hover:text-gray-900">Delivery</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy and policy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExpandedFiltersPage;