import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Building2, Bell, AlertTriangle, Download, Trash2, Loader2, CheckCircle, Cpu, Lock, Eye, EyeOff, Upload, FileSpreadsheet, FileText, Landmark, CreditCard, Table, Link as LinkIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/components/ui/Button';
import { getSettings, updateSettings, getStartupProfile, updateStartupProfile, exportAllData, deleteAccount } from '@/services/startup.service';
import { apiClient } from '@/services/api.client';
import type { UserSettings, UpdateSettingsInput, StartupProfile, UpdateStartupInput } from '@/types/startup.types';

type SettingsTab = 'profile' | 'startup' | 'alerts' | 'security' | 'import' | 'data' | 'llm';

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'startup', label: 'Startup Profile', icon: Building2 },
  { id: 'alerts', label: 'Alert Thresholds', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'import', label: 'Import Data', icon: Upload },
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

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Import data state
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');

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

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async (data: { current_password: string; new_password: string }) => {
      return apiClient.post('/auth/change-password', data);
    },
    onSuccess: () => {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError(null);
      showSaveMessage('Password changed successfully!');
    },
    onError: (error: Error) => {
      setPasswordError(error.message || 'Failed to change password');
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

  const handleChangePassword = () => {
    setPasswordError(null);
    
    // Validate
    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (!newPassword) {
      setPasswordError('Please enter a new password');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    changePasswordMutation.mutate({
      current_password: currentPassword,
      new_password: newPassword,
    });
  };

  // Get auth token helper
  const getAuthToken = (): string => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        return parsed.state?.token || '';
      } catch { /* ignore */ }
    }
    return '';
  };

  // Handle file upload for data import
  const handleFileImport = async (file: File, fileTypeHint: string) => {
    setIsImporting(true);
    setImportError(null);
    setImportSuccess(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const token = getAuthToken();
      const url = `http://127.0.0.1:8000/api/v1/onboarding/extract-from-file-enhanced?file_type_hint=${fileTypeHint}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Update startup profile with extracted financial data
          const updateData: UpdateStartupInput = {};
          
          if (result.financial_data) {
            updateData.initial_cash_balance = result.financial_data.latest_cash_balance;
            updateData.initial_monthly_expenses = result.financial_data.average_monthly_expenses;
            updateData.initial_monthly_revenue = result.financial_data.average_monthly_revenue;
          }
          if (result.bank_statement_data) {
            updateData.initial_cash_balance = result.bank_statement_data.closing_balance;
            updateData.initial_monthly_expenses = result.bank_statement_data.monthly_expense_estimate;
            updateData.initial_monthly_revenue = result.bank_statement_data.monthly_income_estimate;
          }
          if (result.stripe_data) {
            updateData.initial_monthly_revenue = result.stripe_data.net_revenue || result.stripe_data.total_revenue;
          }
          if (result.startup_data) {
            if (result.startup_data.name) updateData.name = result.startup_data.name;
            if (result.startup_data.industry) updateData.industry = result.startup_data.industry;
            if (result.startup_data.stage) updateData.stage = result.startup_data.stage;
            if (result.startup_data.team_size) updateData.team_size = result.startup_data.team_size;
          }

          if (Object.keys(updateData).length > 0) {
            await updateStartupProfile(updateData);
            queryClient.invalidateQueries({ queryKey: ['startupProfile'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
          }

          setImportSuccess(`Successfully imported data from ${file.name}`);
        } else {
          setImportError(result.error || 'Failed to extract data from file');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setImportError(errorData.detail || 'Failed to upload file');
      }
    } catch (error) {
      console.error('Import failed:', error);
      setImportError('Failed to import data. Please try again.');
    } finally {
      setIsImporting(false);
    }
  };

  // Handle Google Sheets connection
  const handleGoogleSheetConnect = async () => {
    if (!googleSheetUrl.includes('docs.google.com/spreadsheets')) {
      setImportError('Please enter a valid Google Sheets URL');
      return;
    }

    setIsImporting(true);
    setImportError(null);
    setImportSuccess(null);

    try {
      const token = getAuthToken();

      const response = await fetch('http://127.0.0.1:8000/api/v1/onboarding/connect-google-sheets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sheet_url: googleSheetUrl }),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.financial_data) {
          await updateStartupProfile({
            initial_cash_balance: result.financial_data.latest_cash_balance,
            initial_monthly_expenses: result.financial_data.average_monthly_expenses,
            initial_monthly_revenue: result.financial_data.average_monthly_revenue,
          });
          queryClient.invalidateQueries({ queryKey: ['startupProfile'] });
          queryClient.invalidateQueries({ queryKey: ['dashboard'] });
          setImportSuccess('Successfully connected Google Sheets data');
          setGoogleSheetUrl('');
        } else {
          setImportError(result.error || 'Failed to extract data from Google Sheets');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        setImportError(errorData.detail || 'Failed to connect to Google Sheets');
      }
    } catch (error) {
      console.error('Google Sheets connection failed:', error);
      setImportError('Failed to connect to Google Sheets. Please try again.');
    } finally {
      setIsImporting(false);
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

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Change Password</h3>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {passwordError}
              </div>
            )}

            <div className="max-w-md space-y-4">
              {/* Current Password */}
              <div>
                <label className={labelClasses}>Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className={inputClasses}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className={labelClasses}>New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className={inputClasses}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters</p>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className={labelClasses}>Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className={inputClasses}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button onClick={handleChangePassword} disabled={changePasswordMutation.isPending}>
                  {changePasswordMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Change Password
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Import Data Tab */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Import Financial Data</h3>
              <p className="text-sm text-gray-500">Upload files or connect services to import your financial data</p>
            </div>

            {/* Success Message */}
            {importSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {importSuccess}
              </div>
            )}

            {/* Error Message */}
            {importError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {importError}
              </div>
            )}

            {isImporting ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Processing your data...</p>
                <p className="text-sm text-gray-400 mt-1">AI is extracting and analyzing your financial information</p>
              </div>
            ) : (
              <>
                {/* Primary File Upload Options */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Upload Pitch Deck */}
                  <label className="group cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileImport(e.target.files[0], 'pitch_deck')}
                    />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors h-full">
                      <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-primary-500" />
                      <p className="font-medium text-gray-700 group-hover:text-primary-600">Pitch Deck</p>
                      <p className="text-xs text-gray-400 mt-1">PDF - AI extracts company info</p>
                    </div>
                  </label>

                  {/* Upload Financials */}
                  <label className="group cursor-pointer">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileImport(e.target.files[0], 'financial_csv')}
                    />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors h-full">
                      <FileSpreadsheet className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-primary-500" />
                      <p className="font-medium text-gray-700 group-hover:text-primary-600">Financial Spreadsheet</p>
                      <p className="text-xs text-gray-400 mt-1">CSV or Excel with monthly data</p>
                    </div>
                  </label>

                  {/* Bank Statement */}
                  <label className="group cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileImport(e.target.files[0], 'bank_statement')}
                    />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors h-full">
                      <Landmark className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-primary-500" />
                      <p className="font-medium text-gray-700 group-hover:text-primary-600">Bank Statement</p>
                      <p className="text-xs text-gray-400 mt-1">PDF - AI extracts transactions</p>
                    </div>
                  </label>

                  {/* Stripe Export */}
                  <label className="group cursor-pointer">
                    <input
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileImport(e.target.files[0], 'stripe_csv')}
                    />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-400 hover:bg-primary-50 transition-colors h-full">
                      <CreditCard className="w-10 h-10 text-gray-400 mx-auto mb-3 group-hover:text-primary-500" />
                      <p className="font-medium text-gray-700 group-hover:text-primary-600">Stripe Export</p>
                      <p className="text-xs text-gray-400 mt-1">CSV - Revenue & transactions</p>
                    </div>
                  </label>
                </div>

                {/* Google Sheets Connection */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary-400 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <Table className="w-10 h-10 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">Google Sheets</p>
                      <p className="text-xs text-gray-400">Paste a shareable link to your financial spreadsheet</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                      value={googleSheetUrl}
                      onChange={(e) => setGoogleSheetUrl(e.target.value)}
                      className={inputClasses + " flex-1"}
                    />
                    <Button 
                      onClick={handleGoogleSheetConnect}
                      disabled={!googleSheetUrl.includes('docs.google.com/spreadsheets')}
                      variant="secondary"
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Upload className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">How it works</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Upload your financial documents and our AI will automatically extract key metrics like 
                        cash balance, monthly revenue, and expenses to update your startup profile and forecasts.
                      </p>
                    </div>
                  </div>
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
