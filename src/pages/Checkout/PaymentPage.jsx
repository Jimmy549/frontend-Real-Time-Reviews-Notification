import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';
import { createOrder } from '../../api/orders';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if cart is empty
    if (!cart.items || cart.items.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      navigate('/collections');
      return;
    }
    
    // Check if user is logged in
    if (!user) {
      alert('Please login to place an order.');
      navigate('/login');
      return;
    }
    
    setLoading(true);

    try {
      // Prepare payment data
      const paymentData = {
        cardNumber: formData.cardNumber,
        cardName: formData.cardName,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        email: formData.email
      };
      
      // Prepare cart items for backend
      const items = cart.items.map(item => ({
        productId: item.product.id,
        variantId: item.variant.id,
        name: item.product.name,
        variant: item.variant.size,
        image: item.product.image,
        quantity: item.quantity,
        price: item.variant.price
      }));
      
      const orderData = {
        items,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod,
        paymentData
      };

      const response = await createOrder(orderData);
      clearCart();
      navigate('/order-success', { state: { order: response.data.data } });
    } catch (error) {
      console.error('Order error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Order failed. Please try again.';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">✓</span>
              <span className="text-sm text-gray-500">MY BAG</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm">2</span>
              <span className="text-sm font-medium">DELIVERY & PAYMENT</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">3</span>
              <span className="text-sm text-gray-500">CONFIRMATION</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="text-xl font-medium mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required className="border border-gray-300 px-4 py-2" />
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required className="border border-gray-300 px-4 py-2" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="col-span-2 border border-gray-300 px-4 py-2" />
                  <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required className="col-span-2 border border-gray-300 px-4 py-2" />
                  <input type="text" name="street" placeholder="Street Address" value={formData.street} onChange={handleInputChange} required className="col-span-2 border border-gray-300 px-4 py-2" />
                  <input type="text" name="apartment" placeholder="Apartment (Optional)" value={formData.apartment} onChange={handleInputChange} className="col-span-2 border border-gray-300 px-4 py-2" />
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required className="border border-gray-300 px-4 py-2" />
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required className="border border-gray-300 px-4 py-2" />
                  <input type="text" name="zipCode" placeholder="ZIP Code" value={formData.zipCode} onChange={handleInputChange} required className="border border-gray-300 px-4 py-2" />
                  <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} required className="border border-gray-300 px-4 py-2" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <div className="space-y-3 mb-6">
                  {['credit_card', 'debit_card', 'paypal', 'stripe'].map(method => (
                    <label key={method} className="flex items-center space-x-3 cursor-pointer">
                      <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4" />
                      <span className="text-sm capitalize">{method.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>

                {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                  <div className="space-y-4">
                    <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleInputChange} required className="w-full border border-gray-300 px-4 py-2" maxLength="16" />
                    <input type="text" name="cardName" placeholder="Cardholder Name" value={formData.cardName} onChange={handleInputChange} required className="w-full border border-gray-300 px-4 py-2" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} required className="border border-gray-300 px-4 py-2" maxLength="5" />
                      <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} required className="border border-gray-300 px-4 py-2" maxLength="3" />
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gray-900 text-white py-3 px-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400">
                {loading ? 'Processing...' : 'PLACE ORDER'}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 p-6 h-fit">
            <h2 className="text-lg font-medium mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.items.map(item => (
                <div key={item.id} className="flex space-x-3">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.product.name}</div>
                    <div className="text-xs text-gray-600">{item.variant.size} × {item.quantity}</div>
                  </div>
                  <div className="text-sm font-medium">€{(item.variant.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>€{cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span>€{cart.delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>€{cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
