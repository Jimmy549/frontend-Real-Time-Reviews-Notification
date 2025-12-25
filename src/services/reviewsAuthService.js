import { reviewsAPI } from '../api/reviews';

export const reviewsAuthService = {
  async login(email, password) {
    try {
      const response = await reviewsAPI.login({ email, password });
      if (response.data.access_token) {
        localStorage.setItem('reviews_token', response.data.access_token);
        localStorage.setItem('reviews_user', JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Reviews login error:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await reviewsAPI.register(userData);
      if (response.data.access_token) {
        localStorage.setItem('reviews_token', response.data.access_token);
        localStorage.setItem('reviews_user', JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error('No token received');
    } catch (error) {
      console.error('Reviews register error:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('reviews_token');
    localStorage.removeItem('reviews_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('reviews_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('reviews_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  }
};

export default reviewsAuthService;