import React from 'react';

const PriceRangeFilter = ({ range, onChange }) => {
  return (
    <div className="filter-section">
      <h4>Price Range</h4>
      <div className="price-inputs">
        <input
          type="number"
          name="minPrice"
          id="minPrice"
          placeholder="Min"
          value={range.min}
          onChange={(e) => onChange('priceRange', { ...range, min: e.target.value })}
        />
        <input
          type="number"
          name="maxPrice"
          id="maxPrice"
          placeholder="Max"
          value={range.max}
          onChange={(e) => onChange('priceRange', { ...range, max: e.target.value })}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;