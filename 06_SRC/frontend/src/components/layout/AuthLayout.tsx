import { Outlet } from 'react-router-dom';
import { Rocket } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Rocket className="mx-auto h-10 w-10 text-black" />
          <h1 className="text-3xl font-bold mt-2">Strata-AI</h1>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
