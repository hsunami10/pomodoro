import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from '@routes/root';
import TimerPage from '@pages/timer/TimerPage';
import ProfilePage from '@pages/profile/ProfilePage';
import SettingsPage from '@pages/settings/SettingsPage';
import TasksPage from '@/pages/shop/ShopPage';
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
        path: '/shop',
        element: <TasksPage />,
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
