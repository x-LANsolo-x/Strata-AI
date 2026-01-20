import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Building2, Bell, AlertTriangle, Download, Trash2, Loader2, CheckCircle, Cpu } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/Button';
import { getSettings, updateSettings, getStartupProfile, updateStartupProfile, exportAllData, deleteAccount } from '@/services/startup.service';
import type { UserSettings, UpdateSettingsInput, StartupProfile, UpdateStartupInput } from '@/types/startup.types';

type SettingsTab = 'profile' | 'startup' | 'alerts' | 'data' | 'llm';

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'startup', label: 'Startup Profile', icon: Building2 },
  { id: 'alerts', label: 'Alert Thresholds', icon: Bell },
  { id: 'llm', label: 'LLM Provider', icon: Cpu },
  { id: 'data', label: 'Data & Account', icon: Download },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const { user, logout } = useAuthStore();
  const queryClient = useQueryClient();

  // Fetch settings
  const { data: settings, isLoading: settingsLoading } = useQuery<UserSettings>({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  // Fetch startup profile
  const { data: profile, isLoading: profileLoading } = useQuery<StartupProfile | null>({
    queryKey: ['startupProfile'],
    queryFn: getStartupProfile,
  });

  // Form state
  const [fullName, setFullName] = useState('');
  const [startupName, setStartupName] = useState('');
  const [industry, setIndustry] = useState('');
  const [stage, setStage] = useState<'idea' | 'mvp' | 'growth' | 'scale'>('idea');
  const [teamSize, setTeamSize] = useState(1);
  const [warningThreshold, setWarningThreshold] = useState(6);
  const [criticalThreshold, setCriticalThreshold] = useState(3);
  const [currency, setCurrency] = useState('USD');

  // Initialize form values when data loads
  useEffect(() => {
    if (settings) {
      setFullName(settings.full_name || '');
      setWarningThreshold(settings.runway_warning_threshold);
      setCriticalThreshold(settings.runway_critical_threshold);
      setCurrency(settings.currency);
    }
  }, [settings]);

  useEffect(() => {
    if (profile) {
      setStartupName(profile.name);
      setIndustry(profile.industry);
      setStage(profile.stage);
      setTeamSize(profile.team_size);
    }
  }, [profile]);

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: (data: UpdateSettingsInput) => updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      showSaveMessage('Settings saved successfully!');
    },
  });

  // Update startup profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: UpdateStartupInput) => updateStartupProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startupProfile'] });
      showSaveMessage('Startup profile updated!');
    },
  });

  // Export data mutation
  const exportMutation = useMutation({
    mutationFn: exportAllData,
    onSuccess: (data) => {
      // Download as JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `strata-ai-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showSaveMessage('Data exported successfully!');
    },
  });

  // Delete account mutation
  const deleteMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      logout();
    },
  });

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleSaveProfile = () => {
    updateSettingsMutation.mutate({ full_name: fullName });
  };

  const handleSaveStartup = () => {
    updateProfileMutation.mutate({
      name: startupName,
      industry,
      stage,
      team_size: teamSize,
    });
  };

  const handleSaveAlerts = () => {
    updateSettingsMutation.mutate({
      runway_warning_threshold: warningThreshold,
      runway_critical_threshold: criticalThreshold,
      currency,
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently deleted.')) {
      deleteMutation.mutate();
    }
  };

  const inputClasses = "block w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {saveMessage && (
        <div className="bg-success/10 border border-success text-success px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          {saveMessage}
        </div>
      )}

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
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Personal Information</h3>
              <p className="text-sm text-gray-500">Update your personal details</p>
            </div>
            
            {settingsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary-500" /></div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className={labelClasses}>Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Email Address</label>
                    <input
                      type="email"
                      value={user?.email || settings?.email || ''}
                      disabled
                      className={`${inputClasses} bg-gray-50 text-gray-500`}
                    />
                    <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={updateSettingsMutation.isPending}>
                    {updateSettingsMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Startup Profile Tab */}
        {activeTab === 'startup' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Startup Information</h3>
              <p className="text-sm text-gray-500">Manage your startup profile details</p>
            </div>
            
            {profileLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary-500" /></div>
            ) : !profile ? (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No startup profile yet. Complete the onboarding to set up your profile.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className={labelClasses}>Startup Name</label>
                    <input
                      type="text"
                      value={startupName}
                      onChange={(e) => setStartupName(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Industry</label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Stage</label>
                    <select 
                      value={stage} 
                      onChange={(e) => setStage(e.target.value as typeof stage)}
                      className={inputClasses}
                    >
                      <option value="idea">💡 Idea Stage</option>
                      <option value="mvp">🚀 MVP Stage</option>
                      <option value="growth">📈 Growth Stage</option>
                      <option value="scale">🏢 Scale Stage</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Team Size</label>
                    <input
                      type="number"
                      min={1}
                      value={teamSize}
                      onChange={(e) => setTeamSize(parseInt(e.target.value) || 1)}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveStartup} disabled={updateProfileMutation.isPending}>
                    {updateProfileMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Alert Thresholds Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Alert Thresholds</h3>
              <p className="text-sm text-gray-500">Configure when you receive runway warnings</p>
            </div>
            
            {settingsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary-500" /></div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className={labelClasses}>Warning Threshold (months)</label>
                    <input
                      type="number"
                      min={1}
                      max={36}
                      value={warningThreshold}
                      onChange={(e) => setWarningThreshold(parseInt(e.target.value) || 6)}
                      className={inputClasses}
                    />
                    <p className="text-xs text-gray-400 mt-1">Alert when runway falls below this</p>
                  </div>
                  <div>
                    <label className={labelClasses}>Critical Threshold (months)</label>
                    <input
                      type="number"
                      min={1}
                      max={24}
                      value={criticalThreshold}
                      onChange={(e) => setCriticalThreshold(parseInt(e.target.value) || 3)}
                      className={inputClasses}
                    />
                    <p className="text-xs text-gray-400 mt-1">Critical alert when runway falls below this</p>
                  </div>
                  <div>
                    <label className={labelClasses}>Currency</label>
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                      className={inputClasses}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="CAD">CAD (C$)</option>
                      <option value="AUD">AUD (A$)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveAlerts} disabled={updateSettingsMutation.isPending}>
                    {updateSettingsMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* LLM Provider Tab */}
        {activeTab === 'llm' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">LLM Provider Configuration</h3>
              <p className="text-sm text-gray-500">View current AI provider settings</p>
            </div>
            
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Cpu className="h-5 w-5 text-primary-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Current Provider: {settings?.llm_provider || 'Groq'}</h4>
                  <p className="text-sm text-gray-600 mt-1">Model: {settings?.llm_model || 'llama-3.3-70b-versatile'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">To change LLM provider:</h4>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Fork the STRATA-AI repository</li>
                <li>Edit the <code className="bg-gray-200 px-1 rounded">.env</code> file</li>
                <li>Set <code className="bg-gray-200 px-1 rounded">LLM_PROVIDER</code> and <code className="bg-gray-200 px-1 rounded">GROQ_API_KEY</code></li>
                <li>Supported providers: Groq, OpenAI, Gemini, Ollama</li>
              </ol>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-3 text-primary-500 hover:text-primary-600 text-sm font-medium"
              >
                View documentation →
              </a>
            </div>
          </div>
        )}

        {/* Data & Account Tab */}
        {activeTab === 'data' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Data Export & Account</h3>
              <p className="text-sm text-gray-500">Export your data or manage your account</p>
            </div>
            
            {/* Export Section */}
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Export All Data</h4>
                  <p className="text-sm text-gray-500 mt-1">Download all your data as a JSON file</p>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={() => exportMutation.mutate()}
                  disabled={exportMutation.isPending}
                >
                  {exportMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Download className="h-4 w-4 mr-2" />
                  )}
                  Export Data
                </Button>
              </div>
            </div>

            {/* Delete Account Section */}
            <div className="border border-danger/30 bg-danger/5 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-danger flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Delete Account
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button 
                  variant="secondary"
                  onClick={handleDeleteAccount}
                  disabled={deleteMutation.isPending}
                  className="!bg-danger/10 !text-danger hover:!bg-danger/20 !border-danger/30"
                >
                  {deleteMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-2" />
                  )}
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
