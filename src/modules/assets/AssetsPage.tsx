import { Filter, Search } from 'lucide-react';
import { useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { AssetGrid } from '@/modules/assets/components/AssetGrid';
import { AssetInspectorContent } from '@/modules/assets/components/AssetInspectorContent';
import { useAssets } from '@/modules/assets/hooks/use-assets';
import { useInspectorStore } from '@/stores/inspector-store';

export function AssetsPage() {
  const { assets, selectedAsset, setSelectedAssetId } = useAssets();
  const setInspector = useInspectorStore((state) => state.setInspector);
  const clearInspector = useInspectorStore((state) => state.clearInspector);

  useEffect(() => {
    if (!selectedAsset) {
      clearInspector();
      return;
    }

    setInspector({
      title: 'Asset Inspector',
      subtitle: `AST-${selectedAsset.id.padStart(4, '0')}`,
      content: <AssetInspectorContent asset={selectedAsset} />,
    });

    return () => {
      clearInspector();
    };
  }, [clearInspector, selectedAsset, setInspector]);

  return (
    <div className="h-full overflow-y-auto p-6 custom-scrollbar">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-on-surface">Asset Library</h2>
          <p className="mt-1 text-sm text-on-surface-variant">Grid content now feeds a shared right-hand inspector instead of embedding its own sidebar.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <Input className="pl-9" placeholder="Search assets..." />
          </div>
          <button className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-sm)] border border-white/10 px-4 text-sm text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>
      <AssetGrid assets={assets} selectedAssetId={selectedAsset?.id} onSelect={setSelectedAssetId} />
    </div>
  );
}