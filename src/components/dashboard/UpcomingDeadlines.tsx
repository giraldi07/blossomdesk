import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

// Mock deadlines data
const mockDeadlines = [
  {
    id: 1,
    title: 'Homepage Design Review',
    project: 'Website Redesign',
    client: 'TechGrowth',
    date: '2025-04-15T14:00:00',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Content Delivery',
    project: 'Blog Campaign',
    client: 'Organica Foods',
    date: '2025-04-16T10:00:00',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Social Media Graphics',
    project: 'Summer Campaign',
    client: 'Fashion Forward',
    date: '2025-04-17T16:30:00',
    status: 'at_risk',
  },
  {
    id: 4,
    title: 'Campaign Analysis Report',
    project: 'Q1 Marketing Analysis',
    client: 'FinTech Solutions',
    date: '2025-04-18T09:00:00',
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Video Editing',
    project: 'Product Launch',
    client: 'SportsFit',
    date: '2025-04-14T12:00:00',
    status: 'overdue',
  },
];

const UpcomingDeadlines = () => {
  const [deadlines] = useState(mockDeadlines);

  // Format date to display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format time to display
  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('en-US', options);
  };

  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'at_risk':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  // Get day difference from today
  const getDayDifference = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(dateString);
    targetDate.setHours(0, 0, 0, 0);
    
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Tomorrow';
    } else {
      return `In ${diffDays} days`;
    }
  };

  return (
    <div className="space-y-3">
      {deadlines.map((deadline) => (
        <div 
          key={deadline.id}
          className="p-3 border border-border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium">{deadline.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(deadline.status)}`}>
              {deadline.status === 'upcoming' ? 'Upcoming' : 
               deadline.status === 'at_risk' ? 'At Risk' : 'Overdue'}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {deadline.project} • {deadline.client}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(deadline.date)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{formatTime(deadline.date)}</span>
            </div>
            
            <span>{getDayDifference(deadline.date)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingDeadlines;