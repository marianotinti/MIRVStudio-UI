import { ExternalLink, RotateCw } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PipelineJob } from '@/modules/pipeline/types';

export function JobsTable({ jobs, selectedJobId, onSelectJob }: { jobs: PipelineJob[]; selectedJobId?: string; onSelectJob: (jobId: string) => void }) {
  return (
    <div className="surface-panel overflow-hidden rounded-[var(--radius-lg)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-white/8 bg-surface-lowest/70 text-[0.68rem] uppercase tracking-[0.2em] text-on-surface-variant">
            <th className="px-4 py-3 font-medium">Job ID</th>
            <th className="px-4 py-3 font-medium">Node type</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Log tail</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8 text-sm">
          {jobs.map((job) => (
            <tr key={job.id} className={cn('cursor-pointer transition-colors hover:bg-white/3', selectedJobId === job.id && 'bg-primary/6')} onClick={() => onSelectJob(job.id)}>
              <td className="px-4 py-4 font-mono text-xs text-on-surface">{job.id}</td>
              <td className="px-4 py-4">{job.type}</td>
              <td className="px-4 py-4">
                <Badge variant={job.status === 'success' ? 'success' : job.status === 'failed' ? 'danger' : 'warning'}>{job.status}</Badge>
              </td>
              <td className="px-4 py-4 font-mono text-xs text-on-surface-variant">{job.log}</td>
              <td className="px-4 py-4 text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-on-surface-variant hover:text-on-surface">
                  {job.status === 'failed' ? <RotateCw className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}