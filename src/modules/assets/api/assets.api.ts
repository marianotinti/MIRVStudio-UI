import { assetsMock } from '@/modules/assets/mocks/assets.mock';

export async function fetchAssets() {
  return Promise.resolve(assetsMock);
}