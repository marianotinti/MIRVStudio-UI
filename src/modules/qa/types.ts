export type QADataSource = 'mock' | 'api' | 'hybrid';

export type QAViewScenario = 'loaded' | 'empty' | 'error' | 'loading';

export type ReviewDecision = 'approve' | 'request_patch' | 'reject';

export type QAQueueStatus = 'pending' | 'changes_requested' | 'approved' | 'rejected';

export type QAAssetKind = 'image' | 'video';

export type QAQueueItem = {
  id: string;
  projectId: string;
  queueLabel: string;
  title: string;
  summary: string;
  status: QAQueueStatus;
  assetKind: QAAssetKind;
  provider: string;
  model: string;
  submittedAt: string;
  updatedAt: string;
  currentAssetUrl: string;
  referenceAssetUrl?: string;
  currentVersionLabel: string;
  referenceVersionLabel?: string;
  durationLabel?: string;
  promptLabel: string;
  tags: string[];
  reviewerNote?: string;
};

export type QAQueueResponse = {
  items: QAQueueItem[];
  source: Exclude<QADataSource, 'hybrid'> | 'fallback';
};

export type FetchQAQueueOptions = {
  projectId?: string;
  source?: QADataSource;
  scenario?: Exclude<QAViewScenario, 'loaded'>;
  signal?: AbortSignal;
};