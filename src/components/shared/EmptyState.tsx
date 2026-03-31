type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="surface-panel flex h-full min-h-56 flex-col items-center justify-center rounded-[var(--radius-lg)] border border-white/10 p-8 text-center">
      <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-on-surface-variant">{description}</p>
    </div>
  );
}