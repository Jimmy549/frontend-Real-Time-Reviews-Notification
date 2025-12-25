import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const savedUser = getStorageItem(STORAGE_KEYS.USER);
    const savedToken = getStorageItem(STORAGE_KEYS.AUTH_TOKEN);

    if (savedUser && savedToken) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);
  
  const login = (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    setStorageItem(STORAGE_KEYS.USER, userData);
    setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token);
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeStorageItem(STORAGE_KEYS.USER);
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
  };
  
  const updateUser = (userData) => {
    setUser(userData);
    setStorageItem(STORAGE_KEYS.USER, userData);
  };
  
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
