import React from 'react';
import './Loader.css';

const Loader = ({ 
  type = 'spinner', 
  size = 'medium', 
  color = 'primary',
  text = '',
  overlay = false,
  fullScreen = false
}) => {
  const LoaderComponent = () => {
    switch (type) {
      case 'dots':
        return (
          <div className={`dots-loader ${size}`}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      
      case 'pulse':
        return (
          <div className={`pulse-loader ${size} ${color}`}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        );
      
      case 'tea-cup':
        return (
          <div className={`tea-loader ${size}`}>
            <div className="tea-cup">
              <div className="steam"></div>
              <div className="steam"></div>
              <div className="steam"></div>
            </div>
          </div>
        );
      
      case 'skeleton':
        return (
          <div className={`skeleton-loader ${size}`}>
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line"></div>
          </div>
        );
      
      default:
        return (
          <div className={`spinner-loader ${size} ${color}`}>
            <div className="spinner"></div>
          </div>
        );
    }
  };

  const content = (
    <div className={`loader-container ${fullScreen ? 'fullscreen' : ''}`}>
      <LoaderComponent />
      {text && <p className="loader-text">{text}</p>}
    </div>
  );

  if (overlay || fullScreen) {
    return (
      <div className={`loader-overlay ${fullScreen ? 'fullscreen' : ''}`}>
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;