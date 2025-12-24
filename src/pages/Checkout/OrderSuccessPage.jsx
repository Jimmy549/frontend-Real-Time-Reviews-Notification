import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-medium text-gray-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
        {order && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-xl font-bold text-gray-900 mb-4">{order.orderNumber}</p>
            <p className="text-sm text-gray-600 mb-2">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">€{order.totalAmount.toFixed(2)}</p>
          </div>
        )}
        <p className="text-sm text-gray-600 mb-8">A confirmation email has been sent to your email address.</p>
        <div className="space-y-3">
          <Link to="/orders" className="block w-full bg-gray-900 text-white py-3 px-6 hover:bg-gray-800 transition-colors">
            VIEW MY ORDERS
          </Link>
          <Link to="/collections" className="block w-full border border-gray-300 py-3 px-6 hover:bg-gray-50 transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
