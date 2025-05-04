import { ExternalLink, MessageSquare, FileText, Bell } from 'lucide-react';
import { useNotifications } from '../../context/NotificationsContext';

type NotificationsDropdownProps = {
  onClose: () => void;
};

const NotificationsDropdown = ({ onClose }: NotificationsDropdownProps) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  
  // Close when clicking outside
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={16} className="text-primary" />;
      case 'project':
        return <FileText size={16} className="text-secondary" />;
      default:
        return <Bell size={16} className="text-accent" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:absolute md:inset-auto md:top-12 md:right-0"
      onClick={handleClickOutside}
    >
      <div 
        className="absolute right-0 top-16 md:top-0 max-w-sm w-full md:w-96 glass-card rounded-lg shadow-xl animate-slideIn overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Notifications</h3>
          <button 
            onClick={markAllAsRead}
            className="text-xs text-primary hover:underline"
          >
            Mark all as read
          </button>
        </div>
        
        <div className="max-h-[70vh] md:max-h-[50vh] overflow-y-auto scrollbar-hide p-2">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-3 ${!notification.read ? 'bg-primary/5 dark:bg-primary/10' : ''} rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5">
                      <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-primary"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No notifications
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-border flex justify-center">
          <button className="text-sm text-primary hover:underline flex items-center gap-1">
            View All Notifications
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDropdown;