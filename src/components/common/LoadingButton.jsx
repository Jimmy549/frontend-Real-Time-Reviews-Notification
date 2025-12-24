import React from 'react';

const LoadingButton = ({
  children,
  loading = false,
  loadingText = 'Loading...',
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  const baseClasses = 'btn transition-all duration-200 relative';
  const variantClasses = {
    primary: 'bg-green-800 hover:bg-green-900 text-white',
    secondary: 'bg-amber-700 hover:bg-amber-800 text-white',
    outline: 'border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white',
    ghost: 'text-green-800 hover:bg-green-50'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${loading ? 'opacity-75 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-pulse bg-current bg-opacity-50 rounded h-4 w-16"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
