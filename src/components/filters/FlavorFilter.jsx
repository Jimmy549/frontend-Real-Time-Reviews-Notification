import React from 'react';

const FlavorFilter = ({ selected, onChange }) => {
  const flavors = ['Mint', 'Lemon', 'Jasmine', 'Earl Grey', 'Chamomile'];

  return (
    <div className="filter-section">
      <h4>Flavors</h4>
      {flavors.map(flavor => (
        <label key={flavor} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="flavors"
            value={flavor}
            checked={selected.includes(flavor)}
            onChange={() => onChange('flavors', flavor)}
          />
          <span>{flavor}</span>
        </label>
      ))}
    </div>
  );
};

export default FlavorFilter;