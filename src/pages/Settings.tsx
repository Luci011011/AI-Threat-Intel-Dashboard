import React, { useState } from 'react';
import { Save, Key, Globe, Bell, User, Shield, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'api' | 'notifications' | 'security'>('profile');
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Threat Intelligence API', key: 'ti_****1234', created: new Date('2024-01-15') },
    { id: '2', name: 'SIEM Integration', key: 'siem_****5678', created: new Date('2024-01-20') },
  ]);
  const [newApiKey, setNewApiKey] = useState({ name: '', description: '' });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'api', label: 'API Management', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleAddApiKey = () => {
    if (newApiKey.name) {
      const newKey = {
        id: String(apiKeys.length + 1),
        name: newApiKey.name,
        key: `new_****${Math.floor(Math.random() * 10000)}`,
        created: new Date()
      };
      setApiKeys([...apiKeys, newKey]);
      setNewApiKey({ name: '', description: '' });
    }
  };

  const handleDeleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="cyber-card space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyber-blue text-cyber-dark font-semibold'
                      : 'text-gray-300 hover:bg-cyber-gray hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="cyber-card space-y-6">
              <h3 className="text-xl font-bold text-white">Profile Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                  <input
                    type="text"
                    defaultValue={user?.username}
                    className="cyber-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="cyber-input w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                  <input
                    type="text"
                    defaultValue={user?.role}
                    disabled
                    className="cyber-input w-full opacity-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
                  <select className="cyber-input w-full">
                    <option>UTC</option>
                    <option>EST</option>
                    <option>PST</option>
                    <option>GMT</option>
                  </select>
                </div>
              </div>

              <button className="cyber-button-primary flex items-center gap-2">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          )}

          {/* API Management Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div className="cyber-card">
                <h3 className="text-xl font-bold text-white mb-4">API Keys</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Manage API keys for integrating with external threat intelligence feeds and SIEM platforms.
                </p>

                <div className="space-y-4 mb-6">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-4 bg-cyber-gray-light rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-semibold text-white mb-1">{apiKey.name}</div>
                          <div className="text-sm text-gray-400 font-mono mb-2">{apiKey.key}</div>
                          <div className="text-xs text-gray-500">
                            Created: {new Date(apiKey.created).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteApiKey(apiKey.id)}
                          className="text-cyber-red hover:text-cyber-red-dark"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-cyber-gray-light pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Create New API Key</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">API Key Name</label>
                      <input
                        type="text"
                        value={newApiKey.name}
                        onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
                        placeholder="e.g., VirusTotal Integration"
                        className="cyber-input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                      <textarea
                        value={newApiKey.description}
                        onChange={(e) => setNewApiKey({ ...newApiKey, description: e.target.value })}
                        placeholder="Optional description"
                        className="cyber-input w-full h-24 resize-none"
                      />
                    </div>
                    <button
                      onClick={handleAddApiKey}
                      className="cyber-button-primary flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Generate API Key
                    </button>
                  </div>
                </div>
              </div>

              <div className="cyber-card">
                <h3 className="text-xl font-bold text-white mb-4">API Endpoints</h3>
                <div className="space-y-3">
                  <div className="p-4 bg-cyber-gray-light rounded-lg">
                    <div className="font-semibold text-white mb-1">Threat Intelligence Feed</div>
                    <div className="text-sm text-gray-400 font-mono">GET /api/v1/threats</div>
                  </div>
                  <div className="p-4 bg-cyber-gray-light rounded-lg">
                    <div className="font-semibold text-white mb-1">IP Reputation Check</div>
                    <div className="text-sm text-gray-400 font-mono">POST /api/v1/ip/reputation</div>
                  </div>
                  <div className="p-4 bg-cyber-gray-light rounded-lg">
                    <div className="font-semibold text-white mb-1">URL Scanner</div>
                    <div className="text-sm text-gray-400 font-mono">POST /api/v1/url/scan</div>
                  </div>
                  <div className="p-4 bg-cyber-gray-light rounded-lg">
                    <div className="font-semibold text-white mb-1">Hash Scanner</div>
                    <div className="text-sm text-gray-400 font-mono">POST /api/v1/hash/scan</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="cyber-card space-y-6">
              <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-cyber-gray-light rounded-lg">
                  <div>
                    <div className="font-semibold text-white">Critical Alerts</div>
                    <div className="text-sm text-gray-400">Receive notifications for critical severity threats</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-cyber-gray-light rounded-lg">
                  <div>
                    <div className="font-semibold text-white">Email Notifications</div>
                    <div className="text-sm text-gray-400">Receive daily threat intelligence summaries via email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-cyber-gray-light rounded-lg">
                  <div>
                    <div className="font-semibold text-white">Real-time Updates</div>
                    <div className="text-sm text-gray-400">Enable real-time threat feed updates</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
                  </label>
                </div>
              </div>

              <button className="cyber-button-primary flex items-center gap-2">
                <Save size={16} />
                Save Preferences
              </button>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="cyber-card space-y-6">
              <h3 className="text-xl font-bold text-white">Security Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="cyber-input w-full"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    type="password"
                    className="cyber-input w-full"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="cyber-input w-full"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="border-t border-cyber-gray-light pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 bg-cyber-gray-light rounded-lg">
                  <div>
                    <div className="font-semibold text-white">Enable 2FA</div>
                    <div className="text-sm text-gray-400">Add an extra layer of security to your account</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-cyber-gray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
                  </label>
                </div>
              </div>

              <button className="cyber-button-primary flex items-center gap-2">
                <Save size={16} />
                Update Security Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;

