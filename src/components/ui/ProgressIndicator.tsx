'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  className = '',
}: ProgressIndicatorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div
            key={index}
            className={`
              h-2 rounded-full transition-all duration-300
              ${isCurrent ? 'w-8 bg-primary' : 'w-2'}
              ${isCompleted ? 'bg-primary' : ''}
              ${!isCompleted && !isCurrent ? 'bg-gray-200' : ''}
            `}
          />
        );
      })}
    </div>
  );
}

export default ProgressIndicator;
