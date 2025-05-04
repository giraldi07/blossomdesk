import React, { createContext, useState, useContext, useEffect } from 'react';

export type Project = {
  id: string;
  name: string;
  description: string;
  client: string;
  status: 'active' | 'completed' | 'on hold' | 'overdue';
  startDate: string;
  deadline: string;
  completedTasks: number;
  totalTasks: number;
  team: Array<{
    id: string;
    name: string;
    role: string;
    avatar: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

type ProjectsContextType = {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  getProject: (id: string) => Project | undefined;
};

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  loading: false,
  error: null,
  fetchProjects: async () => {},
  getProject: () => undefined,
});

export const useProjects = () => useContext(ProjectsContext);

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of the company website with new branding and improved user experience.',
    client: 'TechGrowth',
    status: 'active',
    startDate: '2025-03-01',
    deadline: '2025-04-30',
    completedTasks: 12,
    totalTasks: 25,
    team: [
      {
        id: '101',
        name: 'Alex Morgan',
        role: 'Designer',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '102',
        name: 'Jamie Chen',
        role: 'Developer',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '103',
        name: 'Taylor Swift',
        role: 'Content Writer',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    createdAt: '2025-02-25T14:22:01Z',
    updatedAt: '2025-04-05T09:15:22Z',
  },
  {
    id: '2',
    name: 'Summer Campaign',
    description: 'Develop and execute a comprehensive marketing campaign for the upcoming summer collection.',
    client: 'Fashion Forward',
    status: 'active',
    startDate: '2025-03-15',
    deadline: '2025-05-15',
    completedTasks: 8,
    totalTasks: 20,
    team: [
      {
        id: '201',
        name: 'Zoe Garcia',
        role: 'Project Manager',
        avatar: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '202',
        name: 'Ryan Thompson',
        role: 'Graphic Designer',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    createdAt: '2025-03-10T11:42:35Z',
    updatedAt: '2025-04-08T16:30:17Z',
  },
  {
    id: '3',
    name: 'Brand Guidelines',
    description: 'Create comprehensive brand guidelines including logo usage, typography, color palette, and tone of voice.',
    client: 'Eco Solutions',
    status: 'completed',
    startDate: '2025-02-01',
    deadline: '2025-03-15',
    completedTasks: 15,
    totalTasks: 15,
    team: [
      {
        id: '301',
        name: 'Emma Davis',
        role: 'Brand Strategist',
        avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '302',
        name: 'Noah Wilson',
        role: 'Graphic Designer',
        avatar: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '303',
        name: 'Olivia Martinez',
        role: 'Copywriter',
        avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '304',
        name: 'Liam Johnson',
        role: 'Marketing Director',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    createdAt: '2025-01-28T09:10:45Z',
    updatedAt: '2025-03-15T17:22:10Z',
  },
  {
    id: '4',
    name: 'Product Launch',
    description: 'Plan and execute the launch of the new product line, including marketing materials and event coordination.',
    client: 'SportsFit',
    status: 'on hold',
    startDate: '2025-02-15',
    deadline: '2025-05-01',
    completedTasks: 10,
    totalTasks: 30,
    team: [
      {
        id: '401',
        name: 'Michael Chen',
        role: 'Project Manager',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '402',
        name: 'Sophia Lee',
        role: 'Event Coordinator',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    createdAt: '2025-02-10T14:30:00Z',
    updatedAt: '2025-04-02T11:45:33Z',
  },
  {
    id: '5',
    name: 'Social Media Campaign',
    description: 'Develop and implement a social media strategy to increase brand awareness and engagement.',
    client: 'Organica Foods',
    status: 'active',
    startDate: '2025-03-20',
    deadline: '2025-06-01',
    completedTasks: 6,
    totalTasks: 18,
    team: [
      {
        id: '501',
        name: 'James Wilson',
        role: 'Social Media Manager',
        avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '502',
        name: 'Ava Thompson',
        role: 'Content Creator',
        avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '503',
        name: 'Ethan Brown',
        role: 'Graphic Designer',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    createdAt: '2025-03-15T10:20:30Z',
    updatedAt: '2025-04-07T14:50:12Z',
  },
  {
    id: '6',
    name: 'SEO Optimization',
    description: 'Improve website search engine rankings through technical SEO, content optimization, and link building.',
    client: 'TechGrowth',
    status: 'overdue',
    startDate: '2025-01-15',
    deadline: '2025-03-31',
    completedTasks: 12,
    totalTasks: 20,
    team: [
      {
        id: '601',
        name: 'Daniel Robinson',
        role: 'SEO Specialist',
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '602',
        name: 'Isabella Garcia',
        role: 'Content Strategist',
        avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    createdAt: '2025-01-10T08:15:45Z',
    updatedAt: '2025-04-01T09:30:10Z',
  },
  {
    id: '7',
    name: 'Video Series Production',
    description: 'Create a series of promotional videos showcasing product features and customer testimonials.',
    client: 'FinTech Solutions',
    status: 'active',
    startDate: '2025-03-10',
    deadline: '2025-05-20',
    completedTasks: 5,
    totalTasks: 15,
    team: [
      {
        id: '701',
        name: 'Matthew Taylor',
        role: 'Video Producer',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '702',
        name: 'Charlotte Davis',
        role: 'Videographer',
        avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: '703',
        name: 'Amelia Wilson',
        role: 'Video Editor',
        avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ],
    createdAt: '2025-03-05T15:40:20Z',
    updatedAt: '2025-04-06T13:25:45Z',
  },
];

export const ProjectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects - in a real app, this would call an API
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setProjects(mockProjects);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get a single project by ID
  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  // Fetch projects on initial load
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, fetchProjects, getProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};