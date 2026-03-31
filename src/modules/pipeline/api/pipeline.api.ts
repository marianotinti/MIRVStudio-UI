import { pipelineJobsMock, pipelineStagesMock } from '@/modules/pipeline/mocks/pipeline.mock';

export async function fetchPipelineData() {
  return Promise.resolve({ stages: pipelineStagesMock, jobs: pipelineJobsMock });
}