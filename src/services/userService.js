import api from './api';

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
  getUsers: () => api.get('/users'),
  deleteUser: (id) => api.delete(`/users/${id}`)
};