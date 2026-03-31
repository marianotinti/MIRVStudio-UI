import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Maximize,
  MessageSquare,
  Play,
  RefreshCcw,
  SplitSquareHorizontal,
  XCircle,
} from 'lucide-react';

import { EmptyState } from '@/components/shared/EmptyState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ReviewQueue } from '@/modules/qa/components/ReviewQueue';
import { useQA } from '@/modules/qa/hooks/use-qa';
import type { QADataSource, QAQueueItem, ReviewDecision, QAViewScenario } from '@/modules/qa/types';
import { useProjects } from '@/modules/projects/hooks/use-projects';
import { cn } from '@/lib/utils';

function getScenario(searchParams: URLSearchParams): QAViewScenario {
  const value = searchParams.get('qaScenario');

  if (value === 'empty' || value === 'error' || value === 'loading') {
    return value;
  }

  return 'loaded';
}

function getSource(searchParams: URLSearchParams): QADataSource | undefined {
  const value = searchParams.get('qaSource');

  if (value === 'mock' || value === 'api' || value === 'hybrid') {
    return value;
  }

  return undefined;
}

function getDecisionStatus(decision: ReviewDecision): QAQueueItem['status'] {
  if (decision === 'approve') {
    return 'approved';
  }

  if (decision === 'reject') {
    return 'rejected';
  }

  return 'changes_requested';
}

function formatRelativeTime(iso: string) {
  const deltaMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.max(1, Math.round(deltaMs / 60000));

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  return `${Math.round(hours / 24)}d ago`;
}

export function QAView() {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const scenario = getScenario(searchParams);
  const requestedSource = getSource(searchParams);
  const { project } = useProjects(projectId);
  const { queue: remoteQueue, status, error, source, isEmpty, refresh } = useQA({
    projectId,
    scenario,
    source: requestedSource,
  });
  const [viewMode, setViewMode] = useState<'split' | 'single'>('split');
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [feedback, setFeedback] = useState('');
  const [queue, setQueue] = useState<QAQueueItem[]>([]);

  useEffect(() => {
    if (status === 'success') {
      setQueue(remoteQueue);
      setSelectedId((current) => {
        if (current && remoteQueue.some((item) => item.id === current)) {
          return current;
        }

        return remoteQueue[0]?.id;
      });
    }
  }, [remoteQueue, status]);

  const selectedItem = useMemo(() => queue.find((item) => item.id === selectedId) ?? queue[0], [queue, selectedId]);
  const pendingCount = useMemo(() => queue.filter((item) => item.status === 'pending' || item.status === 'changes_requested').length, [queue]);
  const recentDecisions = useMemo(
    () => [...queue].filter((item) => item.status === 'approved' || item.status === 'rejected').sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)).slice(0, 3),
    [queue],
  );

  function applyDecision(decision: ReviewDecision) {
    if (!selectedItem) {
      return;
    }

    const nextStatus = getDecisionStatus(decision);
    const note = feedback.trim();

    setQueue((current) =>
      current.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
              reviewerNote: note || item.reviewerNote,
            }
          : item,
      ),
    );

    if (decision !== 'approve') {
      setFeedback('');
    }
  }

  if (status === 'loading') {
    return (
      <div className="h-full overflow-y-auto p-6 custom-scrollbar">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
              <div>
                <CardTitle>Loading review queue</CardTitle>
                <CardDescription>Preparing QA items for {project?.title ?? projectId ?? 'the current project'}.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
            <div className="space-y-3">
              <div className="h-20 animate-pulse rounded-[var(--radius-sm)] bg-surface-low" />
              <div className="h-20 animate-pulse rounded-[var(--radius-sm)] bg-surface-low" />
              <div className="h-20 animate-pulse rounded-[var(--radius-sm)] bg-surface-low" />
            </div>
            <div className="h-[28rem] animate-pulse rounded-[var(--radius-lg)] bg-surface-low" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="h-full overflow-y-auto p-6 custom-scrollbar">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400" />
              <div>
                <CardTitle>Review queue unavailable</CardTitle>
                <CardDescription>{error}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Button onClick={refresh}>
              <RefreshCcw className="h-4 w-4" />
              Retry
            </Button>
            <Badge variant="muted">scenario: {scenario}</Badge>
            <Badge variant="muted">source: {requestedSource ?? 'env default'}</Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="h-full overflow-y-auto p-6 custom-scrollbar">
        <EmptyState
          title="No items in the review queue"
          description={`No pending assets were returned for ${project?.title ?? projectId ?? 'this project'}. Use ?qaScenario=loaded to inspect the working slice.`}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/5 bg-surface px-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-sm font-semibold">Review</h2>
            <p className="text-xs text-on-surface-variant">{project?.title ?? 'Project review queue'} · {queue.length} items</p>
          </div>
          <Badge variant={pendingCount > 0 ? 'warning' : 'success'}>
            <AlertTriangle className="mr-1 h-3 w-3" />
            {pendingCount} pending reviews
          </Badge>
          <Badge variant="muted">data: {source ?? requestedSource ?? 'mock'}</Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded border border-white/10 bg-surface-low p-0.5">
            <button
              onClick={() => setViewMode('single')}
              className={cn('rounded-sm px-3 py-1 text-xs font-medium transition-colors', viewMode === 'single' ? 'bg-surface-highest text-white shadow' : 'text-white/60 hover:text-white')}
            >
              Single
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={cn(
                'flex items-center gap-1 rounded-sm px-3 py-1 text-xs font-medium transition-colors',
                viewMode === 'split' ? 'bg-surface-highest text-white shadow' : 'text-white/60 hover:text-white',
              )}
            >
              <SplitSquareHorizontal className="h-3 w-3" /> Split
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCcw className="h-3.5 w-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="flex w-80 shrink-0 flex-col border-r border-white/5 bg-surface-lowest">
          <div className="border-b border-white/5 p-4">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Review Queue</h3>
            <ReviewQueue items={queue} selectedId={selectedItem?.id} onSelect={setSelectedId} />
          </div>
          <div className="space-y-3 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Recent Decisions</h3>
            {recentDecisions.length > 0 ? (
              recentDecisions.map((item) => (
                <div key={item.id} className="rounded-[var(--radius-sm)] border border-white/8 bg-surface-low p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-xs font-medium text-on-surface">{item.title}</div>
                      <div className="mt-1 text-[0.7rem] text-on-surface-variant">{item.reviewerNote ?? 'Decision registered in this session.'}</div>
                    </div>
                    <Badge variant={item.status === 'approved' ? 'success' : 'danger'}>{item.status}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-on-surface-variant">No final decisions recorded yet.</p>
            )}
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col bg-background">
          <div className="flex flex-1 gap-6 p-6">
            {viewMode === 'split' && selectedItem?.referenceAssetUrl ? (
              <div className="flex flex-1 flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-xs font-mono uppercase tracking-widest text-white/60">Reference / Previous</div>
                  <span className="rounded bg-surface-highest px-2 py-1 text-xs">{selectedItem.referenceVersionLabel ?? 'reference'}</span>
                </div>
                <div className="group relative flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black">
                  <img src={selectedItem.referenceAssetUrl} alt="Reference" className="h-full w-full object-cover opacity-80" />
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button type="button" className="rounded bg-black/50 p-2 text-white transition-colors hover:bg-black/80">
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="flex flex-1 flex-col">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
                  {viewMode === 'split' && <ArrowRight className="w-3 h-3" />}
                  Current Render
                </div>
                <span className="rounded bg-primary/20 px-2 py-1 text-xs text-primary">{selectedItem?.currentVersionLabel}</span>
              </div>
              <div className="group relative flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-primary/30 bg-black shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                {selectedItem ? <img src={selectedItem.currentAssetUrl} alt={selectedItem.title} className="h-full w-full object-cover" /> : null}

                {selectedItem?.assetKind === 'video' ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <button type="button" className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform hover:scale-105">
                      <Play className="ml-1 h-8 w-8" />
                    </button>
                  </div>
                ) : null}

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {selectedItem?.tags.map((tag) => (
                    <Badge key={tag} variant="muted">{tag}</Badge>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button type="button" className="rounded bg-black/50 p-2 text-white transition-colors hover:bg-black/80">
                    <Maximize className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>{selectedItem?.title}</CardTitle>
                    <CardDescription>{selectedItem?.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 md:grid-cols-2">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-on-surface-variant">Provider</div>
                      <div className="mt-1 text-sm text-on-surface">{selectedItem?.provider} · {selectedItem?.model}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-on-surface-variant">Submitted</div>
                      <div className="mt-1 text-sm text-on-surface">{selectedItem ? formatRelativeTime(selectedItem.submittedAt) : '-'}</div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-xs uppercase tracking-widest text-on-surface-variant">Prompt package</div>
                      <div className="mt-1 text-sm text-on-surface">{selectedItem?.promptLabel}</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Session status</CardTitle>
                    <CardDescription>Current manual test mode for this route.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-on-surface-variant">
                    <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-surface-lowest px-3 py-2">
                      <span>Scenario</span>
                      <span className="font-mono text-on-surface">{scenario}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-surface-lowest px-3 py-2">
                      <span>Data source</span>
                      <span className="font-mono text-on-surface">{source ?? requestedSource ?? 'mock'}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-surface-lowest px-3 py-2">
                      <span>Asset type</span>
                      <span className="font-mono text-on-surface">{selectedItem?.assetKind ?? '-'}</span>
                    </div>
                    {selectedItem?.durationLabel ? (
                      <div className="flex items-center justify-between rounded-[var(--radius-sm)] bg-surface-lowest px-3 py-2">
                        <span>Duration</span>
                        <span className="font-mono text-on-surface">{selectedItem.durationLabel}</span>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex h-48 shrink-0 border-t border-white/5 bg-surface">
            <div className="flex flex-1 flex-col p-6">
              <label className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60">
                <MessageSquare className="h-3.5 w-3.5" /> Feedback / Patch Request
              </label>
              <Textarea
                className="custom-scrollbar flex-1 resize-none bg-surface-lowest"
                placeholder="Describe what needs to be fixed or changed..."
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
              />
            </div>

            <div className="flex w-80 flex-col justify-center gap-3 border-l border-white/5 p-6">
              <Button className="w-full justify-center" onClick={() => applyDecision('approve')}>
                <CheckCircle2 className="h-5 w-5" /> Approve & Proceed
              </Button>
              <Button className="w-full justify-center" variant="secondary" onClick={() => applyDecision('request_patch')}>
                <AlertTriangle className="h-5 w-5" /> Request Patch
              </Button>
              <Button className="w-full justify-center" variant="outline" onClick={() => applyDecision('reject')}>
                <XCircle className="h-5 w-5" /> Reject & Restart
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
