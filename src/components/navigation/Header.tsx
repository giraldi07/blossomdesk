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

const Header = ({ toggleSidebar, toggleMobileSidebar, isSidebarOpen }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { notifications } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-4 border-b border-border bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden rounded-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={toggleSidebar}
          className="hidden md:flex rounded-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-60 hidden md:flex items-center">
          <Search size={16} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="form-input pl-9 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
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
          className="flex items-center gap-2 rounded-full"
        >
          <div className="avatar-sm">
            <img 
              src={user?.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
              alt={user?.name || "User"}
              className="h-full w-full object-cover" 
            />
          </div>
          <span className="text-sm font-medium hidden md:inline">
            {user?.name}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;