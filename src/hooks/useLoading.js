import { useState, useCallback } from 'react';

/**
 * Custom hook for managing loading states
 */
export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const [loadingText, setLoadingText] = useState('');

  const startLoading = useCallback((text = '') => {
    setIsLoading(true);
    setLoadingText(text);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingText('');
  }, []);

  const withLoading = useCallback(async (asyncFunction, text = '') => {
    try {
      startLoading(text);
      const result = await asyncFunction();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    loadingText,
    startLoading,
    stopLoading,
    withLoading
  };
};

/**
 * Hook for managing multiple loading states
 */
export const useMultipleLoading = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = useCallback((key, isLoading, text = '') => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: { isLoading, text }
    }));
  }, []);

  const isLoading = useCallback((key) => {
    return loadingStates[key]?.isLoading || false;
  }, [loadingStates]);

  const getLoadingText = useCallback((key) => {
    return loadingStates[key]?.text || '';
  }, [loadingStates]);

  const startLoading = useCallback((key, text = '') => {
    setLoading(key, true, text);
  }, [setLoading]);

  const stopLoading = useCallback((key) => {
    setLoading(key, false, '');
  }, [setLoading]);

  const withLoading = useCallback(async (key, asyncFunction, text = '') => {
    try {
      startLoading(key, text);
      const result = await asyncFunction();
      return result;
    } finally {
      stopLoading(key);
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    getLoadingText,
    startLoading,
    stopLoading,
    withLoading,
    loadingStates
  };
};