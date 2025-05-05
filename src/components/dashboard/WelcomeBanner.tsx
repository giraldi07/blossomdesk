import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

type WelcomeBannerProps = {
  userName: string;
  timeOfDay: string;
};

const WelcomeBanner = ({ userName, timeOfDay }: WelcomeBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/90 to-secondary/90 p-8 shadow-lg animate-fadeIn">
      <div 
        className="absolute inset-0 bg-white/5" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
      >
        <X size={16} />
      </button>

      <div className="relative">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          Good {timeOfDay}, {userName}!
        </h1>
        <p className="mt-2 text-white/90 max-w-xl">
          Welcome to BlossomDesk. You have 5 active projects and 3 tasks due today. 
          Check your notifications for recent updates from your team and clients.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/projects">
            <button className="bg-white text-primary hover:bg-white/90 px-4 py-2 rounded-md font-medium transition-colors">
              View Projects
            </button>
          </Link>
          <button className="bg-white/20 text-white hover:bg-white/30 px-4 py-2 rounded-md font-medium transition-colors">
            Create New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;