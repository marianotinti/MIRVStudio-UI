import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PageSection } from '@/components/shared/PageSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCard } from '@/modules/projects/components/ProjectCard';
import { ProjectsTable } from '@/modules/projects/components/ProjectsTable';
import { useProjects } from '@/modules/projects/hooks/use-projects';

export function ProjectsPage() {
  const { projects, activeProjects } = useProjects();

  return (
    <div className="h-full overflow-y-auto p-6 custom-scrollbar">
      <PageSection
        title="Production Pipeline"
        description="Active MIRV productions, delivery health and recent movement across the workspace."
        action={
          <Button asChild>
            <Link to="/create">
              <Plus className="h-4 w-4" />
              New Project
            </Link>
          </Button>
        }
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <ProjectsTable projects={projects} />
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-on-surface-variant">
                <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-surface-lowest px-3 py-2">
                  <span>Active projects</span>
                  <span className="font-mono text-on-surface">{activeProjects.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-surface-lowest px-3 py-2">
                  <span>Queued jobs</span>
                  <span className="font-mono text-on-surface">12</span>
                </div>
                <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-surface-lowest px-3 py-2">
                  <span>Cache pressure</span>
                  <span className="font-mono text-on-surface">31%</span>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
              {activeProjects.map((project) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}