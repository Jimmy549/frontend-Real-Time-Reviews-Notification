import React, { useState } from 'react';
import { reviewsAPI } from '../../api/reviews';
import { useAuth } from '../../context/AuthContext';
import LoginAlert from '../common/LoginAlert';
import StarRating from '../common/StarRating';

const AddReviewForm = ({ productId, onReviewAdded, onCancel }) => {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    content: '',
    rating: 0
  });
  const [loading, setLoading] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [ratingError, setRatingError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      return;
    }

    // Validate star rating
    if (formData.rating === 0) {
      setRatingError('Please select a star rating');
      return;
    }

    setRatingError('');
    setLoading(true);

    try {
      const response = await reviewsAPI.addReview({
        ...formData,
        productId
      });
      onReviewAdded(response.data);
      setFormData({ content: '', rating: 0 });
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-semibold mb-4">Write a Review</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <StarRating 
              rating={formData.rating}
              onRatingChange={(rating) => {
                setFormData(prev => ({ ...prev, rating }));
                setRatingError(''); // Clear error when rating is selected
              }}
              size="text-3xl"
            />
            {ratingError && (
              <p className="text-red-500 text-sm mt-1">{ratingError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Review</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share your thoughts about this product..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      
      <LoginAlert 
        isOpen={showLoginAlert} 
        onClose={() => setShowLoginAlert(false)} 
      />
    </>
  );
};

export default AddReviewForm;