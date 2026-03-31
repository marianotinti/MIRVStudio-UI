import type { Project } from '@/types/project';

export const projectsMock: Project[] = [
  {
    id: '#MV-092',
    slug: 'summer-campaign-24',
    title: "Summer Campaign '24",
    client: 'Mercado Libre',
    status: 'done',
    sceneCount: 12,
    deliveryFormat: '4K HDR',
    createdAt: '2023-08-12',
  },
  {
    id: '#MV-104',
    slug: 'alpha',
    title: 'In-Flight Experience',
    client: 'LATAM Airlines',
    status: 'rendering',
    sceneCount: 48,
    deliveryFormat: 'Dynamic 1080p',
    createdAt: '2023-08-24',
  },
  {
    id: '#MV-112',
    slug: 'brand-identity-void',
    title: 'Brand Identity Void',
    client: 'Nike Global',
    status: 'failed',
    sceneCount: 8,
    deliveryFormat: 'Raw V-Ray',
    createdAt: '2023-08-26',
  },
  {
    id: '#MV-115',
    slug: 'product-macro-reveal',
    title: 'Product Macro Reveal',
    client: 'Apple Inc.',
    status: 'queued',
    sceneCount: 5,
    deliveryFormat: '8K Textures',
    createdAt: '2023-08-29',
  },
];