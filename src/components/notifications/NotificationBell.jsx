import React, { useState, useEffect, useRef } from 'react';
import { reviewsAPI } from '../../api/reviews';
import socketService from '../../services/socketService';

const NotificationBell = () => {
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
    fetchNotifications();
    
    // Connect to socket for real-time notifications
    socketService.connect();

    // Listen for all real-time events
    const handleNewReview = (data) => {
      addNotification({
        type: 'review',
        message: 'New review added',
        data
      });
    };

    const handleNewReply = (data) => {
      addNotification({
        type: 'reply',
        message: 'Someone replied to your review',
        data
      });
    };

    const handleReviewLiked = (data) => {
      addNotification({
        type: 'like',
        message: 'Someone liked your review',
        data
      });
    };

    const handleAdminAction = (data) => {
      addNotification({
        type: 'admin',
        message: data.message || 'Admin action performed',
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
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await reviewsAPI.getNotifications();
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  const markAsRead = async (notificationId) => {
    try {
      await reviewsAPI.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification._id) {
      markAsRead(notification._id);
    }
    // Auto-close dropdown after clicking a notification
    setTimeout(() => setShowDropdown(false), 300);
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-800"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
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
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.createdAt 
                          ? new Date(notification.createdAt).toLocaleString()
                          : 'Just now'
                        }
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 10 && (
            <div className="p-4 text-center border-t border-gray-200">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
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