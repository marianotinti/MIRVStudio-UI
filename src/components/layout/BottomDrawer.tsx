import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/ui-store';

export function BottomDrawer() {
  const { isBottomDrawerOpen, bottomDrawerContent, bottomDrawerTitle, setBottomDrawer } = useUIStore();

  if (!isBottomDrawerOpen || !bottomDrawerContent) {
    return null;
  }

  return (
    <div className="animate-enter h-64 shrink-0 border-t border-white/8 bg-surface-lowest/90">
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
        <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-primary">{bottomDrawerTitle}</div>
        <Button variant="ghost" size="icon" onClick={() => setBottomDrawer({ isOpen: false })} className="h-8 w-8 text-on-surface-variant hover:text-on-surface">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="h-[calc(100%-3rem)] overflow-y-auto p-5 custom-scrollbar">{bottomDrawerContent}</div>
    </div>
  );
}