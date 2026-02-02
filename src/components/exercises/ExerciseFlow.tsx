'use client';

import { useState, ReactNode } from 'react';
import { Button, ProgressIndicator } from '@/components/ui';

interface ExerciseStep {
  title: string;
  content: ReactNode;
  canProceed?: boolean;
}

interface ExerciseFlowProps {
  title: string;
  description?: string;
  steps: ExerciseStep[];
  onComplete: () => void;
  onBack?: () => void;
  completionMessage?: string;
  completionContent?: ReactNode;
}

export function ExerciseFlow({
  title,
  description,
  steps,
  onComplete,
  onBack,
  completionMessage = "You did it!",
  completionContent,
}: ExerciseFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = step?.canProceed !== false;

  const handleNext = () => {
    if (isLastStep) {
      setIsComplete(true);
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (onBack) {
      onBack();
    }
  };

  if (isComplete) {
    return (
      <div className="animate-fade-in text-center py-12">
        <div className="text-6xl mb-6">🍪</div>
        <h2 className="text-2xl font-bold text-text mb-4">
          {completionMessage}
        </h2>
        <p className="text-lg text-text-light mb-8">
          You just created a new Crowey Snax!
        </p>
        {completionContent}
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <ProgressIndicator
          currentStep={currentStep + 1}
          totalSteps={steps.length}
          className="mb-4"
        />
        <h1 className="text-2xl font-bold text-text mb-2">{title}</h1>
        {description && (
          <p className="text-text-light">{description}</p>
        )}
      </div>

      {/* Current Step */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text mb-4">
          {step.title}
        </h2>
        {step.content}
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={handleBack}
          className="flex-1 sm:flex-none"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex-1 sm:flex-none"
        >
          {isLastStep ? 'Complete' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

export default ExerciseFlow;
