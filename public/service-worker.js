// Push notification listener
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.log('Push notification without data')
    return
  }

  try {
    const data = event.data.json()
    
    const options = {
      body: data.body || 'New notification',
      icon: '/logo-192-custom.svg',
      badge: '/favicon-custom.svg',
      tag: 'notification-' + Date.now(),
      requireInteraction: true,
      actions: [
        { action: 'open', title: 'Open' },
        { action: 'close', title: 'Close' }
      ],
      data: {
        url: data.url || '/',
        type: data.type || 'general'
      }
    }

    event.waitUntil(
      self.registration.showNotification(data.title || 'Desi Zaika', options)
    )
  } catch (e) {
    console.error('Error in push handler:', e)
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'close') {
    return
  }

  const urlToOpen = event.notification.data.url || '/'

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i]
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen)
      }
    })
  )
})

// Notification close handler
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event.notification.tag)
})

// Cache strategy for offline
const CACHE_NAME = 'desi-zaika-v1'
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon-custom.svg',
  '/logo-192-custom.svg'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => caches.match('/index.html'))
  )
})
