import api from './api';

export const getProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.put('/users/profile', data);
export const getAllUsers = (params) => api.get('/users', { params });
export const blockUser = (id) => api.put(`/users/${id}/block`);
export const unblockUser = (id) => api.put(`/users/${id}/unblock`);
