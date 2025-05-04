import { useParams } from 'react-router-dom';
import { Building2, Calendar, ChevronRight, FileText, Mail, MapPin, Phone, PlusCircle } from 'lucide-react';

// Mock client data
const mockClient = {
  id: '1',
  name: 'TechGrowth',
  industry: 'Technology',
  description: 'Leading technology solutions provider specializing in enterprise software and digital transformation.',
  status: 'active',
  contactPerson: 'John Smith',
  email: 'john@techgrowth.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Avenue, Silicon Valley, CA 94025',
  website: 'www.techgrowth.com',
  logo: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  projects: [
    {
      id: '1',
      name: 'Website Redesign',
      status: 'active',
      progress: 65,
      deadline: '2025-04-30',
    },
    {
      id: '2',
      name: 'SEO Optimization',
      status: 'active',
      progress: 40,
      deadline: '2025-05-15',
    },
    {
      id: '3',
      name: 'Brand Guidelines',
      status: 'completed',
      progress: 100,
      deadline: '2025-03-15',
    },
  ],
  team: [
    {
      id: '101',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '102',
      name: 'Michael Chen',
      role: 'Lead Developer',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: '103',
      name: 'Emma Davis',
      role: 'Designer',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ],
};

const ClientDetails = () => {
  const { id } = useParams();
  // In a real app, we would fetch client data based on the ID
  const client = mockClient;

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Client Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400">The client you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">{client.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">{client.description}</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <PlusCircle size={18} />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Active Projects</h2>
            <div className="space-y-4">
              {client.projects.map((project) => (
                <div 
                  key={project.id}
                  className="p-4 border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        project.status === 'active' ? 'bg-blue-500' :
                        project.status === 'completed' ? 'bg-green-500' :
                        'bg-yellow-500'
                      }`}></div>
                      <h3 className="font-medium">{project.name}</h3>
                    </div>
                    <button className="text-primary hover:underline text-sm">View Details</button>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <span className="font-medium">{project.progress}% Complete</span>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        project.progress === 100 ? 'bg-green-500' : 'bg-primary'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Team Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {client.team.map((member) => (
                <div 
                  key={member.id}
                  className="p-4 border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
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
                </div>
              ))}
              
              <button className="p-4 border border-dashed border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-center gap-2 text-primary">
                <PlusCircle size={18} />
                <span>Add Team Member</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-lg overflow-hidden">
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{client.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{client.industry}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                  <Building2 size={18} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Company Details</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                      {client.website}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                  <Mail size={18} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <a href={`mailto:${client.email}`} className="hover:text-primary">
                      {client.email}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                  <Phone size={18} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <a href={`tel:${client.phone}`} className="hover:text-primary">
                      {client.phone}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                  <MapPin size={18} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{client.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <FileText size={18} />
                  </div>
                  <span className="font-medium">View Documents</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-secondary/10 text-secondary">
                    <Calendar size={18} />
                  </div>
                  <span className="font-medium">Schedule Meeting</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;