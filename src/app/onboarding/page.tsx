'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, ProgressIndicator } from '@/components/ui';
import { PAIN_POINTS } from '@/lib/content';
import { completeOnboarding } from '@/lib/storage';
import { PainPoint, Readiness } from '@/lib/types';

type Step = 'pain-point' | 'readiness';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('pain-point');
  const [selectedPainPoint, setSelectedPainPoint] = useState<PainPoint | null>(null);
  const [selectedReadiness, setSelectedReadiness] = useState<Readiness | null>(null);

  const handlePainPointSelect = (painPoint: PainPoint) => {
    setSelectedPainPoint(painPoint);
  };

  const handleReadinessSelect = (readiness: Readiness) => {
    setSelectedReadiness(readiness);
  };

  const handleContinue = () => {
    if (step === 'pain-point' && selectedPainPoint) {
      setStep('readiness');
    } else if (step === 'readiness' && selectedPainPoint && selectedReadiness) {
      // Save to local storage and navigate to dashboard
      completeOnboarding(selectedPainPoint, selectedReadiness);
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step === 'readiness') {
      setStep('pain-point');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-cream/30 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <ProgressIndicator
          currentStep={step === 'pain-point' ? 1 : 2}
          totalSteps={2}
          className="mb-8"
        />

        {/* Pain Point Selection */}
        {step === 'pain-point' && (
          <div className="animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold text-text mb-3">
              What brings you here today?
            </h1>
            <p className="text-text-light mb-8">
              Select the feeling that resonates most right now. This helps us personalize your journey.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {PAIN_POINTS.map((painPoint) => (
                <Card
                  key={painPoint.id}
                  variant="interactive"
                  selected={selectedPainPoint === painPoint.id}
                  padding="md"
                  onClick={() => handlePainPointSelect(painPoint.id)}
                  className="text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{painPoint.icon}</span>
                    <div>
                      <h3 className="font-semibold text-text mb-1">
                        {painPoint.label}
                      </h3>
                      <p className="text-sm text-text-light">
                        {painPoint.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Readiness Selection */}
        {step === 'readiness' && (
          <div className="animate-fade-in">
            <h1 className="text-2xl sm:text-3xl font-bold text-text mb-3">
              What are you ready for?
            </h1>
            <p className="text-text-light mb-8">
              No pressure—you can always change your approach later.
            </p>

            <div className="space-y-4">
              {/* Quick Wins Option */}
              <Card
                variant="interactive"
                selected={selectedReadiness === 'quick-wins'}
                padding="lg"
                onClick={() => handleReadinessSelect('quick-wins')}
                className="text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text mb-1">
                      Quick Wins
                    </h3>
                    <p className="text-text-light mb-3">
                      Start with simple, daily tools you can use right away. Breathing exercises,
                      reframes, and awareness practices.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-text-light">
                        1-5 min each
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-text-light">
                        Use anytime
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-text-light">
                        Instant relief
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Deep Work Option */}
              <Card
                variant="interactive"
                selected={selectedReadiness === 'deep-work'}
                padding="lg"
                onClick={() => handleReadinessSelect('deep-work')}
                className="text-left"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-2xl">🍪</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text mb-1">
                      Deep Work
                    </h3>
                    <p className="text-text-light mb-3">
                      Ready to create your personal Crowey Snax—lasting artifacts like your
                      A-Game Words, "To Be" List, and more.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-text-light">
                        10-20 min each
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-text-light">
                        Guided exercises
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs text-text-light">
                        Lasting transformation
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <p className="mt-6 text-sm text-text-light text-center">
              Don't worry—Quick Wins users can always explore Deep Work later, and Deep Work
              users get access to Quick Wins too.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex gap-4">
          <Button variant="secondary" onClick={handleBack} className="flex-1 sm:flex-none">
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={
              (step === 'pain-point' && !selectedPainPoint) ||
              (step === 'readiness' && !selectedReadiness)
            }
            className="flex-1 sm:flex-none"
          >
            {step === 'readiness' ? "Let's Go" : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
