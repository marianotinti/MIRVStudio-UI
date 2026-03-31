import type { Asset } from '@/types/asset';

export type AssetSummary = Asset & {
  dateLabel: string;
  statusLabel: string;
  url?: string;
};