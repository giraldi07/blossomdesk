import { useParams } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { Calendar, Clock, FileText, MessageSquare, MoreHorizontal, PlusCircle, Users } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const { getProject } = useProjects();
  const project = getProject(id || '');

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400">The project you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const progress = Math.round((project.completedTasks / project.totalTasks) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{project.description}</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusCircle size={18} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Project Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                project.status === 'active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100' :
                project.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100' :
                project.status === 'overdue' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100'
              }`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Client</span>
              <span className="font-medium">{project.client}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Start Date</span>
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-gray-400" />
                <span>{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Deadline</span>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-gray-400" />
                <span>{new Date(project.deadline).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    progress === 100 ? 'bg-green-500' : 'bg-primary'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Team Members</h3>
            <button className="text-primary text-sm hover:underline">Add Member</button>
          </div>
          <div className="space-y-4">
            {project.team.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <FileText size={18} />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Add Files</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Upload project files</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="p-2 rounded-md bg-secondary/10 text-secondary">
                <MessageSquare size={18} />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Send Message</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Contact team or client</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="p-2 rounded-md bg-accent/10 text-accent">
                <Users size={18} />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Schedule Meeting</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Set up team discussion</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;