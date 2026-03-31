export type ProjectStatus = 'draft' | 'queued' | 'rendering' | 'done' | 'failed';

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string;
  status: ProjectStatus;
  sceneCount: number;
  createdAt: string;
  deliveryFormat: string;
};