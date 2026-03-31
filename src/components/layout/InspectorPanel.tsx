import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useInspectorStore } from '@/stores/inspector-store';

export function InspectorPanel() {
  const { isOpen, title, subtitle, content, clearInspector } = useInspectorStore();

  if (!isOpen || !content) {
    return null;
  }

  return (
    <aside className="animate-enter flex w-[22rem] shrink-0 flex-col border-l border-white/8 bg-surface-low/90">
      <div className="flex items-start justify-between border-b border-white/8 px-5 py-4">
        <div>
          <h3 className="text-sm font-semibold text-on-surface">{title}</h3>
          {subtitle ? <p className="mt-1 text-xs font-mono text-on-surface-variant">{subtitle}</p> : null}
        </div>
        <Button variant="ghost" size="icon" onClick={clearInspector} className="text-on-surface-variant hover:text-on-surface">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-5 custom-scrollbar">{content}</div>
    </aside>
  );
}