import { useEffect, useState } from 'react'
import { Bell, BellOff } from 'lucide-react'

export default function NotificationHandler() {
  const [permission, setPermission] = useState(Notification.permission)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('✅ Service Worker registered:', reg);
          checkSubscription();
        })
        .catch(err => {
          console.error('❌ Service Worker registration failed:', err);
        });
    } else {
      console.warn('Service Workers not supported');
    }

    // Check if notifications are already enabled
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      if (Notification.permission === 'granted') {
        setShowPrompt(false);
      }
    }
  };

  const checkSubscription = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      setLoading(true);

      // Request permission
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        await subscribeToNotifications();
        setShowPrompt(false);
      }
    } catch (err) {
      console.error('Error requesting permission:', err);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToNotifications = async () => {
    try {
      setLoading(true);

      // Get VAPID public key
      const keyRes = await fetch('https://desi-zaika-backend.onrender.com/api/notifications/vapid-public-key');
      const { publicKey } = await keyRes.json();

      // Get service worker
      const registration = await navigator.serviceWorker.ready;

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      });

      // Send subscription to backend
      const token = localStorage.getItem('token');
      const res = await fetch('https://desi-zaika-backend.onrender.com/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subscription })
      });

      const data = await res.json();

      if (data.success) {
        setIsSubscribed(true);
        console.log('✅ Subscribed to push notifications');
        // Show success message
        new Notification('Desi Zaika', {
          body: 'Push notifications enabled! You\'ll get updates about orders, offers, and more.',
          icon: '/logo-192.png'
        });
      }
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeFromNotifications = async () => {
    try {
      setLoading(true);

      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        // Unsubscribe from push manager
        await subscription.unsubscribe();

        // Notify backend
        const token = localStorage.getItem('token');
        await fetch('https://desi-zaika-backend.onrender.com/api/notifications/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ endpoint: subscription.endpoint })
        });

        setIsSubscribed(false);
        console.log('✅ Unsubscribed from push notifications');
      }
    } catch (err) {
      console.error('Unsubscribe error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Convert VAPID key from base64 to Uint8Array
  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  // Don't show if user not logged in
  const user = localStorage.getItem('user');
  if (!user) return null;

  return (
    <>
      {/* Notification Button - Show if notifications not enabled */}
      {permission !== 'granted' && !showPrompt && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowPrompt(true)}
            className="bg-[#2e0003] text-white rounded-full p-4 shadow-lg hover:bg-[#4a0a10] transition flex items-center gap-2"
            title="Enable notifications"
          >
            <Bell size={20} />
          </button>
        </div>
      )}

      {/* Notification Permission Prompt */}
      {showPrompt && permission !== 'granted' && (
        <div className="fixed bottom-20 right-6 z-50 bg-white rounded-lg shadow-xl p-6 max-w-sm">
          <div className="flex items-start gap-4">
            <Bell className="text-[#2e0003] mt-1 flex-shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="font-bold text-[#2e0003] mb-2">Enable Notifications?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get updates about your orders, special offers, and new products.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={requestNotificationPermission}
                  disabled={loading}
                  className="flex-1 bg-[#2e0003] text-white py-2 rounded-lg hover:bg-[#4a0a10] transition disabled:opacity-50 text-sm font-semibold"
                >
                  {loading ? 'Enabling...' : 'Enable'}
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-semibold"
                >
                  Not Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Status - Show if subscribed */}
      {isSubscribed && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={unsubscribeFromNotifications}
            disabled={loading}
            className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition flex items-center gap-2"
            title="Notifications enabled - click to disable"
          >
            <Bell size={20} />
            {!loading && <span className="text-xs">On</span>}
          </button>
        </div>
      )}
    </>
  );
}
