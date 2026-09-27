import io from 'socket.io-client';

let socket = null;

export const initializeSocket = (serverUrl) => {
  if (socket) return socket;

  socket = io(serverUrl || 'http://localhost:5000', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling']
  });

  socket.on('connect', () => {
    console.log('✅ Connected to server');
  });

  socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Connection error:', error);
  });

  return socket;
};

export const getSocket = () => socket;

// User events
export const joinAsUser = (userId) => {
  if (socket) {
    socket.emit('join', userId);
    console.log(`👤 User ${userId} joined socket`);
  }
};

export const joinAsAdmin = () => {
  if (socket) {
    socket.emit('admin-join');
    console.log('👨‍💼 Admin joined socket');
  }
};

// Listen to notifications
export const onNotificationReceived = (callback) => {
  if (socket) {
    socket.on('notification-received', callback);
  }
};

export const onNewOrder = (callback) => {
  if (socket) {
    socket.on('new-order', callback);
  }
};

export const onOrderStatusChanged = (callback) => {
  if (socket) {
    socket.on('order-status-changed', callback);
  }
};

export const onAdminNotification = (callback) => {
  if (socket) {
    socket.on('admin-notification', callback);
  }
};

// Emit events
export const sendNotification = (userId, type, message) => {
  if (socket) {
    socket.emit('notification', {
      userId,
      type,
      message
    });
  }
};

export const broadcastOrderPlaced = (orderData) => {
  if (socket) {
    socket.emit('order-placed', orderData);
  }
};

export const broadcastOrderStatusUpdate = (orderId, status) => {
  if (socket) {
    socket.emit('order-status-update', {
      orderId,
      status
    });
  }
};

// Disconnect
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('🔌 Socket disconnected');
  }
};
