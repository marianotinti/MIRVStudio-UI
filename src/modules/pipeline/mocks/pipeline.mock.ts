import type { PipelineJob, PipelineSnapshot, PipelineStage } from '@/modules/pipeline/types';

export const pipelineStagesMock: PipelineStage[] = [
  { id: 'creative-concept', title: 'Creative Concept', status: 'complete', duration: '12s' },
  { id: 'visual-scripting', title: 'Visual Scripting', status: 'complete', duration: '0.4s' },
  { id: 'scene-synthesis', title: 'Scene Synthesis', status: 'processing' },
  { id: 'mesh-gen', title: 'Mesh Gen', status: 'pending' },
  { id: 'texturing', title: 'PBR Texturing', status: 'pending' },
];

export const pipelineJobsMock: PipelineJob[] = [
  {
    id: '#TX-8802',
    sceneId: 'scene-alpha-01',
    type: 'Visual Synthesis',
    status: 'running',
    lastLogLine: '[14:02:11] Starting tensor allocation for scene_01...',
    updatedAt: '2026-03-31T14:15:12Z',
    log: '[14:02:11] Starting tensor allocation for scene_01...',
  },
  {
    id: '#TX-8801',
    sceneId: 'scene-alpha-01',
    type: 'Logic Parser',
    status: 'success',
    lastLogLine: '[14:00:04] Logic tree validated. Exiting 0.',
    updatedAt: '2026-03-31T14:00:04Z',
    log: '[14:00:04] Logic tree validated. Exiting 0.',
  },
  {
    id: '#TX-8799',
    sceneId: 'scene-alpha-02',
    type: 'Prompt Encoder',
    status: 'failed',
    lastLogLine: 'ERROR: Connection timeout on port 8080 (Gateway).',
    updatedAt: '2026-03-31T13:58:44Z',
    log: 'ERROR: Connection timeout on port 8080 (Gateway).',
  },
];

export const pipelineLogsMock = [
  '[14:15:01] CORE: Initializing DAG worker 12...',
  '[14:15:02] CORE: Worker 12 registered to Node #TX-8802',
  '[14:15:04] WARN: Memory pressure at 82% on cluster C-1',
  '[14:15:08] JOB_STREAM: Pulling layer 4/18 - Textures (2GB)',
  '[14:15:10] JOB_STREAM: Layer 4 pull complete. Decompressing...',
  '[14:15:12] CORE: Running Scene Synthesis logic chain...',
];

export function getPipelineSnapshotMock(projectId?: string): Omit<PipelineSnapshot, 'source'> {
  const scopedJobs =
    projectId == null
      ? pipelineJobsMock
      : pipelineJobsMock.map((job) => ({
          ...job,
          sceneId: `${projectId}-${job.sceneId}`,
        }));

  return {
    stages: pipelineStagesMock,
    jobs: scopedJobs,
    logs: pipelineLogsMock,
  };
}