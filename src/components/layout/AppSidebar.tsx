import { Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { primaryNavigation, secondaryNavigation } from '@/config/navigation';
import { APP_VERSION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui-store';

function NavigationGroup({ items, collapsed }: { items: typeof primaryNavigation; collapsed: boolean }) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-[var(--radius-sm)] border border-transparent px-3 py-2.5 text-sm transition-colors',
                collapsed ? 'justify-center' : '',
                isActive
                  ? 'border-primary/20 bg-primary/10 text-primary'
                  : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed ? <span>{item.label}</span> : null}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function AppSidebar() {
  const isCollapsed = useUIStore((state) => state.isSidebarCollapsed);

  return (
    <aside className={cn('flex h-screen shrink-0 flex-col border-r border-white/8 bg-surface-lowest/90 px-3 py-4 transition-all', isCollapsed ? 'w-20' : 'w-72')}>
      <div className={cn('mb-8 flex items-center gap-3 px-2', isCollapsed ? 'justify-center' : '')}>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>
        {!isCollapsed ? (
          <div>
            <h1 className="font-mono text-sm font-semibold uppercase tracking-[0.22em] text-primary">MIRV Studio</h1>
            <p className="mt-1 text-xs text-on-surface-variant">Frontend control surface</p>
          </div>
        ) : null}
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar px-1">
        <NavigationGroup items={primaryNavigation} collapsed={isCollapsed} />
      </div>

      <div className="space-y-4 border-t border-white/8 pt-4">
        <NavigationGroup items={secondaryNavigation} collapsed={isCollapsed} />
        {!isCollapsed ? (
          <div className="rounded-[var(--radius-md)] border border-white/8 bg-white/4 p-3 text-xs text-on-surface-variant">
            <div className="font-mono uppercase tracking-[0.18em] text-primary">{APP_VERSION}</div>
            <p className="mt-2">Dashboard shell staged for projects, pipeline and assets.</p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}