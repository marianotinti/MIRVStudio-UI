import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchQAQueue } from '@/modules/qa/api/qa.api';
import type { QADataSource, QAQueueItem, QAQueueResponse, QAViewScenario } from '@/modules/qa/types';

type UseQAOptions = {
  projectId?: string;
  source?: QADataSource;
  scenario?: QAViewScenario;
};

type UseQAState = {
  queue: QAQueueItem[];
  status: 'loading' | 'success' | 'error';
  error: string | null;
  source: QAQueueResponse['source'] | null;
};

export function useQA({ projectId, source, scenario = 'loaded' }: UseQAOptions = {}) {
  const [state, setState] = useState<UseQAState>({
    queue: [],
    status: 'loading',
    error: null,
    source: null,
  });

  const loadQueue = useCallback(() => {
    if (scenario === 'loading') {
      setState((current) => ({
        ...current,
        status: 'loading',
        error: null,
      }));

      return () => undefined;
    }

    const controller = new AbortController();

    setState((current) => ({
      ...current,
      status: 'loading',
      error: null,
    }));

    fetchQAQueue({
      projectId,
      source,
      scenario: scenario === 'loaded' ? undefined : scenario,
      signal: controller.signal,
    })
      .then((response) => {
        setState({
          queue: response.items,
          source: response.source,
          status: 'success',
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          queue: [],
          source: null,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error while loading the review queue.',
        });
      });

    return () => controller.abort();
  }, [projectId, scenario, source]);

  useEffect(() => loadQueue(), [loadQueue]);

  const refresh = useCallback(() => loadQueue(), [loadQueue]);

  return useMemo(
    () => ({
      queue: state.queue,
      status: state.status,
      error: state.error,
      source: state.source,
      isEmpty: state.status === 'success' && state.queue.length === 0,
      refresh,
    }),
    [refresh, state.error, state.queue, state.source, state.status],
  );
}