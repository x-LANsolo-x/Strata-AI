import { Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search bar can go here in the future */}
      </div>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <Bell className="h-5 w-5 text-gray-600" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <User className="h-5 w-5 text-gray-600" />
      </button>
    </header>
  );
}
