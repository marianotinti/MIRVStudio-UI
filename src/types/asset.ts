export type AssetKind = 'image' | 'video' | 'audio' | 'document';

export type Asset = {
  id: string;
  projectId: string;
  name: string;
  kind: AssetKind;
  sizeLabel: string;
  status: 'approved' | 'pending' | 'rejected';
  sourceUrl?: string;
};