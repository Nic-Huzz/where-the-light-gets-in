'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, PageContainer } from '@/components/layout';
import { Button, Card, CroweySnaxBadge, MojoScoreDisplay, QuickWinDiagram, DeepWorkDiagram } from '@/components/ui';
import { getUserState, getCroweySnax, getLatestMojoScore } from '@/lib/storage';
import { getQuickWinsForPainPoint, getDeepWorkForPainPoint, getPainPointInfo } from '@/lib/content';
import { UserState, CroweySnax, MojoScore, QuickWin, DeepWorkExercise } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [userState, setUserState] = useState<UserState | null>(null);
  const [croweySnax, setCroweySnax] = useState<CroweySnax[]>([]);
  const [latestMojo, setLatestMojo] = useState<MojoScore | null>(null);
  const [quickWins, setQuickWins] = useState<QuickWin[]>([]);
  const [deepWork, setDeepWork] = useState<DeepWorkExercise[]>([]);

  useEffect(() => {
    const state = getUserState();
    if (!state.onboarded) {
      router.replace('/');
      return;
    }

    setUserState(state);
    setCroweySnax(getCroweySnax());
    setLatestMojo(getLatestMojoScore() || null);

    if (state.painPoint) {
      setQuickWins(getQuickWinsForPainPoint(state.painPoint).slice(0, 3));
      setDeepWork(getDeepWorkForPainPoint(state.painPoint).slice(0, 3));
    }
  }, [router]);

  if (!userState) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  const painPointInfo = userState.painPoint ? getPainPointInfo(userState.painPoint) : null;

  return (
    <div>
      <Header />
      <PageContainer>
        {/* Welcome Section */}
        <section className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back
          </h1>
          {painPointInfo && (
            <div className="flex items-center justify-center gap-3">
              <p className="text-white/70">
                <span className="mr-2">{painPointInfo.icon}</span>
                Working on: {painPointInfo.label}
              </p>
              <Link
                href="/onboarding"
                className="text-xs text-accent hover:text-accent-dark underline underline-offset-2"
              >
                Change
              </Link>
            </div>
          )}
          {latestMojo && (
            <Link href="/mojo-score" className="inline-block mt-4">
              <MojoScoreDisplay score={latestMojo} size="sm" />
            </Link>
          )}
        </section>

        {/* Quick Wins Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Quick Wins</h2>
            <Link href="/quick-wins" className="text-sm text-accent hover:text-accent-dark">
              See all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickWins.map((qw) => (
              <Link key={qw.id} href={`/quick-wins/${qw.id}`}>
                <Card variant="interactive" padding="none" className="h-full overflow-hidden">
                  <div className="bg-[rgba(95,189,214,0.2)] rounded-t-2xl p-4 border-b border-accent/20">
                    <div className="h-20">
                      <QuickWinDiagram type={qw.id} light />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{qw.name}</h3>
                    <span className="inline-block text-xs text-white/80 bg-white/20 px-2 py-1 rounded">
                      {qw.duration}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Deep Work Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Deep Work</h2>
            <Link href="/deep-work" className="text-sm text-accent hover:text-accent-dark">
              See all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deepWork.map((ex) => (
              <Link key={ex.id} href={`/deep-work/${ex.id}`}>
                <Card variant="interactive" padding="none" className="h-full overflow-hidden">
                  <div className="bg-[rgba(95,189,214,0.2)] rounded-t-2xl p-4 border-b border-accent/20">
                    <div className="h-20">
                      <DeepWorkDiagram type={ex.id} light />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{ex.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded">
                        {ex.steps} steps
                      </span>
                      <span className="text-xs text-accent">🍪</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Crowey Snax Section */}
        {croweySnax.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Your Crowey Snax</h2>
              <Link href="/crowey-snax" className="text-sm text-accent hover:text-accent-dark">
                See all →
              </Link>
            </div>
            <Card variant="glow" padding="md">
              <div className="flex flex-wrap gap-2">
                {croweySnax.slice(0, 5).map((snax) => (
                  <CroweySnaxBadge key={snax.id} type={snax.type} />
                ))}
                {croweySnax.length > 5 && (
                  <span className="px-3 py-1.5 text-sm text-white/70">
                    +{croweySnax.length - 5} more
                  </span>
                )}
              </div>
            </Card>
          </section>
        )}

        {/* Mojo Score CTA */}
        {!latestMojo && (
          <section className="mb-10">
            <Card variant="glow" padding="lg">
              <div className="text-center">
                <span className="text-3xl mb-4 block">📊</span>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Check Your Mojo Score
                </h3>
                <p className="text-white/70 mb-4 max-w-md mx-auto">
                  A quick weekly check-in to track your Play, Purpose, and Potential.
                  No judgment, just awareness.
                </p>
                <Link href="/mojo-score">
                  <Button>Take the Check-in</Button>
                </Link>
              </div>
            </Card>
          </section>
        )}

        {/* Inspirational Quote */}
        <section className="mt-12 text-center">
          <blockquote className="text-lg italic text-white/70 max-w-lg mx-auto">
            "The opposite of fear is not courage. The opposite of fear is play."
          </blockquote>
          <p className="text-sm text-accent mt-2">— Ben Crowe</p>
        </section>
      </PageContainer>
    </div>
  );
}
