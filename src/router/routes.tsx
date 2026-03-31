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

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/projects" replace />,
  },
  {
    element: <AppShell />,
    children: [
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/create', element: <CreatePage /> },
      { path: '/projects/:projectId', element: <ProjectOverviewPage /> },
      { path: '/projects/:projectId/pipeline', element: <PipelinePage /> },
      { path: '/projects/:projectId/assets', element: <AssetsPage /> },
      { path: '/projects/:projectId/board', element: <BoardPage /> },
      { path: '/projects/:projectId/studio', element: <StudioPage /> },
      { path: '/projects/:projectId/qa', element: <QAPage /> },
      { path: '/settings', element: <SettingsPage /> },
    ],
  },
];