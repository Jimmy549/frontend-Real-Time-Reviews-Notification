import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FiltersSidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    collections: true,
    origin: false,
    flavor: false,
    qualities: false,
    caffeine: false,
    allergens: false,
    organic: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 mb-3"
      >
        {title}
        {isExpanded ? (
          <ChevronUpIcon className="w-4 h-4" />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </button>
      {isExpanded && children}
    </div>
  );

  const CheckboxItem = ({ label, count }) => (
    <label className="flex items-center space-x-2 text-sm text-gray-700 mb-2 cursor-pointer">
      <input type="checkbox" name={label.replace(/\s+/g, '-').toLowerCase()} value={label} className="rounded border-gray-300" />
      <span>{label}</span>
      {count && <span className="text-gray-400">({count})</span>}
    </label>
  );

  return (
    <div className="bg-white">
      {/* Collections */}
      <FilterSection
        title="COLLECTIONS"
        isExpanded={expandedSections.collections}
        onToggle={() => toggleSection('collections')}
      >
        <div className="space-y-2">
          <CheckboxItem label="Black teas" />
          <CheckboxItem label="Green teas" />
          <CheckboxItem label="White teas" />
          <CheckboxItem label="Chai" />
          <CheckboxItem label="Matcha" />
          <CheckboxItem label="Herbal teas" />
          <CheckboxItem label="Oolong" />
          <CheckboxItem label="Rooibos" />
          <CheckboxItem label="Teaware" />
        </div>
      </FilterSection>

      {/* Origin */}
      <FilterSection
        title="ORIGIN"
        isExpanded={expandedSections.origin}
        onToggle={() => toggleSection('origin')}
      >
        <div className="space-y-2">
          <CheckboxItem label="India" />
          <CheckboxItem label="Japan" />
          <CheckboxItem label="Iran" />
          <CheckboxItem label="South Africa" />
        </div>
      </FilterSection>

      {/* Flavor */}
      <FilterSection
        title="FLAVOR"
        isExpanded={expandedSections.flavor}
        onToggle={() => toggleSection('flavor')}
      >
        <div className="space-y-2">
          <CheckboxItem label="Spicy" />
          <CheckboxItem label="Sweet" />
          <CheckboxItem label="Citrus" />
          <CheckboxItem label="Smooth" />
          <CheckboxItem label="Fruity" />
          <CheckboxItem label="Floral" />
          <CheckboxItem label="Grassy" />
          <CheckboxItem label="Minty" />
          <CheckboxItem label="Bitter" />
          <CheckboxItem label="Creamy" />
        </div>
      </FilterSection>

      {/* Qualities */}
      <FilterSection
        title="QUALITIES"
        isExpanded={expandedSections.qualities}
        onToggle={() => toggleSection('qualities')}
      >
        <div className="space-y-2">
          <CheckboxItem label="Detox" />
          <CheckboxItem label="Energy" />
          <CheckboxItem label="Relax" />
          <CheckboxItem label="Digestion" />
        </div>
      </FilterSection>

      {/* Caffeine */}
      <FilterSection
        title="CAFFEINE"
        isExpanded={expandedSections.caffeine}
        onToggle={() => toggleSection('caffeine')}
      >
        <div className="space-y-2">
          <CheckboxItem label="No Caffeine" />
          <CheckboxItem label="Low Caffeine" />
          <CheckboxItem label="Medium Caffeine" />
          <CheckboxItem label="High Caffeine" />
        </div>
      </FilterSection>

      {/* Allergens */}
      <FilterSection
        title="ALLERGENS"
        isExpanded={expandedSections.allergens}
        onToggle={() => toggleSection('allergens')}
      >
        <div className="space-y-2">
          <CheckboxItem label="Lactose-free" />
          <CheckboxItem label="Gluten-free" />
          <CheckboxItem label="Nuts-free" />
          <CheckboxItem label="Soy-free" />
        </div>
      </FilterSection>

      {/* Organic Toggle */}
      <div className="flex items-center justify-between py-4">
        <span className="text-sm font-medium text-gray-900">ORGANIC</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
        </label>
      </div>
    </div>
  );
};

export default FiltersSidebar;