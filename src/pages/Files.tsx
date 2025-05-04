import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, Filter, MoreHorizontal, 
  Plus, Search, X, File, Folder, Image, Download, Trash2
} from 'lucide-react';

const Files = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock data for files
  const files = [
    {
      id: '1',
      name: 'Project Proposal.pdf',
      type: 'pdf',
      size: '2.4 MB',
      modified: '2023-06-15',
      sharedWith: ['John Doe', 'Jane Smith']
    },
    {
      id: '2',
      name: 'Meeting Notes.docx',
      type: 'doc',
      size: '1.2 MB',
      modified: '2023-06-18',
      sharedWith: ['Mike Johnson']
    },
    {
      id: '3',
      name: 'Budget.xlsx',
      type: 'xls',
      size: '3.1 MB',
      modified: '2023-06-20',
      sharedWith: ['John Doe', 'Sarah Williams']
    },
    {
      id: '4',
      name: 'Screenshot.png',
      type: 'image',
      size: '4.5 MB',
      modified: '2023-06-22',
      sharedWith: []
    },
    {
      id: '5',
      name: 'Project Assets',
      type: 'folder',
      size: '-',
      modified: '2023-06-10',
      sharedWith: ['Team']
    },
  ];

  // Filter files
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? file.type === typeFilter : true;
    return matchesSearch && matchesType;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get file icon
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <File className="text-red-500" size={20} />;
      case 'doc': return <File className="text-blue-500" size={20} />;
      case 'xls': return <File className="text-green-500" size={20} />;
      case 'image': return <Image className="text-purple-500" size={20} />;
      case 'folder': return <Folder className="text-yellow-500" size={20} />;
      default: return <File className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and organize your files</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {viewMode === 'grid' ? (
              <span className="text-sm">List View</span>
            ) : (
              <span className="text-sm">Grid View</span>
            )}
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            <span>Upload</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search files..."
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
                  onClick={() => setTypeFilter('pdf')}
                  className={`px-3 py-1.5 text-sm rounded-md ${typeFilter === 'pdf' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  PDF
                </button>
                <button 
                  onClick={() => setTypeFilter('doc')}
                  className={`px-3 py-1.5 text-sm rounded-md ${typeFilter === 'doc' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Document
                </button>
                <button 
                  onClick={() => setTypeFilter('xls')}
                  className={`px-3 py-1.5 text-sm rounded-md ${typeFilter === 'xls' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Spreadsheet
                </button>
                <button 
                  onClick={() => setTypeFilter('image')}
                  className={`px-3 py-1.5 text-sm rounded-md ${typeFilter === 'image' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Image
                </button>
                <button 
                  onClick={() => setTypeFilter('folder')}
                  className={`px-3 py-1.5 text-sm rounded-md ${typeFilter === 'folder' ? 'bg-primary text-primary-foreground' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  Folder
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
        
        {viewMode === 'grid' ? (
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div 
                key={file.id}
                className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  {getFileIcon(file.type)}
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
                <div className="mb-1 font-medium truncate">{file.name}</div>
                <div className="text-sm text-gray-500 mb-2">{file.size}</div>
                <div className="text-xs text-gray-400">{formatDate(file.modified)}</div>
              </div>
            ))}
            
            {filteredFiles.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500 dark:text-gray-400">
                <div className="flex flex-col items-center justify-center">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                    <File size={24} className="text-gray-400" />
                  </div>
                  <p className="font-medium mb-1">No files found</p>
                  <p className="text-sm">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase">
                  <th className="px-6 py-3 text-left font-medium">Name</th>
                  <th className="px-6 py-3 text-left font-medium">Type</th>
                  <th className="px-6 py-3 text-left font-medium">Size</th>
                  <th className="px-6 py-3 text-left font-medium">Modified</th>
                  <th className="px-6 py-3 text-left font-medium">Shared With</th>
                  <th className="px-6 py-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredFiles.map((file) => (
                  <tr 
                    key={file.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group text-sm"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type)}
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 capitalize">
                      {file.type}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {file.size}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {formatDate(file.modified)}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {file.sharedWith.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {file.sharedWith.slice(0, 2).map((person, index) => (
                            <span key={index} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                              {person.split(' ')[0]}
                            </span>
                          ))}
                          {file.sharedWith.length > 2 && (
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
                              +{file.sharedWith.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400">Private</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                          <Download size={18} />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredFiles.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                          <File size={24} className="text-gray-400" />
                        </div>
                        <p className="font-medium mb-1">No files found</p>
                        <p className="text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Files;