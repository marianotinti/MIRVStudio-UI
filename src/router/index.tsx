import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { appRoutes } from '@/router/routes';

const router = createBrowserRouter(appRoutes);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
