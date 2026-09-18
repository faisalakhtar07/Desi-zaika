import { useEffect } from 'react'

export default function NotificationHandler() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then((registration) => {
          console.log('✅ Notification handler ready')
          requestNotificationPermission(registration)
        })
        .catch((err) => console.error('❌ SW error:', err))
    }
  }, [])

  const requestNotificationPermission = async (registration) => {
    if (Notification.permission === 'granted') {
      console.log('✅ Notifications already enabled')
      return
    }

    if (Notification.permission !== 'denied') {
      try {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          console.log('✅ Notification permission granted')
        }
      } catch (error) {
        console.error('❌ Permission error:', error)
      }
    }
  }

  return null
}
