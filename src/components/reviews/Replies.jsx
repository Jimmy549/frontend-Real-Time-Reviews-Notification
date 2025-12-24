import React, { useState, useEffect } from 'react';
import { reviewsAPI } from '../../api/reviews';
import socketService from '../../services/socketService';

const Replies = ({ reviewId }) => {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchReplies();

    // Listen for new replies
    const handleNewReply = (reply) => {
      if (reply.reviewId === reviewId) {
        setReplies(prev => {
          // Check if reply already exists to prevent duplicates
          const exists = prev.find(r => r._id === reply._id);
          if (!exists) {
            return [...prev, reply];
          }
          return prev;
        });
      }
    };

    socketService.on('new_reply', handleNewReply);

    return () => {
      socketService.off('new_reply', handleNewReply);
    };
  }, [reviewId]);

  const fetchReplies = async () => {
    try {
      const response = await reviewsAPI.getReplies(reviewId);
      setReplies(response.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    setLoading(true);
    try {
      const response = await reviewsAPI.addReply({
        reviewId,
        content: newReply
      });
      console.log('Reply added:', response.data);
      // Add reply immediately for better UX
      setReplies(prev => [...prev, response.data]);
      setNewReply('');
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Failed to add reply. Please make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h5 className="font-semibold text-gray-700">Replies ({replies.length})</h5>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          {showAddForm ? 'Cancel' : 'Add Reply'}
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmitReply} className="mb-4">
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Write your reply..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            required
          />
          <div className="flex space-x-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Reply'}
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {replies.map((reply) => (
          <div key={reply._id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {reply.userId?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="font-medium text-sm">{reply.userId?.username || 'Anonymous'}</span>
              <span className="text-xs text-gray-500">
                {new Date(reply.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{reply.content}</p>
          </div>
        ))}
      </div>

      {replies.length === 0 && (
        <p className="text-gray-500 text-sm">No replies yet.</p>
      )}
    </div>
  );
};

export default Replies;