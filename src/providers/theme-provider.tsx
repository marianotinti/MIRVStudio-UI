import { useEffect, type PropsWithChildren } from 'react';

import { useUIStore } from '@/stores/ui-store';

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return children;
}