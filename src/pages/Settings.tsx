import { useState } from 'react';
import { 
  ChevronDown, Filter, MoreHorizontal, Search, X,
  User, Lock, Bell, CreditCard, Globe, Palette, Database, Users, Key
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'billing' | 'appearance' | 'team' | 'integrations'>('general');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const teamMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      lastActive: '2 hours ago',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Editor',
      lastActive: '1 day ago',
      status: 'active',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'Viewer',
      lastActive: '3 days ago',
      status: 'pending',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  ];

  const integrations = [
    {
      id: '1',
      name: 'Email Service',
      description: 'Connect your email service to send notifications and updates',
      connected: true
    },
    {
      id: '2',
      name: 'Database',
      description: 'Connect to your external database for data synchronization',
      connected: true
    },
    {
      id: '3',
      name: 'CRM',
      description: 'Integrate with your CRM to sync customer data',
      connected: false
    },
    {
      id: '4',
      name: 'Calendar',
      description: 'Sync with your calendar to manage schedules and events',
      connected: false
    }
  ];

  // Filter team members
  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account and application preferences</p>
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
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'security' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Lock size={18} />
                <span>Security</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center gap-3 px-6 py-3 text-left ${activeTab === 'billing' ? 'bg-primary/10 text-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <CreditCard size={18} />
                <span>Billing</span>
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

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'general' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">General Settings</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Configure basic application preferences</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                    <select className="form-select w-full">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                    <select className="form-select w-full">
                      <option>UTC</option>
                      <option>GMT</option>
                      <option>EST</option>
                      <option>PST</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-3 py-1.5 border border-border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                      MM/DD/YYYY
                    </button>
                    <button className="px-3 py-1.5 border border-primary bg-primary/10 text-primary rounded-md text-sm">
                      DD/MM/YYYY
                    </button>
                    <button className="px-3 py-1.5 border border-border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 text-sm">
                      YYYY-MM-DD
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Preferences</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="marketing" className="form-checkbox h-4 w-4" defaultChecked />
                      <label htmlFor="marketing" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Receive marketing emails</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="updates" className="form-checkbox h-4 w-4" defaultChecked />
                      <label htmlFor="updates" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Receive product updates</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="security" className="form-checkbox h-4 w-4" />
                      <label htmlFor="security" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Receive security alerts</label>
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
                    <button className="border border-primary rounded-lg p-4 text-center ring-2 ring-primary/50">
                      <div className="bg-gray-100 p-3 rounded-md mb-3 flex justify-center">
                        <span className="text-lg">☀️</span>
                      </div>
                      <span className="font-medium">Light</span>
                    </button>
                    <button className="border border-border rounded-lg p-4 text-center hover:border-gray-300">
                      <div className="bg-gray-800 p-3 rounded-md mb-3 flex justify-center">
                        <span className="text-lg">🌙</span>
                      </div>
                      <span className="font-medium">Dark</span>
                    </button>
                    <button className="border border-border rounded-lg p-4 text-center hover:border-gray-300">
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
                    {['primary', 'blue', 'green', 'red', 'yellow', 'purple', 'pink'].map(color => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full bg-${color}-500`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size</label>
                    <select className="form-select w-full">
                      <option>Small</option>
                      <option selected>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Density</label>
                    <select className="form-select w-full">
                      <option>Compact</option>
                      <option selected>Normal</option>
                      <option>Spacious</option>
                    </select>
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

          {activeTab === 'security' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">Security</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your account security settings</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Password</h3>
                    <button className="btn-secondary px-3 py-1.5 text-sm">
                      Change Password
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last changed 3 months ago
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <button className="btn-primary px-3 py-1.5 text-sm">
                      Enable 2FA
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Active Sessions</h3>
                    <button className="text-primary text-sm font-medium">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full mt-0.5">
                        <Lock size={16} className="text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Logged in</h4>
                          <span className="text-xs text-gray-500">Today at 09:45 AM</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Chrome on Mac OS X</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full mt-0.5">
                        <Lock size={16} className="text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Logged in</h4>
                          <span className="text-xs text-gray-500">Yesterday at 02:30 PM</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Safari on iPhone</p>
                      </div>
                    </div>
                  </div>
                </div>
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

          {activeTab === 'billing' && (
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="font-bold text-lg">Billing</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your subscription and payment methods</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Current Plan</h3>
                    <button className="btn-secondary px-3 py-1.5 text-sm">
                      Change Plan
                    </button>
                  </div>
                  
                  <div className="bg-primary/10 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold">Professional</h4>
                      <span className="font-bold">$29/month</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Full access to all features with advanced capabilities
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Next billing date: July 15, 2023
                    </p>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Payment Methods</h3>
                    <button className="btn-primary px-3 py-1.5 text-sm flex items-center gap-1">
                      <Plus size={16} />
                      <span>Add New</span>
                    </button>
                  </div>
                  
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                          <CreditCard size={18} className="text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">Visa ending in 4242</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Expires 04/2025
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Billing History</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-border">
                          <th className="pb-2 font-medium">Date</th>
                          <th className="pb-2 font-medium">Description</th>
                          <th className="pb-2 font-medium">Amount</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="py-3 text-sm">Jun 15, 2023</td>
                          <td className="py-3 text-sm">Professional Plan</td>
                          <td className="py-3 text-sm">$29.00</td>
                          <td className="py-3 text-sm">
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100 text-xs">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 text-sm">May 15, 2023</td>
                          <td className="py-3 text-sm">Professional Plan</td>
                          <td className="py-3 text-sm">$29.00</td>
                          <td className="py-3 text-sm">
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100 text-xs">
                              Paid
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                      {filteredTeamMembers.map(member => (
                        <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="avatar-sm">
                                <img 
                                  src={member.avatar} 
                                  alt={member.name}
                                  className="rounded-full h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              member.role === 'Admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-100' :
                              member.role === 'Editor' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-100' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-100'
                            }`}>
                              {member.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            {member.lastActive}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              member.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                            }`}>
                              {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                              <MoreHorizontal size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      
                      {filteredTeamMembers.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                            <div className="flex flex-col items-center justify-center">
                              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-3">
                                <Users size={24} className="text-gray-400" />
                              </div>
                              <p className="font-medium mb-1">No team members found</p>
                              <p className="text-sm">Try adjusting your search criteria</p>
                            </div>
                          </td>
                        </tr>
                      )}
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
                {integrations.map(integration => (
                  <div key={integration.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                          <Key size={18} className="text-gray-500" />
                        </div>
                        <h3 className="font-medium">{integration.name}</h3>
                      </div>
                      <button className={`px-3 py-1.5 text-sm ${
                        integration.connected ? 'btn-secondary' : 'btn-primary'
                      }`}>
                        {integration.connected ? 'Configure' : 'Connect'}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {integration.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;