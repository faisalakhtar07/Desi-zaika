// Service Worker Registration Utility

export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
      updateViaCache: 'none'
    });

    console.log('✅ Service Worker registered successfully');

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('📦 New service worker available - reload to update');
          // Show update notification to user
          notifyUpdate();
        }
      });
    });

    return registration;
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    return null;
  }
};

const notifyUpdate = () => {
  // Create a function that the app can call to show update notification
  const event = new CustomEvent('sw-update-available');
  window.dispatchEvent(event);
};

export const unregisterServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
    console.log('Service Worker unregistered');
  } catch (error) {
    console.error('Failed to unregister Service Worker:', error);
  }
};

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const subscribeToPushNotifications = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('Push notifications not supported');
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.VITE_VAPID_PUBLIC_KEY
    });

    console.log('✅ Push notification subscription successful');
    return subscription;
  } catch (error) {
    console.error('❌ Push subscription failed:', error);
    return null;
  }
};

export const showLocalNotification = (title, options = {}) => {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification(title, {
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      ...options
    });
  });
};

export const clearAllCaches = async () => {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    console.log('✅ All caches cleared');
  } catch (error) {
    console.error('❌ Failed to clear caches:', error);
  }
};
