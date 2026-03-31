import type { Project } from '@/types/project';

export type ProjectProgressSnapshot = {
  progress: number;
  progressLabel: string;
};

export type ProjectSummary = Project & ProjectProgressSnapshot & {
  createdLabel: string;
  meta: string;
};