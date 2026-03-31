import { FolderGit2, Images, PlayCircle, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProjects } from '@/modules/projects/hooks/use-projects';

export function ProjectOverviewPage() {
  const { projectId } = useParams();
  const { project } = useProjects(projectId);

  if (!project) {
    return <EmptyState title="Project not found" description="The requested project could not be resolved from the current mock domain contracts." />;
  }

  return (
    <div className="h-full overflow-y-auto p-6 custom-scrollbar">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[var(--radius-sm)] bg-surface-lowest p-4">
                <div className="text-[0.68rem] uppercase tracking-[0.18em] text-on-surface-variant">Client</div>
                <div className="mt-2 text-lg font-medium text-on-surface">{project.client}</div>
              </div>
              <div className="rounded-[var(--radius-sm)] bg-surface-lowest p-4">
                <div className="text-[0.68rem] uppercase tracking-[0.18em] text-on-surface-variant">Scenes</div>
                <div className="mt-2 text-lg font-medium text-on-surface">{project.sceneCount}</div>
              </div>
              <div className="rounded-[var(--radius-sm)] bg-surface-lowest p-4">
                <div className="text-[0.68rem] uppercase tracking-[0.18em] text-on-surface-variant">Delivery</div>
                <div className="mt-2 text-lg font-medium text-on-surface">{project.deliveryFormat}</div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <Button asChild variant="secondary" className="h-20 justify-start rounded-[var(--radius-lg)] px-5 text-left">
              <Link to={`/projects/${project.slug}/pipeline`}>
                <PlayCircle className="h-5 w-5" />
                Pipeline
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-20 justify-start rounded-[var(--radius-lg)] px-5 text-left">
              <Link to={`/projects/${project.slug}/assets`}>
                <Images className="h-5 w-5" />
                Assets
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-20 justify-start rounded-[var(--radius-lg)] px-5 text-left">
              <Link to={`/projects/${project.slug}/board`}>
                <Sparkles className="h-5 w-5" />
                Board
              </Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Module health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-on-surface-variant">
            <div className="flex items-center gap-3 rounded-[var(--radius-sm)] bg-surface-lowest p-3">
              <FolderGit2 className="h-4 w-4 text-primary" />
              Domain contracts and routing are now separated from the old switch-based shell.
            </div>
            <div className="rounded-[var(--radius-sm)] border border-dashed border-white/10 p-4">
              Board and Studio remain shallow in this phase and will be upgraded later with richer interaction models.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}