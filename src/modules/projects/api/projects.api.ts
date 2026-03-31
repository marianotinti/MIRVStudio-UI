import { projectsMock } from '@/modules/projects/mocks/projects.mock';

export async function fetchProjects() {
  return Promise.resolve([...projectsMock]);
}