import { io } from 'socket.io-client';

let socket = null;

export const initializeSocket = (userId) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling'],
    query: { userId }
  });

  socket.on('connect', () => {
    console.log('✅ Connected to server');
    socket.emit('user_join', userId);
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
  });

  socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
  });

  return socket;
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Listeners for notifications

export const onOrderUpdated = (callback) => {
  if (socket) {
    socket.on('order_updated', (data) => {
      console.log('📦 Order updated:', data);
      callback(data);
    });
  }
};

export const onAdminNewOrder = (callback) => {
  if (socket) {
    socket.on('admin_new_order', (data) => {
      console.log('🎉 New order:', data);
      callback(data);
    });
  }
};

export const onReceiveNotification = (callback) => {
  if (socket) {
    socket.on('receive_notification', (data) => {
      console.log('📢 Notification received:', data);
      callback(data);
    });
  }
};

// Emitters for notifications

export const emitNewOrder = (orderData) => {
  if (socket) {
    socket.emit('new_order', orderData);
  }
};

export const emitOrderStatusUpdate = (data) => {
  if (socket) {
    socket.emit('order_status_update', data);
  }
};

export const sendNotification = (notification) => {
  if (socket) {
    socket.emit('send_notification', notification);
  }
};
