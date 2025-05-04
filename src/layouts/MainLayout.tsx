import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import MobileSidebar from '../components/navigation/MobileSidebar';
import { useTheme } from '../context/ThemeContext';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { theme } = useTheme();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`flex min-h-screen bg-background ${theme}`}>
      {/* Desktop Sidebar - Fixed position */}
      <div className="hidden md:block fixed top-0 left-0 h-full z-40">
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={toggleMobileSidebar} />
      
      {/* Main Content Area */}
      <div 
        className={`flex flex-col flex-1 w-full transition-all duration-200 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-16'
        }`}
      >
        <Header 
          toggleSidebar={toggleSidebar} 
          toggleMobileSidebar={toggleMobileSidebar} 
          isSidebarOpen={isSidebarOpen}
        />
        
        <main className="flex-1 p-4 md:p-6 animate-fadeIn overflow-y-auto">
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;