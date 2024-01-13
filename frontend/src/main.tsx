import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@/routes/root';
import TimerPage from '@/features/timer/TimerPage';
import HabitTrackerPage from '@/features/habit-tracker/HabitTrackerPage';
import ProfilePage from '@/features/profile/ProfilePage';
import SettingsPage from '@/features/settings/SettingsPage';
import AnalyticsPage from '@/features/analytics/AnalyticsPage';
import ErrorPage from '@/routes/error-page';
import './global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/timer',
        element: <TimerPage />,
      },
      {
        path: '/tracker',
        element: <HabitTrackerPage />,
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
