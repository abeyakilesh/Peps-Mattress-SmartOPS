import React, { useState, useContext, useRef, useEffect } from 'react';
import { Bell, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import type { Notification } from '../types';

const NotificationBell: React.FC = () => {
  const { notifications } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.length;

  const iconMap = {
    alert: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="relative text-gray-800 hover:text-black focus:outline-none">
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-20">
          <div className="p-3 font-semibold text-sm text-gray-900 border-b">Notifications</div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif: Notification) => (
                <div key={notif.id} className="flex items-start p-3 hover:bg-gray-50">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {iconMap[notif.type]}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900">{notif.message}</p>
                    <p className="text-xs text-gray-700 mt-1">{notif.timestamp}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-sm text-gray-700">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;