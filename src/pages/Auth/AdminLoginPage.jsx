import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { login as loginApi } from '../../api/auth';
import Logo from '../../assets/Logo';
import { setStorageItem, STORAGE_KEYS, clearStorage } from '../../utils/storage';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Clear any existing auth data
    clearStorage();

    try {
      // Only allow superadmin email
      if (formData.email !== 'superadmin@tea.com') {
        setError('Access denied. Only superadmin can login here.');
        setLoading(false);
        return;
      }

      const response = await loginApi(formData);
      const { user, accessToken, refreshToken } = response.data;

      // Double check role
      if (user.role !== 'superadmin') {
        setError('Access denied. Superadmin role required.');
        setLoading(false);
        return;
      }

      // Store tokens in localStorage directly (for refresh token)
      localStorage.setItem('refreshToken', refreshToken);

      login(user, accessToken);

      // Small delay to ensure state updates
      setTimeout(() => {
        navigate('/superadmin');
      }, 100);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Invalid credentials';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Super Admin</h2>
          <p className="text-gray-400 mt-2">Dashboard Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
