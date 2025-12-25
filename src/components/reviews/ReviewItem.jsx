import React, { useState, useEffect } from 'react';
import { reviewsAPI } from '../../api/reviews';
import socketService from '../../services/socketService';
import Replies from './Replies';
import StarRating from '../common/StarRating';
import { useAuth } from '../../context/AuthContext';

const ReviewItem = ({ review, onReviewDeleted }) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(review.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if user has liked this review on component mount
  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('reviews_user') || 'null');
        if (user && user._id) {
          // You can add an API call here to check if user has liked this review
          // For now, we'll use localStorage to track likes
          const likedReviews = JSON.parse(localStorage.getItem('likedReviews') || '[]');
          setIsLiked(likedReviews.includes(review._id));
        }
      } catch (error) {
        console.error('Error checking like status:', error);
      }
    };
    
    checkLikeStatus();
  }, [review._id]);

  useEffect(() => {
    // Listen for like notifications
    const handleReviewLiked = (data) => {
      if (data.reviewId === review._id) {
        setLikes(prev => prev + 1);
      }
    };

    socketService.on('review_liked', handleReviewLiked);

    return () => {
      socketService.off('review_liked', handleReviewLiked);
    };
  }, [review._id]);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const likedReviews = JSON.parse(localStorage.getItem('likedReviews') || '[]');
      
      if (isLiked) {
        const response = await reviewsAPI.unlikeReview(review._id);
        console.log('Unlike response:', response);
        setLikes(prev => Math.max(0, prev - 1));
        setIsLiked(false);
        // Remove from localStorage
        const updatedLikes = likedReviews.filter(id => id !== review._id);
        localStorage.setItem('likedReviews', JSON.stringify(updatedLikes));
      } else {
        const response = await reviewsAPI.likeReview(review._id);
        console.log('Like response:', response);
        setLikes(prev => prev + 1);
        setIsLiked(true);
        // Add to localStorage
        const updatedLikes = [...likedReviews, review._id];
        localStorage.setItem('likedReviews', JSON.stringify(updatedLikes));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to like/unlike. Please make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  // Check if current user can delete this review
  const canDelete = user && (user._id === review.userId?._id || user.role === 'admin');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewsAPI.deleteReview(review._id);
        onReviewDeleted(review._id);
      } catch (error) {
        console.error('Error deleting review:', error);
        alert('Failed to delete review');
      }
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {review.userId?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h4 className="font-semibold">{review.userId?.username || 'Anonymous'}</h4>
            <div className="flex items-center space-x-2">
              <StarRating rating={review.rating} readonly={true} size="text-lg" showLabel={false} />
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        {canDelete && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      <p className="text-gray-700 mb-4">{review.content}</p>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          disabled={loading}
          className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
            isLiked
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span>👍</span>
          <span>{likes}</span>
        </button>

        <button
          onClick={() => setShowReplies(!showReplies)}
          className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span>💬</span>
          <span>Reply</span>
        </button>
      </div>

      {showReplies && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          <Replies reviewId={review._id} />
        </div>
      )}
    </div>
  );
};

export default ReviewItem;