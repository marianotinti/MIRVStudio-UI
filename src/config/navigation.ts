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

export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: typeof FolderOpen;
};

export const primaryNavigation: NavItem[] = [
  { id: 'projects', label: 'Projects', path: '/projects', icon: FolderOpen },
  { id: 'create', label: 'Create', path: '/create', icon: PlusSquare },
  { id: 'pipeline', label: 'Pipeline', path: '/projects/alpha/pipeline', icon: GitMerge },
  { id: 'assets', label: 'Assets', path: '/projects/alpha/assets', icon: Box },
  { id: 'board', label: 'Board', path: '/projects/alpha/board', icon: LayoutDashboard },
  { id: 'studio', label: 'Studio', path: '/projects/alpha/studio', icon: Film },
  { id: 'qa', label: 'QA', path: '/projects/alpha/qa', icon: CheckSquare },
];

export const secondaryNavigation: NavItem[] = [
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
];