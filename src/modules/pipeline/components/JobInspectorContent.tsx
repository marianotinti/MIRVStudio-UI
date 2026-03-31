import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PipelineJob } from '@/modules/pipeline/types';

export function JobInspectorContent({ job }: { job: PipelineJob }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{job.type}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-on-surface-variant">
          <div className="rounded-[var(--radius-sm)] bg-surface-lowest p-3 font-mono text-xs text-on-surface">{job.id}</div>
          <div className="rounded-[var(--radius-sm)] bg-surface-lowest p-3 font-mono text-xs text-on-surface-variant">{job.log}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payload</CardTitle>
        </CardHeader>
        <CardContent className="font-mono text-xs leading-6 text-on-surface-variant">
          {'{'}
          <br />
          &nbsp;&nbsp;scene_id: "alpha_01",
          <br />
          &nbsp;&nbsp;resolution: [3840, 2160],
          <br />
          &nbsp;&nbsp;diffusion_steps: 50,
          <br />
          &nbsp;&nbsp;scheduler: "DPMSolver++"
          <br />
          {'}'}
        </CardContent>
      </Card>
    </div>
  );
}