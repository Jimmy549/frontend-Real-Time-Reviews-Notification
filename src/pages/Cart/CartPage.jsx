import React from 'react';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatCurrency';
import ProductCard from '../../components/product/ProductCard';
import imgMain from '../../assets/images/107c02d9996dfe83fb8bdd868196319fa864018f.jpg';
import imgA from '../../assets/images/4469b82376e6d6e4dd6477a7a98cf42a45a38a05.jpg';
import imgB from '../../assets/images/45d4af846a0c593ecfde4bf49b9637f4ae8a63f2.jpg';
import imgC from '../../assets/images/4d22ce807689d07a2d316c9b9bd21294008059d1.jpg';

const CartPage = () => {
  const { cart, updateQuantity, removeItem } = useCart();

  const cartItems = cart.items.length > 0 ? cart.items : [];

  const relatedProducts = [
    { id: 4, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: imgA },
    { id: 5, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: imgB },
    { id: 6, name: 'Ceylon Ginger Cinnamon chai tea', price: 4.85, image: imgC }
  ];

  const subtotal = cart.subtotal;
  const delivery = cart.delivery;
  const total = cart.total;

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <Link to="/collections" className="p-2">
            <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
          </Link>
        </div>
      </div>

      {/* Progress Steps - Desktop */}
      <div className="hidden md:block border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">1</span>
              <span className="text-sm font-medium">MY BAG</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">2</span>
              <span className="text-sm text-gray-500">DELIVERY</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">3</span>
              <span className="text-sm text-gray-500">REVIEW & PAYMENT</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4 lg:space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Your bag is empty</p>
                  <Link to="/collections" className="text-sm text-gray-900 underline mt-2 inline-block">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 lg:space-x-4 py-3 lg:py-4 border-b border-gray-200">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs lg:text-sm font-medium text-gray-900 mb-1">
                        {item.product.name} - {item.variant.size}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-gray-500 hover:text-gray-700 uppercase"
                      >
                        REMOVE
                      </button>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            <MinusIcon className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            <PlusIcon className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          €{(item.variant.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="hidden lg:block mt-8">
              <div className="flex justify-between items-center py-4 border-t border-gray-200">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-sm font-medium">€{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/collections"
              className="hidden lg:inline-block mt-6 border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors rounded"
            >
              BACK TO SHOPPING
            </Link>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 lg:p-6 rounded-lg">
            <h2 className="text-base lg:text-lg font-medium text-gray-900 mb-4 lg:mb-6">Order summary</h2>
            
            <div className="space-y-3 lg:space-y-4">
              <div className="flex justify-between">
                <span className="text-xs lg:text-sm text-gray-600">Subtotal</span>
                <span className="text-xs lg:text-sm font-medium">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs lg:text-sm text-gray-600">Delivery</span>
                <span className="text-xs lg:text-sm font-medium">€{delivery.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 lg:pt-4">
                <div className="flex justify-between">
                  <span className="text-sm lg:text-base font-medium text-gray-900">Total</span>
                  <span className="text-lg lg:text-xl font-bold text-gray-900">€{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-3 lg:mt-4 text-xs text-gray-500">
              Estimated shipping time: 2 days
            </div>

            <Link
              to="/checkout"
              className="w-full bg-gray-900 text-white py-3 px-4 text-center block mt-4 lg:mt-6 hover:bg-gray-800 transition-colors rounded text-sm lg:text-base"
            >
              CHECK OUT
            </Link>

            {/* Payment Methods */}
            <div className="mt-6 lg:mt-8">
              <h3 className="text-xs lg:text-sm font-medium text-gray-900 mb-3 lg:mb-4">Payment type</h3>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {/* Mastercard */}
                <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center w-16 h-10">
                  <svg className="h-6" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="white"/>
                    <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                    <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                    <path d="M24 9.5C22.1 11.1 21 13.4 21 16C21 18.6 22.1 20.9 24 22.5C25.9 20.9 27 18.6 27 16C27 13.4 25.9 11.1 24 9.5Z" fill="#FF5F00"/>
                  </svg>
                </div>
                
                {/* Visa */}
                <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center w-16 h-10">
                  <svg className="h-6" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="white"/>
                    <path d="M20.5 11L17.8 21H15.2L13.5 13.8C13.4 13.4 13.3 13.2 13 13C12.5 12.7 11.7 12.4 11 12.2L11.1 11.7H15.2C15.8 11.7 16.3 12.1 16.4 12.7L17.4 18.2L19.8 11.7H22.4L20.5 11ZM32.5 18.8C32.5 16.2 28.8 16 28.8 14.8C28.8 14.4 29.2 13.9 30.1 13.8C30.6 13.7 31.9 13.6 33.3 14.3L33.9 11.9C33.1 11.6 32 11.4 30.8 11.4C28.3 11.4 26.5 12.7 26.5 14.6C26.5 16 27.8 16.7 28.8 17.2C29.9 17.7 30.3 18 30.3 18.5C30.3 19.2 29.5 19.5 28.7 19.5C27.4 19.5 26.7 19.2 25.9 18.8L25.3 21.3C26.1 21.6 27.6 21.9 29.1 21.9C31.8 21.9 33.5 20.6 33.5 18.6L32.5 18.8ZM40.5 21H42.8L40.7 11H38.5C38 11 37.6 11.3 37.4 11.8L33.5 21H36.1L36.7 19.3H39.9L40.5 21ZM37.5 17.3L38.9 13.5L39.7 17.3H37.5ZM26.5 11L24.3 21H21.9L24.1 11H26.5Z" fill="#1434CB"/>
                  </svg>
                </div>
                
                {/* American Express */}
                <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center w-16 h-10">
                  <svg className="h-6" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#006FCF"/>
                    <path d="M10 13.5L11.2 10.5H13.5L12.3 13.5H14.8L16 10.5H18.3L17.1 13.5H20L21.5 10H24L20.5 18H18L19.3 15H16.8L15.5 18H13L16.5 10H14L12.5 13.5H10Z" fill="white"/>
                    <path d="M25 10H30V11.5H26.5V13H29.5V14.5H26.5V16H30V17.5H25V10Z" fill="white"/>
                    <path d="M31 10H33.5L35 12.5L36.5 10H39L36 14.5V18H34V14.5L31 10Z" fill="white"/>
                  </svg>
                </div>
                
                {/* PayPal */}
                <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center w-16 h-10">
                  <svg className="h-6" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="white"/>
                    <path d="M20 10C22.5 10 24 11 24 13.5C24 16 22.5 17 20 17H18L17 21H15L17 10H20Z" fill="#003087"/>
                    <path d="M19 12H18L17.5 15H18.5C19.5 15 20 14.5 20 13.5C20 12.5 19.5 12 19 12Z" fill="#009CDE"/>
                    <path d="M26 10C28.5 10 30 11 30 13.5C30 16 28.5 17 26 17H24L23 21H21L23 10H26Z" fill="#003087"/>
                    <path d="M25 12H24L23.5 15H24.5C25.5 15 26 14.5 26 13.5C26 12.5 25.5 12 25 12Z" fill="#009CDE"/>
                  </svg>
                </div>
                
                {/* Discover */}
                <div className="bg-white border border-gray-300 rounded px-3 py-2 flex items-center justify-center w-16 h-10">
                  <svg className="h-6" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="32" rx="4" fill="#FF6000"/>
                    <circle cx="38" cy="16" r="8" fill="#FFA500"/>
                    <path d="M12 13H14V19H12V13Z" fill="white"/>
                    <path d="M15 13H17C18.5 13 19.5 14 19.5 16C19.5 18 18.5 19 17 19H15V13ZM16.5 14.5V17.5H17C17.5 17.5 18 17 18 16C18 15 17.5 14.5 17 14.5H16.5Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 lg:mt-8">
              <h3 className="text-xs lg:text-sm font-medium text-gray-900 mb-3 lg:mb-4">Delivery and retour</h3>
              <div className="space-y-2 text-[10px] lg:text-xs text-gray-600">
                <div className="flex items-start space-x-2">
                  <span>▶</span>
                  <span>Order before 12:00 and we will ship the same day.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span>▶</span>
                  <span>Orders made after Friday 12:00 are processed on Monday.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span>▶</span>
                  <span>To return your articles, please contact us first.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span>▶</span>
                  <span>Postal charges for retour are not reimbursed.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular This Season */}
        <div className="mt-8 lg:mt-16">
          <h2 className="text-xl lg:text-2xl font-normal text-center text-gray-900 mb-6 lg:mb-12">
            Popular this season
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;