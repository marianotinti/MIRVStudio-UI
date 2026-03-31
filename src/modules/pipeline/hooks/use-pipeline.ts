import { useMemo } from 'react';

import { pipelineJobsMock, pipelineStagesMock } from '@/modules/pipeline/mocks/pipeline.mock';
import { usePipelineStore } from '@/stores/pipeline-store';

export function usePipeline() {
  const selectedJobId = usePipelineStore((state) => state.selectedJobId);
  const setSelectedJobId = usePipelineStore((state) => state.setSelectedJobId);

  const selectedJob = useMemo(
    () => pipelineJobsMock.find((job) => job.id === selectedJobId) ?? pipelineJobsMock[0],
    [selectedJobId],
  );

  return {
    stages: pipelineStagesMock,
    jobs: pipelineJobsMock,
    selectedJob,
    setSelectedJobId,
  };
}