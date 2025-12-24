import React from 'react';

const RatingFilter = ({ selected, onChange }) => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="filter-section">
      <h4>Rating</h4>
      {ratings.map(rating => (
        <label key={rating} className="flex items-center space-x-2">
          <input
            type="radio"
            name="rating"
            value={rating}
            checked={selected === rating}
            onChange={() => onChange('rating', rating)}
          />
          <span>{rating} Stars & Up</span>
        </label>
      ))}
    </div>
  );
};

export default RatingFilter;