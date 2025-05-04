import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, X, Globe, Moon, Sun, Palette, 
  Bell, Clock, Database, Users, Key, Mail
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'data' | 'team' | 'integrations'>('general');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Configure your application preferences</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              <button 
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'general' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Globe size={18} />
                <span>General</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('appearance')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'appearance' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Palette size={18} />
                <span>Appearance</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('data')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'data' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Database size={18} />
                <span>Data</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('team')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'team' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Users size={18} />
                <span>Team</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('integrations')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'integrations' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Key size={18} />
                <span>Integrations</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">General Settings</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Configure basic application preferences</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="form-select w-full md:w-64"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="form-select w-full md:w-64"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="CET">Central European Time (CET)</option>
                    <option value="JST">Japan Standard Time (JST)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Preferences</label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="marketing-emails"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="marketing-emails" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Receive marketing emails
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="product-updates"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="product-updates" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Receive product updates
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="security-alerts"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked
                      />
                      <label htmlFor="security-alerts" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Receive security alerts
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-border bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button className="btn-primary px-4 py-2">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">Appearance</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Customize the look and feel of the application</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setTheme('light')}
                      className={`border rounded-lg p-4 text-center ${theme === 'light' ? 'border-primary ring-2 ring-primary/50' : 'border-border hover:border-gray-300'}`}
                    >
                      <div className="bg-gray-100 p-3 rounded-md mb-3 flex justify-center">
                        <Sun size={24} className="text-yellow-500" />
                      </div>
                      <span className="font-medium">Light</span>
                    </button>
                    
                    <button 
                      onClick={() => setTheme('dark')}
                      className={`border rounded-lg p-4 text-center ${theme === 'dark' ? 'border-primary ring-2 ring-primary/50' : 'border-border hover:border-gray-300'}`}
                    >
                      <div className="bg-gray-800 p-3 rounded-md mb-3 flex justify-center">
                        <Moon size={24} className="text-blue-400" />
                      </div>
                      <span className="font-medium">Dark</span>
                    </button>
                    
                    <button 
                      onClick={() => setTheme('system')}
                      className={`border rounded-lg p-4 text-center ${theme === 'system' ? 'border-primary ring-2 ring-primary/50' : 'border-border hover:border-gray-300'}`}
                    >
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-3 flex justify-center">
                        <div className="relative h-6 w-12">
                          <div className="absolute left-0 top-0 h-full w-1/2 bg-gray-800 rounded-l-md"></div>
                          <div className="absolute right-0 top-0 h-full w-1/2 bg-gray-100 rounded-r-md"></div>
                        </div>
                      </div>
                      <span className="font-medium">System</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Accent Color</label>
                  <div className="flex flex-wrap gap-2">
                    {['primary', 'blue', 'green', 'red', 'yellow', 'purple', 'pink'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full bg-${color}-500`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      ></button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size</label>
                  <select className="form-select w-full md:w-64">
                    <option>Small</option>
                    <option selected>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Density</label>
                  <select className="form-select w-full md:w-64">
                    <option>Compact</option>
                    <option selected>Normal</option>
                    <option>Spacious</option>
                  </select>
                </div>
              </div>
              
              <div className="p-4 border-t border-border bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button className="btn-primary px-4 py-2">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">Notifications</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Configure how you receive notifications</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Project Updates</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive notifications about project activities
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Messages</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Weekly Reports</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive weekly summary reports
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Push Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Important Alerts</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Receive critical alerts on your device
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Reminders</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Get reminders for upcoming tasks
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-border bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button className="btn-primary px-4 py-2">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">Data Management</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your application data</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Export Data</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Export your data to a JSON or CSV file for backup or transfer to another service.
                  </p>
                  <button className="btn-secondary px-4 py-2 flex items-center gap-2">
                    <Database size={16} />
                    <span>Export Data</span>
                  </button>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Import Data</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Import data from a previously exported JSON or CSV file.
                  </p>
                  <button className="btn-secondary px-4 py-2 flex items-center gap-2">
                    <Database size={16} />
                    <span>Import Data</span>
                  </button>
                </div>
                
                <div className="border border-red-200 dark:border-red-900/50 rounded-lg p-4 bg-red-50 dark:bg-red-900/10">
                  <h3 className="font-medium mb-3 text-red-700 dark:text-red-300">Delete Account</h3>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="btn-destructive px-4 py-2">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'team' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">Team Management</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your team members and permissions</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search team members..."
                      className="form-input pl-9 w-full"
                    />
                  </div>
                  
                  <button className="btn-primary px-4 py-2 flex items-center gap-2 self-start md:self-auto">
                    <Plus size={16} />
                    <span>Invite Member</span>
                  </button>
                </div>
                
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase">
                        <th className="px-6 py-3 text-left font-medium">Member</th>
                        <th className="px-6 py-3 text-left font-medium">Role</th>
                        <th className="px-6 py-3 text-left font-medium">Last Active</th>
                        <th className="px-6 py-3 text-left font-medium">Status</th>
                        <th className="px-6 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="avatar-sm">
                              <img 
                                src="https://randomuser.me/api/portraits/men/32.jpg" 
                                alt="John Doe"
                                className="rounded-full h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">John Doe</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100 text-xs font-medium">
                            Admin
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          2 hours ago
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100 text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="avatar-sm">
                              <img 
                                src="https://randomuser.me/api/portraits/women/44.jpg" 
                                alt="Jane Smith"
                                className="rounded-full h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">Jane Smith</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">jane.smith@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-100 text-xs font-medium">
                            Editor
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          1 day ago
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100 text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="avatar-sm">
                              <img 
                                src="https://randomuser.me/api/portraits/men/67.jpg" 
                                alt="Mike Johnson"
                                className="rounded-full h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">Mike Johnson</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">mike.johnson@example.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100 text-xs font-medium">
                            Viewer
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          3 days ago
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 text-xs font-medium">
                            Pending
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <MoreHorizontal size={18} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'integrations' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">Integrations</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Connect with third-party services</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                        <Mail size={18} className="text-gray-500" />
                      </div>
                      <h3 className="font-medium">Email Service</h3>
                    </div>
                    <button className="btn-secondary px-3 py-1.5 text-sm">
                      Configure
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect your email service to send notifications and updates
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                        <Database size={18} className="text-gray-500" />
                      </div>
                      <h3 className="font-medium">Database</h3>
                    </div>
                    <button className="btn-secondary px-3 py-1.5 text-sm">
                      Configure
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect to your external database for data synchronization
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                        <Users size={18} className="text-gray-500" />
                      </div>
                      <h3 className="font-medium">CRM</h3>
                    </div>
                    <button className="btn-primary px-3 py-1.5 text-sm">
                      Connect
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Integrate with your CRM to sync customer data
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                        <Clock size={18} className="text-gray-500" />
                      </div>
                      <h3 className="font-medium">Calendar</h3>
                    </div>
                    <button className="btn-primary px-3 py-1.5 text-sm">
                      Connect
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sync with your calendar to manage schedules and events
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;