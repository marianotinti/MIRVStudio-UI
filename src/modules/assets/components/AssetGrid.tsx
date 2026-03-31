import { CheckCircle2, Clock, FileBox, Image as ImageIcon, Music, Video, XCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { AssetSummary } from '@/modules/assets/types';

function AssetStatus({ status }: { status: AssetSummary['status'] }) {
  if (status === 'approved') {
    return <div className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-1 text-[0.6rem] font-bold uppercase text-white"><CheckCircle2 className="h-3 w-3" /> Approved</div>;
  }

  if (status === 'pending') {
    return <div className="flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-1 text-[0.6rem] font-bold uppercase text-white"><Clock className="h-3 w-3" /> Pending</div>;
  }

  return <div className="flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-1 text-[0.6rem] font-bold uppercase text-white"><XCircle className="h-3 w-3" /> Rejected</div>;
}

export function AssetGrid({ assets, selectedAssetId, onSelect }: { assets: AssetSummary[]; selectedAssetId?: string | null; onSelect: (assetId: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {assets.map((asset) => (
        <article key={asset.id} onClick={() => onSelect(asset.id)} className={cn('overflow-hidden rounded-[var(--radius-lg)] border bg-surface-low transition-colors', selectedAssetId === asset.id ? 'border-primary ring-1 ring-primary/60' : 'border-white/8 hover:border-white/16')}>
          <div className="relative aspect-video bg-surface-highest">
            {asset.kind === 'image' || asset.kind === 'video' ? (
              <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
            ) : asset.kind === 'audio' ? (
              <div className="flex h-full items-center justify-center"><Music className="h-8 w-8 text-on-surface-variant" /></div>
            ) : (
              <div className="flex h-full items-center justify-center"><FileBox className="h-8 w-8 text-on-surface-variant" /></div>
            )}
            <div className="absolute left-3 top-3"><AssetStatus status={asset.status} /></div>
            <div className="absolute bottom-3 right-3 rounded-full bg-black/40 p-2 text-white/80">
              {asset.kind === 'image' ? <ImageIcon className="h-4 w-4" /> : asset.kind === 'video' ? <Video className="h-4 w-4" /> : <Music className="h-4 w-4" />}
            </div>
          </div>
          <div className="p-4">
            <h3 className="truncate text-sm font-medium text-on-surface">{asset.name}</h3>
            <div className="mt-2 flex items-center justify-between text-xs font-mono text-on-surface-variant">
              <span>{asset.sizeLabel}</span>
              <span>{asset.dateLabel}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}