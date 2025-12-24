import React, { useEffect, useState } from 'react';
import '../../styles/loader.css';
import { loadingService } from '../../utils/loadingService';

const GlobalLoader = () => {
  const [state, setState] = useState({ isLoading: false, text: '' });

  useEffect(() => {
    const unsubscribe = loadingService.subscribe(setState);
    return () => unsubscribe();
  }, []);

  if (!state.isLoading) return null;

  return (
    <div className="global-loader-overlay" role="status" aria-live="polite">
      <div className="global-loader">
        <svg className="loader-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <linearGradient id="g" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <circle className="loader-ring" cx="50" cy="50" r="36" stroke="url(#g)" strokeWidth="8" fill="none" strokeLinecap="round"/>
        </svg>
        <div className="loader-text">{state.text || 'Loading…'}</div>
      </div>
    </div>
  );
};

export default GlobalLoader;
