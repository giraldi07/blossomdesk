import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, ChevronDown, Clock, Filter, MoreHorizontal, 
  Plus, Search, Users, X, FileText, BarChart2, Download
} from 'lucide-react';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('updated');

  // Mock data for reports
  const reports = [
    {
      id: '1',
      name: 'Monthly Sales Report',
      type: 'sales',
      date: '2023-06-15',
      generatedBy: 'John Doe',
      status: 'ready'
    },
    {
      id: '2',
      name: 'Q2 Financial Summary',
      type: 'financial',
      date: '2023-07-01',
      generatedBy: 'Jane Smith',
      status: 'ready'
    },
    {
      id: '3',
      name: 'User Activity Analysis',
      type: 'analytics',
      date: '2023-06-28',
      generatedBy: 'Mike Johnson',
      status: 'processing'
    },
  ];

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? report.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100';
      case 'processing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-gray-500 dark:text-gray-400">View and manage all generated reports</p>
        </div>
        
        <button className="btn-primary flex items-center gap-2 self-start">
          <Plus size={18} />
          <span>Generate Report</span>
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reports..."
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
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setTypeFilter(null)}
                  className={`px-3 py-1.5 text-sm rounded-md ${!typeFilter ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setTypeFilter('sales')}
                  className={`px-3 py-1.5 text-sm rounded-md ${typeFilter === 'sales' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Sales
                </button>
                <button 
                  onClick={() => setTypeFilter('financial')}
                  className={`px-3 py-1.5 text-sm rounded-md ${typeFilter === 'financial' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Financial
                </button>
                <button 
                  onClick={() => setTypeFilter('analytics')}
                  className={`px-3 py-1.5 text-sm rounded-md ${typeFilter === 'analytics' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Analytics
                </button>
              </div>
              
              {typeFilter && (
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400 mr-2">Active filter:</span>
                  <span className={`px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300`}>
                    {typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                  </span>
                  <button 
                    onClick={() => setTypeFilter(null)}
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
                <th className="px-6 py-3 text-left font-medium">Report</th>
                <th className="px-6 py-3 text-left font-medium">Type</th>
                <th className="px-6 py-3 text-left font-medium">Generated On</th>
                <th className="px-6 py-3 text-left font-medium">Generated By</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredReports.map((report) => (
                <tr 
                  key={report.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group text-sm"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText size={18} className="text-gray-400 mr-3" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {report.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 capitalize">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {formatDate(report.date)}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {report.generatedBy}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(report.status)}`}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                        disabled={report.status !== 'ready'}
                      >
                        <Download size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                        <FileText size={24} className="text-gray-400" />
                      </div>
                      <p className="font-medium mb-1">No reports found</p>
                      <p className="text-sm">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;