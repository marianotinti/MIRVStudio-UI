import { useNavigate } from 'react-router-dom';

import { ProjectStatusBadge } from '@/modules/projects/components/ProjectStatusBadge';
import type { ProjectSummary } from '@/modules/projects/types';

export function ProjectsTable({ projects }: { projects: ProjectSummary[] }) {
  const navigate = useNavigate();

  return (
    <div className="surface-panel overflow-hidden rounded-[var(--radius-lg)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-white/8 bg-surface-lowest/70 text-[0.68rem] uppercase tracking-[0.2em] text-on-surface-variant">
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Project</th>
            <th className="px-4 py-3 font-medium">Client</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Progress</th>
            <th className="px-4 py-3 text-right font-medium">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8 text-sm">
          {projects.map((project) => (
            <tr
              key={project.id}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="cursor-pointer transition-colors hover:bg-white/3"
            >
              <td className="px-4 py-4 font-mono text-xs text-on-surface-variant">{project.id}</td>
              <td className="px-4 py-4">
                <div className="font-medium text-on-surface">{project.title}</div>
                <div className="mt-1 text-xs text-on-surface-variant">{project.meta}</div>
              </td>
              <td className="px-4 py-4 text-on-surface-variant">{project.client}</td>
              <td className="px-4 py-4">
                <ProjectStatusBadge status={project.status} />
              </td>
              <td className="px-4 py-4">
                <div className="w-36">
                  <div className="mb-1 flex justify-between text-[0.68rem] font-mono text-on-surface-variant">
                    <span>{project.progress}%</span>
                    <span>{project.progressLabel}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/6">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-right font-mono text-xs text-on-surface-variant">{project.createdLabel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}