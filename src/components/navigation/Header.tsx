import { Menu, Bell, Sun, Moon, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationsContext';
import NotificationsDropdown from '../notifications/NotificationsDropdown';
import { useState } from 'react';

type HeaderProps = {
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  isSidebarOpen: boolean;
};

const Header = ({ toggleSidebar, toggleMobileSidebar }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { notifications } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={toggleSidebar}
          className="hidden md:flex rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-60 hidden md:flex items-center">
          <Search size={16} className="absolute left-3 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="form-input pl-9 py-1.5 text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-primary-600 text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <NotificationsDropdown 
              onClose={() => setShowNotifications(false)} 
            />
          )}
        </div>

        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 transition-colors"
        >
          <div className="avatar-sm border-2 border-gray-200 dark:border-gray-600">
            <img 
              src={user?.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"} 
              alt={user?.name || "User"}
              className="h-full w-full object-cover" 
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:inline">
            {user?.name}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;