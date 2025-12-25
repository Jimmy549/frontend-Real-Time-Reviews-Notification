import React from 'react';

const CategoriesFilter = ({ selected, onChange }) => {
  const categories = ['Green Tea', 'Black Tea', 'Herbal Tea', 'Oolong Tea'];

  return (
    <div className="filter-section">
      <h4>Categories</h4>
      {categories.map(category => (
        <label key={category} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="categories"
            value={category}
            checked={selected.includes(category)}
            onChange={() => onChange('categories', category)}
          />
          <span>{category}</span>
        </label>
      ))}
    </div>
  );
};

export default CategoriesFilter;