import { CheckCircle, File, MessageSquare, User, Users } from 'lucide-react';
import { useState } from 'react';

// Activity types
const ACTIVITY_TYPES = {
  COMMENT: 'comment',
  TASK_COMPLETED: 'task_completed',
  FILE_UPLOAD: 'file_upload',
  PROJECT_CREATED: 'project_created',
  USER_JOINED: 'user_joined',
};

// Mock activity data
const mockActivities = [
  {
    id: 1,
    type: ACTIVITY_TYPES.COMMENT,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    project: 'Website Redesign',
    content: 'Left a comment on the homepage mockup',
    timestamp: '10 minutes ago',
  },
  {
    id: 2,
    type: ACTIVITY_TYPES.TASK_COMPLETED,
    user: {
      name: 'James Wilson',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    project: 'Social Media Campaign',
    content: 'Completed "Design Instagram Templates" task',
    timestamp: '32 minutes ago',
  },
  {
    id: 3,
    type: ACTIVITY_TYPES.FILE_UPLOAD,
    user: {
      name: 'Emma Davis',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    project: 'Product Launch',
    content: 'Uploaded 3 new files to "Marketing Materials"',
    timestamp: '1 hour ago',
  },
  {
    id: 4,
    type: ACTIVITY_TYPES.PROJECT_CREATED,
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    project: 'SEO Optimization',
    content: 'Created a new project',
    timestamp: '3 hours ago',
  },
  {
    id: 5,
    type: ACTIVITY_TYPES.USER_JOINED,
    user: {
      name: 'Olivia Garcia',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    project: 'Brand Guidelines',
    content: 'Joined the project as a designer',
    timestamp: '5 hours ago',
  },
];

const ActivityFeed = () => {
  const [activities] = useState(mockActivities);

  // Get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case ACTIVITY_TYPES.COMMENT:
        return <MessageSquare size={16} className="text-blue-500" />;
      case ACTIVITY_TYPES.TASK_COMPLETED:
        return <CheckCircle size={16} className="text-green-500" />;
      case ACTIVITY_TYPES.FILE_UPLOAD:
        return <File size={16} className="text-purple-500" />;
      case ACTIVITY_TYPES.PROJECT_CREATED:
        return <Users size={16} className="text-orange-500" />;
      case ACTIVITY_TYPES.USER_JOINED:
        return <User size={16} className="text-teal-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide pr-2">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 py-2 animate-fadeIn">
          <div className="avatar-sm">
            <img 
              src={activity.user.avatar} 
              alt={activity.user.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{activity.user.name}</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">•</span>
              <span className="text-gray-500 dark:text-gray-400 text-xs">{activity.timestamp}</span>
            </div>
            
            <div className="mt-1 text-sm">
              <span>{activity.content}</span>
              <span className="mx-1 text-gray-500 dark:text-gray-400">in</span>
              <span className="font-medium">{activity.project}</span>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-800">
                {getActivityIcon(activity.type)}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {activity.type.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;