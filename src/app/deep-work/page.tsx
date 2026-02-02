'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, PageContainer } from '@/components/layout';
import { Card, CroweySnaxBadge, DeepWorkDiagram } from '@/components/ui';
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Deep Work
          </h1>
          <p className="text-white/70">
            Transformational exercises that create your personal Crowey Snax—artifacts you'll use forever.
          </p>
        </div>

        {/* Completed Snax */}
        {completedSnax.length > 0 && (
          <Card variant="warm" padding="md" className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🍪</span>
              <span className="font-semibold text-white">Your Crowey Snax</span>
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
                ? 'bg-white text-primary'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setShowAll(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showAll
                ? 'bg-white text-primary'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            All Exercises
          </button>
        </div>

        {/* Exercises Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedExercises.map((exercise) => {
            const completed = isCompleted(exercise);
            return (
              <Link key={exercise.id} href={`/deep-work/${exercise.id}`}>
                <Card
                  variant={completed ? 'glow' : 'interactive'}
                  padding="none"
                  className={`h-full overflow-hidden ${completed ? 'ring-2 ring-accent' : ''}`}
                >
                  {/* Diagram */}
                  <div className="bg-[rgba(95,189,214,0.2)] p-4 border-b border-accent/20">
                    <div className="h-24">
                      <DeepWorkDiagram type={exercise.id} />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{exercise.name}</h3>
                      {completed && <span className="text-accent">✓</span>}
                    </div>
                    <p className="text-sm text-white/70 mb-3 line-clamp-2">
                      {exercise.description}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                        {exercise.steps} steps
                      </span>
                      <span className="text-xs text-accent">
                        🍪 {CROWEY_SNAX_NAMES[exercise.produces]}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Encouragement */}
        <div className="mt-12 text-center">
          <p className="text-white/70">
            Each exercise you complete creates a Crowey Snax—a personal artifact that's uniquely yours.
          </p>
        </div>
      </PageContainer>
    </>
  );
}
