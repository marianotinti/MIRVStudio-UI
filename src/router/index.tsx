import { BrowserRouter, useRoutes } from 'react-router-dom';

import { appRoutes } from '@/router/routes';

function RouterView() {
  return useRoutes(appRoutes);
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <RouterView />
    </BrowserRouter>
  );
}