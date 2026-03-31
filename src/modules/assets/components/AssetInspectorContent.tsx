import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AssetSummary } from '@/modules/assets/types';

export function AssetInspectorContent({ asset }: { asset: AssetSummary }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{asset.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-on-surface-variant">
          <div className="aspect-square overflow-hidden rounded-[var(--radius-sm)] bg-surface-lowest">
            {asset.url ? <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-on-surface-variant">No preview</div>}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Type</span><span className="font-mono text-on-surface">{asset.kind}</span></div>
            <div className="flex justify-between"><span>Status</span><span className="font-mono text-on-surface">{asset.statusLabel}</span></div>
            <div className="flex justify-between"><span>Size</span><span className="font-mono text-on-surface">{asset.sizeLabel}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}