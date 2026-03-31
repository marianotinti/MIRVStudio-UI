import { cn } from '@/lib/utils';

type CreateStepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export function CreateStepIndicator({ currentStep, totalSteps }: CreateStepIndicatorProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'h-1.5 w-10 rounded-full transition-colors',
            index <= currentStep ? 'bg-primary' : 'bg-white/10',
          )}
        />
      ))}
    </div>
  );
}