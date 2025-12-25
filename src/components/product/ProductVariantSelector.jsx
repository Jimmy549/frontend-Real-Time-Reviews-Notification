import React from 'react';
import './ProductVariantSelector.css';

const ProductVariantSelector = ({ variants, selectedVariant, onVariantChange }) => {
  const getVariantImage = (variant) => {
    if (variant.image) {
      return variant.image;
    }
    
    // Map size to corresponding icon
    const sizeImageMap = {
      '50g': '/src/assets/icons/50 g bag.png',
      '100g': '/src/assets/icons/100 g bag.png',
      '170g': '/src/assets/icons/170 g bag.png',
      'sample': '/src/assets/icons/Sample Bag.png'
    };
    
    const size = variant.attributes?.size?.toLowerCase() || variant.name?.toLowerCase();
    return sizeImageMap[size] || sizeImageMap['100g'];
  };

  return (
    <div className="variant-selector">
      <h4>Select Size:</h4>
      <div className="variant-options">
        {variants.map(variant => (
          <button 
            key={variant.id || variant._id}
            onClick={() => onVariantChange(variant)}
            className={`variant-option ${selectedVariant?.id === variant.id || selectedVariant?._id === variant._id ? 'selected' : ''}`}
          >
            <img 
              src={getVariantImage(variant)} 
              alt={variant.name}
              className="variant-image"
            />
            <div className="variant-info">
              <span className="variant-name">{variant.name}</span>
              <span className="variant-price">${variant.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductVariantSelector;