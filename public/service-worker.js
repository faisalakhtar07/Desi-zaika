// service-worker.js - Place in public/ folder

const CACHE_NAME = 'desi-zaika-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo-192.png',
  '/badge-72.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('[Service Worker] Cache error:', err))
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Network first, then cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Return cached version if fetch fails
        return caches.match(event.request)
          .then(response => {
            return response || new Response('Offline - Page not available');
          });
      })
  );
});

// ✅ HANDLE PUSH NOTIFICATIONS
self.addEventListener('push', event => {
  console.log('[Service Worker] Push received:', event);

  if (!event.data) {
    console.log('[Service Worker] Push event but no data');
    return;
  }

  let notificationData = {};
  
  try {
    notificationData = event.data.json();
  } catch (e) {
    notificationData = {
      title: 'Desi Zaika',
      body: event.data.text()
    };
  }

  const options = {
    body: notificationData.body || 'New notification from Desi Zaika',
    icon: notificationData.icon || '/logo-192.png',
    badge: notificationData.badge || '/badge-72.png',
    tag: notificationData.tag || 'desi-zaika',
    requireInteraction: notificationData.requireInteraction || false,
    vibrate: notificationData.vibrate || [100, 50, 100],
    data: notificationData.data || {}
  };

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || 'Desi Zaika',
      options
    )
  );
});

// ✅ HANDLE NOTIFICATION CLICK
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification clicked:', event.notification.tag);

  event.notification.close();

  // Open app when notification is clicked
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        // Check if app window already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // If not open, open new window
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

// ✅ HANDLE NOTIFICATION CLOSE
self.addEventListener('notificationclose', event => {
  console.log('[Service Worker] Notification closed:', event.notification.tag);
});

console.log('[Service Worker] Loaded successfully');
