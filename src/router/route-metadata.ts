import { APP_NAME } from '@/lib/constants';

export type ShellLayoutState = {
  showProjectHeader: boolean;
  showInspector: boolean;
  showBottomDrawer: boolean;
};

export type AppRouteId =
  | 'projects'
  | 'create'
  | 'projectOverview'
  | 'projectPipeline'
  | 'projectAssets'
  | 'projectBoard'
  | 'projectStudio'
  | 'projectQA'
  | 'settings';

export type AppRouteMetadata = {
  id: AppRouteId | 'appShell';
  title: string;
  description: string;
  shell: ShellLayoutState;
};

export type AppRouteHandle = {
  route: AppRouteMetadata;
};

const globalShell: ShellLayoutState = {
  showProjectHeader: false,
  showInspector: true,
  showBottomDrawer: true,
};

const projectShell: ShellLayoutState = {
  showProjectHeader: true,
  showInspector: true,
  showBottomDrawer: true,
};

const moduleOwnedPanelsShell: ShellLayoutState = {
  showProjectHeader: true,
  showInspector: false,
  showBottomDrawer: false,
};

export const routeMetadata: Record<AppRouteId, AppRouteMetadata> = {
  projects: {
    id: 'projects',
    title: 'Projects',
    description: 'Browse active workspaces and open a project context.',
    shell: globalShell,
  },
  create: {
    id: 'create',
    title: 'Create Project',
    description: 'Initialize a new production workspace and delivery shape.',
    shell: globalShell,
  },
  projectOverview: {
    id: 'projectOverview',
    title: 'Project Overview',
    description: 'Track the current project and branch into operational modules.',
    shell: projectShell,
  },
  projectPipeline: {
    id: 'projectPipeline',
    title: 'Pipeline',
    description: 'Monitor asynchronous jobs, retries, throughput, and delivery state.',
    shell: projectShell,
  },
  projectAssets: {
    id: 'projectAssets',
    title: 'Assets',
    description: 'Inspect project assets, provenance, and content readiness.',
    shell: projectShell,
  },
  projectBoard: {
    id: 'projectBoard',
    title: 'Board',
    description: 'Work inside the module-owned board surface for project planning.',
    shell: moduleOwnedPanelsShell,
  },
  projectStudio: {
    id: 'projectStudio',
    title: 'Studio',
    description: 'Enter the project studio surface for preview, editing, and export flows.',
    shell: moduleOwnedPanelsShell,
  },
  projectQA: {
    id: 'projectQA',
    title: 'QA',
    description: 'Review outputs, approvals, and QA state inside the project scope.',
    shell: projectShell,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    description: 'Configure workspace behavior, defaults, and operational controls.',
    shell: globalShell,
  },
};

export const appShellRouteMetadata: AppRouteMetadata = {
  id: 'appShell',
  title: APP_NAME,
  description: 'Application shell and shared workspace surfaces.',
  shell: globalShell,
};

export function createRouteHandle(metadata: AppRouteMetadata): AppRouteHandle {
  return { route: metadata };
}

export function isAppRouteHandle(handle: unknown): handle is AppRouteHandle {
  return typeof handle === 'object' && handle !== null && 'route' in handle;
}
