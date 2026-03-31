import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em]', {
  variants: {
    variant: {
      default: 'border-primary/20 bg-primary/10 text-primary',
      success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
      warning: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
      danger: 'border-red-500/20 bg-red-500/10 text-red-400',
      muted: 'border-white/10 bg-white/5 text-on-surface-variant',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BadgeProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, className }))} {...props} />;
}