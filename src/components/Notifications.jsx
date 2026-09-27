import { useEffect, useState } from 'react';
import { useNotificationStore } from '../store/notificationStore';

export default function Notifications() {
  const { notifications, unreadCount, markAsRead, removeNotification } = useNotificationStore();
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={() => setVisible(!visible)}
        className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {visible && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-bold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-sm text-gray-500">{unreadCount} new</span>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <p>No notifications yet</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b transition cursor-pointer ${
                    notification.isRead ? 'bg-white' : 'bg-blue-50'
                  } hover:bg-gray-50`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
