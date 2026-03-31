import { Navigate, type RouteObject } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { routePatterns } from '@/lib/routes';
import { AssetsPage } from '@/modules/assets/AssetsPage';
import { BoardPage } from '@/modules/board/BoardPage';
import { CreatePage } from '@/modules/create/CreatePage';
import { PipelinePage } from '@/modules/pipeline/PipelinePage';
import { ProjectOverviewPage } from '@/modules/projects/ProjectOverviewPage';
import { ProjectsPage } from '@/modules/projects/ProjectsPage';
import { QAPage } from '@/modules/qa/QAPage';
import { createRouteHandle, routeMetadata } from '@/router/route-metadata';
import { SettingsPage } from '@/modules/settings/SettingsPage';
import { StudioPage } from '@/modules/studio/StudioPage';

export const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={routePatterns.projects} replace />,
  },
  {
    element: <AppShell />,
    children: [
      { path: routePatterns.projects, element: <ProjectsPage />, handle: createRouteHandle(routeMetadata.projects) },
      { path: routePatterns.create, element: <CreatePage />, handle: createRouteHandle(routeMetadata.create) },
      {
        path: routePatterns.projectOverview,
        element: <ProjectOverviewPage />,
        handle: createRouteHandle(routeMetadata.projectOverview),
      },
      {
        path: routePatterns.projectPipeline,
        element: <PipelinePage />,
        handle: createRouteHandle(routeMetadata.projectPipeline),
      },
      {
        path: routePatterns.projectAssets,
        element: <AssetsPage />,
        handle: createRouteHandle(routeMetadata.projectAssets),
      },
      {
        path: routePatterns.projectBoard,
        element: <BoardPage />,
        handle: createRouteHandle(routeMetadata.projectBoard),
      },
      {
        path: routePatterns.projectStudio,
        element: <StudioPage />,
        handle: createRouteHandle(routeMetadata.projectStudio),
      },
      { path: routePatterns.projectQA, element: <QAPage />, handle: createRouteHandle(routeMetadata.projectQA) },
      { path: routePatterns.settings, element: <SettingsPage />, handle: createRouteHandle(routeMetadata.settings) },
    ],
  },
];