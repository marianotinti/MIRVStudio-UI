export type PipelineStage = {
  id: string;
  title: string;
  status: 'complete' | 'processing' | 'pending';
  duration?: string;
};

export type PipelineJob = {
  id: string;
  type: string;
  status: 'running' | 'success' | 'failed';
  log: string;
};