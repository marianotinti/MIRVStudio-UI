import { apiClient } from '@/lib/api-client';
import { getQAQueueMock } from '@/modules/qa/mocks/qa.mock';
import type { FetchQAQueueOptions, QADataSource, QAQueueItem, QAQueueResponse } from '@/modules/qa/types';

const env: Record<string, string | undefined> =
  ((import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {}) as Record<string, string | undefined>;

const QA_SOURCE = (env.VITE_QA_SOURCE as QADataSource | undefined) ?? 'hybrid';
const QA_ENDPOINT = env.VITE_QA_ENDPOINT ?? '/api/qa/queue';
const QA_MOCK_DELAY_MS = Number(env.VITE_QA_MOCK_DELAY_MS ?? 450);

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

function normalizeResponse(payload: QAQueueResponse | QAQueueItem[]): QAQueueResponse {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      source: 'api',
    };
  }

  return payload;
}

function buildMockResponse(projectId?: string): QAQueueResponse {
  return {
    items: getQAQueueMock(projectId),
    source: 'mock',
  };
}

export async function fetchQAQueue(options: FetchQAQueueOptions = {}): Promise<QAQueueResponse> {
  const source = options.source ?? QA_SOURCE;

  if (options.scenario === 'error') {
    await delay(Math.min(QA_MOCK_DELAY_MS, 200), options.signal);
    throw new Error('Unable to load the review queue for this project.');
  }

  if (options.scenario === 'empty') {
    await delay(QA_MOCK_DELAY_MS, options.signal);
    return {
      items: [],
      source: source === 'api' ? 'api' : 'mock',
    };
  }

  if (source === 'mock') {
    await delay(QA_MOCK_DELAY_MS, options.signal);
    return buildMockResponse(options.projectId);
  }

  const searchParams = new URLSearchParams();

  if (options.projectId) {
    searchParams.set('projectId', options.projectId);
  }

  const requestPath = searchParams.size > 0 ? `${QA_ENDPOINT}?${searchParams.toString()}` : QA_ENDPOINT;

  try {
    const response = await apiClient<QAQueueResponse | QAQueueItem[]>(requestPath, { signal: options.signal });
    return normalizeResponse(response);
  } catch (error) {
    if (source === 'api') {
      throw error;
    }

    await delay(Math.min(QA_MOCK_DELAY_MS, 250), options.signal);

    return {
      ...buildMockResponse(options.projectId),
      source: 'fallback',
    };
  }
}