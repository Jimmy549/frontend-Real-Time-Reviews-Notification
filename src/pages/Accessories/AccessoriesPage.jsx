import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const AccessoriesPage = () => {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState({});

  const accessories = [
    { id: 1, name: 'Tea Infuser', price: 12.99, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop', description: 'Stainless steel tea infuser' },
    { id: 2, name: 'Tea Pot', price: 29.99, image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&h=400&fit=crop', description: 'Ceramic tea pot 800ml' },
    { id: 3, name: 'Tea Cups Set', price: 24.99, image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&h=400&fit=crop', description: 'Set of 4 ceramic cups' },
    { id: 4, name: 'Tea Strainer', price: 8.99, image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop', description: 'Fine mesh strainer' },
    { id: 5, name: 'Tea Storage Tin', price: 15.99, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop', description: 'Airtight storage container' },
    { id: 6, name: 'Tea Spoon Set', price: 9.99, image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop', description: 'Set of 6 tea spoons' }
  ];

  const handleAddToCart = (accessory) => {
    // Create a variant object for accessories (since they don't have variants like tea products)
    const variant = {
      size: 'Standard',
      price: accessory.price
    };

    addItem(accessory, variant, 1);

    // Show feedback
    setAddedToCart(prev => ({ ...prev, [accessory.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [accessory.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Tea Accessories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enhance your tea experience with our premium collection of tea accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accessories.map((item) => (
            <div key={item.id} className="group">
              <div className="aspect-square overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-gray-900">€{item.price}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`px-4 py-2 text-white text-sm transition-colors ${
                    addedToCart[item.id]
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  {addedToCart[item.id] ? 'Added!' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;
