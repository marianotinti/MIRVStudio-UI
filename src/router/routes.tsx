import { Navigate, type RouteObject } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { AssetsPage } from '@/modules/assets/AssetsPage';
import { BoardPage } from '@/modules/board/BoardPage';
import { CreatePage } from '@/modules/create/CreatePage';
import { PipelinePage } from '@/modules/pipeline/PipelinePage';
import { ProjectOverviewPage } from '@/modules/projects/ProjectOverviewPage';
import { ProjectsPage } from '@/modules/projects/ProjectsPage';
import { QAPage } from '@/modules/qa/QAPage';
import { SettingsPage } from '@/modules/settings/SettingsPage';
import { StudioPage } from '@/modules/studio/StudioPage';

export type ShellLayoutHandle = {
  shell: {
    showProjectHeader: boolean;
    showInspector: boolean;
    showBottomDrawer: boolean;
  };
};

const globalShell: ShellLayoutHandle = {
  shell: {
    showProjectHeader: false,
    showInspector: true,
    showBottomDrawer: true,
  },
};

const projectShell: ShellLayoutHandle = {
  shell: {
    showProjectHeader: true,
    showInspector: true,
    showBottomDrawer: true,
  },
};

const moduleOwnedPanelsShell: ShellLayoutHandle = {
  shell: {
    showProjectHeader: true,
    showInspector: false,
    showBottomDrawer: false,
  },
};

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/projects" replace />,
  },
  {
    element: <AppShell />,
    children: [
      { path: '/projects', element: <ProjectsPage />, handle: globalShell },
      { path: '/create', element: <CreatePage />, handle: globalShell },
      { path: '/projects/:projectId', element: <ProjectOverviewPage />, handle: projectShell },
      { path: '/projects/:projectId/pipeline', element: <PipelinePage />, handle: projectShell },
      { path: '/projects/:projectId/assets', element: <AssetsPage />, handle: projectShell },
      { path: '/projects/:projectId/board', element: <BoardPage />, handle: moduleOwnedPanelsShell },
      { path: '/projects/:projectId/studio', element: <StudioPage />, handle: moduleOwnedPanelsShell },
      { path: '/projects/:projectId/qa', element: <QAPage />, handle: projectShell },
      { path: '/settings', element: <SettingsPage />, handle: globalShell },
    ],
  },
];