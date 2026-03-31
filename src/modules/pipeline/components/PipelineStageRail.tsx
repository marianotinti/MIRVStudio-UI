import { cn } from '@/lib/utils';
import type { PipelineStage } from '@/modules/pipeline/types';

export function PipelineStageRail({ stages }: { stages: PipelineStage[] }) {
  return (
    <section className="w-72 shrink-0 border-r border-white/8 bg-surface-lowest p-5">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-on-surface-variant">DAG execution</h3>
        <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary">Auto</span>
      </div>
      <div className="space-y-5">
        {stages.map((stage, index) => {
          const isComplete = stage.status === 'complete';
          const isProcessing = stage.status === 'processing';

          return (
            <div key={stage.id} className="relative pl-6">
              <div
                className={cn(
                  'absolute left-0 top-1.5 h-3 w-3 rounded-full border',
                  isComplete && 'border-emerald-500 bg-emerald-500',
                  isProcessing && 'border-amber-400 bg-amber-400 animate-pulse',
                  stage.status === 'pending' && 'border-white/20 bg-transparent',
                )}
              />
              {index < stages.length - 1 ? <div className="absolute left-[5px] top-5 h-[calc(100%+0.8rem)] w-px bg-white/10" /> : null}
              <div>
                <div className={cn('text-sm font-medium', isProcessing ? 'text-primary' : 'text-on-surface')}>{stage.title}</div>
                <div className="mt-1 text-[0.68rem] font-mono uppercase tracking-[0.16em] text-on-surface-variant">
                  {stage.status}
                  {stage.duration ? ` • ${stage.duration}` : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}