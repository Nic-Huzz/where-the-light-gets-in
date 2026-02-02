'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, PageContainer } from '@/components/layout';
import { Card, CroweySnaxBadge } from '@/components/ui';
import { getUserState, getCroweySnax } from '@/lib/storage';
import { getAllDeepWork, getDeepWorkForPainPoint, CROWEY_SNAX_NAMES } from '@/lib/content';
import { DeepWorkExercise, PainPoint, CroweySnax } from '@/lib/types';

export default function DeepWorkPage() {
  const router = useRouter();
  const [exercises, setExercises] = useState<DeepWorkExercise[]>([]);
  const [completedSnax, setCompletedSnax] = useState<CroweySnax[]>([]);
  const [_painPoint, setPainPoint] = useState<PainPoint | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const state = getUserState();
    if (!state.onboarded) {
      router.replace('/');
      return;
    }

    setPainPoint(state.painPoint);
    setCompletedSnax(getCroweySnax());
    if (state.painPoint) {
      setExercises(getDeepWorkForPainPoint(state.painPoint));
    }
  }, [router]);

  const displayedExercises = showAll ? getAllDeepWork() : exercises;

  // Check if exercise has been completed
  const isCompleted = (exercise: DeepWorkExercise) => {
    return completedSnax.some((s) => s.type === exercise.produces);
  };

  return (
    <>
      <Header />
      <PageContainer>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
            Deep Work
          </h1>
          <p className="text-text-light">
            Transformational exercises that create your personal Crowey Snax—artifacts you'll use forever.
          </p>
        </div>

        {/* Completed Snax */}
        {completedSnax.length > 0 && (
          <Card variant="warm" padding="md" className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🍪</span>
              <span className="font-semibold text-text">Your Crowey Snax</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {completedSnax.map((snax) => (
                <CroweySnaxBadge key={snax.id} type={snax.type} />
              ))}
            </div>
          </Card>
        )}

        {/* Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowAll(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              !showAll
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-light hover:bg-gray-200'
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setShowAll(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showAll
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-light hover:bg-gray-200'
            }`}
          >
            All Exercises
          </button>
        </div>

        {/* Exercises Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {displayedExercises.map((exercise) => {
            const completed = isCompleted(exercise);
            return (
              <Link key={exercise.id} href={`/deep-work/${exercise.id}`}>
                <Card
                  variant={completed ? 'glow' : 'interactive'}
                  padding="md"
                  className={`h-full ${completed ? 'ring-2 ring-accent' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{exercise.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-text">{exercise.name}</h3>
                        {completed && <span className="text-sm">✓</span>}
                      </div>
                      <p className="text-sm text-text-light mb-3">
                        {exercise.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-text-light bg-gray-100 px-2 py-1 rounded">
                          {exercise.steps} steps
                        </span>
                        <span className="text-xs text-text-light">
                          Creates: <span className="font-medium">{CROWEY_SNAX_NAMES[exercise.produces]}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Encouragement */}
        <div className="mt-12 text-center">
          <p className="text-text-light">
            Each exercise you complete creates a Crowey Snax—a personal artifact that's uniquely yours.
          </p>
        </div>
      </PageContainer>
    </>
  );
}
