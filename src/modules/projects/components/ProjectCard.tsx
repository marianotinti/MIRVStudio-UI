import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectStatusBadge } from '@/modules/projects/components/ProjectStatusBadge';
import type { ProjectSummary } from '@/modules/projects/types';

export function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.client}</CardDescription>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-[var(--radius-sm)] bg-surface-lowest p-3">
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-on-surface-variant">Scenes</div>
            <div className="mt-1 font-mono text-on-surface">{project.sceneCount}</div>
          </div>
          <div className="rounded-[var(--radius-sm)] bg-surface-lowest p-3">
            <div className="text-[0.65rem] uppercase tracking-[0.16em] text-on-surface-variant">Delivery</div>
            <div className="mt-1 font-mono text-on-surface">{project.deliveryFormat}</div>
          </div>
        </div>
        <Link to={`/projects/${project.slug}/pipeline`} className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          Open pipeline <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}