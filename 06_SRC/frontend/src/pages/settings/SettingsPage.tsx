import { useState } from 'react';
import { User, Building2, Bell, Shield, Palette } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/Button';

type SettingsTab = 'profile' | 'startup' | 'notifications' | 'security' | 'appearance';

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'startup', label: 'Startup Profile', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-2 flex gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Personal Information</h3>
              <p className="text-sm text-gray-500">Update your personal details</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user?.fullName || ''}
                  className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {activeTab === 'startup' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Startup Information</h3>
              <p className="text-sm text-gray-500">Manage your startup profile details</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Startup Name</label>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none">
                  <option>SaaS</option>
                  <option>Fintech</option>
                  <option>Healthcare</option>
                  <option>E-commerce</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Burn Rate ($)</label>
                <input
                  type="number"
                  placeholder="50000"
                  className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Cash Balance ($)</label>
                <input
                  type="number"
                  placeholder="500000"
                  className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Notification Preferences</h3>
              <p className="text-sm text-gray-500">Manage how you receive notifications</p>
            </div>
            
            <div className="space-y-4">
              {['Email notifications', 'Runway alerts', 'Weekly reports', 'Product updates'].map((item) => (
                <div key={item} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{item}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Security Settings</h3>
              <p className="text-sm text-gray-500">Manage your account security</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Update Password</Button>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Appearance Settings</h3>
              <p className="text-sm text-gray-500">Customize how Strata-AI looks</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
                <div className="flex gap-4">
                  {['Light', 'Dark', 'System'].map((theme) => (
                    <button
                      key={theme}
                      className={`px-6 py-3 rounded-xl border text-sm font-medium transition-colors ${
                        theme === 'Light'
                          ? 'border-primary-500 bg-primary-50 text-primary-600'
                          : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
