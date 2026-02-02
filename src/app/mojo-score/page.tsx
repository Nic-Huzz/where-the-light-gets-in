'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header, PageContainer } from '@/components/layout';
import { Button, Card, Slider, MojoScoreDisplay, TextArea } from '@/components/ui';
import { getUserState, getMojoScores, saveMojoScore, calculateMojoAverage } from '@/lib/storage';
import { MOJO_QUESTIONS } from '@/lib/content';
import { MojoScore } from '@/lib/types';

type View = 'history' | 'checkin' | 'complete';

export default function MojoScorePage() {
  const router = useRouter();
  const [view, setView] = useState<View>('history');
  const [scores, setScores] = useState<MojoScore[]>([]);

  // Check-in state
  const [play, setPlay] = useState(3);
  const [purpose, setPurpose] = useState(3);
  const [potential, setPotential] = useState(3);
  const [pressure, setPressure] = useState<number | undefined>(undefined);
  const [inertia, setInertia] = useState<number | undefined>(undefined);
  const [reflection, setReflection] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [step, setStep] = useState(0);
  const [newScore, setNewScore] = useState<MojoScore | null>(null);

  useEffect(() => {
    const state = getUserState();
    if (!state.onboarded) {
      router.replace('/');
      return;
    }

    loadScores();
  }, [router]);

  const loadScores = () => {
    const allScores = getMojoScores();
    setScores(allScores.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  };

  const handleStartCheckin = () => {
    setView('checkin');
    setStep(0);
    setPlay(3);
    setPurpose(3);
    setPotential(3);
    setPressure(undefined);
    setInertia(undefined);
    setReflection('');
    setShowAdvanced(false);
  };

  const handleCompleteCheckin = () => {
    const score = saveMojoScore({
      date: new Date().toISOString(),
      play,
      purpose,
      potential,
      pressure: showAdvanced ? pressure : undefined,
      inertia: showAdvanced ? inertia : undefined,
      reflection: reflection || undefined,
    });
    setNewScore(score);
    setView('complete');
    loadScores();
  };

  // History View
  if (view === 'history') {
    return (
      <>
        <Header />
        <PageContainer>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Mojo Score
            </h1>
            <p className="text-white/70">
              Track your Play, Purpose, and Potential over time. No judgment, just awareness.
            </p>
          </div>

          {/* Latest Score or CTA */}
          {scores.length > 0 ? (
            <Card variant="glow" padding="lg" className="mb-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <MojoScoreDisplay score={scores[0]} showDetails size="md" />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm text-white/70 mb-2">
                    Last check-in: {new Date(scores[0].date).toLocaleDateString()}
                  </p>
                  <Button onClick={handleStartCheckin}>
                    New Check-in
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="warm" padding="lg" className="mb-8 text-center">
              <span className="text-4xl mb-4 block">📊</span>
              <h2 className="text-xl font-semibold text-white mb-2">
                No check-ins yet
              </h2>
              <p className="text-white/70 mb-6 max-w-md mx-auto">
                The Mojo Score helps you track your intrinsic motivation—Play, Purpose, and Potential.
                It takes less than 2 minutes.
              </p>
              <Button onClick={handleStartCheckin}>
                Take Your First Check-in
              </Button>
            </Card>
          )}

          {/* History */}
          {scores.length > 1 && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">History</h2>

              {/* Simple Trend Visualization */}
              <Card padding="md" className="mb-6">
                <div className="flex items-end justify-between h-24 gap-1">
                  {scores.slice(0, 10).reverse().map((score) => {
                    const avg = calculateMojoAverage(score);
                    const height = (avg / 5) * 100;
                    return (
                      <div
                        key={score.id}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        <div
                          className="w-full bg-primary/20 rounded-t transition-all hover:bg-primary/40"
                          style={{ height: `${height}%` }}
                          title={`${avg.toFixed(1)} - ${new Date(score.date).toLocaleDateString()}`}
                        />
                        <span className="text-[10px] text-white/70">
                          {new Date(score.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Score List */}
              <div className="space-y-3">
                {scores.slice(1).map((score) => (
                  <Card key={score.id} padding="sm" className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-accent">
                          {calculateMojoAverage(score).toFixed(1)}
                        </div>
                        <div className="text-xs text-white/70">Mojo</div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span>🎮 {score.play}</span>
                        <span>🧭 {score.purpose}</span>
                        <span>🌱 {score.potential}</span>
                      </div>
                    </div>
                    <span className="text-sm text-white/70">
                      {new Date(score.date).toLocaleDateString()}
                    </span>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-white/70 max-w-md mx-auto">
              The goal isn't to "max out"—it's awareness. A dip isn't failure; it's information.
              Scores naturally fluctuate. That's human.
            </p>
          </div>
        </PageContainer>
      </>
    );
  }

  // Check-in View
  if (view === 'checkin') {
    const steps = [
      // Play
      <div key="play" className="animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🎮</span>
          <h2 className="text-xl font-semibold text-white mb-2">Play</h2>
          <p className="text-white/70">{MOJO_QUESTIONS.play.question}</p>
        </div>
        <Slider
          value={play}
          onChange={setPlay}
          min={1}
          max={5}
          lowLabel={MOJO_QUESTIONS.play.low}
          highLabel={MOJO_QUESTIONS.play.high}
          className="mb-8"
        />
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setView('history')}>Cancel</Button>
          <Button onClick={() => setStep(1)} className="flex-1">Continue</Button>
        </div>
      </div>,

      // Purpose
      <div key="purpose" className="animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🧭</span>
          <h2 className="text-xl font-semibold text-white mb-2">Purpose</h2>
          <p className="text-white/70">{MOJO_QUESTIONS.purpose.question}</p>
        </div>
        <Slider
          value={purpose}
          onChange={setPurpose}
          min={1}
          max={5}
          lowLabel={MOJO_QUESTIONS.purpose.low}
          highLabel={MOJO_QUESTIONS.purpose.high}
          className="mb-8"
        />
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
          <Button onClick={() => setStep(2)} className="flex-1">Continue</Button>
        </div>
      </div>,

      // Potential
      <div key="potential" className="animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🌱</span>
          <h2 className="text-xl font-semibold text-white mb-2">Potential</h2>
          <p className="text-white/70">{MOJO_QUESTIONS.potential.question}</p>
        </div>
        <Slider
          value={potential}
          onChange={setPotential}
          min={1}
          max={5}
          lowLabel={MOJO_QUESTIONS.potential.low}
          highLabel={MOJO_QUESTIONS.potential.high}
          className="mb-8"
        />
        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
          <Button onClick={() => setStep(3)} className="flex-1">Continue</Button>
        </div>
      </div>,

      // Review & Optional
      <div key="review" className="animate-fade-in">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Your Mojo Score</h2>
          <p className="text-white/70">Here's how you're doing this week.</p>
        </div>

        {/* Score Preview */}
        <Card variant="glow" padding="lg" className="mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">
              {((play + purpose + potential) / 3).toFixed(1)}
            </div>
            <div className="flex justify-center gap-6 text-sm">
              <span>🎮 Play: {play}</span>
              <span>🧭 Purpose: {purpose}</span>
              <span>🌱 Potential: {potential}</span>
            </div>
          </div>
        </Card>

        {/* Advanced Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-accent hover:text-accent-dark"
          >
            {showAdvanced ? '− Hide' : '+'} Warning signals (optional)
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-6 animate-fade-in">
              <div>
                <p className="text-sm text-white/70 mb-2">{MOJO_QUESTIONS.pressure.question}</p>
                <Slider
                  value={pressure || 3}
                  onChange={(v) => setPressure(v)}
                  min={1}
                  max={5}
                  lowLabel={MOJO_QUESTIONS.pressure.low}
                  highLabel={MOJO_QUESTIONS.pressure.high}
                />
              </div>
              <div>
                <p className="text-sm text-white/70 mb-2">{MOJO_QUESTIONS.inertia.question}</p>
                <Slider
                  value={inertia || 3}
                  onChange={(v) => setInertia(v)}
                  min={1}
                  max={5}
                  lowLabel={MOJO_QUESTIONS.inertia.low}
                  highLabel={MOJO_QUESTIONS.inertia.high}
                />
              </div>
            </div>
          )}
        </div>

        {/* Reflection */}
        <div className="mb-6">
          <TextArea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Any reflections on this week? (optional)"
            rows={3}
          />
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
          <Button onClick={handleCompleteCheckin} className="flex-1">Complete Check-in</Button>
        </div>
      </div>,
    ];

    return (
      <>
        <Header />
        <PageContainer maxWidth="sm">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[0, 1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-primary' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {steps[step]}
        </PageContainer>
      </>
    );
  }

  // Complete View
  if (view === 'complete' && newScore) {
    const avg = calculateMojoAverage(newScore);

    return (
      <>
        <Header />
        <PageContainer centered>
          <div className="text-center animate-fade-in">
            <span className="text-6xl mb-6 block">✨</span>
            <h1 className="text-2xl font-bold text-white mb-4">
              Check-in Complete
            </h1>

            <Card variant="glow" padding="lg" className="mb-8 inline-block">
              <div className="text-5xl font-bold text-accent mb-2">
                {avg.toFixed(1)}
              </div>
              <div className="text-sm text-white/70">Your Mojo Score</div>
            </Card>

            <p className="text-white/70 mb-8 max-w-md mx-auto">
              {avg >= 4
                ? "You're in a great place. Keep feeding what's working."
                : avg >= 3
                ? "Solid. Remember—progress, not perfection."
                : avg >= 2
                ? "A bit lower this week. That's okay—awareness is the first step."
                : "Tough week. Be gentle with yourself. Consider exploring some Quick Wins."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setView('history')}>
                View History
              </Button>
              <Link href="/dashboard">
                <Button variant="secondary">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </PageContainer>
      </>
    );
  }

  return null;
}
