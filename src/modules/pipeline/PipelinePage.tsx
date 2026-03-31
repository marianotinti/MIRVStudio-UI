import { Filter, RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { PipelineStageRail } from '@/modules/pipeline/components/PipelineStageRail';
import { JobInspectorContent } from '@/modules/pipeline/components/JobInspectorContent';
import { JobsTable } from '@/modules/pipeline/components/JobsTable';
import { PipelineTerminal } from '@/modules/pipeline/components/PipelineTerminal';
import { usePipeline } from '@/modules/pipeline/hooks/use-pipeline';
import { pipelineLogsMock } from '@/modules/pipeline/mocks/pipeline.mock';
import { useInspectorStore } from '@/stores/inspector-store';
import { useUIStore } from '@/stores/ui-store';

export function PipelinePage() {
  const { stages, jobs, selectedJob, setSelectedJobId } = usePipeline();
  const setInspector = useInspectorStore((state) => state.setInspector);
  const clearInspector = useInspectorStore((state) => state.clearInspector);
  const setBottomDrawer = useUIStore((state) => state.setBottomDrawer);

  useEffect(() => {
    setInspector({
      title: 'Payload Inspector',
      subtitle: `Job ${selectedJob.id}`,
      content: <JobInspectorContent job={selectedJob} />,
    });

    setBottomDrawer({
      isOpen: true,
      title: 'Live Terminal Stream',
      content: <PipelineTerminal lines={pipelineLogsMock} />,
    });

    return () => {
      clearInspector();
      setBottomDrawer({ isOpen: false, content: null });
    };
  }, [clearInspector, selectedJob, setBottomDrawer, setInspector]);

  return (
    <div className="flex h-full overflow-hidden">
      <PipelineStageRail stages={stages} />
      <section className="flex min-w-0 flex-1 flex-col overflow-hidden p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-on-surface">Active Job Queue</h2>
            <p className="mt-1 text-sm text-on-surface-variant">Shared inspector and terminal are now owned by the shell.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
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