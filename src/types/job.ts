export type JobStatus = 'running' | 'success' | 'failed' | 'queued';

export type Job = {
  id: string;
  sceneId: string;
  type: string;
  status: JobStatus;
  lastLogLine: string;
  updatedAt: string;
};