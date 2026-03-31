import { Badge } from '@/components/ui/badge';
import type { ProjectStatus } from '@/types/project';

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  if (status === 'done') {
    return <Badge variant="success">Done</Badge>;
  }

  if (status === 'rendering') {
    return <Badge variant="default">Rendering</Badge>;
  }

  if (status === 'failed') {
    return <Badge variant="danger">Failed</Badge>;
  }

  if (status === 'draft') {
    return <Badge variant="outline">Draft</Badge>;
  }

  return <Badge variant="muted">Queued</Badge>;
}