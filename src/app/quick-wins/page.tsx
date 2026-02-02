'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, PageContainer } from '@/components/layout';
import { Card } from '@/components/ui';
import { getUserState } from '@/lib/storage';
import { getAllQuickWins, getQuickWinsForPainPoint } from '@/lib/content';
import { QuickWin, PainPoint } from '@/lib/types';

export default function QuickWinsPage() {
  const router = useRouter();
  const [quickWins, setQuickWins] = useState<QuickWin[]>([]);
  const [_painPoint, setPainPoint] = useState<PainPoint | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const state = getUserState();
    if (!state.onboarded) {
      router.replace('/');
      return;
    }

    setPainPoint(state.painPoint);
    if (state.painPoint) {
      setQuickWins(getQuickWinsForPainPoint(state.painPoint));
    }
  }, [router]);

  const displayedWins = showAll ? getAllQuickWins() : quickWins;

  // Group by category
  const groupedWins = displayedWins.reduce((acc, qw) => {
    if (!acc[qw.category]) {
      acc[qw.category] = [];
    }
    acc[qw.category].push(qw);
    return acc;
  }, {} as Record<string, QuickWin[]>);

  const categoryLabels: Record<string, { label: string; icon: string }> = {
    breathing: { label: 'Breathing', icon: '🌬️' },
    reframe: { label: 'Reframes', icon: '💬' },
    awareness: { label: 'Awareness', icon: '👁️' },
    play: { label: 'Play', icon: '🎮' },
  };

  return (
    <>
      <Header />
      <PageContainer>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
            Quick Wins
          </h1>
          <p className="text-text-light">
            Simple tools you can use anytime to shift your state.
          </p>
        </div>

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
            All Tools
          </button>
        </div>

        {/* Quick Wins by Category */}
        {Object.entries(groupedWins).map(([category, wins]) => (
          <section key={category} className="mb-8">
            <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
              <span>{categoryLabels[category]?.icon}</span>
              {categoryLabels[category]?.label || category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {wins.map((qw) => (
                <Link key={qw.id} href={`/quick-wins/${qw.id}`}>
                  <Card variant="interactive" padding="md" className="h-full">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{qw.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-text mb-1">{qw.name}</h3>
                        <p className="text-sm text-text-light mb-2">{qw.description}</p>
                        <span className="inline-block text-xs text-text-light bg-gray-100 px-2 py-1 rounded">
                          {qw.duration}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </PageContainer>
    </>
  );
}
