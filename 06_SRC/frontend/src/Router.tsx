import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import { MainLayout } from '@/components/layout/MainLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';

// Wrappers & Error
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { ErrorPage } from '@/pages/ErrorPage';

// Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { OnboardingWizard } from '@/pages/onboarding/OnboardingWizard';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { ScenariosPage } from '@/pages/scenarios/ScenariosPage';
import { IdeationPage } from '@/pages/ideation/IdeationPage';
import { RoadmapsPage } from '@/pages/roadmaps/RoadmapsPage';
import { RoadmapDetailPage } from '@/pages/roadmaps/RoadmapDetailPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'onboarding',
        element: <OnboardingWizard />,
      },
      {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'scenarios', element: <ScenariosPage /> },
          { path: 'ideation', element: <IdeationPage /> },
          { path: 'roadmaps', element: <RoadmapsPage /> },
          { path: 'roadmaps/:id', element: <RoadmapDetailPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
