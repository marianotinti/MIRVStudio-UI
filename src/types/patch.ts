export type PatchRequest = {
  id: string;
  targetId: string;
  notes: string;
  status: 'requested' | 'applied' | 'rejected';
};