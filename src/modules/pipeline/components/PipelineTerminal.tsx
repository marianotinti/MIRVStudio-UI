export function PipelineTerminal({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-2 font-mono text-xs text-on-surface-variant">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}