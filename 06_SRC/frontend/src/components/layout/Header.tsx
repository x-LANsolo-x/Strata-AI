import { Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function Header() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search bar can go here in the future */}
      </div>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <Bell className="h-5 w-5 text-gray-600" />
      </button>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            Welcome, {user.fullName}
          </span>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      )}
    </header>
  );
}
