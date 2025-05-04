import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, ChevronDown, Clock, Filter, MoreHorizontal, 
  Plus, Search, Users, X
} from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';

const Projects = () => {
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('updated');

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? project.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'client':
        return a.client.localeCompare(b.client);
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'updated':
      default:
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'overdue': return 'bg-red-500';
      case 'on hold': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100';
      case 'on hold': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get progress percentage
  const getProgressPercentage = (completedTasks: number, totalTasks: number) => {
    if (totalTasks === 0) return 0;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and track all your client projects</p>
        </div>
        
        <button className="btn-primary flex items-center gap-2 self-start">
          <Plus size={18} />
          <span>New Project</span>
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-9 w-full"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 py-2 flex items-center gap-2 text-sm border border-border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Filter size={16} />
                <span>Filters</span>
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="relative">
                <button className="px-3 py-2 flex items-center gap-2 text-sm border border-border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                  <span>Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
                  <ChevronDown size={16} />
                </button>
                {/* Sort dropdown would go here */}
              </div>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setStatusFilter(null)}
                  className={`px-3 py-1.5 text-sm rounded-md ${!statusFilter ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1.5 text-sm rounded-md ${statusFilter === 'active' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Active
                </button>
                <button 
                  onClick={() => setStatusFilter('completed')}
                  className={`px-3 py-1.5 text-sm rounded-md ${statusFilter === 'completed' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Completed
                </button>
                <button 
                  onClick={() => setStatusFilter('on hold')}
                  className={`px-3 py-1.5 text-sm rounded-md ${statusFilter === 'on hold' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  On Hold
                </button>
                <button 
                  onClick={() => setStatusFilter('overdue')}
                  className={`px-3 py-1.5 text-sm rounded-md ${statusFilter === 'overdue' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Overdue
                </button>
              </div>
              
              {statusFilter && (
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">Active filter:</span>
                  <span className={`px-2 py-0.5 rounded-full ${getStatusBadgeColor(statusFilter)}`}>
                    {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  </span>
                  <button 
                    onClick={() => setStatusFilter(null)}
                    className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase">
                <th className="px-6 py-3 text-left font-medium">Project</th>
                <th className="px-6 py-3 text-left font-medium">Client</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Progress</th>
                <th className="px-6 py-3 text-left font-medium">Deadline</th>
                <th className="px-6 py-3 text-left font-medium">Team</th>
                <th className="px-6 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedProjects.map((project) => {
                const progress = getProgressPercentage(project.completedTasks, project.totalTasks);
                
                return (
                  <tr 
                    key={project.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group text-sm"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)} mr-3`}></div>
                        <Link to={`/projects/${project.id}`} className="font-medium text-gray-800 dark:text-gray-200 hover:text-primary">
                          {project.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {project.client}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              progress === 100 ? 'bg-green-500' : 'bg-primary'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{formatDate(project.deadline)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => (
                          <div key={index} className="avatar-sm border-2 border-white dark:border-gray-900 rounded-full overflow-hidden">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="avatar-sm flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium border-2 border-white dark:border-gray-900 rounded-full">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <p className="font-medium mb-1">No projects found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredProjects.length}</span> of <span className="font-medium text-gray-700 dark:text-gray-300">{projects.length}</span> projects
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-border rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-border rounded hover:bg-gray-50 dark:hover:bg-gray-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;