import React, { useState, useEffect } from 'react';
import { reviewsAPI } from '../../api/reviews';
import socketService from '../../services/socketService';
import ReviewItem from './ReviewItem';
import AddReviewForm from './AddReviewForm';

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchReviews();
    
    // Connect to socket for real-time updates
    socketService.connect();
    
    // Listen for new reviews
    const handleNewReview = (newReview) => {
      if (newReview.productId === productId) {
        setReviews(prev => {
          // Check if review already exists to prevent duplicates
          const exists = prev.find(r => r._id === newReview._id);
          if (!exists) {
            return [newReview, ...prev];
          }
          return prev;
        });
      }
    };

    socketService.on('new_review', handleNewReview);

    return () => {
      socketService.off('new_review', handleNewReview);
    };
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await reviewsAPI.getReviews(productId);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = (newReview) => {
    // Add review manually and let socket handle real-time updates for others
    setReviews(prev => {
      const exists = prev.find(r => r._id === newReview._id);
      if (!exists) {
        return [newReview, ...prev];
      }
      return prev;
    });
    setShowAddForm(false);
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews(prev => prev.filter(review => review._id !== reviewId));
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Reviews ({reviews.length})</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {showAddForm ? 'Cancel' : 'Write Review'}
        </button>
      </div>

      {showAddForm && (
        <AddReviewForm
          productId={productId}
          onReviewAdded={handleReviewAdded}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewItem
              key={review._id}
              review={review}
              onReviewDeleted={handleReviewDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;