import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { TEA_CATEGORIES, TEA_ORIGINS, TEA_FLAVORS, TEA_QUALITIES, CAFFEINE_LEVELS, ALLERGENS } from '../../utils/constants';

const MobileFilterSidebar = ({ isOpen, onClose, selectedFilters, onFilterChange, onOrganicToggle }) => {
  const [expandedSections, setExpandedSections] = useState({
    collections: true,
    origin: false,
    flavor: false,
    qualities: false,
    caffeine: false,
    allergens: false
  });

  const [sortBy, setSortBy] = useState('');

  if (!isOpen) return null;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (section, value) => {
    onFilterChange(section, value);
  };

  const FilterSection = ({ title, items, section, count }) => (
    <div className="border-b border-gray-200">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full px-4 py-4 text-left"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">{title}</span>
          {count > 0 && (
            <span className="bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </div>
        <span className="text-gray-900 text-xl font-light">{expandedSections[section] ? '−' : '+'}</span>
      </button>
      {expandedSections[section] && items && (
        <div className="px-4 pb-4 space-y-3">
          {items.map((item) => (
            <label key={item} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedFilters[section]?.includes(item) || false}
                onChange={() => handleCheckboxChange(section, item)}
                className="w-4 h-4 border-2 border-gray-400 rounded-sm focus:ring-0 focus:ring-offset-0 text-gray-900 cursor-pointer"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Sidebar Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <h2 className="text-base font-medium text-gray-900">SORT & FILTER</h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-600 hover:text-gray-900"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Sort Options */}
        <div className="border-b border-gray-200 px-4 py-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Sort your selected items</h3>
          <div className="space-y-2">
            {[
              { label: 'Low Price', value: 'price-low' },
              { label: 'High Price', value: 'price-high' },
              { label: 'Newest products', value: 'newest' },
              { label: 'Most Popular', value: 'popular' }
            ].map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={sortBy === option.value}
                  onChange={() => setSortBy(sortBy === option.value ? '' : option.value)}
                  className="w-4 h-4 border-2 border-gray-400 rounded-sm focus:ring-0 text-gray-900"
                />
                <span className="ml-3 text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Title */}
        <div className="px-4 py-3 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-900">Select by your favour</h3>
        </div>

        {/* Filter Sections */}
        <FilterSection
          title="COLLECTIONS"
          items={TEA_CATEGORIES}
          section="collections"
          count={selectedFilters.collections?.length || 0}
        />
        <FilterSection
          title="ORIGIN"
          items={TEA_ORIGINS}
          section="origin"
          count={selectedFilters.origin?.length || 0}
        />
        <FilterSection
          title="FLAVOUR"
          items={TEA_FLAVORS}
          section="flavor"
          count={selectedFilters.flavor?.length || 0}
        />
        <FilterSection
          title="QUALITIES"
          items={TEA_QUALITIES}
          section="qualities"
          count={selectedFilters.qualities?.length || 0}
        />
        <FilterSection
          title="CAFEINE"
          items={CAFFEINE_LEVELS}
          section="caffeine"
          count={selectedFilters.caffeine?.length || 0}
        />
        <FilterSection
          title="ALLERGENS"
          items={ALLERGENS}
          section="allergens"
          count={selectedFilters.allergens?.length || 0}
        />

        {/* Organic Toggle */}
        <div className="border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">ORGANIC</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.organic || false}
                onChange={(e) => onOrganicToggle(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-[22px] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSidebar;
