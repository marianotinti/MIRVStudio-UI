import { useMemo } from 'react';

import { projectsMock } from '@/modules/projects/mocks/projects.mock';
import type { ProjectProgressSnapshot, ProjectSummary } from '@/modules/projects/types';
import type { Project, ProjectStatus } from '@/types/project';

const statusProgressMap: Record<ProjectStatus, ProjectProgressSnapshot> = {
  draft: {
    progress: 0,
    progressLabel: 'Draft',
  },
  queued: {
    progress: 0,
    progressLabel: 'Queued',
  },
  rendering: {
    progress: 64,
    progressLabel: '31/48',
  },
  done: {
    progress: 100,
    progressLabel: '12/12',
  },
  failed: {
    progress: 12,
    progressLabel: '1/8',
  },
};

function formatCreatedLabel(createdAt: string) {
  const [year, month, day] = createdAt.split('-');
  return `${day}.${month}.${year}`;
}

function toProjectSummary(project: Project): ProjectSummary {
  const progressSnapshot = statusProgressMap[project.status];

  return {
    ...project,
    ...progressSnapshot,
    createdLabel: formatCreatedLabel(project.createdAt),
    meta: `${project.sceneCount} Scenes • ${project.deliveryFormat}`,
  };
}

export function useProjects(projectId?: string) {
  const projects = useMemo(() => projectsMock.map(toProjectSummary), []);
  const project = useMemo(
    () => projects.find((item) => item.slug === projectId || item.id === projectId),
    [projectId, projects],
  );

  return {
    projects,
    project,
    activeProjects: projects.filter((item) => item.status === 'rendering' || item.status === 'queued'),
  };
}