import { useEffect } from 'react';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-72">
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-xl">
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <div className="flex-1" />
            <button 
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <X size={20} />
            </button>
          </div>
          <Sidebar isOpen={true} />
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;