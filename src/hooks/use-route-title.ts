import { useMemo } from 'react';
import { useMatches } from 'react-router-dom';

import { appShellRouteMetadata, isAppRouteHandle } from '@/router/route-metadata';

export function useCurrentRouteMetadata() {
  const matches = useMatches();

  return useMemo(() => {
    const routeHandle = [...matches].map((match) => match.handle).reverse().find(isAppRouteHandle);

    return routeHandle?.route ?? appShellRouteMetadata;
  }, [matches]);
}

export function useRouteTitle() {
  return useCurrentRouteMetadata().title;
}