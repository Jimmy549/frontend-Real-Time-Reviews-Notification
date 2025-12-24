import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewsAPI } from '../../api/reviews';
import socketService from '../../services/socketService';
import { useAuth } from '../../context/AuthContext';

const NotificationBell = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    fetchNotifications();
    
    // Connect to socket for real-time notifications
    socketService.connect();

    // Listen for all real-time events
    const handleNewReview = (data) => {
      addNotification({
        _id: Date.now().toString(),
        type: 'review',
        message: `${data.userId?.username || 'Someone'} added a new review`,
        productId: data.productId,
        reviewId: data._id,
        isRead: false,
        createdAt: new Date().toISOString(),
        data
      });
    };

    const handleNewReply = (data) => {
      addNotification({
        _id: Date.now().toString(),
        type: 'reply',
        message: `${data.userId?.username || 'Someone'} replied to a review`,
        productId: data.productId,
        reviewId: data.reviewId,
        replyId: data._id,
        isRead: false,
        createdAt: new Date().toISOString(),
        data
      });
    };

    const handleReviewLiked = (data) => {
      addNotification({
        _id: Date.now().toString(),
        type: 'like',
        message: `${data.userId?.username || 'Someone'} liked a review`,
        productId: data.productId,
        reviewId: data.reviewId,
        isRead: false,
        createdAt: new Date().toISOString(),
        data
      });
    };

    const handleAdminAction = (data) => {
      addNotification({
        _id: Date.now().toString(),
        type: 'admin',
        message: data.message || 'Admin action performed',
        isRead: false,
        createdAt: new Date().toISOString(),
        data
      });
    };

    socketService.on('new_review', handleNewReview);
    socketService.on('new_reply', handleNewReply);
    socketService.on('review_liked', handleReviewLiked);
    socketService.on('admin_action', handleAdminAction);

    return () => {
      socketService.off('new_review', handleNewReview);
      socketService.off('new_reply', handleNewReply);
      socketService.off('review_liked', handleReviewLiked);
      socketService.off('admin_action', handleAdminAction);
    };
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      const response = await reviewsAPI.getNotifications();
      if (response && response.data) {
        setNotifications(response.data);
        setUnreadCount(response.data.filter(n => !n.isRead).length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Set empty state if API fails
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => {
      // Prevent duplicates
      const exists = prev.find(n => n._id === notification._id);
      if (exists) return prev;
      
      return [notification, ...prev.slice(0, 19)]; // Keep only 20 notifications
    });
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = async (notificationId) => {
    try {
      // Optimistically update UI
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      // Try to update on server (may fail if notification is local)
      await reviewsAPI.markAsRead(notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // UI already updated optimistically, so we don't revert
    }
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    
    // Navigate to relevant page based on notification type
    if (notification.productId) {
      navigate(`/product/${notification.productId}`);
    } else if (notification.type === 'admin') {
      // Navigate to admin dashboard or relevant page
      navigate('/profile');
    }
    
    // Close dropdown
    setShowDropdown(false);
  };

  const markAllAsRead = async () => {
    try {
      // Optimistically update UI
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      
      // Try to update on server
      await reviewsAPI.markAllAsRead();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'review': return '⭐';
      case 'reply': return '💬';
      case 'like': return '👍';
      case 'admin': return '⚠️';
      default: return '🔔';
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.slice(0, 10).map((notification, index) => (
                <div
                  key={notification._id || index}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm text-gray-800 ${
                        !notification.isRead ? 'font-medium' : ''
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.createdAt 
                          ? new Date(notification.createdAt).toLocaleString()
                          : 'Just now'
                        }
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 10 && (
            <div className="p-4 text-center border-t border-gray-200">
              <button 
                onClick={() => {
                  setShowDropdown(false);
                  navigate('/notifications');
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;