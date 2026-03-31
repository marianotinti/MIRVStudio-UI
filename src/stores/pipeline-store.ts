import { create } from 'zustand';

type PipelineState = {
  selectedJobId: string | null;
  activeFilter: string;
  hasLiveLogsOpen: boolean;
  setSelectedJobId: (jobId: string | null) => void;
  setActiveFilter: (filter: string) => void;
  setLiveLogsOpen: (isOpen: boolean) => void;
};

export const usePipelineStore = create<PipelineState>((set) => ({
  selectedJobId: '#TX-8802',
  activeFilter: 'all',
  hasLiveLogsOpen: true,
  setSelectedJobId: (selectedJobId) => set({ selectedJobId }),
  setActiveFilter: (activeFilter) => set({ activeFilter }),
  setLiveLogsOpen: (hasLiveLogsOpen) => set({ hasLiveLogsOpen }),
}));