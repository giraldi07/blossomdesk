import React, { createContext, useState, useContext, useEffect } from 'react';

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'project' | 'system';
  read: boolean;
  time: string;
  link?: string;
};

type NotificationsContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'time'>) => void;
};

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  addNotification: () => {},
});

export const useNotifications = () => useContext(NotificationsContext);

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New message from Alex',
    message: 'I just uploaded the latest design mockups for the website project.',
    type: 'message',
    read: false,
    time: '10 minutes ago',
    link: '/messages/1',
  },
  {
    id: '2',
    title: 'Project deadline approaching',
    message: 'The Website Redesign project is due in 3 days.',
    type: 'project',
    read: false,
    time: '1 hour ago',
    link: '/projects/1',
  },
  {
    id: '3',
    title: 'Comment on task',
    message: 'Jamie left a comment on the "Homepage Design" task.',
    type: 'project',
    read: true,
    time: '3 hours ago',
    link: '/projects/1/tasks/3',
  },
  {
    id: '4',
    title: 'New client feedback',
    message: 'TechGrowth provided feedback on the latest deliverables.',
    type: 'message',
    read: true,
    time: 'Yesterday',
    link: '/clients/1/feedback',
  },
  {
    id: '5',
    title: 'System maintenance',
    message: 'BlossomDesk will undergo maintenance on Sunday at 2 AM UTC.',
    type: 'system',
    read: true,
    time: '2 days ago',
  },
];

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [unreadCount, setUnreadCount] = useState(0);

  // Update unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter(notif => !notif.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
  };

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'time'>) => {
    const now = new Date();
    const newNotification: Notification = {
      id: Date.now().toString(),
      ...notification,
      read: false,
      time: 'Just now',
    };
    
    setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
  };

  return (
    <NotificationsContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead, 
      addNotification 
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};