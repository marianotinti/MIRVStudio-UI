import { AlertTriangle, Filter, LoaderCircle, RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { EmptyState } from '@/components/shared/EmptyState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PipelineStageRail } from '@/modules/pipeline/components/PipelineStageRail';
import { JobInspectorContent } from '@/modules/pipeline/components/JobInspectorContent';
import { JobsTable } from '@/modules/pipeline/components/JobsTable';
import { PipelineTerminal } from '@/modules/pipeline/components/PipelineTerminal';
import { usePipeline } from '@/modules/pipeline/hooks/use-pipeline';
import type { PipelineDataSource, PipelineViewScenario } from '@/modules/pipeline/types';
import { useProjects } from '@/modules/projects/hooks/use-projects';
import { useInspectorStore } from '@/stores/inspector-store';
import { useUIStore } from '@/stores/ui-store';

function getScenario(searchParams: URLSearchParams): PipelineViewScenario {
  const value = searchParams.get('pipelineScenario');

  if (value === 'empty' || value === 'error' || value === 'loading') {
    return value;
  }

  return 'loaded';
}

function getSource(searchParams: URLSearchParams): PipelineDataSource | undefined {
  const value = searchParams.get('pipelineSource');

  if (value === 'mock' || value === 'api' || value === 'hybrid') {
    return value;
  }

  return undefined;
}

export function PipelinePage() {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const scenario = getScenario(searchParams);
  const requestedSource = getSource(searchParams);
  const { project } = useProjects(projectId);
  const { stages, jobs, logs, selectedJob, setSelectedJobId, status, error, source, isEmpty, refresh } = usePipeline({
    projectId,
    scenario,
    source: requestedSource,
  });
  const setInspector = useInspectorStore((state) => state.setInspector);
  const clearInspector = useInspectorStore((state) => state.clearInspector);
  const setBottomDrawer = useUIStore((state) => state.setBottomDrawer);

  useEffect(() => {
    if (status !== 'success' || !selectedJob) {
      clearInspector();
      setBottomDrawer({ isOpen: false, content: null });
      return undefined;
    }

    setInspector({
      title: 'Payload Inspector',
      subtitle: `Job ${selectedJob.id}`,
      content: <JobInspectorContent job={selectedJob} />,
    });

    setBottomDrawer({
      isOpen: true,
      title: 'Live Terminal Stream',
      content: <PipelineTerminal lines={logs} />,
    });

    return () => {
      clearInspector();
      setBottomDrawer({ isOpen: false, content: null });
    };
  }, [clearInspector, logs, selectedJob, setBottomDrawer, setInspector, status]);

  if (status === 'loading') {
    return (
      <div className="h-full overflow-y-auto p-6 custom-scrollbar">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
              <div>
                <CardTitle>Loading pipeline</CardTitle>
                <CardDescription>Preparing jobs and logs for {project?.title ?? projectId ?? 'the current project'}.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div className="space-y-3">
              <div className="h-16 animate-pulse rounded-[var(--radius-sm)] bg-surface-low" />
              <div className="h-16 animate-pulse rounded-[var(--radius-sm)] bg-surface-low" />
              <div className="h-16 animate-pulse rounded-[var(--radius-sm)] bg-surface-low" />
            </div>
            <div className="h-[28rem] animate-pulse rounded-[var(--radius-lg)] bg-surface-low" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="h-full overflow-y-auto p-6 custom-scrollbar">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <div>
                <CardTitle>Pipeline unavailable</CardTitle>
                <CardDescription>{error}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button onClick={refresh}>
              <RefreshCcw className="h-4 w-4" />
              Retry
            </Button>
            <Badge variant="muted">scenario: {scenario}</Badge>
            <Badge variant="muted">source: {requestedSource ?? 'env default'}</Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="h-full overflow-y-auto p-6 custom-scrollbar">
        <EmptyState
          title="No jobs in the pipeline"
          description={`No pipeline jobs were returned for ${project?.title ?? projectId ?? 'this project'}. Use ?pipelineScenario=loaded to inspect the working slice.`}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <PipelineStageRail stages={stages} />
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-on-surface">Active Job Queue</h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              {project?.title ?? 'Current project'} · {jobs.length} jobs · data: {source ?? requestedSource ?? 'mock'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" onClick={refresh}>
              <RefreshCcw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto custom-scrollbar">
          <JobsTable jobs={jobs} selectedJobId={selectedJob.id} onSelectJob={setSelectedJobId} />
        </div>
      </section>
    </div>
  );
}