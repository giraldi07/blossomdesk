import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, FolderClosed, BarChart3, 
  MessageSquare, Settings, FileText, User, LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';

type SidebarProps = {
  isOpen: boolean;
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/projects', label: 'Projects', icon: <FileText size={20} /> },
    { path: '/clients', label: 'Clients', icon: <Users size={20} /> },
    { path: '/files', label: 'Files', icon: <FolderClosed size={20} /> },
    { path: '/reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare size={20} /> },
  ];

  const accountItems = [
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={`
      fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-border
      transition-all duration-300 ease-in-out
      ${isOpen ? 'w-64' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}
      shadow-sm md:relative
      flex flex-col
    `}>
      {/* Header */}
      <div className={`h-16 flex items-center px-4 border-b border-border ${isOpen ? 'justify-start' : 'justify-center'}`}>
        <Logo compact={!isOpen} />
      </div>

      {/* Navigation - Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Scrollable area - only on mobile */}
        <div className="md:overflow-y-visible overflow-y-auto scrollbar-hide flex-1">
          <nav className="px-3 space-y-1 py-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''} ${isOpen ? '' : 'justify-center'}`}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Account Section */}
          <div className="mt-auto pt-4 border-t border-border">
            <h3 className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${isOpen ? 'block' : 'sr-only'}`}>
              Account
            </h3>
            <nav className="mt-2 px-3 space-y-1 pb-2">
              {accountItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${isActive(item.path) ? 'active' : ''} ${isOpen ? '' : 'justify-center'}`}
                >
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                </Link>
              ))}
              
              <button
                onClick={logout}
                className={`nav-link w-full text-left ${isOpen ? '' : 'justify-center'}`}
              >
                <LogOut size={20} />
                {isOpen && <span>Logout</span>}
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* User Profile - Fixed at bottom */}
      {isOpen && user && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center">
            <div className="avatar">
              <img 
                src={user.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;