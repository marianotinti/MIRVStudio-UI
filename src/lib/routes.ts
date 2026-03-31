import { generatePath } from 'react-router-dom';

export const routePatterns = {
  projects: '/projects',
  create: '/create',
  projectOverview: '/projects/:projectId',
  projectPipeline: '/projects/:projectId/pipeline',
  projectAssets: '/projects/:projectId/assets',
  projectBoard: '/projects/:projectId/board',
  projectStudio: '/projects/:projectId/studio',
  projectQA: '/projects/:projectId/qa',
  settings: '/settings',
} as const;

export type ProjectScopedRouteId =
  | 'projectOverview'
  | 'projectPipeline'
  | 'projectAssets'
  | 'projectBoard'
  | 'projectStudio'
  | 'projectQA';

export const routes = {
  projects: () => routePatterns.projects,
  create: () => routePatterns.create,
  settings: () => routePatterns.settings,
  projectOverview: (projectId: string) => generatePath(routePatterns.projectOverview, { projectId }),
  projectPipeline: (projectId: string) => generatePath(routePatterns.projectPipeline, { projectId }),
  projectAssets: (projectId: string) => generatePath(routePatterns.projectAssets, { projectId }),
  projectBoard: (projectId: string) => generatePath(routePatterns.projectBoard, { projectId }),
  projectStudio: (projectId: string) => generatePath(routePatterns.projectStudio, { projectId }),
  projectQA: (projectId: string) => generatePath(routePatterns.projectQA, { projectId }),
} as const;

export function buildProjectRoute(routeId: ProjectScopedRouteId, projectId: string) {
  return routes[routeId](projectId);
}
