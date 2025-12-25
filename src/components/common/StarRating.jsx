import React, { useState } from 'react';

const StarRating = ({ 
  rating = 0, 
  onRatingChange, 
  readonly = false, 
  size = 'text-2xl',
  showLabel = true 
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (star) => {
    if (!readonly && onRatingChange) {
      onRatingChange(star);
    }
  };

  const handleMouseEnter = (star) => {
    if (!readonly) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          className={`${size} transition-all duration-150 ${
            !readonly ? 'hover:scale-110 transform cursor-pointer' : 'cursor-default'
          } ${
            star <= displayRating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
      {showLabel && (
        <span className="ml-2 text-sm text-gray-600">
          {rating > 0 ? `${rating} ${rating === 1 ? 'star' : 'stars'}` : 'Select rating'}
        </span>
      )}
    </div>
  );
};

export default StarRating;