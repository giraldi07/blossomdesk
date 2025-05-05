import { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Briefcase, Edit, Check, X 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94107',
    bio: 'Senior Product Designer with 8+ years of experience creating user-centered digital products.',
    position: 'Senior Product Designer',
    company: 'Acme Inc.',
    joinDate: 'June 2020'
  });

  const handleEditField = (field: string) => {
    setEditingField(field);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveField = () => {
    setEditingField(null);
    // Here you would typically call an API to save the changes
  };

  const renderEditableField = (field: string, label: string, icon: React.ReactNode) => {
    return (
      <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {icon}
          <span className="ml-2">{label}</span>
        </label>
        {editingField === field ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              name={field}
              value={profileData[field as keyof typeof profileData]}
              onChange={handleInputChange}
              className="form-input flex-1 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
            <button 
              onClick={handleSaveField}
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 p-1"
            >
              <Check size={18} />
            </button>
            <button 
              onClick={() => setEditingField(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
            <p className="text-gray-800 dark:text-gray-200">
              {profileData[field as keyof typeof profileData]}
            </p>
            <button 
              onClick={() => handleEditField(field)}
              className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 p-1"
            >
              <Edit size={16} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Profile Picture Section */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="relative mb-4">
            <img 
              src={user?.avatarUrl || "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"} 
              alt={profileData.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
            />
            <button className="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
              <Edit size={16} />
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">{profileData.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center">{profileData.position}</p>
          
          <div className="mt-4 w-full">
            <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-300">About</h3>
            {editingField === 'bio' ? (
              <div className="space-y-2">
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-textarea w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={handleSaveField}
                    className="btn-primary px-3 py-1 text-sm"
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setEditingField(null)}
                    className="btn-secondary px-3 py-1 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-gray-700 dark:text-gray-300 mb-2">{profileData.bio}</p>
                <button 
                  onClick={() => handleEditField('bio')}
                  className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 text-sm flex items-center"
                >
                  <Edit size={14} className="mr-1" />
                  Edit Bio
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Profile Details Section */}
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Profile Information</h2>
          
          {renderEditableField('name', 'Full Name', <User size={16} className="text-gray-600 dark:text-gray-400" />)}
          {renderEditableField('email', 'Email', <Mail size={16} className="text-gray-600 dark:text-gray-400" />)}
          {renderEditableField('phone', 'Phone', <Phone size={16} className="text-gray-600 dark:text-gray-400" />)}
          {renderEditableField('address', 'Address', <MapPin size={16} className="text-gray-600 dark:text-gray-400" />)}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {renderEditableField('position', 'Position', <Briefcase size={16} className="text-gray-600 dark:text-gray-400" />)}
            </div>
            <div>
              {renderEditableField('company', 'Company', <Briefcase size={16} className="text-gray-600 dark:text-gray-400" />)}
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <label className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              <Calendar size={16} className="text-gray-600 dark:text-gray-400" />
              <span className="ml-2">Member Since</span>
            </label>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
              <p className="text-gray-800 dark:text-gray-200">{profileData.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;