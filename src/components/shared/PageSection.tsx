import type { PropsWithChildren, ReactNode } from 'react';

type PageSectionProps = PropsWithChildren<{
  title: string;
  description?: string;
  action?: ReactNode;
}>;

export function PageSection({ title, description, action, children }: PageSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-on-surface">{title}</h2>
          {description ? <p className="mt-1 text-sm text-on-surface-variant">{description}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}