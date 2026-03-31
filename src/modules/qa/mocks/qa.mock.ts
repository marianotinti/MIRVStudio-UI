import type { QAQueueItem } from '@/modules/qa/types';

export const qaQueueMock: QAQueueItem[] = [
	{
		id: 'qa-001',
		projectId: 'alpha',
		queueLabel: 'SCN_01_RENDER',
		title: 'Cyberpunk Cityscape V2',
		summary: 'Needs final approval against the previous approved still before batch export.',
		status: 'pending',
		assetKind: 'image',
		provider: 'fal',
		model: 'flux-pro/v1.1',
		submittedAt: '2026-03-31T14:03:00.000Z',
		updatedAt: '2026-03-31T14:12:00.000Z',
		currentAssetUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1600&auto=format&fit=crop',
		referenceAssetUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop',
		currentVersionLabel: 'v2.0 review',
		referenceVersionLabel: 'v1.0 approved',
		promptLabel: 'Neon dusk skyline, wet asphalt reflections, cinematic haze.',
		tags: ['pending', 'image', 'hero'],
	},
	{
		id: 'qa-002',
		projectId: 'alpha',
		queueLabel: 'CHAR_MODEL_V2',
		title: 'Hero Character Turnaround',
		summary: 'Check lighting continuity and skin tone after upscale pass.',
		status: 'changes_requested',
		assetKind: 'video',
		provider: 'internal',
		model: 'mirv/upscale-v2',
		submittedAt: '2026-03-31T12:40:00.000Z',
		updatedAt: '2026-03-31T13:05:00.000Z',
		currentAssetUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
		referenceAssetUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1600&auto=format&fit=crop',
		currentVersionLabel: 'v4.2 review',
		referenceVersionLabel: 'v4.0 approved',
		durationLabel: '00:14',
		promptLabel: 'Neutral studio lighting, premium footwear reveal, slow orbit camera.',
		tags: ['video', 'changes requested'],
		reviewerNote: 'Reduce hotspot on the cheek and rebalance the key light.',
	},
	{
		id: 'qa-003',
		projectId: 'summer-campaign-24',
		queueLabel: 'PACKSHOT_A',
		title: 'Packaging Packshot Final',
		summary: 'Ready for approval after texture cleanup and color normalization.',
		status: 'approved',
		assetKind: 'image',
		provider: 'fal',
		model: 'flux-dev',
		submittedAt: '2026-03-30T18:20:00.000Z',
		updatedAt: '2026-03-30T19:05:00.000Z',
		currentAssetUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop',
		currentVersionLabel: 'v1.3 approved',
		promptLabel: 'Packshot on warm neutral sweep, crisp edge light, catalog finish.',
		tags: ['approved', 'packshot'],
		reviewerNote: 'Approved for delivery.',
	},
];

export function getQAQueueMock(projectId?: string) {
	if (!projectId) {
		return qaQueueMock;
	}

	return qaQueueMock.filter((item) => item.projectId === projectId);
}