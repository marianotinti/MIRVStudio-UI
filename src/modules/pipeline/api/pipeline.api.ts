import { apiClient } from '@/lib/api-client';
import { getPipelineSnapshotMock } from '@/modules/pipeline/mocks/pipeline.mock';
import type { FetchPipelineOptions, PipelineDataSource, PipelineSnapshot } from '@/modules/pipeline/types';

const env: Record<string, string | undefined> =
  ((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {}) as Record<string, string | undefined>;

const PIPELINE_SOURCE = (env.VITE_PIPELINE_SOURCE as PipelineDataSource | undefined) ?? 'hybrid';
const PIPELINE_ENDPOINT = env.VITE_PIPELINE_ENDPOINT ?? '/api/pipeline';
const PIPELINE_MOCK_DELAY_MS = Number(env.VITE_PIPELINE_MOCK_DELAY_MS ?? 500);

function delay(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, ms);

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException('The operation was aborted.', 'AbortError'));
      },
      { once: true },
    );
  });
}

function buildMockResponse(projectId?: string): PipelineSnapshot {
  return {
    ...getPipelineSnapshotMock(projectId),
    source: 'mock',
  };
}

function normalizeResponse(payload: PipelineSnapshot | Omit<PipelineSnapshot, 'source'>): PipelineSnapshot {
  if ('source' in payload) {
    return payload;
  }

  return {
    ...payload,
    source: 'api',
  };
}

export async function fetchPipelineData(options: FetchPipelineOptions = {}): Promise<PipelineSnapshot> {
  const source = options.source ?? PIPELINE_SOURCE;

  if (options.scenario === 'error') {
    await delay(Math.min(PIPELINE_MOCK_DELAY_MS, 200), options.signal);
    throw new Error('Unable to load the pipeline for this project.');
  }

  if (options.scenario === 'empty') {
    await delay(PIPELINE_MOCK_DELAY_MS, options.signal);

    return {
      stages: [],
      jobs: [],
      logs: [],
      source: source === 'api' ? 'api' : 'mock',
    };
  }

  if (source === 'mock') {
    await delay(PIPELINE_MOCK_DELAY_MS, options.signal);
    return buildMockResponse(options.projectId);
  }

  const searchParams = new URLSearchParams();

  if (options.projectId) {
    searchParams.set('projectId', options.projectId);
  }

  const requestPath = searchParams.size > 0 ? `${PIPELINE_ENDPOINT}?${searchParams.toString()}` : PIPELINE_ENDPOINT;

  try {
    const response = await apiClient<PipelineSnapshot | Omit<PipelineSnapshot, 'source'>>(requestPath, { signal: options.signal });
    return normalizeResponse(response);
  } catch (error) {
    if (source === 'api') {
      throw error;
    }

    await delay(Math.min(PIPELINE_MOCK_DELAY_MS, 250), options.signal);

    return {
      ...buildMockResponse(options.projectId),
      source: 'fallback',
    };
  }
}