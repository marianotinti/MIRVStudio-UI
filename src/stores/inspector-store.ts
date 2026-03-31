import type { ReactNode } from 'react';
import { create } from 'zustand';

type InspectorState = {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  content: ReactNode | null;
  setInspector: (payload: { title: string; subtitle?: string; content: ReactNode }) => void;
  clearInspector: () => void;
};

export const useInspectorStore = create<InspectorState>((set) => ({
  isOpen: false,
  title: 'Inspector',
  subtitle: undefined,
  content: null,
  setInspector: ({ title, subtitle, content }) =>
    set({
      isOpen: true,
      title,
      subtitle,
      content,
    }),
  clearInspector: () =>
    set({
      isOpen: false,
      title: 'Inspector',
      subtitle: undefined,
      content: null,
    }),
}));