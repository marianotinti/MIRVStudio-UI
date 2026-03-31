import { NavLink, useParams } from 'react-router-dom';

import { ProjectStatusBadge } from '@/modules/projects/components/ProjectStatusBadge';
import { useProjects } from '@/modules/projects/hooks/use-projects';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'Overview', suffix: '' },
  { label: 'Pipeline', suffix: '/pipeline' },
  { label: 'Assets', suffix: '/assets' },
  { label: 'Board', suffix: '/board' },
  { label: 'Studio', suffix: '/studio' },
  { label: 'QA', suffix: '/qa' },
];

export function ProjectHeader() {
  const { projectId } = useParams();
  const { project } = useProjects(projectId);

  if (!projectId) {
    return null;
  }

  const projectName = project?.title ?? projectId;
  const projectStatus = project?.status ?? 'draft';

  return (
    <div className="border-b border-white/8 bg-surface-low/80 px-6 py-4 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-on-surface">{projectName}</h2>
            <ProjectStatusBadge status={projectStatus} />
          </div>
          <p className="mt-1 text-sm text-on-surface-variant">Project-scoped navigation and shared panels live here.</p>
        </div>
        <div className="flex flex-wrap gap-1 rounded-[var(--radius-sm)] bg-surface-lowest p-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.label}
              to={`/projects/${projectId}${tab.suffix}`}
              end={!tab.suffix}
              className={({ isActive }) =>
                cn(
                  'rounded-[calc(var(--radius-sm)-2px)] px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-surface-highest text-on-surface' : 'text-on-surface-variant hover:text-on-surface',
                )
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}