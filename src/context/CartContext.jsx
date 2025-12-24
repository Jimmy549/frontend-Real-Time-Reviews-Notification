import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, variant, quantity = 1 } = action.payload;
      const productId = product.id || product._id;
      const existingItemIndex = state.items.findIndex(
        item => (item.product.id || item.product._id) === productId && item.variant.size === variant.size
      );
      
      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { product, variant, quantity, id: Date.now() }];
      }
      
      return {
        ...state,
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        total: calculateTotal(newItems)
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        total: calculateTotal(newItems)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      const newItems = state.items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      return {
        ...state,
        items: newItems,
        subtotal: calculateSubtotal(newItems),
        total: calculateTotal(newItems)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        subtotal: 0,
        delivery: 0,
        total: 0
      };
    
    default:
      return state;
  }
};

// Helper functions
const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => sum + (item.variant.price * item.quantity), 0);
};

const calculateTotal = (items) => {
  const subtotal = calculateSubtotal(items);
  const delivery = subtotal > 0 ? 3.95 : 0; // Free delivery over certain amount
  return subtotal + delivery;
};

// Initial state
const initialState = {
  items: [],
  subtotal: 0,
  delivery: 0,
  total: 0
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CART, cart);
  }, [cart]);
  
  const addItem = (product, variant, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity } });
  };
  
  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };
  
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
    }
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const getItemCount = () => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };
  
  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
