import type { QAQueueItem } from '@/modules/qa/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ReviewQueueProps = {
  items: QAQueueItem[];
  selectedId?: string;
  onSelect: (itemId: string) => void;
};

function getStatusVariant(status: QAQueueItem['status']) {
  if (status === 'approved') {
    return 'success';
  }

  if (status === 'rejected') {
    return 'danger';
  }

  if (status === 'changes_requested') {
    return 'warning';
  }

  return 'default';
}

export function ReviewQueue({ items, selectedId, onSelect }: ReviewQueueProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className={cn(
            'w-full rounded-[var(--radius-sm)] border p-3 text-left transition-colors',
            selectedId === item.id
              ? 'border-primary/40 bg-surface text-on-surface shadow-[0_0_0_1px_rgba(99,102,241,0.15)]'
              : 'border-white/8 bg-surface-low text-on-surface hover:border-white/15 hover:bg-surface',
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[0.65rem] font-mono uppercase tracking-[0.18em] text-on-surface-variant">{item.queueLabel}</div>
              <div className="mt-1 truncate text-sm font-semibold">{item.title}</div>
              <div className="mt-1 line-clamp-2 text-xs text-on-surface-variant">{item.summary}</div>
            </div>
            <Badge variant={getStatusVariant(item.status)}>{item.status.replace('_', ' ')}</Badge>
          </div>
        </button>
      ))}
    </div>
  );
}