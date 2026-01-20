import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts - Load immediately (needed for all routes)
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';

// Wrappers & Error - Load immediately
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { ErrorPage } from '@/pages/ErrorPage';

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

// Lazy load pages for code splitting
// This reduces initial bundle size and loads pages on-demand
const LoginPage = lazy(() => 
  import('@/pages/auth/LoginPage').then(m => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() => 
  import('@/pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage }))
);
const SmartOnboarding = lazy(() => 
  import('@/pages/onboarding/SmartOnboarding').then(m => ({ default: m.SmartOnboarding }))
);
const DashboardPage = lazy(() => 
  import('@/pages/dashboard/DashboardPage').then(m => ({ default: m.DashboardPage }))
);
const ScenariosPage = lazy(() => 
  import('@/pages/scenarios/ScenariosPage').then(m => ({ default: m.ScenariosPage }))
);
const IdeationPage = lazy(() => 
  import('@/pages/ideation/IdeationPage').then(m => ({ default: m.IdeationPage }))
);
const RoadmapsPage = lazy(() => 
  import('@/pages/roadmaps/RoadmapsPage').then(m => ({ default: m.RoadmapsPage }))
);
const RoadmapDetailPage = lazy(() => 
  import('@/pages/roadmaps/RoadmapDetailPage').then(m => ({ default: m.RoadmapDetailPage }))
);
const SettingsPage = lazy(() => 
  import('@/pages/settings/SettingsPage').then(m => ({ default: m.SettingsPage }))
);

// Wrap lazy components with Suspense
const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: withSuspense(LoginPage) },
      { path: '/register', element: withSuspense(RegisterPage) },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'onboarding',
        element: withSuspense(SmartOnboarding),
      },
      {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: withSuspense(DashboardPage) },
          { path: 'scenarios', element: withSuspense(ScenariosPage) },
          { path: 'ideation', element: withSuspense(IdeationPage) },
          { path: 'roadmaps', element: withSuspense(RoadmapsPage) },
          { path: 'roadmaps/:id', element: withSuspense(RoadmapDetailPage) },
          { path: 'settings', element: withSuspense(SettingsPage) },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
