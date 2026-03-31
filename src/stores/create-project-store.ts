import { create } from 'zustand';

type CreateProjectState = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: (maxSteps: number) => void;
  previousStep: () => void;
};

export const useCreateProjectStore = create<CreateProjectState>((set) => ({
  currentStep: 0,
  setCurrentStep: (currentStep) => set({ currentStep }),
  nextStep: (maxSteps) => set((state) => ({ currentStep: Math.min(state.currentStep + 1, maxSteps - 1) })),
  previousStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
}));