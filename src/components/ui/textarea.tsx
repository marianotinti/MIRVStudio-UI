import type { TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'flex min-h-28 w-full rounded-[var(--radius-sm)] border border-white/10 bg-surface-low px-3 py-2 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/70 focus:border-primary/40',
        className,
      )}
      {...props}
    />
  );
}