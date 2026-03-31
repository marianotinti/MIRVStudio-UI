import { useCreateProjectStore } from '@/stores/create-project-store';

export function useCreateProject() {
  return useCreateProjectStore();
}