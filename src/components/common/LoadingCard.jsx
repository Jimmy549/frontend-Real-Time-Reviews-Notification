import React from 'react';
import Loader from './Loader';

const LoadingCard = ({ 
  loading = false, 
  children, 
  className = '',
  skeletonLines = 3,
  height = 'auto'
}) => {
  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-4 ${className}`} style={{ height }}>
        <div className="animate-pulse">
          {/* Image placeholder */}
          <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
          
          {/* Text placeholders */}
          <div className="space-y-3">
            {Array.from({ length: skeletonLines }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                {index === skeletonLines - 1 && (
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* Button placeholder */}
          <div className="mt-4 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const ProductCardSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} loading={true} />
      ))}
    </div>
  );
};

export const OrderCardSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
            
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingCard;