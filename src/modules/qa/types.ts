export type QAQueueItem = {
  id: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
};