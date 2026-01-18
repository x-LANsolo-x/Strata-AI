import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, // This makes DashboardPage the default for "/"
        element: <DashboardPage />,
      },
      // We will add other pages like /scenarios here later
    ],
  },
  // We will add auth pages like /login here later (outside the MainLayout)
]);

export function Router() {
  return <RouterProvider router={router} />;
}
