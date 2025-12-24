import api from './api';

export const getVariants = (params) => api.get('/variants', { params });
export const getVariant = (id) => api.get(`/variants/${id}`);
export const getProductVariants = (productId) => api.get(`/variants/product/${productId}`);
export const createVariant = (data) => api.post('/variants', data);
export const updateVariant = (id, data) => api.put(`/variants/${id}`, data);
export const deleteVariant = (id) => api.delete(`/variants/${id}`);
