import type { Job } from '@/types/job';

export type PipelineDataSource = 'mock' | 'api' | 'hybrid';

export type PipelineViewScenario = 'loaded' | 'empty' | 'error' | 'loading';

export type PipelineStage = {
  id: string;
  title: string;
  status: 'complete' | 'processing' | 'pending';
  duration?: string;
};

export type PipelineJob = Job & {
  log: string;
  provider?: string;
  model?: string;
  costEstimateUsd?: number;
  durationLabel?: string;
};

export type PipelineSnapshot = {
  stages: PipelineStage[];
  jobs: PipelineJob[];
  logs: string[];
  source: Exclude<PipelineDataSource, 'hybrid'> | 'fallback';
};

export type FetchPipelineOptions = {
  projectId?: string;
  source?: PipelineDataSource;
  scenario?: Exclude<PipelineViewScenario, 'loaded'>;
  signal?: AbortSignal;
};