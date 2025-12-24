import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gray-900 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-900 text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user?.name || 'User'}</h1>
                <p className="text-gray-300">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-md">
                    {user?.name || 'N/A'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-md">
                    {user?.email || 'N/A'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm">
                    {user?.id || 'N/A'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-md">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-900 text-white capitalize">
                      {user?.role || 'customer'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-md">
                    <span className="text-sm font-medium text-gray-700">Account Active</span>
                    <span className="text-green-600 font-semibold">✓ Yes</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-md">
                    <span className="text-sm font-medium text-gray-700">Email Verified</span>
                    <span className="text-gray-600 font-semibold">✓ Yes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
