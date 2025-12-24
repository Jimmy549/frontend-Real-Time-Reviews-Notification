import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect() {
    if (!this.socket) {
      const socketUrl = import.meta.env.VITE_API_URL || 'https://tea-ecommerce-backend.onrender.com';
      this.socket = io(socketUrl, {
        transports: ['websocket'],
        withCredentials: true,
      });

      this.socket.on('connect', () => {
        console.log('Connected to server');
        // Register user if we have user data
        const user = JSON.parse(localStorage.getItem('reviews_user') || 'null');
        if (user && user._id) {
          this.registerUser(user._id);
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      // Listen for real-time events
      this.socket.on('new_review', (data) => {
        this.emit('new_review', data);
      });

      this.socket.on('new_reply', (data) => {
        this.emit('new_reply', data);
      });

      this.socket.on('review_liked', (data) => {
        this.emit('review_liked', data);
      });

      this.socket.on('admin_action', (data) => {
        this.emit('admin_action', data);
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Event listener management
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  registerUser(userId) {
    if (this.socket) {
      this.socket.emit('register_user', userId);
    }
  }
}

export default new SocketService();