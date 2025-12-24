import React from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, MagnifyingGlassIcon, UserIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/Logo';

const MobileMenu = ({ isOpen, onClose }) => {
  const { getItemCount } = useCart();
  const { user, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] md:w-[450px] lg:w-[500px] bg-white shadow-xl overflow-y-auto transform transition-transform">
        <div className="flex items-center justify-end p-4">
          <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="SEARCH PRODUCTS" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-400" />
          </div>
        </div>
        <div className="px-4 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 py-3">
            <UserIcon className="w-6 h-6 text-gray-700 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900">USER PROFILE</div>
              <div className="text-xs text-gray-500 truncate">{isAuthenticated ? user?.name || 'User' : 'We know you as a guest user'}</div>
            </div>
          </div>
        </div>
        <Link to="/cart" onClick={onClose} className="block px-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <ShoppingBagIcon className="w-6 h-6 text-gray-700 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900">YOUR BAG</div>
              <div className="text-xs text-gray-500">{getItemCount()} items have been added</div>
            </div>
          </div>
        </Link>
        <nav className="py-4">
          <Link to="/collections" className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={onClose}>TEA COLLECTIONS</Link>
          <Link to="/accessories" className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={onClose}>ACCESSORIES</Link>
          <Link to="/blog" className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={onClose}>BLOG</Link>
          <Link to="/contact" className="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors" onClick={onClose}>CONTACT US</Link>
        </nav>
        <div className="px-4 py-6 bg-gray-50 mt-4">
          <div className="flex items-center space-x-3 mb-4">
            <Logo className="w-8 h-8 text-gray-900 flex-shrink-0" />
            <span className="text-lg font-semibold" style={{ fontFamily: 'Prosto One' }}>Brand Name</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">We offer loose tea leaves of the best quality for your business. With a choice of more than 450 different kinds of loose tea, we can make a sophisticated selection that fits exactly in your kind of establishment.</p>
          <div className="mt-4 text-xs text-gray-500">ALL RIGHTS RESERVED BY Brand Name Co</div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;