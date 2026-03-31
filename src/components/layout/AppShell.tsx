import { Outlet, useMatches } from 'react-router-dom';

import { BottomDrawer } from '@/components/layout/BottomDrawer';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { InspectorPanel } from '@/components/layout/InspectorPanel';
import { ProjectHeader } from '@/components/layout/ProjectHeader';
import { Topbar } from '@/components/layout/Topbar';
import { cn } from '@/lib/utils';
import { appShellRouteMetadata, isAppRouteHandle } from '@/router/route-metadata';
import { useInspectorStore } from '@/stores/inspector-store';

export function AppShell() {
  const matches = useMatches();
  const isInspectorOpen = useInspectorStore((state) => state.isOpen);
  const routeHandle = [...matches].map((match) => match.handle).reverse().find(isAppRouteHandle);
  const shell = routeHandle?.route.shell ?? appShellRouteMetadata.shell;

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-surface">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Topbar />
        {shell.showProjectHeader ? <ProjectHeader /> : null}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className={cn('flex min-w-0 flex-1 flex-col overflow-hidden', isInspectorOpen && shell.showInspector ? 'border-r border-white/8' : '')}>
            <main className="flex-1 overflow-hidden">
              <Outlet />
            </main>
            {shell.showBottomDrawer ? <BottomDrawer /> : null}
          </div>
          {shell.showInspector ? <InspectorPanel /> : null}
        </div>
      </div>
    </div>
  );
}