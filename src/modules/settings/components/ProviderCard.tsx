import type { ProviderConfig } from '@/modules/settings/types';

export function ProviderCard({ provider }: { provider: ProviderConfig }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-white/8 bg-surface-low p-4">
      <div className="text-sm font-medium text-on-surface">{provider.label}</div>
      <div className="mt-1 text-xs font-mono uppercase tracking-[0.16em] text-on-surface-variant">{provider.status}</div>
    </div>
  );
}