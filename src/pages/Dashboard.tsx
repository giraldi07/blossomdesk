import { useState } from 'react';
import { 
  BarChart3, Calendar, CheckCircle, Clock, ExternalLink, 
  FileText, MoreHorizontal, PlusCircle, Users
} from 'lucide-react';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines';
import StatsCard from '../components/dashboard/StatsCard';
import ProjectStatusChart from '../components/dashboard/ProjectStatusChart';
import ClientDistributionChart from '../components/dashboard/ClientDistributionChart';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectsContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const [timeFilter, setTimeFilter] = useState('month');

  // Calculate statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const overdueProjects = projects.filter(p => p.status === 'overdue').length;
  
  // Get recent projects
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <WelcomeBanner 
        userName={user?.name || 'User'} 
        timeOfDay={getTimeOfDay()} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Projects"
          value={totalProjects}
          icon={<FileText className="text-primary" />}
          trend={{
            value: "+12%",
            isPositive: true,
            text: "from last month"
          }}
        />
        <StatsCard 
          title="Active Projects"
          value={activeProjects}
          icon={<Clock className="text-warning" />}
          trend={{
            value: "+5%",
            isPositive: true,
            text: "from last month"
          }}
        />
        <StatsCard 
          title="Completed"
          value={completedProjects}
          icon={<CheckCircle className="text-success" />}
          trend={{
            value: "+18%",
            isPositive: true,
            text: "from last month"
          }}
        />
        <StatsCard 
          title="Total Clients"
          value={22}
          icon={<Users className="text-secondary" />}
          trend={{
            value: "+3",
            isPositive: true,
            text: "new this month"
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Project Distribution</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setTimeFilter('week')}
                  className={`px-2 py-1 text-xs rounded ${timeFilter === 'week' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setTimeFilter('month')}
                  className={`px-2 py-1 text-xs rounded ${timeFilter === 'month' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setTimeFilter('year')}
                  className={`px-2 py-1 text-xs rounded ${timeFilter === 'year' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}
                >
                  Year
                </button>
              </div>
            </div>
            
            <div className="h-64">
              <ProjectStatusChart timeFilter={timeFilter} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Client Distribution</h2>
                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div className="h-48">
                <ClientDistributionChart />
              </div>
            </div>
            
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Projects</h2>
                <button className="text-primary text-sm flex items-center gap-1 hover:underline">
                  <span>View All</span>
                  <ExternalLink size={14} />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentProjects.map(project => (
                  <div key={project.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} mr-2`}></div>
                      <div>
                        <h3 className="font-medium text-sm">{project.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{project.client}</p>
                      </div>
                    </div>
                    <div className="text-xs font-medium">
                      <span className={`px-2 py-1 rounded-full ${getStatusBadgeColor(project.status)}`}>
                        {capitalizeFirstLetter(project.status)}
                      </span>
                    </div>
                  </div>
                ))}
                
                <button className="w-full flex items-center justify-center gap-1 py-2 text-sm text-primary hover:underline">
                  <PlusCircle size={14} />
                  <span>Add New Project</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Calendar size={18} />
              </button>
            </div>
            <UpcomingDeadlines />
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-blue-500';
    case 'completed': return 'bg-green-500';
    case 'overdue': return 'bg-red-500';
    case 'on hold': return 'bg-yellow-500';
    default: return 'bg-gray-500';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
    case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    case 'on hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
  }
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default Dashboard;