import { create } from 'zustand';
import { initializeSocket, onReceiveNotification, onOrderUpdated } from '../utils/socket.js';

export const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,
  isConnected: false,

  // Add notification
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications].slice(0, 50),
      unreadCount: state.unreadCount + 1
    })),

  // Remove notification
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    })),

  // Mark as read
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1)
    })),

  // Clear all
  clearAll: () =>
    set({
      notifications: [],
      unreadCount: 0
    }),

  // Initialize Socket.IO listeners
  initializeSocket: (userId) => {
    const socket = initializeSocket(userId);

    // Listen for notifications
    onReceiveNotification((notification) => {
      set((state) => ({
        notifications: [
          {
            id: Date.now(),
            ...notification,
            isRead: false
          },
          ...state.notifications
        ].slice(0, 50),
        unreadCount: state.unreadCount + 1
      }));

      // Show browser notification if permission granted
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title || 'Notification', {
          body: notification.message,
          icon: '/icon-192x192.png'
        });
      }
    });

    // Listen for order updates
    onOrderUpdated((orderData) => {
      set((state) => ({
        notifications: [
          {
            id: Date.now(),
            title: 'Order Update',
            message: orderData.message,
            orderId: orderData.orderId,
            type: 'order',
            timestamp: new Date(),
            isRead: false
          },
          ...state.notifications
        ].slice(0, 50),
        unreadCount: state.unreadCount + 1
      }));
    });

    set({ isConnected: true });
  }
}));
