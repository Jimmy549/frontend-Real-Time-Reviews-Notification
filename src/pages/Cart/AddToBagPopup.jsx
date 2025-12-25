import React, { useEffect } from 'react';

const AddToBagPopup = ({ isOpen, onClose, product }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Added to Cart!</h3>
        <div className="product-info">
          <img src={product?.image} alt={product?.name} />
          <p>{product?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default AddToBagPopup;