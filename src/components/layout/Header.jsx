import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, UserIcon, ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { NAV_LINKS } from '../../utils/constants';
import MobileMenu from './MobileMenu';
import Logo from '../../assets/Logo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../notifications/NotificationBell';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, getItemCount, removeItem, updateQuantity } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-[72px] py-4 md:py-6 lg:py-[30px]">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 md:space-x-3">
                <Logo className="w-7 h-7 md:w-9 md:h-9 text-gray-900" />
                <span className="text-base md:text-[20px] leading-5 tracking-[0.1px] text-[rgba(40,40,40,1)]" style={{ fontFamily: 'Prosto One' }}>Brand Name</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-8 flex-1 justify-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:px-3 hover:py-2 hover:rounded-md transition-all duration-300 uppercase relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 md:p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Notifications */}
              {isAuthenticated && <NotificationBell />}

              {/* User Account */}
              <div className="hidden md:block relative" ref={userMenuRef}>
                {isAuthenticated ? (
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                  >
                    <UserIcon className="w-5 h-5" />
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <UserIcon className="w-5 h-5" />
                  </Link>
                )}
                
                {isAuthenticated && isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-xl border border-gray-200 rounded-lg z-50">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                        </div>
                      </div>
                      {user?.role && (
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800 capitalize">
                            {user.role}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        My Orders
                      </Link>
                      {user?.role === 'superadmin' && (
                        <Link
                          to="/superadmin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          Dashboard
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Shopping Cart */}
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-1.5 md:p-2 text-gray-600 hover:text-gray-900 transition-colors relative"
              >
                <ShoppingBagIcon className="w-5 h-5 md:w-6 md:h-6" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] md:text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-1.5 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 top-full w-full bg-white shadow-lg border-t border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search for tea, accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/collections?search=${searchQuery}`);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  autoFocus
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      navigate(`/collections?search=${searchQuery}`);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Search
                </button>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Dropdown */}
        {isCartOpen && (
          <div className="absolute right-0 top-full w-80 bg-white shadow-lg border border-gray-200 z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">My Bag</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {cart.items.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Your bag is empty</p>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{item.product.name} - {item.variant.size}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                              >
                                -
                              </button>
                              <span className="text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-50"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm font-medium">€{(item.variant.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Subtotal</span>
                      <span className="text-sm font-medium">€{cart.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm">Delivery</span>
                      <span className="text-sm font-medium">€{cart.delivery.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">Total</span>
                      <span className="font-bold text-lg">€{cart.total.toFixed(2)}</span>
                    </div>
                    <Link 
                      to="/cart"
                      className="w-full bg-gray-900 text-white py-2 px-4 text-center block hover:bg-gray-800 transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      PURCHASE
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};

export default Header;
