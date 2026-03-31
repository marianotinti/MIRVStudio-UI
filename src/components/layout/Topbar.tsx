import { Bell, Cloud, Menu, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouteTitle } from '@/hooks/use-route-title';
import { useUIStore } from '@/stores/ui-store';

export function Topbar() {
  const title = useRouteTitle();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-white/8 bg-background/70 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-on-surface-variant hover:text-on-surface">
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.24em] text-primary">
            {title}
          </span>
          <p className="mt-1 text-sm text-on-surface-variant">MIRV Studio application shell</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
          <Input placeholder="Search projects, jobs or assets..." className="w-72 pl-9" />
        </div>
        <div className="flex items-center gap-3 border-l border-white/8 pl-4">
          <Button variant="ghost" size="icon" className="text-on-surface-variant hover:text-on-surface">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary hover:text-primary">
            <Cloud className="h-5 w-5" />
          </Button>
          <Button size="sm" className="ml-2">
            Export
          </Button>
        </div>
      </div>
    </header>
  );
}
