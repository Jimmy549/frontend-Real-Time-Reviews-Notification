import React, { useState, useEffect } from 'react';
import { reviewsAPI } from '../../api/reviews';

const MiniReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await reviewsAPI.getReviews(productId);
        // Show only first 2 reviews
        setReviews(response.data.slice(0, 2));
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xs ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="mt-2 text-xs text-gray-500">
        Loading reviews...
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="mt-2 text-xs text-gray-500">
        No reviews yet
      </div>
    );
  }

  return (
    <div className="mt-2 space-y-1">
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-50 p-2 rounded text-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex">{renderStars(review.rating)}</div>
            <span className="text-gray-500 text-[10px]">
              {review.userId?.username || 'Anonymous'}
            </span>
          </div>
          <p className="text-gray-700 line-clamp-2">
            {review.content}
          </p>
        </div>
      ))}
      {reviews.length > 0 && (
        <div className="text-center">
          <span className="text-xs text-blue-600 cursor-pointer hover:underline">
            View all reviews
          </span>
        </div>
      )}
    </div>
  );
};

export default MiniReviews;