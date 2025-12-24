import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/product/ProductCard';
import Reviews from '../../components/reviews/Reviews';
import { formatPrice } from '../../utils/formatCurrency';
import imgMain from '../../assets/images/107c02d9996dfe83fb8bdd868196319fa864018f.jpg';
import imgA from '../../assets/images/4469b82376e6d6e4dd6477a7a98cf42a45a38a05.jpg';
import imgB from '../../assets/images/45d4af846a0c593ecfde4bf49b9637f4ae8a63f2.jpg';
import imgC from '../../assets/images/4d22ce807689d07a2d316c9b9bd21294008059d1.jpg';
import icon50g from '../../assets/icons/50 g bag.png';
import icon100g from '../../assets/icons/100 g bag.png';
import icon170g from '../../assets/icons/170 g bag.png';
import iconSampler from '../../assets/icons/Sample Bag.png';


const ProductPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showCartPopup, setShowCartPopup] = useState(false);

  // Scroll to reviews if hash is present
  useEffect(() => {
    if (window.location.hash === '#reviews') {
      setTimeout(() => {
        const reviewsSection = document.getElementById('reviews-section');
        if (reviewsSection) {
          reviewsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  // Mock product data
  const product = {
    id: 1,
    name: 'Ceylon Ginger Cinnamon chai tea',
    description: 'A lovely warming Chai tea with ginger cinnamon flavours.',
    price: 3.90,
    image: imgMain,
    origin: 'Iran',
    organic: true,
    vegan: true,
    variants: [
      { id: '50g', size: '50 g bag', price: 3.90, icon: icon50g },
      { id: '100g', size: '100 g bag', price: 7.50, icon: icon100g },
      { id: '170g', size: '170 g bag', price: 12.95, icon: icon170g },
      { id: 'sampler', size: 'Sampler', price: 2.50, icon: iconSampler }
    ],
    steepingInstructions: {
      servingSize: '2 tsp per cup, 6 tsp per pot',
      waterTemperature: '100°C',
      steepingTime: '3 - 5 minutes',
      colorAfter3Minutes: true
    },
    aboutTea: {
      flavor: 'Spicy',
      qualities: 'Smoothing',
      caffeine: 'Medium',
      allergens: 'Nuts-free'
    },
    ingredients: 'Black Ceylon tea, Green tea, Ginger root, Cloves, Black pepper, Cinnamon sticks, Cardamom, Cinnamon pieces.'
  };

  const relatedProducts = [
    {
      _id: 'related-1',
      id: 2,
      name: 'Ceylon Ginger Cinnamon chai tea',
      basePrice: 4.85,
      price: 4.85,
      origin: 'Sri Lanka',
      flavor: 'Spicy',
      image: imgA
    },
    {
      _id: 'related-2',
      id: 3,
      name: 'Earl Grey Premium Blend',
      basePrice: 5.25,
      price: 5.25,
      origin: 'India',
      flavor: 'Bergamot',
      image: imgB
    },
    {
      _id: 'related-3',
      id: 4,
      name: 'Green Dragon Well Tea',
      basePrice: 6.15,
      price: 6.15,
      origin: 'China',
      flavor: 'Fresh',
      image: imgC
    }
  ];

  const handleAddToBag = () => {
    addItem(product, product.variants[selectedVariant], quantity);
    setShowCartPopup(true);
  };

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

      {/* Breadcrumbs - Desktop */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-600">
          HOME/COLLECTIONS/CHAI/CEYLON GINGER CINNAMON CHAI TEA
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <h1 className="text-xl lg:text-3xl font-normal text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-sm lg:text-base text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">🌍</span>
                  <span className="text-xs lg:text-sm text-gray-600">Origin: {product.origin}</span>
                </div>
                {product.organic && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Organic
                  </span>
                )}
                {product.vegan && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Vegan
                  </span>
                )}
              </div>

              <div className="text-xl lg:text-2xl font-normal text-gray-900 mb-4 lg:mb-6">
                €{product.variants[selectedVariant].price.toFixed(2)}
              </div>
            </div>

            {/* Variants */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Variants</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`p-2 lg:p-3 text-center text-sm transition-all border-2 rounded-lg hover:border-gray-900 hover:shadow-md ${
                      selectedVariant === index 
                        ? 'border-gray-900 bg-gray-50 shadow-md' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <img src={variant.icon} alt={variant.size} className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-1 lg:mb-2 object-contain" />
                    <div className="font-medium text-[10px] lg:text-xs">{variant.size}</div>
                    <div className="text-[10px] lg:text-xs text-gray-600 mt-1">€{variant.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Bag */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="px-3 lg:px-4 py-2 min-w-[2.5rem] lg:min-w-[3rem] text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToBag}
                className="flex-1 bg-gray-900 text-white py-2.5 lg:py-3 px-4 lg:px-6 hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 rounded text-sm lg:text-base"
              >
                <ShoppingBagIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>ADD TO BAG</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-8 lg:mt-16">
          {/* Steeping Instructions */}
          <div>
            <h2 className="text-lg lg:text-xl font-normal text-gray-900 mb-4 lg:mb-6">Steeping instructions</h2>
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-lg">☕</span>
                <div>
                  <div className="font-medium text-sm">SERVING SIZE:</div>
                  <div className="text-sm text-gray-600">{product.steepingInstructions.servingSize}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">🌡️</span>
                <div>
                  <div className="font-medium text-sm">WATER TEMPERATURE:</div>
                  <div className="text-sm text-gray-600">{product.steepingInstructions.waterTemperature}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg">⏱️</span>
                <div>
                  <div className="font-medium text-sm">STEEPING TIME:</div>
                  <div className="text-sm text-gray-600">{product.steepingInstructions.steepingTime}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-4 h-4 bg-red-600 rounded-full"></span>
                <div className="text-sm text-gray-600">COLOR AFTER 3 MINUTES</div>
              </div>
            </div>
          </div>

          {/* About This Tea */}
          <div>
            <h2 className="text-lg lg:text-xl font-normal text-gray-900 mb-4 lg:mb-6">About this tea</h2>
            <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">FLAVOR</div>
                <div className="text-sm text-gray-900">{product.aboutTea.flavor}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">QUALITIES</div>
                <div className="text-sm text-gray-900">{product.aboutTea.qualities}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">CAFFEINE</div>
                <div className="text-sm text-gray-900">{product.aboutTea.caffeine}</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 mb-1">ALLERGENS</div>
                <div className="text-sm text-gray-900">{product.aboutTea.allergens}</div>
              </div>
            </div>

            <div>
              <h3 className="text-base lg:text-lg font-normal text-gray-900 mb-2 lg:mb-3">Ingredient</h3>
              <p className="text-xs lg:text-sm text-gray-600">{product.ingredients}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div id="reviews-section">
          <Reviews productId={id || '1'} />
        </div>

        {/* You May Also Like */}
        <div className="mt-12 lg:mt-16">
          <h2 className="text-xl lg:text-2xl font-normal text-center text-gray-900 mb-6 lg:mb-12">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>

      {/* Cart Popup */}
      {showCartPopup && (
        <div className="fixed top-4 right-4 left-4 md:left-auto md:w-80 bg-white border border-gray-200 shadow-lg p-4 rounded-lg z-50">
          <div className="flex items-center space-x-3">
            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
            <div className="flex-1">
              <div className="text-sm font-medium">Added to bag!</div>
              <div className="text-xs text-gray-600 truncate">{product.name}</div>
            </div>
            <button
              onClick={() => setShowCartPopup(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;