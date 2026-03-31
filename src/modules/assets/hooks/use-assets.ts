import { useMemo, useState } from 'react';

import { assetsMock } from '@/modules/assets/mocks/assets.mock';

export function useAssets() {
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(assetsMock[0]?.id ?? null);

  const selectedAsset = useMemo(
    () => assetsMock.find((asset) => asset.id === selectedAssetId) ?? assetsMock[0],
    [selectedAssetId],
  );

  return {
    assets: assetsMock,
    selectedAsset,
    setSelectedAssetId,
  };
}