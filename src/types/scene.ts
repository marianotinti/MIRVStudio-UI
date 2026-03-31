export type Scene = {
  id: string;
  projectId: string;
  name: string;
  order: number;
  durationSeconds: number;
  status: 'pending' | 'processing' | 'approved';
};