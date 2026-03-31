import { Badge } from '@/components/ui/badge';
import type { ProjectSummary } from '@/modules/projects/types';

export function ProjectStatusBadge({ status }: { status: ProjectSummary['status'] }) {
  if (status === 'done') {
    return <Badge variant="success">Done</Badge>;
  }

  if (status === 'rendering') {
    return <Badge variant="default">Rendering</Badge>;
  }

  if (status === 'failed') {
    return <Badge variant="danger">Failed</Badge>;
  }

  return <Badge variant="muted">Queued</Badge>;
}