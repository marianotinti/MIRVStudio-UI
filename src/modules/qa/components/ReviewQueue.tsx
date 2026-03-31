import type { QAQueueItem } from '@/modules/qa/types';

export function ReviewQueue({ items }: { items: QAQueueItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-[var(--radius-sm)] border border-white/8 bg-surface-low p-3 text-sm text-on-surface">
          {item.title}
        </div>
      ))}
    </div>
  );
}