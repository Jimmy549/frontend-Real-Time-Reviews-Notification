import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const OrdersPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, navigate, user]);

  const fetchOrders = async () => {
    try {
      // Try to get from backend first
      const res = await api.get('/orders');

      // normalize backend response into an array of orders
      let backendOrders = [];
      if (Array.isArray(res)) backendOrders = res;
      else if (res?.data?.data?.orders) backendOrders = res.data.data.orders;
      else if (res?.data?.orders) backendOrders = res.data.orders;
      else if (res?.orders) backendOrders = res.orders;
      else if (res?.data) backendOrders = Array.isArray(res.data) ? res.data : (res.data.orders || []);

      // Also get from localStorage
      const localOrders = JSON.parse(localStorage.getItem('tea_orders') || '[]');

      // Filter orders so each user only sees their own orders
      const userId = user?._id || user?.id || user?.userId || null;

      const orderBelongsToUser = (order) => {
        if (!userId) return false;
        if (!order) return false;
        if (order.userId && String(order.userId) === String(userId)) return true;
        if (order.user && (String(order.user._id) === String(userId) || String(order.user.id) === String(userId))) return true;
        if (order.customerId && String(order.customerId) === String(userId)) return true;
        return false;
      };

      const filteredLocal = localOrders.filter(orderBelongsToUser);
      const filteredBackend = backendOrders.filter(orderBelongsToUser);

      const allOrders = [...filteredLocal, ...filteredBackend];
      setOrders(allOrders);
    } catch (error) {
      console.error('Error:', error);
      // If backend fails, just show localStorage orders
      const localOrders = JSON.parse(localStorage.getItem('tea_orders') || '[]');
      const userId = user?._id || user?.id || user?.userId || null;
      const filteredLocal = localOrders.filter(o => {
        if (!userId) return false;
        return o.userId && String(o.userId) === String(userId);
      });
      setOrders(filteredLocal);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-light text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/collections')}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order._id.slice(-8)}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <p className="text-lg font-medium text-gray-900 mt-2">€{order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {order.items && order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={item.product?.image || item.product?.images?.[0]?.url || 'https://via.placeholder.com/64'} 
                            alt={item.product?.name || 'Product'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.product?.name || 'Product'}
                          </h3>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          €{((item.price || 0) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Shipping Address:</p>
                        <p className="mt-1">
                          {order.shippingAddress?.street || 'N/A'}, {order.shippingAddress?.city || 'N/A'}
                        </p>
                      </div>
                      <button
                        onClick={() => alert(`Order Details:\n\nOrder ID: ${order._id}\nStatus: ${order.status}\nTotal: €${order.totalAmount}\n\nTracking information will be sent to your email.`)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
