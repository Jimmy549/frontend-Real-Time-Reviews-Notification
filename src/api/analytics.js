import api from './api';

export const getDashboardStats = () => api.get('/analytics/dashboard');
export const getOrderAnalytics = () => api.get('/analytics/orders');
