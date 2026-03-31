import type { Project } from '@/types/project';

export type ProjectSummary = Project & {
  clientInitial: string;
  clientTone: string;
  progress: number;
  progressLabel: string;
  statusLabel: string;
  createdLabel: string;
  meta: string;
};