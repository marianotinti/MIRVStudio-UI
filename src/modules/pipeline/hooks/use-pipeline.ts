import { useCallback, useEffect, useMemo, useState } from 'react';

import { fetchPipelineData } from '@/modules/pipeline/api/pipeline.api';
import type { PipelineDataSource, PipelineSnapshot, PipelineViewScenario } from '@/modules/pipeline/types';
import { usePipelineStore } from '@/stores/pipeline-store';

type UsePipelineOptions = {
  projectId?: string;
  source?: PipelineDataSource;
  scenario?: PipelineViewScenario;
};

type UsePipelineState = {
  stages: PipelineSnapshot['stages'];
  jobs: PipelineSnapshot['jobs'];
  logs: PipelineSnapshot['logs'];
  status: 'loading' | 'success' | 'error';
  error: string | null;
  source: PipelineSnapshot['source'] | null;
};

export function usePipeline({ projectId, source, scenario = 'loaded' }: UsePipelineOptions = {}) {
  const selectedJobId = usePipelineStore((state) => state.selectedJobId);
  const setSelectedJobId = usePipelineStore((state) => state.setSelectedJobId);
  const [state, setState] = useState<UsePipelineState>({
    stages: [],
    jobs: [],
    logs: [],
    status: 'loading',
    error: null,
    source: null,
  });

  const loadPipeline = useCallback(() => {
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

    fetchPipelineData({
      projectId,
      source,
      scenario: scenario === 'loaded' ? undefined : scenario,
      signal: controller.signal,
    })
      .then((response) => {
        setState({
          stages: response.stages,
          jobs: response.jobs,
          logs: response.logs,
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
          stages: [],
          jobs: [],
          logs: [],
          source: null,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error while loading the pipeline.',
        });
      });

    return () => controller.abort();
  }, [projectId, scenario, source]);

  useEffect(() => loadPipeline(), [loadPipeline]);

  useEffect(() => {
    if (state.status !== 'success') {
      return;
    }

    if (state.jobs.length === 0) {
      setSelectedJobId(null);
      return;
    }

    if (!selectedJobId || !state.jobs.some((job) => job.id === selectedJobId)) {
      setSelectedJobId(state.jobs[0].id);
    }
  }, [selectedJobId, setSelectedJobId, state.jobs, state.status]);

  const selectedJob = useMemo(
    () => state.jobs.find((job) => job.id === selectedJobId) ?? state.jobs[0],
    [selectedJobId, state.jobs],
  );

  return {
    stages: state.stages,
    jobs: state.jobs,
    logs: state.logs,
    selectedJob,
    status: state.status,
    error: state.error,
    source: state.source,
    isEmpty: state.status === 'success' && state.jobs.length === 0,
    refresh: loadPipeline,
    setSelectedJobId,
  };
}