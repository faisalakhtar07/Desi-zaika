// Register service worker for PWA
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        '/serviceWorker.js',
        {
          scope: '/',
        }
      )
      console.log('✅ Service Worker registered successfully:', registration)
      return registration
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error)
    }
  } else {
    console.warn('⚠️ Service Workers are not supported in this browser')
  }
}

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

// Send notification
export const sendNotification = (title, options = {}) => {
  if ('serviceWorker' in navigator && Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, {
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        ...options,
      })
    })
  }
}

// Check if app is installed
export const isAppInstalled = async () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }
  
  if (navigator.standalone === true) {
    return true
  }
  
  return false
}

// Listen for install prompt
export const setupInstallPrompt = (callback) => {
  let deferredPrompt

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    callback(deferredPrompt)
  })

  return deferredPrompt
}

// Handle install button click
export const handleInstallClick = (deferredPrompt) => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('✅ User installed the app')
      } else {
        console.log('❌ User dismissed the install prompt')
      }
    })
  }
}
