import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, StarIcon } from '@heroicons/react/24/outline';
import { formatPrice } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import MiniReviews from '../reviews/MiniReviews';

// Add line-clamp utility if not already in Tailwind config

const ProductCard = ({ product, className = '' }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // Handle different product data structures
  const productId = product._id || product.id;
  const productName = product.name || 'Unnamed Product';
  const productPrice = product.basePrice || product.price || 0;
  
  // Get a proper image URL or fallback
  const getProductImage = () => {
    // Try to get image from product.images array
    if (product.images && product.images.length > 0) {
      const imageUrl = product.images[0].url;
      if (imageUrl && imageUrl.startsWith('https://') && imageUrl.includes('.')) {
        return imageUrl;
      }
    }
    
    // Try to get image from product.image
    if (product.image && product.image.startsWith('https://') && product.image.includes('.')) {
      return product.image;
    }
    
    // Use Unsplash as fallback with tea-related images
    const teaImages = [
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1597318281675-d05b6f6d4e8d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop'
    ];
    
    // Use product name hash to consistently pick the same image for the same product
    const hash = productName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return teaImages[Math.abs(hash) % teaImages.length];
  };
  
  const productImage = getProductImage();
  const productOrigin = product.origin || '';
  const productFlavor = product.flavor || '';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const defaultVariant = { 
        id: '50g', 
        size: '50 g bag', 
        price: productPrice 
      };
      
      const productForCart = { 
        ...product, 
        id: productId,
        _id: productId,
        image: productImage,
        name: productName,
        basePrice: productPrice
      };
      
      console.log('Adding to cart:', productForCart, defaultVariant);
      addItem(productForCart, defaultVariant, 1);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const handleReviewsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${productId}#reviews`);
  };

  return (
    <div className={`group relative ${className}`}>
      <Link to={`/product/${productId}`} className="block">
        <div className="bg-white">
          {/* Product Image */}
          <div className="aspect-square bg-[#E8E8E8] overflow-hidden mb-2 md:mb-4 relative rounded-lg">
            <img
              src={productImage}
              alt={productName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                if (!e.target.dataset.errorHandled) {
                  e.target.dataset.errorHandled = 'true';
                  // Use a reliable fallback image
                  e.target.src = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop';
                }
              }}
              loading="lazy"
            />
            <button
              onClick={handleQuickAdd}
              className="hidden md:block absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
              title="Quick Add to Bag"
            >
              <ShoppingBagIcon className="w-5 h-5 text-gray-900" />
            </button>
            <button
              onClick={handleReviewsClick}
              className="hidden md:block absolute bottom-4 left-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
              title="View Reviews"
            >
              <StarIcon className="w-5 h-5 text-gray-900" />
            </button>
          </div>
          
          {/* Product Info */}
          <div className="text-center space-y-1 md:space-y-2">
            <h3 className="text-xs md:text-base font-normal text-gray-900 leading-tight line-clamp-2">
              {productName}
            </h3>
            
            {(productOrigin || productFlavor) && (
              <p className="text-[10px] md:text-xs text-gray-500 truncate">
                {productOrigin} {productOrigin && productFlavor && '•'} {productFlavor}
              </p>
            )}
            
            <div className="text-xs md:text-sm text-gray-700">
              <span className="font-medium">{formatPrice(productPrice)}</span>
              <span className="text-gray-500"> / 50 g</span>
            </div>
            
            {/* Mobile Action Buttons */}
            <div className="md:hidden flex gap-2 mt-2">
              <button
                onClick={handleQuickAdd}
                className="flex-1 bg-gray-900 text-white py-1.5 px-3 rounded text-xs hover:bg-gray-800 transition-colors flex items-center justify-center gap-1"
              >
                <ShoppingBagIcon className="w-3 h-3" />
                Add to Bag
              </button>
              <button
                onClick={handleReviewsClick}
                className="flex-1 bg-gray-100 text-gray-700 py-1.5 px-3 rounded text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
              >
                <StarIcon className="w-3 h-3" />
                Reviews
              </button>
            </div>
            
            {/* Mini Reviews Section */}
            <MiniReviews productId={productId} />
          </div>
        </div>
      </Link>
      
      {showPopup && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-[10px] md:text-xs py-1.5 md:py-2 px-2 md:px-3 text-center rounded z-10">
          Added to bag!
        </div>
      )}
    </div>
  );
};

export default ProductCard;
