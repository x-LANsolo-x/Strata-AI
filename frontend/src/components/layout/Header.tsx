import { Bell, Search, Plus, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

// Page configuration for titles, subtitles, tabs, and action buttons
const pageConfig: Record<string, {
  title: string;
  subtitle: string;
  tabs?: string[];
  actionButton?: { label: string; icon: React.ElementType };
}> = {
  '/': {
    title: 'Dashboard',
    subtitle: 'Overview of your startup metrics and insights',
    tabs: ['Overview', 'Analytics', 'Reports'],
  },
  '/scenarios': {
    title: 'Scenarios',
    subtitle: 'Test financial impact of business decisions',
    tabs: ['Overview', 'Analytics', 'Reports'],
    actionButton: { label: 'New Scenario', icon: Plus },
  },
  '/ideation': {
    title: 'Ideation',
    subtitle: 'AI-powered pivot and growth ideas',
    tabs: ['Overview', 'Analytics', 'Reports'],
    actionButton: { label: 'New Idea', icon: Plus },
  },
  '/roadmaps': {
    title: 'Roadmaps',
    subtitle: 'Execute your strategies with actionable plans',
    tabs: ['Overview', 'Analytics', 'Reports'],
    actionButton: { label: 'New Roadmap', icon: Plus },
  },
  '/settings': {
    title: 'Settings',
    subtitle: 'Manage your account and preferences',
  },
};

export function Header() {
  const { user } = useAuthStore();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Get current page config or default
  const currentPage = pageConfig[location.pathname] || {
    title: 'Page',
    subtitle: 'Welcome to Strata-AI',
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-30 bg-cream-100 px-6 py-4">
      {/* Top Row: Title, Search, Actions, Profile */}
      <div className="flex items-center justify-between mb-4">
        {/* Left: Page Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{currentPage.title}</h1>
          <p className="text-sm text-gray-500">{currentPage.subtitle}</p>
        </div>

        {/* Right: Search, Action Button, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by scenario, idea, or metric..."
              className="w-72 rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          {/* Action Button (context-specific) */}
          {currentPage.actionButton && (
            <button className="flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600">
              <currentPage.actionButton.icon className="h-4 w-4" />
              {currentPage.actionButton.label}
            </button>
          )}

          {/* Notification Bell */}
          <button className="relative rounded-xl p-2.5 text-gray-500 transition-colors hover:bg-white hover:text-gray-700">
            <Bell className="h-5 w-5" />
            {/* Notification indicator dot */}
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
          </button>

          {/* User Profile */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
                  {getInitials(user.fullName)}
                </div>
                {/* Name & Email */}
                <div className="hidden text-left md:block">
                  <p className="text-sm font-semibold text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg">
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Profile Settings
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                    Preferences
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Tabs & Export */}
      {currentPage.tabs && (
        <div className="flex items-center justify-between">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            {currentPage.tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        </div>
      )}
    </header>
  );
}
