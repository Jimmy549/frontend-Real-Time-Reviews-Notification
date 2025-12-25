import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_REVIEWS_API_URL || 'https://tea-ecommerce-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('reviews_token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const reviewsAPI = {
  // Reviews
  getReviews: (productId) => api.get(`/reviews/${productId}`),
  addReview: (reviewData) => api.post('/reviews', reviewData),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`),

  // Replies
  getReplies: (reviewId) => api.get(`/replies/${reviewId}`),
  addReply: (replyData) => api.post('/replies', replyData),

  // Likes
  likeReview: (reviewId) => api.post(`/likes/${reviewId}`),
  unlikeReview: (reviewId) => api.delete(`/likes/${reviewId}`),

  // Notifications
  getNotifications: () => api.get('/notifications'),
  markAsRead: (notificationId) => api.patch(`/notifications/${notificationId}/read`),

  // Auth
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

export default api;