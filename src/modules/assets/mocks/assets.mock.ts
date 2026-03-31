import type { AssetSummary } from '@/modules/assets/types';

export const assetsMock: AssetSummary[] = [
  { id: '1', projectId: 'alpha', name: 'Cyberpunk_City_01.png', kind: 'image', status: 'approved', statusLabel: 'Approved', sizeLabel: '4.2 MB', dateLabel: '2 hours ago', url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop' },
  { id: '2', projectId: 'alpha', name: 'Neon_Car_Chase.mp4', kind: 'video', status: 'pending', statusLabel: 'Pending', sizeLabel: '124 MB', dateLabel: '5 hours ago', url: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2574&auto=format&fit=crop' },
  { id: '3', projectId: 'alpha', name: 'Synthwave_Beat.wav', kind: 'audio', status: 'approved', statusLabel: 'Approved', sizeLabel: '12 MB', dateLabel: '1 day ago' },
  { id: '4', projectId: 'alpha', name: 'Character_Ref_V2.jpg', kind: 'image', status: 'rejected', statusLabel: 'Rejected', sizeLabel: '2.1 MB', dateLabel: '2 days ago', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop' },
];