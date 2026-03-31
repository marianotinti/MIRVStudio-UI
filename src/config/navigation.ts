import {
  Box,
  CheckSquare,
  Film,
  FolderOpen,
  GitMerge,
  LayoutDashboard,
  PlusSquare,
  Settings,
} from 'lucide-react';

import { buildProjectRoute, routes, type ProjectScopedRouteId } from '@/lib/routes';

export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: typeof FolderOpen;
};

type PrimaryNavigationDefinition = {
  id: string;
  label: string;
  path: string;
  icon: typeof FolderOpen;
  routeId?: ProjectScopedRouteId;
};

const primaryNavigationDefinitions: PrimaryNavigationDefinition[] = [
  { id: 'projects', label: 'Projects', path: routes.projects(), icon: FolderOpen },
  { id: 'create', label: 'Create', path: routes.create(), icon: PlusSquare },
  { id: 'pipeline', label: 'Pipeline', path: routes.projects(), routeId: 'projectPipeline', icon: GitMerge },
  { id: 'assets', label: 'Assets', path: routes.projects(), routeId: 'projectAssets', icon: Box },
  { id: 'board', label: 'Board', path: routes.projects(), routeId: 'projectBoard', icon: LayoutDashboard },
  { id: 'studio', label: 'Studio', path: routes.projects(), routeId: 'projectStudio', icon: Film },
  { id: 'qa', label: 'QA', path: routes.projects(), routeId: 'projectQA', icon: CheckSquare },
];

export function getPrimaryNavigation(projectId?: string): NavItem[] {
  return primaryNavigationDefinitions.map((item) => ({
    id: item.id,
    label: item.label,
    path: item.routeId && projectId ? buildProjectRoute(item.routeId, projectId) : item.path,
    icon: item.icon,
  }));
}

export const secondaryNavigation: NavItem[] = [
  { id: 'settings', label: 'Settings', path: routes.settings(), icon: Settings },
];