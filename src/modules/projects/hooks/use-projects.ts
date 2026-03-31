import { useMemo } from 'react';

import { projectsMock } from '@/modules/projects/mocks/projects.mock';

export function useProjects(projectId?: string) {
  const projects = useMemo(() => projectsMock, []);
  const project = useMemo(
    () => projects.find((item) => item.slug === projectId || item.id === projectId) ?? projects[1],
    [projectId, projects],
  );

  return {
    projects,
    project,
    activeProjects: projects.filter((item) => item.status === 'rendering' || item.status === 'queued'),
  };
}