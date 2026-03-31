import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/projects': 'Projects',
  '/create': 'Create Project',
  '/settings': 'Settings',
};

export function useRouteTitle() {
  const location = useLocation();

  return useMemo(() => {
    const exact = routeTitles[location.pathname];

    if (exact) {
      return exact;
    }

    if (location.pathname.includes('/pipeline')) {
      return 'Pipeline';
    }

    if (location.pathname.includes('/assets')) {
      return 'Assets';
    }

    if (location.pathname.includes('/board')) {
      return 'Board';
    }

    if (location.pathname.includes('/studio')) {
      return 'Studio';
    }

    if (location.pathname.includes('/qa')) {
      return 'QA';
    }

    if (/^\/projects\/[a-z0-9-]+$/.test(location.pathname)) {
      return 'Project Overview';
    }

    return 'MIRV Studio';
  }, [location.pathname]);
}