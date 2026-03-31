import type { Job } from '@/types/job';

export type PipelineStage = {
  id: string;
  title: string;
  status: 'complete' | 'processing' | 'pending';
  duration?: string;
};

export type PipelineJob = Job & {
  log: string;
};