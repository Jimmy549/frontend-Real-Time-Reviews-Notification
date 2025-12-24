import api from './api';

export const cartService = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity, variantId) => 
    api.post('/cart', { productId, quantity, variantId }),
  updateCartItem: (itemId, quantity) => 
    api.put(`/cart/${itemId}`, { quantity }),
  removeFromCart: (itemId) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart')
};