import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import DashboardLayout from './DashboardLayout';
import { DashboardLoader } from '../../components/common/PageLoader';
import './Dashboard.css';

const SuperAdminDashboard = () => {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'admin' });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || user.role !== 'superadmin') {
      navigate('/admin/login');
      return;
    }
    
    fetchData();
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      setError(null);
      const [statsRes, usersRes, productsRes, ordersRes] = await Promise.all([
          api.get('/superadmin/dashboard-stats'),
          api.get('/superadmin/users'),
          api.get('/superadmin/products'),
          api.get('/superadmin/orders')
        ]);

        // Handle stats response
        setStats(statsRes?.data || statsRes || {});
        
        // Handle users response with multiple fallbacks
        const usersData = usersRes?.data?.users || usersRes?.data?.data?.users || usersRes?.data || usersRes || [];
        setUsers(Array.isArray(usersData) ? usersData : []);
        
        // Handle products response with multiple fallbacks
        const productsData = productsRes?.data?.products || productsRes?.data?.data?.products || productsRes?.data?.data?.items || productsRes?.data || productsRes || [];
        setProducts(Array.isArray(productsData) ? productsData : []);
        
        // Handle orders response with multiple fallbacks
        const ordersData = ordersRes?.data?.orders || ordersRes?.data?.data?.orders || ordersRes?.data || ordersRes || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
        
        setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching superadmin data:', error);
      setError(error?.response?.data?.message || error?.message || 'Failed to fetch data');
      
      // Set empty defaults on error
      setStats({});
      setUsers([]);
      setProducts([]);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/superadmin/create-admin', formData);
      alert('Admin created successfully!');
      setShowCreateAdmin(false);
      setFormData({ name: '', email: '', password: '', role: 'admin' });
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create admin');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/superadmin/users/${userId}/role`, { role: newRole });
      alert('Role updated!');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update role');
    }
  };

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      await api.put(`/users/${userId}/${isBlocked ? 'unblock' : 'block'}`);
      alert(`User ${isBlocked ? 'unblocked' : 'blocked'}!`);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/superadmin/users/${userId}`);
      alert('User deleted!');
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete');
    }
  };

  // Show loading while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  // Show loading while fetching dashboard data
  if (loading) return <DashboardLayout><DashboardLoader loading={true} /></DashboardLayout>;

  return (
    <DashboardLayout title="Super Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">{error ? <span className="text-red-600">{error}</span> : <span>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : '—'}</span>}</div>
          <div>
            <button onClick={fetchData} className="px-3 py-1 bg-gray-200 rounded mr-2">Refresh</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900">{stats?.users?.totalUsers ?? 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">{stats?.users?.activeUsers ?? 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Admins</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.users?.totalAdmins ?? 0}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Blocked Users</h3>
            <p className="text-3xl font-bold text-red-600">{stats?.users?.blockedUsers ?? 0}</p>
          </div>
        </div>

        {/* Create Admin Button */}
        <button 
          onClick={() => setShowCreateAdmin(!showCreateAdmin)} 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showCreateAdmin ? 'Cancel' : 'Create Admin'}
        </button>

        {/* Create Admin Form */}
        {showCreateAdmin && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Create New Admin</h2>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Create
              </button>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-bold p-6 border-b">All Products ({products.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.slice(0, 10).map((p) => (
                  <tr key={p._id}>
                    <td className="px-6 py-4">{p.name}</td>
                    <td className="px-6 py-4">{p.category?.name || 'N/A'}</td>
                    <td className="px-6 py-4">€{p.basePrice || 0}</td>
                    <td className="px-6 py-4">{p.stock || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${p.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-bold p-6 border-b">Recent Orders ({orders.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.slice(0, 10).map((o) => (
                  <tr key={o._id}>
                    <td className="px-6 py-4">{o.orderNumber || o._id.slice(-8)}</td>
                    <td className="px-6 py-4">{o.user?.name || o.shippingAddress?.firstName || 'N/A'}</td>
                    <td className="px-6 py-4">€{o.totalAmount?.toFixed(2) || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${o.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(o.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-bold p-6 border-b">All Users ({users.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{u.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        disabled={u._id === user.id}
                        className="px-2 py-1 border rounded"
                      >
                        <option value="user">User</option>
                        <option value="superadmin">Super Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs ${u.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {u.isBlocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleBlockUser(u._id, u.isBlocked)}
                        disabled={u._id === user.id}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
                      >
                        {u.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        disabled={u._id === user.id}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
