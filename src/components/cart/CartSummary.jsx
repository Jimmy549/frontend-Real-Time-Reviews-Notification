import React from 'react';

const CartSummary = ({ subtotal, tax, total }) => {
  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-line">
        <span>Subtotal:</span>
        <span>${subtotal}</span>
      </div>
      <div className="summary-line">
        <span>Tax:</span>
        <span>${tax}</span>
      </div>
      <div className="summary-line total">
        <span>Total:</span>
        <span>${total}</span>
      </div>
    </div>
  );
};

export default CartSummary;