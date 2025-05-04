import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ChevronDown, Filter, MoreHorizontal, Plus, Search, X } from 'lucide-react';

// Mock client data
const mockClients = [
  {
    id: '1',
    name: 'TechGrowth',
    industry: 'Technology',
    projects: 3,
    activeProjects: 2,
    status: 'active',
    contactPerson: 'John Smith',
    email: 'john@techgrowth.com',
    logo: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Fashion Forward',
    industry: 'Fashion',
    projects: 2,
    activeProjects: 1,
    status: 'active',
    contactPerson: 'Emma Davis',
    email: 'emma@fashionforward.com',
    logo: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Eco Solutions',
    industry: 'Environmental',
    projects: 1,
    activeProjects: 0,
    status: 'inactive',
    contactPerson: 'Michael Green',
    email: 'michael@ecosolutions.com',
    logo: 'https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'SportsFit',
    industry: 'Sports',
    projects: 2,
    activeProjects: 1,
    status: 'active',
    contactPerson: 'Sarah Johnson',
    email: 'sarah@sportsfit.com',
    logo: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    name: 'Organica Foods',
    industry: 'Food & Beverage',
    projects: 1,
    activeProjects: 1,
    status: 'active',
    contactPerson: 'David Wilson',
    email: 'david@organica.com',
    logo: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Clients = () => {
  const [clients] = useState(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? client.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your client relationships</p>
        </div>
        
        <button className="btn-primary flex items-center gap-2 self-start">
          <Plus size={18} />
          <span>Add New Client</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
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
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 flex items-center gap-2 text-sm border border-border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Filter size={16} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
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
                  onClick={() => setStatusFilter('inactive')}
                  className={`px-3 py-1.5 text-sm rounded-md ${statusFilter === 'inactive' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Inactive
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredClients.map((client) => (
            <Link
              key={client.id}
              to={`/clients/${client.id}`}
              className="group relative bg-white dark:bg-gray-900 border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="absolute top-4 right-4 z-10">
                <button className="p-1 rounded-full bg-white/80 dark:bg-gray-900/80 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <MoreHorizontal size={18} />
                </button>
              </div>
              
              <div className="h-32 bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                <img 
                  src={client.logo} 
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100' 
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                  }`}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{client.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{client.industry}</p>
                  </div>
                  <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                    <Building2 size={18} className="text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Contact Person</span>
                    <span className="font-medium">{client.contactPerson}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Active Projects</span>
                    <span className="font-medium">{client.activeProjects} of {client.projects}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <a href={`mailto:${client.email}`} className="hover:text-primary">{client.email}</a>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          {filteredClients.length === 0 && (
            <div className="col-span-full p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                  <Search size={24} className="text-gray-400" />
                </div>
                <p className="font-medium mb-1">No clients found</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;